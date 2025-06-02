<div class="card py-3 px-3">
    <div class="row">
        <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mb-2">
            <img class="img-responsive" src="../../{$product.image}" alt="" style="min-height: 210px;">
            <form class="add-to-cart-form mt-3">
                <div class="input-group mb-3">
                    <input class="form-control" type="hidden" name="product_id" value="{$product.id}">
                    <input class="form-control" type="number" name="quantity" value="1" min="1">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary add-to-cart-btn" type="submit">Добавить в корзину</button>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8 mb-2">
            <span class="float-end"><i class="fa fa-eye"></i> {$product.views}</span>
            <h4 class="fs-5">{$product.title}</h4>
            <p class="mb-2"><span class="text-muted">Категории:</span>
                {assign var='categoryAltNames' value=','|explode:$product.category_alt_names}
                {foreach $categories as $index => $category}
                    {if $index > 0}, {/if}<a href="/pc/{$categoryAltNames[$index]|default:''|escape:'url'}">{$category}</a>
                {/foreach}
            </p>
            <div class="row">
                <div class="col-6">
                    <p class="mb-2"><span class="text-muted">Бренд:</span> {$product.brand}</p>
                    <p class="mb-2"><span class="text-muted">Модель:</span> {$product.model}</p>
                    <p class="mb-2"><span class="text-muted">Артикул:</span> {$product.sku}</p>
                    <p class="mb-2"><span class="text-muted">Минимальный заказ:</span> {$product.min_order}.{$product.measure_unit}</p>
                    <p class="mb-2"><span class="text-muted">В наличии:</span> {$product.stock_quantity} {$product.measure_unit}</p>
                    <p class="mb-2"><span class="text-muted">Цена:</span> {$product.converted_price} {$currentCurrency}</p>
                </div>
                <div class="col-6">
                    <p class="mb-2"><span class="text-muted">Вес:</span> {$product.mass}</p>
                    <p class="mb-2"><span class="text-muted">Цвет:</span> {$product.color}</p>
                    <p class="mb-2"><span class="text-danger">Гарантия:</span> {$product.warranty}</p>
                    <p class="mb-2"><span class="text-muted">Скидка:</span> {$product.discount}</p>
                    <p class="mb-2"><span class="text-muted">Акции:</span> {$product.promotion}</p>
                    <p class="mb-2"><span class="text-muted">Отзывов:</span> {$product.comments_numb}</p>
                </div>
            </div>
        </div>
        <div class="col-12">
            <pre class="bg-dark text-light px-2 py-2">{$product.short_desc}</pre>
            <pre class="bg-dark text-light px-2 py-2">{$product.full_desc}</pre>
        </div>
        <div class="col-12 mt-3">
            <h5>Комментарии:</h5>
            {include file='main/comments.tpl' comments=$comments products=$products}
        </div>
    </div>
</div>
<script>
    document.addEventListener('submit', function (event) {
        if (event.target.classList.contains('add-to-cart-form')) {
            event.preventDefault();
            var form = event.target;
            var product_id = form.querySelector('input[name="product_id"]').value;
            var quantity = form.querySelector('input[name="quantity"]').value;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'cart.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    location.reload(); // Обновление страницы после добавления товара
                }
            };
            xhr.send('add_to_cart=1&product_id=' + encodeURIComponent(product_id) + '&quantity=' + encodeURIComponent(quantity));
        }
    });
</script>