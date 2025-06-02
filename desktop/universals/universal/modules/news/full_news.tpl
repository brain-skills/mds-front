<div class="card border-0 rounded-4 shadow-sm overflow-hidden">
    <div class="row g-0">
        <!-- Картинка -->
        <div class="col-12 col-md-5">
            <img src="../../{$news.image}" alt="{$news.title}" class="img-fluid h-100 w-100 object-fit-cover" style="min-height: 250px;">
        </div>

        <!-- Контент -->
        <div class="col-12 col-md-7 d-flex flex-column justify-content-between p-4 bg-body-tertiary">
            <div>
                <h2 class="h4 fw-semibold mb-3 text-body-emphasis">{$news.title}</h2>

                <p class="mb-2 small">
                    <span class="text-secondary fw-medium">{$lang.modules_desc.categories}:</span>
                    {assign var='categoryAltNames' value=','|explode:$news.category_alt_names}
                    {foreach $categories as $index => $category}
                        {if $index > 0}, {/if}
                        <a href="/nc/{$categoryAltNames[$index]|default:''|escape:'url'}" class="text-decoration-none link-primary">{$category}</a>
                    {/foreach}
                </p>

                <p class="small text-secondary mb-4">
                    <strong>{$lang.modules_desc.views_count}:</strong> {$news.views}
                </p>

                <p class="text-body">{$news.short_desc}</p>
            </div>
        </div>
    </div>

    <!-- Полное описание -->
    <div class="p-4 border-top bg-body text-body">
        <h5 class="mb-3 text-body-emphasis">Полное описание</h5>
        <div>{$news.full_desc}</div>
    </div>

    <!-- Комментарии -->
    <div class="p-4 border-top bg-body text-body">
        <h5 class="mb-3 text-body-emphasis">Комментарии</h5>
        {include file='universal/comments.tpl' comments=$comments news=$news}
    </div>
</div>
