import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src", // Alias for your source directory
      buffer: "buffer", // Use the `buffer` package as a polyfill
    },
  },
  define: {
    global: "window", // Provide the global `window` object as a polyfill
  },
  optimizeDeps: {
    esbuildOptions: {
      // Polyfill Node.js globals like `Buffer` and `process`
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
});
