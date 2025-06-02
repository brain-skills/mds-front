<div class="card py-3 px-3">
    <div class="row">
        <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mb-3">
            <img class="img-responsive" src="../../{$ads.image}" alt="" style="min-height: 210px;">
        </div>
        <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8 mb-3">
            <h4 class="fs-5">{$ads.title}</h4>
            <p class="mb-2"><span class="text-muted">Категории</span>:
                {assign var='categoryAltNames' value=','|explode:$ads.category_alt_names}
                {foreach $categories as $index => $category}
                    {if $index > 0}, {/if}<a href="/ac/{$categoryAltNames[$index]|default:''|escape:'url'}">{$category}</a>
                {/foreach}
            </p>
            <p class="text-success fs-5"><span class="text-muted">Цена:</span> {$ads.price}</p>
            <p><span class="text-muted">Просмотров:</span> {$ads.views} | <span class="text-muted">Тип:</span> <span class="{if $ads.authority == 'VIP'}text-warning{elseif $ads.authority == 'Exclusive'}text-danger{elseif $ads.authority == 'Premium'}text-primary{/if}">{$ads.authority}</span></p>
            <p><span class="text-muted">E-mail:</span> <a href="mailto:{$ads.email}">{$ads.email}</a> | <span class="text-muted">Phone:</span> <a href="tel:{$ads.phone}">{$ads.phone}</a></p>
            <pre class="bg-dark text-light px-2 py-2">{$ads.short_desc}</pre>
        </div>
        <div class="col-12 mt-2">
            <pre class="bg-dark text-light px-2 py-2">{$ads.full_desc}</pre>
        </div>
        <div class="col-12 mt-3">
            <h5>Комментарии:</h5>
            {include file='main/comments.tpl' comments=$comments ads=$ads}
        </div>
    </div>
</div>