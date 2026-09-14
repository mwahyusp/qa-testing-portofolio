# Traceability Matrix (RTM) — Mini E-Commerce

| Field            | Value                                              |
|------------------|----------------------------------------------------|
| **Project**      | QA Testing Portfolio — Mini E-Commerce             |
| **Document**     | Traceability Matrix                                |
| **Version**      | 1.0 (Fase 3)                                       |
| **Last Updated** | 2026-XX-XX                                         |

---

## 1. Requirement → Test Case → Defect

| Req ID | Requirement                          | Modul              | Test Cases              | Defect     |
|--------|--------------------------------------|--------------------|-------------------------|------------|
| R-01   | User dapat login dengan kredensial valid | Login          | TC-001, TC-007, TC-010  | -          |
| R-02   | Sistem menolak email format invalid  | Login              | TC-002                  | -          |
| R-03   | Sistem menolak password < 6 karakter | Login              | TC-003, TC-008          | -          |
| R-04   | Sistem menolak field kosong          | Login              | TC-004, TC-005, TC-006  | DEF-001    |
| R-05   | Sistem menolak kredensial salah      | Login              | TC-009                  | -          |
| R-06   | User dapat melihat seluruh produk    | Catalog            | TC-011                  | -          |
| R-07   | Harga tampil dalam format Rupiah     | Catalog            | TC-012                  | -          |
| R-08   | Produk stok habis ditandai jelas     | Catalog            | TC-013, TC-014          | -          |
| R-09   | User dapat menambah produk ke cart   | Catalog, Detail    | TC-015, TC-024, TC-025  | -          |
| R-10   | Error handling saat data gagal load  | Catalog            | TC-017                  | -          |
| R-11   | User dapat mencari produk            | Search             | TC-018, TC-019, TC-020, TC-021 | DEF-002 |
| R-12   | User dapat melihat detail produk     | Product Detail     | TC-022, TC-023          | -          |
| R-13   | User dapat mengubah qty di cart      | Cart               | TC-026                  | DEF-003    |
| R-14   | User dapat checkout dengan data valid| Checkout           | TC-031                  | -          |
| R-15   | Checkout memvalidasi input form      | Checkout           | TC-028, TC-029          | -          |
| R-16   | Checkout menolak cart kosong         | Checkout           | TC-027                  | -          |
| R-17   | Subtotal dihitung akurat             | Checkout           | TC-030                  | DEF-004    |
| R-18   | Confirmation menampilkan detail order| Order Confirmation | TC-032                  | -          |
| R-19   | Order ID unik untuk tiap order       | Order Confirmation | TC-033                  | DEF-005    |

---

## 2. Coverage Summary

| Modul              | Requirement | Test Cases | Coverage |
|--------------------|-------------|------------|----------|
| Login              | 5           | 10         | 100%     |
| Product Catalog    | 5           | 7          | 100%     |
| Search             | 1           | 4          | 100%     |
| Product Detail     | 1           | 3          | 100%     |
| Cart               | 1           | 2          | 100%     |
| Checkout           | 4           | 5          | 100%     |
| Order Confirmation | 2           | 2          | 100%     |
| **Total**          | **19**      | **33**     | **100%** |

---

## 3. Defect Distribution per Modul

| Modul              | Jumlah Defect | Defect IDs         |
|--------------------|---------------|--------------------|
| Login              | 1             | DEF-001            |
| Search             | 1             | DEF-002            |
| Cart               | 1             | DEF-003            |
| Checkout           | 1             | DEF-004            |
| Order Confirmation | 1             | DEF-005            |
| **Total**          | **5**         |                    |

---

## 4. References

- [Test Cases](test-cases.md)
- [Bug Reports](bug-reports.md)
- [Test Summary](test-summary.md)