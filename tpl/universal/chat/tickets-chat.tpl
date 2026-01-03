<link rel="stylesheet" href="{$stheme}/css/ws/tickets.css">
<input type="hidden" id="wsurl" value="{$wsConfig.web_socket_url}">
<input type="hidden" id="nmt" value="{$wsConfig.live_chat.nextMessageTime}">
<div class="chat-container" style="height: 100%">
    <div class="ticket-list">
        <div class="ticket-controls">
            <input type="text" id="search" class="form-control mb-2" placeholder="Поиск тикетов...">
            <select id="priority-filter" class="form-select">
                <option value="">Все приоритеты</option>
                <option value="high">Высокий</option>
                <option value="medium">Средний</option>
                <option value="low">Низкий</option>
            </select>
        </div>
        <div id="ticket-items">
            <!-- Тикеты появятся здесь -->
        </div>
    </div>
    <div class="chat-box">
        <div class="chat-header">
            <h5 id="ticket-subject" class="mb-0">Выберите тикет</h5>
        </div>
        <div class="chat-messages" id="ticket-messages"></div>
        <div class="chat-input">
            <form id="reply-form" class="d-flex gap-2" style="display: none;">
                <input type="text" id="reply-text" class="form-control" placeholder="Напишите сообщение..." required>
                <button class="btn btn-primary send-ticket-message" type="submit">Отправить</button>
            </form>
        </div>
    </div>
</div>
<script>
    window.globalLang = '{$langJson}';
    window.globalLang = JSON.parse(window.globalLang);
</script>
<script src="{$theme}/assets/ws/tickets-chat.js"></script>