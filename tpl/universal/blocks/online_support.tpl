<div class="chat-widget-container">
    <div class="chat-toggle chat-button bg-reverse" id="chatToggle">
        <p class="m-0">Задать Вопрос</p>
    </div>
    <div id="chatWidget" class="card">
        <div class="chat-header border-bottom" id="chatHeader">
            <div class="agent-info">
                <div class="agent-avatar position-relative">АС
                    <span class="status-indicator"></span>
                </div>
                <div class="agent-details">
                    <div class="agent-name">Онлайн поддержка</div>
                    <div class="agent-status">
                        <span>Online</span>
                    </div>
                </div>
            </div>
            <div class="header-actions">
                <button class="header-btn" id="closeChat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16">
                        <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659"/>
                    </svg>
                </button>
            </div>
        </div>

        <div class="chat-body" id="chatBody">
            <div class="d-flex flex-column align-items-center justify-content-center text-center p-4 h-100 empty-chat">
                <img src="https://cdn-icons-png.flaticon.com/512/542/542638.png" alt="No Messages" class="mb-3" style="width: 80px; opacity: 0.5;">
                <h5 class="text-muted mb-1">Здесь пока пусто</h5>
                <p class="text-secondary mb-0">Начните общение с поддержкой — мы вам обязательно ответим!</p>
            </div>

        </div>

        <div class="chat-footer">
            <div class="p-2 align-items-center input-block gap-2 d-flex w-100">
                <input id="message-input" type="text" class="rounded-2 form-control form-control-lg chat-input" placeholder="{$lang.chat.write_message}" autocomplete="off">
                <div class="d-flex flex-column gap-2 align-items-center ps-2 pe-2">
                    <label for="file-input" class="fa fa-paperclip" disabled="disabled" style="cursor: pointer;"></label>
                    <input id="file-input" type="file" accept="image/*" class="d-none">
                    <button id="emoji-picker-button" type="button" class="btn p-0 d-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-emoji-laughing" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M12.331 9.5a1 1 0 0 1 0 1A5 5 0 0 1 8 13a5 5 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5M7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5"/>
                        </svg>
                    </button>
                </div>
                <button class="send-btn send-m-support bg-reverse">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>

<script src="{$theme}/assets/ws/support.js"></script>