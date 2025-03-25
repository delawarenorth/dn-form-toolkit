/**
 * Form Integrations Module
 * Handles third-party integrations like Cloudflare Turnstile
 */

// Initialize Cloudflare Turnstile
export function initTurnstile() {
  const form = document.getElementById("SFMC_Form");
  
  if (form) {
    // Set the form action to the Turnstile handler
    form.action = "https://turnstile-handler.digitalmarketing-213.workers.dev";

    // Find the submit button
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (submitButton) {
      // Create Turnstile element
      const turnstileHTML = document.createElement("div");
      turnstileHTML.className = "cf-turnstile";
      turnstileHTML.setAttribute("data-sitekey", "0x4AAAAAAA7xhXywyI0cvp43");

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
