<h5>{$lang.eventform.formname}:</h5>
<form method="post">
    <input type="hidden" name="event_title" value="{$events.title}">
    <input type="hidden" name="form_token" value="{$form_token}">
    <input type="hidden" name="security_question_id" value="{$security_question_id}">
    <div class="row">
        {if isset($user.id)}
            <input type="hidden" name="user_id" value="{$user.id}">
            <input type="hidden" name="username" value="{$user.name}">
        {else}
            <div class="col-12 col-md-4 mb-2">
                <label>{$lang.eventform.name}:</label>
                <fieldset class="form-icon-group left-icon position-relative">
                        <input type="text" class="form-control" name="username" required>
                    <div class="form-icon position-absolute">
                        <img src="{$stheme}/images/svg/option.svg" alt="">
                    </div>
                </fieldset>
            </div>
        {/if}
        <div class="col-12 col-md-4 mb-2">
            <label>{$lang.eventform.phone}:</label>
            <fieldset class="form-icon-group left-icon position-relative">
                <input type="text" class="form-control" name="phone" required>
                <div class="form-icon position-absolute">
                    <img src="{$stheme}/images/svg/option.svg" alt="">
                </div>
            </fieldset>
        </div>
        <div class="col-12 col-md-4 mb-2">
            <label>{$lang.eventform.link}:</label>
            <fieldset class="form-icon-group left-icon position-relative">
                <input type="text" class="form-control" name="social_url">
                <div class="form-icon position-absolute">
                    <img src="{$stheme}/images/svg/option.svg" alt="">
                </div>
            </fieldset>
        </div>
        <div class="col-12 col-md-12 mb-2">
            <label>{$lang.eventform.notes}:</label>
            <fieldset class="form-icon-group position-relative">
                <textarea class="form-control mt-2 mb-2" rows="3" name="notes" spellcheck="false"></textarea>
            </fieldset>
        </div>
        <div class="col-md-12 mb-3">
            <div class="form-group">
                <label>{$lang.eventform.question}: {$security_question_text}</label>
                <input type="text" name="security_answer" id="security_answer" class="form-control" placeholder="{$lang.eventform.placeholder}">
                <input type="hidden" name="security_question_id" value="{$security_question_id}">
                <input type="hidden" name="event_title" value="{$events.title}" disabled>
                <div class="text-white invalid-feedback">Please provide an answer to the security question.</div>
            </div>
        </div>
    </div>
    <button type="submit" class="btn btn-success text-white w-100 mt-3" name="submit_participants">{$lang.eventform.button}</button>
</form>