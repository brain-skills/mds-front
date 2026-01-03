<div class="container py-5">
    <div class="row">
        <div class="col-12">

            <div class="coupon-view card border-0 shadow-sm">

                <div class="card-body p-4 p-md-5">
                    <div class="row g-4 align-items-center">

                        <!-- Левая часть -->
                        <div class="col-12 col-md-4 text-center border-end-md">

                            <div class="text-muted small mb-2">Код купона</div>
                            <div class="coupon-code mb-3">{$coupon.code}</div>

                            <div class="coupon-discount mb-3">
                                {if $coupon.discount_type == 1}
                                    -{$coupon.discount_value}%
                                {else}
                                    -{$coupon.discount_value}
                                {/if}
                            </div>

                            {if $coupon.end_at}
                                <div class="coupon-expire small text-muted">
                                    Действует до<br>
                                    <strong>{$coupon.end_at|date_format:"%d.%m.%Y"}</strong>
                                </div>
                            {/if}

                        </div>

                        <!-- Правая часть -->
                        <div class="col-12 col-md-8">

                            <h4 class="mb-3">Информация о купоне</h4>

                            {if $coupon.description}
                                <p class="text-muted mb-3">
                                    {$coupon.description}
                                </p>
                            {/if}

                            <ul class="list-unstyled coupon-meta small mb-4">
                                <li>
                                    <span class="text-muted">Минимальный заказ:</span>
                                    {$coupon.min_order_sum}
                                </li>

                                {if $coupon.max_discount_sum}
                                    <li>
                                        <span class="text-muted">Макс. скидка:</span>
                                        {$coupon.max_discount_sum}
                                    </li>
                                {/if}

                                <li>
                                    <span class="text-muted">Использовано:</span>
                                    {$coupon.used_count}
                                    {if $coupon.usage_limit}
                                        / {$coupon.usage_limit}
                                    {/if}
                                </li>

                                <li>
                                    <span class="text-muted">Статус:</span>
                                    {if $coupon.status == 1}
                                        <span class="text-success">активен</span>
                                    {else}
                                        <span class="text-danger">выключен</span>
                                    {/if}
                                </li>
                            </ul>

                            <button class="btn btn-outline-primary w-100"
                                    onclick="navigator.clipboard.writeText('{$coupon.code}')">
                                Скопировать код
                            </button>

                        </div>

                    </div>
                </div>

            </div>

        </div>
    </div>
</div>

<style>
    .coupon-view {
        border-radius: 18px;
        background: var(--bs-body-bg);
    }

    .coupon-code {
        font-family: monospace;
        font-size: 1.2rem;
        letter-spacing: .15em;
        font-weight: 600;
    }

    .coupon-discount {
        font-size: 2.4rem;
        font-weight: 700;
        color: var(--bs-primary);
    }

    .coupon-expire {
        line-height: 1.4;
    }

    .coupon-meta li {
        margin-bottom: .35rem;
    }

    @media (min-width: 768px) {
        .border-end-md {
            border-right: 1px solid rgba(0,0,0,.08);
        }
    }

</style>