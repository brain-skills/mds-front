function updateRole(role) {
    document.getElementById("selected_role").value = role;
}

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('registration-form');

    let hash = window.location.hash;

    $(".captcha-invalid-feedback").hide();


    // Убираем активные классы у всех вкладок и их контента
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelectorAll('.tab-pane').forEach(content => {
        content.classList.remove('show', 'active');
    });

    // Если хеш есть в URL, активируем нужную вкладку и контент
    if (hash) {
        let targetButton = document.querySelector(`button[data-bs-target="${hash}"]`);
        let targetContent = document.querySelector(hash);
        $("#selected_role").val(hash);

        if (targetButton && targetContent) {
            targetButton.classList.add('active');  // Активируем кнопку
            targetContent.classList.add('show', 'active');  // Активируем контент
        }
    } else {
        // Если хеш не задан, активируем первую вкладку и контент по умолчанию
        let firstButton = document.querySelector('.nav-link');
        let firstContent = document.querySelector(firstButton.getAttribute('data-bs-target'));
        firstButton.classList.add('active');
        firstContent.classList.add('show', 'active');
    }

    let allTabs = document.querySelectorAll(".tab-pane");

    var activeForm;

    allTabs.forEach(tab => {
        let isActive = tab.classList.contains("show") && tab.classList.contains("active");

        tab.querySelectorAll("input, select, textarea").forEach(input => {
            input.disabled = !isActive; // Отключаем только неактивные вкладки
        });

        if (isActive) {
            activeForm = tab.querySelector("form");
            if (activeForm) {
                console.log("Активная форма:", activeForm);
            }
        }
    });



    // Обновляем хеш при клике на вкладку
    document.querySelectorAll('#pills-tab .nav-link').forEach(button => {
        button.addEventListener('click', function () {
            let target = this.getAttribute('data-bs-target');
            history.pushState(null, null, target);  // Обновляем хеш в URL
            let targetButton = document.querySelector(`button[data-bs-target="${target}"]`);
            let targetContent = document.querySelector(target);

            if (targetButton && targetContent) {
                targetButton.classList.add('active');  // Активируем кнопку
                targetContent.classList.add('show', 'active');  // Активируем контент
            }

            let allTabs = document.querySelectorAll(".tab-pane");


            allTabs.forEach(tab => {
                let isActive = tab.classList.contains("show") && tab.classList.contains("active");

                tab.querySelectorAll("input, select, textarea").forEach(input => {
                    input.disabled = !isActive; // Отключаем только неактивные вкладки
                });
            });
        });
    });

    form.addEventListener('submit', function (event) {
        let activeTab = document.querySelector(".tab-pane.active"); // Получаем активную вкладку
        let allTabs = document.querySelectorAll(".tab-pane");

        allTabs.forEach(tab => {
            let isActive = tab.classList.contains("show") && tab.classList.contains("active");

            tab.querySelectorAll("input, select, textarea").forEach(input => {
                input.disabled = !isActive; // Отключаем только неактивные вкладки
            });

            if (isActive) {
                activeForm = tab.querySelector("form");
                if (activeForm) {
                    console.log("Активная форма:", activeForm);
                }
            }
        });
        var selectedRole = $("#selected_role").val();
        var userDiv = document.querySelector(selectedRole);
        if (userDiv == null) {
            userDiv = document.querySelector("#"+selectedRole);
            selectedRole = "#"+selectedRole;
        }
        var password = userDiv.querySelector('#reg_password');
        var passwordRepeat = userDiv.querySelector('#reg_password_repeat');

        let isValid = true;

        var response = grecaptcha.getResponse();

        if (response.length === 0) {
            event.preventDefault();
            event.stopPropagation();
            isValid = false;
            $(".captcha-invalid-feedback").show();
        } else {
            $(".captcha-invalid-feedback").hide();
        }


        $(selectedRole).find(".invalid-feedback").hide();

        $(selectedRole).find("input[required], select[required]").each(function () {
            if ($(this).val().trim() === "") {
                isValid = false;
                $(this).siblings(".invalid-feedback").show();
            }
        });

        if (!isValid) {
            event.preventDefault(); // Отменяет отправку формы
        } else {
            form.classList.add('was-validated');
        }

        if (password.value !== passwordRepeat.value) {
            event.preventDefault();
            event.stopPropagation();
            // Добавляем класс ошибки для отображения сообщения
            passwordRepeat.classList.add('is-invalid');
            passwordRepeat.nextElementSibling.textContent = 'Passwords do not match.';
        } else {
            passwordRepeat.classList.remove('is-invalid');
            passwordRepeat.classList.add('is-valid');
        }

    }, false);
});

document.addEventListener("DOMContentLoaded", function () {
    const roleSelector = document.getElementById("roleSelector");
    const companyTypeWrapper = document.getElementById("companyTypeWrapper");
    const companyTypeSelect = document.getElementById("company_type");

    function switchRoleTab(role) {
        document.querySelectorAll('.tab-pane').forEach(tab =>
            tab.classList.remove('show', 'active')
        );
        const target = document.getElementById(role);
        if (target) target.classList.add('show', 'active');

        companyTypeWrapper.style.display = role === 'Company' ? 'block' : 'none';

        const url = new URL(window.location);
        url.searchParams.set('role', role);
        window.history.replaceState({}, '', url);
    }

    function switchCompanyType(type) {
        const single = document.getElementById("company_single");
        const business = document.getElementById("company_business");
        if (!single || !business) return;

        if (type === 'single') {
            single.style.display = "block";
            business.style.display = "none";
        } else {
            single.style.display = "none";
            business.style.display = "block";
        }
    }

    switchRoleTab(roleSelector.value);
    switchCompanyType(companyTypeSelect.value);

    roleSelector.addEventListener("change", () => {
        switchRoleTab(roleSelector.value);
    });
    companyTypeSelect.addEventListener("change", () => {
        switchCompanyType(companyTypeSelect.value);
    });
});