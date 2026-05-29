// Central affiliate-link helper for AmazonLinks.
// Never hardcode affiliate URLs anywhere — always call getAffiliateLink(asin).

export const AFFILIATE_TAG = 'amazonlinks-21'

/**
 * Build an Amazon India affiliate product link for a given ASIN.
 * @param {string} asin - Amazon Standard Identification Number (e.g. "B07Q3NKDTB")
 * @returns {string} affiliate URL
 */
export function getAffiliateLink(asin) {
  if (!asin) return `https://www.amazon.in/?tag=${AFFILIATE_TAG}`
  return `https://www.amazon.in/dp/${asin}?tag=${AFFILIATE_TAG}`
}

/**
 * Spread onto any <a> that points to an affiliate link so every outbound
 * product link is compliant (new tab + required rel attributes).
 *
 *   <a href={getAffiliateLink(asin)} {...affiliateLinkProps}>Buy</a>
 */
export const affiliateLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer sponsored',
}

export default getAffiliateLink
