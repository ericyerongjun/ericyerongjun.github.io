/**
 * cv-data.js — Edit this file to update your CV page.
 *
 * Every section is an array of objects.
 * Add, remove, or edit entries freely — the page re-renders automatically.
 * Fields marked "(optional)" can be omitted or set to null / [].
 */

const CV = {

  // ── PROFILE ──────────────────────────────────────────────────────────────
  profile: {
    name:        "RONGJUN YE",
    title:       "Undergraduate Student - Data Science & Analytics",
    affiliation: "The Hong Kong Polytechnic University",
    contact: [
      "yerongjun03@gmail.com",
      "rongjun.ye@connect.polyu.hk",
      "+852 6928 8029",
    ],
    links: [
      "github.com/ericyerongjun",
      "linkedin.com/in/rongjun-ye-814453331",
      "kaggle.com/rongjunye",
    ],
  },

  // ── EDUCATION ────────────────────────────────────────────────────────────
  education: [
    {
      degree:   "Bachelor of Science (Data Science and Analytics)",
      school:   "The Hong Kong Polytechnic University",
      location: "Hong Kong",
      period:   "Aug 2024 – May 2027 (Early Graduation)",
      gpa:      "GPA: 3.73/4.3",
      notes: [
        "Courses relevant to AI: Calculus (A+), Linear Algebra (A+), Programming Fundamentals (A+), Principles of Programming (A+), Further Mathematical Methods (A+), Multivariable Calculus (A), Fundamentals of AI and Data Analytics (A), Introduction to Differential Calculus (A)",
        "Core Coursework: Statistics, Linear Algebra, Multivariable Calculus, Stochastic Processes, Operations Research Methods, Statistical Inference, Statistical Learning, Applied Linear Models, Data Mining, Database Systems, Optimization Methods, Machine Learning, ODE, PDE, Big Data Analytics",
      ],
    },
  ],

  // ── RESEARCH EXPERIENCE ──────────────────────────────────────────────────
  research: [
    {
      title:       "Student Assistant",
      lab:         "The Hong Kong Polytechnic University (PolyU)",
      supervisor:  "Prof. Xiao Huang",
      period:      "Sep 2025 – Present",
      bullets: [
        "Conducting research on graph-based retrieval-augmented generation (Graph RAG) and knowledge graph construction.",
        "Investigating hierarchical data representations and chunking strategies to improve factual consistency in LLM systems.",
        "Contributing to a university-funded research project (K-Cubes) with publication intent targeting top-tier AI conferences.",
        "Built data pipeline to extract noisy archive data from University ITS and connect the pipeline to our research (https://github.com/ericyerongjun/kcpl).",
        "Investigating potential evaluation methods and baseline for research, and exploring energy-based diffusion and energy-based transformers.",
      ],
    },
  ],

  // ── PROFESSIONAL EXPERIENCE ──────────────────────────────────────────────
  work: [
    {
      title:   "Analyst Programmer",
      company: "Hong Kong Monetary Authority (HKMA)",
      period:  "Aug 2025 – Sep 2025",
      note:    "Supervised by Wickson Hui · Resigned to continue study",
      bullets: [
        "Developed low-code, agentic AI systems and internal data-driven automation tools supporting regulatory and analytical workflows with Dify.",
        "Built structured data processing pipelines and RAG-based document retrieval systems to improve knowledge accessibility across departments.",
        "Automated knowledge base workflows and collaborated with cross-functional teams on AI system integration and deployment.",
        "Led internal document knowledge database construction, created the documentation for metadata management and system architecture.",
      ],
    },
  ],

  // ── HONORS & AWARDS ──────────────────────────────────────────────────────
  honors: [
    {
      year:   "2024/25",
      award:  "Dean's Honours List",
      issuer: "The Hong Kong Polytechnic University",
      badge:  "Academic Excellence",
    },
    {
      year:   "2024",
      award:  "Full Entry Scholarship",
      issuer: "The Hong Kong Polytechnic University",
      badge:  "Scholarship",
    },
    {
      year:   "2024",
      award:  "Student Support Scholarship",
      issuer: "The Hong Kong Polytechnic University",
      badge:  "Scholarship",
    },
    {
      year:   "2024",
      award:  "Department of Applied Mathematics Scholar",
      issuer: "Department of Applied Mathematics, The Hong Kong Polytechnic University",
      badge:  "Scholarship",
    },
    {
      year:   "2024",
      award:  "PolyU Scholar",
      issuer: "The Hong Kong Polytechnic University",
      badge:  "Scholarship",
    },
  ],

  // ── PUBLICATIONS ─────────────────────────────────────────────────────────
  publications: [],

  // ── TECHNICAL SKILLS ─────────────────────────────────────────────────────
  skills: [
    {
      category: "Mathematical Foundations",
      items: ["Real Analysis", "Linear Algebra", "Optimization", "Statistical Learning", "High-Dimensional Data Analysis"],
    },
    {
      category: "Programming",
      items: ["PyTorch", "C++", "C", "R", "CUDA"],
    },
    {
      category: "Machine Learning & AI",
      items: ["Statistical Learning", "Deep Learning", "Reinforcement Learning", "Data Mining", "Agent Memory", "Knowledge Graphs", " Neural Networks"],
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "Linux/Unix", "Database Systems", "Server Administration", "Cloud", "Command Lines"],
    },
  ],

  // ── LANGUAGES ────────────────────────────────────────────────────────────
  languages: [
    { lang: "Mandarin",  level: "Native"           },
    { lang: "Cantonese", level: "Native"            },
    { lang: "English",   level: "Highly Proficient" },
  ],

  // ── CV PDF ───────────────────────────────────────────────────────────────
  cvPdfPath: null,              // set to "assets/cv.pdf" once the PDF is uploaded
};


