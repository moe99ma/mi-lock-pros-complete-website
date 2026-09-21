# MI Lock Pros website

A responsive, production-ready marketing website for MI Lock Pros. It includes automotive, residential, and commercial service pages; 103 linked service-area pages; a verified Google rating snapshot; an Updates & Offers presentation page; an accessible request-service form; local-business and service structured data; crawler controls; a sitemap; and complete privacy and terms pages.

## Requirements

- Node.js 22.13 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production check:

```bash
npm run build
npm run start
```

## Update the business information

All recurring business details and service lists are in `lib/site-config.ts`. Replace every bracketed placeholder before launch:

| Field | Current value |
| --- | --- |
| Phone | `734-249-5296` |
| Email | `admin@milockprosllc.com` |
| Service area | `Southeast Michigan` (103 supplied communities in `serviceAreaGroups`) |
| Business hours | `Open 24 hours` |
| Years of experience | `5 years` |
| Google Business Profile | `https://share.google/v9Mx8tqQuBiI7ZhBa` |
| Google review form | `https://g.page/r/Caq7Ltopix8HEAI/review` |
| Google Place ID | `ChIJMziEN2m48qsRqrsu2imLHwc` |

Facebook and Instagram are configured in `socialLinks`; add LinkedIn only if the business creates an official profile. The Privacy Policy and Terms are dated September 16, 2026. Have a Michigan attorney review business-specific legal language before relying on it in a dispute.

Do not add claims such as “licensed,” “insured,” “24/7,” guaranteed response times, ratings, certifications, or warranties unless they are accurate and approved.

## Connect the request-service form

The form currently performs full client-side validation, shows loading/error/success states, and includes a hidden honeypot. In placeholder mode, it clearly tells the visitor that delivery is not connected rather than pretending the request was received.

To use a hosted form provider:

1. Create a form with a provider such as Formspree, Basin, or a provider of your choice.
2. Copy its HTTPS submission endpoint.
3. Set `formEndpoint` in `lib/site-config.ts`.
4. Configure the provider’s notification email, allowed domain, spam protection, and retention settings.
5. Test a real submission in production.

The frontend sends JSON. If the provider requires a private token or a different payload, create a server-side route that accepts this form, adds the secret on the server, and forwards the request. Store secrets in the hosting platform’s environment-variable or secrets manager—never in `site-config.ts`, React components, or any `NEXT_PUBLIC_*` variable.

For stronger spam protection, add Cloudflare Turnstile, hCaptcha, or reCAPTCHA to the form and verify its token on the server. The existing honeypot should remain as a low-friction extra layer.

## Google reviews

No review text or reviewer names are fabricated in this project. The homepage displays the 4.9 average and 223-review count verified from the official Google profile on September 16, 2026, then sends visitors to Google for current feedback and totals.

The server-side `/api/google-reviews` route remains available if a live Google Places connection is needed later:

1. Enable Places API (New) in a Google Cloud project with billing.
2. Create a server credential restricted to Places API (New). Google says web-service keys should stay outside source code and should be restricted by application and API.
3. For local development, copy `.env.example` to `.env.local` and set `GOOGLE_PLACES_API_KEY` there. Never commit `.env.local`.
4. For the deployed site, add `GOOGLE_PLACES_API_KEY` as a secret environment variable in the hosting settings and redeploy the current version.

The verified MI Lock Pros Place ID is already configured. The API route requests only `displayName,rating,userRatingCount,googleMapsUri,reviews`, caches successful responses at the edge for one hour, and returns only the fields used by the browser. Review cards include the author attribution, relative publish time, and direct Google Maps source link required by Google’s display policies.

Official references:

- [Place Details (New)](https://developers.google.com/maps/documentation/places/web-service/place-details)
- [Places API policies and review attribution](https://developers.google.com/maps/documentation/places/web-service/policies)
- [Google Maps Platform API security](https://developers.google.com/maps/api-security-best-practices)

The Google profile and leave-a-review buttons are connected through `lib/site-config.ts`.

## Publishing updates, photos, tips, and deals

The hosted preview includes `/updates` and the matching homepage section, but it is not a content-management system. The upload-ready WordPress theme in `../mi-lock-pros-wordpress-theme.zip` uses native WordPress Posts so the business can add and edit updates without changing code.

For safe publishing, use original first-hand content; get permission before showing customers or private property; hide faces, addresses, plates, VINs, IDs, key cuts, and access codes when appropriate; give every offer clear dates and conditions; and never offer compensation for a Google review.

## SEO and launch checklist

- Make the site public. Search engines and AI search crawlers cannot index an owner-only site that requires sign-in.
- Replace the service-area, business-hours, and experience placeholders with accurate facts. Add only a real public street address if customers can visit it.
- Connect a custom domain, then update `siteUrl` in `lib/site-config.ts` so canonical URLs, the sitemap, structured data, and social previews all use that domain.
- Verify the public domain in Google Search Console and Bing Webmaster Tools. Add their tokens as `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION`, then submit `/sitemap.xml` in both services.
- Keep the business name, phone, website, hours, and service area consistent across the website, Google Business Profile, Bing Places, Apple Business Connect, and trusted directories.
- Review every listed service-area page and remove any community the business does not actually serve. Add real local job details or original photos over time; do not create city pages only to manipulate rankings.
- Add the final public website URL to the Google Business Profile and keep the profile complete and accurate.
- Confirm the page titles, meta descriptions, canonical links, Open Graph image, and JSON-LD with Google’s Rich Results Test.
- If a real street address is intentionally public, add it to the LocalBusiness JSON-LD in `app/page.tsx`; otherwise do not invent one.
- Connect form delivery and submit a real end-to-end test.
- Connect Google reviews or keep the clearly labeled placeholder hidden until ready.
- Review policy pages and business claims.
- Run `npm run build` before every release.

### Included search and AI-discovery work

- Crawlable, canonical metadata for the home page, each service page, and each listed service-area page.
- Dedicated automotive, residential, and commercial locksmith pages with useful, non-duplicated customer guidance.
- A browseable `/service-area` directory linking to 103 `/service-areas/city-name` pages with mobile-service disclosures, service details, nearby-area navigation, and location-specific `Service` data.
- `Locksmith`, `LocalBusiness`, `WebSite`, `Service`, `OfferCatalog`, `BreadcrumbList`, and visible `FAQPage` structured data without invented ratings or claims.
- `/robots.txt` rules that allow normal search crawlers, `OAI-SearchBot`, and `ChatGPT-User`, while excluding the review API route.
- `/sitemap.xml` with the home page, updates page, service pages, all service-area pages, and legal pages.
- Internal links between the home page, each service page, the request form, and contact information.

There is no honest way to guarantee rankings or inclusion in an AI answer. Search visibility depends on public crawl access, accurate local-business information, helpful first-hand content, reputation, citations, competition, and time. Avoid doorway pages, keyword stuffing, fabricated location pages, fake reviews, or unsupported claims.

## Deployment

This project uses the Sites-compatible Vinext/Vite build. `npm run build` creates the deployable `dist` output.

For Codex Sites, ask Codex to publish the site; it will package the validated build and provide a private deployment URL. To use another Cloudflare Workers-compatible provider, configure it to run `npm install` and `npm run build`, deploy the generated Worker output, and set any server-only form or Google API credentials in that provider’s secret store.

If you connect a custom domain, use that final HTTPS origin for canonical and social metadata, then rebuild and redeploy.
