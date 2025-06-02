{if isset($lots_popular_entries) && $lots_popular_entries}
    <div class="row mt-3">
        <div class="col-12">
            <h4 class="mb-2">Популярные мероприятия</h4>
            <!-- Вывод популярных новостей -->
            <div class="swiper-container" id="popularlotsSwiper">
                <div class="swiper-wrapper">
                    {foreach $popularlots as $lots}
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
                                    {$lots.short_desc|truncate:110:"..."}
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