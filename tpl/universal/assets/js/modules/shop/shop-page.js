$(document).ready(function(){

    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = this.dataset.productId;
            addToCart(this, productId);
        });
    });

    function addToCart(button, productId) {
        button.disabled = true;

        const icon = button.querySelector('.btn-icon');
        const spinner = button.querySelector('.spinner-border');

        icon.classList.add('d-none');
        spinner.classList.remove('d-none');

        $.ajax({
            type: 'POST',
            url: 'cart.php',
            data: {
                add_to_cart: 1,
                product_id: productId,
                quantity: 1,
                type: "shop_product"
            },
            dataType: 'json',
            success: function(response) {
                $("#cartCountBadge").html(response.productCount);
                button.disabled = false;
                icon.classList.remove('d-none');
                spinner.classList.add('d-none');

                const toastEl = document.getElementById('cartToast');
                const toast = new bootstrap.Toast(toastEl);
                toast.show();

                const cartCount = document.getElementById('cartCount');
                if (cartCount) {
                    cartCount.innerText = parseInt(cartCount.innerText) + 1;
                }
            },
            error: function() {
                button.disabled = false;
                icon.classList.remove('d-none');
                spinner.classList.add('d-none');
                alert("Ошибка добавления");
            }
        });
    }

    $.getJSON('/engine/ajax/lib/slides/shop_slides.php', {
        shop_id: $("#shop_id").val()
    }, function(slides) {

        var slidesContainer = $('#media-slider .sp-slides');
        var thumbsContainer = $('#media-slider .sp-thumbnails');

        slides.forEach((item, index) => {

            if (item.type === 'image') {
                slidesContainer.append(`
                    <div class="sp-slide">
                        <img class="sp-image" src="${item.src}">
                    </div>
                `);
            }

            if(item.type === 'video'){
                slidesContainer.append(`
                <div class="sp-slide" id="video-slide-${index}">
                    <video controls preload="metadata">
                        <source src="${item.src}" type="video/mp4">
                    </video>
                </div>
            `);

                //thumbsContainer.append(`<img class="sp-thumbnail" src="${item.thumb ?? '/images/video-placeholder.jpg'}">`);
            }

            thumbsContainer.append(`
                <img class="sp-thumbnail" src="${item.thumb}">
            `);
        });

        const slider = $('#media-slider').sliderPro({
            width: '100%',
            height: 350,
            arrows: true,
            buttons: false,
            thumbnailsPosition: 'bottom',
            thumbnailWidth: 120,
            thumbnailHeight: 80,
            autoplay: true,
            autoplayDelay: 5000,
            loop: true,
            init: function() {
                // инициализируем Plyr только один раз для всех видео
                $('#media-slider .sp-video').each(function(){
                    const player = new Plyr(this, {muted: true, autoplay: false, controls: ['play','progress','mute','volume','fullscreen']});
                    players.push(player);
                });
            }
        });

        // событие смены слайда
        slider.on('sliderProSlideChange', function(event, index){
            players.forEach(p => p.pause()); // остановить все

            const videoEl = $(this).find('.sp-slide').eq(index).find('video')[0];
            if(videoEl){
                videoEl.muted = true;  // обязательно, иначе автоплей не сработает
                const player = players.find(p => p.elements[0] === videoEl);
                if(player) player.play();
            }
        });


        // модалка для фото
        $(document).on("click", ".full-open", function() {
            $("#fullImageView").attr("src", $(this).data("full"));
            $("#fullImageModal").modal("show");
        });


    });

    $(document).on('submit', '#couponForm', function(e){
        e.preventDefault();
        if(!this.checkValidity()) { this.classList.add('was-validated'); return; }

        $.post('/engine/ajax/lib/shop/save_coupon.php', $(this).serialize(), function(resp){
            if(resp.success){
                let c = resp.data;
                let $template = $('#couponCardTemplate').clone().removeAttr('id').removeClass('d-none').attr('data-id', c.id);

                $template.find('.coupon-discount').text(c.discount_type=='percent' ? '-'+c.discount_value+'%' : c.discount_value+'₽');
                $template.find('.coupon-date').text(c.end_date ? c.end_date.split(' ')[0].split('-').reverse().join('.') : '');
                $template.find('.coupon-desc').text(c.description);
                $template.find('.coupon-code').text(c.code);

                let existing = $('#couponsContainer').find('[data-id="'+c.id+'"]');
                if(existing.length){
                    existing.replaceWith($template);
                } else {
                    $('#couponsContainer').prepend($template);
                }

                $(".empty_coupons").addClass("hidden");

                $('#couponModal').modal('hide');
            } else {
                alert('Ошибка: '+resp.message);
            }
        }, 'json');
    });

    $(document).on('click', '.join-co-buy', function() {
        let coId = $(this).data('coid');
        let amount = prompt("Введите сумму участия:");

        if(amount && !isNaN(amount) && amount > 0) {
            $.post('/engine/ajax/lib/co_buyings/join.php', {co_id: coId, amount: amount}, function(res) {
                let data = JSON.parse(res);
                if(data.success) {
                    alert('Вы успешно участвовали!');
                    location.reload();
                } else {
                    alert('Ошибка: ' + data.error);
                }
            });
        }
    });


    $('#coBuyingForm').on('submit', function(e){
        e.preventDefault();
        debugger;
        $.post('/engine/ajax/lib/co_buyings/add.php', $(this).serialize(), function(res){
            debugger;
            let data = JSON.parse(res);
            if(data.success){
                alert('Совместная покупка создана!');
                location.reload();
            } else {
                alert('Ошибка: ' + data.message);
            }
        });
    });


    $('#addCouponBtn').click(function(){
        debugger;
        var modal = new bootstrap.Modal(document.getElementById('couponModal'));
        modal.show();

        $(".modal-backdrop").removeClass("modal-backdrop");

        $('#couponForm')[0].reset();
        $('#coupon_id').val('');
        $('#couponModalLabel').text('Добавить купон');
    });

    $('#addCoBuying').click(function(){
        debugger;
        var modal = new bootstrap.Modal(document.getElementById('addCoBuyingModal'));
        modal.show();

        $(".modal-backdrop").removeClass("modal-backdrop");

        $('#coBuyingForm')[0].reset();
        $('#coupon_id').val('');
    });

    $('.editCouponBtn').click(function(){
        var couponId = $(this).data('id');
        $.ajax({
            url: '/admin/get_coupon.php',
            type: 'GET',
            data: {id: couponId},
            dataType: 'json',
            success: function(res){
                if(res.success){
                    $('#coupon_id').val(res.data.id);
                    $('#code').val(res.data.code);
                    $('#description').val(res.data.description);
                    $('#discount_type').val(res.data.discount_type);
                    $('#discount_value').val(res.data.discount_value);
                    $('#min_order_amount').val(res.data.min_order_amount);
                    $('#max_uses').val(res.data.max_uses);
                    $('#start_date').val(res.data.start_date);
                    $('#end_date').val(res.data.end_date);
                    $('#active').prop('checked', res.data.active==1);
                    $('#couponModalLabel').text('Редактировать купон');
                    $('#couponModal').modal('show');
                }
            }
        });
    });

    (function () {
        'use strict'
        var forms = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(forms).forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                } else {
                    event.preventDefault();
                    var formData = $('#couponForm').serialize();
                    $.post('/admin/save_coupon.php', formData, function(resp){
                        if(resp.success){
                            location.reload();
                        } else {
                            alert('Ошибка: ' + resp.message);
                        }
                    }, 'json');
                }
                form.classList.add('was-validated')
            }, false)
        })
    })()

});