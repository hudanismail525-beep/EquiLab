# Product Requirements Document (PRD)
## Web Pembelajaran Kimia: Kesetimbangan Kimia Interaktif Kelas 11 SMA
**Proyek:** *EquiLab 11, Kursus & Lab Virtual Kesetimbangan Kimia*
**Versi Dokumen:** 1.0 (Draft untuk Persetujuan)
**Status:** Siap Implementasi setelah review

---

### 1. Ringkasan Eksekutif & Tujuan Produk
*EquiLab 11* adalah platform pembelajaran kimia berbasis web untuk siswa SMA Kelas 11 (Fase F Kurikulum Merdeka). Materi Kesetimbangan Kimia, yang sering dianggap abstrak karena sifatnya yang "diam tapi bergerak", dikemas menjadi **alur kursus interaktif berurutan (guided learning journey)** yang terdiri dari 4 pertemuan (@ 2 JP). Setiap pertemuan dilengkapi **simulasi partikel**, **laboratorium virtual**, **kalkulator tetapan kesetimbangan**, **lembar kerja (LKPD) digital**, serta **kuis dengan umpan balik instan**.

#### Tujuan Utama:
1. Membantu siswa memahami kesetimbangan kimia sebagai **proses dinamis** (laju reaksi maju = laju reaksi balik, konsentrasi tetap), bukan sebagai keadaan "berhenti".
2. Melatih keterampilan menuliskan rumus K, menyusun **tabel MRS**, menghitung Kc, Kp, dan derajat disosiasi (α).
3. Memvisualisasikan **asas Le Chatelier** dan penerapannya pada proses industri (Haber-Bosch).
4. Mendukung ketiga ranah penilaian (pengetahuan, sikap, keterampilan) melalui fitur belajar, mengamati, mencatat, berdiskusi, dan mempresentasikan.

---

### 2. Sasaran Pengguna & Kebutuhan (User Persona)
- **Siswa Kelas 11 SMA (IPA/Kimia):** Membutuhkan media visual, bertahap, dengan umpan balik instan, dan bisa diakses lancar di smartphone maupun laptop.
- **Guru Kimia SMA:** Membutuhkan media peraga digital untuk demonstrasi di kelas (air mendidih, CuSO₄·5H₂O, Fe³⁺ + SCN⁻) tanpa alat lab basah, serta lembar diskusi kelompok yang bisa dicetak/dikumpulkan.

---

### 3. Konsep Desain & Identitas Visual (UI/UX)
Platform mengusung tema **Dynamic Equilibrium Duo-Tone**: dua warna kontras yang melambangkan dua arah reaksi, bertemu pada warna ungu saat setimbang. Gaya komponen: **kartu lembut (soft cards) + diagram partikel animasi**.

#### 3.1. Konsep Inti
- **Filosofi warna:** Biru = reaksi maju (→), Oranye = reaksi balik (←), Ungu = keadaan setimbang (⇌). Pemakaian warna konsisten di seluruh aplikasi: panah, grafik laju, partikel, label, dan lencana.
- **Kesan:** Akademis, jernih, dinamis, dan mudah dibaca di layar kecil.

#### 3.2. Palet Warna
| Peran | Warna | Kode |
|---|---|---|
| Background utama | Putih | `#FFFFFF` |
| Background sekunder | Abu kebiruan lembut | `#F1F5F9` |
| Teks utama / sekunder | Slate gelap / Slate sedang | `#0F172A` / `#475569` |
| Reaksi maju (→) | Biru | `#2563EB` |
| Reaksi balik (←) | Oranye | `#F97316` |
| Setimbang (⇌) / aksen utama | Ungu | `#7C3AED` |
| Sukses / jawaban benar | Emerald | `#10B981` |
| Peringatan / pergeseran | Amber | `#F59E0B` |
| Salah / reaktan habis | Rose | `#EF4444` |

Aturan aksesibilitas: rasio kontras teks minimal WCAG AA; arah reaksi tidak hanya dibedakan lewat warna, tetapi juga lewat ikon panah dan label teks (ramah buta warna).

