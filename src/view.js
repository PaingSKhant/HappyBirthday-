import { startGiftExperience } from "./gift.js";

export function createHeart(x, y) {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  const heartTypes = ["💖", "💕", "❤️", "🌸", "oi", "💗"];
  heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];

  const angle = Math.random() * Math.PI * 2;
  const distance = 80 + Math.random() * 100;

  const destinationX = Math.cos(angle) * distance + "px";
  const destinationY = Math.sin(angle) * distance + "px";

  heart.style.setProperty("--x", destinationX);
  heart.style.setProperty("--y", destinationY);

  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1000);
}

export function createDynamicModal() {
  const overlay = document.createElement("div");
  overlay.id = "login-modal";
  overlay.className = "modal-overlay";

  overlay.innerHTML = `
    <div class="modal-card">
      <button id="close-modal" class="close-btn">&times;</button>
      <h2>Welcome, Watashi No Tenshi! 💖</h2>
      <p class="modal-subtitle">Enter our secret code to unlock your gift</p>
      
      <form id="login-form">
        <div class="input-group">
          <label for="password">Secreto Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder="e.g. MaMa's nickname" 
            autocomplete="off" 
            required 
          />
        </div>
        <p id="error-msg" class="error-msg hidden">Oi! What u typing hungry aneki 😐</p>
        <button type="submit" id="submit-login">Unlock 🌸</button>
      </form>
    </div>
  `;

  // Append overlay to the body
  document.body.appendChild(overlay);

  // Focus input automatically
  const passwordInput = overlay.querySelector("#password");
  passwordInput.focus();

  // Handle Modal Closing
  const closeBtn = overlay.querySelector("#close-modal");
  closeBtn.addEventListener("click", () => {
    removeModal(overlay);
  });

  // Handle Form Submission
  const form = overlay.querySelector("#login-form");
  const errorMsg = overlay.querySelector("#error-msg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (passwordInput.value.trim() === "aneki") {
      removeModal(overlay);
      startGiftExperience();
    } else {
      errorMsg.classList.remove("hidden");
    }
  });
}

// Function to safely destroy the modal from DOM
function removeModal(modalElement) {
  modalElement.style.animation = "fadeOut 0.2s ease-out forwards";
  setTimeout(() => {
    modalElement.remove();
  }, 200);
}
