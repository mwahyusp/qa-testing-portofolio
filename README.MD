Baik, saya update **Fase 1 secara keseluruhan** — semua file final, konsisten, tanpa Defect #2, siap copy-paste ke repo. Semua perubahan dari revisi terakhir sudah di-merge ke sini.

---

## 📁 Struktur Fase 1 (final)

```
qa-testing-portofolio/
├── .gitignore                              ← BARU
├── .gitattributes
├── LICENSE
├── README.md                               ← DITIMPA
├── .github/workflows/static.yml            ← biarkan, sesuaikan nanti
├── app/
│   ├── index.html
│   ├── products.html
│   ├── data/products.json
│   ├── styles/
│   │   ├── style.css
│   │   └── responsive.css
│   └── scripts/
│       ├── login.js
│       └── products.js
├── evidence/
│   ├── login/.gitkeep
│   └── products/.gitkeep
├── test-data/
│   └── test-data.md
└── test-documentation/
    ├── test-plan.md
    ├── test-cases.md
    ├── Login_Bug_Report.docx
    └── Login_Test_Cases.xlsx
```

---

## 1. `.gitignore` (BARU)

```gitignore
# Excel / Word temp files
~$*.xlsx
~$*.docx
*.tmp

# OS files
.DS_Store
Thumbs.db

# Node (kalau nanti pakai npx serve)
node_modules/
```

---

## 2. `app/index.html` (Login)

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mini E-Commerce — Login</title>
  <link rel="stylesheet" href="styles/style.css" />
  <link rel="stylesheet" href="styles/responsive.css" />
</head>
<body>
  <main class="auth-wrapper">
    <section class="auth-card">
      <h1 class="auth-title">Mini E-Commerce</h1>
      <p class="auth-subtitle">Silakan login untuk melanjutkan</p>

      <form id="login-form" novalidate>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" id="email" name="email" placeholder="user@test.com" />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="••••••" />
        </div>

        <button type="submit" class="btn btn-primary" id="btn-login">Login</button>

        <p id="login-message" class="message" role="alert" aria-live="polite"></p>
      </form>
    </section>
  </main>

  <script src="scripts/login.js"></script>
</body>
</html>
```

---

## 3. `app/scripts/login.js` (dengan Defect #1 — SATU-SATUNYA intentional defect di Fase 1)

```javascript
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
```

---

## 4. `app/data/products.json`

```json
[
  { "id": "P001", "name": "Kaos Polos Hitam",     "price": 75000,  "stock": 12, "category": "Pakaian" },
  { "id": "P002", "name": "Kemeja Flanel",        "price": 150000, "stock": 5,  "category": "Pakaian" },
  { "id": "P003", "name": "Sepatu Sneakers",      "price": 320000, "stock": 0,  "category": "Sepatu" },
  { "id": "P004", "name": "Tas Ransel",           "price": 210000, "stock": 7,  "category": "Tas" },
  { "id": "P005", "name": "Topi Baseball",        "price": 45000,  "stock": 20, "category": "Aksesoris" },
  { "id": "P006", "name": "Jaket Bomber",         "price": 275000, "stock": 3,  "category": "Pakaian" },
  { "id": "P007", "name": "Celana Chino",         "price": 180000, "stock": 9,  "category": "Pakaian" },
  { "id": "P008", "name": "Jam Tangan Digital",   "price": 400000, "stock": 0,  "category": "Aksesoris" }
]
```

---

## 5. `app/products.html`

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mini E-Commerce — Katalog Produk</title>
  <link rel="stylesheet" href="styles/style.css" />
  <link rel="stylesheet" href="styles/responsive.css" />
</head>
<body>
  <header class="site-header">
    <h1 class="site-title">Mini E-Commerce</h1>
    <nav class="site-nav">
      <a href="index.html">Logout</a>
    </nav>
  </header>

  <main class="container">
    <h2 class="page-title">Katalog Produk</h2>

    <div class="toolbar">
      <input type="text" id="search-input" placeholder="Cari produk..." disabled />
      <span class="hint">(Search aktif di Fase 2)</span>
    </div>

    <p id="catalog-message" class="message" role="alert"></p>

    <section id="product-list" class="product-grid"></section>
  </main>

  <script src="scripts/products.js"></script>
</body>
</html>
```

---

