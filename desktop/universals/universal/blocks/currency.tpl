<li class="nav-item">
    <form method="post" id="currencyForm">
        <input type="hidden" name="action" value="change_currency">
        <select name="currency" id="currency" class="form-select array-select form-control" onchange="document.getElementById('currencyForm').submit()">
            {foreach $currencies as $code => $rate}
                <option value="{$code}" {if getCurrentCurrency() == $code}selected{/if}>{$code}</option>
            {/foreach}
        </select>
    </form>
</li>