// assets/js/form-scripts/ui.js
function initUI() {
  createModal();
}
function createModal() {
  if (!document.getElementById("validationModal")) {
    const modalHtml = `
      <div id="validationModal" class="modal">
        <div class="modal-content">
          <h4 id="modalTitle">Validation Error</h4>
          <p id="modalMessage"></p>
          <button class="btn btn-primary" onclick="closeModal()">Close</button>
        </div>
      </div>
    `;
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
      }
      .modal.show {
        display: block;
      }
      .modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        max-width: 500px;
      }
    `;
    document.head.appendChild(styleSheet);
    const modalDiv = document.createElement("div");
    modalDiv.innerHTML = modalHtml;
    document.body.appendChild(modalDiv.firstElementChild);
  }
}
function showModal(title, message) {
  const modal = document.getElementById("validationModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");
  if (modal && modalMessage) {
    modalTitle.textContent = title || "Notification";
    modalMessage.textContent = message;
    modal.classList.add("show");
  }
}
function closeModal() {
  const modal = document.getElementById("validationModal");
  if (modal) {
    modal.classList.remove("show");
  }
}
window.closeModal = closeModal;

// assets/js/form-scripts/validators.js
var ZipCodeValidator = class {
  constructor() {
    this.usBaseUrl = "https://api.zippopotam.us/us/";
    this.caBaseUrl = "https://api.zippopotam.us/ca/";
    this.cache = /* @__PURE__ */ new Map();
  }
  isUSZipCode(code) {
    return /^\d{5}(-\d{4})?$/.test(code);
  }
  isCanadianPostalCode(code) {
    return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(code);
  }
  formatCanadianPostalCode(code) {
    return code.replace(/[\s-]/g, "").toUpperCase().replace(/(.{3})(.{3})/, "$1 $2");
  }
  async validate(code) {
    code = code.trim();
    if (this.isUSZipCode(code)) {
      const baseZip = code.split("-")[0].trim();
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
          country: "United States"
        };
        this.cache.set(baseZip, result);
        return result;
      } catch (error) {
        return {
          valid: false,
          error: "Please enter a valid US ZIP code (12345 or 12345-1234)"
        };
      }
    }
    if (this.isCanadianPostalCode(code)) {
      const formattedCode = this.formatCanadianPostalCode(code);
      const fsa = formattedCode.substring(0, 3);
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
          country: "Canada"
        };
        this.cache.set(formattedCode, result);
        return result;
      } catch (error) {
        return {
          valid: false,
          error: "Please enter a valid Canadian postal code (A1A 1A1)"
        };
      }
    }
    return {
      valid: false,
      error: "Please enter a valid US ZIP code (12345 or 12345-1234) or Canadian postal code (A1A 1A1)"
    };
  }
};
async function validateZipCode(zipCodeField) {
  const zipValidator = new ZipCodeValidator();
  const validationResult = await zipValidator.validate(zipCodeField.value);
  if (!validationResult.valid) {
    showModal("Validation Error", validationResult.error);
    return false;
  }
  return true;
}
async function validateAllFields(form) {
  const zipCodeField = form.querySelector('[name="zipcode"], [name="postal code"], [name="zip code"]');
  if (zipCodeField) {
    const isZipValid = await validateZipCode(zipCodeField);
    if (!isZipValid) return false;
  }
  return true;
}

// assets/js/form-scripts/core.js
function initForm() {
  const form = document.getElementById("SFMC_Form");
  if (form) {
    console.log("Form initialized");
    form.addEventListener("submit", handleFormSubmit);
  }
}
async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const isValid = await validateForm(form);
  if (isValid) {
    form.submit();
  }
}
async function validateForm(form) {
  return await validateAllFields(form);
}

// assets/js/form-scripts/integrations.js
function initTurnstile() {
  const form = document.getElementById("SFMC_Form");
  if (form) {
    form.action = "https://turnstile-handler.digitalmarketing-213.workers.dev";
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      const turnstileHTML = document.createElement("div");
      turnstileHTML.className = "cf-turnstile";
      turnstileHTML.setAttribute("data-sitekey", "0x4AAAAAAAz294HADqzABjCG");
      submitButton.parentNode.insertBefore(turnstileHTML, submitButton);
    }
  }
  loadTurnstileScript();
}
function loadTurnstileScript() {
  if (document.querySelector('script[src*="turnstile/v0/api.js"]')) {
    return;
  }
  const script = document.createElement("script");
  script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
  script.setAttribute("async", "");
  script.setAttribute("defer", "");
  document.head.appendChild(script);
}
function extractUtmParams() {
  const form = document.getElementById("SFMC_Form");
  if (!form) {
    return;
  }
  const urlParams = new URLSearchParams(window.location.search);
  for (const [key, value] of urlParams.entries()) {
    if (key.startsWith("utm_")) {
      const existingInput = form.querySelector(`input[name="${key}"]`);
      if (existingInput) {
        existingInput.value = value;
      } else {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }
    }
  }
}

// assets/js/main.js
document.addEventListener("DOMContentLoaded", () => {
  initUI();
  initTurnstile();
  extractUtmParams();
  initForm();
  console.log("Form application initialized");
});
