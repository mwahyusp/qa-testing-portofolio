# Test Cases — Mini E-Commerce

| Field            | Value                                              |
|------------------|----------------------------------------------------|
| **Project**      | QA Testing Portfolio — Mini E-Commerce             |
| **Document**     | Test Cases                                         |
| **Version**      | 3.0 (Fase 1 + 2 + 3)                               |
| **Total Cases**  | 33                                                 |
| **Fase 1**       | 17 TC (executed)                                   |
| **Fase 2**       | 9 TC (pending execution)                           |
| **Fase 3**       | 7 TC (pending execution)                           |
| **Last Updated** | 2026-XX-XX                                         |
| **Status**       | 🔄 Fase 3 in progress                              |

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

| Modul              | Jumlah TC | Pass | Fail | Not Run | Pass Rate |
|--------------------|-----------|------|------|---------|-----------|
| Login              | 10        | 9    | 1    | 0       | 90%       |
| Product Catalog    | 7         | 7    | 0    | 0       | 100%      |
| Search             | 4         | -    | -    | 4       | -         |
| Product Detail     | 3         | -    | -    | 3       | -         |
| Cart               | 2         | -    | -    | 2       | -         |
| Checkout           | 5         | -    | -    | 5       | -         |
| Order Confirmation | 2         | -    | -    | 2       | -         |
| **Total**          | **33**    | 16   | 1    | **16**  | **51.5%** |

### Ringkasan Defect

| Defect ID | Test Case | Modul              | Deskripsi Singkat                                        | Severity | Priority | Status |
|-----------|-----------|--------------------|----------------------------------------------------------|----------|----------|--------|
| DEF-001   | TC-005    | Login              | Password kosong + email valid → "Invalid email format!"  | Minor    | Medium   | Open   |
| DEF-002   | TC-018    | Search             | Pencarian case-sensitive (`kaos` tidak menemukan `Kaos`) | Major    | High     | Open   |
| DEF-003   | TC-026    | Cart               | Qty bisa melebihi stok produk                            | Major    | High     | Open   |
| DEF-004   | TC-030    | Checkout           | Subtotal tidak reaktif saat qty berubah                  | Major    | High     | Open   |
| DEF-005   | TC-033    | Order Confirmation | Order ID duplikat untuk order < 1 detik                  | Major    | High     | Open   |

> Detail lengkap: lihat `bug-reports.md`.

---

# FASE 1 — Login & Product Catalog

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
| TC-011 | Login Tombol "Isi otomatis" mengisi field | Halaman login terbuka | 1. Klik tombol "Isi otomatis" | Email & password terisi `user@test.com` / `123456`, pesan success muncul | L | ✅ |

**Login — Summary:** 10 Pass / 1 Fail (TC-005 → DEF-001)

---

## 2. Modul: Product Catalog

| ID     | Skenario                                          | Precondition            | Steps                                                       | Expected Result                                    | Priority | Status |
|--------|---------------------------------------------------|-------------------------|-------------------------------------------------------------|----------------------------------------------------|----------|--------|
| TC-012 | Katalog menampilkan seluruh 8 produk              | Halaman katalog terbuka | 1. Buka `products.html`                                     | 8 kartu produk ditampilkan                          | H | ✅ |
| TC-013 | Harga produk tampil dalam format Rupiah           | Halaman katalog terbuka | 1. Amati harga tiap produk                                  | Format `Rp xx.xxx`                                  | M | ✅ |
| TC-014 | Produk stok habis menampilkan label "Stok habis"  | Halaman katalog terbuka | 1. Lihat produk P003 & P008                                 | Label `Stok habis` berwarna merah                   | H | ✅ |
| TC-015 | Tombol Add to Cart disabled untuk stok habis      | Halaman katalog terbuka | 1. Lihat produk P003 & P008                                 | Tombol **disabled**, label "Stok Habis"             | H | ✅ |
| TC-016 | Add to Cart produk stok tersedia                  | Halaman katalog terbuka | 1. Klik Add to Cart pada P001                               | Pesan `"Kaos Polos Hitam" ditambahkan ke cart.`     | H | ✅ |
| TC-017 | Search bar disabled di Fase 1                     | Halaman katalog terbuka | 1. Coba klik & ketik di search bar                          | Input tidak bisa diisi (disabled)                   | L | ✅ |
| TC-018 | Error handling saat `products.json` gagal dimuat  | Halaman katalog terbuka | 1. Rename sementara `products.json`<br>2. Reload halaman     | Pesan `Terjadi kesalahan saat memuat produk.`       | M | ✅ |

