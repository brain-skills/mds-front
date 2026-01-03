$(document).ready(function() {

    document.querySelectorAll('.uniqNamePayment').forEach(el => {
        let uniqName = el.value;

        const priceInput = document.getElementById(uniqName+"-priceInput");
        const priceSpan = document.getElementById(uniqName+"-priceSpan");
        const currency = document.getElementById("currency").value;
        var payRedirectUrl = null;
        var widgetId = 0;

        if (priceInput) {
            priceInput.addEventListener("input", function () {
                $("#"+uniqName+"-priceInput").css("border", "var(--bs-border-width) solid var(--bs-border-color)")

                let value = this.value.trim();
                if (value === "") {
                    priceSpan.textContent = "0 " + currency;
                } else {
                    priceSpan.textContent = value + " " + currency;
                    if (payRedirectUrl) {
                        payRedirectUrl.href = "/?payment&price="+value+"&currency="+currency+"&action=redirect-payment&widget="+widgetId;
                    }
                }
            });
        }


        $.ajax({
            url: '/engine/ajax/lib/paymentWidget/payment_widget.php',
            type: 'POST',
            data: {
                uniq_name: uniqName
            },
            success: function (response) {
                let data = $.parseJSON(response);

                if (data.w_type == "subscription") {
                    $("."+uniqName+"-row").removeAttr("class")
                }

                if (data.btn_text != "" || data.btn_text != null) {
                    $("."+uniqName+"-payment-button").html(data.btn_text).attr("title", data.btn_text);
                }

                $("#"+uniqName+"-widget_id").val(data.id);
                widgetId = data.id;

                if (data.pay_with_redirect === 1 || data.pay_with_redirect === true) {
                    $("."+uniqName+"-payment-button").attr("id", uniqName+"-payRedirectUrl");
                    payRedirectUrl = document.getElementById(uniqName+"-payRedirectUrl");
                    if (payRedirectUrl) {
                        payRedirectUrl.href = "/?payment&price="+data.price+"&currency="+currency+"&action=redirect-payment&widget="+widgetId;
                    }

                    submitBtn = null;
                    $("."+uniqName+"-paymentslist").hide();
                } else {
                    $("."+uniqName+"-payment-button").attr("id", uniqName+"-submitBtn");
                    var submitBtn = document.getElementById(uniqName+"-submitBtn");

                    if (submitBtn) {
                        submitBtn.addEventListener("click", function(event) {
                            event.preventDefault(); // Отменяем стандартное поведение кнопки

                            if (submitBtn.href.indexOf("/registration") !== -1) {
                                window.location.href = submitBtn.href;
                                return;
                            }

                            let promocode = $("#"+uniqName+"-promocode").val();
                            document.getElementById("loadingOverlay").style.display = "flex"; // Показываем оверлей загрузки

                            var isValid = true;

                            if (priceInput.value === null || priceInput.value === undefined || priceInput.value == "0.00" || priceInput.value == "0" || priceInput.value == "") {
                                if (priceSpan.value === null || priceSpan.value === undefined || priceSpan.value == "0.00" || priceSpan.value == "0") {
                                    alert("Please enter correct sum");
                                    $("#"+uniqName+"-priceInput").css("border", "var(--bs-border-width) solid #e90a20")
                                    $('#loadingOverlay').hide();
                                    isValid = false;
                                }
                            }

                            if (!selectedValue) {
                                alert("Please select payment method");
                                $("."+uniqName+"-paymentslist").css("border", "var(--bs-border-width) solid #e90a20")
                                $('#loadingOverlay').hide();
                                isValid = false;
                            }

                            if (!isValid) {
                                return;
                            }

                            // AJAX запрос
                            $.ajax({
                                url: '/?promo/check',
                                method: 'POST',
                                data: {
                                    "promocode": promocode
                                },
                                success: function(response) {
                                    console.log('Ответ сервера:', response); // Выводим ответ сервера для отладки

                                    // В случае успешного ответа
                                    $('#loadingOverlay').hide(); // Скрываем оверлей
                                    // Дополнительная обработка данных ответа, если нужно
                                    document.getElementById(uniqName+"-paymentForm").submit(); // Отправляем форму
                                },
                                error: function(xhr, status, error) {

                                    console.log('Ошибка при отправке данных:', error);
                                    $('#loadingOverlay').hide(); // Скрываем оверлей в случае ошибки
                                }
                            });
                        });

                    }
                }

                if (!data.is_authed && data.settings.account_required == true) {
                    $("."+uniqName+"-payment-button").html("Log in for payment")
                    $("."+uniqName+"-payment-button").attr("href", "/registration");
                }
                if (data.disable_delivery === 1 || data.disable_delivery === true) {
                    $("#"+uniqName+"-deliveryBlock").remove();
                }
                if (data.disable_promo === 1 || data.disable_promo === true) {
                    $("#"+uniqName+"-promocode").remove();
                }
                if (data.disable_sum_input === 1 || data.disable_sum_input === true || data.price > 0) {
                    $("#"+uniqName+"-priceInput").remove();
                }
                if (data.price > 0 && data.disable_sum_input === 0 || data.price > 0 && data.disable_sum_input === false || data.disable_sum_input === false) {
                    if (data.discountedPrice != null) {

                        let discounted = "<s class='theme-text-color2 fs-7'>" +data.discountedPrice+ "</s> ";

                        $("#"+uniqName+"-priceSpan").html(discounted+data.price + ' ' + currency)

                    } else {
                        $("#"+uniqName+"-priceSpan").html(data.price + ' ' + currency)
                    }
                } else {
                    $("#"+uniqName+"-form-text").remove();
                }

                if (data.disable_title === 1 || data.disable_title === true) {
                    $("#"+uniqName+"-widget-title").remove();
                } else {
                    $("#"+uniqName+"-widget-title").html(data.name);
                }

                $("#"+uniqName+"-paymentForm").removeAttr("hidden");

            },
            error: function (xhr, status, error) {
                console.error('Ошибка:', error);
            }
        });


        var formDocument = document.getElementById(uniqName+"-paymentForm");
        var selectedValue;

        formDocument.querySelectorAll("."+uniqName+"-dropdown-item").forEach(item => {
            item.addEventListener('click', function (event) {
                event.preventDefault();
                selectedValue = this.getAttribute('data-value');
                const selectedLabel = this.getAttribute('data-label');
                const selectedIconClass = this.querySelector('i').className;
                document.getElementById(uniqName+'-selectedPaymentMethod').value = selectedValue;
                const dropdownButton = document.getElementById(uniqName+"-dropdownMenuButton");

                let selectedIconBlock = uniqName+'-selectedIcon';

                $("."+uniqName+"-paymentslist").css("border", "var(--bs-border-width) solid var(--bs-border-color)")


                dropdownButton.innerHTML = `
                        <span id="${selectedIconBlock}" class="me-2 ${selectedIconClass}"></span>
                        ${selectedLabel}
                    `;

            });
        });

        var deliveryCheckBox = document.getElementById(uniqName+'-deliveryCheckbox');

        if (deliveryCheckBox) {
            deliveryCheckBox.addEventListener('change', function () {
                const deliveryForm = document.getElementById(uniqName+'-deliveryForm');
                if (this.checked) {
                    deliveryForm.style.display = 'block';
                } else {
                    deliveryForm.style.display = 'none';
                }
            });
        }

    })


});