#### 3.3. Tipografi
- **Plus Jakarta Sans** untuk judul dan teks isi.
- **JetBrains Mono** untuk nilai numerik, tabel MRS, dan hasil perhitungan (angka sejajar, mudah dibandingkan).
- Rumus kimia ditulis rapi dengan subskrip/superskrip presisi, misalnya $\text{N}_2\text{(g)} + 3\text{H}_2\text{(g)} \rightleftharpoons 2\text{NH}_3\text{(g)}$, $\text{Fe}^{3+}$, $\text{SCN}^-$, $\text{CuSO}_4 \cdot 5\text{H}_2\text{O}$.
- Simbol panah kesetimbangan ⇌ berwarna ungu; panah → biru; ← oranye.

#### 3.4. Komponen Visual
- **Soft layered cards:** sudut membulat 16 px, bayangan lembut berlapis, border tipis `#E2E8F0`.
- **Diagram partikel animasi (Canvas/SVG):** partikel reaktan dan produk bergerak acak; partikel berwarna sesuai arah reaksi yang sedang terjadi. Tersedia kontrol putar/jeda/ulang.
- **Grafik real-time:** (a) konsentrasi vs waktu, (b) laju reaksi maju vs balik yang bertemu di satu garis saat setimbang.
- **Tabel MRS interaktif** dengan font monospace, kolom Mula-mula, Reaksi, Setimbang; sel dapat diisi siswa lalu diperiksa otomatis.
- **Tabung reaksi virtual** dengan warna larutan dinamis (mis. gradasi jingga-merah pada Fe³⁺ + SCN⁻).
- **Indikator pergeseran:** panel besar "Bergeser ke kanan / kiri / tetap" dengan animasi panah.
- **Micro-animations:** transisi halus saat berpindah langkah, konfeti ringan saat lencana didapat.

#### 3.5. Tata Letak & Responsivitas
- *Mobile-first*, breakpoint utama 640 / 1024 px.
- Desktop: sidebar progres kursus di kiri, area konten dan simulasi di tengah, panel catatan di kanan (dapat dilipat).
- Mobile: navigasi bawah (tab Materi, Simulasi, Latihan, Catatan), simulasi tampil layar penuh dengan kontrol di bawah.
- Mode cetak (*print stylesheet*) untuk LKPD dan ringkasan diskusi.

---

### 4. Struktur Arsitektur & Alur Navigasi (Sequential Course Journey)
Aplikasi memakai pola **Alur Berurutan ala Kursus Interaktif**. Siswa dipandu melalui peta perjalanan belajar (*Milestone Path*) dengan penanda progres yang tersimpan otomatis di `localStorage`.

