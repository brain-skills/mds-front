<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slider-pro/1.5.0/css/slider-pro.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/slider-pro/1.5.0/js/jquery.sliderPro.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/plyr@3.7.8/dist/plyr.css" />
<script src="https://cdn.jsdelivr.net/npm/plyr@3.7.8/dist/plyr.min.js"></script>
<link rel="stylesheet" href="{$theme}/assets/css/modules/shop/shop-page.css">


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
        <div class="container">
            <div class="card mb-5 shadow-sm border-0 position-relative">
                <button onclick="window.location.href = '/?cart'" type="button"
                        class="btn btn-light border p-2 shadow-sm position-absolute top-0 end-0 m-3 hover-scale"
                        title="Корзина"
                        aria-controls="cartSidebar">
                    <i class="bi bi-cart3 fs-5 text-dark"></i>
                    <span id="cartCountBadge"
                          class="position-absolute top-0 start-100 translate-middle badge bg-danger"
                          style="font-size: 0.7rem;">
                    {$cartProductCount}
                </span>
                </button>

                <div class="row">
                    {if !empty($shop.shop_images)}
                        <div class="col-6 height-10">
                            <div id="media-slider" class="slider-pro" style="height: 70%">
                                <div class="sp-slides"></div>
                                <div class="sp-thumbnails"></div>
                            </div>

                        </div>
                        {else}
                    {/if}

                    <div class="{if !empty($shop.shop_images)}col-6{else}col-12{/if}">
                        <div class="d-flex flex-column flex-md-row align-items-center gap-4">
                            <div class="flex-grow-1">
                                <h2 class="fw-bold mb-1">{$shop.shop_name} <img src="{$shop.main_image}" width="100" class="rounded-circle shadow-sm" alt="shop" /></h2>

                                <div class="text-muted small mb-2">Работает начиная с {$shop.created_at}</div>
                                <p class="mb-2"><span class="text-muted">Категории магазина:</span>
                                    {assign var='categoryAltNames' value=','|explode:$shop.category_alt_names}
                                    {foreach $categories as $index => $category}
                                        {if $index > 0}, {/if}<a target="_blank" href="/shops/products?category={$category.id}&sort=date">{$category.name}</a>
                                    {/foreach}
                                </p>
                                <div class="d-flex flex-wrap gap-3 align-items-center">
                                    <div class="shop-rating mb-2 d-flex align-items-center gap-2">
                                        {section name=i loop=floor($shopRating.average)}<i style="font-size: 20px" class="bi bi-star-fill text-warning"></i>{/section}
                                        {if ($shopRating.average - floor($shopRating.average)) >= 0.5}
                                            <i style="font-size: 20px" class="bi bi-star-half text-warning"></i>
                                        {/if}
                                        <small class="text-muted">{$shopRating.average} / 5 ({$shopRating.votes} голосов)</small>
                                    </div>
                                    <span class="badge bg-secondary">📦 {count($shopProducts)} товаров</span>
                                    <span class="badge bg-secondary">👥 0 покупателей</span>
                                </div>

                                {if $shop.is_owner}
                                    <div class="mt-3 d-flex flex-wrap gap-2">
                                        <a href="/admin?action=modules/shops/add_product&shop_id={$shop.shop_id}" class="btn btn-dark btn-sm">Добавить товар</a>
                                        <a href="/admin?action=modules/shops/edit&id={$shop.shop_id}" class="btn btn-outline-dark btn-sm">Редактировать магазин</a>
                                    </div>
                                {/if}

                                {include file="../../extensions/page-qr-sharing.tpl" module="shops"}

                            </div>
                        </div>

                    </div>

                </div>

            </div>


            <div class="border-bottom mb-4 pb-2">
                <ul class="nav justify-content-center nav-pills mb-3" id="shopTabs" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="tab-products" data-bs-toggle="tab" href="#products" role="tab">🛒 Товары</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="tab-co-buyings" data-bs-toggle="tab" href="#co-buyings" role="tab">🤝 Совместные покупки</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="tab-coupons" data-bs-toggle="tab" href="#coupons" role="tab">🎟 Купоны</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="tab-about" data-bs-toggle="tab" href="#about" role="tab">О нас</a>
                    </li>
                </ul>

            </div>

            <div class="tab-content" id="shopTabsContent">
                <div class="tab-pane fade show active" id="products" role="tabpanel">
                    <div class="row g-4 py-4">
                        {if !empty($shopProducts)}
                            {foreach from=$shopProducts item=shopProduct}
                                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                                    <article class="product-card h-100 position-relative">
                                        <div class="position-relative">
                                            {if $shopProduct.discount > 0}
                                                <div class="discount-badge">-{$shopProduct.discount}%</div>
                                            {/if}

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
                                                    <a href="/shops/{$shop.slug}" class="text-decoration-none fw-semibold text-dark">
                                                        {$shop.shop_name}
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
                                                        class="btn btn-light btn-sm border p-2 shadow-sm hover-scale position-relative btn-add-to-cart"
                                                        data-product-id="{$shopProduct.id}"
                                                        title="Добавить в корзину"
                                                        data-bs-target="#cartSidebar"
                                                        aria-controls="cartSidebar">

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
                </div>
                <div class="tab-pane fade" id="coupons" role="tabpanel">
                    {if $shop.is_owner}
                    <button type="button" class="btn btn-success mb-3" {*data-bs-toggle="modal" data-bs-target="#couponModal"*} id="addCouponBtn">
                        Добавить купон
                    </button>
                    {/if}
                    <div class="row g-4">
                        <div id="couponCardTemplate" class="col-6 col-md-4 col-lg-3 d-none">
                            <div class="card border-0 shadow-sm text-center p-4">
                                <div class="fw-bold fs-4 text-dark mb-2 coupon-discount"></div>
                                <p class="text-muted small mb-1 coupon-date"></p>
                                <p class="small text-truncate mb-2 coupon-desc"></p>
                                <div class="bg-light rounded py-1 px-2 mb-2 fw-semibold">Код: <span class="text-dark coupon-code"></span></div>
                                <button class="btn btn-outline-dark btn-sm coupon-use-btn">Использовать</button>
                            </div>
                        </div>

                        <div class="row g-4" id="couponsContainer">
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

                                <p class="empty_coupons">Купонов пока нет!</p>

                            {/if}

                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="co-buyings" role="tabpanel">
                    {if $shop.is_owner}
                        <div class="mb-4">
                            <button class="btn btn-success" id="addCoBuying">
                                Добавить совместную покупку
                            </button>
                        </div>
                    {/if}
                    <div class="row g-4 py-4">
                        {if !empty($coBuyings)}
                            {foreach from=$coBuyings item=cb}
                                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                                    <div class="card h-100 shadow-sm border-0 p-3">
                                        <h5 class="fw-bold mb-2">{$cb.product_title}</h5>
                                        <p>Цена: {$cb.product_price} {$currency}</p>

                                        <div class="progress mb-2" style="height: 20px;">
                                            <div class="progress-bar bg-success" role="progressbar" style="width: {$cb.progress}%;" aria-valuenow="{$cb.progress}" aria-valuemin="0" aria-valuemax="100">
                                                {$cb.progress}%
                                            </div>
                                        </div>
                                        <p>{$cb.current_amount} из {$cb.goal_amount}</p>

                                        <!-- Кнопка для просмотра участников -->
                                        {if !empty($cb.participants)}
                                            <button class="btn btn-sm btn-outline-primary mb-2" type="button" data-bs-toggle="collapse" data-bs-target="#participants-{$cb.id}">
                                                Участники ({count($cb.participants)})
                                            </button>
                                            <div class="collapse" id="participants-{$cb.id}">
                                                <ul class="list-group list-group-flush mt-2">
                                                    {foreach $cb.participants as $p}
                                                        <li class="list-group-item d-flex justify-content-between">
                                                            {$p.user_name}
                                                            <span>{$p.paid_amount} {$currency}</span>
                                                        </li>
                                                    {/foreach}
                                                </ul>
                                            </div>
                                        {/if}

                                        {if $shop.is_owner}
                                            <span class="badge bg-primary">Вы владелец</span>
                                        {else}
                                            {if $cb.status == 'active'}
                                                <button class="btn btn-sm btn-success join-co-buy" data-coid="{$cb.id}">Участвовать</button>
                                            {else}
                                                <span class="badge bg-secondary">Закрыто</span>
                                            {/if}
                                        {/if}

                                    </div>
                                </div>
                            {/foreach}
                        {else}
                            <div class="col-12 text-center text-muted py-5">Совместных покупок пока нет</div>
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
</div>

