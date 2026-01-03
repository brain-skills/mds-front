/* ------------------------------------------------------------------------------
 *
 *  # Custom JS code
 *
 *  Place here all your custom js. Make sure it's loaded after app.js
 *
 * ---------------------------------------------------------------------------- */

// Таймер обратного отсчёта
document.addEventListener("DOMContentLoaded", function() {
  // Находим все элементы с классом "countdown"
  const countdownElements = document.querySelectorAll(".countdown");
  countdownElements.forEach(function(countdownElement) {
    // Получаем строку с конечной датой из атрибута data-end-time
    let endTimeString = countdownElement.getAttribute("data-end-time");
    // Преобразуем формат с "MM/DD/YYYY - HH:MM:SS" в "MM/DD/YYYY HH:MM:SS"
    endTimeString = endTimeString.replace(" - ", " ");
    // Преобразуем строку в дату
    const countdownDate = new Date(endTimeString).getTime();
    // Функция для обновления таймера
    function updateCountdown() {
      // Определяем текущее время
      const now = new Date().getTime();
      // Вычисляем оставшееся время
      const timeLeft = countdownDate - now;
      // Локальные переменные для вычислений времени
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      // Локальные переменные для обновления элементов DOM
      const daysElement = countdownElement.querySelector(".days");
      const hoursElement = countdownElement.querySelector(".hours");
      const minutesElement = countdownElement.querySelector(".minutes");
      const secondsElement = countdownElement.querySelector(".seconds");
      // Обновляем значения на странице
      if (daysElement && hoursElement && minutesElement && secondsElement) {
        daysElement.innerHTML = days.toString().padStart(2, "0");
        hoursElement.innerHTML = hours.toString().padStart(2, "0");
        minutesElement.innerHTML = minutes.toString().padStart(2, "0");
        secondsElement.innerHTML = seconds.toString().padStart(2, "0");
      }
      // Останавливаем таймер, если дата достигнута
      if (timeLeft < 0) {
        clearInterval(countdownFunction);
        countdownElement.innerHTML = "EXPIRED";
      }
    }
    // Запускаем интервал для обновления каждую секунду
    const countdownFunction = setInterval(updateCountdown, 1000);
    // Немедленно запускаем обновление таймера при загрузке
    updateCountdown();
  });
});


// Сохраняем состояние левой боковой панели в local Storage
document.addEventListener("DOMContentLoaded", function() {
  const leftsidebar = document.getElementById('leftsidebar');
  const toggleButton = document.getElementById('sidebarToggleButton');
  // Проверяем состояние из localStorage при загрузке страницы
  const savedState = localStorage.getItem('leftsidebarState');
  if (savedState === 'resized') {
    leftsidebar.classList.add('sidebar-main-resized');
  } else {
    leftsidebar.classList.remove('sidebar-main-resized');
  }
  // Обработчик клика на переключатель
  toggleButton.addEventListener('click', function() {
    // Получаем текущее состояние
    const currentState = leftsidebar.classList.contains('sidebar-main-resized') ? 'resized' : 'expanded';
    // Сохраняем текущее состояние в localStorage
    localStorage.setItem('leftsidebarState', currentState);
  });
});

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

document.querySelectorAll('.video-wrapper').forEach(wrapper => {
  wrapper.addEventListener('click', () => {
    if (wrapper.querySelector('iframe')) return;

    const videoSrc = wrapper.getAttribute('data-src');
    const iframe = document.createElement('iframe');

    iframe.setAttribute('src', videoSrc + '&autoplay=1');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', 'true');

    wrapper.innerHTML = '';
    wrapper.appendChild(iframe);
  });

  wrapper.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      wrapper.click();
    }
  });
});
document.addEventListener('DOMContentLoaded', function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl)
    });
});
document.addEventListener('DOMContentLoaded', function () {
	const sidebar = document.getElementById('leftsidebar');
	const toggleButtons = document.querySelectorAll('.sidebar-mobile-main-toggle');

	if (!sidebar || toggleButtons.length === 0) return;

	toggleButtons.forEach(function (toggleButton) {
		toggleButton.addEventListener('click', function (event) {
			event.stopPropagation();
			sidebar.classList.toggle('open');
		});
	});

	document.addEventListener('click', function (event) {
		const clickedInsideSidebar = sidebar.contains(event.target);
		const clickedToggleButton = [...toggleButtons].some(btn => btn.contains(event.target));

		if (!clickedInsideSidebar && !clickedToggleButton) {
			sidebar.classList.remove('open');
		}
	});

	sidebar.addEventListener('click', function (event) {
		event.stopPropagation();
	});
});

