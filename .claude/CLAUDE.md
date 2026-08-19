# Personal Academic Website

Pure HTML/CSS/JS static site. No build step. Single page: everything lives in index.html.

- `index.html` — the whole site. Hand-written sections (hero, News, About, Research,
  Research Projects) followed by `<div id="cv-root">`, which cv-data.js fills.
- `assets/js/cv-data.js` — the CV data (`const CV`) **and** the renderer that injects
  Publications, Education, Research Experience, Professional Experience, Honors,
  Technical Skills, and Languages into `#cv-root`. Single source of truth for those
  sections; edit the data here, not the markup.
- `assets/js/cv-pdf-generator.js` — builds the CV PDF client-side. `DEFAULT_PROFILE`
  duplicates the profile block in cv-data.js; keep the two in sync.
- Author lists use `**Name**` for bolding — the HTML renderer converts it, the PDF
  renderer strips it.
- Section ids are anchor targets for the nav in index.html; the generated ones are
  derived from their headings.

Deploy via GitHub Pages. Do not add frameworks or build tools.
