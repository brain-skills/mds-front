<link rel="stylesheet" href="{$theme}/assets/css/live-chat.css">
<section class="container-fluid px-0" style="max-height: 100%">

<div class="chat-container">
    <input type="hidden" id="wsurl" value="{$wsConfig.web_socket_url}">
    <input type="hidden" id="nmt" value="{$wsConfig.live_chat.nextMessageTime}">

    <div class="chat-header">
        <div class="chat-title">{$lang.chat.group_chat}</div>
        <div class="online-count">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
            </svg> <span id="onlineCount">0</span> {$lang.chat.online}
        </div>
    </div>
    <input type="hidden" id="usr_token" value="{$token}">
    <div class="chat-messages" id="chatMessages">
        <div class="no-messages">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>{$lang.chat.no_messages}</p>
            <span>{$lang.chat.write_first}</span>
        </div>


    </div>{*
    <div class="typing-indicator" id="typingIndicator"></div>
*}

    <div id="typing" class="typing-indicator" style="display: none;">
        <span id="typing-name"></span>
        <span class="dots">
                            <span>.</span><span>.</span><span>.</span>
                        </span>
    </div>
    <div class="reply-preview d-none" id="replyPreview">
        <div class="reply-text">
            <strong>{$lang.chat.reply_to}:</strong>
            <span id="replyMessage"></span>
        </div>
        <button class="close-reply" type="button" id="cancelReplyBtn" aria-label="Отменить ответ">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1
                     .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707
                     5.354 11.354a.5.5 0 1 1-.708-.708L7.293 8
                     4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
        </button>
    </div>
    <div class="edit-preview d-none" id="editPreview">
        <div class="p-2 mb-0 shadow-sm">
            <div class="d-flex justify-content-between align-items-center">
                <div class="edit-text">
                    <strong class="text-primary">Редактирование:</strong>
                    <span id="editMessage" class="fw-medium rounded"></span>
                </div>
                <button class="close-edit" type="button" id="cancelEditBtn" aria-label="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1
                            .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707
                            5.354 11.354a.5.5 0 1 1-.708-.708L7.293 8
                            4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>            
            </div>
        </div>
    </div>
    <div id="file-info" class="d-none align-items-center justify-content-between px-3 py-2 border-bottom rounded-top" style="gap: 10px;">
        <div class="d-flex align-items-center gap-2">
            <i class="fa fa-file"></i>
            <span id="file-name" class="text-truncate" style="max-width: 200px;"></span>
        </div>
        <button id="remove-file" type="button" class="btn btn-sm btn-outline-danger">
            ✕
        </button>
    </div>
    <div class="input-area">
        <button style="margin-bottom: 50px" id="scroll-to-bottom" title="В конец чата">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="black" class="bi bi-arrow-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
            </svg>
        </button>
        <div class="input-group">
            <label for="messageInput"></label>
            <textarea id="messageInput" class="form-control" placeholder="{$lang.chat.write_message}" rows="1" style="resize: none; border-radius: 20px"></textarea>

            <div class="d-flex flex-column ps-3 pe-3">
                <label for="file-input" class="p-0 btn {if ($wsConfig.live_chat.file_send === false && $wsConfig.live_chat.image_send === false)} d-none {/if}" style="cursor: pointer;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
                        <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z"/>
                    </svg>
                    <input id="file-input" type="file" class="d-none {if ($wsConfig.live_chat.file_send === false && $wsConfig.live_chat.image_send === false)} d-none {/if}">
                </label>
                <button id="emoji-picker-button" type="button" class="p-0 btn {if ($wsConfig.live_chat.emoji_select === false) } d-none {/if}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-emoji-laughing" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M12.331 9.5a1 1 0 0 1 0 1A5 5 0 0 1 8 13a5 5 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5M7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5"/>
                    </svg>
                </button>
            </div>
            <button data-mid="" id="send-message" class="btn btn-dark rounded-4 live-chat-send-btn-mobile">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                </svg>
            </button>
            <button data-type="send" id="send-button" class="w-auto rounded-2 btn bg-reverse text-uppercase live-chat-send-btn">
                {$lang.chat.send}
            </button>
        </div>
    </div>
</div>
</section>
<div class="modal fade" id="confirmDeleteModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body text-center">
                <p class="mb-3">{$lang.chat.delete_message_question}</p>
                <button type="button" class="btn btn-danger btn-sm me-2" id="confirmDeleteBtn">{$lang.chat.delete}</button>
                <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">{$lang.chat.cancel}</button>
            </div>
        </div>
    </div>
</div>
<div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div id="undoToast" class="toast align-items-center text-bg-dark border-0" role="alert">
        <div class="d-flex">
            <div class="toast-body">
                {$lang.chat.message_deleted}. <a href="#" class="text-warning text-decoration-underline" id="undoDelete">{$lang.chat.cancel}</a>
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    </div>
</div>

<div class="modal fade" id="reportModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content border-0 rounded-4 shadow-lg">
            <div class="modal-header border-0 pb-0">
                <h5 class="modal-title w-100 text-center fw-bold">{$lang.chat.report}</h5>
                <button type="button" class="btn-close me-2 mt-2" data-bs-dismiss="modal" aria-label=""></button>
            </div>
            <div class="modal-body">
                <form id="reportForm" class="text-start">
                    <div class="form-check mb-2">
                        <input class="form-check-input" type="checkbox" value="spam" id="reportSpam">
                        <label class="form-check-label" for="reportSpam">{$lang.chat.spam}</label>
                    </div>
                    <div class="form-check mb-2">
                        <input class="form-check-input" type="checkbox" value="abuse" id="reportAbuse">
                        <label class="form-check-label" for="reportAbuse">{$lang.chat.abuse}</label>
                    </div>
                    <div class="form-check mb-2">
                        <input class="form-check-input" type="checkbox" value="fake" id="reportFake">
                        <label class="form-check-label" for="reportFake">{$lang.chat.fake}</label>
                    </div>
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" value="other" id="reportOther">
                        <label class="form-check-label" for="reportOther">{$lang.chat.other}</label>
                    </div>
                    <button type="button" id="submitReport" class="btn w-100 rounded-pill text-white" style="background-color: #562E74;">
                        {$lang.chat.send_report}
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<link href="https://cdn.jsdelivr.net/npm/lightbox2@2/dist/css/lightbox.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/lightbox2@2/dist/js/lightbox.min.js"></script>
<script>
    window.chatLang = '{$langJson}';
    window.chatLang = JSON.parse(window.chatLang);
</script>
<script src="https://cdn.jsdelivr.net/npm/@joeattardi/emoji-button@3.0.3/dist/index.min.js"></script>
<script src="{$theme}/assets/ws/live-chat.js"></script>