{if isset($products_latest_entries) && $products_latest_entries}
    <div class="row mt-1">
        <div class="col-12">
            <h4 class="mb-2 text-center">Последние товары</h4>
            <!-- Вывод последних новостей -->
            <div class="swiper-container" id="latestProductsSwiper">
                <div class="swiper-wrapper">
                    {foreach $latestProducts as $products}
                        <div class="swiper-slide">
                            <div class="row">
                                <div class="col-5">
                                    <a href="/products/{$products.alt_name}?lang={$events.language}">
                                        <span class="position-absolute float-start badge rounded-pill bg-dark m-1">{$products.date|date_format:"%d-%m-%Y"}</span>
                                        <img class="img-responsive max-wpx-250" src="../{$products.image}" alt="">
                                    </a>
                                </div>
                                <div class="col-7">
                                    <a href="/products/{$products.alt_name}?lang={$events.language}"><h6 class="text-primary">{$products.title|truncate:55:"..."}</h6></a>
                                    <p class="fs-7 mb-0">{$products.short_desc|truncate:110:"..."}</p>
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