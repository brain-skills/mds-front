<form method="POST" class="mb-0">
    <label>Email:</label>
    <input class="form-control mb-2" type="email" name="user_email" required>
    <label>Password:</label>
    <input class="form-control mb-2" type="password" name="user_password" required>
    <label>
      <input type="checkbox" required>
       Remember me
    </label>
    <button type="submit" name="login_submit" class="btn btn-primary w-100 mt-2 mb-0 py-1 rounded-1">Войти</button>
    {if isset($error_message)}
        <p>{$error_message}</p>
    {/if}
</form>