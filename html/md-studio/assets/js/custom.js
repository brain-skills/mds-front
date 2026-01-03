fetch("/assets/components/header.html")
    .then(res => res.ok ? res.text() : "")
    .then(html => document.getElementById("site-header").innerHTML = html);

fetch("/assets/components/footer.html")
    .then(res => res.ok ? res.text() : "")
    .then(html => document.getElementById("site-footer").innerHTML = html);

fetch("/assets/components/request-consultation.html")
    .then(res => res.ok ? res.text() : "")
    .then(html => {
        const container = document.getElementById("site-request-consultation");
        if (container) {
            container.innerHTML = html;

            const particlesDiv = document.getElementById("particles-full");
            if (particlesDiv) {
                particlesJS("particles-full", {
                    "particles": {
                        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                        "color": { "value": "#249FDD" },
                        "shape": { "type": "circle" },
                        "opacity": { "value": 0.5, "random": true },
                        "size": { "value": 3, "random": true },
                        "line_linked": {
                            "enable": true,
                            "distance": 150,
                            "color": "#249FDD",
                            "opacity": 0.3,
                            "width": 1
                        },
                        "move": {
                            "enable": true,
                            "speed": 3,
                            "direction": "none",
                            "random": false,
                            "straight": false,
                            "out_mode": "out"
                        }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                            "onhover": { "enable": true, "mode": "repulse" },
                            "onclick": { "enable": true, "mode": "push" },
                            "resize": true
                        }
                    },
                    "retina_detect": true
                });
            }
        }
    })
    .catch(err => console.warn("Failed to load request-consultation.html", err));

fetch("/assets/components/request-consultation-large.html")
.then(res => res.ok ? res.text() : "")
.then(html => {
    const container = document.getElementById("site-request-consultation-large");
    if (container) {
        container.innerHTML = html;

        particlesJS("particles-contact", {
            "particles": {
                "number": { "value": 90 },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.4 },
                "size": { "value": 3 },
                "line_linked": {
                    "enable": true,
                    "distance": 180,
                    "color": "#ffffff",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out"
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "repulse" },
                    "onclick": { "enable": false },
                    "resize": true
                }
            },
            "retina_detect": true
        });
    }
})
.catch(err => console.warn("Failed to load request-consultation-large.html", err));

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

document.querySelector('select').addEventListener('change', function() {
    const category = this.value;
    console.log('Filter by:', category);
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

document.addEventListener('DOMContentLoaded', function () {
    const desktopLinks = document.querySelectorAll('#desktop-filters a');
    const mobileSelect = document.getElementById('mobile-filter');

    function setActiveFilter(value, text) {
        desktopLinks.forEach(link => {
            link.classList.toggle('active-service', link.getAttribute('data-filter') === value);
        });

        if (mobileSelect) {
            mobileSelect.value = value;
        }

        history.pushState(null, '', '#' + value);
    }

    desktopLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const filterValue = this.getAttribute('data-filter');
            setActiveFilter(filterValue, this.textContent.trim());
        });
    });

    if (mobileSelect) {
        mobileSelect.addEventListener('change', function () {
            const filterValue = this.value;
            const selectedText = this.options[this.selectedIndex].text;
            setActiveFilter(filterValue, selectedText);
        });
    }

    const currentHash = window.location.hash.substring(1);
    if (currentHash) {
        const matchingLink = document.querySelector(`#desktop-filters a[data-filter="${currentHash}"]`);
        if (matchingLink) {
            setActiveFilter(currentHash);
        }
    }
});

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const thumbnails = document.getElementById('thumbnails');

dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) handleFiles(e.target.files);
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
