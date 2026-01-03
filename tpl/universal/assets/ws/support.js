$(document).ready(function () {

    let currentUserToken = null;
    let wsUrl = null;
    let ws;
    let notifications = [];
    const audio = document.getElementById('message-sound');
    const supportButton = $('#supportButton');
    const supportDropdown = $('#supportDropdown');

    const chatOption = document.getElementById('chatOption');
    const chatWidget = document.getElementById('chatWidget');
    const closeChat = document.getElementById('closeChat');
    var $chatWidget = $("#chatWidget");
    var $chatHeader = $("#chatHeader");
    var isDragging = false;
    var offset = { top: 0, left: 0 };

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

        ws.onopen = function () {
            ws.send(JSON.stringify({
                type: 'support',
                from_user_token: currentUserToken,
                action: "connect",
                //globalLang: window.globalLang
            }));
        };

        ws.onmessage = function (event) {
            const data = JSON.parse(event.data);

            if (data.type === "support" && data.action === "connect") {

                $(".support-online").html("Support online " + data.countOnlineSupport);
                const messagesBlock = $(".messages-block");

                messagesBlock.empty();


                if (data.supportMessages.length > 0) {
                    $(".empty-chat").removeClass("d-flex");
                    $(".empty-chat").addClass("d-none");


                    data.supportMessages.forEach(message => {

                        let messageHtml =  ``;

                        if (message.type === "me") {
                            sendMessage(message);

                        } else {
                            const responseTime = message.created_at;

                            const responseElement = document.createElement('div');
                            responseElement.className = 'message agent-message';
                            responseElement.innerHTML = `
                                <div class="message-avatar agent-avatar-small">${message.sender_name_short}</div>
                                <div class="message-content">
                                    <div class="message-bubble agent-bubble">${message.message}</div>
                                    <div class="message-time">${responseTime}</div>
                                </div>
                            `;

                            $(".agent-avatar").html(message.sender_name_short);
                            $(".agent-name").html(message.sender_name);

                            chatBody.appendChild(responseElement);

                            // Прокрутка вниз
                            chatBody.scrollTop = chatBody.scrollHeight;
                        }

                     ///   messagesBlock.append(messageHtml);


                    })

                } else {
                    messagesBlock.append(`Нету сообщений`);

                }


            } else if (data.type === "support" && data.action === "sendMessage") {

                const messagesBlock = $(".messages-block");

                let messageHtml = ``;

                $(".empty-chat").removeClass("d-flex");
                $(".empty-chat").addClass("d-none");

                if (data.message.type === "me") {
                   /* messageHtml = `<div class="text-end mb-2">
                                            <div class="bg-success text-white p-2 rounded shadow-sm d-inline-block w-75">${data.message.message}</div>
                                        </div>`;*/
                    $(".agent-avatar").html(data.supportNameShort);
                    $(".agent-name").html(data.supportName);

                    sendMessage(data.message);

                } else {
                    const responseTime = data.message.created_at;

                    const responseElement = document.createElement('div');
                    responseElement.className = 'message agent-message';
                    responseElement.innerHTML = `
                                <div class="message-avatar agent-avatar-small">${data.supportNameShort}</div>
                                <div class="message-content">
                                    <div class="message-bubble agent-bubble">${data.message.message}</div>
                                    <div class="message-time">${responseTime}</div>
                                </div>
                            `;

                    chatBody.appendChild(responseElement);

                    // Прокрутка вниз
                    chatBody.scrollTop = chatBody.scrollHeight;
                }

               // messagesBlock.append(messageHtml);


            }

        }

    }

    $(".send-m-support").on("click", function () {

        const message = $(".message-input").val();


        ws.send(JSON.stringify({
            type: 'support',
            from_user_token: currentUserToken,
            action: "sendMessage",
            message: message
            //globalLang: window.globalLang
        }));

    });


    $('#ticketForm').on('submit', function(e) {
        e.preventDefault(); // отменяем стандартную отправку формы

        // собираем данные
        const data = {
            title: $('#ticketTitle').val(),
            subject: $('#ticketDescription').val(),
            priority: $('#ticketPriority').val()
        };

        ws.send(JSON.stringify({
            type: 'support',
            from_user_token: currentUserToken,
            action: "createTicket",
            data: data
            //globalLang: window.globalLang
        }));
    });

/*
    $chatHeader.on("mousedown", function (e) {
        debugger;
        isDragging = true;
        var pos = $chatWidget.offset();
        offset.top = e.pageY - pos.top;
        offset.left = e.pageX - pos.left;
        $("body").css("user-select", "none"); // отключаем выделение текста
    });*/
/*
    $(document).on("mousemove", function (e) {
        if (isDragging) {
            $chatWidget.css({
                top: e.pageY - offset.top + "px",
                left: e.pageX - offset.left + "px",
                right: "auto",
                bottom: "auto",
                position: "absolute"
            });
        }
    });*/

   /* $(document).on("mouseup", function () {
        isDragging = false;
        $("body").css("user-select", ""); // возвращаем выделение
    });*/

  /*  chatOption.addEventListener('click', () => {
        chatWidget.style.display = 'block';
    });*/

    closeChat.addEventListener('click', () => {
        chatWidget.style.display = 'none';
    });

    // Toggle support dropdown
    supportButton.click(function(e) {
        e.stopPropagation();
        supportDropdown.toggleClass('show');
    });

    // Close dropdown when clicking outside
    $(document).click(function() {
        supportDropdown.removeClass('show');
    });

    // Prevent dropdown close when clicking inside
    supportDropdown.click(function(e) {
        e.stopPropagation();
    });

    // Ticket option click
    $('#ticketOption').click(function() {
        supportDropdown.removeClass('show');
        new bootstrap.Modal('#ticketModal').show();
    });

    /*  // Chat option click
      $('#chatOption').click(function() {
          supportDropdown.removeClass('show');
          new bootstrap.Modal('#chatModal').show();
      });*/

    // Form submission
    $('#ticketForm').submit(function(e) {
        e.preventDefault();
        alert('Тикет успешно создан! Мы свяжемся с вами в ближайшее время.');
        $('#ticketModal').modal('hide');
        this.reset();
    });

    const chatToggle = document.getElementById('chatToggle');
   // const minimizeChat = document.getElementById('minimizeChat');
    const chatBody = document.getElementById('chatBody');
    const messageInput = document.querySelector('.message-input');
    const sendBtn = document.querySelector('.send-btn');


    // Открытие/закрытие чата
    chatToggle.addEventListener('click', function() {
        chatWidget.style.display = 'flex';
        chatToggle.style.display = 'none';
        // Прокрутка вниз
        setTimeout(() => {
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 100);
    });

    closeChat.addEventListener('click', function() {
        chatWidget.style.display = 'none';
        chatToggle.style.display = 'flex';
    });

 /*   minimizeChat.addEventListener('click', function() {
        chatWidget.style.display = 'none';
        chatToggle.style.display = 'flex';
    });*/

    function receiveMessage() {

    }

    // Отправка сообщения
    function sendMessage(message) {
        //const message = messageInput.value.trim();
        if (message) {
            const now = new Date();
            const time = message.created_at;

            const messageElement = document.createElement('div');
            messageElement.className = 'message user-message';
            messageElement.innerHTML = `
                        <div class="message-content">
                            <div class="message-bubble user-bubble">${message.message}</div>
                            <div class="message-time">${message.created_at}</div>
                        </div>
                        <div class="message-avatar user-avatar-small">Я</div>
                    `;

            chatBody.appendChild(messageElement);
            messageInput.value = '';

            // Прокрутка вниз
            chatBody.scrollTop = chatBody.scrollHeight;

        }
    }

   // sendBtn.addEventListener('click', sendMessage);

    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const message = $(".message-input").val();


            ws.send(JSON.stringify({
                type: 'support',
                from_user_token: currentUserToken,
                action: "sendMessage",
                message: message
                //globalLang: window.globalLang
            }));
        }
    });

    // Перетаскивание окна чата
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = document.getElementById('chatHeader');

   // header.addEventListener('mousedown', dragMouseDown);

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // Получаем начальную позицию курсора
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // Вычисляем новую позицию курсора
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // Устанавливаем новую позицию
        chatWidget.style.top = (chatWidget.offsetTop - pos2) + "px";
        chatWidget.style.left = (chatWidget.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // Останавливаем перемещение при отпускании кнопки мыши
        document.onmouseup = null;
        document.onmousemove = null;
    }

   /* $(document).on("visibilitychange", function () {
        if (document.hidden) {
            //ws.close();
        } else {
            connectToWebSocket();
        }
    });*/

});
document.addEventListener("DOMContentLoaded", function () {
    const chatToggle = document.getElementById("chatToggle");
    const chatWidget = document.getElementById("chatWidget");
    const closeChat = document.getElementById("closeChat");

    function lockBodyScroll() {
        if (window.innerWidth < 700) {
            document.body.style.overflow = "hidden";
        }
    }

    function unlockBodyScroll() {
        document.body.style.overflow = "";
    }

    // Открытие чата
    chatToggle.addEventListener("click", () => {
        chatWidget.classList.add("open");
        lockBodyScroll();
    });

    // Закрытие чата
    closeChat.addEventListener("click", () => {
        chatWidget.classList.remove("open");
        unlockBodyScroll();
    });
});
