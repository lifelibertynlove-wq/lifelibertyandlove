// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('nav-list');
if (toggle && navList) {
  toggle.addEventListener('click', () => {
    const open = navList.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Blog: search + category filter
const list = document.getElementById('post-list');
if (list) {
  const cards = Array.from(list.querySelectorAll('.post-card'));
  const buttons = Array.from(document.querySelectorAll('.filter-btn'));
  const search = document.getElementById('blog-search');
  const empty = document.getElementById('blog-empty');
  let activeCat = 'all';

  function apply() {
    const q = (search?.value || '').trim().toLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const okCat = activeCat === 'all' || card.dataset.category === activeCat;
      const okQ = !q || card.dataset.search.includes(q);
      const show = okCat && okQ;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (empty) empty.style.display = visible ? 'none' : 'block';
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeCat = btn.dataset.filter;
      apply();
    });
  });
  if (search) search.addEventListener('input', apply);

  // Deep-link: /blog/?category=relationships
  const param = new URLSearchParams(location.search).get('category');
  if (param) {
    const btn = buttons.find((b) => b.dataset.filter === param);
    if (btn) btn.click();
  }
}
