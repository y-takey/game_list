import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { copyFileSync } from "node:fs";
import { join } from "node:path";

const basename = "/game_list/";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      ssr: false,
      basename,
      buildEnd(args) {
        if (!args.viteConfig.isProduction) return;

        const buildPath = args.viteConfig.build.outDir;
        copyFileSync(join(buildPath, "index.html"), join(buildPath, "404.html"));
      },
    }),
    tsconfigPaths(),
  ],
  base: basename,
  css: {
    postcss: "./postcss.config.js",
  },
});
