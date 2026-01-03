{if !isset($uniqName) }
    <p> Ошибка: При include() шаблона uniqName обязателен</p>
{else}
    <div class="{$uniqName}-giveaway-widget giveaway-widget" style="margin-left: 5px">
        <div class="{$uniqName}-giveaway-header giveaway-header">
            <p style="font-size: 10px" class="{$uniqName}-giveaway-notice giveaway-notice"></p>
            <h2 class="{$uniqName}-giveaway-title giveaway-title">Загрузка...</h2>
            <p class="{$uniqName}-giveaway-subtitle giveaway-subtitle">Загрузка...</p>
        </div>
        <div class="{$uniqName}-giveaway-progress giveaway-progress">
            <div class="{$uniqName}-progress-bar progress-bar"></div>
            <b class="{$uniqName}-percent percent"></b>
        </div>
        <button class="{$uniqName}-giveaway-button giveaway-button" {if empty($userId)} disabled="disabled" {/if} >{if empty($userId)} Вы не можете участвовать {else} Участвовать {/if}</button>
    </div>

    {* required hidden data *}
    <input type="hidden" value="{$uniqName}" id="uniqNameCounter" class="uniqNameCounter">
{/if}