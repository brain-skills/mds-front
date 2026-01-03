<form action="/?payment/checkout" method="POST" id="paymentForm">

    <div class="pay-section">
        {*Секция иформации и промокода*}
        {include file="./blocks/info_section.tpl"}

        {*Секция платежных систем*}
        {include file="./blocks/pay_grid.tpl"}
    </div>

    {*Секция бонусовм*}
    {include file="./blocks/bonuses_section.tpl"}

    {*Секция завершения платежа*}
    {include file="./blocks/finish_payment_section.tpl"}

</form>

<div id="loadingOverlay" class="loading-overlay">
    <div class="spinner"></div>
</div>

<style>
    .hidden {
        display: none;
    }

    .pay-section { margin-bottom: 30px; }
    .block-title { font-size: 22px; font-weight: 700; margin-bottom: 15px; }
    .pay-grid, .bonus-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; }
    .pay-item, .bonus-item { border-radius: 14px; padding: 18px 20px; border: 1.5px solid #e7e7e7; cursor: pointer; transition: 0.2s ease; }
    .pay-item:hover, .bonus-item:hover { border-color: #4c7cff; box-shadow: 0 0 10px rgba(76,124,255,0.15); }
    .input-block { margin-bottom: 15px; display: flex; flex-direction: column; gap: 6px; }
    .pay-method.active, .bonus-item.active { border-color: #3D63DD; }
    .pay-btn { width: 100%; padding: 14px 0; border-radius: 12px; border: none;  color: white; font-size: 18px; font-weight: 600; cursor: pointer; transition: .2s; }
    .pay-btn:hover { background: #2f50b8; }


    .mini-cart-items {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .mini-cart-item {
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        background: #f7f7f7;
        font-size: 13px;
    }
    .mini-cart-name {
        font-weight: 600;
        margin-bottom: 4px;
    }
    .mini-cart-details {
        display: flex;
        justify-content: space-between;
    }
    .out-of-stock {
        color: red;
        font-weight: 600;
    }
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(131, 131, 131, 0.5);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .spinner {
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid #fff;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .info-card {
        padding: 20px 24px;
        border: 2px solid #e0e0e0;
        border-radius: 16px;
        box-shadow: 0 0 0 3px rgba(0,0,0,0.03);
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .info-card-title {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 5px;
    }

    .info-card-text {
        font-size: 15px;
        line-height: 1.5;
        opacity: .85;
        font-weight: 500;
    }


    .pay-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 15px;
    }

    .bonus-item.disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }

    .bonus-error {
        margin-top: 12px;
        padding: 12px 16px;
        border-radius: 12px;
        color: #d83b3b;
        border: 1px solid #ffcccc;
        font-weight: 600;
    }

    .bonus-grid {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
    }
    .input-block {
        margin-bottom: 18px;
    }

    .pretty-input {
        padding: 16px 20px;
        border: 2px solid #e0e0e0;
        border-radius: 16px;
        width: 100%;
        font-size: 18px;
        transition: .25s;
        font-weight: 600;
    }

    .pretty-input:focus {
        border-color: #4d59ff;
        outline: none;
        box-shadow: 0 0 0 3px rgba(77, 89, 255, .2);
    }

    .input-label {
        font-weight: 700;
        margin-bottom: 8px;
        display: block;
    }

    .bonus-item {
        padding: 18px 24px;
        border: 2px solid #e0e0e0;
        border-radius: 16px;
        cursor: pointer;
        transition: .25s;
        font-weight: 700;
        font-size: 20px;
        min-width: 180px;
        text-align: center;
    }

    .bonus-item:hover {
        border-color: #b5b5b5;
    }

    .bonus-item.active {
        border-color: #4d59ff;
        box-shadow: 0 0 0 3px rgba(77, 89, 255, .2);
    }


    .pay-card {
        border: 2px solid #e5e5e5;
        border-radius: 16px;
        padding: 16px;
        cursor: pointer;
        transition: 0.2s;

        display: block;
        margin-bottom: 10px;
    }
    .pay-collapse {
        display: none;
        padding: 10px 15px;
        margin-bottom: 15px;
        border-radius: 4px;
    }

    .collapse-inner {
        font-size: 14px;
        line-height: 1.4;
    }

    .pay-card.active {
        border-color: #4d59ff;
    }

    .pay-card input {
        display: none;
    }

    .pay-card-inner {
        display: flex;
        gap: 12px;
        align-items: center;
    }

    .pay-icon img {
        width: 120px;
    }

    .pay-title {
        font-weight: 700;
        font-size: 16px;
    }

    .pay-desc {
        font-size: 13px;
        opacity: .7;
    }

</style><!-- Начало полностью переписанного современного минималистичного шаблона -->
<script src="{$theme}/assets/js/payment.js"></script>