<ul class="nav flex-row ml-5">
	<li class="nav-item d-lg-none">
		<a href="#navbar_search" class="navbar-nav-link navbar-nav-link-icon rounded-pill" data-bs-toggle="collapse">
			<i class="fa fa-magnifying-glass"></i>
		</a>
	</li>
</ul>
<div class="navbar-collapse flex-lg-1 order-2 order-lg-1 collapse" id="navbar_search">
	<div class="navbar-search flex-fill position-relative mt-2 mt-lg-0 mx-lg-3">
    	<form class="main-search" method="post">
            <div class="form-control-feedback form-control-feedback-start flex-grow-1">
                <div class="input-group">
                    <input type="text" class="form-control bg-transparent rounded-pill" name="search" placeholder="{$lang.general.search}">
                    <div class="form-control-feedback-icon">
                        <svg class="svg-stroke search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" stroke="#eee" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                            <path d="M21 21l-6 -6"></path>
                        </svg>
                    </div>
                    <div class="input-group-append">
                        <button type="submit" name="searchbutton" class="btn btn-outline-secondary">{$lang.general.search_button}</button>
                    </div>
                </div>
            </div>
		</form>
	</div>
</div>