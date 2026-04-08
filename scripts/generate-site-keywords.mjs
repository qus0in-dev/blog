import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const contentDir = path.join(rootDir, "src/content/published");
const outputPath = path.join(rootDir, "src/consts/site-keywords.generated.js");
const KEYWORD_LIMIT = 10;

async function walkMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walkMarkdownFiles(fullPath)));
      continue;
    }

    if ([".md", ".mdx"].includes(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function getFrontmatter(source) {
  return source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? null;
}

function parseTags(frontmatter) {
  const tagsBlock = frontmatter.match(/^tags:\s*\n((?:[ \t]+-\s*.+\n?)*)/m)?.[1];
  if (!tagsBlock) return [];

  return tagsBlock
    .split("\n")
    .map((line) => line.match(/^[ \t]+-\s*(.+)\s*$/)?.[1]?.trim())
    .filter(Boolean);
}

function toGeneratedModule(keywords) {
  const body = JSON.stringify(keywords, null, 2);
  return `export const SITE_KEYWORDS = ${body};\n`;
}

const files = await walkMarkdownFiles(contentDir);
const tagCounts = new Map();

for (const filePath of files) {
  const source = await readFile(filePath, "utf8");
  const frontmatter = getFrontmatter(source);
  if (!frontmatter) continue;

  for (const tag of parseTags(frontmatter)) {
    tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
  }
}

const keywords = [...tagCounts.entries()]
  .sort((left, right) => {
    if (right[1] !== left[1]) {
      return right[1] - left[1];
    }

    return left[0].localeCompare(right[0], "ko");
  })
  .slice(0, KEYWORD_LIMIT)
  .map(([tag]) => tag);

await writeFile(outputPath, toGeneratedModule(keywords));
