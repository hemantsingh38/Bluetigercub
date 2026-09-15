// No auth in this build — KOTG is a client-only prototype (see lib/kotg/store.tsx),
// so there's a single fixed "signed in" user, matching the Figma mock's avatar
// (initials "AK", first name "Anmol") and reused as the default Project Manager.
export const CURRENT_USER = {
  firstName: "Anmol",
  fullName: "Anmol Kapoor",
  initials: "AK",
};
