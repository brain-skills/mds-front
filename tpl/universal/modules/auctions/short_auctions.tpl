<div class="row g-4">

    {include file="../../blocks/module_filter.tpl"
    categories=$categoriesDataList
    filterCategory=$filterCategory
    filterSort=$filterSort
    moduleName="auctions"
    }

    {foreach $auctionsList as $lot}
        <div class="col-12 col-md-6 col-xl-4">
            <div class="auction-card h-100">

                <a href="/auctions/{$lot.id}?lang={$lot.language}" class="auction-image">
                    <img src="{$lot.image}" alt="{$lot.title|escape}">
                    <span class="price-badge">
                        {$lot.buy_now_price|default:$lot.start_price} {$currentCurrency}
                    </span>
                </a>

                <div class="auction-body">
                    <h6 class="auction-title">
                        <a href="/auctions/{$lot.id}?lang={$lot.language}">
                            {$lot.title}
                        </a>
                    </h6>

                    <p class="auction-desc">
                        {$lot.short_desc|truncate:120:"…"}
                    </p>

                  {*  <div class="auction-meta">
                        <span class="views">👁 {$lot.views}</span>
                        <span class="status status-{$lot.status}">
                            {if $lot.status == 1}Активен
                            {elseif $lot.status == 2}Завершён
                            {else}Черновик{/if}
                        </span>
                    </div>*}

                    {if $lot.status == 1}
                        <div class="countdown"
                             data-end-time='{$lot.end_date|date_format:"%m/%d/%Y %H:%M:%S"}'>
                            <span class="days">00</span>d
                            <span class="hours">00</span>h
                            <span class="minutes">00</span>m
                            <span class="seconds">00</span>s
                        </div>
                    {/if}

                    <a href="/auctions/{$lot.id}?lang={$lot.language}"
                       class="btn btn-outline-dark w-100 mt-3">
                        Перейти к аукциону
                    </a>
                </div>

            </div>
        </div>
    {/foreach}

</div>

<style>
    .auction-card {
        border-radius: 14px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,.05);
        transition: transform .2s ease, box-shadow .2s ease;
    }

    .auction-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 40px rgba(0,0,0,.08);
    }

    .auction-image {
        position: relative;
        display: block;
        aspect-ratio: 4 / 3;
        overflow: hidden;
    }

    .auction-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .price-badge {
        position: absolute;
        top: 12px;
        left: 12px;
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 14px;
    }

    .auction-body {
        padding: 16px;
    }

    .auction-title a {
        text-decoration: none;
        font-weight: 600;
    }

    .auction-desc {
        font-size: 14px;
        margin: 10px 0;
    }

    .auction-meta {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }

    .status-1 { color: #198754; }
    .status-2 { color: #dc3545; }

    .countdown {
        margin-top: 12px;
        padding-top: 10px;
        border-top: 1px solid #eee;
        font-weight: 600;
        text-align: center;
        letter-spacing: 1px;
    }

</style>
{include file="../../navigation.tpl"}
