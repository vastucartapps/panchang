// Canonical @id contracts for the VastuCart ecosystem. Owned references
// live here; reference-only imports stay immutable across the codebase.
// See Reference Files/00-shared-contracts.md §2 for the authoritative list.

const PANCHANG_ORIGIN = "https://panchang.vastucart.in";
const VASTUCART_ORIGIN = "https://www.vastucart.in";

// Entities this project emits canonically.
export const IDS = {
  website: `${PANCHANG_ORIGIN}/#website`,
  webapp: `${PANCHANG_ORIGIN}/#webapp`,
  brand: `${PANCHANG_ORIGIN}/#brand`,
  aboutPage: `${PANCHANG_ORIGIN}/about#page`,
  contactPage: `${PANCHANG_ORIGIN}/contact#page`,
  contactPoint: `${PANCHANG_ORIGIN}/contact#contactPoint`,
  pillarArticle: `${PANCHANG_ORIGIN}/what-is-panchang#article`,
} as const;

// Entities emitted canonically elsewhere; only referenced from this project.
export const REFS = {
  organization: `${VASTUCART_ORIGIN}/#organization`,
  orgWebsite: `${VASTUCART_ORIGIN}/#website`,
  authorJyotish: "https://blog.vastucart.in/authors/pt-raghav-sharma#person",
  authorEditorial: "https://blog.vastucart.in/authors/vastucart-editorial#person",
  conceptPanchang: `${VASTUCART_ORIGIN}/concepts/panchang#entity`,
  conceptTithiSet: `${VASTUCART_ORIGIN}/concepts/tithi-set#termset`,
  conceptNakshatraSet: `${VASTUCART_ORIGIN}/concepts/nakshatra-set#termset`,
  conceptRahuKaal: `${VASTUCART_ORIGIN}/concepts/rahu-kaal#entity`,
  conceptChoghadiya: `${VASTUCART_ORIGIN}/concepts/choghadiya#entity`,
} as const;

export const SITE_ORIGIN = PANCHANG_ORIGIN;
export const BRAND_LOGO_URL = `${VASTUCART_ORIGIN}/logo.png`;
