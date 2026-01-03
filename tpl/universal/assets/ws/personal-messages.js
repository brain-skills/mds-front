$(document).ready(function () {
    // Cached jQuery selectors
    const $chatMessages = $('#chat-messages .d-flex.flex-column');
    const $chatMessagesContainer = $chatMessages.parent();
    const $actionHeaderP = $('.action-header P');
    const $actionHeaderImg = $('.action-header img');
    const $actionHeaderH6 = $('.action-header h6');
    const $statusIndicator = $('.status-indicator');
    const $statusIndicatorLeft = $('.status-indicator-left');
    const $inputBlock = $('.input-block');
    const $blockBlock = $('.block-block');
    const $blockUser = $('.blockUser');
    const $messageInput = $('#message-input');
    const $sendButton = $('#send-button');
    const $toUserId = $('#to_usr_id');
    const $chatUsersList = $('#chat-users-list');
    const $chatList = $('#chat-list');
    const $chatWindow = $('#chat-window');
    const $chatSettings = $('.chat-settings');
    const $profileWrapper = $('.profile-wrapper');
    const $chatPlaceholder = $('.chat-placeholder');
    const $typing = $('#typing');
    const $typingName = $('#typing-name');
    const $replyPreview = $('#reply-preview');
    const $replyText = $('#reply-text');
    const $fileInfo = $('#file-info');
    const $fileName = $('#file-name');
    const $fileInput = $('#file-input');

    const input = document.querySelector('#message-input');
    const trigger = document.querySelector('#emoji-picker-button');
    const picker = new EmojiButton();
    const audio = document.getElementById('message-sound');
    const volumeToggle = document.getElementById('volume-toggle');
    const backBtn = document.getElementById('back-to-list');
    const openChatLinks = document.querySelectorAll('.open-chat');

    picker.on('emoji', emoji => {
        input.value += emoji;
    });

    trigger.addEventListener('click', () => {
        picker.togglePicker(trigger);
    });

    const icons = {
        on: `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                 fill="currentColor" class="bi bi-volume-up" viewBox="0 0 16 16">
                <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>
                <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>
                <path d="M10.025 8a4.5 4.5 0 0 1-1.318 3.182L8 10.475A3.5 3.5 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.5 4.5 0 0 1 10.025 8M7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11"/>
            </svg>
        `,
        off: `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                 fill="currentColor" class="bi bi-volume-mute-fill" viewBox="0 0 16 16">
                <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06m7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708l1.646 1.647a.5.5 0 0 1 0 .708z"/>
            </svg>
        `
    };

    let soundEnabled = localStorage.getItem('soundEnabled') === 'true';
    volumeToggle.innerHTML = soundEnabled ? icons.on : icons.off;

    volumeToggle.addEventListener('click', function () {
        soundEnabled = !soundEnabled;
        localStorage.setItem('soundEnabled', soundEnabled);
        volumeToggle.innerHTML = soundEnabled ? icons.on : icons.off;
        if (!soundEnabled) {
            audio.pause();
            audio.currentTime = 0;
        }
    });

    window.playMessageSound = function () {
        if (soundEnabled) {
            audio.play().catch(error => {
                console.log('ERROR NOTIFICATION SOUND:', error);
            });
        }
    };

    let ws;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;
    const baseReconnectDelay = 1000;
    const currentUserToken = $("#usr_token").val();
    const wsUrl = $("#wsurl").val();

    function getDateHeader(date) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        
        const messageDate = new Date(date);
        const isToday = messageDate.toDateString() === today.toDateString();
        const isYesterday = messageDate.toDateString() === yesterday.toDateString();
        
        if (isToday) {
            return null; // No header for today
        } else if (isYesterday) {
            return 'Yesterday';
        } else {
            return messageDate.toLocaleDateString([], { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        }
    }

    function reConnectWs() {
        if (reconnectAttempts >= maxReconnectAttempts) {
            console.error('Max reconnect attempts reached');
            return;
        }

        ws = new WebSocket(wsUrl + '?usr_token=' + currentUserToken);

        ws.onopen = function () {
            reconnectAttempts = 0;
            ws.send(JSON.stringify({
                type: 'register',
                usr_token: currentUserToken
            }));
        };

        ws.onerror = function () {
            reconnectAttempts++;
            const delay = baseReconnectDelay * Math.pow(2, reconnectAttempts);
            setTimeout(reConnectWs, delay);
        };

        ws.onclose = function () {
            reconnectAttempts++;
            const delay = baseReconnectDelay * Math.pow(2, reconnectAttempts);
            setTimeout(reConnectWs, delay);
        };

        ws.onmessage = function (event) {
            const data = JSON.parse(event.data);
            const toUserId = $toUserId.val();
            $('.no-messages').attr('hidden', 'hidden');

            let lastDate = null;
            const lastHeader = $chatMessages.find('.text-center.text-muted.my-3').last().find('span').text();
            if (lastHeader) {
                lastDate = lastHeader === 'Yesterday' ? 
                    new Date(new Date().setDate(new Date().getDate() - 1)).toDateString() : 
                    new Date(lastHeader).toDateString();
            }

            if (data.type === 'chat') {
                if (data.hasOwnProperty('my_message') && data.my_message === true) {
                    if (data.action === 'messageEdit') {
                        if (data.hasOwnProperty('messageData') && data.messageData) {
                            const messageElem = $(`#m-${data.messageData.id}`);
                            const date = new Date(data.messageData.created_at);
                            const timeOnly = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            messageElem.find('.created_at').html(`${timeOnly} <small class="text-muted fst-italic" style="font-size: 0.65rem;">(Изменено)</small>`);
                            messageElem.find('.message p:first').html(data.messageData.message);
                            messageElem.find('.deleted').html('');
                        }
                    } else {
                        if (data.hasOwnProperty('messageData') && data.messageData) {
                            const msg = data.messageData;
                            let messageMap = [];
                            if (data.action === 'messageReply' && msg.repliedMessage) {
                                messageMap[msg.repliedMessage.id] = {
                                    id: msg.repliedMessage.id,
                                    message: msg.repliedMessage.message,
                                    reply_to_id: msg.reply_to_id,
                                    from: 'me'
                                };
                            }

                            let imageHtml = '';
                            if (msg.file_url && msg.file_type === 'images') {
                                imageHtml = `
                                    <a href="${msg.file_url}" data-lightbox="preview">
                                        <img src="${msg.file_url}" alt="${window.chatLang.image}" class="message-image">
                                    </a>`;
                            } else if (msg.file_url && msg.file_type === 'files') {
                                imageHtml = fileMessageHtml(msg.file_name, msg.file_url);
                            }

                            let replyHTML = '';
                            if (msg.reply_to_id && messageMap[msg.reply_to_id]) {
                                const repliedMessage = messageMap[msg.reply_to_id];
                                const previewText = repliedMessage.message.length > 50
                                    ? repliedMessage.message.substring(0, 50) + '...'
                                    : repliedMessage.message;
                                replyHTML = `
                                    <div class="reply-to small text-muted border-start border-3 ps-2 mb-1">
                                        ${window.chatLang.reply_to}: ${previewText}
                                    </div>
                                `;
                            }

                            const date = new Date(msg.created_at);
                            const dateHeader = getDateHeader(date);
                            const dateString = date.toDateString();

                            if (dateHeader && dateString !== lastDate) {
                                $chatMessages.append(`
                                    <div class="text-center text-muted my-3">
                                        <span class="bg-blurred px-3 py-1 rounded">${dateHeader}</span>
                                    </div>
                                `);
                                lastDate = dateString;
                            }

                            const timeOnly = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            const messageHTML = `
                                <div class="align-self-end text-end message-container" id="m-${msg.id}">
                                    <div class="d-flex flex-row-reverse gap-3 align-items-center">
                                        <div>
                                            ${replyHTML}
                                            <div class="d-flex bg-primary text-white p-2 rounded-3 message text-break">
                                                <p class="mb-0" style="word-break:break-all;">${msg.message}</p>
                                            </div>
                                            <p class="mb-0 ms-2 text-muted created_at sender-message-time">${timeOnly}</p>
                                            ${imageHtml}
                                        </div>
                                        <small class="text-muted fst-italic ms-2 deleted" style="font-size: 0.65rem;"></small>
                                        <div class="dropdown">
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item item-m-b" data-m-type="edit" data-m-id="${msg.id}" data-m-text="${msg.message}" href="#">${window.chatLang.edit}</a></li>
                                                <li><a class="dropdown-item item-m-b" data-m-type="reply" data-m-id="${msg.id}" data-m-text="${msg.message}" href="#">${window.chatLang.reply}</a></li>
                                                <li><a class="dropdown-item item-m-b text-danger" data-m-type="delete" data-m-id="${msg.id}" data-m-text="${msg.message}" href="#">${window.chatLang.del_for_me}</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            `;

                            $chatMessages.append(messageHTML);
                            if (msg.message === '') {
                                $(`#m-${msg.id}`).find('.message').addClass('d-none');
                            }
                            $chatMessagesContainer[0].scrollTop = $chatMessagesContainer[0].scrollHeight;
                            rebindLightbox();
                            const displayMessage = msg.message || 'Файл';
                            $(`.u-${toUserId}`).find('.last_message').html(`Вы отправили ${displayMessage.length > 40 ? displayMessage.substring(0, 40) + "..." : displayMessage}`);
                            if (soundEnabled) {
                                audio.currentTime = 0;
                                audio.play().catch(error => {
                                    console.log('ERROR NOTIFICATION SOUND:', error);
                                });
                            }
                        }
                    }
                } else if (data.action === 'type') {
                    $actionHeaderP.css('color', 'green').html('Online');
                    $statusIndicator.removeClass('status-offline').addClass('status-online');
                    $(`.u-${data.sender_id}`).find('.status-indicator-left').removeClass('status-offline').addClass('status-online');
                    showTypingDebounced(data.sender_name, data.sender_id);
                } else if (data.action === 'message') {
                    if (data.sender_id == toUserId) {
                        $actionHeaderP.css('color', 'green').html('Online');
                        $statusIndicator.removeClass('status-offline').addClass('status-online');
                        $(`.u-${data.sender_id}`).find('.status-indicator-left').removeClass('status-offline').addClass('status-online');
                        if (data.text == null) {
                            showTypingDebounced(data.sender_name);
                        } else {
                            hideTyping();
                            const displayMessage = data.text || 'Файл';
                            $(`.u-${data.sender_id}`).find('.last_message').html(displayMessage.length > 40 ? displayMessage.substring(0, 40) + "..." : displayMessage);
                            let imageHtml = '';
                            if (data.file_url && data.file_type === 'images') {
                                imageHtml = `
                                    <a href="${data.file_url}" data-lightbox="preview">
                                        <img src="${data.file_url}" alt="${window.chatLang.image}" class="message-image">
                                    </a>`;
                            } else if (data.file_url && data.file_type === 'files') {
                                imageHtml = fileMessageHtml(data.file_name, data.file_url);
                            }

                            const date = new Date(data.time);
                            const dateHeader = getDateHeader(date);
                            const dateString = date.toDateString();

                            if (dateHeader && dateString !== lastDate) {
                                $chatMessages.append(`
                                    <div class="text-center text-muted my-3">
                                        <span class="bg-blurred px-3 py-1 rounded">${dateHeader}</span>
                                    </div>
                                `);
                                lastDate = dateString;
                            }

                            const timeOnly = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            const messageHTML = `
                                <div class="align-self-start message-container" id="m-${data.messageData.id}">
                                    <div class="d-flex gap-3 align-items-center">
                                        <div>
                                            <div class="d-flex bg-body-tertiary p-2 rounded-3 message text-break">
                                                <p class="mb-0">${data.text}</p>
                                            </div>
                                            <p class="mb-0 ms-2 text-muted created_at receiver-message-time text-nowrap">${timeOnly}</p>
                                            ${imageHtml}
                                        </div>
                                        <small class="text-muted fst-italic ms-2 deleted" style="font-size: 0.65rem;"></small>
                                        <div class="dropdown">
                                            <ul class="dropdown-menu dropdown-menu-end">
                                                <li><a class="dropdown-item item-m-b" data-m-type="reply" data-m-id="${data.messageData.id}" data-m-text="${data.text}" href="#">${window.chatLang.reply}</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            `;

                            $chatMessages.append(messageHTML);
                            if (data.text === '') {
                                $(`#m-${data.messageData.id}`).find('.message').addClass('d-none');
                            }
                            $chatMessagesContainer[0].scrollTop = $chatMessagesContainer[0].scrollHeight;
                            rebindLightbox();
                            if (soundEnabled) {
                                audio.currentTime = 0;
                                audio.play().catch(error => {
                                    console.log('ERROR NOTIFICATION SOUND:', error);
                                });
                            }
                        }
                    } else {
                        if (data.text != null) {
                            if (soundEnabled) {
                                audio.currentTime = 0;
                                audio.play().catch(error => {
                                    console.log('ERROR NOTIFICATION SOUND:', error);
                                });
                            }
                            getChat('');
                            showBootstrapAlert(data.sender_name);
                        }
                    }
                } else if (data.action === 'messageEdit') {
                    if (data.hasOwnProperty('messageData') && data.messageData) {
                        const messageElem = $(`#m-${data.messageData.id}`);
                        const date = new Date(data.messageData.created_at);
                        const timeOnly = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        messageElem.find('.created_at').html(`${timeOnly} <small class="text-muted fst-italic" style="font-size: 0.65rem;">(Изменено)</small>`);
                        messageElem.find('.message p:first').html(data.messageData.message);
                        messageElem.find('.deleted').html('');
                    }
                } else if (data.action === 'messageDelete') {
                    $(`.u-${data.sender_id}`).find('.last_message').html('Сообщение удалено');
                    if (data.hasOwnProperty('messageData') && data.messageData) {
                        const messageElem = $(`#m-${data.messageData.id}`);
                        messageElem.find('.deleted').html('Удалил у себя');
                    }
                } else if (data.action === 'messageReply') {
                    const displayMessage = data.text || 'Файл';
                    if (data.my_message) {
                        $(`.u-${data.sender_id}`).find('.last_message').html(`Вы отправили ${displayMessage.length > 40 ? displayMessage.substring(0, 40) + "..." : displayMessage}`);
                    } else {
                        $(`.u-${data.sender_id}`).find('.last_message').html(displayMessage.length > 40 ? displayMessage.substring(0, 40) + "..." : displayMessage);
                    }
                    if (data.hasOwnProperty('messageData') && data.messageData) {
                        const msg = data.messageData;
                        let messageMap = [];
                        messageMap[msg.repliedMessage.id] = {
                            id: msg.repliedMessage.id,
                            message: msg.repliedMessage.message,
                            reply_to_id: msg.reply_to_id,
                            from: 'user'
                        };
                        let imageHtml = '';
                        if (msg.file_url && msg.file_type === 'images') {
                            imageHtml = `
                                <a href="${msg.file_url}" data-lightbox="preview">
                                    <img src="${msg.file_url}" alt="${window.chatLang.image}" class="message-image">
                                </a>`;
                        } else if (msg.file_url && msg.file_type === 'files') {
                            imageHtml = fileMessageHtml(msg.file_name, msg.file_url);
                        }

                        let replyHTML = '';
                        if (msg.reply_to_id && messageMap[msg.reply_to_id]) {
                            const repliedMessage = messageMap[msg.reply_to_id];
                            const previewText = repliedMessage.message.length > 50
                                ? repliedMessage.message.substring(0, 50) + '...'
                                : repliedMessage.message;
                            replyHTML = `
                                <div class="reply-to small text-muted border-start border-3 ps-2 mb-1">
                                    ${window.chatLang.reply_to}: ${previewText}
                                </div>
                            `;
                        }

                        const date = new Date(data.time);
                        const dateHeader = getDateHeader(date);
                        const dateString = date.toDateString();

                        if (dateHeader && dateString !== lastDate) {
                            $chatMessages.append(`
                                <div class="text-center text-muted my-3">
                                    <span class="bg-blurred px-3 py-1 rounded">${dateHeader}</span>
                                </div>
                            `);
                            lastDate = dateString;
                        }

                        const timeOnly = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const messageHTML = `
                            <div class="align-self-start message-container" id="m-${msg.id}">
                                <div class="d-flex gap-3 align-items-center">
                                    <div>
                                        ${replyHTML}
                                        <div class="d-flex bg-body-tertiary p-2 rounded-3 message text-break">
                                            <p class="mb-0">${data.text}</p>
                                        </div>
                                        <p class="mb-0 ms-2 text-muted created_at receiver-message-time text-nowrap">${timeOnly}</p>
                                        ${imageHtml}
                                    </div>
                                    <small class="text-muted fst-italic ms-2 deleted" style="font-size: 0.65rem;"></small>
                                    <div class="dropdown">
                                        <button class="btn btn-link p-0 m-0" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="fa fa-ellipsis-v text-body"></i>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-end">
                                            <li><a class="dropdown-item item-m-b" data-m-type="reply" data-m-id="${msg.id}" data-m-text="${data.text}" href="#">${window.chatLang.reply}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        `;

                        $chatMessages.append(messageHTML);
                        $chatMessagesContainer[0].scrollTop = $chatMessagesContainer[0].scrollHeight;
                        rebindLightbox();
                        if (soundEnabled) {
                            audio.currentTime = 0;
                            audio.play().catch(error => {
                                console.log('ERROR NOTIFICATION SOUND:', error);
                            });
                        }
                    }
                }
            }
        };
    }

    reConnectWs();

    function getChat(query) {
        $.ajax({
            url: '/engine/ajax/lib/chat/get_chat_users.php',
            type: 'POST',
            data: { query: query },
            success: function (response) {
                let users = JSON.parse(response);
                $chatUsersList.empty();

                if (users.length > 0) {
                    users.forEach(user => {
                        const avatar = user.avatar ? '/' + user.avatar : 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp';
                        const name = user.name || 'Без имени';
                        let lastMessage = user.lastMessage || 'Нет сообщений';
                        if (user.is_from_me === true) {
                            lastMessage = `Вы отправили ${lastMessage}`;
                        }
                        if (user.is_blocked === 1) {
                            lastMessage = "<p color='red'>Blocked</p>";
                        }
                        if (user.status === 'online') {
                            lastDate = 'online';
                        } else if (user.lastdate) {
                            const date = new Date(user.lastdate);
                            lastDate = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        }
                        const userHTML = `
                            <li class="border-bottom u-${user.id} message-container">
                                <a href="#" class="p-1 d-flex justify-content-between text-decoration-none text-body open-chat" data-user-id="${user.id}" data-user-name="${name}" data-user-avatar="${avatar}">
                                    <div class="d-flex align-items-center">
                                        <div class="profile-wrapper">
                                            <img src="${avatar}" class="avatar rounded-circle" style="width: 45px; height: 45px; object-fit: cover;">
                                            <span class="status-indicator-left status-${user.status}"></span>
                                        </div>
                                        <div>
                                            <p class="mb-1 fw-semibold">${name}</p>
                                            <p class="small text-muted mb-0 last_message">${lastMessage.length > 50 ? lastMessage.substring(0, 50) + "..." : lastMessage}</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        `;
                        $chatUsersList.append(userHTML);
                    });
                } else {
                    $chatUsersList.append(`
                        <div class="text-center text-muted py-5 no-notifications">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="mb-3 text-secondary" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM4.285 12.433c.563-1.356 1.73-2.28 3.215-2.28s2.652.924 3.215 2.28a.5.5 0 0 1-.93.37 2.994 2.994 0 0 0-2.285-1.15 2.994 2.994 0 0 0-2.285 1.15.5.5 0 0 1-.93-.37zM5.5 6.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm5 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                            </svg>
                            <p class="mb-0 fs-5">Чатов нет</p>
                        </div>
                    `);
                }

                $('.open-chat').on('click', function (e) {
                    e.preventDefault();
                    const userId = $(this).data('user-id');
                    const userName = $(this).data('user-name');
                    const userAvatar = $(this).data('user-avatar');
                    $chatUsersList.find('li').removeClass('active-chat');
                    $(this).closest('li').addClass('active-chat');
                    $messageInput.val('');
                    $sendButton.attr('data-type', 'send').attr('data-mid', '').html(window.chatLang.send);

                    $.ajax({
                        url: '/engine/ajax/lib/chat/get_status.php',
                        method: 'GET',
                        data: { userId: userId },
                        dataType: 'json',
                        success: function (response) {
                            if (response.is_blocked === 1) {
                                $inputBlock.addClass('d-none');
                                $blockBlock.removeClass('d-none');
                                $blockUser.html(window.chatLang.unblock).attr('data-action', 'unblock');
                            } else {
                                $inputBlock.removeClass('d-none').addClass('d-flex');
                                $blockBlock.addClass('d-none');
                                $blockUser.html(window.chatLang.block).attr('data-action', 'block');
                            }
                            if (response.status === 'online') {
                                $actionHeaderP.css('color', 'green').html(window.chatLang.online);
                                $statusIndicator.removeClass('status-offline').addClass('status-online');
                            } else {
                                const lastSeenDate = response.lastdate ? new Date(response.lastdate) : null;
                                let lastSeenText;
                                if (!lastSeenDate) {
                                    lastSeenText = '<b>Last seen</b>: a long time ago';
                                } else {
                                    const now = new Date();
                                    const diffMs = now - lastSeenDate;
                                    const diffMins = Math.round(diffMs / (1000 * 60));
                                    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
                                    if (diffMins < 60) {
                                        lastSeenText = `<b>Last seen</b>: ${diffMins} min ago`;
                                    } else if (diffDays < 1) {
                                        const diffHours = Math.round(diffMins / 60);
                                        lastSeenText = `<b>Last seen</b>: ${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
                                    } else if (diffDays <= 7) {
                                        lastSeenText = `<b>Last seen</b>: ${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
                                    } else {
                                        lastSeenText = '<b>Last seen</b>: a long time ago';
                                    }
                                }
                                $actionHeaderP.css('color', 'gray').html(`<span style="font-size: 0.85em; color: #888;">${lastSeenText}</span>`);
                                $statusIndicator.removeClass('status-online').addClass('status-offline');
                            }
                        }
                    });

                    $toUserId.val(userId);
                    openChat(userId, userName, userAvatar, '');
                });
            },
            error: function (xhr, status, error) {
                console.error('Ошибка загрузки пользователей:', error);
            }
        });
    }

    function openChat(userId, userName, userAvatar, status) {
        $actionHeaderImg.attr('src', userAvatar);
        $actionHeaderH6.text(userName);
        $('.action-header').addClass('d-flex');
        $chatMessages.empty().append('<div class="text-center my-3">' + window.chatLang.loading_messages + '</div>');
        $inputBlock.removeClass('d-none').addClass('d-flex');
        $chatSettings.removeClass('d-none').addClass('d-flex');
        $profileWrapper.removeClass('d-none');
        $chatPlaceholder.addClass('d-none');

        $.ajax({
            url: '/engine/ajax/lib/chat/get_chat_messages.php',
            method: 'GET',
            data: { user_id: userId },
            dataType: 'json',
            success: function (messages) {
                $chatMessages.empty();
                if (messages.length === 0) {
                    $chatMessages.append(`
                        <div class="text-center text-muted mt-5 no-messages">
                            ${window.chatLang.no_pm_messages}
                        </div>
                    `);
                } else {
                    const messageMap = {};
                    messages.forEach(msg => {
                        messageMap[msg.id] = msg;
                    });

                    let lastDate = null;
                    messages.forEach(msg => {
                        const messageDate = new Date(msg.created_at);
                        const dateHeader = getDateHeader(messageDate);
                        const dateString = messageDate.toDateString();

                        if (dateHeader && dateString !== lastDate) {
                            $chatMessages.append(`
                                <div class="text-center text-muted my-3">
                                    <span class="bg-blurred px-3 py-1 rounded">${dateHeader}</span>
                                </div>
                            `);
                            lastDate = dateString;
                        }

                        let replyHTML = '';
                        let imageHtml = '';
                        if (msg.img_path) {
                            imageHtml = `
                                <a href="${msg.img_path}" data-lightbox="preview">
                                    <img src="${msg.img_path}" alt="${window.chatLang.image}" class="message-image">
                                </a>`;
                        } else if (msg.file_path) {
                            imageHtml = fileMessageHtml(msg.file_name, msg.file_path);
                        }
                        if (msg.reply_to_id && messageMap[msg.reply_to_id]) {
                            const repliedMessage = messageMap[msg.reply_to_id];
                            const previewText = repliedMessage.message.length > 50
                                ? repliedMessage.message.substring(0, 50) + '...'
                                : repliedMessage.message;
                            replyHTML = `
                                <div class="reply-to small text-muted border-start border-3 ps-2 mb-1">
                                    ${window.chatLang.reply_to}: ${previewText}
                                </div>
                            `;
                        }
                        const date = new Date(msg.created_at);
                        const timeOnly = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        let deletedOrEdited = '';
                        if (msg.hasOwnProperty('deleted') && msg.deleted === true) {
                            deletedOrEdited = 'Удалил у себя';
                        }
                        const messageHTML = (msg.from === 'me') ? `
                            <div class="align-self-end text-end message-container" id="m-${msg.id}">
                                <div class="d-flex flex-row-reverse gap-3 align-items-center">
                                    <div>
                                        ${replyHTML}
                                        <div class="d-flex bg-primary text-white p-2 rounded-3 message text-break">
                                            <p class="mb-0" style="word-break:break-all;">${msg.message}</p>
                                        </div>
                                        <p class="mb-0 ms-2 text-muted created_at sender-message-time text-nowrap">${timeOnly}</p>
                                        ${imageHtml}
                                    </div>
                                    <small class="text-muted fst-italic ms-2 deleted" style="font-size: 0.65rem;">${deletedOrEdited}</small>
                                    <div class="dropdown">
                                        <ul class="dropdown-menu p-0">
                                            <li><a class="dropdown-item item-m-b" data-m-type="edit" data-m-id="${msg.id}" data-m-text="${msg.message}" href="#">${window.chatLang.edit}</a></li>
                                            <li><a class="dropdown-item item-m-b" data-m-type="reply" data-m-id="${msg.id}" data-m-text="${msg.message}" href="#">${window.chatLang.reply}</a></li>
                                            <li><a class="dropdown-item item-m-b text-danger" data-m-type="delete" data-m-id="${msg.id}" data-m-text="${msg.message}" href="#">${window.chatLang.del_for_me}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ` : `
                            <div class="align-self-start message-container" id="m-${msg.id}">
                                <div class="d-flex gap-3 align-items-center">
                                    <div>
                                        ${replyHTML}
                                        <div class="d-flex bg-body-tertiary p-2 rounded-3 message text-break">
                                            <p class="mb-0" style="word-break:break-all;">${msg.message}</p>
                                        </div>
                                        <p class="mb-0 ms-2 text-muted created_at receiver-message-time text-nowrap">${timeOnly}</p>
                                        ${imageHtml}
                                    </div>
                                    <small class="text-muted fst-italic ms-2 deleted" style="font-size: 0.65rem;">${deletedOrEdited}</small>
                                    <div class="dropdown">
                                        <ul class="dropdown-menu dropdown-menu-end p-0">
                                            <li><a class="dropdown-item item-m-b" data-m-type="reply" data-m-id="${msg.id}" data-m-text="${msg.message}" href="#">${window.chatLang.reply}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        `;
                        $chatMessages.append(messageHTML);
                        if (msg.message === '') {
                            $(`#m-${msg.id}`).find('.message').addClass('d-none');
                        }
                    });
                    $chatMessagesContainer[0].scrollTop = $chatMessagesContainer[0].scrollHeight;
                    rebindLightbox();
                }
            },
            error: function (xhr, status, error) {
                $chatMessages.html('<div class="text-danger text-center my-3">' + window.chatLang.error_load_messages + '.</div>');
            }
        });
    }

    function fileMessageHtml(fileName, filePath) {
        return `
            <div class="chat-message-file">
                <div class="file-container">
                    <div class="file-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14 2V8H20" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="file-details">
                        <div class="file-name">${fileName}</div>
                    </div>
                    <a href="${filePath}" class="download-button" download>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M7 10L12 15L17 10" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 15V3" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                </div>
            </div>
        `;
    }

    let selectedFile = null;
    $fileInput.on('change', function (event) {
        selectedFile = event.target.files[0];
        if (selectedFile) {
            $fileName.text(selectedFile.name);
            $fileInfo.removeClass('d-none');
        }
    });

    $('#remove-file').on('click', function () {
        selectedFile = null;
        $fileInfo.addClass('d-none');
        $fileName.text('');
        $fileInput.val('');
    });

    function sendMessage(toUserId, message) {
        let sendPayload = (fileBase64 = null) => {
            let data = {
                type: 'chat',
                from_user_token: currentUserToken,
                to_user_id: toUserId,
                message: message,
                action: 'message',
                file: fileBase64 ? {
                    filename: selectedFile.name,
                    mime: selectedFile.type,
                    size: selectedFile.size,
                    content: fileBase64,
                    is_image: selectedFile.type.startsWith('image/')
                } : null
            };
            ws.send(JSON.stringify(data));
            $fileInfo.addClass('d-none');
            $fileName.text('');
            $fileInput.val('');
            selectedFile = null;
        };

        if (selectedFile) {
            if (selectedFile.size > 5 * 1024 * 1024) {
                alert('Файл превышает 5MB');
                return;
            }
            let reader = new FileReader();
            reader.onload = function (e) {
                let base64 = e.target.result.split(',')[1];
                sendPayload(base64);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            sendPayload();
        }
    }

    $sendButton.on('click', function () {
        const message = $messageInput.val().trim();
        const dataType = $(this).attr('data-type');
        const toUserId = $toUserId.val();
        $('.no-messages').attr('hidden', 'hidden');

        if (dataType === 'send') {
            if (message !== '' || selectedFile) {
                const displayMessage = message || 'Файл';
                $(`.u-${toUserId}`).find('.last_message').html(`Вы отправили ${displayMessage.length > 40 ? displayMessage.substring(0, 40) + "..." : displayMessage}`);
                sendMessage(toUserId, message);
                $messageInput.val('');
            }
        } else if (dataType === 'edit') {
            const mId = $(this).attr('data-mid');
            $messageInput.val('');
            ws.send(JSON.stringify({
                type: 'chat',
                from_user_token: currentUserToken,
                to_user_id: toUserId,
                message: message,
                messageId: mId,
                action: 'messageEdit'
            }));
            $('#editPreview').addClass('d-none');
            $sendButton.attr('data-type', 'send').attr('data-mid', '').html(window.chatLang.send);
        } else if (dataType === 'reply') {
            const mId = $(this).attr('data-reply-id');
            const displayMessage = message || 'Файл';
            $(`.u-${toUserId}`).find('.last_message').html(`Вы отправили ${displayMessage.length > 40 ? displayMessage.substring(0, 40) + "..." : displayMessage}`);
            $messageInput.val('');
            $replyPreview.addClass('d-none');
            ws.send(JSON.stringify({
                type: 'chat',
                from_user_token: currentUserToken,
                to_user_id: toUserId,
                message: message,
                messageId: mId,
                action: 'messageReply'
            }));
            $sendButton.attr('data-type', 'send').attr('data-reply-id', '').html(window.chatLang.send);
        }
    });

    $messageInput.on('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            $sendButton.click();
        }
    });

    let searchTimeout;
    $('.search-input').on('input', function () {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = $(this).val();
            getChat(query);
        }, 300);
    });

    let typingTimeout;
    let debounceTimeout;

    function showBootstrapAlert(senderName) {
        const alertContainer = document.getElementById('alert-container');
        const alert = document.createElement('div');
        alert.className = 'alert alert-info alert-dismissible fade show';
        alert.role = 'alert';
        alert.innerHTML = `
            <strong>${window.chatLang.new_message}</strong> ${window.chatLang.from} ${senderName}
        `;
        alertContainer.appendChild(alert);
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 150);
        }, 5000);
    }

    function showTypingDebounced(senderName, senderId = null) {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            showTyping(senderName, senderId);
            if (senderId) {
                $(`.u-${senderId}`).find('.last_message').html(window.chatLang.typing);
            }
        }, 300);
    }

    function showTyping(senderName, senderId = null) {
        $typingName.text(senderName + ' печатает');
        $typing.fadeIn();
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            hideTyping();
            if (senderId) {
                $(`.u-${senderId}`).find('.last_message').html('');
            }
        }, 3000);
    }

    function hideTyping() {
        $typing.fadeOut();
    }

    let deleteMessageId = null;
    let deleteTimeout = null;
    let deletedMessageHtml = '';

    $(document).on('click', '.item-m-b', function (e) {
        e.preventDefault();
        const mType = $(this).data('m-type');
        const mId = $(this).data('m-id');
        const message = $(`#m-${mId}`).find('.message p:first').text();
        document.querySelectorAll('.custom-context-menu').forEach(menu => menu.remove());
        $('#chat-messages').removeClass('no-scroll');
        document.body.style.overflow = 'auto';
        $('.modal-backdrop').remove();
        document.body.classList.remove('modal-open');

        $replyPreview.addClass('d-none');
        $replyText.text('');
        $('#editPreview').addClass('d-none');
        $('#editMessage').text('');
        $sendButton.attr('data-type', 'send').removeAttr('data-reply-id').removeAttr('data-mid').html(window.chatLang.send);

        if (mType === 'edit') {
            $messageInput.val(message).focus();
            $sendButton.attr('data-type', 'edit').attr('data-mid', mId).html(window.chatLang.edit || 'EDIT');
            $('#editPreview').removeClass('d-none');
            $('#editMessage').text(message.length > 40 ? message.substring(0, 40) + "..." : message);
        } else if (mType === 'delete') {
            deleteMessageId = mId;
            const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
            modal.show();
        } else if (mType === 'reply') {
            const replyText = $(`#m-${mId}`).find('.message p:first').text().trim().substring(0, 100);
            $replyText.text(window.chatLang.reply_to + ': ' + replyText);
            $replyPreview.removeClass('d-none');
            $sendButton.attr('data-type', 'reply').attr('data-reply-id', mId).html(window.chatLang.reply);
        }
    });

    $('#cancel-reply').on('click', function () {
        $replyPreview.addClass('d-none');
        $replyText.text('');
        $sendButton.attr('data-type', 'send').removeAttr('data-reply-id').html(window.chatLang.send);
    });

    $('#cancelEditBtn').on('click', function () {
        $('#editPreview').addClass('d-none');
        $sendButton.attr('data-type', 'send').removeAttr('data-mid').html(window.chatLang.send);
        $messageInput.val('');
    });

    $('.removeChat').on('click', function () {
        const modal = new bootstrap.Modal(document.getElementById('confirmRemoveChatModal'));
        modal.show();
    });

    $('.blockUser').on('click', function () {
        const modal = new bootstrap.Modal(document.getElementById('confirmBlockUserModal'));
        modal.show();
    });

    $('#confirmBlockUserBtn').on('click', function () {
        const toUserId = $toUserId.val();
        const action = $blockUser.attr('data-action');
        const url = action === 'unblock' ? '/engine/ajax/lib/chat/unblock_user.php' : '/engine/ajax/lib/chat/block_user.php';

        $.ajax({
            url: url,
            method: 'POST',
            data: { userId: toUserId },
            dataType: 'json',
            success: function (response) {
                openChat(toUserId, response.name, response.avatar, response.status);
                if (response.is_blocked === 1) {
                    $inputBlock.addClass('d-none');
                    $blockBlock.removeClass('d-none');
                    $blockUser.html(window.chatLang.unblock).attr('data-action', 'unblock');
                } else {
                    $inputBlock.removeClass('d-none').addClass('d-flex');
                    $blockBlock.addClass('d-none');
                    $blockUser.html(window.chatLang.block).attr('data-action', 'block');
                }
                if (response.status === 'online') {
                    $actionHeaderP.css('color', 'green').html(window.chatLang.online);
                    $statusIndicator.removeClass('status-offline').addClass('status-online');
                } else {
                    const lastSeen = response.lastdate
                        ? window.chatLang.last_seen + `: ${new Date(response.lastdate).toLocaleString()}`
                        : window.chatLang.last_seen_long_time_ago;
                    $actionHeaderP.css('color', 'gray').html(`<span style="font-size: 0.85em; color: #888;">${lastSeen}</span>`);
                    $statusIndicator.removeClass('status-online').addClass('status-offline');
                }
            }
        });

        const modalElement = document.getElementById('confirmBlockUserModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        }
        $('.modal-backdrop').remove();
        document.body.classList.remove('modal-open');
        document.body.style.overflow = 'auto';
        $('#chat-messages').removeClass('no-scroll');
    });

    $('#confirmRCHDeleteBtn').on('click', function () {
        const toUserId = $toUserId.val();
        const toastEl = document.getElementById('undoToast');
        const toast = new bootstrap.Toast(toastEl);
        toast.show();

        ws.send(JSON.stringify({
            type: 'chat',
            from_user_token: currentUserToken,
            to_user_id: toUserId,
            message: '',
            messageId: $(this).attr('data-mid'),
            action: 'removeChatHistory'
        }));

        $(`.u-${toUserId}`).find('.last_message').html('No messages');

        $.ajax({
            url: '/engine/ajax/lib/chat/get_status.php',
            method: 'GET',
            data: { userId: toUserId },
            dataType: 'json',
            success: function (response) {
                openChat(toUserId, response.name, response.avatar, response.status);
                if (response.status === 'online') {
                    $actionHeaderP.css('color', 'green').html(window.chatLang.online);
                    $statusIndicator.removeClass('status-offline').addClass('status-online');
                } else {
                    const lastSeen = response.lastdate
                        ? window.chatLang.last_seen + `: ${new Date(response.lastdate).toLocaleString()}`
                        : window.chatLang.last_seen_long_time_ago;
                    $actionHeaderP.css('color', 'gray').html(`<span style="font-size: 0.85em; color: #888;">${lastSeen}</span>`);
                    $statusIndicator.removeClass('status-online').addClass('status-offline');
                }
            }
        });

        const modalElement = document.getElementById('confirmRemoveChatModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        }
        $('.modal-backdrop').remove();
        document.body.classList.remove('modal-open');
        document.body.style.overflow = 'auto';
        $('#chat-messages').removeClass('no-scroll');
    });

    $('#confirmDeleteBtn').on('click', function () {
        const mId = deleteMessageId;
        const $messageBlock = $(`#m-${mId}`);
        const toUserId = $toUserId.val();
        deletedMessageHtml = $messageBlock.html();
        $messageBlock.html('<div class="text-muted small">' + window.chatLang.message_deleted + '</div>');
        const toast = new bootstrap.Toast(document.getElementById('undoToast'));
        toast.show();

        deleteTimeout = setTimeout(() => {
            ws.send(JSON.stringify({
                type: 'chat',
                action: 'messageDelete',
                message: mId,
                to_user_id: toUserId,
                from_user_token: currentUserToken,
            }));
        }, 5000);

        const modalElement = document.getElementById('confirmDeleteModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        }
        $('.modal-backdrop').remove();
        document.body.classList.remove('modal-open');
        document.body.style.overflow = 'auto';
        $('#chat-messages').removeClass('no-scroll');
    });

    $('#undoDelete').on('click', function (e) {
        e.preventDefault();
        if (deleteTimeout) clearTimeout(deleteTimeout);
        $(`#m-${deleteMessageId}`).html(deletedMessageHtml);
        const toastEl = bootstrap.Toast.getInstance(document.getElementById('undoToast'));
        if (toastEl) toastEl.hide();
        $('.modal-backdrop').remove();
        $('body').removeClass('modal-open').css('overflow', 'auto');
        $('#chat-messages').removeClass('no-scroll');
    });

    openChatLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            if (window.innerWidth < 768) {
                $chatList.addClass('d-none');
                $chatWindow.removeClass('d-none');
            }
        });
    });

    backBtn.addEventListener('click', function () {
        $chatWindow.addClass('d-none');
        $chatList.removeClass('d-none');
        $chatUsersList.find('li').removeClass('active-chat');
    });

    $chatUsersList.on('click', function (e) {
        $('#chat-messages').css('display', 'flex');
        $inputBlock.removeClass('d-none');
        $chatSettings.removeClass('d-none');
        $profileWrapper.removeClass('d-none');
        $chatPlaceholder.css('display', 'none');
        if (window.innerWidth < 768) {
            $chatList.addClass('d-none');
            $chatWindow.removeClass('d-none');
        }
    });

    $(document).on('visibilitychange', function () {
        if (document.hidden) {
            // ws.close();
        } else {
            reConnectWs();
        }
    });

    document.addEventListener('contextmenu', function (e) {
        const messageContainer = e.target.closest('[id^="m-"]');
        if (messageContainer) {
            e.preventDefault();
            document.querySelectorAll('.custom-context-menu').forEach(menu => menu.remove());
            $('.modal-backdrop').remove();
            const dropdown = messageContainer.querySelector('.dropdown-menu');
            if (dropdown) {
                const clonedDropdown = dropdown.cloneNode(true);
                clonedDropdown.classList.add('custom-context-menu', 'show');
                clonedDropdown.style.position = 'absolute';
                clonedDropdown.style.zIndex = 9999;
                clonedDropdown.style.display = 'block';
                document.body.appendChild(clonedDropdown);
                const messageBubble = messageContainer.querySelector('.message');
                const rect = messageBubble.getBoundingClientRect();
                const isFromMe = messageContainer.classList.contains('align-self-end');
                clonedDropdown.style.top = `${rect.bottom + window.scrollY + 4}px`;
                if (isFromMe) {
                    const dropdownWidth = clonedDropdown.offsetWidth;
                    clonedDropdown.style.left = `${rect.right + window.scrollX - dropdownWidth}px`;
                } else {
                    clonedDropdown.style.left = `${rect.left + window.scrollX}px`;
                }
                $('#chat-messages').addClass('no-scroll');
                document.body.style.overflow = 'hidden';
            }
        }
    });

    document.addEventListener('click', function (e) {
        if (e.target.closest('.modal') || e.target.closest('.custom-context-menu')) {
            return;
        }
        document.querySelectorAll('.custom-context-menu').forEach(menu => menu.remove());
        $('#chat-messages').removeClass('no-scroll');
        document.body.style.overflow = 'auto';
        $('.modal-backdrop').remove();
        document.body.classList.remove('modal-open');
    });

    $messageInput.on('input', function () {
        const toUserId = $toUserId.val();
        ws.send(JSON.stringify({
            type: 'chat',
            from_user_token: currentUserToken,
            to_user_id: toUserId,
            message: null,
            action: 'type'
        }));
    });

    function markAsRead(messageId) {
        ws.send(JSON.stringify({
            type: 'read',
            from_user_token: currentUserToken,
            to_user_id: toUserId,
            message: null,
            action: 'read'
        }));
    }

    if (window.innerWidth >= 768) {
        $chatList.removeClass('d-none').addClass('d-md-block');
        $chatWindow.removeClass('d-none').addClass('d-md-block');
    } else {
        $chatList.removeClass('d-none');
        $chatWindow.addClass('d-none');
    }


    getChat('');
});