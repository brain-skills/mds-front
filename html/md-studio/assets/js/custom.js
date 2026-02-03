document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.slider-section .swiper').forEach(swiperEl => {
    const section = swiperEl.closest('.slider-section');
    const nextEl = section.querySelector('.slider-next');
    const prevEl = section.querySelector('.slider-prev');

    new Swiper(swiperEl, {
      slidesPerView: 1.1,
      spaceBetween: 16,
      speed: 600,
      loop: true,

      navigation: {
        nextEl,
        prevEl,
      },

      breakpoints: {
        576: { slidesPerView: 1.2 },
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 4 },
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        const currentPage = window.location.pathname.split("/").pop() || "main.html";

        const normalizedCurrent = (currentPage === "" || currentPage === "index.html") ? "main.html" : currentPage;

        document.querySelectorAll('.menu-link').forEach(link => {
            link.classList.remove('active'); 

            const href = link.getAttribute('href');
            if (href === normalizedCurrent) {
                link.classList.add('active');
            }
        });
    }, 100);
});

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('#carouselExampleIndicators');
    if (!carousel) return;

    const carouselInner = carousel.querySelector('.carousel-inner');
    const items = carouselInner.querySelectorAll('.carousel-item');
    let indicatorsContainer = carousel.querySelector('.carousel-indicators');

    if (indicatorsContainer) {
        indicatorsContainer.innerHTML = '';
    } else {
        const newIndicators = document.createElement('div');
        newIndicators.className = 'carousel-indicators mb-4 mb-md-5';
        carousel.appendChild(newIndicators);
        indicatorsContainer = newIndicators;
    }

    items.forEach((item, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.bsTarget = '#carouselExampleIndicators';
        button.dataset.bsSlideTo = index;
        button.setAttribute('aria-label', `Slide ${index + 1}`);

        if (index === 0) {
            button.classList.add('active');
            button.setAttribute('aria-current', 'true');
        }

        indicatorsContainer.appendChild(button);
    });

    if (indicatorsContainer.parentElement === carouselInner) {
        carousel.appendChild(indicatorsContainer);
    }
});

function handleFiles(files) {
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const img = document.createElement('img');
                img.src = ev.target.result;
                thumbnails.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });
}

function goToTeam() {
    window.location.href = "team.html";
}

document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(header => {
    header.addEventListener('click', function () {
        const chevron = this.querySelector('.custom-chevron');
        if (chevron) {
            chevron.classList.toggle('rotated');
        }
    });
});

function togglePassword(id) {
    const field = document.getElementById(id);
    const icon = field.parentElement.querySelector('i');
    if (field.type === "password") {
        field.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        field.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const openSearchBtns = document.querySelectorAll("#open-search-mobile, #open-search-desktop");
    const closeSearchBtn = document.getElementById("close-search");
    const headerSearch = document.getElementById("header-search");

    openSearchBtns.forEach(btn => {
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            headerSearch.classList.remove("d-none");
            headerSearch.classList.add("d-flex");
            headerSearch.querySelector("input").focus();
        });
    });

    closeSearchBtn.addEventListener("click", function() {
        headerSearch.classList.add("d-none");
        headerSearch.classList.remove("d-flex");
    });
});

document.querySelectorAll('.container').forEach(container => {
  const slider = container.querySelector('.global-slider');
  const next = container.querySelector('.slider-next');
  const prev = container.querySelector('.slider-prev');

  if (!slider || !slider.firstElementChild) return;

  // 1. Clone the first 4 items (since 4 fit in the view at 25%)
  // This allows the slider to "overshoot" into the clones before snapping back
  const itemsToClone = 4;
  for (let i = 0; i < itemsToClone; i++) {
    const clone = slider.children[i].cloneNode(true);
    slider.appendChild(clone);
  }

  const getStepWidth = () => {
    const item = slider.firstElementChild;
    // We use getBoundingClientRect for sub-pixel precision to avoid gaps
    return item.getBoundingClientRect().width;
  };

  next?.addEventListener('click', () => {
    const step = getStepWidth();
    // Calculate the point where the real items end and clones begin
    const realItemsWidth = step * (slider.children.length - itemsToClone);

    // If we are about to scroll past the last real item
    if (slider.scrollLeft >= realItemsWidth - 5) {
      // Snap to start instantly
      slider.style.scrollBehavior = 'auto';
      slider.scrollLeft = 0;

      // Scroll to the first "next" item smoothly
      setTimeout(() => {
        slider.style.scrollBehavior = 'smooth';
        slider.scrollBy({ left: step, behavior: 'smooth' });
      }, 20);
    } else {
      slider.style.scrollBehavior = 'smooth';
      slider.scrollBy({ left: step, behavior: 'smooth' });
    }
  });

  prev?.addEventListener('click', () => {
    const step = getStepWidth();
    const realItemsWidth = step * (slider.children.length - itemsToClone);

    if (slider.scrollLeft <= 5) {
      // Snap to the end of the real items instantly
      slider.style.scrollBehavior = 'auto';
      slider.scrollLeft = realItemsWidth;

      setTimeout(() => {
        slider.style.scrollBehavior = 'smooth';
        slider.scrollBy({ left: -step, behavior: 'smooth' });
      }, 20);
    } else {
      slider.style.scrollBehavior = 'smooth';
      slider.scrollBy({ left: -step, behavior: 'smooth' });
    }
  });
});


