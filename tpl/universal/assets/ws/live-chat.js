$(document).ready(function () {
    const currentUserToken = $("#usr_token").val();
    const wsUrl = $("#wsurl").val();

    let ws;
    reConnectWS();

    setTimeout(() => {
        if (!ws) {
            getGroupChatMessages();
        }
        reConnectWS();
    }, 500);

    const chat = $("#chatMessages");
    const button = $("#scroll-to-bottom");

    chat.on("scroll", function () {
        const nearBottom = chat[0].scrollHeight - chat.scrollTop() - chat.outerHeight() < 100;
        button.toggle(!nearBottom);
    });

    button.on("click", function () {
        chat.animate({
            scrollTop: chat[0].scrollHeight
        }, 500);
    });

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

    function reConnectWS() {
        ws = new WebSocket(wsUrl + '?usr_token=' + currentUserToken);

        ws.onopen = function () {
            ws.send(JSON.stringify({
                type: 'register-group-chat',
                usr_token: currentUserToken,
                group_id: 1
            }));
        };

        ws.onmessage = function (event) {
            const data = JSON.parse(event.data);
            const messagesContainer = document.getElementById('chatMessages');
            const input = document.getElementById('messageInput');

            let lastDate = null;
            const lastHeader = $("#chatMessages").find('.text-center.text-muted.my-3').last().find('span').text();
            if (lastHeader) {
                lastDate = lastHeader === 'Yesterday' 
                    ? new Date(new Date().setDate(new Date().getDate() - 1)).toDateString() 
                    : new Date(lastHeader).toDateString();
            }

            if (data.type === "live-chat") {
                if (data.hasOwnProperty("receiver_id") && data.hasOwnProperty("messageData")) {
                    if (data.action === "message" || data.action === "messageReply") {
                        $(".no-messages").addClass("d-none");

                        const messageDate = new Date(data.messageData.created_at);
                        const dateHeader = getDateHeader(messageDate);
                        const dateString = messageDate.toDateString();

                        if (dateHeader && dateString !== lastDate) {
                            const headerDiv = document.createElement('div');
                            headerDiv.className = 'text-center text-muted my-3';
                            headerDiv.innerHTML = `<span class="bg-blurred px-3 py-1 rounded">${dateHeader}</span>`;
                            messagesContainer.appendChild(headerDiv);
                            lastDate = dateString;
                        }

                        if (data.receiver_id === data.messageData.sender_id) {
                            const messageDiv = document.createElement('div');
                            messageDiv.className = 'message message-self';
                            messageDiv.innerHTML = selfMessage(data);

                            messagesContainer.appendChild(messageDiv);
                            input.value = '';

                            messagesContainer.scrollTop = messagesContainer.scrollHeight;
                            if (data.messageData.content === "") {
                                $(`#m-${data.messageData.id}`).find(".message").addClass("d-none");
                            }
                        } else {
                            receiveMessage(data.sender_name, data);
                        }
                    } else if (data.action === "messageEdit") {
                        let messageBlock = $(`#m-${data.messageData.id}`);
                        messageBlock.find(".message").html(data.messageData.content);
                        $(`[data-messageId="${data.messageData.id}"]`).html(`${window.chatLang.reply_to}: ${data.messageData.content}`);
                        $("#messageInput").val("");
                        messageBlock.find(".created_at").html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                        </svg> ${getLocaleTime(data.messageData.updated_at)}`);
                    } else if (data.action === "messageDelete") {
                        if (data.receiver_id !== data.messageData.sender_id) {
                            $(`#m-${data.messageData.id}`).find(".deleted").html(`${window.chatLang.delete_for_self} ${getLocaleTime(data.messageData.created_at)}`);
                        }
                    } else if (data.action === "typing") {
                        if (data.sender_id !== data.receiver_id) {
                            showTypingDebounced(data.sender_name, data.sender_id);
                        }
                    } else if (data.action === "messageDeleteEveryone") {
                        if (data.receiver_id !== data.messageData.sender_id) {
                            const $messageBlock = $(`#m-${data.messageData.id}`);
                            deletedMessageHtml = $messageBlock.html();
                            $messageBlock.html('<div class="text-muted small">' + window.chatLang.message_deleted + '</div>');
                        }
                    }
                } else if (data.hasOwnProperty("type") && data.action === "online-count") {
                    updateOnlineCount(data.count);
                }
            }
        };
    }

    getGroupChatMessages();

    function selfMessage(data) {
        let replyHTML = "";
        let messageMap = [];
        if (data.messageData.hasOwnProperty("repliedMessage")) {
            messageMap[data.messageData.repliedMessage.id] = {
                id: data.messageData.repliedMessage.id,
                message: data.messageData.repliedMessage.content,
                reply_to_id: data.messageData.reply_to_id,
                from: 'me'
            };

            if (data.messageData.reply_to_id && messageMap[data.messageData.reply_to_id]) {
                const repliedMessage = messageMap[data.messageData.reply_to_id];
                let previewText = repliedMessage.message.length > 50
                    ? repliedMessage.message.substring(0, 50) + "..."
                    : repliedMessage.message;

                if (data.messageData.repliedMessage.file_path) {
                    previewText = window.chatLang.file;
                } else if (data.messageData.repliedMessage.img_path) {
                    previewText = window.chatLang.photo;
                }
                replyHTML = `
                    <div class="reply-to small text-muted border-start border-3 ps-2 mb-1" data-messageId="${data.messageData.reply_to_id}">
                        ${window.chatLang.reply_to}: ${previewText}
                    </div>
                `;
            }
        }

        let imageHtml = "";
        if (data.file_url && data.file_type === "images") {
            imageHtml = `
                <a href="${data.file_url}" data-lightbox="preview">
                    <img src="${data.file_url}" alt="${window.chatLang.image}" class="message-image">
                </a>`;
        } else if (data.file_url && data.file_type === "files") {
            imageHtml = fileMessageHtml(data.file_name, data.file_url);
        }

        return `
            <div class="align-self-end text-end message-container" id="m-${data.messageData.id}">
                <div class="d-flex flex-row-reverse gap-3 align-items-center">
                    <div>
                        ${replyHTML}
                        <div class="bg-primary text-white p-2 rounded-3 message mb-0">${data.messageData.content}</div>
                        ${imageHtml}
                    </div>
                    <small class="text-muted fst-italic ms-2 deleted" style="font-size: 0.65rem;"></small>
                    <div class="dropdown">
                        <ul class="dropdown-menu p-0">
                            <li><a class="dropdown-item item-m-b" data-m-type="edit" data-m-id="${data.messageData.id}" data-m-text="${data.messageData.content}" href="#">${window.chatLang.edit}</a></li>
                            <li><a class="dropdown-item item-m-b" data-m-type="reply" data-m-id="${data.messageData.id}" data-m-text="${data.messageData.content}" href="#">${window.chatLang.reply}</a></li>
                            <li><a class="dropdown-item item-m-b" data-m-type="delete" data-m-id="${data.messageData.id}" data-m-text="${data.messageData.content}" href="#">${window.chatLang.del_for_me}</a></li>
                            <li><a class="dropdown-item item-m-b" data-m-type="delete_everyone" data-m-id="${data.messageData.id}" data-m-text="${data.messageData.content}" href="#">${window.chatLang.del_everyone}</a></li>
                        </ul>
                    </div>
                </div>
                <p class="text-muted small mt-1 created_at mb-0">${getLocaleTime(data.messageData.created_at)}</p>
            </div>
        `;
    }

    const input = document.querySelector('#messageInput');
    const trigger = document.querySelector('#emoji-picker-button');

    const picker = new EmojiButton();

    picker.on('emoji', emoji => {
        input.value += emoji;
    });

    trigger.addEventListener('click', () => {
        picker.togglePicker(trigger);
    });

    function getLocaleTime(utcDefaultDate) {
        let localDate = new Date(utcDefaultDate + ' UTC');
        return localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function fileMessageHtml(fileName, filePath) {
        return `
            <div class="chat-message-file">
                <div class="file-container">
                    <a href="${filePath}" class="download-button" download>
                        <div class="file-details">
                            <div class="file-name">${fileName}</div>
                        </div>
                    </a>
                </div>
            </div>
        `;
    }

    function getGroupChatMessages() {
        $.ajax({
            url: '/engine/ajax/lib/chat/get_live_chat_messages.php',
            method: 'GET',
            data: {},
            dataType: 'json',
            success: function (groupMessages) {
                const messagesContainer = document.getElementById('chatMessages');

                if (groupMessages.hasOwnProperty("length") && groupMessages.length !== 0) {
                    $(".no-messages").addClass("d-none");
                }

                let lastDate = null;
                groupMessages.forEach(msg => {
                    const messageDate = new Date(msg.created_at);
                    const dateHeader = getDateHeader(messageDate);
                    const dateString = messageDate.toDateString();

                    if (dateHeader && dateString !== lastDate) {
                        const headerDiv = document.createElement('div');
                        headerDiv.className = 'text-center text-muted my-3';
                        headerDiv.innerHTML = `<span class="bg-blurred px-3 py-1 rounded">${dateHeader}</span>`;
                        messagesContainer.appendChild(headerDiv);
                        lastDate = dateString;
                    }

                    const messageDiv = document.createElement('div');

                    let meOrUser = msg.from === "me" ? "message-self" : "message-user";
                    let createdOrUpdated = msg.updated_at === null 
                        ? getLocaleTime(msg.created_at) 
                        : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                        </svg> ${getLocaleTime(msg.updated_at)}`;

                    let messageMap = [];
                    if (msg.repliedMessage) {
                        messageMap[msg.repliedMessage.id] = {
                            id: msg.repliedMessage.id,
                            message: msg.repliedMessage.content,
                            reply_to_id: msg.reply_to_id,
                            from: msg.from
                        };
                    }

                    let replyHTML = "";
                    if (msg.reply_to_id && messageMap[msg.reply_to_id]) {
                        const repliedMessage = messageMap[msg.reply_to_id];
                        let previewText = repliedMessage.message.length > 50
                            ? repliedMessage.message.substring(0, 50) + "..."
                            : repliedMessage.message;

                        if (msg.repliedMessage.file_path) {
                            previewText = window.chatLang.file;
                        } else if (msg.repliedMessage.img_path) {
                            previewText = window.chatLang.photo;
                        }
                        replyHTML = `
                            <div class="reply-to small text-muted border-start border-3 ps-2 mb-1" data-messageId="${msg.reply_to_id}">
                                ${window.chatLang.reply_to}: ${previewText}
                            </div>
                        `;
                    }

                    let imageHtml = "";
                    if (msg.img_path) {
                        imageHtml = `
                            <a href="${msg.img_path}" data-lightbox="preview">
                                <img src="${msg.img_path}" alt="${window.chatLang.image}" class="message-image">
                            </a>`;
                    } else if (msg.file_path) {
                        imageHtml = fileMessageHtml(msg.file_name, msg.file_path);
                    }

                    messageDiv.className = `message ${meOrUser}`;
                    messageDiv.innerHTML = (msg.from === 'me') ? `
                        <div class="align-self-end text-end message-container" id="m-${msg.id}">
                            <div class="d-flex flex-row-reverse gap-3 align-items-center">
                                <div>
                                    ${replyHTML}
                                    <div class="bg-primary text-white p-2 rounded-3 message mb-0">${msg.content}</div>
                                    ${imageHtml}
                                </div>
                                <small class="text-muted fst-italic ms-2 deleted" style="font-size: 0.65rem;"></small>
                                <div class="dropdown">
                                    <ul class="dropdown-menu p-0">
                                        <li><a class="dropdown-item item-m-b" data-m-type="edit" data-m-id="${msg.id}" data-m-text="${msg.content}" href="#">${window.chatLang.edit}</a></li>
                                        <li><a class="dropdown-item item-m-b" data-m-type="reply" data-m-id="${msg.id}" data-m-text="${msg.content}" href="#">${window.chatLang.reply}</a></li>
                                        <li><a class="dropdown-item item-m-b" data-m-type="delete" data-m-id="${msg.id}" data-m-text="${msg.content}" href="#">${window.chatLang.del_for_me}</a></li>
                                        <li><a class="dropdown-item item-m-b" data-m-type="delete_everyone" data-m-id="${msg.id}" data-m-text="${msg.content}" href="#">${window.chatLang.del_everyone}</a></li>
                                    </ul>
                                </div>
                            </div>
                            <p class="text-muted small mt-1 created_at mb-0">${createdOrUpdated}</p>
                        </div>
                    ` : `
                        <div class="align-self-start message-container" id="m-${msg.id}">
                            <div class="d-flex align-items-center gap-2 dropdown">
                                <div class="d-flex align-items-center gap-2 mb-1" role="button" id="dropdownUser${msg.id}" data-bs-toggle="dropdown" aria-expanded="false" style="cursor: pointer;">
                                    <img src="${msg.sender_avatar}" class="rounded-circle" width="20" height="20">
                                    <p class="font-weight-bold small mt-0 username mb-0">${msg.sender_name}</p>
                                </div>
                                <ul class="dropdown-menu p-0" aria-labelledby="dropdownUser${msg.id}">
                                    <li><a class="dropdown-item" href="/?user-profile&user_id=${msg.sender_id}">${window.chatLang.profile}</a></li>
                                    <li><a class="dropdown-item" href="/pm&uid=${msg.sender_id}" data-user-id="${msg.sender_id}" data-action="write-message">${window.chatLang.send_message}</a></li>
                                </ul>
                            </div>
                            <div class="d-flex gap-3 align-items-center">
                                <div>
                                    ${replyHTML}
                                    <div class="bg-body-tertiary p-2 rounded-3 message mb-0">${msg.content}</div>
                                    ${imageHtml}
                                </div>
                                <small class="text-muted fst-italic ms-2 deleted" style="font-size: 0.65rem;"></small>
                                <div class="dropdown">
                                    <ul class="dropdown-menu dropdown-menu-end p-0">
                                        <li><a class="dropdown-item item-m-b" data-m-type="reply" data-m-id="${msg.id}" data-m-text="${msg.content}" href="#">${window.chatLang.reply}</a></li>
                                        <li><a class="dropdown-item item-m-b" data-m-type="report" data-m-id="${msg.id}" data-m-text="${msg.content}" href="#">${window.chatLang.reportt}</a></li>
                                    </ul>
                                </div>
                            </div>
                            <p class="text-muted small mt-1 created_at mb-0">${createdOrUpdated}</p>
                        </div>
                    `;

                    messagesContainer.appendChild(messageDiv);
                    if (msg.hasOwnProperty("deleted") && msg.deleted === true) {
                        $(`#m-${msg.id}`).find(".deleted").html(`${window.chatLang.delete_for_self} ${getLocaleTime(msg.created_at)}`);
                    }

                    if (msg.content === "") {
                        $(`#m-${msg.id}`).find(".message").addClass("d-none");
                    }
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                });

                var hash = window.location.hash;
                if (hash.startsWith('#m-')) {
                    setTimeout(function () {
                        var target = $(hash);
                        if (target.length) {
                            const scrollOffset = target.offset().top - $("#chatMessages").offset().top + $("#chatMessages").scrollTop();
                            $("#chatMessages").animate({
                                scrollTop: scrollOffset
                            }, 500);
                        }
                    }, 100);
                }
            }
        });
    }

    function updateOnlineCount(count) {
        document.getElementById('onlineCount').textContent = count;
    }

    let isSending = false;

    $("#send-message").on("click", function () {
        if (isSending) return;

        const dataType = $(this).attr("data-type");

        if (dataType === "edit") {
            $("#scroll-to-bottom").css("top", "+=50px");
            const messageId = $(this).attr("data-mid");
            editMessage(messageId);
            $("#editPreview").addClass("d-none");
        } else if (dataType === "reply") {
            $("#scroll-to-bottom").css("top", "+=50px");
            const replyToId = $(this).attr("data-reply-id");
            replyMessage(replyToId);
            $("#replyPreview").addClass("d-none");
        } else {
            sendMessage();
        }

        const $btn = $(this);
        let countdown = $("#nmt").val();

        $("#send-message").attr("data-type", "send")
            .attr("data-mid", "")
            .html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
            </svg>`);

        isSending = true;
        $btn.prop("disabled", true);
        $btn.addClass("disabled-button");

        const originalContent = $btn.html();
        const interval = setInterval(() => {
            $btn.html(`<span>${countdown--} ${window.chatLang.sec}</span>`);
            if (countdown < 0) {
                clearInterval(interval);
                $btn.html(originalContent);
                $btn.prop("disabled", false);
                $btn.removeClass("disabled-button");
                isSending = false;
            }
        }, 1000);
    });

    function replyMessage(toReplyId) {
        const input = document.getElementById('messageInput');
        const message = input.value.trim();

        if (message) {
            let data = {
                type: 'live-chat',
                from_user_token: currentUserToken,
                to_group_id: 1,
                to_user_id: null,
                reply_to_id: toReplyId,
                message: message,
                action: "messageReply"
            };
            ws.send(JSON.stringify(data));
        }
    }

    $('#messageInput').on('input', function () {
        ws.send(JSON.stringify({
            type: 'live-chat',
            from_user_token: currentUserToken,
            to_group_id: 1,
            message: null,
            action: "typing"
        }));
    });

    function showTypingDebounced(senderName, senderId = null) {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            showTyping(senderName);
        }, 300);
    }

    function showTyping(senderName) {
        $("#typing-name").text(senderName + " " + window.chatLang.typing);
        $("#typing").fadeIn();

        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            hideTyping();
        }, 3000);
    }

    function hideTyping() {
        $("#typing").fadeOut();
    }

    function receiveMessage(username, wsData) {
        const messagesContainer = document.getElementById('chatMessages');

        let createdOrUpdated = wsData.messageData.updated_at === null
            ? getLocaleTime(wsData.messageData.created_at)
            : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
            </svg> ${getLocaleTime(wsData.messageData.updated_at)}`;

        let replyHTML = "";
        let messageMap = [];
        if (wsData.messageData.hasOwnProperty("repliedMessage")) {
            messageMap[wsData.messageData.repliedMessage.id] = {
                id: wsData.messageData.repliedMessage.id,
                message: wsData.messageData.repliedMessage.content,
                reply_to_id: wsData.messageData.reply_to_id,
                from: 'me'
            };

            if (wsData.messageData.reply_to_id && messageMap[wsData.messageData.reply_to_id]) {
                const repliedMessage = messageMap[wsData.messageData.reply_to_id];
                let previewText = repliedMessage.message.length > 50
                    ? repliedMessage.message.substring(0, 50) + "..."
                    : repliedMessage.message;

                if (wsData.messageData.repliedMessage.file_path) {
                    previewText = window.chatLang.file;
                } else if (wsData.messageData.repliedMessage.img_path) {
                    previewText = window.chatLang.photo;
                }

                replyHTML = `
                    <div class="reply-to small text-muted border-start border-3 ps-2 mb-1" data-messageId="${wsData.messageData.reply_to_id}">
                        ${window.chatLang.reply_to}: ${previewText}
                    </div>
                `;
            }
        }

        let imageHtml = "";
        if (wsData.file_url && wsData.file_type === "images") {
            imageHtml = `
                <a href="${wsData.file_url}" data-lightbox="preview">
                    <img src="${wsData.file_url}" alt="${window.chatLang.image}" class="message-image">
                </a>`;
        } else if (wsData.file_url && wsData.file_type === "files") {
            imageHtml = fileMessageHtml(wsData.file_name, wsData.file_url);
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message message-user';
        messageDiv.innerHTML = `
            <div class="align-self-start message-container" id="m-${wsData.messageData.id}">
                <div class="d-flex align-items-center gap-2 dropdown">
                    <div class="d-flex align-items-center gap-2 mb-1" role="button" id="dropdownUser${wsData.messageData.id}" data-bs-toggle="dropdown" aria-expanded="false" style="cursor: pointer;">
                        <img src="${wsData.sender_avatar}" class="rounded-circle" width="20" height="20">
                        <p class="font-weight-bold small mt-0 username mb-0">${wsData.sender_name}</p>
                    </div>
                    <ul class="dropdown-menu p-0" aria-labelledby="dropdownUser${wsData.messageData.id}">
                        <li><a class="dropdown-item" href="/?user-profile&user_id=${wsData.messageData.sender_id}">${window.chatLang.profile}</a></li>
                        <li><a class="dropdown-item" href="/pm&uid=${wsData.messageData.sender_id}" data-user-id="${wsData.messageData.sender_id}" data-action="write-message">${window.chatLang.send_message}</a></li>
                    </ul>
                </div>
                <div class="d-flex gap-3 align-items-center">
                    <div>
                        ${replyHTML}
                        <div class="bg-body-tertiary p-2 rounded-3 message mb-0">${wsData.messageData.content}</div>
                        ${imageHtml}
                    </div>
                    <small class="text-muted fst-italic ms-2 deleted" style="font-size: 0.65rem;"></small>
                    <div class="dropdown">
                        <ul class="dropdown-menu dropdown-menu-end p-0">
                            <li><a class="dropdown-item item-m-b" data-m-type="reply" data-m-id="${wsData.messageData.id}" data-m-text="${wsData.messageData.content}" href="#">${window.chatLang.reply}</a></li>
                            <li><a class="dropdown-item item-m-b" data-m-type="report" data-m-id="${wsData.messageData.id}" data-m-text="${wsData.messageData.content}" href="#">${window.chatLang.reportt}</a></li>
                        </ul>
                    </div>
                </div>
                <p class="text-muted small mt-1 created_at mb-0">${createdOrUpdated}</p>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);

        if (wsData.messageData.content === "") {
            $(`#m-${wsData.messageData.id}`).find(".message").addClass("d-none");
        }
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function sendMessage() {
        const input = document.getElementById('messageInput');
        const message = input.value.trim();

        let sendPayload = (fileBase64 = null) => {
            let data = {
                type: 'live-chat',
                from_user_token: currentUserToken,
                to_group_id: 1,
                to_user_id: null,
                message: message,
                action: "message",
                file: fileBase64 ? {
                    filename: selectedFile.name,
                    mime: selectedFile.type,
                    size: selectedFile.size,
                    content: fileBase64,
                    is_image: selectedFile.type.startsWith('image/')
                } : null
            };

            ws.send(JSON.stringify(data));

            $("#file-info").addClass("d-none");
            $("#file-name").text("");
            $("#file-input").val("");
            selectedFile = null;
        };

        if (selectedFile) {
            if (selectedFile.size > 5 * 1024 * 1024) {
                alert("Файл превышает 5MB");
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

    function editMessage(messageId) {
        const input = document.getElementById('messageInput');
        const message = input.value.trim();

        if (message) {
            let data = {
                type: 'live-chat',
                from_user_token: currentUserToken,
                to_group_id: 1,
                to_user_id: null,
                messageId: messageId,
                message: message,
                action: "messageEdit"
            };
            ws.send(JSON.stringify(data));
        }
    }

    document.getElementById('messageInput').addEventListener('keydown', function (e) {
        const $btn = $("#send-message");

        if ($(this).val() === "") {
            $btn.prop("disabled", true);
            $btn.addClass("disabled-button");
        } else {
            $btn.prop("disabled", false);
            $btn.removeClass("disabled-button");
        }
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            $('#send-message').trigger('click');
        }
    });

    $("#confirmDeleteBtn").on("click", function () {
        const mId = deleteMessageId;
        const $messageBlock = $(`#m-${mId}`);
        const deleteType = $(this).attr("data-del-type");

        deletedMessageHtml = $messageBlock.html();
        $messageBlock.html('<div class="text-muted small">' + window.chatLang.message_deleted + '</div>');

        const toast = new bootstrap.Toast(document.getElementById('undoToast'));
        toast.show();

        deleteTimeout = setTimeout(() => {
            ws.send(JSON.stringify({
                type: 'live-chat',
                action: 'messageDelete',
                messageId: mId,
                deleteType: deleteType,
                to_group_id: 1,
                message: "",
                from_user_token: currentUserToken,
            }));
        }, 5000);

        bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal')).hide();
    });

    let deleteMessageId = null;
    let deleteTimeout = null;
    let deletedMessageHtml = "";
    let typingTimeout;
    let debounceTimeout;

    $(document).on("click", ".item-m-b", function (e) {
        e.preventDefault();
        const mType = $(this).data("m-type");
        const mId = $(this).data("m-id");
        const message = $(`#m-${mId}`).find(".message").html();

        // Close any open context menu
        document.querySelectorAll('.custom-context-menu').forEach(menu => menu.remove());
        $('#chatMessages').removeClass('no-scroll');
        document.body.style.overflow = 'auto';
        $('.modal-backdrop').remove();
        document.body.classList.remove('modal-open');

        // Reset both edit and reply previews to ensure only one is active
        const resetPreviews = () => {
            $("#editPreview").addClass("d-none");
            $("#replyPreview").addClass("d-none");
            $("#scroll-to-bottom").css("top", "+=50px"); // Adjust scroll button position
            $("#messageInput").val(""); // Clear input
            $("#send-message")
                .attr("data-type", "send")
                .attr("data-mid", "")
                .attr("data-reply-id", "")
                .html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                </svg>`);
        };

        if (mType === "edit") {
            // If reply is open, close it
            if (!$("#replyPreview").hasClass("d-none")) {
                resetPreviews();
            }
            // Open edit mode
            const editText = $(`#m-${mId}`).find(".message").text();
            $(".edit-text").text(window.chatLang.editing + ": " + editText);
            $("#editPreview").removeClass("d-none");
            $("#messageInput").val(message);
            $("#send-message")
                .attr("data-type", "edit")
                .attr("data-mid", mId)
                .html("EDIT");
            $('#messageInput').focus();
            $("#scroll-to-bottom").css("top", "-=50px");
        } else if (mType === "reply") {
            // If edit is open, close it
            if (!$("#editPreview").hasClass("d-none")) {
                resetPreviews();
            }
            // Open reply mode
            const replyToId = mId;
            let replyText = $(`#m-${mId}`).find(".message").text().trim().substring(0, 100);
            const fileName = $(`#m-${mId}`).find(".file-name").text();
            if (replyText === "" && fileName !== "") {
                replyText = fileName;
            } else if (replyText === "" && fileName === "") {
                replyText = window.chatLang.photo;
            }
            $(".reply-text").text(window.chatLang.reply_to + ": " + replyText);
            $("#replyPreview").removeClass("d-none");
            $("#scroll-to-bottom").css("top", "-=50px");
            $("#send-message")
                .attr("data-type", "reply")
                .attr("data-reply-id", replyToId)
                .html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-reply" viewBox="0 0 16 16">
                    <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.7 8.7 0 0 0-1.921-.306 7 7 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254l-.042-.028a.147.147 0 0 1 0-.252l.042-.028zM7.8 10.386q.103 0 .223.006c.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96z"/>
                </svg>`);
            $('#messageInput').focus();
        } else if (mType === "delete") {
            deleteMessageId = mId;
            $("#confirmDeleteBtn").attr("data-del-type", "delete");
            const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
            modal.show();
        } else if (mType === "report") {
            $("#submitReport").attr("data-type", "report")
                .attr("data-mid", mId);
            const modal = new bootstrap.Modal(document.getElementById('reportModal'));
            modal.show();
        } else if (mType === "delete_everyone") {
            deleteMessageId = mId;
            $("#confirmDeleteBtn").attr("data-del-type", "delete_everyone");
            const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
            modal.show();
        }
    });

    let selectedFile = null;
    $("#file-input").on("change", function (event) {
        selectedFile = event.target.files[0];
        if (selectedFile) {
            $("#file-name").text(selectedFile.name);
            $("#file-info").removeClass("d-none");
        }
    });

    $("#remove-file").on("click", function () {
        selectedFile = null;
        $("#file-info").addClass("d-none");
        $("#file-name").text("");
        $("#file-input").val("");
    });

    $("#reportForm button").on('click', function () {
        let selected = [];
        $('#reportForm input[type="checkbox"]:checked').each(function () {
            selected.push($(this).val());
        });

        if (selected.length === 0) {
            alert(window.chatLang.please_select_min_one_report);
            return;
        }

        let messageId = $("#submitReport").attr("data-mid");

        $.ajax({
            url: '/engine/ajax/lib/chat/report_user_message.php',
            type: 'POST',
            data: {
                reasons: selected,
                messageId: messageId
            },
            dataType: 'json',
            success: function (response) {
                $('#reportModal').modal('hide');
                alert(window.chatLang.report_success_send);
            },
            error: function (xhr) {
                alert(window.chatLang.error_in_send_report);
            }
        });
    });

    $(".close-reply").on("click", function () {
        $(".reply-preview").addClass("d-none");
        $("#scroll-to-bottom").css("top", "+=50px");
        $("#send-message").attr("data-type", "send")
            .attr("data-mid", "")
            .html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
            </svg>`);
    });

    $(".close-edit").on("click", function () {
        $(".edit-preview").addClass("d-none");
        $("#scroll-to-bottom").css("top", "+=50px");
        $("#messageInput").val("");
        $("#send-message").attr("data-type", "send")
            .attr("data-mid", "")
            .html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
            </svg>`);
    });

    $(document).on("click", ".reply-to", function () {
        const repliedMessageId = $(this).attr("data-messageId");
        const target = $(`#m-${repliedMessageId}`);
        const container = $("#chatMessages");

        if (target.length) {
            const scrollOffset = target.offset().top - container.offset().top + container.scrollTop();
            container.animate({
                scrollTop: scrollOffset - 12
            }, 500);
            target.removeClass("tg-highlight");
            void target[0].offsetWidth;
            target.addClass("tg-highlight");
        }
    });

    $(document).on("visibilitychange", function () {
        if (document.hidden) {
            // ws.close();
        } else {
            if (!ws) {
                getGroupChatMessages();
            }
            reConnectWS();
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
                $('#chatMessages').addClass('no-scroll');
                document.body.style.overflow = 'hidden';
            }
        }
    });

    document.addEventListener('click', function (e) {
        if (e.target.closest('.modal') || e.target.closest('.custom-context-menu')) {
            return;
        }
        document.querySelectorAll('.custom-context-menu').forEach(menu => menu.remove());
        $('#chatMessages').removeClass('no-scroll');
        document.body.style.overflow = 'auto';
        $('.modal-backdrop').remove();
        document.body.classList.remove('modal-open');
    });
});