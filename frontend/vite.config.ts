import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Listen on all addresses
    port: 5174,
    strictPort: true,
    hmr: {
      clientPort: 5174,
      port: 5174,
    },
  },
});