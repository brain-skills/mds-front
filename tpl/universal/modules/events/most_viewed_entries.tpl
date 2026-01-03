{if isset($events_most_viewed_entries) && $events_most_viewed_entries}
    <div class="row mt-3">
        <div class="col-12">
            <h4 class="mb-2">Самые просматриваемые мероприятия</h4>
            <!-- Вывод самых просматриваемых новостей -->
            <div class="swiper-container mb-5" id="mostViewedEventsSwiper">
                <div class="swiper-wrapper">
                    {foreach $mostViewedEvents as $events}
                        <div class="swiper-slide">
                            <div class="row">
                                <div class="col-5">
                                    <a href="/events/{$events.alt_name}?lang={$events.language}">
                                        <span class="position-absolute float-start badge rounded-pill bg-dark m-1">{$events.date|date_format:"%d-%m-%Y"}</span>
                                        <img class="img-responsive max-wpx-250" src="../{$events.image}" alt="">
                                    </a>
                                </div>
                                <div class="col-7">
                                    <a href="/events/{$events.alt_name}?lang={$events.language}"><h6 class="text-primary">{$events.title|truncate:55:"..."}</h6></a>
                                    {$events.short_desc|truncate:110:"..."}
                                </div>
                            </div>
                        </div>
                    {/foreach}
                </div>
                <div class="manage-buttons mb-5">
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
        </div>
    </div>
{/if}