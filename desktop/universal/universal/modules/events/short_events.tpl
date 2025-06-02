<div class="row">
    {foreach $eventsList as $event}
        {assign var='category' value=','|explode:$event.category}
        <div class="col-12 col-md-6 col-lg-6">
            <div class="card">
                <div class="card-body d-flex align-items-start">
                    <a href="/events/{$event.alt_name}?lang={$event.language}" class="me-4 max-wpx-170">
                        <span class="position-absolute float-start badge rounded-pill bg-dark m-1">{$event.end_date|date_format:"%d-%m-%Y"}</span>
                        <img class="img-responsive" src="../{$event.image}" alt="">
                    </a>
                    <div class="flex-fill">
                        <a href="/events/{$event.alt_name}?lang={$event.language}">
                            <h6 class="text-primary mb-0">{$event.title|truncate:55:"..."}</h6>
                        </a>
                        {$event.short_desc|truncate:70:"..."}
                        <div class="countdown d-flex align-items-center mt-1 pt-2 border-top" data-end-time='{$event.end_date|date_format:"%m/%d/%Y - %H:%M:%S"}'>
                            <div><span class="days">00</span><p>{$lang.general.days}</p></div> :
                            <div><span class="hours">00</span><p>{$lang.general.hours}</p></div> :
                            <div><span class="minutes">00</span><p>{$lang.general.min}</p></div> :
                            <div><span class="seconds">00</span><p>{$lang.general.sec}</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/foreach}
</div>
{include file="../../navigation.tpl"}