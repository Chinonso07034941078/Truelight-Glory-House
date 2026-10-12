/** The browser receives only the registration result, not backend configuration. */
export async function sendRegistration(payload) {
  const response = await fetch("/api/wcc-registration", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error("Registration could not be confirmed. Please try again.");
  }
  if (!response.ok || !result.ok) {
    throw new Error(result.error || "Registration could not be confirmed. Please try again.");
  }
  if (!result.registrationId || !result.checkInCode || !result.duplicateProtection) {
    throw new Error("The registration service needs its latest Apps Script update. Please contact the organisers.");
  }
  return result;
}
