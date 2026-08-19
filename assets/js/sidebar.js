// Shared sidebar – injected on every page
(function () {
  const links = [
    { href: 'index.html',        label: 'Home',              icon: '<path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H14v-6h-4v6H4a1 1 0 0 1-1-1V9.5z"/>' },
    { href: 'publications.html', label: 'Publications',      icon: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>' },
    { href: 'projects.html',     label: 'Projects',          icon: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>' },
    { href: 'talks.html',        label: 'Talks',             icon: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>' },
    { href: 'honors.html',       label: 'Honors & Awards',   icon: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>' },
    { href: 'cv.html',           label: 'CV',                icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>' },
  ];

  const contacts = [
    { href: 'mailto:rongjun.ye@connect.polyu.hk',                    label: 'rongjun.ye@connect.polyu.hk', icon: 'mail'  },
    { href: 'https://github.com/ericyerongjun',                      label: 'ericyerongjun',             icon: 'github'   },
    { href: 'https://scholar.google.com/citations?user=_vqwyT8AAAAJ',   label: 'Google Scholar',            icon: 'scholar'  },
    { href: 'https://www.kaggle.com/rongjunye',                      label: 'rongjunye',                 icon: 'kaggle'   },
    { href: 'https://www.linkedin.com/in/rongjun-ye-814453331',      label: 'rongjun-ye-814453331',      icon: 'linkedin' },
  ];

  const icons = {
    mail:    '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    phone:   '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16l.92.92z"/>',
    github:  '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    kaggle:  '<path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.334z"/>',
    linkedin:'<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    scholar: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/><path d="M12 20v3"/><path d="M9 23h6"/>',
  };

  function svg(d, size = 14, fill = false) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" ${fill ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'}>${d}</svg>`;
  }

  const currentPage = location.pathname.split('/').pop() || 'index.html';

  const navHtml = links.map(l => {
    const active = currentPage === l.href ? ' active' : '';
    return `<a href="${l.href}" class="nav-link${active}">${svg(l.icon)} ${l.label}</a>`;
  }).join('');

  const contactHtml = contacts.map(c => {
    const isExternal = c.href.startsWith('http');
    const useFill = c.icon === 'kaggle';
    const isDisabled = c.disabled;
    const cls = isDisabled ? ' contact-item disabled' : ' contact-item';
    const linkOrSpan = isDisabled
      ? `<span aria-label="${c.label}">${c.label}</span>`
      : `<a href="${c.href}"${isExternal ? ' target="_blank" rel="noopener"' : ''}>${c.label}</a>`;
    return `
      <div class="${cls}">
        ${svg(icons[c.icon], 14, useFill)}
        ${linkOrSpan}
      </div>`;
  }).join('');

  const sidebarHtml = `
    <div class="sidebar-top">
      <img src="assets/images/profile.jpg" alt="Ye Rongjun" class="profile-photo" />
      <div class="sidebar-name">RONGJUN YE</div>
      <div class="sidebar-role">Undergraduate Student · Data Science &amp; Analytics</div>
      <div class="sidebar-role" style="margin-top:3px; font-size:11px;">The Hong Kong Polytechnic University</div>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-label">Navigation</div>
      ${navHtml}
    </nav>
    <div class="sidebar-contacts">
      <div class="label">Contact</div>
      ${contactHtml}
    </div>
  `;

  const mobileHeaderHtml = `
    <div class="mobile-header" id="mobileHeader">
      <a class="mobile-brand" href="index.html">RONGJUN YE</a>
      <button class="hamburger" id="menuToggle" aria-label="Toggle menu">
        ${svg('<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>', 22)}
      </button>
    </div>
  `;

  document.addEventListener('DOMContentLoaded', () => {
    const layout = document.querySelector('.layout');
    layout.insertAdjacentHTML('beforebegin', mobileHeaderHtml);

    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.innerHTML = sidebarHtml;

    const toggle = document.getElementById('menuToggle');
    if (toggle) {
      toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
      sidebar.querySelectorAll('.nav-link').forEach(a => {
        a.addEventListener('click', () => sidebar.classList.remove('open'));
      });
    }
  });
})();
