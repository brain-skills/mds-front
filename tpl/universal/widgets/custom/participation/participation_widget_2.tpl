<div class="participation-widget"
     style="--primary: {$widgetData.settings.rgb_first};
             --secondary: {$widgetData.settings.rgb_second};
             --progress: {$widgetData.progress}">

    <div class="widget-header">
        <h2 class="widget-title">{$widgetData.name}</h2>
        <div class="participants-count">
            <span>{$widgetData.current_users}</span>/{$widgetData.max_user_count}
        </div>
    </div>

    <div class="progress-container">
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
        <div class="progress-label">{$widgetData.places_left_text}</div>
    </div>

    {if $widgetData.winner_exists}
        <div class="winner-badge">
            <svg class="icon" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/></svg>
            <span>Победитель определён</span>
        </div>
    {/if}

    <a href="{$widgetData.handleUrl}" class="cta-button">
        Участвовать
        <svg class="arrow-icon" viewBox="0 0 24 24"><path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z"/></svg>
    </a>
</div>
