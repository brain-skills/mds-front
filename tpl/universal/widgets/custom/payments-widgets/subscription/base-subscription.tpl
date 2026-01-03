<div class="subscription-card bg-blurred">
    <div class="subscription-badge">Экономия 20%</div>
    <div class="subscription-header">
        <h1 class="subscription-title">{$widgetData.name}</h1>
        <div class="subscription-price">
            {$widgetData.price} {$currency}<span class="subscription-period">/год</span>
        </div>
    </div>

    <ul class="subscription-features">
        <li>Полный доступ ко всем функциям</li>
        <li>Премиум-поддержка 24/7</li>
        <li>До 5 устройств одновременно</li>
        <li>Эксклюзивный контент</li>
    </ul>

    <button 
        class="subscription-button"
        onclick="window.location.href='?payment&price={$widgetData.price}&currency={$currency}&action=redirect-payment&widget={$widgetData.id}'">
        {$widgetData.btn_text}
    </button>

    <p class="subscription-note">Отменить можно в любой момент</p>
</div>

<style>
    * {
        box-sizing: border-box;
        font-family: 'Segoe UI', Roboto, sans-serif;
        margin: 0;
        padding: 0;
    }

    .subscription-card {
        width: 100%;
        border-radius: 4px;
        padding: 2.5rem;
        position: relative;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        overflow: hidden;
    }

    .subscription-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
    }

    .subscription-badge {
        position: absolute;
        top: 18px;
        right: -40px;
        background: linear-gradient(135deg, #3ab34a, #5fd36a);
        color: #fff;
        padding: 8px 45px;
        transform: rotate(45deg);
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 3px 10px rgba(58, 179, 74, 0.3);
    }

    .subscription-header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .subscription-title {
        font-size: 1.8rem;
        font-weight: 700;
        color: #222;
        margin-bottom: 0.8rem;
    }

    .subscription-price {
        font-size: 2.8rem;
        font-weight: 800;
        background: linear-gradient(90deg, #8b5cf6, #7c3aed);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        display: inline-block;
    }

    .subscription-period {
        font-size: 1.1rem;
        font-weight: 500;
        color: #777;
        margin-left: 6px;
    }

    .subscription-features {
        list-style: none;
        margin: 1.5rem 0;
        padding: 0;
    }

    .subscription-features li {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #444;
        font-size: 0.95rem;
        margin-bottom: 0.9rem;
        line-height: 1.4;
    }

    .subscription-features li::before {
        content: "✔";
        color: #22c55e;
        font-weight: bold;
        font-size: 1rem;
    }

    .subscription-button {
        width: 100%;
        padding: 1rem;
        font-size: 1.1rem;
        font-weight: 600;
        border: none;
        border-radius: 12px;
        color: #fff;
        background: linear-gradient(90deg, #7c3aed, #a855f7);
        cursor: pointer;
        transition: all 0.25s ease;
        box-shadow: 0 5px 15px rgba(124, 58, 237, 0.25);
    }

    .subscription-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(124, 58, 237, 0.35);
        background: linear-gradient(90deg, #a855f7, #7c3aed);
    }

    .subscription-note {
        text-align: center;
        margin-top: 1.2rem;
        font-size: 0.85rem;
        color: #777;
    }

    /* === DARK MODE === */
    /* [data-bs-theme="dark"] body {
        background: #0e0f11;
        color: #e8e8e8;
    } */

    [data-bs-theme="dark"] .subscription-card {
        background: #16181c;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.05);
    }

    [data-bs-theme="dark"] .subscription-title {
        color: #fafafa;
    }

    [data-bs-theme="dark"] .subscription-price {
        background: linear-gradient(90deg, #a855f7, #7c3aed);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    [data-bs-theme="dark"] .subscription-period {
        color: #b3b3b3;
    }

    [data-bs-theme="dark"] .subscription-features li {
        color: #d0d0d0;
    }

    [data-bs-theme="dark"] .subscription-note {
        color: #a0a0a0;
    }

    [data-bs-theme="dark"] .subscription-badge {
        background: linear-gradient(135deg, #2fb043, #4ed165);
        box-shadow: 0 3px 10px rgba(46, 209, 101, 0.4);
    }

    [data-bs-theme="dark"] .subscription-button {
        background: linear-gradient(90deg, #9b5cf6, #b07cff);
        box-shadow: 0 5px 20px rgba(160, 100, 255, 0.4);
    }

    [data-bs-theme="dark"] .subscription-button:hover {
        background: linear-gradient(90deg, #b07cff, #9b5cf6);
        box-shadow: 0 10px 30px rgba(160, 100, 255, 0.5);
    }

    @media (max-width: 480px) {
        .subscription-card {
            width: 90%;
            padding: 1.8rem;
        }

        .subscription-title {
            font-size: 1.5rem;
        }

        .subscription-price {
            font-size: 2.3rem;
        }
    }
</style>
