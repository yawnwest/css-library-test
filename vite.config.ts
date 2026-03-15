import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ command }) => ({
  test: {
    root: ".",
  },
  ...(command === "serve"
    ? {
        root: "playground",
        server: {
          port: 5173,
          strictPort: true,
        },
      }
    : {
        build: {
          lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "YawnwestCssLibraryTest",
            fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
            formats: ["es", "cjs"],
          },
          sourcemap: true,
          cssCodeSplit: false,
          rollupOptions: {
            output: {
              assetFileNames: () => "style.css",
            },
          },
        },
      }),
}));
