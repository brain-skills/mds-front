<ul class="nav flex-row">
  <li class="nav-item nav-item-dropdown-lg dropdown">
    {if isset($user_authenticated) && $user_authenticated}
      <a href="#" 
          class="navbar-nav-link navbar-nav-link-icon rounded-pill p-2 notification-icon-position" 
          data-bs-toggle="dropdown">
            <svg class="svg-stroke" 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"></path>
                <path d="M9 17v1a3 3 0 0 0 6 0v-1"></path>
                <path d="M21 6.727a11.05 11.05 0 0 0 -2.794 -3.727"></path>
                <path d="M3 6.727a11.05 11.05 0 0 1 2.792 -3.727"></path>
            </svg>
        </a>
    {/if}
    <div class="dropdown-menu p-0 notif" id="NotificationsDiv">

      <!-- Top Title -->
      <div class="d-flex align-items-center border-bottom p-2">
        <h6 class="mb-0">{$lang.chat.notifications}</h6>
      </div>

      <div class="scrollable-content">
        <div class="card border-0 mb-0">
          <ul class="card-body p-0 list-unstyled mb-0 custom_scroll">

          </ul>
        </div>
      </div>

      <!-- Fixed bottom actions -->
      <div class="d-flex py-2 px-3 custom-radius-bottom ">
        <a href="/notifications" class="button-text ms-auto">
          <i class="ph-checks me-1"></i> {$lang.chat.view_all}
        </a>
      </div>
    </div>
  </li>
</ul>


<!-- Шаблон пустого уведомления -->
<template id="tpl-empty-notification">
  <li class="pe-2 text-center text-muted py-5">
    <div class="fs-6">Уведомлений нет</div>
    <small class="text-secondary d-block">Вы в курсе всех событий</small>
  </li>
</template>

<!-- Шаблон уведомления в выпадающем списке -->
<template id="tpl-notification-item">
  <div class="d-flex p-lg-3 p-2 border-bottom notification-block" href="javascript:void(0);">
    <div class="notification-item d-flex align-items-center justify-content-between w-100"> {*Это каждый item уведомления*}
      <div class="avatar"> {*Это блок аватара и иконки уведомления*}
        <img class="sender-avatar" src="" alt="avatar">  {*Это аватар отправителя*}
      </div>
      <img src="" class="sm notification-icon"></img>  {*Это иконка типа уведомления*}
      <div class="text">
        <div>
          <strong class="notification-sender-name"></strong>  {*Это имя отправителя *}
          <span class="notification-type"></span> {*Это тип уведомления *}
        </div>
        <div class="time notification-time"></div> {*Это время поучения уведомления *}
      </div>
      <div class="status"></div>
    </div>
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/push.js/1.0.12/push.min.js"></script>
{* TODO Remove from here  *}
<script>
  window.globalLang = '{$globalLangJson}';
  window.globalLang = JSON.parse(window.globalLang);
</script>
<script src="{$theme}/assets/ws/notification.js"></script>  

<style>
  .notification-block{
    cursor: pointer;
  }
  
  .notification-block:hover{
    background-color: #f8f9fa;
  }

  [data-bs-theme="dark"] .notification-block:hover{
    background-color:  #1a1f2e;
  }
</style>