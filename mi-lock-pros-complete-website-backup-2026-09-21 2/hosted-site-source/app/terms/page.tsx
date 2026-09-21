import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms for using the MI Lock Pros LLC website and requesting locksmith services, including the policy for cut and programmed keys.',
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Service and website terms"
      title="Terms and Conditions"
      intro="Effective September 20, 2026. These Terms and Conditions govern use of the MI Lock Pros LLC website and apply to service requests made through it. Additional written terms, estimates, or authorizations presented before work begins may also apply."
      sections={[
        {
          title: 'Website use and service requests',
          paragraphs: [
            'This website provides general information about MI Lock Pros and a way to request contact about locksmith services. Submitting a form, email, or message does not confirm an appointment, price, arrival time, availability, or scope of work and does not by itself create a service agreement. MI Lock Pros will confirm the relevant service details directly.',
            'You must be at least 18 years old to submit a service request or authorize paid locksmith work through this website.',
            'You agree to provide accurate information and not to misuse the website, interfere with its operation, submit unlawful requests, or use MI Lock Pros names, logos, photographs, or other content without permission.',
          ],
        },
        {
          title: 'Authority to request locksmith work',
          paragraphs: [
            'You represent that you own, lawfully possess, manage, or are otherwise authorized to request work on the relevant vehicle, home, business, lock, key, safe, door, or access point. MI Lock Pros may request identification, proof of ownership, proof of occupancy, or other authorization and may decline or stop work when authorization cannot be reasonably verified or when safety or legality is in question.',
          ],
        },
        {
          title: 'Estimates, scope, and payment',
          paragraphs: [
            'Website descriptions are general. The exact work, price, parts, payment method, and any applicable service conditions should be confirmed before work begins. Conditions discovered during service may change the work or price; MI Lock Pros will explain material changes and obtain approval before proceeding with additional work.',
            'Payment is due as agreed for authorized work, parts, keys, and programming. A service request may be declined or rescheduled when necessary because of access, safety, parts availability, equipment compatibility, weather, legal requirements, or other circumstances.',
          ],
        },
        {
          title: 'Cut and programmed key policy',
          paragraphs: [
            'Keys, transponder keys, key fobs, remote-head keys, and push-to-start smart keys that are specially cut or programmed for a customer or vehicle are custom items. Once cutting or programming begins or is completed, those items and the associated cutting or programming services are final sale and are not eligible for a cash, card, or digital-payment refund, except when a refund is required by applicable law.',
            'If a key supplied, cut, or programmed by MI Lock Pros stops working on its own, contact us promptly and keep the original item and proof of purchase. If the key has no physical damage, water or liquid damage, misuse, tampering, unauthorized modification, lost components, or other customer-caused damage, MI Lock Pros will inspect it. When we determine that the problem resulted from our cutting or programming work or from a defect in an item we supplied, we will return to repair or reprogram the key. If repair or reprogramming is not reasonably practical, we may provide an appropriate replacement. This repair, reprogramming, or replacement remedy is provided instead of a refund, except where applicable law requires another remedy.',
            'This remedy does not cover loss or theft; water, impact, crushing, heat, battery leakage, misuse, tampering, or unauthorized modification; a vehicle-side, ignition, battery, immobilizer, electrical, or module problem; normal battery replacement; incompatible or defective customer-supplied parts; or a key or vehicle condition unrelated to MI Lock Pros’ work. Nothing in this policy limits a consumer right or remedy that cannot legally be waived.',
          ],
        },
        {
          title: 'Customer-supplied parts and information',
          paragraphs: [
            'A customer who asks MI Lock Pros to use a customer-supplied key, fob, lock, hardware item, code, or electronic component accepts the risk that it may be incompatible, previously programmed, defective, counterfeit, or otherwise unsuitable. MI Lock Pros is not responsible for defects in customer-supplied items, but remains responsible for its own work to the extent required by law.',
          ],
        },
        {
          title: 'Cancellations and legally protected rights',
          paragraphs: [
            'Any cancellation right depends on the type and circumstances of the transaction. Nothing in these Terms limits a cancellation, refund, warranty, or other consumer right that applies under federal, Michigan, or other applicable law and cannot be waived. If a separate written estimate, work order, or disclosure gives you additional rights, that document also applies.',
          ],
        },
        {
          title: 'Website information and third-party links',
          paragraphs: [
            'We work to keep website information accurate, but service descriptions, availability, coverage, and content may change. The website may link to Google, Facebook, Instagram, payment services, or other third parties. MI Lock Pros does not control and is not responsible for the content, availability, security, or policies of external services.',
          ],
        },
        {
          title: 'Disclaimers and limitations',
          paragraphs: [
            'To the fullest extent permitted by law, the website is provided on an “as available” basis, and MI Lock Pros is not liable for indirect, incidental, special, or consequential loss caused solely by use of or inability to use the website. These Terms do not exclude liability or obligations that cannot legally be excluded and do not replace any express written commitment MI Lock Pros makes for an authorized service.',
          ],
        },
        {
          title: 'Michigan law and changes',
          paragraphs: [
            'These Terms are governed by Michigan law, without limiting any mandatory protection that applies to you. We may update these Terms as services or legal requirements change. The effective date at the top identifies the current version.',
          ],
        },
      ]}
    />
  );
}
