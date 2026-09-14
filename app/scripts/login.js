// ============================================================
// Login logic — Mini E-Commerce
// QA NOTE: File ini mengandung INTENTIONAL DEFECT #1.
// ============================================================

const VALID_EMAIL = "user@test.com";
const VALID_PASSWORD = "123456";
const MIN_PASSWORD_LENGTH = 6;

const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const messageEl = document.getElementById("login-message");
const btnAutofill = document.getElementById("btn-autofill");

function isValidEmailFormat(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMessage(text, type = "error") {
  messageEl.textContent = text;
  messageEl.className = "message " + type;
}

function handleLogin(event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (email === "") {
    showMessage("Email is required!", "error");
    return;
  }

  if (!isValidEmailFormat(email)) {
    showMessage("Invalid email format!", "error");
    return;
  }

  // INTENTIONAL DEFECT #1 — pesan salah untuk password kosong
  if (password === "") {
    showMessage("Invalid email format!", "error");
    return;
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    showMessage("Password must be at least 6 characters.", "error");
    return;
  }

  if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
    showMessage("Invalid email or password!", "error");
    return;
  }

  showMessage("Login successful!", "success");

  setTimeout(() => {
    window.location.href = "/app/products.html";
  }, 800);
}

if (btnAutofill) {
  btnAutofill.addEventListener("click", () => {
    emailInput.value = VALID_EMAIL;
    passwordInput.value = VALID_PASSWORD;
    showMessage("Kredensial demo terisi. Klik Login untuk masuk.", "success");
  });
}

form.addEventListener("submit", handleLogin);