/**
 * cv-data.js — Edit this file to update your CV page.
 *
 * Every section below is an array of objects.
 * Add, remove, or edit entries freely — the page re-renders automatically.
 *
 * Fields marked "(optional)" can be omitted or set to null / [].
 */

const CV = {

  // ── EDUCATION ────────────────────────────────────────────────────────────
  education: [
    {
      degree:   "B.Sc. in Data Science & Analytics",
      school:   "The Hong Kong Polytechnic University (PolyU)",
      location: "Hong Kong",
      period:   "2023 – Present",
      notes: [                          // (optional) bullet points under the entry
        "Pursuing early graduation",
        "Dean's Honours List, Dept. of Applied Mathematics (2024/25)",
      ],
    },
    // ── Add more entries below ──
    // {
    //   degree:   "Your Degree",
    //   school:   "Your School",
    //   location: "City, Country",
    //   period:   "YYYY – YYYY",
    //   notes:    [],
    // },
  ],

  // ── RESEARCH EXPERIENCE ──────────────────────────────────────────────────
  research: [
    {
      title:       "Undergraduate Research Member",
      lab:         "PolyU X AI Lab",
      supervisor:  "Prof. Xiao Huang",       // (optional)
      period:      "2024 – Present",
      description: "Conducting research in artificial intelligence and machine learning, with a focus on data-driven methods and model development.",
    },
    // ── Add more entries below ──
  ],

  // ── WORK / INTERNSHIP EXPERIENCE ────────────────────────────────────────
  // Leave as [] if you have none yet.
  work: [
    // {
    //   title:       "Software Engineering Intern",
    //   company:     "Company Name",
    //   period:      "Summer 2025",
    //   description: "What you worked on.",
    // },
  ],

  // ── HONORS & AWARDS ──────────────────────────────────────────────────────
  honors: [
    {
      year:   "2024/25",
      award:  "Dean's Honours List",
      issuer: "Department of Applied Mathematics, The Hong Kong Polytechnic University",
      badge:  "Academic Excellence",        // (optional) label shown as a pill
    },
    // ── Add more entries below ──
  ],

  // ── PUBLICATIONS ─────────────────────────────────────────────────────────
  // Leave as [] if you have none yet.
  publications: [
    // {
    //   title:   "Your Paper Title",
    //   authors: "Rongjun Ye, Co-Author Name",   // bold your name with **Rongjun Ye**
    //   venue:   "Conference / Journal Name, Year",
    //   links: [
    //     { label: "PDF",     href: "#" },
    //     { label: "Code",    href: "#" },
    //     { label: "arXiv",   href: "#" },
    //   ],
    // },
  ],

  // ── SKILLS ───────────────────────────────────────────────────────────────
  skills: [
    {
      category: "Programming",
      items: ["Python", "R", "SQL", "C++"],
    },
    {
      category: "Machine Learning & Data",
      items: ["PyTorch", "TensorFlow", "scikit-learn", "Pandas", "NumPy"],
    },
    {
      category: "Tools",
      items: ["Git", "Linux", "LaTeX", "Jupyter"],
    },
    // ── Add more skill groups below ──
  ],

  // ── LANGUAGES ────────────────────────────────────────────────────────────
  languages: [
    { lang: "Mandarin",  level: "Native"          },
    { lang: "English",   level: "Fluent"           },
    { lang: "Cantonese", level: "Conversational"   },
    // ── Add more below ──
  ],

  // ── CV PDF ───────────────────────────────────────────────────────────────
  // Set to null to hide the download button, or provide a path to your PDF.
  // Place your PDF at:  assets/cv.pdf
  cvPdfPath: "assets/cv.pdf",   // change to null to hide

};


// ─── RENDERER (do not edit below this line) ──────────────────────────────────

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function boldMe(str) {
  // Wrap **text** in <strong>
  return escapeHtml(str).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

function svgIcon(d) {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('cv-root');
  if (!root) return;

  let html = '';

  // Download button
  if (CV.cvPdfPath) {
    html += `
      <div class="cv-top-actions">
        <a href="${escapeHtml(CV.cvPdfPath)}" class="btn-download" download>
          ${svgIcon('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>')}
          Download PDF
        </a>
      </div>`;
  }

  // ── Education
  if (CV.education.length) {
    html += `<div class="cv-block"><div class="cv-block-title">Education</div>`;
    CV.education.forEach(e => {
      html += `
        <div class="cv-item">
          <div class="cv-item-main">
            <div class="cv-item-title">${escapeHtml(e.degree)}</div>
            <div class="cv-item-sub">${escapeHtml(e.school)}${e.location ? ' — ' + escapeHtml(e.location) : ''}</div>
            ${e.notes && e.notes.length ? `<ul class="cv-notes">${e.notes.map(n => `<li>${escapeHtml(n)}</li>`).join('')}</ul>` : ''}
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
            <div class="cv-item-title">${escapeHtml(r.title)}</div>
            <div class="cv-item-sub">${escapeHtml(r.lab)}${r.supervisor ? ' — supervised by ' + escapeHtml(r.supervisor) : ''}</div>
            ${r.description ? `<div class="cv-item-desc">${escapeHtml(r.description)}</div>` : ''}
          </div>
          <div class="cv-item-date">${escapeHtml(r.period)}</div>
        </div>`;
    });
    html += `</div>`;
  }

  // ── Work
  if (CV.work && CV.work.length) {
    html += `<div class="cv-block"><div class="cv-block-title">Work Experience</div>`;
    CV.work.forEach(w => {
      html += `
        <div class="cv-item">
          <div class="cv-item-main">
            <div class="cv-item-title">${escapeHtml(w.title)}</div>
            <div class="cv-item-sub">${escapeHtml(w.company)}</div>
            ${w.description ? `<div class="cv-item-desc">${escapeHtml(w.description)}</div>` : ''}
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
});
