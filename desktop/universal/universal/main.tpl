<!doctype html>
<html lang="en">
	{include file="./blocks/head.tpl"}

<body class="pattern">
	<!-- Main navbar -->
	<header class="navbar navbar-dark navbar-expand-lg fixed-top">
		<div class="container px-lg-3">
			<div class="d-flex d-lg-none me-2">
				<button type="button" class="navbar-toggler sidebar-mobile-main-toggle rounded-pill">
					<i class="fa fa-list"></i>
				</button>
			</div>

			{include file="./blocks/logo.tpl"}
			{include file="./blocks/notifications.tpl"}
			{include file="./search.tpl"}

			<ul class="nav header-menu flex-row justify-content-end order-1 order-lg-2">
				{include file="./blocks/theme.tpl"}
                <li class="nav-item px-1">
					<div class="vr d-flex"></div>
				</li>
				{include file="./blocks/language.tpl"}
                <li class="nav-item px-1">
					<div class="vr d-flex me-2"></div>
				</li>
				{include file="./authorization.tpl"}
			</ul>
		</div>
	</header>

    {if isset($homepage)}
        {include file="./modules/news/latest_entries.tpl"}
    {/if}
	<div class="page-content container">
		{include file="./blocks/leftside.tpl"}
		
		<div class="content-wrapper">
			<div class="content">
				{if isset($homepage)}{include file="./blocks/topmenu.tpl"}{/if}
				{if !isset($homepage)}{include file="./blocks/breadcrumbs.tpl"}{/if}
				{$content}
			</div>
		</div>
	</div>
	{include file="./blocks/footer.tpl"}

	<!-- different: modal windows -->
	{include file="./blocks/modal.tpl"}

	<!-- start: bodyend scripts -->
	{include file="./blocks/bodyendscripts.tpl"}
</body>
</html>