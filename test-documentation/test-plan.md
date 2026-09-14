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