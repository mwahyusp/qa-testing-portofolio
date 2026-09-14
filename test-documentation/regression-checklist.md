# Regression Checklist — Mini E-Commerce

| Field            | Value                                              |
|------------------|----------------------------------------------------|
| **Project**      | QA Testing Portfolio — Mini E-Commerce             |
| **Document**     | Regression Checklist                               |
| **Version**      | 1.0 (Fase 2)                                       |
| **Last Updated** | 2026-XX-XX                                         |

---

## 1. Tujuan

Memastikan perubahan di Fase 2 (Search, Detail, Cart) **tidak merusak**
fungsi yang sudah berjalan di Fase 1 (Login, Product Catalog).

---

## 2. Regression Scenarios

| RS-ID  | Skenario                                                      | TC Terkait       | Fase | Status |
|--------|---------------------------------------------------------------|------------------|------|--------|
| RS-001 | Login valid masih redirect ke catalog                         | TC-001           | 1    | ⏸️     |
| RS-002 | Validasi email & password masih tampil pesan yang benar       | TC-002, TC-003   | 1    | ⏸️     |
| RS-003 | Catalog masih menampilkan 8 produk                            | TC-011           | 1    | ⏸️     |
| RS-004 | Tombol Add to Cart masih disabled untuk stok habis            | TC-014           | 1    | ⏸️     |
| RS-005 | Format harga masih Rupiah                                     | TC-012           | 1    | ⏸️     |
| RS-006 | Search tetap berfungsi (case-insensitive setelah fix)         | TC-018, TC-019   | 2    | ⏸️     |
| RS-007 | Add to Cart dari catalog memperbarui badge cart di header     | TC-020, TC-025   | 2    | ⏸️     |

**Total:** 7 regression scenarios (sesuai target akhir).

---

## 3. Cara Eksekusi

1. Sebelum menjalankan regression, pastikan seluruh fix Fase 2 sudah di-merge.
2. Jalankan skenario **RS-001 s/d RS-007** secara berurutan.
3. Update kolom Status: ✅ Pass / ❌ Fail.
4. Kalau ada Fail → catat sebagai bug baru (kemungkinan side effect).

---

## 4. Jadwal Regression

| Kapan               | Cakupan              |
|---------------------|----------------------|
| Setelah fix DEF-001 | RS-001, RS-002       |
| Setelah fix DEF-002 | RS-006               |
| Setelah Fase 3      | Semua RS (end-to-end)|

---

## 5. References

- [Test Cases](test-cases.md)
- [Bug Reports](bug-reports.md)