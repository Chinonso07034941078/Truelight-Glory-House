// Server-only configuration. Override through Vercel environment variables.
const DEFAULT_ENDPOINT = "https://script.google.com/macros/s/AKfycbwLr43-zPDMqX0ophirx4UrdGnFuqBL0B9aDLXQPydWkEDzHWKFvc2p9pPHQMZkAz7_/exec";

export async function submitWccRegistration(payload, fetchImpl = fetch) {
  const endpoint = new URL(process.env.WCC_API_URL || DEFAULT_ENDPOINT);
  if (endpoint.protocol !== "https:" || endpoint.hostname !== "script.google.com" ||
      !/^\/macros\/s\/[^/]+\/exec$/.test(endpoint.pathname)) {
    throw new Error("The registration service endpoint is not configured correctly.");
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload) ||
      payload.action !== "register" || !["adult", "child"].includes(payload.registrationKind) ||
      !String(payload.name || "").trim() || !String(payload.phone || "").trim()) {
    throw new Error("Please complete the attendee and contact details.");
  }
  // Refuse to write through an old deployment that could create duplicates.
  const healthUrl = new URL(endpoint);
  healthUrl.searchParams.set("action", "health");
  const healthResponse = await fetchImpl(healthUrl, { signal: AbortSignal.timeout(15000) });
  if (!healthResponse.ok) throw new Error("The registration service is temporarily unavailable. Please try again.");
  const health = await healthResponse.json();
  if (!health.ok || !health.duplicateProtection) {
    throw new Error("Registration is temporarily unavailable while the organisers update the service. Please try again shortly.");
  }
  const response = await fetchImpl(endpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(45000),
  });
  if (!response.ok) throw new Error("Registration could not be confirmed. Please try again.");
  const result = await response.json();
  if (!result.ok) throw new Error(result.error || "Registration could not be confirmed. Please try again.");
  if (!result.registrationId || !result.checkInCode || !result.duplicateProtection) {
    throw new Error("The registration service returned an incomplete confirmation. Please contact the organisers.");
  }
  // Return only confirmation fields; do not expose attendee records or credentials.
  return { ok: true, duplicateProtection: true, duplicate: Boolean(result.duplicate),
    registrationId: String(result.registrationId), checkInCode: String(result.checkInCode),
    emailSent: result.emailSent ?? null };
}

export default async function wccRegistration(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    return res.status(200).json(await submitWccRegistration(body));
  } catch (error) {
    const message = error.name === "TimeoutError" || error.name === "AbortError"
      ? "Registration confirmation timed out. Please try again; an existing registration will be reused."
      : error instanceof SyntaxError ? "Invalid registration request." : error.message;
    return res.status(502).json({ ok: false, error: message || "Registration could not be confirmed. Please try again." });
  }
}
