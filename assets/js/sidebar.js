// Shared sidebar – injected on every page
(function () {
  const links = [
    { href: 'index.html',        label: 'Home',              icon: '<path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H14v-6h-4v6H4a1 1 0 0 1-1-1V9.5z"/>' },
    { href: 'publications.html', label: 'Publications',      icon: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>' },
    { href: 'honors.html',       label: 'Honors & Awards',   icon: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>' },
    { href: 'cv.html',           label: 'CV',                icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>' },
  ];

  const contacts = [
    { href: 'mailto:yerongjun03@gmail.com',            label: 'yerongjun03@gmail.com',           icon: 'mail' },
    { href: 'mailto:rongjun.ye@connect.polyu.hk',      label: 'rongjun.ye@connect.polyu.hk',     icon: 'mail' },
    { href: 'https://github.com/ericyerongjun',         label: 'ericyerongjun',                  icon: 'github' },
    { href: 'https://www.linkedin.com/in/rongjun-ye-814453331', label: 'Rongjun Ye',             icon: 'linkedin' },
  ];

  const icons = {
    mail:     '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    github:   '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
  };

  function svg(d, size = 14) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  }

  const currentPage = location.pathname.split('/').pop() || 'index.html';

  const navHtml = links.map(l => {
    const active = currentPage === l.href ? ' active' : '';
    return `<a href="${l.href}" class="nav-link${active}">${svg(l.icon)} ${l.label}</a>`;
  }).join('');

  const contactHtml = contacts.map(c => {
    const isExternal = c.href.startsWith('http');
    return `
      <div class="contact-item">
        ${svg(icons[c.icon])}
        <a href="${c.href}"${isExternal ? ' target="_blank" rel="noopener"' : ''}>${c.label}</a>
      </div>`;
  }).join('');

  const sidebarHtml = `
    <div class="sidebar-top">
      <img src="assets/images/profile.jpg" alt="Ye Rongjun" class="profile-photo" />
      <div class="sidebar-name">YE RONGJUN</div>
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
      <a class="mobile-brand" href="index.html">YE RONGJUN</a>
      <button class="hamburger" id="menuToggle" aria-label="Toggle menu">
        ${svg('<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>', 22)}
      </button>
    </div>
  `;

  document.addEventListener('DOMContentLoaded', () => {
    // Inject mobile header before .layout
    const layout = document.querySelector('.layout');
    layout.insertAdjacentHTML('beforebegin', mobileHeaderHtml);

    // Inject sidebar content
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.innerHTML = sidebarHtml;

    // Mobile toggle
    const toggle = document.getElementById('menuToggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
      // Close when nav link tapped
      sidebar.querySelectorAll('.nav-link').forEach(a => {
        a.addEventListener('click', () => sidebar.classList.remove('open'));
      });
    }
  });
})();
