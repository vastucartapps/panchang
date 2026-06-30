/**
 * Google AdSense Slot Configuration for Panchang
 * 
 * HOW TO GET YOUR SLOT IDS:
 * 1. Go to https://adsense.google.com
 * 2. Click "Ads" → "By placement" in the left menu
 * 3. Look for your ad units (you can create new ones if needed)
 * 4. Copy the number after "pub-" for each ad unit
 * 
 * EXAMPLE:
 * If your ad unit shows: ca-pub-1411902986257886/1234567890
 * Then your slot ID is: 1234567890
 * 
 * Replace the placeholder values below with your actual slot IDs
 */

export const AD_SLOTS = {
  // Panchang daily page
  panchang_top: '1234567890',      // Top of panchang (728x90 leaderboard)
  panchang_middle: '1234567891',   // Middle of panchang (300x250 rectangle)
  panchang_bottom: '1234567892',   // Bottom of panchang (728x90 leaderboard)

  // Rahu Kaal page
  rahukaal_middle: '1234567893',   // Middle of rahu kaal (300x250)

  // Choghadiya page
  choghadiya_middle: '1234567894', // Middle of choghadiya (300x250)

  // City pages
  city_middle: '1234567895',       // Middle of city page (728x90)
};

/**
 * Helper function to get the correct slot ID for a page
 * @param pageType - The type of page
 * @param position - Position on the page (top, middle, bottom)
 * @returns The slot ID for that page/position
 * 
 * USAGE EXAMPLE:
 * const slotId = getAdSlotId('panchang', 'middle');
 * <AdSenseSlot slotId={slotId} />
 */
export function getAdSlotId(
  pageType: 'panchang' | 'rahukaal' | 'choghadiya' | 'city',
  position: 'top' | 'middle' | 'bottom' = 'middle'
): string {
  const key = `${pageType}_${position}` as keyof typeof AD_SLOTS;
  return AD_SLOTS[key] || AD_SLOTS.panchang_middle;
}
