document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  // Reset pesan
  message.textContent = "";
  message.style.color = "red";

  // Validasi email kosong
  if (email === "") {
    message.textContent = "Email is required!";
    return;
  }

  // Validasi format email
  if (!email.includes("@")) {
    message.textContent = "Invalid email format!";
    return;
  }

  // Validasi password kosong
  if (password === "") {
    message.textContent = "Password required!";
    return;
  }

  // Validasi panjang password
  if (password.length < 6) {
    message.textContent = "Password must be at least 6 characters.";
    return;
  }

  // Jika semua valid
  message.style.color = "green";
  message.textContent = "Login successful!";
});
