import "./style.css";
import { createHeart, createDynamicModal } from "./view.js";

const button = document.getElementById("sign-in");

button.addEventListener("click", () => {
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Create 18 hearts for a fuller burst
  for (let i = 0; i < 40; i++) {
    createHeart(centerX, centerY);
  }

  setTimeout(() => {
    // Prevent duplicate modals if already open
    if (document.getElementById("login-modal")) return;

    createDynamicModal();
  }, 350);
});