<div class="modal fade" id="couponModal" tabindex="-1" aria-labelledby="couponModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form id="couponForm" class="needs-validation" novalidate>
                <div class="modal-header">
                    <h5 class="modal-title" id="couponModalLabel">Добавить купон</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="shop_id" id="shop_id" value="{$shop.shop_id}">

                    <input type="hidden" name="id" id="coupon_id" value="">

                    <div class="mb-3">
                        <label for="code" class="form-label">Код купона</label>
                        <input type="text" class="form-control" id="code" name="code" required>
                        <div class="invalid-feedback">Введите код купона</div>
                    </div>

                    <div class="mb-3">
                        <label for="description" class="form-label">Описание</label>
                        <textarea class="form-control" id="description" name="description" rows="2"></textarea>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label for="discount_type" class="form-label">Тип скидки</label>
                            <select class="form-select" id="discount_type" name="discount_type" required>
                                <option value="percent">Процент</option>
                                <option value="fixed">Фиксированная сумма</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="discount_value" class="form-label">Скидка</label>
                            <input type="number" class="form-control" id="discount_value" name="discount_value" step="0.01" min="0" required>
                            <div class="invalid-feedback">Введите значение скидки</div>
                        </div>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label for="min_order_amount" class="form-label">Минимальная сумма заказа</label>
                            <input type="number" class="form-control" id="min_order_amount" name="min_order_amount" step="0.01" min="0">
                        </div>
                        <div class="col-md-6">
                            <label for="max_uses" class="form-label">Максимум использований</label>
                            <input type="number" class="form-control" id="max_uses" name="max_uses" min="0">
                        </div>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label for="start_date" class="form-label">Начало действия</label>
                            <input type="datetime-local" class="form-control" id="start_date" name="start_date">
                        </div>
                        <div class="col-md-6">
                            <label for="end_date" class="form-label">Окончание действия</label>
                            <input type="datetime-local" class="form-control" id="end_date" name="end_date">
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                    <button type="submit" class="btn btn-primary">Сохранить</button>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="modal fade" id="addCoBuyingModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form id="coBuyingForm" class="needs-validation" novalidate>
                <div class="modal-header">
                    <h5 class="modal-title">Добавить совместную покупку</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="shop_id" value="{$shop.shop_id}">
                    <div class="mb-3">
                        <label class="form-label">Выберите товар</label>
                        <select class="form-select" name="product_id" required>
                            {foreach from=$shopProducts item=prod}
                                <option value="{$prod.id}">{$prod.name} - {$prod.price} {$currency}</option>
                            {/foreach}
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Минимальное количество участников</label>
                        <input type="number" name="min_participants" class="form-control" min="1" value="1">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Максимальное количество участников</label>
                        <input type="number" name="max_participants" class="form-control" min="1" placeholder="Не ограничено">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Цель по сумме</label>
                        <input type="number" name="goal_amount" class="form-control" step="0.01" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Дата окончания</label>
                        <input type="datetime-local" name="date_end" class="form-control">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                    <button type="submit" class="btn btn-primary">Создать</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="{$theme}/assets/js/modules/shop/shop-page.js"></script>