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