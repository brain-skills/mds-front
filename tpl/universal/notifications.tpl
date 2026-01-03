<div class="container px-0">
    <h2 class="text-center fw-bold mb-4">{$lang.chat.notifications}</h2>

    <!-- Фильтр по дате -->
    <div class="filter-panel mb-0">
        <form method="get" class="row g-3 align-items-end">
            <div class="col-md-4">
                <label for="dateFrom" class="form-label">{$lang.chat.from_date}:</label>
                <input type="date" id="dateFrom" name="from" class="form-control" value="{$from|escape}" />
            </div>
            <div class="col-md-4">
                <label for="dateTo" class="form-label">{$lang.chat.to_date}:</label>
                <input type="date" id="dateTo" name="to" class="form-control" value="{$to|escape}" />
            </div>
            <style>
                .btn-compact {
                    padding: 0.25rem 0.5rem;
                    font-size: 0.875rem;
                }

                .btn-compact i {
                    font-size: 0.5em;
                    vertical-align: middle;
                }
            </style>

            <div class="col-md-4 mt-0">
                <div class="row">
                    <div class="col-6 d-grid">
                        <button type="submit" class="rounded btn btn-primary btn-compact w-100">
                            {$lang.chat.search_filter}
                        </button>
                    </div>
                    <div class="col-6 d-grid">
                        <button type="button" onclick="window.location.href = '/notifications'" class="btn btn-info btn-compact w-100">
                            {$lang.chat.reset_filter}
                        </button>
                    </div>
                </div>
            </div>

        </form>
    </div>

    <!-- Список уведомлений -->
    <div class="my-4" id="notificationList">
        {if !empty($notifications)}
            {foreach $notifications as $notification}
                <div style="cursor: pointer" onclick="window.location.href = '{$notification.module_url}'" class="card mb-3 notification-card shadow-sm notification-{$notification.id}">
                    <div class="card-body d-flex align-items-center gap-3">
                        {$notification.svg_ico}
                        <div class="flex-grow-1">
                            <h6 class="mb-1">{$notification.content}</h6>
                            <small class="text-primary">{$lang.chat[$notification.module_type]}</small>
                            <p class="mb-0 notification-time">{$notification.created_at}</p>
                        </div>
                    </div>
                </div>
            {/foreach}
        {else}
            <div class="text-center text-muted py-0 no-notifications">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="mb-3 text-secondary" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM4.285 12.433c.563-1.356 1.73-2.28 3.215-2.28s2.652.924 3.215 2.28a.5.5 0 0 1-.93.37 2.994 2.994 0 0 0-2.285-1.15 2.994 2.994 0 0 0-2.285 1.15.5.5 0 1 1-.93-.37zM5.5 6.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm5 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </svg>
                <p class="mb-0 fs-5">Уведомлений нет</p>
                <small class="text-secondary">Вы в курсе всех событий!</small>
            </div>
        {/if}
    </div>

    <!-- Пагинация — показывается только если больше одной страницы -->
    {if $pages > 1}
        <nav aria-label="Пагинация" class="mt-4">
            <ul class="pagination justify-content-center">

                {* Предыдущая — только если не первая страница *}
                {if $page > 1}
                    <li class="page-item">
                        <a class="page-link" href="/notifications?p={$page-1}{if $from}&from={$from}{/if}{if $to}&to={$to}{/if}">Пред.</a>
                    </li>
                {/if}

                {* Номера страниц *}
                {section name=i start=1 loop=$pages+1}
                    <li class="page-item {if $page == $smarty.section.i.index}active{/if}">
                        <a class="page-link" href="/notifications?p={$smarty.section.i.index}{if $from}&from={$from}{/if}{if $to}&to={$to}{/if}">
                            {$smarty.section.i.index}
                        </a>
                    </li>
                {/section}

                {* Следующая — только если не последняя страница *}
                {if $page < $pages}
                    <li class="page-item">
                        <a class="page-link" href="/notifications?p={$page+1}{if $from}&from={$from}{/if}{if $to}&to={$to}{/if}">След.</a>
                    </li>
                {/if}

            </ul>
        </nav>
    {/if}
</div>

<style>
    .notification-card {
        border: none;
        border-radius: 1rem;
        transition: all 0.2s ease-in-out;
    }
    .notification-card:hover {
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.07);
    }
    .notification-icon {
        font-size: 1.6rem;
        color: #562E74;
    }
    .notification-time {
        font-size: 0.85rem;
        color: #6c757d;
    }
    .filter-panel {
        border-radius: 0.75rem;
        padding: 1rem;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
    }
    .pagination {
        justify-content: center;
    }

    #notificationList {
        max-height: 400px; /* ограничиваем высоту */
        overflow-y: auto;
        padding-right: 8px; /* чтобы скролл не перекрывал контент */
    }

    /* Стилизация скроллбара для WebKit-браузеров */
    #notificationList::-webkit-scrollbar {
        width: 8px;
    }

    #notificationList::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 8px;
    }

    #notificationList::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 8px;
    }

    #notificationList::-webkit-scrollbar-thumb:hover {
        background: #999;
    }
</style>

<script>
    window.globalLang = '{$globalLangJson}';
    window.globalLang = JSON.parse(window.globalLang);
</script>
<script src="{$theme}/assets/ws/notification.js"></script>