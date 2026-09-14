# Test Cases — Mini E-Commerce

| Field            | Value                                              |
|------------------|----------------------------------------------------|
| **Project**      | QA Testing Portfolio — Mini E-Commerce             |
| **Document**     | Test Cases                                         |
| **Version**      | 1.0 (Fase 1)                                       |
| **Total Cases**  | 17                                                 |
| **Last Updated** | 2025-XX-XX                                         |
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
| TC-001 | Login dengan kredensial valid                  | Halaman login terbuka | 1. Isi email `user@test.com`<br>2. Isi password `123456`<br>3. Klik Login | Pesan `Login successful!` muncul, redirect ke katalog | H | ✅ |
| TC-002 | Login dengan email tanpa `@`                   | Halaman login terbuka | 1. Isi email `user.com`<br>2. Isi password `123456`<br>3. Klik Login | Pesan `Invalid email format!`                            | H | ✅ |
| TC-003 | Login dengan password < 6 karakter             | Halaman login terbuka | 1. Isi email `user@test.com`<br>2. Isi password `123`<br>3. Klik Login | Pesan `Password must be at least 6 characters.`          | H | ✅ |
| TC-004 | Login dengan email kosong                      | Halaman login terbuka | 1. Kosongkan email<br>2. Isi password `123456`<br>3. Klik Login     | Pesan `Email is required!`                               | H | ✅ |
| TC-005 | Login dengan password kosong (email valid)     | Halaman login terbuka | 1. Isi email `user@test.com`<br>2. Kosongkan password<br>3. Klik Login | Pesan `Password required!`                               | H | ❌ |
| TC-006 | Login dengan email & password kosong           | Halaman login terbuka | 1. Kosongkan email & password<br>2. Klik Login                       | Pesan `Email is required!`                               | M | ✅ |
| TC-007 | Password tepat 6 karakter (boundary)           | Halaman login terbuka | 1. Isi email `user@test.com`<br>2. Isi password `123456`<br>3. Klik Login | Pesan `Login successful!`                                | M | ✅ |
| TC-008 | Password 5 karakter (boundary bawah)           | Halaman login terbuka | 1. Isi email `user@test.com`<br>2. Isi password `12345`<br>3. Klik Login | Pesan `Password must be at least 6 characters.`          | M | ✅ |
| TC-009 | Kredensial salah (email benar, password salah) | Halaman login terbuka | 1. Isi email `user@test.com`<br>2. Isi password `abcdef`<br>3. Klik Login | Pesan `Invalid email or password!`                       | H | ✅ |
| TC-010 | Email dengan spasi di awal/akhir               | Halaman login terbuka | 1. Isi email `  user@test.com  `<br>2. Isi password `123456`<br>3. Klik Login | Pesan `Login successful!` (trim berhasil)                | L | ✅ |

---

## 2. Modul: Product Catalog

| ID     | Skenario                                          | Precondition            | Steps                                                       | Expected Result                                    | Priority | Status |
|--------|---------------------------------------------------|-------------------------|-------------------------------------------------------------|----------------------------------------------------|----------|--------|
| TC-011 | Katalog menampilkan seluruh 8 produk              | Halaman katalog terbuka | 1. Buka `products.html`                                     | 8 kartu produk ditampilkan                          | H | ✅ |
| TC-012 | Harga produk tampil dalam format Rupiah           | Halaman katalog terbuka | 1. Amati harga tiap produk                                  | Format `Rp xx.xxx`                                  | M | ✅ |
| TC-013 | Produk stok habis menampilkan label "Stok habis"  | Halaman katalog terbuka | 1. Lihat produk P003 & P008                                 | Label `Stok habis` berwarna merah                   | H | ✅ |
| TC-014 | Tombol Add to Cart disabled untuk stok habis      | Halaman katalog terbuka | 1. Lihat produk P003 & P008                                 | Tombol **disabled**, label "Stok Habis"             | H | ✅ |
| TC-015 | Add to Cart produk stok tersedia                  | Halaman katalog terbuka | 1. Klik Add to Cart pada P001                               | Pesan `"Kaos Polos Hitam" ditambahkan ke cart.`     | H | ✅ |
| TC-016 | Search bar disabled di Fase 1                     | Halaman katalog terbuka | 1. Coba klik & ketik di search bar                          | Input tidak bisa diisi (disabled)                   | L | ✅ |
| TC-017 | Error handling saat `products.json` gagal dimuat  | Halaman katalog terbuka | 1. Rename sementara `products.json`<br>2. Reload halaman     | Pesan `Terjadi kesalahan saat memuat produk.`       | M | ✅ |

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