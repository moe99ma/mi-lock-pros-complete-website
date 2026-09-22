# MI Lock Pros complete website

Private source-code backup and release archive for the MI Lock Pros website.

MI Lock Pros provides mobile automotive, residential, and commercial locksmith services across Ann Arbor, Detroit, and Southeast Michigan.

## Website links

- **Live WordPress website:** [milockprosllc.com](https://milockprosllc.com/)
- **Hosted website copy:** [mi-lock-pros.moemah99.chatgpt.site](https://mi-lock-pros.moemah99.chatgpt.site/)
- **Latest WordPress theme:** [Download the latest GitHub release](https://github.com/moe99ma/mi-lock-pros-complete-website/releases/latest)
- **Business phone:** [734-249-5296](tel:+17342495296)

## Current release

**WordPress theme version: 2.3.5**

Version 2.3.5 includes:

- A responsive black-and-gold design for phones, tablets, and computers
- Dark mode by default with an optional light-mode toggle
- A corrected mobile announcement banner with readable, non-overlapping text
- Reframed recent-work photos that keep keys and locks visible
- A pop-up request-service form available throughout the website
- Automotive, residential, and commercial service pages
- Individual city pages and city-specific service pages
- Vehicle-make and model coverage pages
- Google review rating integration and manual refresh control
- Privacy Policy, Terms, sitemap, structured data, and local SEO foundations

> **Important:** Install the ZIP attached to the GitHub Release. Do not install GitHub's automatically generated **Source code (zip)** file as a WordPress theme.

## Repository contents

The complete backup is stored inside the `mi-lock-pros-complete-website-backup-2026-09-21 2` folder.

| Location | Purpose |
| --- | --- |
| `wordpress-theme/` | Editable WordPress theme source: PHP, CSS, JavaScript, images, vehicle data, city pages, and service templates |
| `hosted-site-source/` | Editable React/Vinext source for the separately hosted website |
| `releases/` | Previously packaged WordPress theme installers |
| `documentation/` | Website navigation and maintenance documentation |
| `VERSION.txt` | Version information for the backup |

Generated dependency and build folders are intentionally excluded because they can be rebuilt.

## Installing the WordPress theme

1. Open the repository's [latest release](https://github.com/moe99ma/mi-lock-pros-complete-website/releases/latest).
2. Download `mi-lock-pros-wordpress-theme-v2.3.5.zip` from **Assets**.
3. Sign in to the WordPress dashboard.
4. Open **Appearance → Themes → Add Theme → Upload Theme**.
5. Select the downloaded ZIP and choose **Install Now**.
6. If WordPress reports that the theme already exists, choose **Replace current with uploaded**.
7. Activate the theme if WordPress does not keep it active automatically.

### Clear caches after an update

After replacing the theme, clear each cache that is enabled:

1. In Hostinger, open **Websites → Dashboard → Cache Manager → Purge All**.
2. Open **WordPress → Overview → Flush Cache**.
3. If Hostinger CDN is active, open **Performance → CDN → Flush cache**.
4. If LiteSpeed Cache is installed, open **LiteSpeed Cache → Toolbox → Purge → Purge All**.
5. Test the website in a new private or incognito browser window.

## Main website sections

- Homepage and mobile navigation
- Locksmith service categories
- Recent locksmith work
- Service coverage directory
- About MI Lock Pros
- Simple service process
- Google customer reviews
- Vehicle key coverage
- Updates and offers
- Contact and request-service form
- Privacy Policy and Terms

## Local service-area structure

The website contains 103 listed Southeast Michigan communities. Each location has a dedicated page such as:

```text
/service-areas/ann-arbor/
```

Services selected from a city page open a city-specific service address such as:

```text
/service-areas/ann-arbor/services/automotive-locksmith/key-fob-programming/
```

This structure helps visitors see the selected service together with their city. Every city and service must accurately represent the areas and work MI Lock Pros currently serves. Rankings are never guaranteed.

## Request-service form

The form requires a ZIP code and service information. A customer may provide either a phone number or an email address; both are not required.

Never store customer submissions, passwords, access codes, payment details, or private customer information in this repository.

## Google reviews

The website can retrieve the current Google rating and review count through **Places API (New)**. The Google Places API key must be stored as a server-side secret or in the WordPress Customizer field provided by the theme.

Never commit the API key to GitHub or add it to browser-visible JavaScript.

## Saving future website updates

After changing the local repository:

1. Open GitHub Desktop.
2. Review the changed files.
3. Enter a clear summary such as `Update WordPress theme to 2.3.6`.
4. Click **Commit to main**.
5. Click **Push origin**.
6. Create a GitHub Release for each finished theme version and attach the installable WordPress ZIP.

Use version tags such as `v2.3.5`, `v2.3.6`, and `v2.4.0`.

## Security and backup notes

- Keep this repository private unless MI Lock Pros intentionally decides to publish its source code.
- Never commit passwords, API keys, SMTP credentials, access tokens, customer requests, alarm codes, door codes, or payment information.
- Store secrets in Hostinger, WordPress settings, or the hosting platform's secret manager.
- This repository backs up the website code and bundled assets. It does not replace a full Hostinger backup of the WordPress database, Media Library, plugins, users, settings, or form submissions.
- Keep regular Hostinger backups in addition to this GitHub source-code backup.

## Updating the two website versions

- For the live WordPress domain, update `wordpress-theme/`, package a new WordPress ZIP, upload it to WordPress, and clear all caches.
- For the separately hosted website, update `hosted-site-source/`, rebuild it, and publish it through its hosting service.

---

© 2026 MI Lock Pros LLC. Repository maintained as a private business website backup.