## 6. `app/scripts/products.js` (FINAL — tanpa Defect #2)

```javascript
// ============================================================
// Product catalog — Mini E-Commerce
// QA NOTE: Modul ini sudah bersih. Defect #2 (stok habis)
// sudah DIPERBAIKI di revisi Fase 1.
// ============================================================

const PRODUCTS_URL = "data/products.json";
const listEl = document.getElementById("product-list");
const messageEl = document.getElementById("catalog-message");

/**
 * Format angka ke Rupiah.
 */
function formatRupiah(value) {
  return "Rp " + value.toLocaleString("id-ID");
}

/**
 * Render satu kartu produk.
 */
function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.setAttribute("data-id", product.id);

  const outOfStock = product.stock === 0;

  card.innerHTML = `
    <h3 class="product-name">${product.name}</h3>
    <p class="product-category">${product.category}</p>
    <p class="product-price">${formatRupiah(product.price)}</p>
    <p class="product-stock ${outOfStock ? "stock-empty" : ""}">
      ${outOfStock ? "Stok habis" : "Stok: " + product.stock}
    </p>
    <button class="btn btn-add" data-id="${product.id}"
      ${outOfStock ? "disabled" : ""}>
      ${outOfStock ? "Stok Habis" : "Add to Cart"}
    </button>
  `;

  if (!outOfStock) {
    const btn = card.querySelector(".btn-add");
    btn.addEventListener("click", () => handleAddToCart(product));
  }

  return card;
}

/**
 * Handler Add to Cart — dengan guard stok.
 */
function handleAddToCart(product) {
  if (product.stock === 0) {
    messageEl.textContent = `"${product.name}" sedang habis.`;
    messageEl.className = "message error";
    return;
  }

  messageEl.textContent = `"${product.name}" ditambahkan ke cart.`;
  messageEl.className = "message success";
}

/**
 * Load & render seluruh produk.
 */
async function loadProducts() {
  try {
    const res = await fetch(PRODUCTS_URL);
    if (!res.ok) throw new Error("Gagal memuat data produk");
    const products = await res.json();

    listEl.innerHTML = "";
    products.forEach((p) => listEl.appendChild(createProductCard(p)));
  } catch (err) {
    messageEl.textContent = "Terjadi kesalahan saat memuat produk.";
    messageEl.className = "message error";
  }
}

loadProducts();
```

---

## 7. `app/styles/style.css` (FINAL)

```css
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: #f5f6f8;
  color: #222;
  line-height: 1.5;
}

/* ---------- Auth / Login ---------- */
.auth-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.auth-card {
  background: #fff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 400px;
}

.auth-title { font-size: 22px; margin-bottom: 4px; }
.auth-subtitle { font-size: 14px; color: #666; margin-bottom: 24px; }

/* ---------- Form ---------- */
.form-group { margin-bottom: 16px; }
.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
}
.form-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}
.form-group input:focus {
  outline: none;
  border-color: #2b6cb0;
  box-shadow: 0 0 0 3px rgba(43,108,176,0.15);
}

/* ---------- Button ---------- */
.btn {
  display: inline-block;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
.btn-primary { background: #2b6cb0; color: #fff; width: 100%; }
.btn-primary:hover { background: #245a94; }

.btn-add { background: #38a169; color: #fff; width: 100%; margin-top: 8px; }
.btn-add:hover { background: #2f855a; }
.btn-add:disabled {
  background: #cbd5e0;
  color: #718096;
  cursor: not-allowed;
}

/* ---------- Message ---------- */
.message { margin-top: 14px; font-size: 13px; min-height: 18px; }
.message.error   { color: #c53030; }
.message.success { color: #2f855a; }

/* ---------- Layout ---------- */
.site-header {
  background: #fff;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
}
.site-title { font-size: 18px; }
.site-nav a { color: #2b6cb0; text-decoration: none; font-size: 14px; }

.container { max-width: 1000px; margin: 0 auto; padding: 24px; }
.page-title { font-size: 20px; margin-bottom: 16px; }

.toolbar { margin-bottom: 16px; display: flex; gap: 8px; align-items: center; }
.toolbar input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  width: 260px;
}
.toolbar input:disabled { background: #eee; cursor: not-allowed; }
.hint { font-size: 12px; color: #888; }

/* ---------- Product Grid ---------- */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
.product-card {
  background: #fff;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
}
.product-name { font-size: 15px; margin-bottom: 4px; }
.product-category { font-size: 12px; color: #888; margin-bottom: 8px; }
.product-price { font-size: 15px; font-weight: 700; color: #2b6cb0; margin-bottom: 4px; }
.product-stock { font-size: 12px; color: #555; margin-bottom: 8px; }
.stock-empty { color: #c53030; font-weight: 600; }
```