**Product Catalog — Summary:** 7 Pass / 0 Fail

> Catatan: TC-016 statusnya ✅ untuk Fase 1, tapi **tidak berlaku lagi** di
> Fase 2 karena search bar sudah aktif. Di Fase 2, TC-016 di-superseded
> oleh TC-018 s/d TC-021.

---

# FASE 2 — Search, Product Detail, Cart

## 3. Modul: Search

| ID     | Skenario                                          | Precondition            | Steps                                              | Expected Result                                    | Priority | Status |
|--------|---------------------------------------------------|-------------------------|----------------------------------------------------|----------------------------------------------------|----------|--------|
| TC-019 | Search dengan keyword lowercase                   | Halaman katalog terbuka | 1. Ketik `kaos` di search bar                      | Menampilkan **Kaos Polos Hitam**                   | H | ❌ |
| TC-020 | Search dengan keyword uppercase                   | Halaman katalog terbuka | 1. Ketik `KAOS` di search bar                      | Menampilkan **Kaos Polos Hitam**                   | H | ✅ |
| TC-021 | Search dengan keyword tidak ada                   | Halaman katalog terbuka | 1. Ketik `xyz` di search bar                       | Empty state "Tidak ada produk yang cocok"          | M | ✅ |
| TC-022 | Clear search mengembalikan seluruh produk         | Halaman katalog terbuka | 1. Ketik keyword<br>2. Hapus keyword               | 8 produk tampil kembali                            | M | ✅ |

**Search — Summary:** Pending eksekusi (prediksi: TC-018 ❌, sisanya ✅)

---

## 4. Modul: Product Detail

| ID     | Skenario                                          | Precondition            | Steps                                              | Expected Result                                    | Priority | Status |
|--------|---------------------------------------------------|-------------------------|----------------------------------------------------|----------------------------------------------------|----------|--------|
| TC-023 | Buka modal detail dari nama produk                | Halaman katalog terbuka | 1. Klik nama produk P001                           | Modal terbuka dengan nama, harga, stok P001        | H | ✅ |
| TC-024 | Tutup modal dengan tombol ×                       | Modal detail terbuka    | 1. Klik tombol ×                                   | Modal tertutup, halaman kembali normal             | M | ✅ |
| TC-025 | Add to Cart dari modal detail                     | Modal detail terbuka    | 1. Klik Add to Cart di dalam modal                 | Cart bertambah, modal tertutup                     | H | ✅ |

**Product Detail — Summary:** Pending eksekusi

---

## 5. Modul: Cart

| ID     | Skenario                                          | Precondition                | Steps                                              | Expected Result                                    | Priority | Status |
|--------|---------------------------------------------------|-----------------------------|----------------------------------------------------|----------------------------------------------------|----------|--------|
| TC-026 | Add to Cart dari catalog memperbarui badge        | Halaman katalog terbuka     | 1. Klik Add to Cart pada P001                      | Badge cart di header jadi `Cart (1)`               | H | ✅ |
| TC-027 | Qty dibatasi oleh stok produk                     | Cart berisi P001 (stok 12)  | 1. Naikkan qty jadi 99 di cart                     | Qty dibatasi max 12                                | H | ❌ |

**Cart — Summary:** Pending eksekusi (prediksi: TC-026 ❌)

---

# FASE 3 — Checkout & Order Confirmation

## 6. Modul: Checkout

