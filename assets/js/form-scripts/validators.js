/**
 * Form Validators Module
 * Contains validation logic for form fields
 */

// Import UI components for displaying validation errors
import { showModal } from "./ui.js";

// ZIP/Postal Code Validator Class
export class ZipCodeValidator {
  constructor() {
    this.usBaseUrl = "https://api.zippopotam.us/us/";
    this.caBaseUrl = "https://api.zippopotam.us/ca/";
    this.cache = new Map();
  }

  isUSZipCode(code) {
    return /^\d{5}(-\d{4})?$/.test(code);
  }

  isCanadianPostalCode(code) {
    return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(code);
  }

  formatCanadianPostalCode(code) {
    // Remove any spaces or hyphens and convert to uppercase
    return code
      .replace(/[\s-]/g, "")
      .toUpperCase()
      .replace(/(.{3})(.{3})/, "$1 $2");
  }

  async validate(code) {
    // Clean up the input
    code = code.trim();

    // Check if it's a US ZIP code
    if (this.isUSZipCode(code)) {
      const baseZip = code.split("-")[0].trim();

      // Check cache
      if (this.cache.has(baseZip)) {
        return this.cache.get(baseZip);
      }

      try {
        const response = await fetch(`${this.usBaseUrl}${baseZip}`);
        if (!response.ok) {
          throw new Error("Invalid ZIP code");
        }

        const data = await response.json();
        const result = {
          valid: true,
          city: data.places[0]["place name"],
          state: data.places[0]["state abbreviation"],
          country: "United States",
        };

        this.cache.set(baseZip, result);
        return result;
      } catch (error) {
        return {
          valid: false,
          error: "Please enter a valid US ZIP code (12345 or 12345-1234)",
        };
      }
    }

    // Check if it's a Canadian postal code
    if (this.isCanadianPostalCode(code)) {
      const formattedCode = this.formatCanadianPostalCode(code);
      const fsa = formattedCode.substring(0, 3);

      // Check cache
      if (this.cache.has(formattedCode)) {
        return this.cache.get(formattedCode);
      }

      try {
        const response = await fetch(`${this.caBaseUrl}${fsa}`);
        if (!response.ok) {
          throw new Error("Invalid postal code");
        }

        const data = await response.json();
        const result = {
          valid: true,
          city: data.places[0]["place name"],
          state: data.places[0]["state abbreviation"],
          country: "Canada",
        };

        this.cache.set(formattedCode, result);
        return result;
      } catch (error) {
        return {
          valid: false,
          error: "Please enter a valid Canadian postal code (A1A 1A1)",
        };
      }
    }

    return {
      valid: false,
      error: "Please enter a valid US ZIP code (12345 or 12345-1234) or Canadian postal code (A1A 1A1)",
    };
  }
}

// Form field validators
export async function validateZipCode(zipCodeField) {
  const zipValidator = new ZipCodeValidator();
  const validationResult = await zipValidator.validate(zipCodeField.value);

  if (!validationResult.valid) {
    showModal("Validation Error", validationResult.error);
    return false;
  }

  return true;
}

// Export a function to validate all form fields
export async function validateAllFields(form) {
  // Get zip code field - check for different naming variations
  const zipCodeField = form.querySelector('[name="zipcode"], [name="postal code"], [name="zip code"]');

  if (zipCodeField) {
    const isZipValid = await validateZipCode(zipCodeField);
    if (!isZipValid) return false;
  }

  // Add more field validations as needed

  return true;
}
