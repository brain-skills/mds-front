<div class="row">
    {foreach $lotsList as $lot}
        {assign var='category' value=','|explode:$lot.category}
        <div class="col-12 col-lg-6 mb-5">
            <div class="card" style="background: transparent; border: none;">
                <div class="card-body p-0">
                    <div class="row">
                        <div class="col-5">
                            <a href="/lots/{$lot.alt_name}?lang={$lot.language}">
                                <span class="position-absolute float-start badge rounded-pill bg-dark m-1">{$lot.converted_price} {$currentCurrency}</span>
                                <img class="img-responsive" src="../{$lot.image}" alt="">
                            </a>
                        </div>
                        <div class="col-7 shortdesc">
                            <span class="float-end" title="Количество подписанных участников {$lot.participants} из {$lot.capacity}">{$lot.participants} / {$lot.capacity}</span>
                            <a href="/lots/{$lot.alt_name}?lang={$lot.language}">
                                <h6 class="text-primary mb-2">{$lot.title|truncate:55:"..."}</h6>
                            </a>
                            {$lot.short_desc|truncate:110:"..."}
                            <div class="countdown d-flex justify-content-center align-items-center mt-3 pt-3 border-top" data-end-time='{$lot.end_date|date_format:"%m/%d/%Y - %H:%M:%S"}'>
                                <span class="days" data-bs-popup="popover" data-bs-trigger="hover" data-bs-placement="top" data-bs-content="Days">00</span> :
                                <span class="hours" data-bs-popup="popover" data-bs-trigger="hover" data-bs-placement="top" data-bs-content="Hours">00</span> :
                                <span class="minutes" data-bs-popup="popover" data-bs-trigger="hover" data-bs-placement="top" data-bs-content="Minutes">00</span> :
                                <span class="seconds" data-bs-popup="popover" data-bs-trigger="hover" data-bs-placement="top" data-bs-content="Seconds">00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/foreach}
</div>
{include file="../../navigation.tpl"}