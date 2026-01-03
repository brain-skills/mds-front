<div class="container my-5" id="wallet">
    <div class="row justify-content-center">
        <!-- Баланс пользователя -->
        <div class="col-12 col-md-12">
            <div class="card shadow-lg rounded-lg border-0">
              {*  <div class="card-header text-center p-4">
                    <h4>{$lang.widgets.balance}</h4>
                </div>*}
                <div class="card-body">
                    <h2 class="display-5">
                        {$balance} <span class="text-muted"> {$currency}

                            {if !empty($dolarAmount)}
                                <small style="font-size: 15px"> ≈ ${$dolarAmount}</small>
                            {/if}


                            {if !empty($euroAmount)}
                                <small style="font-size: 15px"> ≈ €{$euroAmount}</small>

                            {/if}

                        </span>
                    </h2>
                    {if !empty($balanceHolds)}

                        <p style="font-size: 12px; display: flex; color: #6c0202; align-items: center; gap: 8px;">
                            Замороженные средства: {$balanceHolds}  {$currency}
                            <span
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Средства, замороженные при покупке товара, с целью предотвращения мошенничества и обеспечения безопасности пользователя."
                                    style="cursor: pointer;"
                            >
                                <i class="bi bi-question-circle"></i>
                            </span>
                        </p>
                    {/if}

                    <p style="font-size: 12px; display: flex; align-items: center; gap: 8px;">
                        Бонусный баланс: {$userBonusBalance}  {$currency}
                        <span
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Бонусный баланс предназначен для оплаты товаров и услуг на сайте и не подлежит выводу."
                                style="cursor: pointer;"
                        >
                            <i class="bi bi-question-circle"></i>
                        </span>
                    </p>


                    <p class="lead text-muted">{$lang.profile.update_your_balance_text}</p>

                    <!-- Кнопка пополнения баланса -->
                    <button class="btn btn-success btn-lg mt-4" id="topUpButton">{$lang.profile.deposit}</button>

                    <button class="btn btn-success btn-lg mt-4" id="withdrawBtn">{$lang.profile.withdraw}</button>

                    <!-- Форма для пополнения баланса (скрыта по умолчанию) -->
                    <div id="topUpForm" class="mt-5" style="display: none;">
                     {*   <form action="/?payment/checkout" method="POST">
                            <div class="row">
                                <div class="col-12">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <h5 class="mb-0">Способ оплаты</h5>
                                        <span>за 1 шт.</span>
                                    </div>
                                    <div class="dropdown paymentslist">
                                        <span class="form-select dropdown-toggle d-flex align-items-center" id="dropdownMenuButton"
                                              data-bs-toggle="dropdown" aria-expanded="false">
                                            <span id="selectedIcon" class="me-2"></span> {$lang.paymentsection.noawaypaymethod}
                                        </span>
                                        <input type="hidden" name="payment_method" id="selectedPaymentMethod">
                                        <ul class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
                                            {if $payment_configs["stripe"]["enabled"] == true}
                                                <li>
                                                    <a class="dropdown-items d-flex justify-content-between align-items-center" href="#" data-value="stripe" data-label="Stripe">
                                                        <span class="d-flex align-items-center">
                                                            <i class="stripe me-3"></i> Stripe
                                                        </span>
                                                        <span class="d-flex align-items-center fw-bold">10.00 $</span>
                                                    </a>
                                                </li>
                                            {/if}

                                            {if $payment_configs["coinbase"]["enabled"] == true}
                                                <li>
                                                    <a class="dropdown-items d-flex justify-content-between align-items-center" href="#" data-value="coinbase" data-label="Coinbase">
                                                        <span class="d-flex align-items-center">
                                                            <i class="coinbase me-3"></i> Coinbase
                                                        </span>
                                                        <span class="d-flex align-items-center fw-bold">0.00025 ₿</span>
                                                    </a>
                                                </li>
                                            {/if}
                                        </ul>
                                    </div><br>

                                    <label for="amount" class="form-label">{$lang.paymentsection.inputsum}</label>
                                    <input type="number" class="form-control" id="amount" name="price" placeholder="{$lang.paymentsection.inputsum}" required>
                                    </div>
                            </div>*}
                             {include file="./payment/payment.tpl"}

                            <!-- Скрытое поле для валюты -->
                            <input type="text" hidden name="currency" value="{$currency}">
                            <input type="text" hidden name="action" value="balance">

{*
                            <button type="submit" class="btn btn-primary mt-3" title="Перейти к оформлению заказа">Proceed to checkout</button>
*}
                        </form>
                    </div>

                    <div id="withdrawForm" class="mt-5" style="display: none;">
                        <form action="/?payment/withdraw" method="POST">
                            <div class="row">
                                <div class="col-12">
                                    <label for="amount" class="form-label">Сумма вывода</label>
                                    <input type="number" class="form-control" id="amount" name="amount" placeholder="Введите сумму" required>
                                </div>
                            </div>

                            <!-- Скрытое поле для валюты -->
                            <input type="text" hidden name="currency" value="{$currency}">

                            <button type="submit" class="btn btn-primary mt-3" title="Перейти к оформлению заказа">Proceed to checkout</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
{assign var='currency_font' value=''}


