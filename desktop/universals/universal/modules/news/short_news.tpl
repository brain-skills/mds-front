<div class="row g-4">
    {foreach $newsList as $story}
        {if !$story.title || !$story.short_desc || !$story.image}
            {continue}
        {/if}
        <div class="col-12 col-md-6 col-lg-6">
            <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                <div class="row g-0 flex-column flex-md-row h-100">
                    <div class="col-md-4 position-relative">
                        <a href="/news/{$story.alt_name}?lang={$story.language}" class="d-block h-100 w-100">
                            <img src="../{$story.image}" alt="{$story.title}" class="img-fluid h-100 w-100 object-fit-cover">
                            <span class="position-absolute top-0 start-0 badge bg-dark m-2">
                                {$story.date|date_format:"%d-%m-%Y"}
                            </span>
                        </a>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body d-flex flex-column justify-content-between h-100">
                            <div>
                                <a href="/news/{$story.alt_name}?lang={$story.language}" class="text-decoration-none">
                                    <h6 class="card-title text-primary mb-2 fw-semibold">
                                        {$story.title|truncate:55:"..."}
                                    </h6>
                                </a>
                                <p class="card-text text-muted small">
                                    {$story.short_desc|truncate:110:"..."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/foreach}
</div>


<div class="mt-5">
    {include file="../../navigation.tpl"}
</div>
