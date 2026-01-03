{if $error_message}
    <div class="alert alert-danger" role="alert">
        {$error_message}
    </div>
{/if}

{if $success_message}
    <div class="alert alert-success" role="alert">
        {$success_message}
    </div>
{/if}

<!-- Registration form -->
<form id="registration-form" method="POST" class="needs-validation" novalidate>
    <input type="hidden" name="form_token" value="{$form_token}">

    <div class="container px-0">
        <div class="row">
            <div class="col-md-6 mb-3">
                <div class="form-group">
                    <label for="reg_name">Name:</label>
                    <input type="text" name="reg_name" id="reg_name" class="form-control" required>
                    <div class="invalid-feedback">Please provide your name.</div>
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <div class="form-group">
                    <label for="reg_email">Emailkjnkjnkjnkjnjn:</label>
                    <input type="email" name="reg_email" id="reg_email" class="form-control" required>
                    <div class="invalid-feedback">Please provide a valid email.</div>
                </div>
            </div>

            <div class="col-md-6 mb-3">
                <div class="form-group">
                    <label for="reg_password">Password:</label>
                    <input type="password" name="reg_password" id="reg_password" class="form-control" required>
                    <div class="invalid-feedback">Please provide a password.</div>
                </div>
            </div>

            <div class="col-md-6 mb-3">
                <div class="form-group">
                    <label for="reg_password_repeat">Repeat password:</label>
                    <input type="password" name="reg_password_repeat" id="reg_password_repeat" class="form-control" required>
                    <div class="invalid-feedback">Please repeat your password.</div>
                </div>
            </div>

            <div class="col-md-6 mb-3">
                <div class="form-group">
                    <label for="reg_age">Age:</label>
                    <input type="number" name="reg_age" id="reg_age" class="form-control">
                </div>
            </div>

            <div class="col-md-6 mb-3">
                <div class="form-group">
                    <label for="reg_phone">Phone:</label>
                    <input type="text" name="reg_phone" id="reg_phone" class="form-control">
                </div>
            </div>

            <div class="col-md-6 mb-3">
                <div class="form-group">
                    <label for="reg_city">City:</label>
                    <input type="text" name="reg_city" id="reg_city" class="form-control">
                </div>
            </div>

            <div class="col-md-6 mb-3">
                <div class="form-group">
                    <label for="reg_gender">Gender:</label>
                    <select name="reg_gender" id="reg_gender" class="form-control">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>

            <div class="col-md-12 mb-3">
                <div class="form-group">
                    <label for="security_answer">Вопрос: {$security_question_text}</label>
                    <input type="text" name="security_answer" id="security_answer" class="form-control" placeholder="Только цифры" required>
                    <input type="hidden" name="security_question_id" value="{$security_question_id}">
                    <div class="invalid-feedback">Please provide an answer to the security question.</div>
                </div>
            </div>

            <div class="col-md-12">
                <button type="submit" name="register_submit" class="btn btn-primary w-100">Register</button>
            </div>
        </div>
    </div>
</form>

{literal}
<script>
    document.addEventListener('DOMContentLoaded', function () {
        var form = document.getElementById('registration-form');
        var password = document.getElementById('reg_password');
        var passwordRepeat = document.getElementById('reg_password_repeat');

        form.addEventListener('submit', function (event) {
            // Проверка на соответствие паролей
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

            // Проверка формы на валидность
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false);
    });
</script>

{/literal}