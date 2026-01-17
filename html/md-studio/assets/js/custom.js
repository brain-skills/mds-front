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
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');

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

document.addEventListener('DOMContentLoaded', function () {
    const desktopLinks = document.querySelectorAll('#desktop-filters a');

    desktopLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            desktopLinks.forEach(l => l.classList.remove('active-service', 'active'));

            this.classList.add('active-service');

            const filterValue = this.getAttribute('data-filter');
            console.log('Selected filter:', filterValue);
        });
    });
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

const askBtn = document.getElementById('askQuestionBtn');
const chatWindow = document.getElementById('supportChat');
const closeBtn = document.getElementById('closeChat');

// closeBtn.addEventListener('click', function() {
//     chatWindow.classList.add('d-none');
//     askBtn.classList.remove('d-none');
// });

document.querySelectorAll('.ticket-list-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelectorAll('.ticket-list-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');

        if (window.innerWidth < 992) {
            document.querySelector('.sidebar').classList.add('d-none');
            document.querySelector('.ticket-detail').classList.remove('d-none');
            document.querySelector('.ticket-detail').classList.add('d-block');
        }

    });
});

// document.querySelector('.back-to-list').addEventListener('click', function(e) {
//     e.preventDefault();
//     document.querySelector('.sidebar').classList.remove('d-none');
//     document.querySelector('.ticket-detail').classList.add('d-none');
//     document.querySelector('.ticket-detail').classList.remove('d-block');
// });

document.addEventListener('DOMContentLoaded', function () {
    const carouselEl = document.querySelector('#myCarousel');
    const carousel = new bootstrap.Carousel(carouselEl);
    const indicators = document.querySelectorAll('.carousel-indicators .bar');

    // Click on indicator
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            carousel.to(index);
        });
    });

    // Update active indicator on slide change
    carouselEl.addEventListener('slid.bs.carousel', (e) => {
        indicators.forEach(ind => ind.classList.remove('active'));
        indicators[e.to].classList.add('active');
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".portfolio-track");
    const items = document.querySelectorAll(".portfolio-item");
    const prevBtn = document.getElementById("portfolio-prev");
    const nextBtn = document.getElementById("portfolio-next");

    let index = 0;

    function itemsPerView() {
        return window.innerWidth >= 992 ? 3 : 1;
    }

    function updateSlider() {
        const itemWidth = items[0].offsetWidth + 24; // gap included
        track.style.transform = `translateX(-${index * itemWidth}px)`;
    }

    nextBtn.addEventListener("click", () => {
        if (index < items.length - itemsPerView()) {
            index++;
            updateSlider();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (index > 0) {
            index--;
            updateSlider();
        }
    });

    window.addEventListener("resize", () => {
        index = 0;
        updateSlider();
    });
});

document.querySelectorAll('.container').forEach(container => {
  const slider = container.querySelector('.global-slider');
  const next = container.querySelector('.slider-next');
  const prev = container.querySelector('.slider-prev');

  if (!slider) return;

  const scrollAmount = slider.offsetWidth * 0.8;

  next?.addEventListener('click', () => {
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  prev?.addEventListener('click', () => {
    slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("#desktop-filters .service-link");
    const mobileSelect = document.getElementById("mobile-filter");
    const cards = document.querySelectorAll("#projects-wrapper .project-card");

    function filterProjects(category) {
        cards.forEach(card => {
            const categories = (card.dataset.category || "").split(" ").filter(Boolean);
            card.classList.toggle("show", categories.includes(category));
        });

        links.forEach(link => {
            link.classList.toggle("active-service", link.dataset.filter === category);
        });

        if (mobileSelect) mobileSelect.value = category;

        history.replaceState(null, "", `#${category}`);
    }

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            filterProjects(link.dataset.filter);
        });
    });

    if (mobileSelect) {
        mobileSelect.addEventListener("change", (e) => {
            filterProjects(e.target.value);
        });
    }

    const initial = location.hash.replace("#", "") || "web-development";
    filterProjects(initial);
});