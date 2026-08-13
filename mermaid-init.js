import mermaid from "./vendor/mermaid/mermaid.esm.min.mjs";

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "strict",
  theme: "base",
  themeVariables: {
    primaryColor: "#eaf0f4",
    primaryTextColor: "#1c232c",
    primaryBorderColor: "#2b5c8a",
    lineColor: "#5b6470",
    secondaryColor: "#edf4ef",
    tertiaryColor: "#fbfcfb",
    fontFamily: "Pretendard, Noto Sans KR, sans-serif"
  },
  flowchart: {
    curve: "linear",
    htmlLabels: true,
    useMaxWidth: true
  }
});

let rendering = false;

async function renderDiagrams() {
  if (rendering) return;
  const nodes = [...document.querySelectorAll(".mermaid:not([data-processed='true'])")];
  if (!nodes.length) return;

  rendering = true;
  try {
    await mermaid.run({ nodes, suppressErrors: false });
  } catch (error) {
    console.error("Mermaid rendering failed", error);
  } finally {
    rendering = false;
  }
}

window.addEventListener("portfolio:content-rendered", renderDiagrams);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderDiagrams, { once: true });
} else {
  renderDiagrams();
}
