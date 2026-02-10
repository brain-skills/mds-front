document.addEventListener("DOMContentLoaded", () => {
  const resetBtn = document.getElementById("resetFiltersBtn");
  const filters = document.getElementById("filtersForm");

  if (!resetBtn || !filters) return;

  resetBtn.addEventListener("click", (e) => {
    e.preventDefault();

    filters.querySelectorAll("select").forEach((select) => {
      select.selectedIndex = 0;           
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });
});

const week = document.getElementById('weekBtn');
const day = document.getElementById('dayBtn');

week.addEventListener('click', () => {
    week.classList.add('active');
    day.classList.remove('active');
});

day.addEventListener('click', () => {
    day.classList.add('active');
    week.classList.remove('active');
});

new Swiper(".swiper", {
    loop: true,
    spaceBetween: 24,
    slidesPerView: 3,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 14 },
        768: { slidesPerView: 2, spaceBetween: 18 },
        1200: { slidesPerView: 3, spaceBetween: 24 },
    },
});

function startCountdown(el, hours, minutes, seconds) {
    let total = hours * 3600 + minutes * 60 + seconds;

    const hEl = el.querySelector('[data-part="h"]');
    const mEl = el.querySelector('[data-part="m"]');
    const sEl = el.querySelector('[data-part="s"]');

    const normalBg = '#2696DB33';
    const dangerBg = '#D34E4E33';
    const dangerThreshold = 4 * 60 * 60;

const render = () => {
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;

    hEl.textContent = String(h).padStart(2, '0');
    mEl.textContent = String(m).padStart(2, '0');
    sEl.textContent = String(s).padStart(2, '0');

    const bg = total < dangerThreshold ? dangerBg : normalBg;
    hEl.style.backgroundColor = bg;
    mEl.style.backgroundColor = bg;
    sEl.style.backgroundColor = bg;
};

render();

const timer = setInterval(() => {
    total--;
    if (total < 0) {
    clearInterval(timer);
    total = 0;
    }
    render();
}, 1000);
}

startCountdown(document.getElementById("countdown"), 5, 0, 0);

(function () {
    const tabs = Array.from(document.querySelectorAll('#galleryTabs .gallery-tab'));
    const items = Array.from(document.querySelectorAll('#galleryGrid .gallery-item'));
    const defaultCategory = 'outdoor';

function setActive(category) {
    // tabs style
    tabs.forEach(btn => {
    const isActive = btn.dataset.category === category;
    btn.classList.toggle('active', isActive);
    btn.classList.toggle('text-primary', isActive);
    btn.classList.toggle('text-dark', !isActive);
    });

    items.forEach(item => {
    const show = item.dataset.category === category;
    item.classList.toggle('d-none', !show);
    });
}

tabs.forEach(btn => {
    btn.addEventListener('click', () => {
    const category = btn.dataset.category;
    setActive(category);

    history.replaceState(null, '', '#' + category);
    });
});

const hashCategory = (location.hash || '').replace('#', '').trim();
    setActive(hashCategory || defaultCategory);
})();

document.addEventListener('DOMContentLoaded', () => {
  const tags = { h1:1.5, h2:1.3, h3:1.1, h4:0.9, h5:0.7, p:0.6, span:0.4 };
  const baseSizes = new Map();
  const DOWN_FACTOR = 0.5;
  const SOFT_FLOOR = 0.85;

  const slider   = document.getElementById('fontSlider');
  const increase = document.getElementById('increase');
  const decrease = document.getElementById('decrease');
  if (!(slider && increase && decrease)) return;

  // гарантируем нужные границы и шаг
  slider.min = "-5"; slider.max = "5"; slider.step = "1";

  // Снятие «чистой» базы без инлайнов
  Object.keys(tags).forEach(tag => {
    document.querySelectorAll(tag).forEach(el => {
      const prev = el.style.fontSize;
      el.style.fontSize = '';
      baseSizes.set(el, parseFloat(getComputedStyle(el).fontSize));
      el.style.fontSize = prev;
    });
  });

  // шаг (-5..5) -> глобальный процент (50..150) дискретно
  const stepToPercent = (step) => 100 + step * 10;

  function applyFontScalingByStep(step) {
    const percent = stepToPercent(step);
    if (percent === 100) {
      // жёсткий сброс к базе
      baseSizes.forEach((base, el) => { el.style.fontSize = base + 'px'; });
      return;
    }

    const delta = (percent - 100) / 100; // -0.5..+0.5
    Object.entries(tags).forEach(([tag, mult]) => {
      const upCap = 1 + (0.5) * mult; // максимум соответствует +50
      document.querySelectorAll(tag).forEach(el => {
        const base = baseSizes.get(el);
        if (!base) return;
        const effMult = delta < 0 ? mult * DOWN_FACTOR : mult;
        let scale = 1 + delta * effMult;
        if (scale < SOFT_FLOOR) scale = SOFT_FLOOR;
        if (scale > upCap)      scale = upCap;
        el.style.fontSize = (base * scale) + 'px';
      });
    });
  }

  function setStepAndSave(step) {
    const s = Math.max(-5, Math.min(5, step|0));
    slider.value = String(s);
    applyFontScalingByStep(s);
    localStorage.setItem('fontStep', String(s));
  }

  // Восстановление
  const saved = Number(localStorage.getItem('fontStep'));
  const start = Number.isFinite(saved) ? Math.max(-5, Math.min(5, saved)) : 0;
  slider.value = String(start);
  applyFontScalingByStep(start);

  // Обработчики
  slider.addEventListener('input', () => setStepAndSave(Number(slider.value)));
  increase.onclick = () => setStepAndSave(Number(slider.value) + 1);
  decrease.onclick = () => setStepAndSave(Number(slider.value) - 1);
});

(() => {
  const sections = document.querySelectorAll('main section[id]');
  if (!sections.length) return;

  let activeId = null;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      const id = visible.target.id;
      if (id && id !== activeId) {
        activeId = id;
        history.replaceState(null, "", `#${id}`);
      }
    },
    {
      root: null,
      threshold: [0.2, 0.35, 0.5, 0.65],
      rootMargin: "-20% 0px -55% 0px", 
    }
  );

  sections.forEach(sec => observer.observe(sec));
})();