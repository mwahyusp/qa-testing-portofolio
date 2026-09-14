// ============================================================
// Login logic — Mini E-Commerce
// QA NOTE: File ini mengandung INTENTIONAL DEFECT #1.
// Detail lengkap: test-documentation/bug-reports.md (Fase 2)
// ============================================================

const VALID_EMAIL = "user@test.com";
const VALID_PASSWORD = "123456";
const MIN_PASSWORD_LENGTH = 6;

const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const messageEl = document.getElementById("login-message");

/**
 * Validasi format email sederhana.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmailFormat(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Menampilkan pesan ke UI.
 * @param {string} text
 * @param {"error"|"success"} type
 */
function showMessage(text, type = "error") {
  messageEl.textContent = text;
  messageEl.className = "message " + type;
}

/**
 * Handler submit form login.
 */
function handleLogin(event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Validasi 1: email kosong
  if (email === "") {
    showMessage("Email is required!", "error");
    return;
  }

  // Validasi 2: format email tidak valid
  if (!isValidEmailFormat(email)) {
    showMessage("Invalid email format!", "error");
    return;
  }

  // Validasi 3: password kosong
  // ----------------------------------------------------------
  // INTENTIONAL DEFECT #1
  // Skenario: email valid + password kosong.
  // Expected : "Password required!"
  // Actual   : "Invalid email format!"  (pesan salah)
  // ----------------------------------------------------------
  if (password === "") {
    showMessage("Invalid email format!", "error");
    return;
  }

  // Validasi 4: panjang password
  if (password.length < MIN_PASSWORD_LENGTH) {
    showMessage("Password must be at least 6 characters.", "error");
    return;
  }

  // Validasi 5: kredensial
  if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
    showMessage("Invalid email or password!", "error");
    return;
  }

  showMessage("Login successful!", "success");

  setTimeout(() => {
    window.location.href = "products.html";
  }, 800);
}

form.addEventListener("submit", handleLogin);