```
[ Beranda / Peta Belajar Kursus ]
          │
          ▼
[ Pertemuan 1: Fenomena Reaksi Kesetimbangan ]
  ├── 1.1 Reaksi Searah vs Reaksi Bolak-balik
  ├── 1.2 Kesetimbangan sebagai Proses Dinamis (analogi + simulasi partikel)
  ├── 1.3 Syarat & Ciri Kesetimbangan (sistem tertutup, bolak-balik, dinamis)
  ├── 1.4 Kesetimbangan Homogen vs Heterogen
  ├── Demo Virtual: Air Mendidih (wadah terbuka vs tertutup) & CuSO₄·5H₂O
  ├── Aktivitas: Pengelompokan Persamaan Reaksi (drag & drop)
  └── Kuis Cek Pemahaman 1
          │
          ▼
[ Pertemuan 2: Hukum Kesetimbangan & Tetapan Kc ]
  ├── 2.1 Hukum Aksi Massa (temukan pola dari data konsentrasi)
  ├── 2.2 Menulis Rumus Kc (homogen & heterogen)
  ├── 2.3 Makna Nilai K: arah reaksi, Qc vs Kc, status setimbang atau tidak
  ├── 2.4 Menghitung Komposisi Setimbang dengan Tabel MRS
  ├── Alat Cerdas: Builder Rumus K & Kalkulator Kc/Qc
  └── Kuis Cek Pemahaman 2
          │
          ▼
[ Pertemuan 3: Kp, Kc, Disosiasi & Derajat Disosiasi ]
  ├── 3.1 Rumus Kc dan Kp
  ├── 3.2 Hubungan Kp = Kc(RT)^Δn dan Penentuan Δn
  ├── 3.3 Kesetimbangan Disosiasi & Derajat Disosiasi (α)
  ├── 3.4 Tabel MRS pada Reaksi Disosiasi
  ├── Alat Cerdas: Konverter Kp⇄Kc & Solver Disosiasi
  └── Kuis Cek Pemahaman 3
          │
          ▼
[ Pertemuan 4: Pergeseran Kesetimbangan ]
  ├── 4.1 Asas Le Chatelier
  ├── 4.2 Pengaruh Konsentrasi, Suhu, Tekanan & Volume
  ├── 4.3 Peran Katalis
  ├── 4.4 Penerapan Industri: Proses Haber-Bosch
  ├── Lab Virtual: Pergeseran Fe³⁺ + SCN⁻ & Simulator Le Chatelier
  └── Kuis Cek Pemahaman 4
          │
          ▼
[ Evaluasi Akhir & Penghargaan ]
  ├── Ujian Komprehensif Kesetimbangan Kimia
  ├── Analisis Kelemahan & Pembahasan Lengkap
  └── Sertifikat Digital & Koleksi Lencana
```

---

### 5. Detail Spesifikasi Fitur Utama

#### 5.1. Pertemuan 1: Fenomena Reaksi Kesetimbangan
**Capaian:** membedakan reaksi searah vs bolak-balik; memahami kesetimbangan dinamis; mengenali syarat setimbang; membedakan homogen vs heterogen.
- **Simulasi Air Mendidih:** pilih wadah terbuka atau tertutup. Pada wadah tertutup, partikel uap dan cair mencapai keadaan dengan laju penguapan = laju pengembunan, volume cairan tampak tetap tetapi partikel tetap berpindah. Pada wadah terbuka, uap lepas dan tidak pernah setimbang.
- **Demo Virtual CuSO₄·5H₂O:** pemanasan (biru → putih) dan penambahan air (putih → biru) divisualisasikan sebagai reaksi bolak-balik; siswa mengisi **lembar pengamatan digital** (warna, wujud, perubahan).
- **Simulator Partikel Dinamis:** reaksi A ⇌ B dengan partikel berwarna. Siswa melihat konsentrasi menjadi konstan sementara laju maju dan balik bertemu pada grafik.
- **Checklist Syarat Setimbang:** siswa menguji skenario ("sistem terbuka", "reaksi searah", dll.) dan sistem menandai syarat mana yang terpenuhi.
- **Aktivitas Pengelompokan:** kartu persamaan reaksi diseret ke kolom *berkesudahan / bolak-balik* dan *homogen / heterogen*, dengan umpan balik per kartu.
- **Analogi Interaktif:** misalnya eskalator naik dan turun atau pengisian-pengosongan bak, dikaitkan dengan konsep, dilengkapi pertanyaan penalaran kritis.

