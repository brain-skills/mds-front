<h5>Форма обратной связи:</h5>
{if isset($message) && $message == 'Неверный ответ на вопрос безопасности.'}
<div class="alert alert-danger">{$message}</div>
{else if isset($message) && $message != ''}
<div class="alert alert-success">{$message}</div>
{/if}
<form method="post">
    <input type="hidden" name="form_token" value="{$form_token}">
    <input type="hidden" name="security_question_id" value="{$security_question_id}">

    <div class="row">
        <div class="col-12 col-md-3 mb-2">
            <label class="col-form-label">Имя:</label>
            <fieldset class="form-icon-group left-icon position-relative">
                <input type="text" class="form-control" name="name" placeholder="">
                <div class="form-icon position-absolute">
                    <img src="{$stheme}/images/svg/option.svg" alt="">
                </div>
            </fieldset>
        </div>
        <div class="col-12 col-md-3 mb-2">
            <label class="col-form-label">Телефон:</label>
            <fieldset class="form-icon-group left-icon position-relative">
                <input type="text" class="form-control" name="phone" placeholder="">
                <div class="form-icon position-absolute">
                    <img src="{$stheme}/images/svg/option.svg" alt="">
                </div>
            </fieldset>
        </div>
        <div class="col-12 col-md-3 mb-2">
            <label class="col-form-label">Электронная почта:</label>
            <fieldset class="form-icon-group left-icon position-relative">
                <input type="text" class="form-control" name="email" placeholder="">
                <div class="form-icon position-absolute">
                    <img src="{$stheme}/images/svg/option.svg" alt="">
                </div>
            </fieldset>
        </div>
        <div class="col-12 col-md-3 mb-2">
            <label class="col-form-label">Тема обращения:</label>
            <fieldset class="form-icon-group left-icon position-relative">
                <select class="form-select array-select form-control" name="subject">
                    <option value="Обратная связь" selected>Обратная связь</option>
                    <option value="Техническая поддержка">Техническая поддержка</option>
                    <option value="Жалоба">Жалоба</option>
                </select>
                <div class="form-icon position-absolute">
                    <img src="{$stheme}/images/svg/option.svg" alt="">
                </div>
            </fieldset>
        </div>
        <div class="col-12 col-md-12 mb-2">
            <label class="col-form-label">Сообщение:</label>
            <fieldset class="form-icon-group position-relative">
                <textarea class="form-control mb-2" rows="3" name="message" spellcheck="false"></textarea>
            </fieldset>
        </div>
        <div class="col-md-12 mb-3">
            <div class="form-group">
                <label for="security_answer">Вопрос: {$security_question_text}</label>
                <input type="text" name="security_answer" id="security_answer" class="form-control" placeholder="Только цифры">
                <input type="hidden" name="security_question_id" value="{$security_question_id}">
                <div class="invalid-feedback">Please provide an answer to the security question.</div>
            </div>
        </div>
    </div>
    <button type="submit" class="btn btn-success w-100 mt-3" name="submit_feedback">Отправить</button>
</form>