const desktopLinks = document.querySelectorAll('.pricing-filter-link');
const groups = document.querySelectorAll('#pricingGroups .pricing-group');
const mobileSelect = document.getElementById('mobile-filter');

function showGroup(category) {
groups.forEach(g => g.classList.toggle('d-none', g.dataset.category !== category));
desktopLinks.forEach(l => {
    const isActive = l.dataset.filter === category;
    l.classList.toggle('active-service', isActive);
    l.classList.toggle('opacity-75', !isActive);
});
if (mobileSelect && mobileSelect.value !== category) mobileSelect.value = category;
}

desktopLinks.forEach(link => {
link.addEventListener('click', (e) => {
    e.preventDefault();
    showGroup(link.dataset.filter);
});
});

if (mobileSelect) {
mobileSelect.addEventListener('change', (e) => showGroup(e.target.value));
}

const billingToggle = document.getElementById('billingToggle');
const labelMonthly = document.getElementById('labelMonthly');
const labelAnnual = document.getElementById('labelAnnual');

function formatMoney(n) {
return '$' + Number(n).toLocaleString('en-US');
}

function updatePrices(isAnnual) {
const visibleGroup = document.querySelector('#pricingGroups .pricing-group:not(.d-none)');
if (!visibleGroup) return;

visibleGroup.querySelectorAll('.price-old').forEach(el => {
    const val = isAnnual ? el.dataset.annual : el.dataset.monthly;
    if (val) el.textContent = formatMoney(val);
});

visibleGroup.querySelectorAll('.price-now').forEach(el => {
    const val = isAnnual ? el.dataset.annual : el.dataset.monthly;
    if (val) el.textContent = formatMoney(val);
});

labelMonthly.classList.toggle('active', !isAnnual);
labelAnnual.classList.toggle('active', isAnnual);
}

if (billingToggle) {
billingToggle.addEventListener('change', (e) => updatePrices(e.target.checked));
updatePrices(billingToggle.checked);
}

showGroup('web-development');

(function() {
    if (window.supportChatInitialized) return;
    window.supportChatInitialized = true;

    function initChat() {
        const askBtn   = document.getElementById("askQuestionBtn");
        const chatWin  = document.getElementById("supportChat");
        const closeBtn = document.getElementById("closeChat");

        if (!askBtn)   { console.warn("Ask button (#askQuestionBtn) not found"); return; }
        if (!chatWin)  { console.warn("Chat window (#supportChat) not found"); return; }
        if (!closeBtn) { console.warn("Close button (#closeChat) not found"); return; }

        askBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            chatWin.style.visibility = "visible";
            chatWin.style.opacity = "1";
            chatWin.style.transition = "opacity 0.25s ease, visibility 0s linear 0s";
            askBtn.classList.add("d-none");
        });

        closeBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            chatWin.style.opacity = "0";
            chatWin.style.visibility = "hidden";
            chatWin.style.transition = "opacity 0.25s ease, visibility 0s linear 0.25s";
            askBtn.classList.remove("d-none");
        });

        document.addEventListener("click", function(e) {
            if (!chatWin.contains(e.target) && !askBtn.contains(e.target)) {
                chatWin.style.opacity = "0";
                chatWin.style.visibility = "hidden";
                chatWin.style.transition = "opacity 0.25s ease, visibility 0s linear 0.25s";
                askBtn.classList.remove("d-none");
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initChat);
    } else {
        initChat();
    }
})();

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  if (!sections.length) return;

  const setHash = (id) => {
    const newUrl = `${location.pathname}#${id}`;
    history.replaceState(null, "", newUrl);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) setHash(visible.target.id);
    },
    {
      root: null,
      threshold: [0.4, 0.6, 0.8], 
    }
  );

  sections.forEach((s) => observer.observe(s));
});

document.getElementById('forgotPasswordForm').addEventListener('submit', function (e) {
    e.preventDefault();

    this.classList.add('d-none');

    document.getElementById('resetSuccess').classList.remove('d-none');
    });

    document.getElementById('forgotPasswordModal').addEventListener('hidden.bs.modal', function () {
    document.getElementById('forgotPasswordForm').classList.remove('d-none');
    document.getElementById('resetSuccess').classList.add('d-none');
    document.getElementById('forgotPasswordForm').reset();
});