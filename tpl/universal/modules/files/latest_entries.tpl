{if isset($files_latest_entries) && $files_latest_entries}
    <div class="row mt-1">
        <div class="col-12">
            <h4 class="mb-2 text-center">Последние файлы</h4>
            <!-- Вывод последних новостей -->
            <div class="swiper-container" id="latestFilesSwiper">
                <div class="swiper-wrapper">
                    {foreach $latestFiles as $files}
                        <div class="swiper-slide">
                            <div class="row">
                                <div class="col-5">
                                    <a href="/files/{$files.alt_name}?lang={$events.language}">
                                        <span class="position-absolute float-start badge rounded-pill bg-dark m-1">{$files.date|date_format:"%d-%m-%Y"}</span>
                                        <img class="img-responsive max-wpx-250" src="../{$files.image}" alt="">
                                    </a>
                                </div>
                                <div class="col-7">
                                    <a href="/files/{$files.alt_name}?lang={$events.language}"><h6 class="text-primary">{$files.title|truncate:55:"..."}</h6></a>
                                    <p class="fs-7 mb-0">{$files.short_desc|truncate:110:"..."}</p>
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