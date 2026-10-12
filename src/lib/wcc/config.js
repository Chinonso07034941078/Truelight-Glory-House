const UNITS = [
  "Choir",
  "Media",
  "Ushering",
  "Technical",
  "Children",
  "Drama",
  "Protocol",
  "Welfare",
  "Prayer",
  "Other",
];

export const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  phone: "",
  attendedWccBefore: "",
  expectations: "",
  isTrueLighter: "",
  isWorker: "",
  unit: "",
  church: "",
  locationScope: "",
  locationDetail: "",
  needsAccommodation: "",
  isPastor: "",
  pastorChurch: "",
};


export const YES_NO_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export const UNIT_OPTIONS = UNITS.map((unit) => ({ value: unit, label: unit }));

export const HERO_IMAGE_URL =
  "https://res.cloudinary.com/dnvgl9k4i/image/upload/v1790518651/3f039210-0998-45a1-9505-6381f92f2489_f8v77p.jpg";
export const NEXT_STEP_IMAGE_URL =
  "https://res.cloudinary.com/dnvgl9k4i/image/upload/v1790520059/90749eb0-03a6-4982-868e-a07b3534a06d.png";

const COUNTDOWN_TARGET = new Date("2026-11-11T00:00:00").getTime();

export function getCountdown() {
  const remaining = Math.max(0, COUNTDOWN_TARGET - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}


export const CHILD_INITIAL_DATA = {
  childName: "",
  childAge: "",
  guardianName: "",
  guardianPhone: "",
  guardianEmail: "",
};

