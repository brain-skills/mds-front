{if $action !== "product_buy"}
    <div class="pay-section">
        <h3 class="block-title">Доступные бонусы</h3>
        <div class="bonus-grid">
            {foreach $paymentBonuses as $bonus}

                <div class="bonus-item"
                     data-id="{$bonus.id}"
                     data-percent="{$bonus.value}"
                     data-min="{$bonus.min_payment}"
                     data-left="{$bonus.max_uses_per_user}">

                    <strong>{$bonus.name}</strong><br>

                    {if $bonus.type == 'percent'}
                        <small>Скидка: {$bonus.value}%</small><br>
                    {else}
                        <small>Скидка: {$bonus.value} {$bonus.currency}</small><br>
                    {/if}

                    <small>Минимальная сумма: {$bonus.min_payment} {$bonus.currency}</small><br>
                </div>

            {/foreach}
        </div>
        <div class="bonus-error" style="display:none;"></div>
    </div>

{/if}
