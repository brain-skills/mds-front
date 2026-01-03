<form method="POST" class="mb-0">
    <label>Email:</label>
    <input class="form-control mb-2" type="email" name="user_email" required>

    <label>Password:</label>
    <input class="form-control mb-2" type="password" name="user_password" required>

    <label class="d-flex align-items-center mb-2">
        <input type="checkbox" name="remember_me" class="me-1">
        Remember me
    </label>

    <button type="submit" name="login_submit" class="btn btn-outline-primary w-100 py-1 rounded-1">
        Войти
    </button>

    <!-- Разделитель -->
    <hr>

    <!-- Альтернативный вход -->
    <div class="login-from-social text-center mt-2">
        <h6 class="mb-2">Login with</h6>
        <div class="d-flex justify-content-center gap-2">
            <a href="{$google_login_url}">
                <img height="40" src="/templates/universal/assets/images/gauth.png" alt="Войти через Google">
            </a>
            <a href="{$facebook_login_url}">
                <img height="45" src="/templates/universal/assets/images/fauth.png" alt="Войти через Facebook">
            </a>
        </div>
    </div>

    {if isset($error_message)}
        <p class="text-danger mt-2">{$error_message}</p>
    {/if}
</form>