// ─── RENDERER (do not edit below this line) ──────────────────────────────────

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function linkify(str) {
  // escape first, then turn http URLs into links
  return escapeHtml(str).replace(
    /(https?:\/\/[^\s,]+)/g,
    '<a href="$1" target="_blank" rel="noopener" style="color:var(--brand);">$1</a>'
  );
}

function boldMe(str) {
  return escapeHtml(str).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

function svgIcon(d) {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('cv-root');
  if (!root) return;

  let html = '';

  // PDF action
  html += `<div class="cv-top-actions">`;
  if (CV.cvPdfPath) {
    html += `
        <a href="${escapeHtml(CV.cvPdfPath)}" class="btn-download" target="_blank" rel="noopener">
          ${svgIcon('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>')}
          Open PDF
        </a>`;
  } else {
    html += `
        <button type="button" class="btn-download" id="download-generated-cv">
          ${svgIcon('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>')}
          <span>Open PDF</span>
        </button>`;
  }
  html += `</div>`;

  // ── Education
  if (CV.education.length) {
    html += `<div class="cv-block"><div class="cv-block-title">Education</div>`;
    CV.education.forEach(e => {
      html += `
        <div class="cv-item">
          <div class="cv-item-main">
            <div class="cv-item-title">${escapeHtml(e.degree)}</div>
            <div class="cv-item-sub">${escapeHtml(e.school)}${e.location ? ' — ' + escapeHtml(e.location) : ''}</div>
            ${e.gpa ? `<div style="font-size:13px;font-weight:600;color:var(--brand);margin-top:3px;">${escapeHtml(e.gpa)}</div>` : ''}
            ${e.notes && e.notes.length ? `<ul class="cv-notes">${e.notes.map(n => `<li>${linkify(n)}</li>`).join('')}</ul>` : ''}
          </div>
          <div class="cv-item-date">${escapeHtml(e.period)}</div>
        </div>`;
    });
    html += `</div>`;
  }

  // ── Research
  if (CV.research.length) {
    html += `<div class="cv-block"><div class="cv-block-title">Research Experience</div>`;
    CV.research.forEach(r => {
      html += `
        <div class="cv-item">
          <div class="cv-item-main">
            <div class="cv-item-title">${escapeHtml(r.title)} — ${escapeHtml(r.lab)}</div>
            ${r.supervisor ? `<div class="cv-item-sub">Supervised by ${escapeHtml(r.supervisor)}</div>` : ''}
            ${r.bullets && r.bullets.length ? `<ul class="cv-notes" style="margin-top:8px;">${r.bullets.map(b => `<li style="margin-bottom:5px;">${linkify(b)}</li>`).join('')}</ul>` : ''}
          </div>
          <div class="cv-item-date">${escapeHtml(r.period)}</div>
        </div>`;
    });
    html += `</div>`;
  }

  // ── Work
  if (CV.work && CV.work.length) {
    html += `<div class="cv-block"><div class="cv-block-title">Professional Experience</div>`;
    CV.work.forEach(w => {
      html += `
        <div class="cv-item">
          <div class="cv-item-main">
            <div class="cv-item-title">${escapeHtml(w.title)}</div>
            <div class="cv-item-sub">${escapeHtml(w.company)}</div>
            ${w.note ? `<div class="cv-item-sub" style="font-style:italic;">${escapeHtml(w.note)}</div>` : ''}
            ${w.bullets && w.bullets.length ? `<ul class="cv-notes" style="margin-top:8px;">${w.bullets.map(b => `<li style="margin-bottom:5px;">${escapeHtml(b)}</li>`).join('')}</ul>` : ''}
          </div>
          <div class="cv-item-date">${escapeHtml(w.period)}</div>
        </div>`;
    });
    html += `</div>`;
  }

  // ── Honors
  if (CV.honors.length) {
    html += `<div class="cv-block"><div class="cv-block-title">Honors &amp; Awards</div>`;
    CV.honors.forEach(h => {
      html += `
        <div class="cv-item">
          <div class="cv-item-main">
            <div class="cv-item-title">${escapeHtml(h.award)}</div>
            <div class="cv-item-sub">${escapeHtml(h.issuer)}</div>
            ${h.badge ? `<span class="honor-badge">${escapeHtml(h.badge)}</span>` : ''}
          </div>
          <div class="cv-item-date">${escapeHtml(h.year)}</div>
        </div>`;
    });
    html += `</div>`;
  }

  // ── Publications
  if (CV.publications.length) {
    html += `<div class="cv-block"><div class="cv-block-title">Publications</div>`;
    CV.publications.forEach(p => {
      html += `
        <div class="cv-item">
          <div class="cv-item-main">
            <div class="cv-item-title">${boldMe(p.title)}</div>
            <div class="cv-item-sub">${boldMe(p.authors)}</div>
            <div class="cv-item-sub" style="font-style:italic;color:var(--brand);">${escapeHtml(p.venue)}</div>
            ${p.badge ? `<span class="honor-badge">${escapeHtml(p.badge)}</span>` : ''}
            ${p.desc ? `<div class="cv-item-desc">${escapeHtml(p.desc)}</div>` : ''}
            ${p.links && p.links.length ? `
              <div class="pub-links" style="margin-top:10px;">
                ${p.links.map(l => {
                  if (l.href) {
                    return `<a href="${escapeHtml(l.href)}" class="pub-link" target="_blank" rel="noopener">${svgIcon('<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>')} ${escapeHtml(l.label)}</a>`;
                  }
                  return `<span class="pub-link btn-disabled" aria-disabled="true">${svgIcon('<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>')} ${escapeHtml(l.label)}</span>`;
                }).join('')}
              </div>`
            : ''}
          </div>
        </div>`;
    });
    html += `</div>`;
  }

  // ── Skills
  if (CV.skills.length) {
    html += `<div class="cv-block"><div class="cv-block-title">Technical Skills</div>`;
    CV.skills.forEach(s => {
      html += `
        <div style="margin-bottom:14px;">
          <div style="font-size:12px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px;">${escapeHtml(s.category)}</div>
          <div class="tag-group">
            ${s.items.map(i => `<span class="tag-neutral">${escapeHtml(i)}</span>`).join('')}
          </div>
        </div>`;
    });
    html += `</div>`;
  }

  // ── Languages
  if (CV.languages.length) {
    html += `
      <div class="cv-block"><div class="cv-block-title">Languages</div>
      <div class="tag-group">
        ${CV.languages.map(l => `<span class="tag-neutral">${escapeHtml(l.lang)} <span style="color:var(--text-muted);font-size:12px;">(${escapeHtml(l.level)})</span></span>`).join('')}
      </div></div>`;
  }

  root.innerHTML = html;

  const generatedCvButton = document.getElementById('download-generated-cv');
  if (generatedCvButton) {
    generatedCvButton.addEventListener('click', () => {
      const label = generatedCvButton.querySelector('span');
      const originalLabel = label ? label.textContent : 'Open PDF';

      generatedCvButton.disabled = true;
      generatedCvButton.classList.add('is-loading');
      if (label) label.textContent = 'Opening...';

      try {
        if (!window.CVPdfGenerator) {
          throw new Error('CV PDF generator is not loaded.');
        }
        window.CVPdfGenerator.openPreview(CV);
      } catch (error) {
        console.error(error);
        alert('Unable to open the CV PDF preview. Please allow popups and try again.');
      } finally {
        generatedCvButton.disabled = false;
        generatedCvButton.classList.remove('is-loading');
        if (label) label.textContent = originalLabel;
      }
    });
  }
});
