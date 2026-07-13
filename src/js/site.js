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


// Homepage carousel
const carousel = document.getElementById('carousel');
if (carousel) {
  const slides = Array.from(carousel.querySelectorAll('.slide'));
  const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
  let i = 0, timer = null;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function go(n) {
    slides[i].classList.remove('is-active');
    slides[i].setAttribute('aria-hidden', 'true');
    dots[i].classList.remove('is-active');
    dots[i].removeAttribute('aria-selected');
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('is-active');
    slides[i].removeAttribute('aria-hidden');
    dots[i].classList.add('is-active');
    dots[i].setAttribute('aria-selected', 'true');
  }
  function play() { if (!reduced && !timer) timer = setInterval(() => go(i + 1), 6500); }
  function stop() { clearInterval(timer); timer = null; }

  carousel.querySelector('.carousel-prev').addEventListener('click', () => { stop(); go(i - 1); play(); });
  carousel.querySelector('.carousel-next').addEventListener('click', () => { stop(); go(i + 1); play(); });
  dots.forEach((d, n) => d.addEventListener('click', () => { stop(); go(n); play(); }));
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', play);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', play);

  // Swipe táctil
  let x0 = null;
  carousel.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) { stop(); go(i + (dx < 0 ? 1 : -1)); play(); }
    x0 = null;
  }, { passive: true });

  play();
}
