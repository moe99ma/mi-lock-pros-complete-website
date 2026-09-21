MI LOCK PROS WORDPRESS THEME
============================

This upload-ready WordPress theme includes:

- Current responsive black-and-gold design with matching light and dark modes
- Click-to-call and click-to-text links for 734-249-5296
- Improved desktop/mobile menu, custom line-arrow icons, and phone icons
- Automotive, residential, and commercial category pages plus 19 individual service pages
- 103 crawlable, editable service-area pages with city-specific titles, descriptions, clickable local service links, related-area links, and structured data
- Local service views such as /service-areas/allen-park/services/automotive-locksmith/key-fob-programming/
- Vehicle key guide with 28 manufacturer pages and the 364 model families supplied by MI Lock Pros
- 16 optimized original job photos with professional captions, descriptive alternative text, and MI Lock Pros watermark placement
- WordPress-native Updates & Offers page for service photos, news, tips, and promotions
- Visible 4.9/5 Google rating and 223-review summary, plus optional live Google review text loaded securely through WordPress
- Service request form with validation, honeypot spam protection, rate limiting, loading state, and confirmation
- LocalBusiness/Locksmith, Service, FAQ, and WebSite structured data with all 103 supplied service areas
- A custom dark-and-gold Southeast Michigan coverage map and organized service-area directory
- Complete editable Privacy Policy and Terms and Conditions pages, including the cut-and-programmed-key policy
- Search metadata, Google/OpenAI crawler support, accessible navigation, focus states, and reduced-motion support
- A public /llms.txt facts page for AI systems and assistants that choose to read it
- Editable business information under Appearance > Customize


INSTALL THE THEME
=================

1. In WordPress, go to Appearance > Themes.
2. Select Add New Theme, then Upload Theme.
3. Upload mi-lock-pros-wordpress-theme-v2.zip and select Install Now. If WordPress says the theme already exists, choose “Replace current with uploaded.”
4. Activate “MI Lock Pros.”
5. Go to Appearance > Customize > MI Lock Pros business details.
6. Confirm the legal business name, phone, email, business hours, service area, Google URLs, social URLs, Place ID, and experience.
7. Go to Settings > Permalinks and select Save Changes once, even if you do not change the setting.
8. Go to Settings > Reading and make sure “Discourage search engines from indexing this site” is unchecked when the site is ready to be public.

Activating the theme creates editable Locksmith Services entries, 103 Service Areas entries, an Updates & Offers page, four useful post categories, a Privacy Policy, and a Terms and Conditions page. Version 2.0.0 also registers the individual service, city-service, vehicle directory, and vehicle-make routes. Open the dashboard once after updating, then save Settings > Permalinks once.


EDIT SERVICE-AREA PAGES
=======================

1. In WordPress, go to Dashboard > Service Areas.
2. Open a city or township page, such as Ann Arbor Locksmith or Detroit Locksmith.
3. The page title, excerpt, main editor content, featured image, and revisions are editable.
4. Keep the city name accurate. Add real first-hand details, original job photos, and helpful local information only when you have permission to publish them.
5. Do not add a city address, storefront, response-time claim, price, review, or job example unless it is accurate and verifiable.
6. After installing this upgrade, visit the WordPress dashboard once and then go to Settings > Permalinks and select Save Changes.

Each page uses a /service-areas/city-name/ URL and is linked from the homepage directory. Public city pages are included automatically in WordPress's /wp-sitemap.xml and are the indexable pages designed for searches such as “locksmith Allen Park.” Each listed service links to a city-aware detail view, such as “Key Fob Programming in Allen Park.” Those combination views are marked noindex/follow to avoid thousands of near-duplicate doorway pages while still giving visitors the requested local experience and passing internal-link value. The templates clearly identify MI Lock Pros as a mobile service business and do not claim a separate office in every city.


PUBLISH AN UPDATE, PHOTO, TIP, OR DEAL
=====================================

1. In WordPress, go to Posts > Add New.
2. Enter a clear title and write the update in the block editor.
3. In the right sidebar, select one category: Deals & Offers, Recent Work, Locksmith Tips, or Service Updates.
4. Add a Featured Image. Use an original photo you own and add useful alternative text that describes the image.
5. Add a short Excerpt for the Updates page card.
6. Preview the post on desktop and mobile, then select Publish.

Published posts appear on /updates/, which is linked from the desktop and mobile menus. Updates do not appear on the homepage. WordPress also creates individual article pages and category archives. To change something later, go to Posts > All Posts. To temporarily remove an expired deal, change its status to Draft rather than deleting it.

For customer privacy, get permission before posting a customer, employee, home, vehicle, or workplace. Crop or blur faces, street addresses, license plates, VINs, IDs, key cuts, security codes, alarm panels, and other sensitive access information. Deals should include the start/end date, eligibility, limits, and any important conditions. Never offer a discount or benefit in exchange for a Google review.


