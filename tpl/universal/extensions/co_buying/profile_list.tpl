{if !$coBuys}
    <p class="text-muted">Нет активных совместных покупок.</p>
{else}

    <div class="row g-3">

        {foreach $coBuys as $sp}
            <div class="col-md-6">
                <div class="card p-3 bg-blurred-dark shadow-sm">

                    <h5 class="fw-bold mb-1">
                        {$sp.product_name}
                    </h5>

                    <p class="text-muted mb-1">
                        Требуется: {$sp.target_amount} {$currency}
                        <br>
                        Собрано: {$sp.collected_amount} {$currency}
                    </p>

                    {assign var='percent' value=($sp.collected_amount / $sp.target_amount * 100)}

                    <div class="progress" style="height: 10px;">
                        <div class="progress-bar bg-success"
                             role="progressbar"
                             style="width: {$percent}%;">
                        </div>
                    </div>

                    <p class="mt-2 small">
                        Прогресс: <strong>{$percent|round:0}%</strong>
                    </p>

                    <a href="/co-buying/view/{$sp.id}" class="btn btn-primary btn-sm w-100 mt-2">
                        Открыть
                    </a>

                </div>
            </div>
        {/foreach}

    </div>

{/if}
