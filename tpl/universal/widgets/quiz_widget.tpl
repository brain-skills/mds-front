{if !isset($uniqName) }
<p> Ошибка: При include() шаблона uniqName обязателен</p>

    {else}
    <div class="container py-3" id="{$uniqName}-widget_container"></div>

    {* required hidden data *}
    <input type="hidden" value="{$uniqName}" id="quizUniqName" class="quizUniqName">
{/if}