---

## 8. `app/styles/responsive.css`

```css
/* ---------- Mobile first tweaks ---------- */
@media (max-width: 480px) {
  .auth-card { padding: 24px; }
  .auth-title { font-size: 20px; }

  .container { padding: 16px; }
  .page-title { font-size: 18px; }

  .toolbar { flex-direction: column; align-items: stretch; }
  .toolbar input { width: 100%; }

  .product-grid { grid-template-columns: 1fr; }

  .site-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

/* ---------- Tablet ---------- */
@media (min-width: 481px) and (max-width: 768px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); }
}
```

---

## 9. `test-documentation/test-plan.md`

```markdown
# Test Plan — Mini E-Commerce

| Field            | Value                                              |
|------------------|----------------------------------------------------|
| **Project**      | QA Testing Portfolio — Mini E-Commerce             |
| **Document**     | Test Plan                                          |
| **Version**      | 1.0 (Fase 1)                                       |
| **Author**       | Wahyu (QA Tester)                                  |
| **Created**      | 2026-XX-XX                                         |
| **Last Updated** | 2026-XX-XX                                         |
| **Status**       | 🟢 Active                                          |

---

## 1. Introduction

Dokumen ini mendefinisikan strategi, scope, dan pendekatan pengujian untuk
aplikasi demo **Mini E-Commerce**. Aplikasi ini dibangun sebagai media latihan
QA Manual, mencakup alur end-to-end: Login → Catalog → Search → Detail →
Cart → Checkout → Order Confirmation.

> **Disclaimer**
> Aplikasi ini dibuat khusus untuk portfolio QA. Beberapa defect di dalamnya
> adalah **intentional defect** yang ditandai dengan komentar
> `INTENTIONAL DEFECT` pada source code. Tidak ada klaim bug terhadap
> aplikasi pihak ketiga.

---

## 2. Objectives

1. Memverifikasi seluruh fungsi utama aplikasi berjalan sesuai requirement.
2. Mengidentifikasi dan mendokumentasikan defect secara terstruktur.
3. Melatih proses **defect identification, reporting, retesting, dan regression testing**.
4. Menyediakan bukti eksekusi (evidence) yang dapat diaudit.

---

## 3. Scope

### 3.1 In Scope (Fase 1)

| Modul              | Cakupan                                                       |
|--------------------|---------------------------------------------------------------|
| **Login**          | Validasi input, pesan error, login sukses, boundary password  |
| **Product Catalog**| Render produk, format harga, status stok, Add to Cart         |

### 3.2 Out of Scope (Fase 1)

- Search, Product Detail, Cart, Checkout → diuji di **Fase 2 & 3**.
- Performance, load, dan stress testing.
- Security testing mendalam (SQLi, XSS, CSRF).
- Accessibility audit formal (WCAG).
- Cross-browser di luar Chrome & Firefox.

### 3.3 Future Scope

| Fase | Modul yang Diuji                                        |
|------|---------------------------------------------------------|
| 2    | Search, Product Detail, Cart                            |
| 3    | Checkout, Order Confirmation, Regression end-to-end     |

---

## 4. Test Approach

| Aspek                | Pendekatan                                                |
|----------------------|-----------------------------------------------------------|
| **Metode**           | Manual functional testing (black-box)                     |
| **Teknik**           | Equivalence Partitioning, Boundary Value Analysis         |
| **Tipe Test**        | Positive, Negative, Boundary, UI, Error Handling          |
| **Eksekusi**         | Sequential per modul, dilanjutkan regression              |
| **Evidence**         | Screenshot per test case, disimpan di `evidence/`         |

### 4.1 Contoh Penerapan Teknik

- **Equivalence Partitioning** → format email: valid (`user@test.com`) vs
  invalid (`user.com`, kosong).
- **Boundary Value Analysis** → panjang password: 5 (invalid), 6 (valid), 7 (invalid).

---

## 5. Test Environment

| Komponen         | Detail                                        |
|------------------|-----------------------------------------------|
| **Browser**      | Chrome 120+, Firefox 120+                     |
| **OS**           | Windows 10/11, macOS 13+                      |
| **Device**       | Desktop (1280×720 minimum)                    |
| **Server**       | `npx serve .` (static local server)           |
| **URL**          | `http://localhost:3000/app/index.html`        |

