function renderMessage(msg, userAvatar = '') {
    const isMe = msg.from === 'me';
    const replyHTML = msg.reply_to ? generateReplyHTML(msg.reply_to) : '';
    const imageHtml = getMessageMediaHTML(msg);
    const chatMessages = $('#chat-messages .d-flex.flex-column');

    const dropdownItems = isMe
        ? `
            <li><a class="dropdown-item item-m-b" data-m-type="edit" data-m-id="${msg.id}" data-m-text="${msg.message}" href="#">${window.chatLang.edit}</a></li>
            <li><a class="dropdown-item item-m-b" data-m-type="reply" data-m-id="${msg.id}" data-m-text="${msg.message}" href="#">${window.chatLang.reply}</a></li>
            <li><a class="dropdown-item item-m-b" data-m-type="delete" data-m-id="${msg.id}" data-m-text="${msg.message}" href="#">${window.chatLang.del_for_me}</a></li>
        `
        : `
            <li><a class="dropdown-item item-m-b" data-m-type="reply" data-m-id="${msg.id}" data-m-text="${msg.message}" href="#">${window.chatLang.reply}</a></li>
        `;

    const messageHTML = `
        <div class="align-self-${isMe ? 'end text-end' : 'start'} message-container" id="m-${msg.id}">
            <div>
                ${!isMe ? `
                <div class="d-flex align-items-center gap-2">
                    <img src="${userAvatar}" class="rounded-circle" width="16" height="16">
                    <p class="text-muted small mt-1 created_at">${msg.created_at}</p>
                </div>` : `
                <p class="text-muted small mt-1 created_at">${msg.created_at}</p>
                `}
                <div class="d-flex ${isMe ? 'flex-row-reverse' : ''} gap-3 align-items-center">
                    ${replyHTML}
                    <div class="${isMe ? 'bg-primary text-white p-1' : 'bg-body-tertiary p-2'} rounded-3 message">
                        ${msg.message}
                    </div>
                    ${imageHtml}
                    <div class="dropdown">
                        <button class="btn btn-link p-0 m-0" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa fa-ellipsis-v text-body"></i>
                        </button>
                        <ul class="dropdown-menu ${isMe ? '' : 'dropdown-menu-end'} chat-dropdown">
                            ${dropdownItems}
                        </ul>
                    </div>
                </div>
            </div>
            <small class="text-muted fst-italic ms-2 deleted" style="font-size: 0.65rem;"></small>
        </div>
    `;

    chatMessages.append(messageHTML);
}

// Helper to generate reply block if needed
function generateReplyHTML(replyMsgId) {
    const replyMsg = messageMap[replyMsgId];
    if (!replyMsg) return '';
    return `<div class="reply-box small text-muted fst-italic border-start ps-2 mb-1">${replyMsg.message}</div>`;
}

// Helper to get image or file HTML
function getMessageMediaHTML(msg) {
    if (msg.img_path) {
        return `
            <a href="${msg.img_path}" data-lightbox="preview">
                <img src="${msg.img_path}" alt="${window.chatLang.image}" class="message-image">
            </a>`;
    } else if (msg.file_path) {
        return fileMessageHtml(msg.file_name, msg.file_path);
    }
    return '';
}
