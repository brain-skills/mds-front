<h3 class="block-title">Выберите способ оплаты *</h3>

<div class="pay-grid">

    {if $payment_configs["stripe"]["enabled"] == true}
        <div class="pay-method">
            <label class="pay-card payment-toggle" data-method="stripe">
                <input type="radio" class="payment_method" name="payment_method" value="stripe">
                <div class="pay-card-inner">
                    <div class="pay-icon">
                        <img src="{$theme}/assets/images/stripe-logo.png" alt="">
                    </div>
                    <div class="pay-info">
                        <div class="pay-title">Stripe</div>
                        <div class="pay-desc">Комиссия 3% + 0.60¢</div>
                    </div>
                </div>
                <div class="pay-collapse">
                    <div class="collapse-inner">
                        <p>💵 Оплата картами VISA / MasterCard / UnionPay / ApplePay</p>
                        <p>🤑 ApplePay, Google Pay</p>
                        <p>⚠️ Требуется 3ds (PUSH / SMS подтверждение).</p>
                        <p>✅ Подходит для всех стран кроме России, Беларуси и стран ФАТФ.</p>
                    </div>
                </div>
            </label>


        </div>
    {/if}

    {if $payment_configs["coinbase"]["enabled"] == true}
        <div class="pay-method">
            <label class="pay-card payment-toggle" data-method="coinbase">
                <input type="radio" class="payment_method" name="payment_method" value="coinbase">
                <div class="pay-card-inner">
                    <img width="80" src="{$theme}/assets/images/coinbase-logo.png" alt="">
                    <div class="pay-info">
                        <div class="pay-title">Coinbase</div>
                        <div class="pay-desc">Комиссия 0.5% – 4.5%</div>
                    </div>
                </div>
                <div class="pay-collapse">
                    <div class="collapse-inner">
                        <p>💵 Оплата 15 криптовалютами</p>
                        <p>🪙 BTC, ETH, USDT, TRX, BNB, BUSD, DOGE, XMR</p>
                        <p>⚡️ Быстрое зачисление средств</p>
                    </div>
                </div>
            </label>
        </div>
    {/if}
    {if $payment_configs["balance"]["enabled"] == true}
        <div class="pay-method">
            <label class="pay-card payment-toggle" data-method="balance">
                <input type="radio" class="payment_method" name="payment_method" value="balance">
                <div class="pay-card-inner">
                    <div class="pay-icon">
                        <img src="/path/balance.svg" alt="">
                    </div>
                    <div class="pay-info">
                        <div class="pay-title">Баланс</div>
                        <div class="pay-desc">Без комиссии</div>
                    </div>
                </div>
                <div class="pay-collapse">
                    <div class="collapse-inner">
                        <p>Оплата с внутреннего баланса. Списывается ровно сумма покупки.</p>
                    </div>
                </div>
            </label>


        </div>
    {/if}

</div>