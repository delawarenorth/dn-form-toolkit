/**
 * Form Integrations Module
 * Handles third-party integrations like Cloudflare Turnstile
 */

// Initialize Cloudflare Turnstile
export function initTurnstile() {
  const form = document.getElementById("SFMC_Form");

  if (form) {
    // Set the form action to the Turnstile handler
    form.action = "https://turnstile-handler-parks.digitalmarketing-213.workers.dev";

    // Find the submit button
    const submitButton = form.querySelector('button[type="submit"]');

    if (submitButton) {
      // Create Turnstile element
      const turnstileHTML = document.createElement("div");
      turnstileHTML.className = "cf-turnstile";

      // Get site key from script tag or container, fall back to default if not provided
      const scriptTag = document.querySelector("script[data-turnstile-key]");
      const container = document.querySelector("[data-turnstile-key]");
      const siteKey =
        scriptTag?.getAttribute("data-turnstile-key") ||
        container?.getAttribute("data-turnstile-key") ||
        "0x4AAAAAAAz294HADqzABjCG";

      turnstileHTML.setAttribute("data-sitekey", siteKey);

      // Insert before submit button
      submitButton.parentNode.insertBefore(turnstileHTML, submitButton);
    }
  }

  // Load Turnstile script
  loadTurnstileScript();
}

// Load the Turnstile script
function loadTurnstileScript() {
  // Check if script is already loaded
  if (document.querySelector('script[src*="turnstile/v0/api.js"]')) {
    return;
  }

  // Create and append script
  const script = document.createElement("script");
  script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
  script.setAttribute("async", "");
  script.setAttribute("defer", "");
  document.head.appendChild(script);
}

/**
 * Extract UTM parameters from URL and add them to the form as hidden fields
 * Captures utm_source, utm_medium, utm_campaign, utm_term, utm_content, etc.
 */
export function extractUtmParams() {
  const form = document.getElementById("SFMC_Form");

  if (!form) {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);

  // Loop through all URL parameters
  for (const [key, value] of urlParams.entries()) {
    // Only process UTM parameters
    if (key.startsWith("utm_")) {
      // Check if this UTM parameter already exists in the form
      const existingInput = form.querySelector(`input[name="${key}"]`);

      if (existingInput) {
        // Update existing field
        existingInput.value = value;
      } else {
        // Create new hidden field
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }
    }
  }
}
