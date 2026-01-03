{* Truncate the title to 50 chars, add full title as tooltip *}
{assign var="fullTitle" value=$widgetData.name|default:"Поддержите проект ❤️"}
{assign var="shortTitle" value=$fullTitle|truncate:50:"..."}

<div class="container w-100" data-bs-theme="dark">
  <div class="card shadow-sm border-0 bg-transparent p-2 animate-fade-in">
    {if !$widgetData.disable_title}
      <h2 class="donation-title text-center" title="{$fullTitle|escape}">
        {$shortTitle}
      </h2>
    {/if}

    <form method="post">
      {if $widgetData.price > 0}
        <div class="alert alert-success d-flex align-items-center alert-soft-success mb-3 justify-content-center" style="color:#277a2a">
          <i class="bi bi-cash-stack me-2 text-success fs-5"></i>
          <span>Сумма: <strong>{$widgetData.price|number_format:2}</strong> ₽</span>
        </div>
      {/if}

      {if $widgetData.super_donater_sum && $widgetData.price <= 0}
        <div class="alert alert-warning d-flex align-items-center alert-soft-warning mb-3">
          <i class="bi bi-star-fill text-warning me-2"></i>
          <span>🎖️ Супер-донатеры от {$widgetData.super_donater_sum} {$currency}</span>
        </div>
      {/if}

      {if !$widgetData.disable_sum_input}
        <input type="number" name="amount" class="form-control bg-transparent" placeholder="Введите сумму" min="1" step="0.01" required>
      {else}
        <input type="hidden" name="amount" value="{$widgetData.price}">
      {/if}

      <button type="button" class="btn btn-success w-100 mt-3" onclick='window.location.href = "{$widgetData.handleUrl}"'>
        {$widgetData.btn_text|default:"Отправить донат"}
      </button>

      {if $widgetData.pay_with_redirect}
        <div class="text-muted text-center mt-3 small">
          <i class="bi bi-shield-lock me-1"></i>
          Безопасные платежи через защищённое соединение
        </div>
      {/if}
    </form>
  </div>
</div>

<style>
  [data-bs-theme="light"] .donation-title {
    color: #16181c !important;
  }

  [data-bs-theme="dark"] .donation-title {
    color: #f5f5f5;
    display: inline-block;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  [data-bs-theme="dark"] .card {
    background: #16181c;
    box-shadow: 0 15px 35px rgba(0,0,0,0.7);
    border: 1px solid rgba(255,255,255,0.05);
  }

  [data-bs-theme="dark"] .alert-soft-success {
    background-color: rgba(56, 179, 74, 0.2);
    color: #81c784;
  }

  [data-bs-theme="dark"] .alert-soft-warning {
    background-color: rgba(255, 213, 79, 0.15);
    color: #ffeb3b;
  }

  [data-bs-theme="dark"] .border-gray {
    border-color: #444;
    background-color: #1e1e1e;
    color: #e0e0e0;
  }

  [data-bs-theme="dark"] .border-gray::placeholder {
    color: #999;
  }

  [data-bs-theme="dark"] .btn-gradient-success {
    background: linear-gradient(135deg, #2e7d32, #388e3c);
    color: #fff;
    box-shadow: 0 5px 15px rgba(52,206,87,0.25);
  }

  [data-bs-theme="dark"] .btn-gradient-success:hover {
    background: linear-gradient(135deg, #34ce57, #2e7d32);
    box-shadow: 0 10px 25px rgba(52,206,87,0.35);
  }

  [data-bs-theme="dark"] .text-muted {
    color: #aaa !important;
  }
</style>
