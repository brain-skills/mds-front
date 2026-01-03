<div class="participation-widget" style="background: {$widgetData.settings.rgb_first}; color: {$widgetData.settings.rgb_second};">
    <h2>{$widgetData.name}</h2>
    <p>{$widgetData.places_left_text}</p>
    <div class="progress-bar" style="width: {$widgetData.progress};"></div>
    <p>Участников: {$widgetData.current_users} / {$widgetData.max_user_count}</p>
    {if $widgetData.winner_exists}
        <p class="winner">Победитель уже определён!</p>
    {/if}
    <button onclick='window.location.href = "{$widgetData.handleUrl}"' class="join-btn">Принять участие</button>
</div>

