# QA Portfolio - Login Page Project

Proyek sederhana untuk demonstrasi **QA Testing Skills** menggunakan **HTML5, CSS3, dan JavaScript**.  
Login form ini dilengkapi dengan **form validation** agar bisa dijadikan contoh pengujian manual (test case dan bug report).

---

## 🖥️ Demo Project

UI sederhana Login Page dengan validasi:

- **Input valid** → tampil pesan `Login successful!`
- **Email tanpa @** → tampil pesan `Invalid email format!`
- **Password < 6 karakter** → tampil pesan `Password must be at least 6 characters.`
- **Email kosong** → tampil pesan `Email is required!`
- **Password kosong** → tampil pesan `Password required!`

---

## 📂 Struktur Folder

qa-portfolio-project/
│── index.html # Halaman utama login
│── style.css # Styling halaman
│── script.js # Validasi login (sudah sesuai test case)
│── Login_Test_Cases.xlsx # Dokumen Test Case
│── Login_Bug_Report.docx # Dokumen Bug Report
│── README.md # Dokumentasi project

---

## 🧪 Test Cases

Contoh **Test Case** tersedia dalam file Excel:  
👉 [Login_Test_Cases.xlsx](./Login_Test_Cases.xlsx)

| Test Scenario                    | Steps                                                      | Expected Result                                |
| -------------------------------- | ---------------------------------------------------------- | ---------------------------------------------- |
| Login valid                      | Input email `user@test.com`, password `123456`, klik Login | `Login successful!`                            |
| Email tidak valid                | Input email `user.com`, password `123456`, klik Login      | `Invalid email format!`                        |
| Password < 6                     | Input email `user@test.com`, password `123`, klik Login    | `Password must be at least 6 characters.`      |
| Password valid tapi email kosong | Input email kosong, password `123456`, klik Login          | `Email is required!`                           |
| Field kosong                     | Biarkan email & password kosong, klik Login                | `Email is required!` atau `Password required!` |

---

## 🐞 Bug Report

Contoh **Bug Report** tersedia dalam file Word:  
👉 [Login_Bug_Report.docx](./Login_Bug_Report.docx)

**Bug Example:**

- **Title**: Form login tidak menampilkan error ketika password kosong
- **Expected**: Muncul pesan `Password required`
- **Actual**: Hanya muncul error `Invalid email format!`
- **Severity**: Medium

---

## 🎯 Tujuan Project

- Menunjukkan **kemampuan QA Tester** dalam membuat **Test Case & Bug Report**.
- Menunjukkan **basic web knowledge** (HTML, CSS, JS) untuk mendukung proses QA.

---

## 📜 License

Project ini dibuat sebagai **portfolio QA Tester Intern** dan bebas digunakan untuk tujuan belajar.
