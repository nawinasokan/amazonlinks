import { Helmet } from 'react-helmet-async'

export const SITE_NAME = 'AmazonLinks'
export const SITE_URL = 'https://www.amazonlinks.in'

/**
 * Per-page SEO meta tags.
 * @param {{
 *   title?: string,
 *   description?: string,
 *   path?: string,
 *   image?: string,
 *   type?: string,
 *   noindex?: boolean,
 * }} props
 */
export default function Seo({
  title,
  description,
  path = '',
  image,
  type = 'website',
  noindex = false,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — Find the Best. Buy with Confidence.`
  const canonical = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  )
}
