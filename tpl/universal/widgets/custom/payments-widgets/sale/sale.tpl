<div class="container mt-4 bg-transparent">
    <div class="card p-3 bg-transparent mb-0">
        {if !$widgetData.disable_title}
            <h2 class="h4">{$widgetData.name}</h2>
        {/if}

        <form method="post" class="mt-3">
            {if $widgetData.price > 0}
                <div class="alert alert-success d-flex align-items-center">
                    <span>Сумма: <strong>{$widgetData.price|number_format:2}</strong> ₽</span>
                </div>
            {/if}

            {if $widgetData.super_donater_sum && $widgetData.price <= 0}
                <div class="alert alert-warning">🎖️ Супер-донатеры от {$widgetData.super_donater_sum} {$currency}</div>
            {/if}

            <button type="button" class="btn btn-success w-100 mt-3" onclick='window.location.href = "{$widgetData.handleUrl}"'>
                {$widgetData.btn_text}
            </button>

            {if $widgetData.pay_with_redirect}
                <div class="text-muted text-center mt-2">
                    🔒 Безопасные платежи через защищенное соединение
                </div>
            {/if}
        </form>
    </div>
</div>