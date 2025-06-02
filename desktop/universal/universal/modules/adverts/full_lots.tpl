<div class="card py-3 px-3">
    <div class="row">
        {if isset($message) && $message != ''}
        <div class="alert {if $message == 'Неверный ответ на вопрос безопасности.'}alert-danger{else}alert-success{/if}">
            {$message}
        </div>
        {/if}
        <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mb-3">
            <img class="img-responsive" src="../../{$lots.image}" alt="" style="min-height: 210px;">
            <div class="countdown d-flex justify-content-center align-items-center my-2 py-2 border-top border-bottom" data-end-time='{$lots.end_date|date_format:"%m/%d/%Y - %H:%M:%S"}'>
                <span class="days" data-bs-popup="popover" data-bs-trigger="hover" data-bs-placement="top" data-bs-content="Days">00</span> :
                <span class="hours" data-bs-popup="popover" data-bs-trigger="hover" data-bs-placement="top" data-bs-content="Hours">00</span> :
                <span class="minutes" data-bs-popup="popover" data-bs-trigger="hover" data-bs-placement="top" data-bs-content="Minutes">00</span> :
                <span class="seconds" data-bs-popup="popover" data-bs-trigger="hover" data-bs-placement="top" data-bs-content="Seconds">00</span>
            </div>
            <a href="#" class="btn btn-outline-success w-100" id="openLotsForm">Присоединиться</a>
        </div>
        <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8 mb-3">
            <span class="float-end"><span class="text-muted">Участников лота:</span> {$lots.participants}, <span class="text-muted">Всего мест:</span> {$lots.capacity}</span>
            <h4 class="fs-5">{$lots.title}</h4>
            <p class="mb-2"><span class="text-muted">Категории</span>:
                {assign var='categoryAltNames' value=','|explode:$lots.category_alt_names}
                {foreach $categories as $index => $category}
                    {if $index > 0}, {/if}<a href="/lc/{$categoryAltNames[$index]|default:''|escape:'url'}">{$category}</a>
                {/foreach}
            </p>
            <!-- <p class="mb-2"><span class="text-muted"><span class="text-muted">Теги:</span> {$lots.tags}</p> -->
            <p class="mb-2"><span class="text-muted">Старт:</span> {$lots.start_date|date_format:"%m/%d/%Y - %H:%M:%S"} | <span class="text-muted">Конец:</span> {$lots.end_date|date_format:"%m/%d/%Y - %H:%M:%S"}</p>
            <p class="mb-2">
                <span class="text-muted">Статус:</span> 
                {if $lots.status == 'active'}
                    <span class="text-success">активен</span>
                {elseif $lots.status == 'completed'}
                    <span class="text-primary">завершен</span>
                {elseif $lots.status == 'canceled'}
                    <span class="text-danger">окончен</span>
                {/if}
            </p>

            {if isset($x_value[0])}<p><span class="text-muted">{$lang.fields.lots.0}:</span> {$x_value[0]}</p>{/if}
            {if isset($x_value[1])}<p><span class="text-muted">{$lang.fields.lots.1}:</span> {$x_value[1]}</p>{/if}
            {if isset($x_value[2])}<p><span class="text-muted">{$lang.fields.lots.2}:</span> {$x_value[2]}</p>{/if}
            {if isset($x_value[3])}<p><span class="text-muted">{$lang.fields.lots.3}:</span> {$x_value[3]}</p>{/if}

            <p class="text-success fs-5"><span class="text-muted">Цена:</span> {$lots.converted_price} {$currentCurrency}</p>
        </div>
        <div class="widget-selection">
            {include file='system/content/widget-select.tpl' object_name='lots' object_id=$lots.id}
        </div>
        <div class="col-12 mt-2">
            <p class="mb-2"><span class="text-muted">Список участников:</span></p>
            {if $confirmed_participants|@count > 0}
                <pre class="px-2 mb-3">
                    {foreach from=$confirmed_participants item=participant name=participants}
                        {$participant.username}{if !$smarty.foreach.participants.last}, {/if}
                    {/foreach}
                </pre>
            {else}
                <pre class="px-2 mb-3">Участников нет.</pre>
            {/if}
        </div>
        <div class="col-12 mt-2">
            <p class="mb-2"><span class="text-muted">Описание лота:</span></p>
            <pre class="px-2 mb-3">{$lots.full_desc}</pre>
        </div>
        <div class="col-12 mt-3">
            <h5 class="text-muted">Комментарии:</h5>
            {include file='main/comments.tpl' comments=$comments lots=$lots}
        </div>
    </div>
</div>
<script>
    document.getElementById("openLotsForm").addEventListener("click", function() {
        ptcModal("Форма вступления", document.getElementById("lotsForm").innerHTML);
    });
</script>