(function (global) {
  const PAGE = {
    width: 595.28,
    height: 841.89,
    marginX: 46,
    marginTop: 48,
    marginBottom: 48,
  };

  const COLORS = {
    text: '#1C1917',
    body: '#3D3530',
    muted: '#6F6660',
    brand: '#C06440',
    border: '#E5DFD8',
  };

  const DEFAULT_PROFILE = {
    name: 'Rongjun Ye',
    title: 'Undergraduate Student - Data Science & Analytics',
    affiliation: 'The Hong Kong Polytechnic University',
    contact: [
      'rongjun.ye@connect.polyu.hk',
    ],
    links: [
      'github.com/ericyerongjun',
      'linkedin.com/in/rongjun-ye-814453331',
      'kaggle.com/rongjunye',
      'scholar.google.com/citations?user=_vqwyT8AAAAJ',
    ],
  };

  const CONTENT_WIDTH = PAGE.width - PAGE.marginX * 2;
  let activePreviewUrl = null;

  function normalizeText(value) {
    return String(value == null ? '' : value)
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2013\u2014]/g, '-')
      .replace(/\u00B7/g, '-')
      .replace(/\u00A0/g, ' ')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\x20-\x7E]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function escapePdfString(value) {
    return normalizeText(value)
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)');
  }

  function rgb(hex) {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.slice(0, 2), 16) / 255;
    const g = parseInt(clean.slice(2, 4), 16) / 255;
    const b = parseInt(clean.slice(4, 6), 16) / 255;
    return `${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)}`;
  }

  function charWidth(ch) {
    if (ch === ' ') return 260;
    if ("ilI.,'`|!:;".includes(ch)) return 250;
    if ('mwMW@%&'.includes(ch)) return 850;
    if ('ABCDEFGHJKLMNOPQRSTUVWXYZ'.includes(ch)) return 650;
    if ('0123456789'.includes(ch)) return 540;
    if ('-/()[]{}'.includes(ch)) return 360;
    return 500;
  }

  function textWidth(text, size) {
    return [...normalizeText(text)].reduce((total, ch) => total + charWidth(ch), 0) * size / 1000;
  }

  function splitLongWord(word, maxWidth, size) {
    const pieces = [];
    let piece = '';

    [...word].forEach(ch => {
      const next = piece + ch;
      if (piece && textWidth(next, size) > maxWidth) {
        pieces.push(piece);
        piece = ch;
      } else {
        piece = next;
      }
    });

    if (piece) pieces.push(piece);
    return pieces;
  }

  function wrapText(text, maxWidth, size) {
    const words = normalizeText(text).split(/\s+/).filter(Boolean);
    const lines = [];
    let line = '';

    words.forEach(word => {
      const candidate = line ? `${line} ${word}` : word;
      if (textWidth(candidate, size) <= maxWidth) {
        line = candidate;
        return;
      }

      if (line) {
        lines.push(line);
        line = '';
      }

      if (textWidth(word, size) > maxWidth) {
        const pieces = splitLongWord(word, maxWidth, size);
        lines.push(...pieces.slice(0, -1));
        line = pieces[pieces.length - 1] || '';
      } else {
        line = word;
      }
    });

    if (line) lines.push(line);
    return lines.length ? lines : [''];
  }

  function createRenderer() {
    const pages = [];
    let page = null;
    let y = PAGE.marginTop;

    function newPage() {
      page = { ops: [] };
      pages.push(page);
      y = PAGE.marginTop;
    }

    function pdfY(topY) {
      return PAGE.height - topY;
    }

    function ensureSpace(height) {
      if (y + height > PAGE.height - PAGE.marginBottom) {
        newPage();
      }
    }

    function text(value, x, baselineY, options) {
      const opts = Object.assign({
        font: 'F1',
        size: 10,
        color: COLORS.body,
      }, options);

      page.ops.push(
        `${rgb(opts.color)} rg BT /${opts.font} ${opts.size.toFixed(2)} Tf 1 0 0 1 ${x.toFixed(2)} ${pdfY(baselineY).toFixed(2)} Tm (${escapePdfString(value)}) Tj ET`
      );
    }

    function line(x1, y1, x2, y2, options) {
      const opts = Object.assign({
        color: COLORS.border,
        width: 0.8,
      }, options);

      page.ops.push(
        `${rgb(opts.color)} RG ${opts.width.toFixed(2)} w ${x1.toFixed(2)} ${pdfY(y1).toFixed(2)} m ${x2.toFixed(2)} ${pdfY(y2).toFixed(2)} l S`
      );
    }

    function addFooter() {
      pages.forEach((footerPage, index) => {
        page = footerPage;
        text(`Rongjun Ye CV | ${index + 1}`, PAGE.marginX, PAGE.height - 24, {
          size: 8,
          color: COLORS.muted,
        });
      });
      page = pages[pages.length - 1];
    }

    newPage();

    return {
      get y() { return y; },
      set y(value) { y = value; },
      pages,
      ensureSpace,
      text,
      line,
      addFooter,
    };
  }

  function detail(text, options) {
    return Object.assign({
      text,
      size: 9.2,
      lineHeight: 11.5,
      font: 'F1',
      color: COLORS.muted,
      indent: 0,
    }, options);
  }

  function prepareEntry(entry) {
    const titleSize = 10.8;
    const dateSize = 8.8;
    const dateWidth = entry.date ? textWidth(entry.date, dateSize) : 0;
    const titleMaxWidth = dateWidth ? CONTENT_WIDTH - dateWidth - 16 : CONTENT_WIDTH;
    const titleLines = wrapText(entry.title, titleMaxWidth, titleSize);
    const details = (entry.details || []).map(item => {
      const normalized = typeof item === 'string' ? detail(item) : detail(item.text, item);
      return Object.assign(normalized, {
        lines: wrapText(normalized.text, CONTENT_WIDTH - normalized.indent, normalized.size),
      });
    });
    const bullets = (entry.bullets || []).map(item => ({
      lines: wrapText(item, CONTENT_WIDTH - 18, 8.8),
    }));
    const height = (titleLines.length * 12.8)
      + details.reduce((sum, item) => sum + item.lines.length * item.lineHeight, 0)
      + bullets.reduce((sum, item) => sum + item.lines.length * 10.8, 0)
      + 10;

    return { titleLines, details, bullets, height, dateWidth, titleSize, dateSize };
  }

  function drawEntry(renderer, entry) {
    const prepared = prepareEntry(entry);
    renderer.ensureSpace(prepared.height);

    const startY = renderer.y;
    prepared.titleLines.forEach((line, index) => {
      renderer.text(line, PAGE.marginX, renderer.y, {
        font: 'F2',
        size: prepared.titleSize,
        color: COLORS.text,
      });

      if (index === 0 && entry.date) {
        renderer.text(entry.date, PAGE.width - PAGE.marginX - prepared.dateWidth, startY, {
          size: prepared.dateSize,
          color: COLORS.muted,
        });
      }

      renderer.y += 12.8;
    });

    prepared.details.forEach(item => {
      item.lines.forEach(line => {
        renderer.text(line, PAGE.marginX + item.indent, renderer.y, {
          font: item.font,
          size: item.size,
          color: item.color,
        });
        renderer.y += item.lineHeight;
      });
    });

    prepared.bullets.forEach(item => {
      item.lines.forEach((line, index) => {
        renderer.text(index === 0 ? `- ${line}` : line, PAGE.marginX + (index === 0 ? 0 : 12), renderer.y, {
          size: 8.8,
          color: COLORS.body,
        });
        renderer.y += 10.8;
      });
    });

    renderer.y += 8;
  }

  function drawSection(renderer, title) {
    renderer.ensureSpace(34);
    if (renderer.y > PAGE.marginTop + 20) {
      renderer.y += 6;
    }

    renderer.text(normalizeText(title).toUpperCase(), PAGE.marginX, renderer.y, {
      font: 'F2',
      size: 8.8,
      color: COLORS.brand,
    });
    renderer.y += 7;
    renderer.line(PAGE.marginX, renderer.y, PAGE.width - PAGE.marginX, renderer.y);
    renderer.y += 14;
  }

  function drawWrapped(renderer, value, options) {
    const opts = Object.assign({
      x: PAGE.marginX,
      maxWidth: CONTENT_WIDTH,
      size: 9.2,
      lineHeight: 11.5,
      color: COLORS.body,
      font: 'F1',
    }, options);

    wrapText(value, opts.maxWidth, opts.size).forEach(line => {
      renderer.ensureSpace(opts.lineHeight + 4);
      renderer.text(line, opts.x, renderer.y, opts);
      renderer.y += opts.lineHeight;
    });
  }

  function drawHeader(renderer, profile) {
    renderer.text(profile.name, PAGE.marginX, renderer.y, {
      font: 'F2',
      size: 18,
      color: COLORS.text,
    });
    renderer.y += 18;
    renderer.text(profile.title, PAGE.marginX, renderer.y, {
      size: 10.5,
      color: COLORS.body,
    });
    renderer.y += 13;
    renderer.text(profile.affiliation, PAGE.marginX, renderer.y, {
      size: 9.5,
      color: COLORS.muted,
    });
    renderer.y += 14;
    drawWrapped(renderer, profile.contact.join(' | '), {
      size: 8.7,
      lineHeight: 10.5,
      color: COLORS.muted,
    });
    drawWrapped(renderer, profile.links.join(' | '), {
      size: 8.7,
      lineHeight: 10.5,
      color: COLORS.muted,
    });
    renderer.y += 5;
    renderer.line(PAGE.marginX, renderer.y, PAGE.width - PAGE.marginX, renderer.y, {
      color: COLORS.brand,
      width: 1.1,
    });
    renderer.y += 20;
  }

  function renderEducation(renderer, education) {
    if (!education || !education.length) return;

    drawSection(renderer, 'Education');
    education.forEach(item => {
      drawEntry(renderer, {
        title: item.degree,
        date: item.period,
        details: [
          `${item.school}${item.location ? ` - ${item.location}` : ''}`,
          item.gpa ? { text: item.gpa, font: 'F2', color: COLORS.brand } : null,
        ].filter(Boolean),
        bullets: item.notes || [],
      });
    });
  }

  function renderResearch(renderer, research) {
    if (!research || !research.length) return;

    drawSection(renderer, 'Research Experience');
    research.forEach(item => {
      drawEntry(renderer, {
        title: `${item.title} - ${item.lab}`,
        date: item.period,
        details: [
          item.supervisor ? `Supervised by ${item.supervisor}` : null,
          item.mentors ? `Mentored by ${item.mentors}` : null,
        ].filter(Boolean),
        bullets: item.bullets || [],
      });
    });
  }

  function renderWork(renderer, work) {
    if (!work || !work.length) return;

    drawSection(renderer, 'Professional Experience');
    work.forEach(item => {
      drawEntry(renderer, {
        title: item.title,
        date: item.period,
        details: [
          item.company,
          item.note ? { text: item.note, font: 'F3' } : null,
        ].filter(Boolean),
        bullets: item.bullets || [],
      });
    });
  }

  function renderHonors(renderer, honors) {
    if (!honors || !honors.length) return;

    drawSection(renderer, 'Honors & Awards');
    honors.forEach(item => {
      drawEntry(renderer, {
        title: item.award,
        date: item.year,
        details: [
          item.issuer,
          item.badge ? { text: item.badge, font: 'F2', color: COLORS.brand } : null,
        ].filter(Boolean),
      });
    });
  }

  function renderPublications(renderer, publications) {
    if (!publications || !publications.length) return;

    drawSection(renderer, 'Publications');
    publications.forEach(item => {
      drawEntry(renderer, {
        title: item.title,
        details: [
          item.authors ? item.authors.replace(/\*\*/g, '') : null,
          { text: item.venue, font: 'F3', color: COLORS.brand },
          item.badge ? { text: item.badge, font: 'F2', color: COLORS.brand } : null,
          item.desc,
        ].filter(Boolean),
      });
    });
  }

  function renderSkills(renderer, skills) {
    if (!skills || !skills.length) return;

    drawSection(renderer, 'Technical Skills');
    skills.forEach(item => {
      renderer.ensureSpace(34);
      renderer.text(item.category, PAGE.marginX, renderer.y, {
        font: 'F2',
        size: 9.2,
        color: COLORS.text,
      });
      renderer.y += 12;
      drawWrapped(renderer, item.items.join(', '), {
        size: 9,
        lineHeight: 11,
        color: COLORS.body,
      });
      renderer.y += 7;
    });
  }

  function renderLanguages(renderer, languages) {
    if (!languages || !languages.length) return;

    drawSection(renderer, 'Languages');
    drawWrapped(renderer, languages.map(item => `${item.lang} (${item.level})`).join(', '), {
      size: 9.2,
      lineHeight: 11.5,
    });
  }

  function encode(text) {
    if (typeof TextEncoder !== 'undefined') {
      return new TextEncoder().encode(text);
    }

    const bytes = new Uint8Array(text.length);
    for (let i = 0; i < text.length; i += 1) {
      bytes[i] = text.charCodeAt(i) & 0xff;
    }
    return bytes;
  }

  function createPdf(pages) {
    const objects = [
      null,
      '<< /Type /Catalog /Pages 2 0 R >>',
      null,
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>',
      `<< /Title (${escapePdfString('Rongjun Ye CV')}) /Author (${escapePdfString('Rongjun Ye')}) /Creator (${escapePdfString('CVPdfGenerator')}) >>`,
    ];
    const pageKids = [];

    pages.forEach(renderedPage => {
      const content = renderedPage.ops.join('\n');
      const contentId = objects.length;
      objects.push(`<< /Length ${encode(content).length} >>\nstream\n${content}\nendstream`);

      const pageId = objects.length;
      objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE.width.toFixed(2)} ${PAGE.height.toFixed(2)}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> /Contents ${contentId} 0 R >>`);
      pageKids.push(`${pageId} 0 R`);
    });

    objects[2] = `<< /Type /Pages /Kids [${pageKids.join(' ')}] /Count ${pageKids.length} >>`;

    let pdf = '%PDF-1.4\n';
    const offsets = [0];

    for (let id = 1; id < objects.length; id += 1) {
      offsets[id] = encode(pdf).length;
      pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`;
    }

    const xrefOffset = encode(pdf).length;
    pdf += `xref\n0 ${objects.length}\n`;
    pdf += '0000000000 65535 f \n';

    for (let id = 1; id < objects.length; id += 1) {
      pdf += `${String(offsets[id]).padStart(10, '0')} 00000 n \n`;
    }

    pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R /Info 6 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
    return encode(pdf);
  }

  function buildPdf(cv) {
    const renderer = createRenderer();
    const profile = Object.assign({}, DEFAULT_PROFILE, cv.profile || {});

    drawHeader(renderer, profile);
    renderEducation(renderer, cv.education);
    renderResearch(renderer, cv.research);
    renderWork(renderer, cv.work);
    renderHonors(renderer, cv.honors);
    renderPublications(renderer, cv.publications);
    renderSkills(renderer, cv.skills);
    renderLanguages(renderer, cv.languages);
    renderer.addFooter();

    return createPdf(renderer.pages);
  }

  function createBlob(cv) {
    const bytes = buildPdf(cv);
    return new Blob([bytes], { type: 'application/pdf' });
  }

  function openPreview(cv) {
    const previewWindow = global.open('', '_blank');

    if (!previewWindow) {
      throw new Error('The browser blocked the CV PDF preview popup.');
    }

    previewWindow.opener = null;
    previewWindow.document.title = 'Rongjun Ye CV';
    previewWindow.document.body.style.margin = '0';
    previewWindow.document.body.style.fontFamily = 'system-ui, -apple-system, sans-serif';
    previewWindow.document.body.textContent = 'Generating CV PDF...';

    const blob = createBlob(cv);
    if (activePreviewUrl) {
      URL.revokeObjectURL(activePreviewUrl);
    }

    activePreviewUrl = URL.createObjectURL(blob);
    previewWindow.location.href = activePreviewUrl;
  }

  if (global.addEventListener) {
    global.addEventListener('pagehide', () => {
      if (activePreviewUrl) {
        URL.revokeObjectURL(activePreviewUrl);
        activePreviewUrl = null;
      }
    });
  }

  global.CVPdfGenerator = {
    buildPdf,
    createBlob,
    openPreview,
  };
})(typeof window !== 'undefined' ? window : globalThis);
