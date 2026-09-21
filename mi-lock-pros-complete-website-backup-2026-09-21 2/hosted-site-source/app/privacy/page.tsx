import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how MI Lock Pros LLC collects, uses, protects, and shares information submitted through its website and locksmith service request form.',
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Website privacy"
      title="Privacy Policy"
      intro="Effective September 16, 2026. This Privacy Policy explains how MI Lock Pros LLC collects, uses, discloses, and protects information when you use this website, submit a service request, or contact us through the details provided here."
      sections={[
        {
          title: 'Information we collect',
          paragraphs: [
            'Information you choose to provide may include your name, phone number or email address, service ZIP code, service category, preferred contact method, preferred date or time, and the details in your message. One contact detail (a phone number or email address), service type, ZIP code, and preferred contact method are required to submit the website form; other fields are optional.',
            'The website and its hosting, security, and form systems may automatically process limited technical information such as an IP address, browser or device type, date and time, referring page, pages visited, and security or error logs. Necessary cookies or similar local-storage technologies may be used to operate, secure, and remember basic website functions.',
          ],
        },
        {
          title: 'How we use information',
          items: [
            'Respond to inquiries and discuss, schedule, or provide requested locksmith services.',
            'Communicate about service details, authorization, estimates, follow-up, or customer support.',
            'Operate, maintain, troubleshoot, and improve the website and service-request process.',
            'Detect spam, fraud, misuse, security incidents, or unlawful activity.',
            'Comply with legal obligations, enforce our terms, and protect customers, MI Lock Pros, and others.',
          ],
        },
        {
          title: 'When information may be shared',
          paragraphs: [
            'We may share information with service providers that help us host, secure, maintain, or deliver the website, email, and service-request communications. Those providers receive information only for the functions they perform for us and are subject to their own terms and privacy practices.',
            'We may also disclose information when reasonably necessary to comply with law or legal process; protect rights, safety, property, or security; investigate fraud or misuse; or complete a business reorganization or transfer. We do not sell or rent personal information submitted through the service-request form.',
          ],
        },
        {
          title: 'Google and external services',
          paragraphs: [
            'This website links to the MI Lock Pros Google Business Profile, Google review pages, Facebook, Instagram, and other third-party services. If you follow one of those links or interact with a connected third-party feature, that service may collect information under its own privacy policy. MI Lock Pros does not control those external services.',
          ],
        },
        {
          title: 'Data retention and your choices',
          paragraphs: [
            'We retain information only as long as reasonably needed to respond to requests, provide and document services, maintain business and tax records, resolve disputes, protect the website, and meet legal obligations. Retention periods may differ depending on the type of record and why it is needed.',
            'You may ask to access, correct, or delete personal information you submitted through the website by contacting us. We may need to verify your identity, and we may retain information when required by law or reasonably needed for legitimate business records, security, or dispute resolution.',
          ],
        },
        {
          title: 'Security and sensitive information',
          paragraphs: [
            'We use reasonable administrative and technical safeguards appropriate to the information we handle. No internet transmission, email, or storage system is completely secure, so we cannot guarantee absolute security.',
            'Do not submit card numbers, bank information, passwords, alarm codes, PINs, key codes, or other sensitive access credentials through the website form. Share any information needed to verify ownership or authorization directly through an appropriate service channel.',
          ],
        },
        {
          title: 'Children’s privacy',
          paragraphs: ['This website is intended for adults requesting locksmith services and is not directed to children under 13. We do not knowingly collect personal information from children under 13 through the website.'],
        },
        {
          title: 'Changes to this policy',
          paragraphs: ['We may update this Privacy Policy when our practices, technology, or legal obligations change. The effective date at the top of the page shows when the current version became effective.'],
        },
      ]}
    />
  );
}
