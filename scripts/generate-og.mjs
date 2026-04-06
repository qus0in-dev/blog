import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Resvg, initWasm } from "@resvg/resvg-wasm";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const blogDir = path.join(rootDir, "src/content");
const outputDir = path.join(rootDir, "public/og");
const wasmPath = path.join(
  rootDir,
  "node_modules/@resvg/resvg-wasm/index_bg.wasm"
);
const titleFontPath = path.join(rootDir, "public/fonts/Paperlogy-7Bold.ttf");
const bodyFontPath = path.join(rootDir, "public/fonts/Pretendard-Regular.otf");
const uiFontPath = path.join(rootDir, "public/fonts/NotoSansKR-Regular.otf");

const SITE_TITLE = "일년보다 긴 하루";
const SITE_DESCRIPTION = "자랑할 내용들은 없지만 찾아왔다면 환영해요";
const SITE_NAME = SITE_TITLE;
const SITE_AUTHOR = "qus0in";
const SITE_URL = "https://blog.qus0in.dev";
const TITLE_FONT = "Paperlogy";
const BODY_FONT = "Pretendard";
const UI_FONT = "Noto Sans KR";

async function walkMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkMarkdownFiles(fullPath)));
      continue;
    }

    const ext = path.extname(entry.name);
    if ([".md", ".mdx"].includes(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function truncate(value, limit) {
  return value.length > limit ? `${value.slice(0, limit - 1)}…` : value;
}

function wrapText(value, maxCharsPerLine, maxLines) {
  const words = value.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxCharsPerLine) {
      current = next;
      continue;
    }

    if (current) {
      lines.push(current);
    }
    current = word;

    if (lines.length === maxLines - 1) {
      break;
    }
  }

  if (lines.length < maxLines && current) {
    lines.push(current);
  }

  if (lines.length > maxLines) {
    lines.length = maxLines;
  }

  if (words.join(" ").length > lines.join(" ").length) {
    lines[lines.length - 1] = truncate(lines[lines.length - 1], maxCharsPerLine);
  }

  return lines;
}

function renderOgSvg({ title, description, eyebrow = SITE_NAME, pathLabel = SITE_URL }) {
  const titleLines = wrapText(title, 24, 3).map(escapeXml);
  const descriptionLines = wrapText(description, 46, 3).map(escapeXml);
  const safeEyebrow = escapeXml(eyebrow);
  const safePath = escapeXml(pathLabel);
  const titleText = titleLines
    .map(
      (line, index) =>
        `<tspan x="92" dy="${index === 0 ? 0 : 74}">${line}</tspan>`
    )
    .join("");
  const descriptionText = descriptionLines
    .map(
      (line, index) =>
        `<tspan x="92" dy="${index === 0 ? 0 : 34}">${line}</tspan>`
    )
    .join("");

  return `
    <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#F7F5EF"/>
      <rect x="32" y="32" width="1136" height="566" rx="28" fill="#FCFBF7" stroke="#D8D1C4"/>
      <rect x="64" y="64" width="1072" height="502" rx="20" fill="url(#grid)"/>
      <text x="92" y="122" fill="#5F5A52" font-size="24" font-family="${UI_FONT}" letter-spacing="2">${safeEyebrow}</text>
      <text x="92" y="210" fill="#111111" font-size="64" font-weight="700" font-family="${TITLE_FONT}" letter-spacing="-2">
        ${titleText}
      </text>
      <text x="92" y="430" fill="#5F5A52" font-size="28" font-family="${BODY_FONT}">
        ${descriptionText}
      </text>
      <text x="92" y="548" fill="#5F5A52" font-size="22" font-family="${UI_FONT}">${safePath}</text>
      <text x="1108" y="548" text-anchor="end" fill="#5F5A52" font-size="22" font-family="${UI_FONT}">${escapeXml(
        arguments[0].dateLabel ?? ""
      )}</text>
      <defs>
        <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#EEE8DC" stroke-width="1"/>
        </pattern>
      </defs>
    </svg>
  `.trim();
}

function renderOgPng(options) {
  const svg = renderOgSvg(options);
  const resvg = new Resvg(svg, {
    font: {
      fontBuffers: globalThis.__OG_FONT_BUFFERS__,
      defaultFontFamily: UI_FONT,
      sansSerifFamily: UI_FONT,
      loadSystemFonts: false,
    },
    fitTo: {
      mode: "width",
      value: 1200,
    },
  });

  return resvg.render().asPng();
}

function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter = match[1];
  const title = frontmatter.match(/^title:\s*(.+)$/m)?.[1]?.trim();
  const slug = frontmatter.match(/^slug:\s*(.+)$/m)?.[1]?.trim();
  const description = frontmatter.match(/^description:\s*(.+)$/m)?.[1]?.trim();
  const pubDate = frontmatter.match(/^pubDate:\s*(.+)$/m)?.[1]?.trim();
  const draftValue = frontmatter.match(/^draft:\s*(.+)$/m)?.[1]?.trim();

  if (!title || !description) return null;

  return {
    title,
    slug,
    description,
    pubDate,
    draft: draftValue === "true",
  };
}

function formatDateLabel(value) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return value;

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

await initWasm(readFile(wasmPath));

globalThis.__OG_FONT_BUFFERS__ = [
  new Uint8Array(await readFile(titleFontPath)),
  new Uint8Array(await readFile(bodyFontPath)),
  new Uint8Array(await readFile(uiFontPath)),
];

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

const sitePng = renderOgPng({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  eyebrow: "TECHNICAL ARCHIVE",
  pathLabel: SITE_URL,
  dateLabel: "",
});

await writeFile(path.join(outputDir, "site.png"), sitePng);

const entries = await walkMarkdownFiles(blogDir);

for (const fullPath of entries) {
  const ext = path.extname(fullPath);
  const source = await readFile(fullPath, "utf8");
  const parsed = parseFrontmatter(source);

  if (!parsed || parsed.draft) continue;

  const slug = parsed.slug ?? path.basename(fullPath, ext);
  const png = renderOgPng({
    title: parsed.title,
    description: parsed.description,
    eyebrow: SITE_NAME,
    pathLabel: `${SITE_URL}/${slug}/`,
    dateLabel: formatDateLabel(parsed.pubDate),
  });

  await writeFile(path.join(outputDir, `${slug}.png`), png);
}
