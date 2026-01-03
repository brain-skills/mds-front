<div class="row g-4 py-4">
    {include file="../../blocks/module_filter.tpl"
    categories=$categoriesDataList
    filterCategory=$filterCategory
    filterSort=$filterSort
    moduleName="shop"
    }

    {if !empty($shopProducts)}
        {foreach from=$shopProducts item=shopProduct}
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <article class="product-card h-100 position-relative">
                    <div class="position-relative">
                        {if $shopProduct.discount > 0}
                            <div class="discount-badge">-{$shopProduct.discount}%</div>
                        {/if}

                        <!-- Фото -->
                        <a href="/shopProduct/?product_id={$shopProduct.id}" class="ratio ratio-4x3 d-block overflow-hidden rounded-top">
                            <img src="{$shopProduct.image_url|default:'/images/no-image.jpg'}"
                                 alt="{$shopProduct.name}"
                                 class="w-100 h-100 object-fit-cover">
                        </a>
                    </div>

                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <div class="shop-name mb-1 text-muted small">
                                Магазин:
                                <a href="/shops/{$shopProduct.shop.slug}" class="text-decoration-none fw-semibold text-dark">
                                    {$shopProduct.shop.shop_name}
                                </a>
                            </div>

                            <h3 class="product-title fs-6 fw-semibold text-truncate mb-2">
                                <a href="/shopProduct/?product_id={$shopProduct.id}" class="text-decoration-none text-dark">
                                    {$shopProduct.name}
                                </a>
                            </h3>

                            <div class="d-flex flex-wrap gap-3 align-items-center">
                                {assign var="productFull" value=floor($shopProduct.rating.average_rating)}
                                {if ($shopProduct.rating.average_rating - $productFull) >= 0.5}
                                    {assign var="productHalf" value=1}
                                {else}
                                    {assign var="productHalf" value=0}
                                {/if}
                                {assign var="productEmpty" value=5-$productFull-$productHalf}

                                <div class="product-rating mb-2">
                                    <div class="d-flex align-items-center gap-2">
                                        {section name=i loop=$productFull}<i class="bi bi-star-fill text-warning"></i>{/section}
                                        {section name=i loop=$productHalf}<i class="bi bi-star-half text-warning"></i>{/section}
                                        {section name=i loop=$productEmpty}<i class="bi bi-star text-warning"></i>{/section}
                                        <small class="text-muted">{$shopProduct.rating.average_rating} / 5 ({$shopProduct.rating.votes} голосов)</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <div>
                                <span class="price-current fw-bold text-primary">{$shopProduct.price} {$currency}</span>
                                {if $shopProduct.old_price}
                                    <span class="price-old text-muted text-decoration-line-through ms-2">
                                                          {$shopProduct.old_price} {$currency}
                                                        </span>
                                {/if}
                            </div>

                            <button type="button"
                                    class="btn btn-light btn-sm border rounded-circle p-2 shadow-sm hover-scale position-relative"
                                    title="Добавить в корзину"
                                    data-bs-target="#cartSidebar"
                                    aria-controls="cartSidebar"
                                    onclick="addToCart(this, {$shopProduct.id}); event.stopPropagation();">

                                                        <span class="btn-icon">
                                                            <i class="bi bi-cart3 fs-6 text-dark"></i>
                                                        </span>

                                <span class="spinner-border spinner-border-sm text-dark position-absolute top-50 start-50 translate-middle d-none"
                                      role="status"></span>
                            </button>


                        </div>
                    </div>
                </article>
            </div>
        {/foreach}
    {else}
        <div class="col-12 text-center text-muted py-5">
            Нет товаров
        </div>
    {/if}

</div>

<style>

    .product-card {
        border: 1px solid rgba(0,0,0,0.05);
        border-radius: 12px;
        background: #fff;
        transition: all 0.15s ease;
    }
    .product-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.06);
    }
    .product-card img {
        transition: transform .25s ease;
    }
    .product-card:hover img {
        transform: scale(1.05);
    }
    .discount-badge {
        position: absolute;
        top: .6rem;
        left: .6rem;
        background: #ffe4e4;
        color: #b91c1c;
        font-weight: 600;
        font-size: .8rem;
        border-radius: 6px;
        padding: .25rem .5rem;
    }
    .price-current { font-size: 1rem; }
    .price-old { font-size: .9rem; }
    .btn.hover-scale:hover {
        transform: scale(1.1);
        background-color: #f8f9fa !important;
    }
    .offcanvas {
        width: 380px;
        max-width: 100%;
        background: #fff;
        box-shadow: -4px 0 20px rgba(0,0,0,0.08);
    }
    .offcanvas-body img {
        object-fit: cover;
    }
    .btn.hover-scale:hover {
        transform: scale(1.05);
        background-color: #f8f9fa !important;
    }
</style>
{include file="../../navigation.tpl"}