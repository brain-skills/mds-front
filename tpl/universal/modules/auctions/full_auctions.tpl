<div class="auction-card card shadow-sm p-3 mb-4">
    {if isset($message) && $message != ''}
        <div class="alert {if $message == 'Неверный ответ на вопрос безопасности.'}alert-danger{else}alert-success{/if} mb-3">
            {$message}
        </div>
    {/if}

    <div class="row g-3">
        <div class="col-md-4 text-center">
            <img class="img-fluid rounded" src="../../{$auctions.image}" alt="{$auctions.title}" style="max-height: 220px; object-fit: cover;">

            <div class="auction-countdown d-flex justify-content-center align-items-center my-3" data-end-time='{$auctions.end_at|date_format:"%Y/%m/%d %H:%M:%S"}'>
                <div class="mx-2 text-center">
                    <span class="days h4 mb-0">00</span><br><small>Дней</small>
                </div>
                <div class="mx-2 text-center">
                    <span class="hours h4 mb-0">00</span><br><small>Часов</small>
                </div>
                <div class="mx-2 text-center">
                    <span class="minutes h4 mb-0">00</span><br><small>Минут</small>
                </div>
                <div class="mx-2 text-center">
                    <span class="seconds h4 mb-0">00</span><br><small>Секунд</small>
                </div>
            </div>

{*
            <button class="btn btn-success w-100" id="openAuctionsForm">Присоединиться</button>
*}
        </div>

        <div class="col-md-8">
            <h3 class="fw-bold">{$auctions.title}</h3>
            <p class="text-muted mb-1">
                <span>Категории:</span>
                {assign var='categoryAltNames' value=','|explode:$auctions.category_alt_names}
                {foreach $categories as $index => $category}
                    {if $index > 0}, {/if}<a href="/auctions/{$categoryAltNames[$index]|escape:'url'}" class="text-decoration-none">{$category}</a>
                {/foreach}
            </p>

            <p class="text-muted mb-1">
                <span>Старт:</span> {$auctions.start_at|date_format:"%d.%m.%Y %H:%M"} |
                <span>Конец:</span> {$auctions.end_at|date_format:"%d.%m.%Y %H:%M"}
            </p>

            <p class="mb-2">
                <span class="text-muted">Статус:</span>
                {if $auctions.status == 1}<span class="text-success fw-bold">Активен</span>
                {elseif $auctions.status == 2}<span class="text-primary fw-bold">Завершен</span>
                {elseif $auctions.status == 3}<span class="text-danger fw-bold">Отменен</span>{/if}
            </p>

            {foreach $x_value as $i => $value}
                <p class="mb-1"><span class="text-muted">{$lang.fields.auctions.$i}:</span> {$value}</p>
            {/foreach}

            <p class="fs-5 fw-bold text-success mb-3">Цена: {$auctions.converted_price} {$currentCurrency}</p>

            <div class="mb-3">
                {include file='system/content/widget-select.tpl' object_name='auctions' object_id=$auctions.id}
            </div>

            <div class="mb-3">
                <h6 class="text-muted">Участники:</h6>
                {if $confirmed_participants|@count > 0}
                    <p class="mb-0">{foreach from=$confirmed_participants item=participant name=participants}{$participant.username}{if !$smarty.foreach.participants.last}, {/if}{/foreach}</p>
                {else}
                    <p class="mb-0 text-muted">Участников нет.</p>
                {/if}
            </div>

            <div>
                <h6 class="text-muted">Описание:</h6>
                <p>{$auctions.full_desc}</p>
            </div>
        </div>
    </div>

    {include file="../../extensions/page-qr-sharing.tpl" module="auctions"}

    <div class="mt-3">
        <h5 class="text-muted">Комментарии:</h5>
        {include file='universal/comments.tpl' comments=$comments auctions=$auctions}
    </div>
</div>

<script>
 /*   document.getElementById("openAuctionsForm").addEventListener("click", function() {
        ptcModal("Форма участия", document.getElementById("auctionsForm").innerHTML);
    });
*/
    // Countdown JS
    function startCountdown(container) {
        const endTime = new Date(container.dataset.endTime).getTime();
        const daysEl = container.querySelector('.days');
        const hoursEl = container.querySelector('.hours');
        const minutesEl = container.querySelector('.minutes');
        const secondsEl = container.querySelector('.seconds');

        function update() {
            const now = new Date().getTime();
            const distance = endTime - now;
            if(distance < 0) { container.innerHTML = 'Аукцион завершен'; return; }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000*60*60));
            const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
            const seconds = Math.floor((distance % (1000*60)) / 1000);

            daysEl.textContent = days.toString().padStart(2,'0');
            hoursEl.textContent = hours.toString().padStart(2,'0');
            minutesEl.textContent = minutes.toString().padStart(2,'0');
            secondsEl.textContent = seconds.toString().padStart(2,'0');
        }

        update();
        setInterval(update, 1000);
    }

    document.querySelectorAll('.auction-countdown').forEach(startCountdown);
</script>

<style>
    .auction-card { border-radius: 0.5rem; }
    .auction-card h3 { font-size: 1.5rem; }
    .auction-countdown span { min-width: 30px; display:inline-block; }
    .auction-countdown small { font-size: 0.7rem; color: #666; }
</style>
