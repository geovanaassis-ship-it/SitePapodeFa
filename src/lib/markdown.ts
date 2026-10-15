/**
 * Conversor minimalista de um "mini-markdown" para HTML, pensado para que a
 * equipe edite textos ricos no painel administrativo sem precisar escrever
 * HTML nem instalar um editor WYSIWYG pesado.
 *
 * Sintaxe suportada:
 *   ## Subtítulo          -> <h2>
 *   ### Subtítulo menor   -> <h3>
 *   > Citação             -> <blockquote>
 *   - item                -> <ul><li>
 *   **negrito**, *itálico*, [texto](url)
 *   parágrafos separados por linha em branco
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function inlineFormat(text: string): string {
  let html = escapeHtml(text);
  html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");
  return html;
}

export function simpleMarkdownToHtml(source: string | null | undefined): string {
  if (!source) return "";
  const lines = source.replace(/\r\n/g, "\n").split("\n");

  const blocks: string[] = [];
  let paragraphLines: string[] = [];
  let listItems: string[] = [];
  let quoteLines: string[] = [];

  function flushParagraph() {
    if (paragraphLines.length > 0) {
      blocks.push(`<p>${paragraphLines.map(inlineFormat).join("<br />")}</p>`);
      paragraphLines = [];
    }
  }
  function flushList() {
    if (listItems.length > 0) {
      blocks.push(`<ul>${listItems.map((i) => `<li>${inlineFormat(i)}</li>`).join("")}</ul>`);
      listItems = [];
    }
  }
  function flushQuote() {
    if (quoteLines.length > 0) {
      blocks.push(`<blockquote>${quoteLines.map(inlineFormat).join("<br />")}</blockquote>`);
      quoteLines = [];
    }
  }
  function flushAll() {
    flushParagraph();
    flushList();
    flushQuote();
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.trim() === "") {
      flushAll();
      continue;
    }

    if (line.startsWith("### ")) {
      flushAll();
      blocks.push(`<h3>${inlineFormat(line.slice(4))}</h3>`);
      continue;
    }

    if (line.startsWith("## ")) {
      flushAll();
      blocks.push(`<h2>${inlineFormat(line.slice(3))}</h2>`);
      continue;
    }

    if (line.startsWith("> ")) {
      flushParagraph();
      flushList();
      quoteLines.push(line.slice(2));
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      flushParagraph();
      flushQuote();
      listItems.push(line.slice(2));
      continue;
    }

    flushList();
    flushQuote();
    paragraphLines.push(line);
  }

  flushAll();

  return blocks.join("\n");
}