#### 5.2. Pertemuan 2: Hukum Kesetimbangan & Tetapan Kc
**Capaian:** hukum aksi massa; menulis K (homogen/heterogen); makna K untuk arah reaksi dan status setimbang; komposisi setimbang lewat tabel MRS.
- **Penemuan Pola dari Data:** tabel beberapa percobaan konsentrasi setimbang; siswa menghitung hasil [produk]/[reaktan] dan menemukan nilai tetap (K).
- **Builder Rumus K:** siswa menyusun rumus K dengan menyeret zat ke pembilang/penyebut dan menentukan pangkat dari koefisien. Sistem otomatis memeriksa dan **menandai kesalahan umum**, yaitu memasukkan padatan (s) dan cairan murni (l).
- **Penguji Qc vs Kc:** siswa memasukkan konsentrasi sesaat; sistem membandingkan Qc dengan Kc dan menyimpulkan *sudah setimbang / bergeser ke kanan / bergeser ke kiri* dengan animasi arah.
- **Penjelas Besar K:** skala visual (K ≪ 1, K ≈ 1, K ≫ 1) yang menunjukkan kecenderungan produk atau reaktan.
- **Tabel MRS Interaktif:** langkah terpandu: isi mula-mula → tentukan x → hitung reaksi → komposisi setimbang → hitung Kc (atau cari x dari Kc). Dua mode: *terpandu* (petunjuk tiap langkah) dan *mandiri*.

#### 5.3. Pertemuan 3: Kp, Kc, Disosiasi & Derajat Disosiasi
**Capaian:** rumus Kc dan Kp; Kp = Kc(RT)^Δn; kesetimbangan disosiasi; menghitung α dan K.
- **Penulis Rumus Kp:** hanya zat berfase gas yang masuk, menggunakan tekanan parsial.
- **Penentu Δn:** siswa menghitung Δn (jumlah koefisien gas produk − reaktan), sistem memvalidasi.
- **Konverter Kp ⇄ Kc:** input K, suhu (K), dan Δn; sistem menampilkan substitusi langkah demi langkah dengan R = 0,082 L·atm/mol·K.
- **Solver Disosiasi:** pilih reaksi (mis. $\text{N}_2\text{O}_4 \rightleftharpoons 2\text{NO}_2$, $\text{PCl}_5 \rightleftharpoons \text{PCl}_3 + \text{Cl}_2$). Siswa menggeser α dan melihat komposisi setimbang berubah pada visual partikel dan tabel MRS; atau memasukkan data lalu sistem menghitung α dan K.
- **Latihan Bertahap:** soal dibuka satu langkah demi satu langkah untuk melatih ketelitian dan ketekunan.

#### 5.4. Pertemuan 4: Pergeseran Kesetimbangan
**Capaian:** asas Le Chatelier; prediksi pergeseran (konsentrasi, suhu, tekanan, volume); peran katalis; optimasi Haber-Bosch.
- **Simulator Le Chatelier Multi-Faktor:** reaksi pilihan (mis. $\text{N}_2 + 3\text{H}_2 \rightleftharpoons 2\text{NH}_3$, ΔH negatif). Kontrol: tambah/kurangi zat, suhu, tekanan/volume. Visual partikel, grafik konsentrasi vs waktu (dengan lonjakan lalu pergeseran), dan indikator arah pergeseran.
- **Lab Virtual Fe³⁺ + SCN⁻:** tabung reaksi berwarna jingga-merah. Siswa menambahkan Fe³⁺, SCN⁻, atau zat pengikut (mis. perak/OH⁻) lalu mengamati perubahan warna, **mencatat ke tabel pengamatan**, dan menyimpulkan arah pergeseran.
- **Mode Prediksi dulu, Simulasi kemudian:** siswa memprediksi arah, lalu simulasi memverifikasi; skor penalaran dicatat.
- **Peran Katalis:** dua grafik berdampingan (dengan vs tanpa katalis). Setimbang tercapai lebih cepat, posisi setimbang sama.
- **Simulator Haber-Bosch:** slider suhu dan tekanan, menampilkan *hasil NH₃* dan *laju*. Siswa mencari kondisi optimum dan menjelaskan kompromi (suhu ±400–500 °C, tekanan tinggi, katalis Fe).

