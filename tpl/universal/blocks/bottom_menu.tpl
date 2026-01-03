<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
    <div class="container bottom-container px-0 px-lg-3 justify-content-center">

        <!-- Mobile sidebar toggle -->
        <div class="d-flex">
            <div class="d-flex d-lg-none">
                <button type="button" class="navbar-toggler sidebar-mobile-main-toggle rounded-pill">
                    <i class="fa fa-list"></i>
                </button>
            </div>
        </div>

        <div id="mobile-search-box" class="mobile-search-box d-none">
            <div class="mobile-search-inner">
                <input type="text" class="form-control bg-transparent rounded-pill text-white"
                       placeholder="{$lang.general.search}">
                <button type="button" id="close-search" class="btn btn-link text-white ms-2 p-0">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="26" height="26" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        </div>

        <div id="bottom-menu-wrapper" class="flex-row align-items-center">
            <ul class="nav header-menu flex-row justify-content-end order-1 order-lg-2">

                <div class="notification-icon-block">
                    {include file="../blocks/notifications.tpl"}
                </div>

                <li class="nav-item px-1 d-block d-lg-none line">
                    <div class="vr d-flex"></div>
                </li>

                <li class="nav-item d-lg-none d-flex">
                    <a id="open-search-btn"
                       class="navbar-nav-link navbar-nav-link-icon rounded-pill p-2"
                       role="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                             fill="none" stroke="currentColor" stroke-width="2"
                             viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </a>
                </li>

                <li class="nav-item px-1 line">
                    <div class="vr d-flex"></div>
                </li>

                {include file="../blocks/theme.tpl"}

                <li class="nav-item px-1 line">
                    <div class="vr d-flex"></div>
                </li>

                {include file="../authorization.tpl"}

            </ul>
        </div>

    </div>
</nav>

<style>
    .notification-icon-block {
        top: 4px !important;
    }

    .mobile-search-box {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: var(--bs-dark);
        padding: 10px 15px;
        z-index: 9999;
    }

    .mobile-search-inner {
        display: flex;
        align-items: center;
    }
</style>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        const openSearchBtn = document.getElementById("open-search-btn");
        const bottomMenu = document.getElementById("bottom-menu-wrapper");
        const searchBox = document.getElementById("mobile-search-box");
        const closeSearchBtn = document.getElementById("close-search");

        openSearchBtn.addEventListener("click", function () {
            bottomMenu.classList.add("d-none");
            searchBox.classList.remove("d-none");
        });

        closeSearchBtn.addEventListener("click", function () {
            searchBox.classList.add("d-none");
            bottomMenu.classList.remove("d-none");
        });
    });
</script>