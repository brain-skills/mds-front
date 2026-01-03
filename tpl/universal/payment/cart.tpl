<div class="row">
    <div class="col-12">
        <h1>Корзина товаров ({$cartcount|default:0})</h1>
        {if $cartContent}
            <table class="table">
                <thead>
                    <tr>
                        <th class="border-end text-center" width="50px">ID</th>
                        <th class="border-end">Название</th>
                        <th class="border-end">Цена ({$currentCurrency})</th>
                        <th>Количество</th>
                    </tr>
                </thead>
                <tbody>
                    {foreach $cartContent as $product_id => $item}
                        <tr>
                            <td class="border-end text-center" width="50px">{$item.id}</td>
                            <td class="border-end">{$item.title}</td>
                            <td class="border-end" width="150px">{$item.converted_price} {$currentCurrency}</td>
                            <td class="text-center" width="120px">{$item.quantity}</td>
                        </tr>
                    {/foreach}
                </tbody>
            </table>
            <p class="mb-0">Итого: {$totalPrice} {$currentCurrency}</p>
            <form action="/?payment/checkout" method="post">
                <input hidden type="text" name="price" id="" value="{$totalPrice}">
                <input hidden type="text" name="currency" id="" value="{$currentCurrency}">
                {if $user_authenticated}
                    {if $methodsCount == 1 && !empty($selectedPaymentMethod)}
                        <input type="hidden" name="payment_method" id="selectedPaymentMethod" value="{$selectedPaymentMethod}">
                        <button type="submit" class="btn btn-primary mt-3" title="Перейти к оформлению заказа">Proceed to checkout</button>
                    {else}
{*
                        <a href="/?payment&price={$totalPrice}&currency={$currentCurrency}&currency={$currentCurrency}" class="btn btn-primary mt-3" title="Перейти к оформлению заказа">Proceed to checkout</a>
*}

                        <a href="/?payment" class="btn btn-primary mt-3" title="Перейти к оформлению заказа">Proceed to checkout</a>
                    {/if}
                    <!-- <button type="submit" class="btn btn-primary mt-3" title="Перейти к оформлению заказа">Proceed to checkout</button> -->
                {else}
                    <a href="../../../index.php" class="btn btn-primary mt-3" title="Перейти к оформлению заказа">Proceed to checkout</a>
                {/if}
            </form>
        {else}
            <p>Ваша корзина пуста.</p>
        {/if}
    </div>
</div>