// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import mermaid from "astro-mermaid";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.qus0in.dev/",
  integrations: [
    mermaid({
      autoTheme: false,
      enableLog: false,
      mermaidConfig: {
        theme: "base",
        fontFamily: "Noto Sans KR, Pretendard, sans-serif",
        fontSize: 18,
        flowchart: {
          curve: "linear",
          useMaxWidth: true,
          nodeSpacing: 40,
          rankSpacing: 52,
          padding: 20,
        },
        themeVariables: {
          primaryColor: "#F3EEE4",
          primaryTextColor: "#161616",
          primaryBorderColor: "#B5A89A",
          lineColor: "#7B7064",
          secondaryColor: "#E7DFD2",
          tertiaryColor: "#FBF8F2",
          clusterBkg: "#F6F1E8",
          clusterBorder: "#C8BCAE",
          mainBkg: "#F3EEE4",
          nodeBorder: "#B5A89A",
          edgeLabelBackground: "#FBF8F2",
        },
      },
    }),
    mdx(),
    sitemap(),
    react(),
  ],
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