---

## 6. Test Data

Seluruh test data terpusat di:

📎 [`test-data/test-data.md`](../test-data/test-data.md)

Kategori:
- Login credentials (valid & invalid)
- Boundary password length
- Product data (8 produk, 2 di antaranya stok habis)

---

## 7. Entry & Exit Criteria

### 7.1 Entry Criteria
- [x] Source code Fase 1 selesai dan dapat diakses.
- [x] Test data tersedia.
- [x] Environment siap (browser + local server).

### 7.2 Exit Criteria
- [ ] 100% test case Fase 1 dieksekusi.
- [ ] Setiap defect terdokumentasi dengan evidence.
- [ ] Tidak ada defect **Blocker** atau **Critical** yang menggantung.
- [ ] Test summary Fase 1 dibuat.

---

## 8. Deliverables

| Deliverable                | Lokasi                                          | Status |
|----------------------------|-------------------------------------------------|--------|
| Test Plan                  | `test-documentation/test-plan.md`               | ✅     |
| Test Cases                 | `test-documentation/test-cases.md`              | ✅     |
| Test Data                  | `test-data/test-data.md`                        | ✅     |
| Bug Report                 | `test-documentation/bug-reports.md`             | ⏳ Fase 2 |
| Regression Checklist       | `test-documentation/regression-checklist.md`    | ⏳ Fase 2 |
| Traceability Matrix (RTM)  | `test-documentation/traceability-matrix.md`     | ⏳ Fase 3 |
| Test Summary               | `test-documentation/test-summary.md`            | ⏳ Fase 3 |
| Evidence                   | `evidence/login/`, `evidence/products/`         | 🔄 In progress |

---

## 9. Defect Management

| Severity  | Definisi                                                       |
|-----------|----------------------------------------------------------------|
| Blocker   | Aplikasi tidak bisa dijalankan; testing terhenti total.        |
| Critical  | Fungsi utama gagal; tidak ada workaround.                      |
| Major     | Fungsi utama gagal; ada workaround.                            |
| Minor     | Fungsi non-kritis terganggu; cosmetic.                         |
| Trivial   | Typo, spacing, warna; tidak mengganggu fungsi.                 |

| Priority  | Definisi                                                       |
|-----------|----------------------------------------------------------------|
| High      | Harus segera diperbaiki sebelum rilis.                         |
| Medium    | Perlu diperbaiki, tapi tidak menghambat rilis.                 |
| Low       | Bisa ditunda.                                                  |

---

## 10. Risks & Mitigation

| Risiko                                                  | Mitigasi                                              |
|---------------------------------------------------------|-------------------------------------------------------|
| Intentional defect tertukar dengan bug natural          | Tandai `INTENTIONAL DEFECT` pada komentar source code |
| Evidence tidak konsisten penamaannya                    | Konvensi: `TC-XXX.png` di folder modul terkait        |
| Scope creep (menambah fitur di luar fase)               | Ikuti daftar scope per fase                           |

---

## 11. References

- [Test Cases](test-cases.md)
- [Test Data](../test-data/test-data.md)
- [README](../README.md)
```

---

## 10. `test-documentation/test-cases.md`

```markdown
# Test Cases — Mini E-Commerce

| Field            | Value                                              |
|------------------|----------------------------------------------------|
| **Project**      | QA Testing Portfolio — Mini E-Commerce             |
| **Document**     | Test Cases                                         |
| **Version**      | 1.0 (Fase 1)                                       |
| **Total Cases**  | 17                                                 |
| **Last Updated** | 2026-XX-XX                                         |
| **Status**       | 🔄 In progress                                     |

**Legend**

| Kode | Arti                                       |
|------|--------------------------------------------|
| H    | High priority                              |
| M    | Medium priority                            |
| L    | Low priority                               |
| ✅   | Pass                                       |
| ❌   | Fail                                       |
| ⏸️   | Blocked / Not Run                          |

