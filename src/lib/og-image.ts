import { Resvg, initWasm } from "@resvg/resvg-wasm";
import resvgWasm from "@resvg/resvg-wasm/index_bg.wasm?url";

import { renderOgSvg } from "./og";

type OgPngOptions = Parameters<typeof renderOgSvg>[0];

let wasmReady: Promise<void> | undefined;

async function ensureWasm() {
  if (!wasmReady) {
    wasmReady = initWasm(fetch(resvgWasm).then((response) => response.arrayBuffer()));
  }

  await wasmReady;
}

export async function renderOgPng(options: OgPngOptions) {
  await ensureWasm();
  const svg = renderOgSvg(options);
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 1200,
    },
  });

  return resvg.render().asPng();
}
