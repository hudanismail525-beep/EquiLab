# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## Deploy ke Cloudflare Pages

Proyek ini adalah aplikasi Vite statis. Atur Cloudflare Pages dengan:

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Production branch:** `main` (atau branch yang memang dipilih di pengaturan Pages)
- **Node.js version:** `24.12.0` atau lebih baru

Cloudflare membangun kode dari commit di branch yang terhubung, bukan dari folder lokal. Perubahan baru akan ikut ter-deploy setelah semua file perubahan ditambahkan, di-commit, lalu di-push ke branch tersebut. File yang masih untracked juga harus ditambahkan; jangan hanya mengirim file yang sudah tracked.

Variabel Vite dibaca saat proses build, sehingga `.env.local` di komputer lokal tidak ikut ter-upload. Tambahkan variabel berikut di **Settings → Environment variables** Cloudflare Pages untuk Production dan Preview, lalu jalankan build/deploy baru:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`

Nilainya tersedia di konfigurasi aplikasi web Firebase. Jangan masukkan nilai asli ke Git; `.env.local` memang diabaikan Git. Setelah domain Pages tersedia, tambahkan domain tersebut ke daftar **Authorized domains** Firebase Authentication agar login dapat digunakan dari situs deploy.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
