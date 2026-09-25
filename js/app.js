/**
 * DEFEKTOLOGIYA PRO — Frontend Application Logic
 * Stack: Vanilla JS + Supabase JS Client v2
 */

// ==========================================================================
// CONFIGURATION & CONSTANTS
// ==========================================================================

// Supabase Configuration
const SUPABASE_URL = window.__SUPABASE_URL__ || "https://bgrawzwhhygvzvngipnj.supabase.co";
const SUPABASE_ANON_KEY = window.__SUPABASE_ANON_KEY__ || "sb_publishable_8L5A8K3bIG3SBAhwsBEoGA_vcnLktQz";

// Admin Telegram Contact (TODO: add actual admin handle once provided)
const ADMIN_TELEGRAM_HANDLE = "TODO"; // e.g. "@nilufar_admin"

// Initialize Supabase Client if library is available
let supabaseClient = null;
if (typeof supabase !== "undefined" && SUPABASE_URL && !SUPABASE_URL.includes("your-project")) {
  try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (err) {
    console.warn("Supabase initialization failed:", err);
  }
}

// ==========================================================================
// DOM ELEMENTS
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const fullNameInput = document.getElementById("fullName");
  const phoneInput = document.getElementById("phoneNumber");
  const trackSelect = document.getElementById("trackSelect");
  const submitBtn = document.getElementById("submitBtn");
  const successBox = document.getElementById("successMessage");
  const errorBox = document.getElementById("errorMessage");
  const nameError = document.getElementById("nameError");
  const phoneError = document.getElementById("phoneError");
  const trackButtons = document.querySelectorAll(".select-track-btn");

  // ==========================================================================
  // 1. PRICING TRACK SELECTION INTERACTION
  // ==========================================================================
  trackButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedTrack = btn.getAttribute("data-track");
      if (selectedTrack && trackSelect) {
        trackSelect.value = selectedTrack;
      }
      // Smooth scroll to registration form
      const regSection = document.getElementById("royxat");
      if (regSection) {
        regSection.scrollIntoView({ behavior: "smooth" });
        if (fullNameInput) {
          setTimeout(() => fullNameInput.focus(), 600);
        }
      }
    });
  });

  // ==========================================================================
  // 2. PHONE NUMBER INPUT FORMATTING
  // ==========================================================================
  if (phoneInput) {
    phoneInput.addEventListener("focus", (e) => {
      if (!e.target.value) {
        e.target.value = "+998 ";
      }
    });

    phoneInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, ""); // digits only

      // Always prefix with 998 if Uzbek format
      if (value.startsWith("998")) {
        value = value.substring(0, 12); // max 998 + 9 digits = 12 digits
      } else if (value.length > 0) {
        value = "998" + value.substring(0, 9);
      }

      // Format as +998 (XX) XXX-XX-XX
      let formatted = "+";
      if (value.length > 0) {
        formatted += value.substring(0, 3); // 998
      }
      if (value.length > 3) {
        formatted += " (" + value.substring(3, 5); // (XX
      }
      if (value.length >= 5) {
        formatted += ") " + value.substring(5, 8); // ) XXX
      }
      if (value.length >= 8) {
        formatted += "-" + value.substring(8, 10); // -XX
      }
      if (value.length >= 10) {
        formatted += "-" + value.substring(10, 12); // -XX
      }

      e.target.value = formatted;
      clearError(phoneInput, phoneError);
    });
  }

  if (fullNameInput) {
    fullNameInput.addEventListener("input", () => {
      clearError(fullNameInput, nameError);
    });
  }

  // ==========================================================================
  // 3. FORM VALIDATION & SUBMISSION
  // ==========================================================================
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Reset errors & alerts
      clearAllErrors();
      if (errorBox) errorBox.style.display = "none";

      const nameVal = fullNameInput.value.trim();
      const phoneVal = phoneInput.value.trim();
      const trackVal = trackSelect.value.trim();

      let isValid = true;

      // Validate Name
      if (!nameVal || nameVal.length < 3) {
        showError(fullNameInput, nameError, "Iltimos, to'liq ism va familiyangizni kiriting.");
        isValid = false;
      }

      // Validate Phone (must contain at least 9 national digits)
      const digitsOnly = phoneVal.replace(/\D/g, "");
      if (!phoneVal || digitsOnly.length < 9) {
        showError(phoneInput, phoneError, "Iltimos, to'g'ri telefon raqamingizni kiriting.");
        isValid = false;
      }

      // Validate Track
      const validTracks = ["onlayn", "oflayn", "mentorlik"];
      if (!validTracks.includes(trackVal)) {
        isValid = false;
      }

      if (!isValid) return;

      // Set Loading State
      setLoading(true);

      const payload = {
        name: nameVal,
        phone: phoneVal,
        track: trackVal,
      };

      try {
        let insertSuccess = false;

        if (supabaseClient) {
          // Insert into Supabase registrations table
          const { data, error } = await supabaseClient
            .from("registrations")
            .insert([payload]);

          if (error) {
            console.error("Supabase insert error:", error);
            throw error;
          }
          insertSuccess = true;
        } else {
          // Local/Demo Mode fallback (when Supabase URL/key are not configured)
          console.log("[Demo Mode] Registration submitted successfully:", payload);
          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 800));
          insertSuccess = true;
        }

        if (insertSuccess) {
          // Show confirmation message inline
          form.style.display = "none";
          if (successBox) {
            successBox.style.display = "block";
            successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        }
      } catch (err) {
        console.error("Submission failed:", err);
        if (errorBox) {
          errorBox.style.display = "block";
        }
      } finally {
        setLoading(false);
      }
    });
  }

  // ==========================================================================
  // HELPER FUNCTIONS
  // ==========================================================================
  function showError(inputEl, errorEl, message) {
    if (inputEl) inputEl.classList.add("is-invalid");
    if (errorEl) errorEl.textContent = message;
  }

  function clearError(inputEl, errorEl) {
    if (inputEl) inputEl.classList.remove("is-invalid");
    if (errorEl) errorEl.textContent = "";
  }

  function clearAllErrors() {
    clearError(fullNameInput, nameError);
    clearError(phoneInput, phoneError);
  }

  function setLoading(isLoading) {
    if (!submitBtn) return;
    if (isLoading) {
      submitBtn.classList.add("is-loading");
      submitBtn.disabled = true;
    } else {
      submitBtn.classList.remove("is-loading");
      submitBtn.disabled = false;
    }
  }

  // ==========================================================================
  // 4. COUNTDOWN TIMER (Tashkent UTC+5)
  // ==========================================================================
  (function initCountdown() {
    const PHASE1_END = new Date("2026-10-01T00:00:00+05:00"); // Phase 1 deadline
    const PHASE2_END = new Date("2026-10-05T00:00:00+05:00"); // Phase 2 deadline

    const timerEl    = document.getElementById("countdown-timer");
    const headingEl  = document.getElementById("countdown-heading");
    const daysEl     = document.getElementById("cd-days");
    const hoursEl    = document.getElementById("cd-hours");
    const minutesEl  = document.getElementById("cd-minutes");
    const secondsEl  = document.getElementById("cd-seconds");

    if (!timerEl || !headingEl) return;

    function pad(n) { return String(n).padStart(2, "0"); }

    function tick() {
      const now = Date.now();

      if (now < PHASE1_END.getTime()) {
        // Phase 1 — before Oct 1
        headingEl.textContent = "Chegirmali narxda ro'yxatdan o'tishga qoldi";
        const diff = PHASE1_END.getTime() - now;
        render(diff);
        timerEl.style.display = "";
      } else if (now < PHASE2_END.getTime()) {
        // Phase 2 — Oct 1 → Oct 5
        headingEl.textContent = "Qabul yopilishiga qoldi:";
        const diff = PHASE2_END.getTime() - now;
        render(diff);
        timerEl.style.display = "";
      } else {
        // After Oct 5 — hide entirely
        timerEl.style.display = "none";
        clearInterval(intervalId);
      }
    }

    function render(diff) {
      const totalSec = Math.floor(diff / 1000);
      const days     = Math.floor(totalSec / 86400);
      const hours    = Math.floor((totalSec % 86400) / 3600);
      const minutes  = Math.floor((totalSec % 3600) / 60);
      const seconds  = totalSec % 60;

      daysEl.textContent    = pad(days);
      hoursEl.textContent   = pad(hours);
      minutesEl.textContent = pad(minutes);
      secondsEl.textContent = pad(seconds);
    }

    tick(); // run immediately so there's no 1-second blank
    const intervalId = setInterval(tick, 1000);
  })();
});

// Copyright year — runs immediately, no DOM-ready wait needed
document.getElementById('copy-year').textContent = new Date().getFullYear();
