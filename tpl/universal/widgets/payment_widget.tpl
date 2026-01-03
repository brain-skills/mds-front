{if !isset($uniqName) }
<p> Ошибка: При include() шаблона uniqName обязателен</p>

    {else}

    <form action="/?payment/checkout" hidden="hidden" method="POST" id="{$uniqName}-paymentForm">
        <div class="row {$uniqName}-row">
            <div class="col-4" style="width: auto">
                <div class="d-flex justify-content-between align-items-center mb-3" id="{$uniqName}-widget-title">
                    <h5 class="mb-0" id="{$uniqName}-widget-title"></h5>
                </div>
                <div class="dropdown {$uniqName}-paymentslist">
                    <span class="form-select dropdown-toggle d-flex align-items-center" id="{$uniqName}-dropdownMenuButton"
                          data-bs-toggle="dropdown" aria-expanded="false">
                        <span id="{$uniqName}-selectedIcon" class="me-2"></span>{$lang.paymentsection.noawaypaymethod}
                    </span>
                    <input type="hidden" name="payment_method" id="{$uniqName}-selectedPaymentMethod">
                    <ul class="dropdown-menu w-100" aria-labelledby="{$uniqName}-dropdownMenuButton">
                        {if $payment_configs["stripe"]["enabled"] == true}
                            <li>
                                <a class="{$uniqName}-dropdown-item dropdown-item d-flex justify-content-between align-items-center p-dropdown-item" href="#" data-value="stripe" data-label="Stripe">
                                    <span class="d-flex align-items-center">
                                        <i class="stripe me-3"></i> Stripe
                                    </span>
                                    <span class="d-flex align-items-center fw-bold fs-8">Fee 3% + 0.60¢</span>
                                </a>
                            </li>
                        {/if}
                        {if $payment_configs["coinbase"]["enabled"] == true}
                            <li>
                                <a class="{$uniqName}-dropdown-item dropdown-item d-flex justify-content-between align-items-center p-dropdown-item" href="#" data-value="coinbase" data-label="Coinbase">
                                    <span class="d-flex align-items-center">
                                        <i class="coinbase me-3"></i> Coinbase
                                    </span>
                                    <span class="d-flex align-items-center fw-bold fs-8">Fee 0.5% to 4.5%</span>
                                </a>
                            </li>
                        {/if}
                        {if $payment_configs["balance"]["enabled"] == true}
                            <li>
                                <a class="{$uniqName}-dropdown-item dropdown-item d-flex justify-content-between align-items-center p-dropdown-item" href="#" data-value="balance" data-label="{$lang.paymentsection.mybalance}">
                                    <span class="d-flex align-items-center">
                                        <i class="balance me-3"></i> {$lang.paymentsection.mybalance}
                                    </span>
                                </a>
                            </li>
                        {/if}
                    </ul>
                </div>

                <input id="{$uniqName}-priceInput" class="form-control" type="number" placeholder="{$lang.paymentsection.inputsum}" name="price" value="" style="margin-top: 10px">
                <input type="text" class="form-control" id="{$uniqName}-promocode" name="promocode" placeholder="{$lang.paymentsection.promocode}">

                <div class="form-check" id="{$uniqName}-deliveryBlock">
                    <input type="checkbox" name="{$uniqName}-deliveryCheckbox" class="form-check-input" id="{$uniqName}-deliveryCheckbox">
                    <label class="form-check-label" for="{$uniqName}-deliveryCheckbox">{$lang.paymentsection.adddelivery}</label>
                </div>
                <div id="{$uniqName}-deliveryForm" class="" style="display: none;">
                    <h5>{$lang.paymentsection.delivery}</h5>
                    <div class="mb-2">
                        <label for="deliveryName" class="form-label">{$lang.paymentsection.name}</label>
                        <input type="text" id="deliveryName" class="form-control" name="delivery_name" placeholder="{$lang.paymentsection.name}" value="{if !empty($deliveryData["name"])}{$deliveryData["name"]}{/if}">
                    </div>
                    <div class="mb-2">
                        <label for="deliveryCountry" class="form-label">{$lang.paymentsection.country}</label>
                        <input type="text" id="deliveryCountry" class="form-control" name="delivery_country" placeholder="{$lang.paymentsection.country}" value="{if !empty($deliveryData["country"])}{$deliveryData["country"]}{/if}">
                    </div>
                    <div class="mb-2">
                        <label for="deliveryAddress" class="form-label">{$lang.paymentsection.address}</label>
                        <input type="text" id="deliveryAddress" class="form-control" name="delivery_address" placeholder="{$lang.paymentsection.address}" value="{if !empty($deliveryData["address"])}{$deliveryData["address"]}{/if}">
                    </div>
                    <div class="mb-2">
                        <label for="deliveryHouse" class="form-label">{$lang.paymentsection.house}</label>
                        <input type="text" id="deliveryHouse" class="form-control" name="delivery_house" placeholder="{$lang.paymentsection.house}" value="{if !empty($deliveryData["home"])}{$deliveryData["home"]}{/if}">
                    </div>
                    <div class="mb-2">
                        <label for="deliveryPhone" class="form-label">{$lang.paymentsection.phone}</label>
                        <input type="text" id="deliveryPhone" class="form-control" name="delivery_phone" placeholder="{$lang.paymentsection.phone}" value="{if !empty($deliveryData["phone"])}{$deliveryData["phone"]}{/if}">
                    </div>
                </div>

                <div class="{$uniqName}-form-text">
                    <span id="{$uniqName}-priceSpan"></span>
                </div>
                <a type="submit" class="{$uniqName}-payment-button btn btn-primary" title="{$lang.paymentsection.gotopay}">{$lang.paymentsection.gotopay}</a>

                <input id="{$uniqName}-widget_id" type="text" hidden name="widget_id" value="">
                <input type="text" hidden name="dynamic_name" value="">
                <input type="text" hidden name="action" value="dynamic">
                <input type="text" id="currency" hidden name="currency" value="{$currency}">

            </div>
        </div>
    </form>

    <div id="loadingOverlay" class="loading-overlay">
        <div class="spinner"></div>
    </div>

    {* required hidden data *}
    <input type="hidden" value="{$uniqName}" id="uniqNamePayment" class="uniqNamePayment">
{/if}