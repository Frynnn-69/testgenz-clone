# Dokumentasi API (Swagger)

Dokumen ini menjelaskan struktur dan cara penggunaan dokumentasi API otomatis (Swagger UI) di dalam proyek ini.

## 🔗 Akses Dokumentasi

### Development (Lokal)

Buka browser dan akses:
`http://localhost:3000/api/docs`

### Production (Live)

Nantinya akan tersedia di:
`https://example-domain.vercel.app/api/docs`

---

## 📂 Struktur Kode

Dokumentasi ini dibangun menggunakan arsitektur **Server Component** (untuk data) dan **Client Component** (untuk UI).

```text
src/
├── app/
│   └── api/
│       └── docs/
│           └── page.tsx           # [Entry Point] Halaman utama. Mengambil data JSON dan memanggil UI.
│
├── components/
│   └── swagger/
│       ├── SwaggerClient.tsx      # [UI] Komponen tampilan (Wrapper library Swagger UI React).
│       └── swagger-custom.css     # [Style] Kustomisasi tema (CSS).
│
└── lib/
    └── swagger.ts                 # [Logic/Data] Tempat mendefinisikan Endpoint, Schema, dan Info API.
```

---

## 🛠️ Panduan Pengembangan

### 1. Cara Menambah Endpoint Baru

Edit file: **`src/lib/swagger.ts`**

Tambahkan definisi path baru di dalam objek `paths`:

```typescript
paths: {
  "/api/route-baru": {
    get: {
      summary: "Penjelasan singkat",
      tags: ["NamaKategori"],
      responses: { ... }
    }
  }
}
```

### 2. Cara Mengubah Skema Data (Request/Response)

Edit file: **`src/lib/swagger.ts`**

Update bagian `components -> schemas`. Pastikan struktur JSON-nya sesuai dengan tipe data di `src/types/index.ts`.

### 3. Cara Mengubah Tampilan (Warna/Header)

- **Layout/Header:** Edit `src/components/swagger/SwaggerClient.tsx`.
- **Warna/CSS:** Edit `src/components/swagger/swagger-custom.css`.

---
