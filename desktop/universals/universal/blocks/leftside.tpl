<div class="sidebar sidebar-main sidebar-expand-lg h-100 align-self-start sidebar-sticky" id="leftsidebar">
	<div class="sidebar-content">
		<div class="sidebar-section">
			<div class="sidebar-section-body d-flex justify-content-center">
				<h5 class="sidebar-resize-hide flex-grow-1 my-auto">Navigation</h5>
				<div>
					<button type="button" class="btn rounded-pill border sidebar-control sidebar-main-resize d-none d-lg-inline-flex" id="sidebarToggleButton">
						<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12M40 76h176a12 12 0 0 0 0-24H40a12 12 0 0 0 0 24m176 104H40a12 12 0 0 0 0 24h176a12 12 0 0 0 0-24"></path></svg>
					</button>
					<button type="button" class="btn rounded-pill border sidebar-mobile-main-toggle d-lg-none">
						<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12M40 76h176a12 12 0 0 0 0-24H40a12 12 0 0 0 0 24m176 104H40a12 12 0 0 0 0 24h176a12 12 0 0 0 0-24"></path></svg>
					</button>
				</div>
			</div>
		</div>

		<div class="sidebar-section">
			<ul class="nav nav-sidebar" data-nav-type="accordion">
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
						<span> {$lang.leftmenu.news}</span>
					</a>
				</li>
				<li class="nav-item">
					<a href="/modules" class="nav-link" data-bs-popup="popover" data-bs-trigger="hover" data-bs-content="{$lang.leftmenu.modules}">
						<img src="{$theme}/svg/modules.svg" alt="">
						<span> {$lang.leftmenu.modules}</span>
					</a>
				</li>
                <li class="nav-item">
					<a href="/testchat" class="nav-link" data-bs-popup="popover" data-bs-trigger="hover" data-bs-content="Чат">
						<img src="{$theme}/svg/forum.svg" alt="">
						<span>Чат</span>
					</a>
				</li>
				<li class="nav-item nav-item-submenu">
					<a href="#" class="nav-link" data-bs-popup="popover" data-bs-trigger="hover" data-bs-content="{$lang.leftmenu.info}">
						<img src="{$theme}/svg/info.svg" alt="">
						<span>{$lang.leftmenu.info}</span>
					</a>
					<ul class="nav-group-sub collapse" data-submenu-title="Events and Workshops:">
						<li class="nav-item"><a href="/license" class="nav-link">{$lang.leftmenu.license}</a></li>
						<li class="nav-item"><a href="#" class="nav-link">{$lang.leftmenu.se_requirements}</a></li>
						<li class="nav-item"><a href="#" class="nav-link">{$lang.leftmenu.se_capabilities}</a></li>
						<li class="nav-item"><a href="#" class="nav-link">{$lang.leftmenu.instructions}</a></li>
						<li class="nav-item"><a href="#" class="nav-link">{$lang.leftmenu.support}</a></li>
						<li class="nav-item"><a href="https://docs.skills.energy/" class="nav-link">{$lang.leftmenu.docs}</a></li>
					</ul>
				</li>
				<li class="nav-item">
					<a href="/demonstration" class="nav-link" data-bs-popup="popover" data-bs-trigger="hover" data-bs-content="{$lang.leftmenu.demo}">
						<img src="{$theme}/svg/download.svg" alt="">
						<span>{$lang.leftmenu.demo}</span>
					</a>
				</li>
				<li class="nav-item">
					<a href="/license_buy" class="nav-link" data-bs-popup="popover" data-bs-trigger="hover" data-bs-content="{$lang.leftmenu.license_buy}">
						<img src="{$theme}/svg/buy.svg" alt="">
						<span>{$lang.leftmenu.license_buy}</span>
					</a>
				</li>
				<li class="nav-item">
					<a href="https://forum.skills.energy" class="nav-link" data-bs-popup="popover" data-bs-trigger="hover" data-bs-content="{$lang.leftmenu.forum}">
						<img src="{$theme}/svg/forum.svg" alt="">
						<span>{$lang.leftmenu.forum}</span>
					</a>
				</li>
				<li class="nav-item">
					<a href="/contacts" class="nav-link" data-bs-popup="popover" data-bs-trigger="hover" data-bs-content="{$lang.leftmenu.contacts}">
						<img src="{$theme}/svg/mail.svg" alt="">
						<span>{$lang.leftmenu.contacts}</span>
					</a>
				</li>
				<li class="nav-item py-2 px-2 w-100 border-top text-center">
					<a class="nav-link text-success">
						<span></b>
					</a>
				</li>
			</ul>
		</div>
		<!-- <div class="sidebar-section dm-none"></div> -->
	</div>
</div>
<style>
   #leftsidebar {
    background: hsla(0, 0%, 100%, 0.08);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    }

</style>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        var currentPath = window.location.pathname;
        var activeLink = document.querySelector('a[href="' + currentPath + '"]');
        if (activeLink) {
            activeLink.classList.add('active');
        }
    });
    document.getElementById('leftsidebar').addEventListener('click', function() {
    	this.classList.toggle('blur');
	});
</script>