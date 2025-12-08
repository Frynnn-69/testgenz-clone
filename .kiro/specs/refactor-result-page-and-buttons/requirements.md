# Requirements: Refactor Result Page & Standardize Buttons

## Introduction

Tugas ini memiliki dua tujuan utama:
1.  **Refactoring Halaman Hasil**: Membersihkan `app/result/page.tsx` dengan memisahkan logika klien (state, data fetching) ke dalam komponennya sendiri, sesuai dengan best practice Next.js.
2.  **Standardisasi Komponen**: Memastikan semua tombol di seluruh aplikasi menggunakan komponen `Button` kustom dari `src/components/common/Button.tsx` untuk konsistensi visual dan tema.

## Glossary

- **Page Component**: Komponen server di `app/result/page.tsx`.
- **Client Component**: Komponen yang berisi hooks dan logika interaktif, ditandai dengan `"use client"`.
- **Custom Button**: Komponen `Button.tsx` yang sudah dibuat di `src/components/common/`.

## Requirements

### Requirement 1: Decouple Result Page Logic

**User Story:** Sebagai developer, saya ingin memindahkan semua logika dari `app/result/page.tsx` ke dalam komponen klien baru (`ResultClient.tsx`) agar `page.tsx` menjadi bersih dan hanya berfungsi sebagai entry point untuk rute.

#### Acceptance Criteria

1.  WHEN refactoring is complete THEN sebuah file baru bernama `ResultClient.tsx` SHALL dibuat di dalam `src/components/result/`.
2.  WHEN refactoring is complete THEN semua logika yang menggunakan hooks (`useState`, `useEffect`, `useRouter`) dan rendering kondisional (loading, error) dari `page.tsx` SHALL dipindahkan ke `ResultClient.tsx`.
3.  WHEN refactoring is complete THEN `app/result/page.tsx` SHALL menjadi sangat sederhana, hanya berisi impor dan render untuk `<ResultClient />`.
4.  WHEN refactoring is complete THEN file `src/components/result/index.ts` SHALL diperbarui untuk mengekspor `ResultClient`.

### Requirement 2: Standardize Button Usage

**User Story:** Sebagai developer, saya ingin semua tombol di aplikasi menggunakan komponen `Button` kustom untuk memastikan konsistensi gaya, ukuran, dan skema warna sesuai tema utama.

#### Acceptance Criteria

1.  WHEN refactoring is complete THEN semua impor `Button` dari `@chakra-ui/react` di file-file berikut SHALL diganti dengan impor dari `~/components/common/Button`:
    - `src/app/page.tsx`
    - `src/components/result/ActionButtons.tsx`
    - `src/components/result/FooterNavigation.tsx`
    - `src/components/result/ShareButtons.tsx`
2.  WHEN refactoring is complete THEN tombol-tombol di dalam state error pada komponen `ResultClient.tsx` yang baru juga SHALL menggunakan `Button` kustom.
3.  WHEN `Button` kustom digunakan THEN properti seperti `colorScheme`, `variant`, dan `bg` yang di-override pada setiap pemanggilan SHALL tetap berfungsi seperti yang diharapkan.
4.  WHEN `Button` utama di `app/page.tsx` dirender THEN `Button` tersebut SHALL menggunakan `primaryColor` (`#8F6E56`) sebagai warna latar belakangnya, baik melalui props default dari `Button.tsx` atau override langsung.

---

*This document will serve as the single source of truth for this refactoring task. Once approved, the Agent will use these criteria to perform the code modifications.*

