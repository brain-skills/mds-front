<!doctype html>
<html lang="en">
	{include file="./blocks/head.tpl"}

<body class="pattern">
	<!-- Main navbar -->
	<header class="navbar navbar-dark navbar-expand-lg fixed-top header">
		<div class="container px-0  px-lg-3 header-container">
        	<div class="d-flex align-items-center">
              <div class="d-flex d-lg-none me-2">
                  <button type="button" class="navbar-toggler sidebar-mobile-main-toggle rounded-pill bottom-menu-item" id="sidebar">
                      <i class="fa fa-list"></i>
                  </button>
              </div>
              {include file="./blocks/logo.tpl"}
        	</div>
			<ul class="nav header-menu flex-row justify-content-end order-1 order-lg-2">
                <div class="bottom-menu-item">
                    {include file="./search.tpl"}  
                </div>
                {if !empty($user)}
                    <li class="nav-item px-1 d-none notif-icon-line">
                        <div class="vr d-flex"></div>
                    </li>
                    <div class="notif-icon">
                        {include file="./blocks/notifications.tpl"}
                    </div>
                {/if}
                  <li class="nav-item px-1 bottom-menu-item">
                      <div class="vr d-flex"></div>
                  </li>
                  <div class="bottom-menu-item">
                  	{include file="./blocks/theme.tpl"}
                  </div>
                  <li class="nav-item px-1 bottom-menu-item">
                      <div class="vr d-flex"></div>
                  </li>
                  {include file="./blocks/language.tpl"}
                  <li class="nav-item px-1 bottom-menu-item">
                      <div class="vr d-flex"></div>
                  </li>
                  <div class="bottom-menu-item d-lg-flex" style="max-width: 46px;max-height: 40px;">
                  	{include file="./authorization.tpl"}
                  </div>
			</ul>
            <div class="navbar-collapse flex-lg-1 order-2 order-lg-1 collapse mx-4 bottom-menu-item" id="navbar_search">
              <div class="navbar-search flex-fill position-relative mt-2 mt-lg-0">
                  <form class="main-search" method="post">
                      <div class="form-control-feedback form-control-feedback-start flex-grow-1">
                          <div class="input-group">
                              <input type="text" class="form-control bg-transparent rounded-pill py-0" name="search" placeholder="{$lang.general.search}">
                              <div class="form-control-feedback-icon">
                                  <svg class="svg-stroke search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" stroke="#eee" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                                      <path d="M21 21l-6 -6"></path>
                                  </svg>
                              </div>
                              <div class="input-group-append d-flex">
                                  <button type="submit" name="searchbutton" class="btn btn-outline-secondary">{$lang.general.search_button}</button>
                              </div>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
		</div>
	</header>

    {if $user_authenticated && $user.group !== 4}
        {include file="./blocks/online_support.tpl"}
    {/if}

    {if isset($homepage)}
        {include file="./blocks/carousel.tpl"}
    {/if}
	<div class="page-content container">
		{include file="./blocks/leftside.tpl"}
		
		<div class="content-wrapper bg-blurred {if !isset($homepage)} mt-56{/if}" style="height: fit-content;">
			<div class="content">
				{if isset($homepage)}{include file="./blocks/topmenu.tpl"}{/if}
				{if !isset($homepage)}{include file="./blocks/breadcrumbs.tpl"}{/if}
				{$content}
			</div>
		</div>
	</div>
    <div class="mobile-only">
    	{include file="./blocks/bottom_menu.tpl"}
    </div>
    
	{include file="./blocks/footer.tpl"}

	<!-- different: modal windows -->
	{include file="./blocks/modal.tpl"}

	<!-- start: bodyend scripts -->
	{include file="./blocks/bodyendscripts.tpl"}
    
	<script src="{$theme}/assets/main.js"></script>
	<script src="{$theme}/assets/widgets/participation_widget.js"></script>
	<script src="{$theme}/assets/widgets/counter_widget.js"></script>
	<script src="{$theme}/assets/widgets/payment_statistics.js"></script>
	<script src="{$theme}/assets/widgets/quiz_widget.js"></script>
	<script src="{$theme}/assets/widgets/payment_widget.js"></script>
    <style>
        @media(max-width: 700px){
            .notif-icon{
                display: none;
            }
        }
        body.sidebar-open {
             overflow: hidden;
        }
    </style>
    <script>
        const sidebarContent = document.querySelector('.sidebar-content');

        window.addEventListener('scroll', function() {
            if (window.scrollY === 0) {
                sidebarContent.classList.add('at-top');
            } else {
                sidebarContent.classList.remove('at-top');
            }
    });
</script>
</body>
</html>