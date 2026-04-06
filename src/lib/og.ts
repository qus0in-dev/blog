import { SITE_AUTHOR, SITE_NAME, SITE_URL } from "../consts/site";

type OgSvgOptions = {
  title: string;
  description: string;
  eyebrow?: string;
  path?: string;
};

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function truncate(value: string, limit: number) {
  return value.length > limit ? `${value.slice(0, limit - 1)}…` : value;
}

export function renderOgSvg({
  title,
  description,
  eyebrow = SITE_NAME,
  path = SITE_URL,
}: OgSvgOptions) {
  const safeTitle = escapeXml(truncate(title, 88));
  const safeDescription = escapeXml(truncate(description, 140));
  const safeEyebrow = escapeXml(eyebrow);
  const safePath = escapeXml(path);

  return `
    <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#F7F5EF"/>
      <rect x="32" y="32" width="1136" height="566" rx="28" fill="#FCFBF7" stroke="#D8D1C4"/>
      <rect x="64" y="64" width="1072" height="502" rx="20" fill="url(#grid)"/>
      <text x="92" y="122" fill="#5F5A52" font-size="24" font-family="Arial, sans-serif" letter-spacing="2">${safeEyebrow}</text>
      <foreignObject x="92" y="156" width="1016" height="228">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Arial, sans-serif; font-size: 64px; line-height: 1.05; font-weight: 700; color: #111111; letter-spacing: -0.04em;">
          ${safeTitle}
        </div>
      </foreignObject>
      <foreignObject x="92" y="408" width="860" height="100">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Arial, sans-serif; font-size: 28px; line-height: 1.45; color: #5F5A52;">
          ${safeDescription}
        </div>
      </foreignObject>
      <text x="92" y="548" fill="#5F5A52" font-size="22" font-family="Arial, sans-serif">${escapeXml(
        SITE_AUTHOR
      )}</text>
      <text x="1108" y="548" text-anchor="end" fill="#5F5A52" font-size="22" font-family="Arial, sans-serif">${safePath}</text>
      <defs>
        <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#EEE8DC" stroke-width="1"/>
        </pattern>
      </defs>
    </svg>
  `.trim();
}
