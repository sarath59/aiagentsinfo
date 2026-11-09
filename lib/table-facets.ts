/** Open-source signal from a licence string already printed on the page. */
export function licenceIsOpenSource(license: string): boolean | null {
  if (!license.trim() || /not detected/i.test(license) || license === "NOASSERTION") return null;
  if (/proprietary/i.test(license)) return false;
  if (/\b(MIT|Apache|BSD|GPL|LGPL|AGPL|MPL|ISC|Unlicense|CC-BY|open source|open-source)\b/i.test(license)) {
    return true;
  }
  return null;
}

/**
 * Free vs paid from text the table already shows.
 * "Does not list" wins, so a Free card that excludes the product stays paid.
 */
export function textIsFree(pricing: string, license: string): boolean | null {
  if (/does not list/i.test(pricing)) return false;
  if (/\bfree\b/i.test(pricing) || /\$0\b/.test(pricing) || /no fee/i.test(pricing)) return true;
  if (licenceIsOpenSource(license) === true && !/\$\d/.test(pricing)) return true;
  if (/\$\d/.test(pricing)) return false;
  return null;
}
