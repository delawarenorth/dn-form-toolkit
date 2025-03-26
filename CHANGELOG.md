# Changelog

All notable changes to the Form Project will be documented in this file.

## [1.0.1] - 2025-03-26

### Fixed

- Implemented proper template literal minification in the bundle
- Created custom esbuild plugin to specifically target and minify template literals

### Changed

- Replaced command-line esbuild configuration with a JavaScript configuration file
- Updated build process to use a custom esbuild.config.js file
- Improved bundle size by removing unnecessary whitespace in template literals

### Technical Details

- Created custom esbuild plugin that uses regex to find and minify template literals
- Plugin applies specific transformations to template literal content:
  - Removes excessive whitespace
  - Removes whitespace between HTML tags
  - Trims leading and trailing whitespace
- Build script in package.json now uses `node esbuild.config.js` instead of direct esbuild CLI

## [1.0.0] - 2025-03-25

### Added

- Modular JavaScript architecture for form functionality
- ES modules implementation with proper imports/exports
- Build system using esbuild for bundling
- Minification and source maps for production builds
- ZIP/Postal code validation with API integration
- Modal component for displaying validation errors
- Cloudflare Turnstile integration for bot protection
- Development build option without minification

### Changed

- Reorganized form scripts into logical modules:
  - `core.js`: Core form functionality and initialization
  - `validators.js`: Form field validation logic
  - `ui.js`: UI components like modals
  - `integrations.js`: Third-party integrations like Turnstile
  - `main.js`: Entry point that initializes all modules
- Replaced multiple script tags with a single bundled JavaScript file
- Improved form submission handling with proper validation

### Technical Details

- Implemented ES modules for better code organization
- Added build scripts in package.json:
  - `npm run build`: Production build with minification and source maps
  - `npm run build:dev`: Development build without minification
- Bundle size reduced from ~6.2kb to ~3.9kb through minification
- Created .gitignore file to exclude node_modules from version control

### Removed

- Eliminated redundant JavaScript files
- Removed direct script loading of individual files

### Next Steps

- Consider adding more form field validations
- Implement form state management
- Add unit tests for validation logic
- Consider implementing a more robust UI feedback system
