/**
 * Form UI Module
 * Handles UI components and interactions
 */

// Initialize UI components
export function initUI() {
  // Create modal if it doesn't exist
  createModal();
}

// Create and append modal to body if it doesn't exist
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

    // Add modal styles
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

    // Add modal to body
    const modalDiv = document.createElement("div");
    modalDiv.innerHTML = modalHtml;
    document.body.appendChild(modalDiv.firstElementChild);
  }
}

// Show modal with message
export function showModal(title, message) {
  const modal = document.getElementById("validationModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");
  
  if (modal && modalMessage) {
    modalTitle.textContent = title || "Notification";
    modalMessage.textContent = message;
    modal.classList.add("show");
  }
}

// Close modal function (exposed to window for the onclick handler)
export function closeModal() {
  const modal = document.getElementById("validationModal");
  if (modal) {
    modal.classList.remove("show");
  }
}

// Expose closeModal to window for the onclick handler
window.closeModal = closeModal;