---

## Ringkasan per Modul

| Modul              | Jumlah TC | Pass | Fail | Not Run |
|--------------------|-----------|------|------|---------|
| Login              | 10        | -    | -    | 10      |
| Product Catalog    | 7         | -    | -    | 7       |
| **Total**          | **17**    | 0    | 0    | **17**  |

---

## 1. Modul: Login

| ID     | Skenario                                       | Precondition          | Steps                                                                 | Expected Result                                          | Priority | Status |
|--------|------------------------------------------------|-----------------------|-----------------------------------------------------------------------|----------------------------------------------------------|----------|--------|
| TC-001 | Login dengan kredensial valid                  | Halaman login terbuka | 1. Isi email `user@test.com`<br>2. Isi password `123456`<br>3. Klik Login | Pesan `Login successful!` muncul, redirect ke katalog | H | ⏸️ |
| TC-002 | Login dengan email tanpa `@`                   | Halaman login terbuka | 1. Isi email `user.com`<br>2. Isi password `123456`<br>3. Klik Login | Pesan `Invalid email format!`                            | H | ⏸️ |
| TC-003 | Login dengan password < 6 karakter             | Halaman login terbuka | 1. Isi email `user@test.com`<br>2. Isi password `123`<br>3. Klik Login | Pesan `Password must be at least 6 characters.`          | H | ⏸️ |
| TC-004 | Login dengan email kosong                      | Halaman login terbuka | 1. Kosongkan email<br>2. Isi password `123456`<br>3. Klik Login     | Pesan `Email is required!`                               | H | ⏸️ |
| TC-005 | Login dengan password kosong (email valid)     | Halaman login terbuka | 1. Isi email `user@test.com`<br>2. Kosongkan password<br>3. Klik Login | Pesan `Password required!`                               | H | ⏸️ |
| TC-006 | Login dengan email & password kosong           | Halaman login terbuka | 1. Kosongkan email & password<br>2. Klik Login                       | Pesan `Email is required!`                               | M | ⏸️ |
| TC-007 | Password tepat 6 karakter (boundary)           | Halaman login terbuka | 1. Isi email `user@test.com`<br>2. Isi password `123456`<br>3. Klik Login | Pesan `Login successful!`                                | M | ⏸️ |
| TC-008 | Password 5 karakter (boundary bawah)           | Halaman login terbuka | 1. Isi email `user@test.com`<br>2. Isi password `12345`<br>3. Klik Login | Pesan `Password must be at least 6 characters.`          | M | ⏸️ |
| TC-009 | Kredensial salah (email benar, password salah) | Halaman login terbuka | 1. Isi email `user@test.com`<br>2. Isi password `abcdef`<br>3. Klik Login | Pesan `Invalid email or password!`                       | H | ⏸️ |
| TC-010 | Email dengan spasi di awal/akhir               | Halaman login terbuka | 1. Isi email `  user@test.com  `<br>2. Isi password `123456`<br>3. Klik Login | Pesan `Login successful!` (trim berhasil)                | L | ⏸️ |

---

## 2. Modul: Product Catalog

| ID     | Skenario                                          | Precondition            | Steps                                                       | Expected Result                                    | Priority | Status |
|--------|---------------------------------------------------|-------------------------|-------------------------------------------------------------|----------------------------------------------------|----------|--------|
| TC-011 | Katalog menampilkan seluruh 8 produk              | Halaman katalog terbuka | 1. Buka `products.html`                                     | 8 kartu produk ditampilkan                          | H | ⏸️ |
| TC-012 | Harga produk tampil dalam format Rupiah           | Halaman katalog terbuka | 1. Amati harga tiap produk                                  | Format `Rp xx.xxx`                                  | M | ⏸️ |
| TC-013 | Produk stok habis menampilkan label "Stok habis"  | Halaman katalog terbuka | 1. Lihat produk P003 & P008                                 | Label `Stok habis` berwarna merah                   | H | ⏸️ |
| TC-014 | Tombol Add to Cart disabled untuk stok habis      | Halaman katalog terbuka | 1. Lihat produk P003 & P008                                 | Tombol **disabled**, label "Stok Habis"             | H | ⏸️ |
| TC-015 | Add to Cart produk stok tersedia                  | Halaman katalog terbuka | 1. Klik Add to Cart pada P001                               | Pesan `"Kaos Polos Hitam" ditambahkan ke cart.`     | H | ⏸️ |
| TC-016 | Search bar disabled di Fase 1                     | Halaman katalog terbuka | 1. Coba klik & ketik di search bar                          | Input tidak bisa diisi (disabled)                   | L | ⏸️ |
| TC-017 | Error handling saat `products.json` gagal dimuat  | Halaman katalog terbuka | 1. Rename sementara `products.json`<br>2. Reload halaman     | Pesan `Terjadi kesalahan saat memuat produk.`       | M | ⏸️ |

