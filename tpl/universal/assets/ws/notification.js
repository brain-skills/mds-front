$(document).ready(function () {

    let currentUserToken = null;
    let wsUrl = null;
    let ws;
    let notifications = [];
    const audio = document.getElementById('message-sound');

    // Загружаем токен
    $.ajax({
        url: '/engine/ajax/lib/notification/get_token.php',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.token !== false) {
                currentUserToken = response.token;
                wsUrl = response.ws_config.web_socket_url;
                connectToWebSocket();
            }
        }
    });

    // Клик по иконке уведомлений
    $('.dropdown-toggle-notification').on('click', function () {
        const unreadIds = notifications
            .filter(n => n.status === false)
            .map(n => n.id);

        if (unreadIds.length > 0) {
            $.ajax({
                url: '/engine/ajax/lib/notification/mark_as_read.php',
                method: 'POST',
                data: { ids: unreadIds },
                dataType: 'json',
                success: function (response) {
                    notifications = response;
                    updateDotIndicator();
                }
            });
        }
    });

    // --- РЕНДЕРИНГ ЧЕРЕЗ ШАБЛОНЫ ---

    function renderEmptyNotification($list) {
        const template = document.getElementById('tpl-empty-notification');
        const clone = template.content.cloneNode(true);
        $list.append(clone);
    }

    function renderNotificationItem(item, $list) {
        const template = document.getElementById('tpl-notification-item');
        const clone = template.content.cloneNode(true);
        clone.querySelector('.notification-sender-name').innerHTML = item.senderData.name;
        clone.querySelector('.sender-avatar').src = item.senderData.avatar;
        clone.querySelector('.notification-icon').src = 'templates/universal/svg/'+item.svg_ico;
        clone.querySelector('.notification-type').textContent = window.globalLang[item.module_type] || 'Уведомление';
        clone.querySelector('.notification-time').textContent = formatDate(item.created_at);
        
        if (item.status == false || item.status == 0) {
        	clone.querySelector('.status').classList.add('status-not-read');
        } else {
            clone.querySelector('.status').classList.add('status-read');
        }
        
      //  clone.querySelector('.notification-content').textContent = item.content;

        // переход по клику
        clone.querySelector('.notification-item').onclick = () => {
            window.location.href = item.module_url;
        };

        $list.append(clone);
    }

    function renderNotificationCard(item, $list) {
        const template = document.getElementById('tpl-notification-card');
        const clone = template.content.cloneNode(true);

        clone.querySelector('.notification-icon').innerHTML = item.svg_ico;
  //      clone.querySelector('.notification-content').textContent = item.content;
        clone.querySelector('.notification-time').textContent = formatDate(item.created_at);

        $list.prepend(clone);
    }

    // --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---

    function updateDotIndicator() {
        const $dot = $('.dropdown-toggle .bullet-dot');
        const unreadCount = notifications.filter(n => n.status === false).length;

        if ($dot.length) {
            if (unreadCount > 0) {
                $(".animation-blink").show();
                $dot.text(unreadCount > 10 ? '10+' : unreadCount);
            } else {
                $(".animation-blink").hide().text('');
            }
        }
    }

    function formatDate(utcDate) {
        return new Date(utcDate + ' UTC').toLocaleString('en-EN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }

    // --- WEBSOCKET ---

    function connectToWebSocket() {
        ws = new WebSocket(wsUrl + '?usr_token=' + currentUserToken);

        ws.onopen = function () {
            ws.send(JSON.stringify({
                type: 'notification',
                from_user_token: currentUserToken,
                action: "connect",
                globalLang: window.globalLang
            }));
        };

        ws.onmessage = function (event) {
            const data = JSON.parse(event.data);
            notifications = data.notifications;

            if (data.type === "notification" &&
                (data.action === "connect" || data.action === "send")) {

                const $list = $('#NotificationsDiv ul');
                $list.empty();

                if (!notifications || notifications.length < 1) {
                    renderEmptyNotification($list);
                } else {
                    notifications.forEach(item => renderNotificationItem(item, $list));
                }

                updateDotIndicator();

                // если новое уведомление
                if (data.action === "send" && notifications.length > 0) {
                    const item = notifications[0];

                    audio.play();
                    Push.create(window.globalLang[item.module_type], {
                        body: item.content,
                        icon: 'https://cdn-icons-png.flaticon.com/512/1827/1827349.png',
                        timeout: 5000,
                        onClick: function () {
                            window.location.href = item.module_url;
                            this.close();
                        }
                    });

                    $(".no-notifications").addClass("d-none");
                    renderNotificationCard(item, $('#notificationList'));
                }
            }
        };
    }

    // Переподключение при возврате на вкладку
    $(document).on("visibilitychange", function () {
        if (!document.hidden) {
            connectToWebSocket();
        }
    });

});
