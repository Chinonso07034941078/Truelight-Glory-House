function randomSixDigits() {
  const randomValues = new Uint32Array(1);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(randomValues);
  } else {
    randomValues[0] = Math.floor(Math.random() * 0xffffffff);
  }
  return String(100000 + (randomValues[0] % 900000));
}

export function generateRegistrationId() {
  // Public registration reference shown in the success screen.
  return `WCC26-${randomSixDigits()}`;
}

export function generateCheckInCode() {
  // Short numeric code that is easy to present at check-in.
  return randomSixDigits();
}

