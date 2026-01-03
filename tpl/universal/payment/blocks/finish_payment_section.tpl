<div class="pay-section">
    <h3 class="block-title">Произвести оплату</h3>
    <input id="widget_id" type="text" hidden name="widget_id" value="{if isset($widgetId)} {$widgetId} {/if}">
    <input type="text" hidden name="dynamic_name" value="{if isset($dynamicName)} {$dynamicName} {/if}">
    <input type="text" id="action" hidden name="action" value="{$action}">
    <input type="text" id="currency" hidden name="currency" value="{$currency}">
    <input type="hidden" name="payment_method" id="selectedPaymentMethod">
    <input type="hidden" name="bonused_sum" id="bonused_sum">
    <input type="hidden" name="bon_id" id="bon_id">

    {if !empty($productParsedList)}
        <h4 class="block-title">Ваши покупки</h4>

        <div class="cart-items">
            <div class="mini-cart-items">
                {foreach $productParsedList as $product}
                    <div class="mini-cart-item">
                        <div class="mini-cart-name">{$product.name|escape} X <b>{$product.stored_quantity}</b></div>
                        <div class="mini-cart-details">
                            <span class="mini-cart-price">{$product.price|number_format:2} {$currency}</span>
                            {if $product.stock > 0}
                                <span class="mini-cart-stock">В наличии {$product.stock}</span>
                            {else}
                                <span class="mini-cart-stock out-of-stock">Нет в наличии</span>
                            {/if}
                        </div>
                    </div>
                {/foreach}
            </div>
        </div><br>
    {/if}

    <div class="row">
        <div class="col-6">
            <div class="input-block">
                <label class="input-label">Сумма</label>
                <input type="text" name="price" {if $action == "product_buy"}disabled{/if} value="{$price}" id="priceInput" class="pretty-input price-input" />
            </div>
        </div>
        <div class="col-6">
            <div class="input-block bonus-output" style="display:none;">
                <label class="input-label">Размер бонуса</label>
                <input type="text" value="" class="pretty-input bonus-amount" readonly />
            </div>
        </div>
    </div>

    <div class="input-block final-output" style="display:none;">
        <label class="input-label">Итоговая сумма с бонусом</label>
        <input type="text" value="" name="" class="pretty-input final-price" readonly />
    </div>

    <a {if isset($widgetObj) && $widgetObj["settings"]["account_required"] == true && !$user_authenticated} href="../../../index.php" {elseif isset($widgetObj) && $widgetObj["pay_with_redirect"] == 1} id="payRedirectUrl" href="" {else} id="submitBtn" {/if} type="submit" class="btn btn-primary mt-3 pay-btn-block" title="{$lang.paymentsection.gotopay}">{$lang.paymentsection.gotopay}</a>

</div>
