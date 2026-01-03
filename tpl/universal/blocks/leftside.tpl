<div class="sidebar sidebar-main sidebar-expand-lg h-100 align-self-start sidebar-sticky" id="leftsidebar">
  <div class="sidebar-content">
    <div class="sidebar-section">
      <div class="sidebar-section-body d-flex justify-content-center">
        <h5 class="sidebar-resize-hide flex-grow-1 my-auto">Navigation</h5>
        <div>
          <button type="button" class="btn rounded-pill border sidebar-control sidebar-main-resize d-none d-lg-inline-flex" id="sidebarToggleButton">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12M40 76h176a12 12 0 0 0 0-24H40a12 12 0 0 0 0 24m176 104H40a12 12 0 0 0 0 24h176a12 12 0 0 0 0-24"></path></svg>
          </button>
          <!-- <button type="button" class="btn rounded-pill border sidebar-mobile-main-toggle d-lg-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12M40 76h176a12 12 0 0 0 0-24H40a12 12 0 0 0 0 24m176 104H40a12 12 0 0 0 0 24h176a12 12 0 0 0 0-24"></path></svg>
          </button> -->
        </div>
      </div>
    </div>

    <div class="sidebar-section">
      <ul class="nav nav-sidebar menu-list" data-nav-type="accordion">
        <li class="nav-item-header pt-0">
          <i class="fa fa-dots-three sidebar-resize-show"></i>
        </li>
        <li class="nav-item">
          <a href="/" class="nav-link" data-bs-popup="popover" data-bs-trigger="hover" data-bs-content="{$lang.leftmenu.home}">
            <img src="{$theme}/svg/home.svg" alt="">
            <span> {$lang.leftmenu.home}</span>
          </a>
        </li>
        <li class="nav-item">
          <a href="/news" class="nav-link" data-bs-popup="popover" data-bs-trigger="hover" data-bs-content="{$lang.leftmenu.news}">
            <img src="{$theme}/svg/news.svg" alt="">
            <span> {$lang.leftmenu.about_project}</span>
          </a>
        </li>
        <li class="nav-item nav-item-submenu">
          <a href="#" class="nav-link" data-bs-popup="popover" data-bs-trigger="hover" data-bs-content="{$lang.leftmenu.info}">
            <img src="{$theme}/svg/info.svg" alt="">
            <span>{$lang.leftmenu.opportunities}</span>
          </a>
          <ul class="nav-group-sub collapse bg-blurred" data-submenu-title="Events and Workshops:" style="padding-left:55px;">
            <li class="nav-item p-0"><a href="/user" class="nav-link sub-item">{$lang.leftmenu.user}</a></li>
            <li class="nav-item p-0"><a href="/creator" class="nav-link sub-item">{$lang.leftmenu.creator}</a></li>
            <li class="nav-item p-0"><a href="/marketer" class="nav-link sub-item">{$lang.leftmenu.marketer}</a></li>
            <li class="nav-item p-0"><a href="/business" class="nav-link sub-item">{$lang.leftmenu.business}</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a href="/modules" class="nav-link" data-bs-popup="popover" data-bs-trigger="hover" data-bs-content="{$lang.leftmenu.modules}">
            <img src="{$theme}/svg/download.svg" alt="">
            <span> {$lang.leftmenu.donate}</span>
          </a>
        </li>
        <li class="nav-item">
          <a href="/chat" class="nav-link" data-bs-popup="popover" data-bs-trigger="hover" data-bs-content="Чат">
            <img src="{$theme}/svg/forum.svg" alt="">
            <span>Чат</span>
          </a>
        </li>
        <li class="nav-item">
          <a href="/power-prize" class="nav-link" data-bs-popup="popover" data-bs-trigger="hover" data-bs-content="Чат">
            <img src="{$theme}/svg/buy.svg" alt="">
            <span>{$lang.leftmenu.power_prize}</span>
          </a>
        </li>
        <li class="nav-item">
          <a href="/worldwide-hello" class="nav-link" data-bs-popup="popover" data-bs-trigger="hover" data-bs-content="Чат">
            <img src="{$theme}/svg/buy.svg" alt="">
            <span>{$lang.leftmenu.worldwide_hello}</span>
          </a>
        </li>
        <li class="nav-item">
          <a href="/investment-offer" class="nav-link" data-bs-popup="popover" data-bs-trigger="hover" data-bs-content="Чат">
            <img src="{$theme}/svg/buy.svg" alt="">
            <span>{$lang.leftmenu.for_investors}</span>
          </a>
        </li>
        <li class="nav-item nav-item-submenu">
          <a href="#tools" class="nav-link" data-bs-popup="popover" data-bs-trigger="hover" data-bs-content="{$lang.leftmenu.info}">
            <img src="{$theme}/svg/info.svg" alt="">
            <span>{$lang.leftmenu.about_us}</span>
          </a>
          <ul class="nav-group-sub collapse bg-blurred" data-submenu-title="Events and Workshops:" style="padding-left: 28px;">
            <li class="nav-item p-0"><a href="/mission" class="nav-link sub-item">{$lang.leftmenu.our_mission}</a></li>
            <li class="nav-item p-0"><a href="/information" class="nav-link sub-item">{$lang.leftmenu.our_information}</a></li>
            <li class="nav-item p-0"><a href="/contacts" class="nav-link sub-item">{$lang.leftmenu.our_contacts}</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</div>
<style>
  .nav-group-sub .nav-item .nav-link.sub-item {
      position: relative;
      padding-left: 20px !important; 
  }

  .nav-group-sub .nav-item .nav-link.sub-item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background-color: #d1d5db;
  }

  .nav-item-submenu > .nav-link {
      opacity: 0.9;
  }

  .nav-group-sub.show .nav-item .nav-link.sub-item::before {
      background-color: #d1d5db;
  }
  .nav-group-sub.show .nav-item .nav-link.sub-item:hover::before {
      background-color: #0d6efd;
  }

</style>