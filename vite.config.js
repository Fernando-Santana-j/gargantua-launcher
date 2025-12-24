import { defineConfig } from "vite";


export default defineConfig({
  root: "src",        // 👈 frontend fica no src
  server: {
    port: 5173,
    strictPort: true
  },
  build: {
    outDir: "../dist", // saída fora do src
    emptyOutDir: true
  }
});
