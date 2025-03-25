/**
 * Form Core Module
 * Handles core form functionality and initialization
 */

// Import validation from validators module
import { validateAllFields } from "./validators.js";

// Form initialization function
export function initForm() {
  const form = document.getElementById("SFMC_Form");

  if (form) {
    console.log("Form initialized");

    // Set up form submission handler
    form.addEventListener("submit", handleFormSubmit);
  }
}

// Form submission handler
export async function handleFormSubmit(e) {
  e.preventDefault();

  // Get form instance
  const form = e.target;

  // Validate form
  const isValid = await validateForm(form);

  if (isValid) {
    // If validation passes, submit the form
    form.submit();
  }
}

// Form validation orchestrator
export async function validateForm(form) {
  // Run all field validations
  return await validateAllFields(form);
}
