# Ye Rongjun — Personal Website

Clean academic-style personal website built with plain HTML/CSS. No build step required.

## Deploy to GitHub Pages

### Step 1 — Create the GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name it exactly: `ericyerongjun.github.io`
3. Set it to **Public**
4. Click **Create repository** (do NOT add a README)

### Step 2 — Push this folder

Open a terminal in this folder and run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ericyerongjun/ericyerongjun.github.io.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. In your repo, go to **Settings → Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose branch: `main`, folder: `/ (root)`
4. Click **Save**

Your site will be live at **https://ericyerongjun.github.io** within a minute or two.

---

## File structure

```
personal-website/
├── index.html          # Home page
├── publications.html   # Publications
├── honors.html         # Honors & Awards
├── cv.html             # CV
└── assets/
    ├── css/
    │   └── style.css
    └── images/
        └── profile.jpg
```

## Adding a PDF CV

Place your CV file at `assets/cv.pdf` — the download button on the CV page will link to it automatically.

## Updating content

All content is plain HTML. Open any `.html` file and edit the text directly. No framework or build tools needed.
