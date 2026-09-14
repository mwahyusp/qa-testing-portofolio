# Test Summary Report — Mini E-Commerce

| Field             | Value                                              |
|-------------------|----------------------------------------------------|
| **Project**       | QA Testing Portfolio — Mini E-Commerce             |
| **Document**      | Test Summary Report                                |
| **Version**       | 1.0 (Fase 3)                                       |
| **Test Period**   | 2026-XX-XX s/d 2026-XX-XX                          |
| **Prepared By**   | Wahyu                                              |
| **Status**        | 🟡 Draft (menunggu eksekusi Fase 2 & 3)             |

---

## 1. Executive Summary

Pengujian fungsional dilakukan terhadap aplikasi demo Mini E-Commerce
yang mencakup 7 modul utama: Login, Product Catalog, Search, Product
Detail, Cart, Checkout, dan Order Confirmation.

Dari **33 test case** yang dirancang, sebanyak **17** telah dieksekusi
(Fase 1). Sebanyak **16** sisanya dijadwalkan di Fase 2 & 3. Lima
defect telah diidentifikasi (1 Minor, 4 Major) dengan status Open.

Aplikasi dinilai **layak untuk demo portfolio QA**, namun **belum
layak rilis produksi** sebelum kelima defect diperbaiki.

---

## 2. Test Execution Summary

| Modul              | Planned | Executed | Pass | Fail | Pass Rate |
|--------------------|---------|----------|------|------|-----------|
| Login              | 10      | 10       | 9    | 1    | 90%       |
| Product Catalog    | 7       | 7        | 7    | 0    | 100%      |
| Search             | 4       | 0        | -    | -    | -         |
| Product Detail     | 3       | 0        | -    | -    | -         |
| Cart               | 2       | 0        | -    | -    | -         |
| Checkout           | 5       | 0        | -    | -    | -         |
| Order Confirmation | 2       | 0        | -    | -    | -         |
| **Total**          | **33**  | **17**   | **16** | **1** | **94.1%** (Fase 1) |

---

## 3. Defect Summary

| Severity | Jumlah | Defect IDs                |
|----------|--------|---------------------------|
| Blocker  | 0      | -                         |
| Critical | 0      | -                         |
| Major    | 4      | DEF-002, 003, 004, 005    |
| Minor    | 1      | DEF-001                   |
| Trivial  | 0      | -                         |
| **Total**| **5**  |                           |

| Status | Jumlah |
|--------|--------|
| Open   | 5      |
| Fixed  | 0      |
| Closed | 0      |

---

## 4. Key Findings

1. **DEF-001 (Minor)** — Pesan error password kosong salah konteks.
   Tidak menghambat fungsi, tapi menurunkan kualitas UX.
2. **DEF-002 (Major)** — Search case-sensitive. Menyebabkan user
   tidak menemukan produk yang jelas ada.
3. **DEF-003 (Major)** — Qty tidak dibatasi stok. Berpotensi
   over-order di sistem produksi.
4. **DEF-004 (Major)** — Subtotal checkout tidak reaktif. Bisa
   menyebabkan ketidaksesuaian harga yang dibayar user.
5. **DEF-005 (Major)** — Order ID duplikat. Menyebabkan collision
   di database order.

---

## 5. Test Environment

| Komponen   | Detail                            |
|------------|-----------------------------------|
| Browser    | Chrome 120+, Firefox 120+         |
| OS         | Windows 11, macOS 13+             |
| Server     | `npx serve .` di localhost:3000   |
| Data       | `test-data/test-data.md`          |

---

## 6. Recommendations

1. **Fix prioritas:** DEF-002, DEF-003, DEF-004, DEF-005 → semua Major.
2. **Fix sekunder:** DEF-001 → Minor, bisa ditunda.
3. **Regression:** setelah fix, jalankan `regression-checklist.md`
   (7 scenario).
4. **Tambahan test di masa depan:**
   - Cross-browser testing (Safari, Edge).
   - Accessibility audit (WCAG 2.1 AA).
   - Mobile responsiveness di device fisik.
   - Security testing dasar (XSS di input form).

---

## 7. Conclusion

Aplikasi demo Mini E-Commerce **berhasil memenuhi tujuan portfolio QA**:
menyediakan controlled test environment dengan 5 intentional defect
untuk latihan end-to-end QA process (test plan → test case → eksekusi
→ bug report → regression).

Setelah kelima defect diperbaiki dan regression dijalankan, aplikasi
dapat dinyatakan **layak untuk keperluan demo internal**, namun belum
untuk produksi publik.

---

## 8. References

- [Test Plan](test-plan.md)
- [Test Cases](test-cases.md)
- [Bug Reports](bug-reports.md)
- [Regression Checklist](regression-checklist.md)
- [Traceability Matrix](traceability-matrix.md)
- [Test Data](../test-data/test-data.md)