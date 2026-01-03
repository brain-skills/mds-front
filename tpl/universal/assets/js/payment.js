const priceInput = document.getElementById("priceInput");
const priceSpan = document.getElementById("priceSpan");
const currency = document.getElementById("currency").value;
const payRedirectUrl = document.getElementById("payRedirectUrl");
const widgetId = document.getElementById("widget_id").value;
let sum = priceInput != null ? priceInput.value : 0;


if (payRedirectUrl) {
    payRedirectUrl.href = "/?payment&price="+sum+"&currency="+currency+"&action=redirect-payment&widget="+widgetId.trim();
}

if (priceInput) {
    priceInput.addEventListener("input", function () {

        let value = this.value.trim();
        if (value === "") {
            priceSpan.textContent = "Введите сумму";
        } else {
            priceSpan.textContent = "Сумма " + value + " " + currency;
            if (payRedirectUrl) {
                payRedirectUrl.href = "/?payment&price="+value+"&currency="+currency+"&action=redirect-payment&widget="+widgetId.trim();
            }
        }
    });
}


var submitBtn = document.getElementById("submitBtn");

if (submitBtn) {
    submitBtn.addEventListener("click", function(event) {
        debugger;
        event.preventDefault(); // Отменяем стандартное поведение кнопки
        let promocode = $("#promocode").val();
        document.getElementById("loadingOverlay").style.display = "flex"; // Показываем оверлей загрузки

        if (priceInput.value === null || priceInput.value === undefined || priceInput.value == "0.00" || priceInput.value == "0") {
            if (priceSpan.value === null || priceInput.value === undefined || priceInput.value == "0.00" || priceInput.value == "0") {
                alert("Please enter correct sum");
                $('#loadingOverlay').hide();
                return;
            }
        }

        if (!selectedValue) {
            alert("Please select payment method");
            $('#loadingOverlay').hide();
            return;
        }

        if ($("#email").val() == "") {
            alert("Email input required");
            $('#loadingOverlay').hide();
            return;
        }

        let doBalanceCheck = $('#additionalPayBalance').is(':checked');

        // Если чекбокс включён → сначала проверяем баланс
        if (doBalanceCheck) {

            $.ajax({
                url: '/engine/ajax/lib/transactions/check_balance.php',
                method: 'POST',
                data: {
                    paySum: $("#balancePaySum").val(),
                    currency: $("#currency").val()
                },
                dataType: 'json',
                success: function(response) {
                    debugger;

                    if (!response.success) {
                        alert(response.message);
                        $('#loadingOverlay').hide();
                        return;
                    }

                    // баланс прошёл → проверяем промокод
                    checkPromoAndSubmit(promocode);
                },
                error: function() {
                    console.log("Ошибка проверки баланса");
                    $('#loadingOverlay').hide();
                }
            });

        } else {
            // Чекбокс выключен → сразу проверка промокода
            checkPromoAndSubmit(promocode);
        }

    });

}

function checkPromoAndSubmit(promocode) {

    $.ajax({
        url: '/?promo/check',
        method: 'POST',
        data: {promocode: promocode},
        success: function(response) {
            console.log('Промо-ответ:', response);

            // Если нужно — добавь проверку
            // if (!response.ok) return;

            document.getElementById("paymentForm").submit();
            $('#loadingOverlay').hide();
        },
        error: function() {
            console.log("Ошибка промокода");
            $('#loadingOverlay').hide();
        }
    });
}


var formDocument = document.getElementById("paymentForm");
var selectedValue;

/*        formDocument.querySelectorAll('.payment_method').forEach(item => {
            item.addEventListener('click', function (event) {
                debugger;
                event.preventDefault();
                selectedValue = this.getAttribute('data-value');
                const selectedLabel = this.getAttribute('data-label');
                const selectedIconClass = this.querySelector('i').className;
                document.getElementById('selectedPaymentMethod').value = selectedValue;
                const dropdownButton = document.getElementById('dropdownMenuButton');
                dropdownButton.innerHTML = `
                    <span id="selectedIcon" class="me-2 ${selectedIconClass}"></span>
                    ${selectedLabel}
                `;
            });
        });*/

var deliveryCheckBox = document.getElementById('deliveryCheckbox');

if (deliveryCheckBox) {
    deliveryCheckBox.addEventListener('change', function () {
        const deliveryForm = document.getElementById('deliveryForm');
        if (this.checked) {
            deliveryForm.style.display = 'block';
        } else {
            deliveryForm.style.display = 'none';
        }
    });
}

$(document).on('change', '#additionalPayBalance', function () {
    if ($(this).is(':checked')) {
        $('#balancePaySum').removeClass('hidden');
    } else {
        $('#balancePaySum').addClass('hidden').val('');
    }

});

$(document).on('input', '#balancePaySum', function () {
    let val = parseFloat($(this).val());

    if (isNaN(val) || val < 0) {
        $(this).val('');
        return;
    }

    if (val > sum) {
        $(this).val(sum); // Автоматически ограничиваем
    }
});
$(document).on("click", ".payment-toggle", function (e) {
    e.preventDefault(); // чтобы label не триггерил двойной клик

    const parent = $(this).closest(".pay-method");
    selectedValue = $(this).data("method");
    document.getElementById('selectedPaymentMethod').value = selectedValue;

    // убираем active у всех
    $(".payment-toggle").removeClass("active");

    // добавляем только текущему
    $(this).addClass("active");

    // закрываем другие
    $(".pay-method .pay-collapse").not(parent.find(".pay-collapse")).slideUp(150);

    // открываем текущий
    parent.find(".pay-collapse").slideToggle(150);

    // выбираем радио
    parent.find("input[type=radio]").prop("checked", true);
});


function recalcBonus() {
    let price = parseFloat($(".price-input").val());
    if (isNaN(price) || price <= 0) {
        $(".bonus-output, .final-output").hide();
        return;
    }

    // проверяем активный бонус
    let active = $(".bonus-item.active");
    let error = validateBonus(active, price);

    if (error) {
        $(".bonus-error").text(error).show();
        $(".bonus-output, .final-output").hide();
        return;
    }

    $(".bonus-error").hide();

    // коррекция суммы
    let percent = active.data("percent");
    let bonus = price * (percent / 100);

// теперь наоборот:
    let finalPrice = price + bonus;

    $(".bonus-amount").val(bonus.toFixed(2));
    $(".final-price").val(finalPrice.toFixed(2));
    $("#bonused_sum").val(finalPrice.toFixed(2));


    $(".bonus-output, .final-output").show();
}

$(document).on("click", ".bonus-item", function () {
    debugger;
    const id = $(this).data("id");
    const action = $("#action").val();
    $("#bon_id").val(id);

    let price;
    if (action === "balance") {
        price = parseFloat($(this).data("min"));
        $(".price-input").val(price);
    } else {
        price = parseFloat($(".price-input").val());
        if (isNaN(price) || price <= 0) return;
    }

    let error = validateBonus($(this), price);
    if (error) {
        $(".bonus-error").text(error).show();
        return;
    }

    $(".bonus-error").hide();
    $(".bonus-item").removeClass("active");
    $(this).addClass("active");

    recalcBonus();
});

// изменение суммы
$(document).on("input", ".price-input", function () {
    recalcBonus();
});


// первичный расчёт
recalcBonus();

function validateBonus(item, price) {
    let min = parseFloat(item.data("min"));
    let left = parseInt(item.data("left"));

    if (left <= 0) {
        return "Бонус больше недоступен";
    }

    if (price < min) {
        return "Минимальная сумма для этого бонуса: " + min;
    }

    return null;
}