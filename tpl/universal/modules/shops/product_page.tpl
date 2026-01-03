<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
<link rel="stylesheet" href="{$theme}/assets/css/modules/shop/product-page.css">
<div id="lightbox" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);justify-content:center;align-items:center;z-index:9999;">
    <span id="lightbox-close" style="position:absolute;top:20px;right:30px;font-size:30px;color:white;cursor:pointer;">&times;</span>
    <img id="lightbox-img" src="" style="max-width:90%;max-height:90%;border-radius:12px;box-shadow:0 0 15px rgba(0,0,0,0.5);" />
</div>
<div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div id="cartToast" class="toast align-items-center text-bg-success border-0" role="alert">
        <div class="d-flex">
            <div class="toast-body">
                Товар добавлен в <a target="_blank" href="/?cart"><b>корзину</b></a>
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto"
                    data-bs-dismiss="toast"></button>
        </div>
    </div>
</div>

<div class="card py-3 px-3">
    <div class="row">

        <div class="border-bottom mb-4 pb-2 d-flex align-items-center position-relative">
            <div class="me-3">

                <h4 class="mb-0"> <img src="{$shopProduct.shop_main_image}" width="40" class="rounded-circle shadow-sm" alt="shop" /><a style="color: black" target="_blank" href="/shops/{$shop.slug}">{$shopProduct.shop_name}</a> </h4>
                <button onclick="window.location.href = '/?cart'" type="button"
                        class="btn btn-light border p-2 shadow-sm position-absolute top-0 end-0 hover-scale"
                        title="Корзина"
                        aria-controls="cartSidebar">
                    <i class="bi bi-cart3 fs-5 text-dark"></i>
                    <span id="cartCountBadge"
                          class="position-absolute top-0 start-100 translate-middle badge bg-danger"
                          style="font-size: 0.7rem;">
                    {$cartProductCount}
                </span>
                </button>

            </div>

            <ul class="nav nav-pills mx-auto mb-0" id="shopTabs" role="tablist">
                <li class="nav-item">
                    <a class="nav-link" id="tab-shop-products" href="/shops/{$shop.slug}">🛒 Товары магазина</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" id="tab-products" data-bs-toggle="tab" href="#products" role="tab">
                        🛒 {$shopProduct.name|truncate:20:"…":true}
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="tab-coupons" data-bs-toggle="tab" href="#coupons" role="tab">🎟 Купоны</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="tab-about" data-bs-toggle="tab" href="#about" role="tab">ℹ️ О нас</a>
                </li>
            </ul>
        </div>

        <div class="tab-content" id="shopTabsContent">
            <div class="tab-pane fade show active" id="products" role="tabpanel">
                <div class="row">
                    <div class="col-md-6 mb-4 mb-md-0">
                        <div class="product-gallery mb-3" style="cursor: pointer">
                            <img id="mainImage" src="{$shopProduct.main_image}" alt="product" />
                        </div>
                        <div class="row g-2" id="thumbs">
                            {foreach from=$shopProduct.images item=image}
                                <div class="col-3 thumb"><img src="{$image}" /></div>
                            {/foreach}
                        </div>
                    </div>

                    <div class="col-md-6">
                        <h2 class="fw-bold mb-3">{$shopProduct.name}</h2>
                        <p class="text-muted small mb-1">Артикул: <span id="sku">{$shopProduct.article}</span> <span class="copy-btn text-primary ms-2">[копировать]</span></p>

                        <strong>Рейтинг товара:</strong>
                        {assign var="productFull" value=floor($productRating.average)}
                        {if ($productRating.average - $productFull) >= 0.5}
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
                                <small class="text-muted">{$productRating.average} / 5 ({$productRating.votes} голосов)</small>
                            </div>
                        </div>


                        <h3 class="fw-bold mb-4">{$shopProduct.price} {$currency}</h3>

                        <p class="mb-2"><span class="text-muted">Категории товара:</span>
                            {assign var='categoryAltNames' value=','|explode:$shopProduct.category_alt_names}
                            {foreach $categories as $index => $category}
                                {if $index > 0}, {/if}<a target="_blank" href="/shops/products?category={$category.id}&sort=date">{$category.name}</a>
                            {/foreach}
                        </p>

                        <div class="product-attributes mt-3">
                            {if !empty($shopProduct.attributes)}
                                <h5 class="mb-2">Характеристики</h5>
                                <ul class="list-unstyled d-flex flex-wrap gap-3 mb-0">
                                    {foreach from=$shopProduct.attributes item=attr}
                                        <li class="badge bg-light border text-dark px-3 py-1">
                                            <strong>{$attr.name}:</strong> {$attr.value}
                                        </li>
                                    {/foreach}
                                </ul>
                            {/if}

                        </div><br>

                        <p class="mb-4">{$shopProduct.description}</p>

                        <div class="mb-3">
                            <strong>Магазин:</strong> <a target="_blank" href="/shops/{$shop.slug}">{$shopProduct.shop_name}</a> <br>
                        </div>

                        <button class="btn btn-dark btn-lg w-100 mb-4 btn-add-to-cart" data-product-id="{$shopProduct.id}">Добавить в корзину
                            <span class="btn-icon">
                                <i class="bi bi-cart3 fs-6"></i>
                            </span>
                        </button>

                        {include file="../../extensions/page-qr-sharing.tpl" module="shops"}

                    </div>
                </div>
                <section class="similar-products py-5">
                    <div class="container">
                        <h3 class="fw-bold mb-4">Другие товары магазина</h3>
                        <div class="row g-3">
                            {if !empty($shopProducts)}
                                {foreach from=$shopProducts item=shopProduct}
                                    <div class="col-6 col-md-3 col-lg-2" onclick="window.location.href = '/shopProduct/?product_id={$shopProduct.id}'">
                                        <div class="product-mini-card">
                                            <div class="img-wrap">
                                                <img src="{$shopProduct.image_url}" alt="product">
                                            </div>
                                            <div class="info">
                                                <div class="name">{$shopProduct.name}</div>
                                                <div class="price">{$shopProduct.price} {$currency}</div>
                                            </div>
                                        </div>
                                    </div>
                                {/foreach}
                            {else}
                                <p>Нет товаров</p>
                            {/if}
                        </div>
                    </div>
                </section>
                <div class="product-reviews mt-5">
                    <h4 class="fw-bold mb-4">Отзывы покупателей</h4>
                    <p>Последние 5 отзывов</p>
                    {if $productReviews|@count > 0}
                        {foreach from=$productReviews item=review}
                            <div class="review-item p-4 mb-4 rounded-4 shadow-sm bg-white border">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="review-avatar bg-secondary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px;">
                                            <span class="fw-bold text-secondary">{$review.user_name|substr:0:1|upper}</span>
                                        </div>
                                        <div class="fw-semibold">{$review.user_name}</div>
                                    </div>
                                    <small class="text-muted">{$review.created_at|date_format:"%d.%m.%Y"}</small>
                                </div>

                                <!-- Рейтинг -->
                                <div class="mb-2">
                                    {assign var="full" value=$review.rating|floor}
                                    {if $review.rating - $full >= 0.5}
                                        {assign var="half" value=1}
                                    {else}
                                        {assign var="half" value=0}
                                    {/if}
                                    {assign var="empty" value=5-$full-$half}
                                    {section name=i loop=$full}<i class="bi bi-star-fill text-warning"></i>{/section}
                                    {section name=i loop=$half}<i class="bi bi-star-half text-warning"></i>{/section}
                                    {section name=i loop=$empty}<i class="bi bi-star text-warning"></i>{/section}
                                </div>

                                <div class="text-muted lh-base">{$review.review_text}</div>
                            </div>
                        {/foreach}
                    {else}
                        <p class="text-muted">Пока нет отзывов. Станьте первым!</p>
                    {/if}
                </div>
            </div>

            <div class="tab-pane fade" id="coupons" role="tabpanel">
                <div class="row g-3">
                    {if !empty($shop.coupons)}
                        {foreach from=$shop.coupons item=coupon}
                            <div class="col-6 col-md-4 col-lg-3">
                                <div class="card border-0 shadow-sm text-center p-4">
                                    <div class="fw-bold fs-4 text-dark mb-2">
                                        {if $coupon.discount_type == 'percent'}
                                            -{$coupon.discount_value}%
                                        {else}
                                            {$coupon.discount_value}₽
                                        {/if}

                                    </div>
                                    <p class="text-muted small mb-1">{if $coupon.end_date}{$coupon.end_date|date_format:"%d.%m.%Y"}{/if}</p>
                                    <p class="small text-truncate mb-2">{$coupon.description}</p>
                                    <div class="bg-light rounded py-1 px-2 mb-2 fw-semibold">Код: <span class="text-dark">{$coupon.code}</span></div>
                                    <button class="btn btn-outline-dark btn-sm">Использовать</button>
                                </div>
                            </div>
                        {/foreach}

                    {else}

                        Купонов пока нет!

                    {/if}
                </div>
            </div>

            <div class="tab-pane fade" id="about" role="tabpanel">
                <div class="p-4 bg-white border rounded-4 shadow-sm">
                    <h4 class="fw-bold mb-3">О магазине</h4>
                    <p>{$shop.description|default:"Описание магазина пока отсутствует."}</p>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{$theme}/assets/js/modules/shop/product-page.js"></script>