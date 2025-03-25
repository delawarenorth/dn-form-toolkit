/**
 * Main Entry Point
 * Imports and initializes all form modules
 */

import { initForm } from "./form-scripts/core.js";
import { initUI } from "./form-scripts/ui.js";
import { initTurnstile } from "./form-scripts/integrations.js";

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize UI components
  initUI();

  // Initialize Turnstile integration
  initTurnstile();

  // Initialize form
  initForm();

  console.log("Form application initialized");
});