document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('leftsidebar');
    const toggleButton = document.getElementById('sidebarToggleButton');

    toggleButton.addEventListener('click', function (event) {
        event.stopPropagation(); 
        sidebar.classList.toggle('blur');
    });

    document.addEventListener('click', function (event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnToggleButton = toggleButton.contains(event.target);

        if (!isClickInsideSidebar && !isClickOnToggleButton) {
            sidebar.classList.remove('blur');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const roleSelector = document.getElementById('roleSelector');
    const selectedRoleInput = document.getElementById('selected_role');

    const companyTypeWrapper = document.getElementById('companyTypeWrapper');
    const creatorTypeWrapper = document.getElementById('creatorTypeWrapper');

    const roleForms = {
        Company: document.getElementById('Company'),
        Creator: document.getElementById('Creator'),
        User: document.getElementById('User'),
        SelfEmployer: document.getElementById('SelfEmployer')
    };

    const companySingle = document.getElementById('company_single');
    const companyBusiness = document.getElementById('company_business');
    const companyTypeSelect = document.getElementById('company_type');

    function toggleRoleForms() {
        const selectedRole = roleSelector.value;
        selectedRoleInput.value = selectedRole;

        for (const role in roleForms) {
            if (roleForms[role]) {
                roleForms[role].style.display = (role === selectedRole) ? 'block' : 'none';
            }
        }

        companyTypeWrapper.style.display = selectedRole === 'Company' ? 'block' : 'none';
        creatorTypeWrapper.style.display = selectedRole === 'Creator' ? 'block' : 'none';

        if (selectedRole === 'Company') {
            toggleCompanySubform();
        }
    }

    function toggleCompanySubform() {
        if (companyTypeSelect.value === 'single') {
            companySingle.style.display = 'block';
            companyBusiness.style.display = 'none';
        } else {
            companySingle.style.display = 'none';
            companyBusiness.style.display = 'block';
        }
    }

    if (roleSelector) {
        roleSelector.addEventListener('change', toggleRoleForms);
        companyTypeSelect.addEventListener('change', toggleCompanySubform);

        toggleRoleForms();
    }

});

const profileImage = document.getElementById("profileImage");

if (profileImage) {
    profileImage.addEventListener("change", function(event) {
        let file = event.target.files[0];
        if (!file) return;

        let img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = function() {
            if (img.width < 300 || img.height < 300) {
                document.getElementById("error").style.display = "block";
                event.target.value = "";
            } else {
                document.getElementById("error").style.display = "none";
            }
        };
    });
}


$('#editProfileForm').on('submit', function(event) {
    event.preventDefault();
    let formData = new FormData(this);
    let file = $("#profileImage")[0].files[0];
    formData.append("image", file);

    $.ajax({
        url: 'engine/ajax/lib/user/update_user.php',
        type: 'POST',
        dataType: 'json',
        processData: false,
        contentType: false,
        data: formData,
        success: function(response) {
            if (response.success) {
                showNotification("Изменения сохранены", "success", 10000);
                $("#editProfileModal").modal("hide");
                $('#avatar').attr('src', response.data.avatar);
                $('#name').text(response.data.name);
                $('#email').text(response.data.email);
                $('#age').text(response.data.age);
                $('#phone').text(response.data.phone);
                $('#city').text(response.data.city);
                $('#gender').text(response.data.gender);
                $('#balance').text(response.data.balance + ' USD');
                $('#pay_methods').text(response.data.pay_methods);
            }
        },
        error: function(xhr, status, error) {
            showNotification("Ошибка при обновлении данных пользователя", "error", 10000);
        }
    });
});

function showNotification(message, type, duration) {
    duration = 10000;
    if (typeof type === 'undefined') type = 'success';

    var container = document.getElementById('notification-container');
    var notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.innerHTML =
        '<span>' + message + '</span>' +
        '<button class="close-btn" onclick="this.parentElement.remove()">×</button>';

    container.appendChild(notification);

    setTimeout(function() {
        notification.style.animation = 'fadeOut 0.3s ease';
        notification.addEventListener('animationend', function() {
            notification.remove();
        });
    }, duration);
}

$(document).ready(function () {
    const url = new URL(window.location.href);

    if (!url.pathname.includes('profile')) {
        return;
    }

    if (url.searchParams.size === 0 || (url.searchParams.size === 1 && url.searchParams.has('tab'))) {

        let tab = url.searchParams.get('tab') || 'shop';

        const cleanUrl = url.pathname + '?tab=' + tab;
        window.history.replaceState(null, '', cleanUrl);

        $('.btn-tab').each(function () {
            const targetId = $(this).data('bs-target').replace('#', '');
            if (targetId.endsWith(tab)) {
                $(this).tab('show');
            }
        });

        $('.btn-tab').on('click', function () {
            const targetId = $(this).data('bs-target').replace('#', '');
            const cleanTab = targetId.replace(/^nav-/, '');
            const newUrl = url.pathname + '?tab=' + cleanTab;
            window.history.replaceState(null, '', newUrl);
        });
    }
});

var currentLink = document.getElementById('commonSettings');

if (currentLink) {
  currentLink.classList.add('active');
}

document.addEventListener('submit', function(event) {
  if (event.target.tagName.toLowerCase() === 'form') {
    if (event.target.id === 'settings-form') {
      document.getElementById('response-container').style.display = 'block';
      var formData = new FormData(event.target);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', event.target.action, true);
      xhr.onload = function () {
        var countdown = 0;
        var countdownElement = document.getElementById('countdown');
        var countdownInterval = setInterval(function() {
          countdown--;
          countdownElement.textContent = countdown;
          if (countdown <= 0) {
            clearInterval(countdownInterval);
            window.location.reload();
          }
        }, 1);
      };
      xhr.send(formData);
      event.preventDefault();
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var currentPath = window.location.pathname;
  var activeLink = document.querySelector('a[href="' + currentPath + '"]');
  if (activeLink) {
    activeLink.classList.add('active');
  }
});
document.addEventListener('DOMContentLoaded', function() {
    const leftsidebar = document.getElementById('leftsidebar');
    if (!leftsidebar) return;

    leftsidebar.addEventListener('click', function() {
        this.classList.toggle('blur');
    });
});