| ID     | Skenario                                          | Precondition              | Steps                                                          | Expected Result                                          | Priority | Status |
|--------|---------------------------------------------------|---------------------------|----------------------------------------------------------------|----------------------------------------------------------|----------|--------|
| TC-028 | Checkout dengan cart kosong                       | Cart kosong               | 1. Akses `checkout.html` langsung                              | Pesan error, tombol Place Order disabled                 | H | ✅ |
| TC-029 | Validasi nama penerima kosong                     | Cart berisi item          | 1. Kosongkan nama<br>2. Isi field lain<br>3. Klik Place Order  | Pesan "Nama penerima wajib diisi."                       | H | ✅ |
| TC-030 | Validasi format nomor telepon                     | Cart berisi item          | 1. Isi telepon `abc`<br>2. Isi field lain<br>3. Klik Place Order | Pesan "Nomor telepon harus 10–13 digit angka."        | H | ✅ |
| TC-031 | Subtotal di checkout reaktif saat qty berubah     | Cart berisi P001 qty 1    | 1. Ubah qty di Local Storage jadi 3<br>2. Reload checkout      | Subtotal = Rp 225.000 (75.000 × 3)                      | H | ❌ |
| TC-032 | Checkout sukses dengan data valid                 | Cart berisi item          | 1. Isi form lengkap<br>2. Klik Place Order                     | Redirect ke `confirmation.html`, cart dikosongkan        | H | ✅ |

**Checkout — Summary:** Pending eksekusi (prediksi: TC-030 ❌)

---

## 7. Modul: Order Confirmation

| ID     | Skenario                                          | Precondition                  | Steps                                                    | Expected Result                                    | Priority | Status |
|--------|---------------------------------------------------|-------------------------------|----------------------------------------------------------|----------------------------------------------------|----------|--------|
| TC-033 | Order Confirmation menampilkan detail order       | Sudah checkout sukses         | 1. Amati halaman confirmation                            | Order ID, nama, metode, total tampil lengkap        | H | ✅ |
| TC-034 | Order ID unik untuk setiap order                  | Dua order dilakukan < 1 detik | 1. Checkout order pertama<br>2. Cepat checkout order kedua | Order ID kedua ≠ Order ID pertama                 | H | ❌ |

**Order Confirmation — Summary:** Pending eksekusi (prediksi: TC-033 ❌)

---

## 8. Catatan Eksekusi

### Fase 1 — Executed
- **Tanggal eksekusi:** 2026-XX-XX
- **Environment:** Chrome 120+, Windows 11, `npx serve .` di `localhost:3000`
- **Hasil:** 16 Pass / 1 Fail
- **DEF-001** teridentifikasi pada TC-005 (intentional defect #1).
- Screenshot: `evidence/login/TC-001.png` … `TC-010.png`,
  `evidence/products/TC-011.png` … `TC-017.png`.

### Fase 2 — Pending
- **Prediksi Fail:**
  - **TC-018** → DEF-002 (search case-sensitive)
  - **TC-026** → DEF-003 (qty tidak dibatasi stok)
- Screenshot target:
  - TC-018 s/d TC-021 → `evidence/products/`
  - TC-022 s/d TC-026 → `evidence/cart/`

### Fase 3 — Pending
- **Prediksi Fail:**
  - **TC-030** → DEF-004 (subtotal tidak reaktif)
  - **TC-033** → DEF-005 (order ID duplikat)
- Screenshot target:
  - TC-027 s/d TC-033 → `evidence/checkout/`

### Aturan Umum
- Screenshot tiap eksekusi disimpan sebagai `TC-XXX.png` di folder modul terkait.
- Setelah eksekusi, update kolom **Status** dan tabel **Ringkasan per Modul**.
- Untuk setiap Fail, buat entry di `bug-reports.md`.

---

## 9. References

- [Test Plan](test-plan.md)
- [Test Data](../test-data/test-data.md)
- [Bug Reports](bug-reports.md)
- [Regression Checklist](regression-checklist.md)
- [Traceability Matrix](traceability-matrix.md)
- [Test Summary](test-summary.md)