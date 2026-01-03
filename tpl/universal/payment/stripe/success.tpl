<h1>Спасибо за ваш платеж!</h1>
<h3>Уважаемый {$user_name}.</h3>
<p>Ваш платеж на сумму <span class="badge text-bg-success fs-6">{$amount} {if $currency == 'usd'}${elseif $currency == 'rub'}₽{elseif $currency == 'eur'}€{/if}</span> был успешно обработан!</p>