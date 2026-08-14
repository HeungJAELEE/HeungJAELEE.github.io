(() => {
  const encoded = window.PORTFOLIO_REVISED_MD_B64;
  const registry = window.PRESERVED_PROJECT_CONTENT;
  if (window.PORTFOLIO_REVISED_CONTENT_KO && registry) {
    window.PORTFOLIO_REVISED_SYNC_REPORT = {
      mode: "exact-revised-markdown",
      projectCount: Object.keys(window.PORTFOLIO_REVISED_CONTENT_KO).length,
      hiddenElements: 0
    };
    return;
  }
  if (!encoded || !registry) {
    console.error("[portfolio revised sync] source data was not found");
    return;
  }

  const markdown = new TextDecoder().decode(
    Uint8Array.from(atob(encoded), (character) => character.charCodeAt(0))
  );

  const stripMarkup = (value) => value
    .trim()
    .replace(/^[-*+]\s+/, "")
    .replace(/\*\*/g, "")
    .replace(/`/g, "");

  const sections = {};
  let current = null;
  markdown.split(/\r?\n/).forEach((line) => {
    const heading = line.match(/^##\s+\d+\.\s+(.+)$/);
    if (heading) {
      current = { title: heading[1], lines: [], id: null };
      return;
    }
    if (!current) return;
    const route = line.match(/`#([^`]+)`/);
    if (route) {
      current.id = route[1];
      sections[current.id] = current;
      return;
    }
    current.lines.push(line);
  });

  const cleanSectionLines = (section) => {
    let lines = section.lines.slice();
    const pageIndex = lines.findIndex((line) => line.trim() === "PAGE INDEX");
    if (pageIndex >= 0) lines = lines.slice(0, pageIndex);
    while (lines.length && !lines[0].trim()) lines.shift();
    if (lines.length) lines.shift();
    while (lines.length && !lines[0].trim()) lines.shift();
    return lines;
  };

  const takeNonBlank = (state) => {
    while (state.index < state.lines.length && !state.lines[state.index].trim()) {
      state.index += 1;
    }
    const value = state.lines[state.index] ?? "";
    state.index += 1;
    return stripMarkup(value);
  };

  const parseTable = (lines, start) => {
    const header = lines[start].split("\t").map(stripMarkup);
    const columnCount = header.length;
    const rows = [];
    let index = start + 1;

    while (index < lines.length) {
      while (index < lines.length && !lines[index].trim()) index += 1;
      if (index >= lines.length || !lines[index].includes("\t")) break;

      const cells = [];
      let currentCell = [];
      let rowFinished = false;

      while (index < lines.length && !rowFinished) {
        const raw = lines[index];
        const nextRaw = lines[index + 1] ?? "";
        const nextStartsTable = nextRaw.includes("\t") && nextRaw.split("\t").length >= 3;
        if (
          cells.length === columnCount - 1
          && currentCell.length
          && !raw.includes("\t")
          && nextStartsTable
        ) {
          cells.push(currentCell.join("\n"));
          currentCell = [];
          rowFinished = true;
          break;
        }
        if (!raw.trim() && !raw.includes("\t")) {
          cells.push(currentCell.join("\n"));
          currentCell = [];
          index += 1;
          rowFinished = true;
          break;
        }

        const parts = raw.split("\t");
        parts.forEach((part, partIndex) => {
          const clean = stripMarkup(part);
          if (clean) currentCell.push(clean);
          if (partIndex < parts.length - 1) {
            cells.push(currentCell.join("\n"));
            currentCell = [];
          }
        });
        index += 1;

        if (parts.length >= columnCount && !raw.endsWith("\t")) {
          cells.push(currentCell.join("\n"));
          currentCell = [];
          rowFinished = true;
        }
      }

      if (currentCell.length || cells.length < columnCount) {
        cells.push(currentCell.join("\n"));
      }
      while (cells.length < columnCount) cells.push("");
      rows.push(cells.slice(0, columnCount));

      if (rowFinished && index < lines.length && !lines[index].includes("\t")) {
        break;
      }

      let lookahead = index;
      while (lookahead < lines.length && !lines[lookahead].trim()) lookahead += 1;
      if (lookahead >= lines.length || !lines[lookahead].includes("\t")) {
        index = lookahead;
        break;
      }
      index = lookahead;
    }

    return { token: { type: "table", header, rows }, nextIndex: index };
  };

  const parseBodyTokens = (lines, start) => {
    const tokens = [];
    let index = start;
    while (index < lines.length) {
      const raw = lines[index];
      const trimmed = raw.trim();
      if (!trimmed || trimmed === "---") {
        index += 1;
        continue;
      }
      if (raw.includes("\t") && raw.split("\t").length >= 3) {
        const parsed = parseTable(lines, index);
        tokens.push(parsed.token);
        index = parsed.nextIndex;
        continue;
      }
      tokens.push({
        type: "text",
        value: stripMarkup(raw),
        bullet: /^[-*+]\s+/.test(trimmed)
      });
      index += 1;
    }
    return tokens;
  };

  const setText = (element, value) => {
    if (!element) return;
    element.hidden = false;
    const link = element.tagName === "A" ? element : element.querySelector?.("a[href]");
    if (link) {
      link.textContent = value;
      [...element.childNodes].forEach((node) => {
        if (node !== link && !node.contains?.(link)) node.remove();
      });
      return;
    }
    element.textContent = value;
  };

  const appendCellLines = (document, cell, value) => {
    const parts = String(value ?? "").split("\n");
    parts.forEach((part, index) => {
      if (index) cell.appendChild(document.createElement("br"));
      cell.appendChild(document.createTextNode(part));
    });
  };

  const replaceTable = (document, table, token) => {
    table.hidden = false;
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    token.header.forEach((value) => {
      const cell = document.createElement("th");
      appendCellLines(document, cell, value);
      headerRow.appendChild(cell);
    });
    thead.appendChild(headerRow);
    const tbody = document.createElement("tbody");
    token.rows.forEach((values) => {
      const row = document.createElement("tr");
      values.forEach((value) => {
        const cell = document.createElement("td");
        appendCellLines(document, cell, value);
        row.appendChild(cell);
      });
      tbody.appendChild(row);
    });
    table.replaceChildren(thead, tbody);
  };

  const collectUnits = (content) => {
    const units = [];
    const textTags = new Set(["H1", "H2", "H3", "H4", "H5", "H6", "P", "DT", "DD"]);
    const skipTags = new Set(["STYLE", "SCRIPT", "SVG", "IMG", "VIDEO", "CANVAS", "BR"]);

    const walk = (element) => {
      if (!element || skipTags.has(element.tagName)) return;
      if (element.matches?.(".mermaid")) return;
      if (element.tagName === "TABLE") {
        units.push({ type: "table", element });
        return;
      }
      if (textTags.has(element.tagName)) {
        units.push({ type: "text", element, value: element.textContent.trim() });
        return;
      }
      if (element.tagName === "LI") {
        if (element.querySelector(".portfolio-logic-rail__index")) {
          [...element.children].forEach(walk);
        } else {
          units.push({ type: "text", element, value: element.textContent.trim() });
        }
        return;
      }
      if (element.tagName === "FIGCAPTION") {
        const children = [...element.children].filter((child) => child.textContent.trim());
        if (children.length > 1) children.forEach(walk);
        else units.push({ type: "text", element, value: element.textContent.trim() });
        return;
      }
      if (!element.children.length) {
        const value = element.textContent.trim();
        if (value) units.push({ type: "text", element, value });
        return;
      }
      [...element.children].forEach(walk);
    };

    [...content.children].forEach(walk);
    return units;
  };

  const normalize = (value) => String(value ?? "")
    .toLocaleLowerCase("ko")
    .replace(/[\p{P}\p{S}\s]/gu, "");

  const bigrams = (value) => {
    const clean = normalize(value);
    if (clean.length < 2) return clean ? [clean] : [];
    const result = [];
    for (let index = 0; index < clean.length - 1; index += 1) {
      result.push(clean.slice(index, index + 2));
    }
    return result;
  };

  const dice = (left, right) => {
    const a = bigrams(left);
    const b = bigrams(right);
    if (!a.length || !b.length) return 0;
    const counts = new Map();
    a.forEach((item) => counts.set(item, (counts.get(item) ?? 0) + 1));
    let overlap = 0;
    b.forEach((item) => {
      const count = counts.get(item) ?? 0;
      if (count > 0) {
        overlap += 1;
        counts.set(item, count - 1);
      }
    });
    return (2 * overlap) / (a.length + b.length);
  };

  const tokenText = (token) => token.type === "table"
    ? token.header.join(" ")
    : token.value;

  const unitText = (unit) => unit.type === "table"
    ? [...unit.element.querySelectorAll("th")].map((cell) => cell.textContent).join(" ")
    : unit.value;

  const headingLike = (value) => {
    const text = value.trim();
    if (/^\d{2}$/.test(text)) return false;
    if (text.length > 64 || /[.!?。]$/.test(text)) return false;
    return true;
  };

  const matchScore = (token, unit) => {
    if (token.type !== unit.type) return -Infinity;
    const similarity = dice(tokenText(token), unitText(unit));
    let score = similarity * 5 - 0.35;
    if (token.type === "table") score += 1.2;
    if (token.type === "text") {
      const isHeading = /^H[1-6]$/.test(unit.element.tagName);
      if (isHeading === headingLike(token.value)) score += 0.25;
      if (/^\d{2}$/.test(token.value) && /^\d{2}$/.test(unit.value.trim())) score += 2;
      if (/^[A-Z][A-Z\s&/·-]+$/.test(token.value) && /^[A-Z][A-Z\s&/·-]+$/.test(unit.value.trim())) score += 1;
    }
    return score;
  };

  const align = (tokens, units) => {
    const rows = tokens.length + 1;
    const columns = units.length + 1;
    const scores = Array.from({ length: rows }, () => new Float64Array(columns));
    const steps = Array.from({ length: rows }, () => new Uint8Array(columns));
    const insertPenalty = -0.62;
    const deletePenalty = -0.52;

    for (let row = 1; row < rows; row += 1) {
      scores[row][0] = scores[row - 1][0] + insertPenalty;
      steps[row][0] = 2;
    }
    for (let column = 1; column < columns; column += 1) {
      scores[0][column] = scores[0][column - 1] + deletePenalty;
      steps[0][column] = 3;
    }

    for (let row = 1; row < rows; row += 1) {
      for (let column = 1; column < columns; column += 1) {
        const matched = scores[row - 1][column - 1] + matchScore(tokens[row - 1], units[column - 1]);
        const inserted = scores[row - 1][column] + insertPenalty;
        const deleted = scores[row][column - 1] + deletePenalty;
        if (matched >= inserted && matched >= deleted) {
          scores[row][column] = matched;
          steps[row][column] = 1;
        } else if (inserted >= deleted) {
          scores[row][column] = inserted;
          steps[row][column] = 2;
        } else {
          scores[row][column] = deleted;
          steps[row][column] = 3;
        }
      }
    }

    const operations = [];
    let row = tokens.length;
    let column = units.length;
    while (row > 0 || column > 0) {
      const step = steps[row][column];
      if (step === 1) {
        operations.push({ type: "match", tokenIndex: row - 1, unitIndex: column - 1 });
        row -= 1;
        column -= 1;
      } else if (step === 2) {
        operations.push({ type: "insert", tokenIndex: row - 1 });
        row -= 1;
      } else {
        operations.push({ type: "delete", unitIndex: column - 1 });
        column -= 1;
      }
    }
    return operations.reverse();
  };

  const directBlock = (content, element) => {
    let node = element;
    while (node?.parentElement && node.parentElement !== content) node = node.parentElement;
    return node?.parentElement === content ? node : null;
  };

  const createTextBlock = (document, token, nextToken) => {
    if (token.bullet) {
      const list = document.createElement("ul");
      const item = document.createElement("li");
      item.textContent = token.value;
      list.appendChild(item);
      list.dataset.revisedInserted = "true";
      return list;
    }
    const value = token.value;
    const nextIsLong = nextToken?.type === "text" && nextToken.value.length > 72;
    const tag = headingLike(value) && nextIsLong ? "h2" : "p";
    const element = document.createElement(tag);
    element.textContent = value;
    element.dataset.revisedInserted = "true";
    return element;
  };

  const createTableBlock = (document, token) => {
    const table = document.createElement("table");
    table.dataset.revisedInserted = "true";
    replaceTable(document, table, token);
    return table;
  };

  const applyBody = (document, content, tokens) => {
    const units = collectUnits(content);
    const operations = align(tokens, units);
    const nextMatchedBlock = new Array(operations.length).fill(null);
    let nextBlock = null;
    for (let index = operations.length - 1; index >= 0; index -= 1) {
      nextMatchedBlock[index] = nextBlock;
      const operation = operations[index];
      if (operation.type === "match") {
        nextBlock = directBlock(content, units[operation.unitIndex].element);
      }
    }

    let lastBlock = null;
    let inserted = 0;
    let matched = 0;
    let deleted = 0;

    operations.forEach((operation, operationIndex) => {
      if (operation.type === "match") {
        const token = tokens[operation.tokenIndex];
        const unit = units[operation.unitIndex];
        if (token.type === "table") replaceTable(document, unit.element, token);
        else setText(unit.element, token.value);
        lastBlock = directBlock(content, unit.element) ?? lastBlock;
        matched += 1;
        return;
      }
      if (operation.type === "delete") {
        units[operation.unitIndex].element.hidden = true;
        deleted += 1;
        return;
      }

      const token = tokens[operation.tokenIndex];
      const block = token.type === "table"
        ? createTableBlock(document, token)
        : createTextBlock(document, token, tokens[operation.tokenIndex + 1]);
      const before = nextMatchedBlock[operationIndex];
      if (before?.parentElement === content) content.insertBefore(block, before);
      else if (lastBlock?.parentElement === content) lastBlock.after(block);
      else content.prepend(block);
      lastBlock = block;
      inserted += 1;
    });

    [...content.children].forEach((child) => {
      if (child.dataset.revisedInserted === "true") return;
      if (child.querySelector("img, video, canvas, svg, .mermaid")) return;
      const childUnits = units.filter((unit) => child === unit.element || child.contains(unit.element));
      if (childUnits.length && childUnits.every((unit) => unit.element.hidden)) child.hidden = true;
    });

    return { tokenCount: tokens.length, unitCount: units.length, matched, inserted, deleted };
  };

  const applyHeader = (article, state, section) => {
    const intro = [];
    while (state.index < state.lines.length) {
      const value = takeNonBlank(state);
      if (value === "프로젝트 기간") break;
      intro.push(value);
    }
    const title = intro.length >= 4 ? intro[2] : section.title;
    const lead = intro.length >= 4 ? intro[3] : intro[2];
    setText(article.querySelector(".portfolio-article__eyebrow"), intro[0]);
    setText(article.querySelector(".portfolio-article__stage"), intro[1]);
    setText(article.querySelector(".portfolio-article__header h1"), title);
    setText(article.querySelector(".portfolio-article__lead"), lead);

    const values = ["프로젝트 기간", ...Array.from({ length: 12 }, () => takeNonBlank(state))];

    const metaTerms = article.querySelectorAll(".portfolio-case-meta dt");
    const metaValues = article.querySelectorAll(".portfolio-case-meta dd");
    [0, 2, 4].forEach((valueIndex, index) => setText(metaTerms[index], values[valueIndex]));
    [1, 3, 5].forEach((valueIndex, index) => setText(metaValues[index], values[valueIndex]));

    setText(article.querySelector(".portfolio-case-summary h2"), values[6]);
    const summaryTerms = article.querySelectorAll(".portfolio-case-summary dt");
    const summaryValues = article.querySelectorAll(".portfolio-case-summary dd");
    [7, 9, 11].forEach((valueIndex, index) => setText(summaryTerms[index], values[valueIndex]));
    [8, 10, 12].forEach((valueIndex, index) => setText(summaryValues[index], values[valueIndex]));

    const metrics = article.querySelectorAll(".portfolio-case-metrics > div");
    metrics.forEach((metric) => {
      setText(metric.querySelector("span"), takeNonBlank(state));
      setText(metric.querySelector("strong"), takeNonBlank(state));
    });
    const caption = article.querySelector(".portfolio-case-visual figcaption");
    if (caption) setText(caption, takeNonBlank(state));

    return [intro[0], intro[1], title, lead];
  };

  const skipped = new Set(["home", "gallery", "battery-2170-pilot", "battery-tabless-concept"]);
  const report = { applied: {}, skipped: {}, missing: {} };

  Object.entries(sections).forEach(([id, section]) => {
    if (skipped.has(id)) {
      report.skipped[id] = id === "battery-tabless-concept" ? "source section missing" : "handled elsewhere";
      return;
    }
    const project = registry[id];
    if (!project?.html) {
      report.missing[id] = "project html missing";
      return;
    }

    const document = new DOMParser().parseFromString(project.html, "text/html");
    const article = document.querySelector("article.portfolio-article");
    const content = article?.querySelector("#post-content");
    if (!article || !content) {
      report.missing[id] = "article structure missing";
      return;
    }

    const state = { lines: cleanSectionLines(section), index: 0 };
    const header = applyHeader(article, state, section);
    const tokens = parseBodyTokens(state.lines, state.index);
    const bodyReport = applyBody(document, content, tokens);
    project.title = header[2];
    project.html = article.outerHTML;
    report.applied[id] = bodyReport;
  });

  window.PORTFOLIO_REVISED_SYNC_REPORT = report;
})();
