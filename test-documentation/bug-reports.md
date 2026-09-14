# Bug Reports — Mini E-Commerce

| Field            | Value                                              |
|------------------|----------------------------------------------------|
| **Project**      | QA Testing Portfolio — Mini E-Commerce             |
| **Document**     | Bug Reports                                        |
| **Version**      | 1.0 (Fase 2)                                       |
| **Last Updated** | 2026-XX-XX                                         |
| **Total Bugs**   | 2 (DEF-001, DEF-002)                               |

---

## Summary

| Defect ID | Modul | Test Case | Severity | Priority | Status   |
|-----------|-------|-----------|----------|----------|----------|
| DEF-001   | Login | TC-005    | Minor    | Medium   | Open     |
| DEF-002   | Search| TC-018    | Major    | High     | Open     |

---

## DEF-001 — Pesan error password kosong salah

| Field          | Detail                                                        |
|----------------|---------------------------------------------------------------|
| **Defect ID**  | DEF-001                                                       |
| **Title**      | Pesan error password kosong menampilkan "Invalid email format!" |
| **Module**     | Login                                                         |
| **Related TC** | TC-005                                                        |
| **Severity**   | Minor                                                         |
| **Priority**   | Medium                                                        |
| **Status**     | Open                                                          |
| **Reported**   | 2026-XX-XX                                                    |
| **Reporter**   | Wahyu                                                         |
| **Environment**| Chrome 120+, Windows 11, local server                         |

### Steps to Reproduce
1. Buka `app/index.html`.
2. Isi email dengan `user@test.com` (email valid).
3. Kosongkan field password.
4. Klik tombol Login.

### Expected Result
Muncul pesan `Password required!`.

### Actual Result
Muncul pesan `Invalid email format!` — pesan tidak sesuai konteks.

### Evidence
`evidence/login/TC-005.png`

### Root Cause (Analysis)
Pada `app/scripts/login.js`, blok `if (password === "")` memanggil
`showMessage("Invalid email format!", ...)` — pesan salah copy dari
blok validasi format email.

### Suggested Fix
Ganti pesan menjadi `showMessage("Password required!", "error")`.

### Notes
Defect ini adalah **intentional defect #1** yang ditandai pada
komentar source code. Digunakan untuk latihan reporting & retesting.

---

## DEF-002 — Search bersifat case-sensitive

| Field          | Detail                                                        |
|----------------|---------------------------------------------------------------|
| **Defect ID**  | DEF-002                                                       |
| **Title**      | Pencarian produk bersifat case-sensitive                      |
| **Module**     | Search (Product Catalog)                                      |
| **Related TC** | TC-018                                                        |
| **Severity**   | Major                                                         |
| **Priority**   | High                                                          |
| **Status**     | Open                                                          |
| **Reported**   | 2026-XX-XX                                                    |
| **Reporter**   | Wahyu                                                         |
| **Environment**| Chrome 120+, Windows 11, local server                         |

### Steps to Reproduce
1. Buka `app/products.html`.
2. Pada kolom search, ketik `kaos` (huruf kecil semua).
3. Amati daftar produk.

### Expected Result
Menampilkan produk **Kaos Polos Hitam** (case-insensitive match).

### Actual Result
Tidak ada produk yang tampil, muncul pesan "Tidak ada produk yang cocok".

### Evidence
`evidence/products/TC-018.png`

### Root Cause (Analysis)
Pada `app/scripts/products.js`, fungsi `filterProducts()` menggunakan
`p.name.includes(keyword)` tanpa normalisasi `toLowerCase()` pada
kedua sisi (nama produk & keyword).

### Suggested Fix
```js
return allProducts.filter((p) =>
  p.name.toLowerCase().includes(keyword.toLowerCase())
);