# Delaware North Form Toolkit

This project provides a standardized form implementation with validation, third-party integrations, and UI enhancements for Delaware North's web properties.

## Features

- **ZIP/Postal Code Validation** for U.S. and Canada
- **Cloudflare Turnstile Integration** for enhanced bot protection
- **Automatic UTM Parameter Extraction** to improve marketing campaign tracking
- **Validation Modals** to provide user-friendly feedback on form errors
- **Optimized JavaScript Bundling** via esbuild

## Repository Structure

```
assets/
  ├── css/
  │   └── style.css
  └── js/
      ├── form-scripts/
      │   ├── core.js
      │   ├── integrations.js
      │   ├── ui.js
      │   └── validators.js
      ├── bundle.js
      └── main.js
index.html
esbuild.config.js
```

## How to Implement on Your Website

### Step 1: Include CSS and JavaScript via jsDelivr

Add these lines in your website's `<head>` or before the closing `</body>` tag:

```html
<script src="https://cdn.jsdelivr.net/gh/delawarenorth/dn-form-toolkit@latest/assets/js/bundle.js"></script>
```

_Replace `{GITHUB_USERNAME}` and `{REPO_NAME}` with your GitHub username and repository name._

### Step 2: HTML Markup

Use the provided form markup (`index.html`) as a reference and customize it for your website.

### Step 3: Customizing the Form

- Update hidden input fields like `restaurant` and `thanks` URLs based on your needs.
- Ensure fields have the correct `name` attributes (`email`, `first_name`, `last_name`, `zipcode`).

### Step 4: Deployment

Commit your changes, push them to the GitHub repository, and jsDelivr will automatically serve the updated files.

## Building and Developing

### Prerequisites

- Node.js installed locally

### Installation

Run the following command to install dependencies:

```bash
npm install
```

### Build Commands

- **Production Build (minified and optimized)**:

```bash
npm run build
```

- **Development Build (non-minified)**:

```bash
npm run build:dev
```

## Changelog

Refer to [CHANGELOG.md](CHANGELOG.md) for details about project updates.

## Future Enhancements

- Additional validations
- Improved form state management
- Unit testing coverage

---

Contact the project maintainer for further assistance or feedback.
