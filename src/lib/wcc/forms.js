import { generateRegistrationId, generateCheckInCode } from "./identifiers";

export function validateAdultRegistration(formData) {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your full name.";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    }
    if (!formData.attendedWccBefore) {
      newErrors.attendedWccBefore =
        "Please let us know if you have attended WCC before.";
    }
    if (!formData.expectations.trim()) {
      newErrors.expectations = "Please tell us what you expect from WCC.";
    }
    if (!formData.isTrueLighter)
      newErrors.isTrueLighter = "Please let us know if you are a True Lighter.";
    if (formData.isTrueLighter === "yes") {
      if (!formData.isWorker)
        newErrors.isWorker = "Please let us know if you serve in a unit.";
      else if (formData.isWorker === "yes" && !formData.unit)
        newErrors.unit = "Please select your unit.";
    }
    if (formData.isTrueLighter === "no") {
      if (!formData.church.trim())
        newErrors.church = "Please enter the church you attend.";
    }
    // These are separate questions for every attendee, not just visitors.
    if (!formData.locationScope) {
      newErrors.locationScope =
        "Please let us know if you are coming from outside Owerri.";
    } else if (formData.locationScope === "yes" && !formData.locationDetail.trim()) {
      newErrors.locationDetail =
        "Please tell us which state or country you are coming from.";
    }
    if (!formData.needsAccommodation) {
      newErrors.needsAccommodation =
        "Please let us know if you need accommodation.";
    }
    if (!formData.isPastor) {
      newErrors.isPastor = "Please let us know if you are a pastor.";
    } else if (formData.isPastor === "yes" && !formData.pastorChurch.trim()) {
      newErrors.pastorChurch = "Please tell us which church you pastor.";
    }
    return newErrors;
}


export function buildChildRegistration({ childName, childAge, guardianName, guardianPhone, guardianEmail }) {
  const id = generateRegistrationId();
    const payload = {
      action: "register",
      formType: "wcc-registration",
      registrationKind: "child",
      registrationId: id,
      checkInCode: generateCheckInCode(),
      submittedAt: new Date().toISOString(),
      name: childName,
      email: guardianEmail,
      guardianEmail,
      phone: guardianPhone,
      attendedWccBefore: "",
      expectations: `Child age: ${childAge}; Parent/guardian: ${guardianName}`,
      isTrueLighter: "",
      isWorker: "",
      unit: "",
      church: "",
      locationScope: "",
      locationDetail: "",
      needsAccommodation: "",
      isPastor: "",
      pastorChurch: "",
      childAge,
      guardianName,
    };
  return payload;
}

export function buildAdultRegistration(formData) {
  const id = generateRegistrationId();
    const payload = {
      action: "register",
      formType: "wcc-registration",
      registrationKind: "adult",
      registrationId: id,
      checkInCode: generateCheckInCode(),
      submittedAt: new Date().toISOString(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      attendedWccBefore: formData.attendedWccBefore,
      expectations: formData.expectations.trim(),
      isTrueLighter: formData.isTrueLighter,
      isWorker: formData.isTrueLighter === "yes" ? formData.isWorker : "",
      unit: formData.isTrueLighter === "yes" && formData.isWorker === "yes" ? formData.unit : "",
      church: formData.isTrueLighter === "no" ? formData.church.trim() : "",
      locationScope: formData.locationScope,
      locationDetail: formData.locationScope === "yes" ? formData.locationDetail.trim() : "",
      needsAccommodation: formData.needsAccommodation,
      isPastor: formData.isPastor,
      pastorChurch: formData.isPastor === "yes" ? formData.pastorChurch.trim() : "",
    };

  return payload;
}