---

## 3. Catatan Eksekusi

- **TC-005** diprediksi **Fail** — intentional defect #1 (lihat bug-reports.md di Fase 2).
- **TC-014** sekarang **Pass** karena Defect #2 sudah diperbaiki di revisi Fase 1.
- Screenshot setiap eksekusi disimpan sebagai `TC-XXX.png` di folder
  `evidence/login/` atau `evidence/products/`.
- Setelah eksekusi, update kolom **Status** dan tabel **Ringkasan per Modul**.

---

## 4. References

- [Test Plan](test-plan.md)
- [Test Data](../test-data/test-data.md)
- [Bug Reports](bug-reports.md) — Fase 2
- [Regression Checklist](regression-checklist.md) — Fase 2
```

---

## 11. `test-data/test-data.md`

```markdown
# Test Data — Mini E-Commerce

| Field            | Value                                              |
|------------------|----------------------------------------------------|
| **Project**      | QA Testing Portfolio — Mini E-Commerce             |
| **Document**     | Test Data                                          |
| **Version**      | 1.0 (Fase 1)                                       |
| **Last Updated** | 2026-XX-XX                                         |

---

## 1. Login Credentials

| Field    | Value            | Keterangan              |
|----------|------------------|-------------------------|
| Email    | `user@test.com`  | Kredensial valid        |
| Password | `123456`         | Kredensial valid        |

---

## 2. Invalid Login Data

| ID     | Email              | Password  | Ekspektasi                              |
|--------|--------------------|-----------|-----------------------------------------|
| LD-001 | `user.com`         | `123456`  | Invalid email format                    |
| LD-002 | `user@test.com`    | `123`     | Password < 6 karakter                   |
| LD-003 | (kosong)           | `123456`  | Email required                          |
| LD-004 | `user@test.com`    | (kosong)  | Password required                       |
| LD-005 | (kosong)           | (kosong)  | Email required (prioritas)              |
| LD-006 | `user@test.com`    | `abcdef`  | Invalid email or password               |
| LD-007 | `  user@test.com ` | `123456`  | Login sukses (trim)                     |

---

## 3. Boundary — Password Length

| Panjang | Value      | Ekspektasi                              |
|---------|------------|-----------------------------------------|
| 5       | `12345`    | Password must be at least 6 characters. |
| 6       | `123456`   | Login successful                        |
| 7       | `1234567`  | Invalid email or password               |

---

## 4. Product Data

Sumber: `app/data/products.json` (8 produk).

| ID   | Nama                 | Harga    | Stok | Kategori  |
|------|----------------------|----------|------|-----------|
| P001 | Kaos Polos Hitam     | 75.000   | 12   | Pakaian   |
| P002 | Kemeja Flanel        | 150.000  | 5    | Pakaian   |
| P003 | Sepatu Sneakers      | 320.000  | 0    | Sepatu    |
| P004 | Tas Ransel           | 210.000  | 7    | Tas       |
| P005 | Topi Baseball        | 45.000   | 20   | Aksesoris |
| P006 | Jaket Bomber         | 275.000  | 3    | Pakaian   |
| P007 | Celana Chino         | 180.000  | 9    | Pakaian   |
| P008 | Jam Tangan Digital   | 400.000  | 0    | Aksesoris |

**Produk stok habis** (untuk TC-013 & TC-014): **P003**, **P008**.
```

---

## 12. `README.md` (FINAL Fase 1)

```markdown
# QA Testing Portfolio — Mini E-Commerce

Portfolio QA Manual untuk latihan **defect identification, reporting, retesting,
dan regression testing** menggunakan aplikasi demo Mini E-Commerce.

