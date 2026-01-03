function updateRole(role) {
    document.getElementById("selected_role").value = role;
}

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('registration-form');

    $(".captcha-invalid-feedback").hide();

    form.addEventListener('submit', function (event) {
        let activeTab = document.querySelector(".tab-pane.active"); // Получаем активную вкладку
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

        var selectedRole = $("#selected_role").val();
        var userDiv = document.getElementById(selectedRole);
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

        $("#"+selectedRole).find(".invalid-feedback").hide();

        $("#"+selectedRole).find("input[required], select[required]").each(function () {
            if ($(this).val().trim() === "") {
                isValid = false;
                $(this).siblings(".invalid-feedback").show();
            }
        });

        if (!isValid) {
            event.preventDefault(); // Отменяет отправку формы
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

        form.classList.add('was-validated');
    }, false);
});