<div class="row mb-3">
    {foreach $couponsList as $coupon}
        <div class="col-12 col-md-6 col-xl-4">
            <div class="coupon-card p-4 h-100 position-relative">

                <!-- Невидимая ссылка поверх всей карточки -->
                <a href="/coupons/{$coupon.id}?lang={$coupon.language}"
                   class="stretched-link"
                   aria-label="Открыть купон {$coupon.code}"></a>

                <div class="d-flex justify-content-between align-items-start mb-3">
                    <span class="coupon-code">{$coupon.code}</span>

                    {if $coupon.status == 1}
                        <span class="badge bg-success-subtle text-success">Активен</span>
                    {else}
                        <span class="badge bg-danger-subtle text-danger">Выключен</span>
                    {/if}
                </div>

                <div class="coupon-discount mb-2">
                    {if $coupon.discount_type == 1}
                        -{$coupon.discount_value}%
                    {else}
                        -{$coupon.discount_value} {$currentCurrency}
                    {/if}
                </div>

                <div class="coupon-desc text-muted mb-3">
                    {$coupon.description|default:'Без описания'|truncate:80}
                </div>

                <div class="d-flex justify-content-between small text-muted border-top pt-3">
                    <span>
                        Использовано: {$coupon.used_count}
                        {if $coupon.usage_limit}
                            / {$coupon.usage_limit}
                        {/if}
                    </span>

                    {if $coupon.end_at}
                        <span>до {$coupon.end_at|date_format:"%d.%m.%Y"}</span>
                    {/if}
                </div>

            </div>
        </div>
    {/foreach}
</div>


{include file="../../navigation.tpl"}
<style>
    .coupon-card {
        border-radius: 14px;
        border: 1px solid rgba(255,255,255,.08);
        transition: all .2s ease;
        cursor: pointer;
    }

    .coupon-card:hover {
        transform: translateY(-4px);
        border-color: rgba(13,110,253,.4);
    }

    .coupon-code {
        font-family: monospace;
        font-size: .85rem;
        letter-spacing: .08em;
        color: #6ea8fe;
        text-transform: uppercase;
    }

    .coupon-discount {
        font-size: 2rem;
        font-weight: 700;
    }

    .coupon-desc {
        font-size: .9rem;
        line-height: 1.4;
    }

</style>