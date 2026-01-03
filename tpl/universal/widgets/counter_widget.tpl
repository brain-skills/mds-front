{if !isset($uniqName) }
    <p> Ошибка: При include() шаблона uniqName обязателен</p>

    {elseif !isset($showTypeName) }
    <p> Ошибка: При include() шаблона showTypeName обязателен, например: true</p>

    {elseif !isset($prefix) }
    <p> Ошибка: При include() шаблона prefix обязателен, например: (пустое значения или --)</p>

    {elseif $uniqName == ""}

    {else}
    <p id="{$uniqName}-counter-text"></p>


    {* required hidden data *}
    <input type="hidden" value="{$uniqName}" id="counterUniqName" class="counterUniqName">
    <input type="hidden" value="{$showTypeName}" id="showTypeName">
    <input type="hidden" value="{$prefix}" id="prefix">
{/if}


