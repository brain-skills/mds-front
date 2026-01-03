    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        debugger;
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = this.dataset.productId;
            addToCart(this, productId);
        });
    });

    function addToCart(button, productId) {
        debugger;
        button.disabled = true;

        const icon = button.querySelector('.btn-icon');

        icon.classList.add('d-none');

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
                alert("Ошибка добавления");
            }
        });
    }


    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    document.querySelector('#mainImage').addEventListener('click', () => {
        lightboxImg.src = document.querySelector('#mainImage').src;
        lightbox.style.display = 'flex';
    });
    document.querySelectorAll('#thumbs img').forEach(img => {
        img.addEventListener('click', () => {
            document.querySelector('#mainImage').src = img.src;
            document.querySelectorAll('#thumbs img').forEach(i => i.classList.remove('active'));
            img.classList.add('active');
        });
        img.addEventListener('dblclick', () => {
            lightboxImg.src = img.src;
            lightbox.style.display = 'flex';
        });
    });
    lightboxClose.addEventListener('click', () => lightbox.style.display = 'none');
    lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.style.display = 'none'; });
    const copyBtn = document.querySelector('.copy-btn');
    const skuEl = document.getElementById('sku');
    copyBtn.addEventListener('click', () => {
        const text = skuEl.innerText;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        }
        const original = copyBtn.innerText;
        copyBtn.innerText = 'Скопировано!';
        copyBtn.style.color = 'green';
        setTimeout(() => {
            copyBtn.innerText = original;
            copyBtn.style.color = '#0d6efd';
        }, 1000);
    });