interface ImportMetaEnv {
  // A variável do seu backend:
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}