> **Disclaimer**
> Aplikasi ini dibuat khusus untuk latihan QA. Beberapa defect di dalamnya
> adalah **intentional defect** yang ditandai dengan komentar
> `INTENTIONAL DEFECT` di source code. Tidak ada klaim bug pada aplikasi
> pihak ketiga.

---

## Flow Aplikasi (target akhir)

```
LOGIN → PRODUCT CATALOG → SEARCH → PRODUCT DETAIL → CART → CHECKOUT → ORDER CONFIRMATION
```

---

## Status Pengembangan

- [x] **Fase 1** — Login & Product Catalog (+ dokumentasi QA dasar)
- [ ] **Fase 2** — Search, Product Detail, Cart
- [ ] **Fase 3** — Checkout, Order Confirmation, RTM, Test Summary

---

## Struktur Repo (Fase 1)

```
qa-testing-portofolio/
├── app/
│   ├── index.html
│   ├── products.html
│   ├── data/products.json
│   ├── styles/{style.css, responsive.css}
│   └── scripts/{login.js, products.js}
├── test-documentation/
│   ├── test-plan.md
│   ├── test-cases.md
│   ├── Login_Bug_Report.docx
│   └── Login_Test_Cases.xlsx
├── test-data/test-data.md
├── evidence/
│   ├── login/
│   └── products/
└── README.md
```

---

## Cara Menjalankan

1. Clone repo:
   ```bash
   git clone https://github.com/mwahyusp/qa-testing-portofolio.git
   cd qa-testing-portofolio
   ```
2. Jalankan static server di root:
   ```bash
   npx serve .
   ```
3. Buka `http://localhost:3000/app/index.html`.
4. Login dengan:
   - Email: `user@test.com`
   - Password: `123456`

> Fetch `products.json` memerlukan static server. Kalau buka via `file://`,
> katalog akan gagal dimuat (ini diuji di TC-017).

---

## Intentional Defects (Fase 1)

| ID  | Modul | Deskripsi                                                       | File                |
|-----|-------|-----------------------------------------------------------------|---------------------|
| #1  | Login | Password kosong + email valid → muncul "Invalid email format!"  | `scripts/login.js`  |

> Defect #2 (stok habis) sudah **diperbaiki** di revisi Fase 1.
> Defect berikutnya akan ditambahkan di Fase 2 (Cart & Search) dengan
> pendekatan yang lebih natural — muncul dari edge case yang belum
> di-handle.

---

## Dokumentasi QA

- [Test Plan](test-documentation/test-plan.md)
- [Test Cases](test-documentation/test-cases.md)
- [Test Data](test-data/test-data.md)

---

## Lisensi

MIT — bebas digunakan untuk tujuan belajar.
```

---

## 📋 Checklist final Fase 1

Sebelum commit, pastikan:

- [ ] `.gitignore` dibuat di root
- [ ] Semua file `app/` di-copy sesuai struktur
- [ ] `test-plan.md` dan `test-cases.md` sudah ditimpa versi baru
- [ ] `test-data.md` sudah ditimpa versi baru
- [ ] `README.md` sudah ditimpa versi Fase 1 final
- [ ] File `evidence/*/.gitkeep` ada
- [ ] File lock `~$*.xlsx` sudah tidak ada

Commit:

```bash
git add .
git commit -m "feat(phase-1): complete login + catalog with QA docs

- app: login (defect #1), product catalog (clean)
- docs: test-plan, test-cases (17 TC), test-data
- chore: add .gitignore, cleanup V1 artifacts
- evidence: folder structure for login & products"
git push origin main
```

---

## 🎯 Setelah push

1. Jalankan `npx serve .` → buka `http://localhost:3000/app/index.html`
2. Eksekusi **17 test case** di `test-cases.md`
3. Screenshot tiap TC → simpan sebagai `TC-XXX.png` di `evidence/login/` atau `evidence/products/`
4. Update kolom **Status** + tabel **Ringkasan per Modul** di `test-cases.md`
5. Expected: **TC-005 Fail**, sisanya Pass

- [x] **Fase 1** — Login & Product Catalog
- [x] **Fase 2** — Search, Product Detail, Cart
- [ ] **Fase 3** — Checkout, Order Confirmation, RTM, Test Summary