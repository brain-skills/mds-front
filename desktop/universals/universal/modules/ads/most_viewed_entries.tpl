{if isset($ads_most_viewed_entries) && $ads_most_viewed_entries}
    <div class="row mt-3">
        <div class="col-12">
            <h4 class="mb-2">Самые просматриваемые объявления</h4>
            <!-- Вывод самых просматриваемых новостей -->
            <div class="swiper-container mb-5" id="mostViewedAdsSwiper">
                <div class="swiper-wrapper">
                    {foreach $mostViewedAds as $ads}
                        <div class="swiper-slide">
                            <div class="row">
                                <div class="col-5">
                                    <a href="/ads/{$ads.alt_name}?lang={$ads.language}">
                                        <span class="position-absolute float-start badge rounded-pill bg-dark m-1">{$ads.date|date_format:"%d-%m-%Y"}</span>
                                        <img class="img-responsive max-wpx-250" src="../{$ads.image}" alt="">
                                    </a>
                                </div>
                                <div class="col-7">
                                    <a href="/ads/{$ads.alt_name}?lang={$ads.language}"><h6 class="text-primary">{$ads.title|truncate:55:"..."}</h6></a>
                                    <p class="fs-7 mb-0">{$ads.short_desc|truncate:110:"..."}</p>
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