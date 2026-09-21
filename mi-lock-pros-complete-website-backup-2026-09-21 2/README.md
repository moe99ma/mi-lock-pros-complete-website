# MI Lock Pros complete website backup

Backup prepared September 21, 2026.

This folder contains the complete editable website files plus the ready-to-upload WordPress theme package. Keep the GitHub repository private unless MI Lock Pros deliberately chooses to publish the source code.

## Included files

- `wordpress-theme/` - Complete editable WordPress theme source, including PHP templates, CSS, JavaScript, vehicle data, service-area templates, and website images.
- `hosted-site-source/` - Complete editable source for the hosted React/Vinext version of the website. Generated folders and installed dependencies are intentionally excluded because they can be rebuilt.
- `releases/mi-lock-pros-wordpress-theme-v2.3.3.zip` - Installable WordPress theme package.
- `documentation/MI-Lock-Pros-Website-Navigation-Guide.pdf` - Visual guide explaining the homepage, menu, Ann Arbor city page, city-specific service pages, and request form.

## Recommended GitHub method

Use a private GitHub repository named `mi-lock-pros-complete-website`.

### Option 1: GitHub Desktop

1. Create or sign in to a GitHub account.
2. Install GitHub Desktop from https://desktop.github.com/.
3. Extract the complete backup ZIP before continuing.
4. In GitHub Desktop, choose **File > Add Local Repository** and select this folder.
5. If GitHub Desktop says the folder is not a repository, choose **Create a repository here**.
6. Use `mi-lock-pros-complete-website` as the repository name.
7. Enter `Initial complete website backup` in the commit summary.
8. Click **Commit to main**.
9. Click **Publish repository**.
10. Keep **Keep this code private** selected, then publish.

### Option 2: Terminal

First create an empty **private** repository on GitHub named `mi-lock-pros-complete-website`. Do not initialize it with a README, license, or `.gitignore`. Then run these commands from this extracted backup folder:

```bash
git init
git add .
git commit -m "Initial complete website backup"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/mi-lock-pros-complete-website.git
git push -u origin main
```

Replace `YOUR-GITHUB-USERNAME` with the account name that owns the new repository. GitHub may ask you to sign in through a browser or use a personal access token.

Official GitHub instructions: https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github

## Saving future changes

After updating files inside the repository, use GitHub Desktop to enter a short summary, commit the changes, and push them. From Terminal, use:

```bash
git add .
git commit -m "Describe the website update"
git push
```

Use clear version tags such as `v2.3.3`, `v2.3.4`, and `v2.4.0`. Attach each finished WordPress ZIP to a GitHub Release so an exact installable copy remains available.

## Publishing the WordPress theme

1. Sign in to WordPress.
2. Open **Appearance > Themes > Add Theme > Upload Theme**.
3. Upload `releases/mi-lock-pros-wordpress-theme-v2.3.3.zip`.
4. Install and activate the theme.
5. Clear the WordPress, hosting, and CDN caches.
6. Test the homepage, menu, request form, city pages, service links, phone links, and mobile layout.

Do not upload the `hosted-site-source` folder directly through WordPress. That folder is source code for the separately hosted version. The ZIP inside `releases/` is the WordPress installer.

## Rebuilding the hosted-site source

The hosted source requires Node.js 22.13 or newer and npm:

```bash
cd hosted-site-source
npm install
npm run build
```

The `node_modules`, `.next`, `dist`, `.vinext`, `.wrangler`, and runtime cache folders are excluded because they are generated automatically.

## Security and backup limits

- Never commit passwords, API keys, SMTP credentials, access tokens, customer requests, alarm codes, door codes, or payment information.
- Keep real environment values in the hosting provider's secret manager, not in GitHub.
- This package backs up the website code and bundled images. It does not back up the live WordPress database, Media Library uploads added through WordPress, plugin settings, users, form submissions, or hosting configuration.
- Use the hosting provider's backup tool or a reputable WordPress backup plugin for the database and Media Library. Store that backup securely, not in the source-code repository.
- Review `.gitignore` before committing any new backup or configuration file.

## Which folder should be edited?

- For the live WordPress domain, edit `wordpress-theme/`, create a new theme ZIP, and upload the new ZIP to WordPress.
- For the separately hosted React/Vinext website, edit `hosted-site-source/`, rebuild it, and deploy it through its hosting service.

