/*
$(document).ready(function () {

    let currentUserToken = null;
    let wsUrl = null;
    let ws;
    let notifications = [];

    $.ajax({
        url: '/engine/ajax/lib/notification/get_token.php', // Замените на ваш маршрут
        type: 'GET',
        data: { },
        dataType: 'json',
        success: function(response) {
            if (response.token !== false) {
                currentUserToken = response.token;
                wsUrl = response.ws_config.web_socket_url;
                connectToWebSocket();
            }
        },
        error: function(xhr) {
        }
    });

    function connectToWebSocket() {

        ws = new WebSocket(wsUrl + '?usr_token=' + currentUserToken);

        debugger;
        ws.onopen = function () {
            console.log('Connected to WebSocket server');
            ws.send(JSON.stringify({
                type: 'notification',
                from_user_token: currentUserToken,
                action: "connect",
                globalLang: window.globalLang
            }));
        };

        ws.onmessage = function (event) {
            debugger;
            const data = JSON.parse(event.data);
            notifications = data.notifications
            if (data.type === "notification" && data.action === "send") {
               // audio.play();
                const $list = $('#notificationList');

                // Перебираем уведомления и добавляем в список
                $.each(notifications, function (index, item) {
                    const time = new Date(item.created_at).toLocaleString('en-EN', {
                        day: 'numeric',
                        month: 'short',   // например, "May"
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit', // добавляем секунды
                        hour12: false      // отключаем 12-часовой формат (AM/PM), если нужно
                    });


                    const notificationItem = `
                         <div class="card mb-3 notification-card shadow-sm">
                            <div class="card-body d-flex align-items-center gap-3">
                                ${item.svg_ico}
                                <div class="flex-grow-1">
                                    <h6 class="mb-1">${item.content}</h6>
                                    <p class="mb-0 notification-time">${item.created_at}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    $list.append(notificationItem);
                });
            }

        }

    }

});*/
