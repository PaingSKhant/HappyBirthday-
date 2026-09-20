import { photos, songSrc, slideInterval } from "./photo.js";

export function startGiftExperience() {
  document.getElementById("main-menu").classList.add("hidden");
  document.getElementById("gift-page").classList.remove("hidden");

  playMusic();
  startSlideshow();
  startFloatingBackground();
  startAgeCounter();
}

function startAgeCounter() {
  // Her birth date at midnight — adjust the year/month/day if needed
  const birthDate = new Date(2001, 8, 21, 0, 0, 0); // month is 0-indexed: 8 = September

  const yearsEl = document.getElementById("age-years");
  const daysEl = document.getElementById("age-days");
  const hoursEl = document.getElementById("age-hours");
  const minutesEl = document.getElementById("age-minutes");
  const secondsEl = document.getElementById("age-seconds");

  function update() {
    const now = new Date();

    // Calculate full years elapsed
    let years = now.getFullYear() - birthDate.getFullYear();
    const anniversaryThisYear = new Date(
      now.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate(),
    );
    if (now < anniversaryThisYear) {
      years--;
    }

    // Days/hours/min/sec since the most recent birthday anniversary
    const lastAnniversary = new Date(
      now.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate(),
    );
    if (now < lastAnniversary) {
      lastAnniversary.setFullYear(lastAnniversary.getFullYear() - 1);
    }

    let diffMs = now - lastAnniversary;

    const msPerSecond = 1000;
    const msPerMinute = msPerSecond * 60;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;

    const days = Math.floor(diffMs / msPerDay);
    diffMs -= days * msPerDay;
    const hours = Math.floor(diffMs / msPerHour);
    diffMs -= hours * msPerHour;
    const minutes = Math.floor(diffMs / msPerMinute);
    diffMs -= minutes * msPerMinute;
    const seconds = Math.floor(diffMs / msPerSecond);

    yearsEl.textContent = years;
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  }

  update();
  setInterval(update, 1000);
}

function startFloatingBackground() {
  const container = document.getElementById("floating-bg");
  const items = ["💕", "🌸", "✨", "💗"];

  setInterval(() => {
    const el = document.createElement("div");
    el.className = "floating-item";
    el.textContent = items[Math.floor(Math.random() * items.length)];
    el.style.left = Math.random() * 100 + "vw";
    el.style.setProperty("--drift", Math.random() * 100 - 50 + "px");
    el.style.animationDuration = 8 + Math.random() * 6 + "s";
    container.appendChild(el);

    setTimeout(() => el.remove(), 14000);
  }, 800);
}

function playMusic() {
  const audio = document.getElementById("bg-music");
  audio.src = songSrc;
  audio.volume = 0.6;
  audio.play().catch((err) => {
    console.warn("Autoplay blocked, will need a manual click:", err);
  });
}

function startSlideshow() {
  const imgEl = document.getElementById("slide-photo");
  const capEl = document.getElementById("slide-caption");
  const dotsEl = document.getElementById("slide-dots");
  let index = 0;

  // Build one dot per photo
  photos.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    if (i === 0) dot.classList.add("active");
    dotsEl.appendChild(dot);
  });

  function showSlide(i) {
    imgEl.classList.remove("visible");
    setTimeout(() => {
      imgEl.src = photos[i].src;
      capEl.textContent = photos[i].caption;
      imgEl.onload = () => imgEl.classList.add("visible");

      [...dotsEl.children].forEach((dot, idx) =>
        dot.classList.toggle("active", idx === i),
      );
    }, 400);
  }

  showSlide(index);

  setInterval(() => {
    index = (index + 1) % photos.length;
    showSlide(index);
  }, slideInterval);
}
