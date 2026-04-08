import { mkdir, readdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const draftDir = path.join(rootDir, "src/content/draft");
const publishedDir = path.join(rootDir, "src/content/published");

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

function getKstParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = Object.fromEntries(
    formatter
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value])
  );

  return {
    year: parts.year,
    month: parts.month,
    iso: `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}+09:00`,
  };
}

function replaceOrInsertPubDate(source, pubDate) {
  const frontmatterMatch = source.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    throw new Error("frontmatter is required");
  }

  const frontmatter = frontmatterMatch[1]
    .replace(/^\s*draft:\s*.+\n?/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd();
  const nextFrontmatter = /^pubDate:\s*.+$/m.test(frontmatter)
    ? frontmatter.replace(/^pubDate:\s*.+$/m, `pubDate: ${pubDate}`)
    : `${frontmatter}\npubDate: ${pubDate}`;

  return source.replace(frontmatterMatch[0], `---\n${nextFrontmatter}\n---`);
}

async function pathExists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

const draftFiles = await walkMarkdownFiles(draftDir).catch((error) => {
  if (error.code === "ENOENT") {
    return [];
  }

  throw error;
});

if (draftFiles.length === 0) {
  console.log("No draft posts found in src/content/draft.");
  process.exit(0);
}

const kstNow = getKstParts();
const sortedDraftFiles = [...draftFiles].sort((left, right) =>
  left.localeCompare(right, "en")
);

for (const filePath of sortedDraftFiles) {
  const source = await readFile(filePath, "utf8");
  const nextSource = replaceOrInsertPubDate(source, kstNow.iso);
  await writeFile(filePath, nextSource);

  const destinationPath = path.join(
    publishedDir,
    kstNow.year,
    kstNow.month,
    path.basename(filePath)
  );

  if (await pathExists(destinationPath)) {
    console.error(`Publish aborted: ${path.relative(rootDir, destinationPath)} already exists.`);
    process.exitCode = 1;
    continue;
  }

  await mkdir(path.dirname(destinationPath), { recursive: true });
  await rename(filePath, destinationPath);
  console.log(`Published: ${path.relative(rootDir, destinationPath)}`);
}

if (process.exitCode) {
  process.exit(process.exitCode);
}
