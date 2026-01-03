{if isset($lots_latest_entries) && $lots_latest_entries}
    <div class="row mt-1">
        <div class="col-12">
            <h4 class="mb-2 text-center">Последние мероприятия</h4>
            <!-- Вывод последних новостей -->
            <div class="swiper-container" id="latestlotsSwiper">
                <div class="swiper-wrapper">
                    {foreach $latestlots as $lots}
                        <div class="swiper-slide">
                            <div class="row">
                                <div class="col-5">
                                    <a href="/lots/{$lots.alt_name}?lang={$lots.language}">
                                        <span class="position-absolute float-start badge rounded-pill bg-dark m-1">{$lots.date|date_format:"%d-%m-%Y"}</span>
                                        <img class="img-responsive max-wpx-250" src="../{$lots.image}" alt="">
                                    </a>
                                </div>
                                <div class="col-7">
                                    <a href="/lots/{$lots.alt_name}?lang={$lots.language}"><h6 class="text-primary">{$lots.title|truncate:55:"..."}</h6></a>
                                    <p class="fs-7 mb-0">{$lots.short_desc|truncate:110:"..."}</p>
                                    <div class="countdown d-flex justify-content-center align-items-center mt-3 pt-3 border-top" data-end-time='{$lots.end_date|date_format:"%m/%d/%Y - %H:%M:%S"}'>
                                        <span class="days" data-bs-popup="popover" data-bs-trigger="hover" data-bs-placement="top" data-bs-content="Days">00</span> :
                                        <span class="hours" data-bs-popup="popover" data-bs-trigger="hover" data-bs-placement="top" data-bs-content="Hours">00</span> :
                                        <span class="minutes" data-bs-popup="popover" data-bs-trigger="hover" data-bs-placement="top" data-bs-content="Minutes">00</span> :
                                        <span class="seconds" data-bs-popup="popover" data-bs-trigger="hover" data-bs-placement="top" data-bs-content="Seconds">00</span>
                                    </div>
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