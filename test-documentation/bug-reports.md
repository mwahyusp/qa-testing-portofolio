Baik, saya update **`test-documentation/bug-reports.md` secara lengkap** — konsolidasi DEF-001 s/d DEF-005 dengan format seragam, header metadata terbaru, dan tabel summary di atas.

---

## 📄 `test-documentation/bug-reports.md` (FINAL Fase 3)

```markdown
# Bug Reports — Mini E-Commerce

| Field            | Value                                              |
|------------------|----------------------------------------------------|
| **Project**      | QA Testing Portfolio — Mini E-Commerce             |
| **Document**     | Bug Reports                                        |
| **Version**      | 3.0 (Fase 1 + 2 + 3)                               |
| **Total Bugs**   | 5                                                  |
| **Last Updated** | 2026-XX-XX                                         |
| **Status**       | 🟡 Open (menunggu fix & regression)                 |

---

## Summary

| Defect ID | Modul              | Test Case | Severity | Priority | Status |
|-----------|--------------------|-----------|----------|----------|--------|
| DEF-001   | Login              | TC-005    | Minor    | Medium   | Open   |
| DEF-002   | Search             | TC-018    | Major    | High     | Open   |
| DEF-003   | Cart               | TC-026    | Major    | High     | Open   |
| DEF-004   | Checkout           | TC-030    | Major    | High     | Open   |
| DEF-005   | Order Confirmation | TC-033    | Major    | High     | Open   |

**Distribusi Severity**

| Severity | Jumlah | Defect IDs                |
|----------|--------|---------------------------|
| Blocker  | 0      | -                         |
| Critical | 0      | -                         |
| Major    | 4      | DEF-002, 003, 004, 005    |
| Minor    | 1      | DEF-001                   |
| Trivial  | 0      | -                         |
| **Total**| **5**  |                           |

**Distribusi Modul**

| Modul              | Jumlah Defect |
|--------------------|---------------|
| Login              | 1             |
| Search             | 1             |
| Cart               | 1             |
| Checkout           | 1             |
| Order Confirmation | 1             |

> **Catatan:** Seluruh defect di bawah ini adalah **intentional defect**
> yang ditandai pada komentar `INTENTIONAL DEFECT` di source code.
> Tujuannya untuk latihan defect identification, reporting, retesting,
> dan regression testing.

---

## DEF-001 — Pesan error password kosong salah

| Field          | Detail                                                          |
|----------------|-----------------------------------------------------------------|
| **Defect ID**  | DEF-001                                                         |
| **Title**      | Pesan error password kosong menampilkan "Invalid email format!" |
| **Module**     | Login                                                           |
| **Related TC** | TC-005                                                          |
| **Severity**   | Minor                                                           |
| **Priority**   | Medium                                                          |
| **Status**     | Open                                                            |
| **Reported**   | 2026-XX-XX                                                      |
| **Reporter**   | Wahyu                                                           |
| **Environment**| Chrome 120+, Windows 11, local server                           |
| **Build**      | Fase 1 — commit `<hash>`                                        |

### Preconditions
- Halaman `app/index.html` terbuka.

### Steps to Reproduce
1. Isi field email dengan `user@test.com` (format valid).
2. Kosongkan field password.
3. Klik tombol **Login**.

### Expected Result
Muncul pesan `Password required!`.

### Actual Result
Muncul pesan `Invalid email format!` — tidak sesuai konteks.

### Evidence
📎 `evidence/login/TC-005.png`

### Root Cause (Analysis)
Pada `app/scripts/login.js`, blok validasi password kosong:

```js
if (password === "") {
  showMessage("Invalid email format!", "error");  // ← pesan salah
  return;
}
```

Pesan di-copy dari blok validasi format email, bukan ditulis ulang
untuk konteks password.

### Suggested Fix
```js
if (password === "") {
  showMessage("Password required!", "error");
  return;
}
```

### Regression Impact
- RS-001, RS-002 (lihat `regression-checklist.md`).

### Notes
Intentional defect #1. Severity Minor karena tidak menghambat fungsi
login, hanya menurunkan kualitas pesan error.

---

## DEF-002 — Search bersifat case-sensitive

| Field          | Detail                                                          |
|----------------|-----------------------------------------------------------------|
| **Defect ID**  | DEF-002                                                         |
| **Title**      | Pencarian produk bersifat case-sensitive                        |
| **Module**     | Search (Product Catalog)                                        |
| **Related TC** | TC-018                                                          |
| **Severity**   | Major                                                           |
| **Priority**   | High                                                            |
| **Status**     | Open                                                            |
| **Reported**   | 2026-XX-XX                                                      |
| **Reporter**   | Wahyu                                                           |
| **Environment**| Chrome 120+, Windows 11, local server                           |
| **Build**      | Fase 2 — commit `<hash>`                                        |

### Preconditions
- Halaman `app/products.html` terbuka.
- Data produk (`products.json`) berhasil dimuat.

### Steps to Reproduce
1. Klik pada kolom search di atas katalog.
2. Ketik `kaos` (huruf kecil semua).
3. Amati daftar produk yang tampil.

### Expected Result
Menampilkan produk **Kaos Polos Hitam** (case-insensitive match).

### Actual Result
Tidak ada produk yang tampil, muncul pesan "Tidak ada produk yang
cocok dengan pencarian."

### Evidence
📎 `evidence/products/TC-018.png`

### Root Cause (Analysis)
Pada `app/scripts/products.js`:

```js
function filterProducts(keyword) {
  if (keyword === "") return allProducts;
  return allProducts.filter((p) => p.name.includes(keyword));  // ← case-sensitive
}
```

Tidak ada normalisasi `toLowerCase()` di kedua sisi perbandingan.

### Suggested Fix
```js
function filterProducts(keyword) {
  if (keyword === "") return allProducts;
  const kw = keyword.toLowerCase();
  return allProducts.filter((p) => p.name.toLowerCase().includes(kw));
}
```

### Regression Impact
- RS-006 (search regression setelah fix).

### Notes
Intentional defect #2. Severity Major karena menyebabkan user tidak
menemukan produk yang jelas ada hanya karena perbedaan kapitalisasi.

---

## DEF-003 — Qty bisa melebihi stok produk

| Field          | Detail                                                          |
|----------------|-----------------------------------------------------------------|
| **Defect ID**  | DEF-003                                                         |
| **Title**      | Quantity di cart tidak dibatasi oleh stok produk                |
| **Module**     | Cart                                                            |
| **Related TC** | TC-026                                                          |
| **Severity**   | Major                                                           |
| **Priority**   | High                                                            |
| **Status**     | Open                                                            |
| **Reported**   | 2026-XX-XX                                                      |
| **Reporter**   | Wahyu                                                           |
| **Environment**| Chrome 120+, Windows 11, local server                           |
| **Build**      | Fase 2 — commit `<hash>`                                        |

### Preconditions
- Halaman `app/products.html` terbuka.
- Produk P001 (Kaos Polos Hitam, stok 12) sudah ditambahkan ke cart.

### Steps to Reproduce
1. Buka `app/cart.html`.
2. Pada baris P001, klik tombol `+` berulang, atau ubah langsung
   nilai pada input qty menjadi `99`.
3. Amati subtotal.

### Expected Result
Qty dibatasi maksimum 12 (sesuai stok P001), atau muncul pesan error
"Stok tidak mencukupi".

### Actual Result
Qty berubah menjadi 99, subtotal dihitung dengan qty 99
(Rp 7.425.000).

### Evidence
📎 `evidence/cart/TC-026.png`

### Root Cause (Analysis)
Pada `app/scripts/cart.js`, fungsi `changeQty()` dan `setQty()` tidak
memvalidasi batas atas terhadap `product.stock`:

```js
function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  const newQty = item.qty + delta;
  if (newQty < 1) return;
  item.qty = newQty;  // ← tidak ada cek max
}
```

### Suggested Fix
```js
function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  const product = findProduct(id);
  const newQty = item.qty + delta;

  if (newQty < 1) return;
  if (newQty > product.stock) {
    messageEl.textContent = `Stok "${product.name}" hanya ${product.stock}.`;
    messageEl.className = "message error";
    return;
  }

  item.qty = newQty;
  saveCart();
  renderCart();
}
```

### Regression Impact
- RS-006, RS-007 (cart badge & total).

### Notes
Intentional defect #3. Severity Major karena berpotensi over-order
di sistem produksi nyata.

---

## DEF-004 — Subtotal di checkout tidak reaktif

| Field          | Detail                                                          |
|----------------|-----------------------------------------------------------------|
| **Defect ID**  | DEF-004                                                         |
| **Title**      | Subtotal di halaman checkout tidak update saat qty berubah      |
| **Module**     | Checkout                                                        |
| **Related TC** | TC-030                                                          |
| **Severity**   | Major                                                           |
| **Priority**   | High                                                            |
| **Status**     | Open                                                            |
| **Reported**   | 2026-XX-XX                                                      |
| **Reporter**   | Wahyu                                                           |
| **Environment**| Chrome 120+, Windows 11, local server                           |
| **Build**      | Fase 3 — commit `<hash>`                                        |

### Preconditions
- Cart berisi P001 (Kaos Polos Hitam, Rp 75.000, qty 1).
- Halaman `app/checkout.html` terbuka.

### Steps to Reproduce
1. Buka DevTools → Application → Local Storage.
2. Edit key `mini_ecom_cart`, ubah qty P001 menjadi `3`.
3. Reload halaman checkout (F5).

### Expected Result
Subtotal = Rp 225.000 (75.000 × 3).

### Actual Result
Subtotal tetap Rp 75.000 karena `renderSummary()` tidak dipanggil
ulang setelah perubahan storage.

### Evidence
📎 `evidence/checkout/TC-030.png`

### Root Cause (Analysis)
Pada `app/scripts/checkout.js`, `renderSummary()` hanya dipanggil
sekali di dalam `initCheckout()`. Tidak ada listener `storage` event
atau re-render pada perubahan cart.

### Suggested Fix
```js
window.addEventListener("storage", (e) => {
  if (e.key === "mini_ecom_cart") {
    loadCart();
    renderSummary();
  }
});
```

Atau restrukturisasi dengan reactive state (misalnya
menyimpan cart di memory + subscribe pattern).

### Regression Impact
- RS-007 (cart badge & subtotal).

### Notes
Intentional defect #4. Severity Major karena user bisa membayar
jumlah yang tidak sesuai dengan item yang dipesan.

---

## DEF-005 — Order ID duplikat untuk order < 1 detik

| Field          | Detail                                                          |
|----------------|-----------------------------------------------------------------|
| **Defect ID**  | DEF-005                                                         |
| **Title**      | Dua order dalam 1 detik menghasilkan Order ID yang sama         |
| **Module**     | Order Confirmation                                              |
| **Related TC** | TC-033                                                          |
| **Severity**   | Major                                                           |
| **Priority**   | High                                                            |
| **Status**     | Open                                                            |
| **Reported**   | 2026-XX-XX                                                      |
| **Reporter**   | Wahyu                                                           |
| **Environment**| Chrome 120+, Windows 11, local server                           |
| **Build**      | Fase 3 — commit `<hash>`                                        |

### Preconditions
- Cart berisi minimal 1 item.
- Halaman `app/cart.html` terbuka.

### Steps to Reproduce
1. Lakukan checkout order pertama (isi form lengkap, klik Place Order).
2. Setelah sampai halaman confirmation, catat Order ID.
3. Cepat kembali ke cart (dalam < 1 detik sejak submit pertama),
   isi cart lagi, dan submit order kedua.
4. Bandingkan Order ID kedua order.

### Expected Result
Setiap order memiliki Order ID unik yang berbeda.

### Actual Result
Order ID kedua sama dengan order pertama jika dibuat pada detik
yang sama (contoh: `ORD-1789372852` untuk keduanya).

### Evidence
📎 `evidence/checkout/TC-033.png`

### Root Cause (Analysis)
Pada `app/scripts/checkout.js`:

```js
function generateOrderId() {
  const ts = Math.floor(Date.now() / 1000);
  return `ORD-${ts}`;  // ← resolusi 1 detik, rawan collision
}
```

Resolusi hanya 1 detik dan tidak ada entropy tambahan
(counter, UUID, atau random suffix).

### Suggested Fix
```js
function generateOrderId() {
  const ts = Date.now();  // milidetik
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ORD-${ts}-${rand}`;
}
```

Atau lebih robust: gunakan `crypto.randomUUID()`.

### Regression Impact
- RS-006 (checkout end-to-end).

### Notes
Intentional defect #5. Severity Major karena collision Order ID
menyebabkan konflik di database order pada sistem produksi.

---

## Reproducibility Summary

| Defect ID | Reproducible | Frekuensi     | Catatan                          |
|-----------|--------------|---------------|----------------------------------|
| DEF-001   | Yes          | 100%          | Selalu muncul untuk skenario TC-005 |
| DEF-002   | Yes          | 100%          | Selalu muncul untuk keyword lowercase |
| DEF-003   | Yes          | 100%          | Selalu muncul saat qty > stok     |
| DEF-004   | Yes          | 100%          | Setelah edit storage + reload     |
| DEF-005   | Yes          | Conditional   | Hanya jika 2 order < 1 detik      |

---

## Retest Plan

Setelah setiap defect diperbaiki:

| Defect ID | Retest TC | Regression Scenario   |
|-----------|-----------|-----------------------|
| DEF-001   | TC-005    | RS-001, RS-002         |
| DEF-002   | TC-018    | RS-006                 |
| DEF-003   | TC-026    | RS-006, RS-007         |
| DEF-004   | TC-030    | RS-007                 |
| DEF-005   | TC-033    | RS-006                 |

---

## References

- [Test Cases](test-cases.md)
- [Test Plan](test-plan.md)
- [Regression Checklist](regression-checklist.md)
- [Traceability Matrix](traceability-matrix.md)
- [Test Summary](test-summary.md)
- [Test Data](../test-data/test-data.md)
```

---

## 🔍 Yang berubah dari versi sebelumnya

| Bagian | Sebelum | Sesudah |
|--------|---------|---------|
| **Version** | 1.0 (Fase 2) | 3.0 (Fase 1 + 2 + 3) |
| **Total Bugs** | 2 (DEF-001, DEF-002) | 5 (DEF-001 s/d DEF-005) |
| **Summary table** | 2 baris | 5 baris + distribusi severity + distribusi modul |
| **Metadata per defect** | 9 field | 10 field (tambah **Build**) |
| **Struktur per defect** | Paragraf | Sub-heading konsisten: Preconditions, Steps, Expected, Actual, Evidence, Root Cause, Suggested Fix, Regression Impact, Notes |
| **Code snippet root cause** | Hanya untuk DEF-002 | Semua defect (menunjukkan lokasi bug persis) |
| **Regression Impact** | Tidak ada | Mapping ke RS-xxx |
| **Reproducibility Summary** | Tidak ada | Tabel baru |
| **Retest Plan** | Tidak ada | Tabel retest & regression per defect |
| **References** | 2 link | 6 link |

---

