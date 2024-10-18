// vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  // Add other custom environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