#### 5.5. Dukungan Aspek Sikap & Keterampilan (lintas pertemuan)
| Aspek | Fitur Pendukung |
|---|---|
| Bernalar kritis | Pertanyaan pemantik "Mengapa?" pada setiap simulasi; mode prediksi-dulu; refleksi singkat |
| Gotong royong | **Mode Diskusi Kelompok** (layar bersama satu perangkat, pembagian peran: pengamat, pencatat, penghitung, juru bicara); LKPD yang bisa dicetak dan dikerjakan bersama |
| Teliti & bertanggung jawab | Pemeriksa langkah, penanda kesalahan umum, checklist kelengkapan data |
| Terampil mengamati & mencatat | Tabel pengamatan digital (air mendidih, CuSO₄·5H₂O, Fe³⁺ + SCN⁻) dengan ekspor ke PDF/cetak |
| Terampil menyampaikan hasil | Kotak "Kesimpulan Saya" (tulis) dan **Mode Presentasi** (kartu langkah penyelesaian layar penuh untuk presentasi lisan) |

#### 5.6. Arena Kuis & Gamifikasi
- **Soal Bertingkat:** Level 1 konseptual, Level 2 hitungan (Kc, Kp, MRS, α), Level 3 analisis (prediksi pergeseran, Haber-Bosch).
- **Pembahasan Langkah demi Langkah** dan **Petunjuk Rumus** sesuai kebutuhan.
- **XP & Lencana:** *"Pengamat Dinamis"* (P1), *"Penyusun Rumus K"* (P2), *"Pakar Tabel MRS"* (P3), *"Penakluk Le Chatelier"* (P4), hingga *"Master Kesetimbangan Kimia Kelas 11"*.
- **Evaluasi Akhir** dengan analisis kelemahan per subtopik dan **Sertifikat Kelulusan Digital**.
- Riwayat skor, progres, dan catatan tersimpan di `localStorage`.

#### 5.7. Panel Guru (Ringan, Tanpa Server)
- Mode **Demonstrasi Kelas**: tombol layar penuh, tampilan besar, kontrol sederhana untuk proyektor.
- Ekspor/Cetak **LKPD** dan kunci jawaban (pembahasan).
- Tombol reset progres perangkat bersama.

---

### 6. Spesifikasi Teknis & Stack Implementasi
- **Framework:** React 19 + Vite.
- **Styling:** CSS3 Vanilla (design system: CSS Variables untuk token warna duo-tone, Flexbox/Grid, micro-animations, print stylesheet).
- **Simulasi:** Canvas 2D / SVG buatan sendiri (mesin partikel sederhana, grafik laju & konsentrasi) tanpa library berat.
- **Penyimpanan Status:** `localStorage` (progres, skor kuis, catatan, preferensi).
- **Formula Kimia:** komponen tipografi khusus untuk subskrip/superskrip dan panah ⇌; solver MRS (aljabar sederhana dan persamaan kuadrat) ditulis sendiri.
- **Performa & Aksesibilitas:** tanpa bundle eksternal besar, ramah kuota terbatas, dukungan keyboard, label ARIA pada kontrol simulasi, opsi *reduce motion*.

---

### 7. Rencana Roadmap Pelaksanaan (Implementation Milestones)
1. **Milestone 1:** Core Design System (token Duo-Tone, komponen kartu, tipografi rumus, layout, navigasi kursus, sidebar progres, mesin partikel dasar).
2. **Milestone 2:** Pertemuan 1 (materi, simulasi air mendidih, CuSO₄·5H₂O, partikel dinamis, aktivitas pengelompokan, kuis).
3. **Milestone 3:** Pertemuan 2 (Builder Rumus K, Qc vs Kc, tabel MRS interaktif, kuis).
4. **Milestone 4:** Pertemuan 3 (Konverter Kp⇄Kc, Solver Disosiasi, kuis).
5. **Milestone 5:** Pertemuan 4 (Simulator Le Chatelier, Lab Fe³⁺ + SCN⁻, katalis, Simulator Haber-Bosch, kuis).
6. **Milestone 6:** Evaluasi akhir, gamifikasi, lencana, sertifikat, mode diskusi/presentasi, ekspor LKPD.
7. **Milestone 7:** Pengujian menyeluruh (akurasi perhitungan kimia, responsivitas, aksesibilitas) dan penyempurnaan UI/UX.