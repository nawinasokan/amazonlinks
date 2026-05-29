import Seo from '../components/Seo'
import Breadcrumbs from '../components/ui/Breadcrumbs'

const LAST_UPDATED = '1 May 2026'

const SECTIONS = [
  {
    heading: '1. Introduction',
    body: [
      'This Privacy Policy explains how AmazonLinks ("we", "us", or "our") collects, uses and protects information when you visit our website. By using AmazonLinks, you agree to the practices described here.',
    ],
  },
  {
    heading: '2. Information We Collect',
    body: [
      'We collect minimal information needed to operate the site. This may include: (a) information you voluntarily provide, such as your email address when subscribing to our newsletter; and (b) anonymous usage data such as pages visited and approximate location, collected through standard analytics.',
      'We do not sell your personal information to third parties.',
    ],
  },
  {
    heading: '3. Cookies & Local Storage',
    body: [
      'We use cookies and browser local storage to remember your preferences (such as your product comparison list and newsletter subscription) and to understand how the site is used. You can disable cookies in your browser settings, though some features may not work as intended.',
    ],
  },
  {
    heading: '4. Amazon Associates Disclosure',
    body: [
      'AmazonLinks is a participant in the Amazon Associates Programme, an affiliate advertising programme designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.in.',
      'As an Amazon Associate, we earn from qualifying purchases. When you click an affiliate link on our site and complete a qualifying purchase, we may receive a commission at no additional cost to you. Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.',
      'Product prices and availability are accurate as of the date/time indicated and are subject to change. Any price and availability information displayed on Amazon at the time of purchase will apply to the purchase of the product.',
    ],
  },
  {
    heading: '5. Third-Party Links',
    body: [
      'Our site contains links to third-party websites, primarily Amazon.in. We are not responsible for the privacy practices or content of those external sites. We encourage you to review their privacy policies.',
    ],
  },
  {
    heading: '6. Data Security',
    body: [
      'We take reasonable measures to protect the limited information we hold. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    heading: '7. Your Rights',
    body: [
      'You may unsubscribe from our newsletter at any time using the link in our emails, or by clearing the relevant data from your browser. To request deletion of any information we hold about you, contact us at the email below.',
    ],
  },
  {
    heading: '8. Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date.',
    ],
  },
  {
    heading: '9. Contact Us',
    body: [
      'If you have any questions about this Privacy Policy, please contact us at privacy@amazonlinks.in.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="animate-fade-in mx-auto max-w-3xl px-4 py-8">
      <Seo
        title="Privacy Policy"
        description="AmazonLinks Privacy Policy, including our Amazon Associates affiliate disclosure and how we handle your data."
        path="/privacy"
      />

      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]} />

      <h1 className="mt-4 text-3xl font-extrabold text-[#111111]">Privacy Policy</h1>
      <p className="mt-2 text-sm text-[#565959]">Last updated: {LAST_UPDATED}</p>

      <div className="mt-8 space-y-8">
        {SECTIONS.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-bold text-[#111111]">{section.heading}</h2>
            <div className="mt-2 space-y-3">
              {section.body.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-[#565959]">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
