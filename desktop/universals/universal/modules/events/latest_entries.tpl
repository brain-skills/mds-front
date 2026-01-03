{if isset($events_latest_entries) && $events_latest_entries}
    <div class="row">
    	{foreach $latestEvents as $events}
            <div class="col-12 col-md-6 col-lg-6">
                <div class="card">
                    <div class="card-body d-flex align-items-start">
                        <a href="/events/{$events.alt_name}?lang={$events.language}" class="me-4 max-wpx-170">
                            <span class="position-absolute float-start badge rounded-pill bg-dark m-1">{$events.end_date|date_format:"%d-%m-%Y"}</span>
                            <img class="img-responsive" src="../{$events.image}" alt="">
                        </a>
                        <div class="flex-fill">
                            <a href="/events/{$events.alt_name}?lang={$events.language}">
                                <h6 class="text-primary mb-0">{$events.title|truncate:55:"..."}</h6>
                            </a>
                            {$events.short_desc|truncate:65:"..."}
                            <div class="countdown d-flex align-items-center mt-1 pt-2 border-top" data-end-time='{$events.end_date|date_format:"%m/%d/%Y - %H:%M:%S"}'>
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
{/if}