{include file='main/datatable.tpl' tableTitle="{$lang.profile.transaction_history}"
theads=[{$lang.widgets.date}, {$lang.widgets.operation}, {$lang.widgets.payment_method}, "pdf_url",{$lang.widgets.sum}, {$lang.widgets.status}, {$lang.datatable.actions}]
data=$transaction_history }

<style>
    .container {
        max-width: 1320px;
    }
</style>

<style>
    .transaction-table .no-data {
        text-align: center;
        font-size: 16px;
        color: #777;
        font-weight: bold;
        padding: 20px;
    }
    .pagination {
        margin-top: 20px;
        text-align: center;
    }

    .pagination a, .pagination span {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 5px;
        border: 1px solid #ddd;
        text-decoration: none;
        color: #333;
    }

    .pagination .current {
        background-color: #007BFF;
        color: #fff;
        border-color: #007BFF;
    }

    .transaction-history {
        max-width: 100%;
        margin: 20px auto;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        font-family: Arial, sans-serif;
    }

    .transaction-history h2 {
        margin-bottom: 20px;
        font-size: 24px;
        text-align: center;
    }

    .transaction-table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
    }

    .transaction-table thead th {
        padding: 10px;
        font-weight: bold;
        text-align: left;
    }

    .transaction-table tbody tr {
        transition: background-color 0.3s;
    }

    .transaction-table tbody tr:hover {
    }

    .transaction-table td {
        padding: 10px;
        text-align: left;
        word-wrap: break-word;
    }

    .status {
        font-weight: bold;
        text-transform: capitalize;
    }

    .status.succeeded {
        color: #28a745;
    }

    .status.pending {
        color: #ffc107;
    }

    .status.error {
        color: #dc3545;
    }

    .status.canceled {
        color: #dc3545;
    }

    @media (max-width: 768px) {
        .transaction-table {
            font-size: 14px;
        }

        .transaction-history h2 {
            font-size: 20px;
        }

        .transaction-table thead {
            display: none;
        }

        .transaction-table tbody tr {
            display: flex;
            flex-direction: column;
            margin-bottom: 15px;
            border-bottom: 2px solid #ddd;
            padding: 10px;
        }

        .transaction-table tbody td {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
        }

        .transaction-table tbody td::before {
            content: attr(data-label);
            font-weight: bold;
            text-transform: uppercase;
        }
    }

</style>

{literal}

<script>
    $(document).ready(function () {
        $("#wallet").on('click', '#topUpButton', function () {
            var topUpForm = $('#topUpForm');
            var withdrawForm = $('#withdrawForm');

            if (topUpForm.is(':hidden')) {
                topUpForm.show();
                $(this).text('Скрыть форму пополнения');
                withdrawForm.hide();
                $('#withdrawBtn').text('Вывести деньги');
            } else {
                topUpForm.hide();
                $(this).text('Пополнить баланс');
            }
        });

        $("#wallet").on('click', '#withdrawBtn', function () {
            var withdrawForm = $('#withdrawForm');
            var topUpForm = $('#topUpForm');

            if (withdrawForm.is(':hidden')) {
                withdrawForm.show();
                $(this).text('Скрыть форму вывода');
                topUpForm.hide();
                $('#topUpButton').text('Пополнить баланс');
            } else {
                withdrawForm.hide();
                $(this).text('Вывести деньги');
            }
        });

        document.addEventListener('click', function(e) {
            debugger;
            const btn = e.target.closest('.request-refund-btn');
            if(!btn) return;

            const transactionId = btn.dataset.transactionId;
            const reason = prompt("Введите причину возврата:");
            if(!reason) return alert("Причина обязательна!");

            fetch('/engine/ajax/lib/transactions/refund.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({transaction_id: transactionId, reason: reason})
            })
                .then(res => res.json())
                .then(res => {
                    if(res.success){
                        alert('Запрос на возврат отправлен!');
                        location.reload();
                    } else {
                        alert('Ошибка: ' + res.message);
                    }
                })
                .catch(() => alert('Ошибка сервера'));
        });
    });


    document.querySelectorAll('.dropdown-items').forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const selectedValue = this.getAttribute('data-value');
            const selectedLabel = this.getAttribute('data-label');
            const selectedIconClass = this.querySelector('i').className;
            document.getElementById('selectedPaymentMethod').value = selectedValue;
            const dropdownButton = document.getElementById('dropdownMenuButton');
            dropdownButton.innerHTML = `
                <span id="selectedIcon" class="me-2 ${
                selectedIconClass
            }"></span>
                ${
                selectedLabel
            }
            `;
        });
    });



    {/literal}

</script>