CONNECT LIVE GOOGLE REVIEWS SECURELY
====================================

The Google Place ID is already set to:
ChIJMziEN2m48qsRqrsu2imLHwc

The live review feed also requires a Google Places API key:

1. Open Google Cloud Console and select or create a project.
2. Attach a billing account to the project.
3. Enable “Places API (New).”
4. Go to APIs & Services > Credentials and create an API key.
5. Restrict the key to “Places API (New).” If your web host provides a stable outbound server IP, also apply an IP-address application restriction for that server. Ask the host which outbound IP WordPress uses before adding this restriction.
6. Open wp-config.php on the WordPress server and add this line immediately above the line that says “That’s all, stop editing”:

define( 'MI_LOCK_PROS_GOOGLE_PLACES_API_KEY', 'PASTE_YOUR_RESTRICTED_KEY_HERE' );

Alternatively, set a private server environment variable named GOOGLE_PLACES_API_KEY. Do not put the API key into site.js, functions.php, the Customizer, a page builder, or any public frontend code.

The theme requests reviews from Google on the server, sanitizes the response, and caches it for one hour. Without the key, the site displays the official Google profile and review links without showing invented ratings or reviews.


SERVICE REQUEST EMAIL
=====================

Requests are sent through WordPress wp_mail() to:
admin@milockprosllc.com

This mailbox is hosted by Google Workspace. For dependable delivery, configure WP Mail SMTP with its Google / Gmail connection, or use Google SMTP with a Google app password:

- SMTP host: smtp.gmail.com
- Encryption: TLS
- Port: 587
- Authentication: On
- Username and From Email: admin@milockprosllc.com
- Password: a Google app password, not the normal Google Account password

Force the From Email to admin@milockprosllc.com, save the settings, and use WP Mail SMTP > Tools > Email Test before testing the website form. Google app passwords require 2-Step Verification. If app passwords are unavailable for the account, use the plugin’s Google / Gmail authorization connection instead. Never paste Google, SMTP, or API credentials into a public page, the theme, the Customizer, or frontend JavaScript.

When a visitor supplies an email address, the notification sets Reply-To to that customer so the business can use the normal Reply button. When no customer email is supplied, use the required phone number to call or text according to the requested contact method.


CURRENT BUSINESS DETAILS
========================

Legal name: MI Lock Pros LLC
Phone: 734-249-5296
Email: admin@milockprosllc.com
Business hours: Open 24 hours
Google Business Profile: https://share.google/v9Mx8tqQuBiI7ZhBa
Leave a Google review: https://g.page/r/Caq7Ltopix8HEAI/review
Google Place ID: ChIJMziEN2m48qsRqrsu2imLHwc
Facebook: https://www.facebook.com/p/MI-LOCK-PROS-LLC-61566472695093/
Instagram: https://www.instagram.com/milockpros/
Service area: Southeast Michigan — 103 supplied communities are included in the theme
Years of experience: 5 years


SEO AND AI SEARCH CHECKLIST
===========================

- Use your final domain with HTTPS.
- Make sure the website is publicly accessible without a login before submitting it to search engines.
- Review the 103 listed service areas and remove any location the business does not actually serve.
- Keep the company name, phone, hours, and website consistent on the Google Business Profile and other legitimate business listings.
- Verify the domain in Google Search Console and submit WordPress's sitemap URL, normally /wp-sitemap.xml.
- Leave the main service and service-area pages public, but add useful, accurate, first-hand details over time. City pages target natural phrases such as “locksmith in Allen Park,” while local service views remain noindex to reduce doorway-page risk.
- The theme permits OAI-SearchBot and ChatGPT-User in robots.txt, but no website can guarantee rankings, Google visibility, or inclusion in AI answers.
- If an SEO plugin such as Yoast, Rank Math, or AIOSEO is active, the theme avoids duplicating its basic meta tags. Configure that plugin carefully and keep only one source of SEO metadata.


WORDPRESS.COM NOTE
==================

If the site is hosted on WordPress.com rather than a separate WordPress host, custom theme upload requires an eligible paid plan. On self-hosted WordPress, theme upload is available from Appearance > Themes for administrators.


SUPPORT / EDITING MAP
=====================

- Business settings: Appearance > Customize > MI Lock Pros business details
- Service pages: Dashboard > Locksmith Services
- City and township pages: Dashboard > Service Areas
- Updates, photos, tips, and deals: Dashboard > Posts
- Privacy and Terms: Dashboard > Pages
- Logo: Appearance > Customize > Site Identity
- Main layout: front-page.php
- Styling: assets/css/site.css and assets/css/current.css
- Interactions: assets/js/site.js
- Server integrations and SEO: functions.php

Theme version: 2.3.3
