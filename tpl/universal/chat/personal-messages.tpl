<section class="container-fluid" style="max-height: 74vh; height: 100vh;">
    <input type="hidden" id="wsurl" value="{$wsConfig.web_socket_url}">
    <div class="row g-4" style="height: 100%;">
        <input type="hidden" id="usr_token" value="{$token}">
        <input type="hidden" id="to_usr_id" value="">
        <audio id="message-sound" src="{$theme}/assets/sounds/chat-message.mp3" preload="auto"></audio>
        <!-- 📱 Чат-лист -->
        <div class=" col-12 col-md-5 col-lg-4 px-0 m-0" id="chat-list" style="height: 100%;">
            <div class="bg-blurred card h-100 rounded-0 m-0">
                <div class="c-list p-3 border-bottom" style="max-height:79px">
                    <div class="input-group">
                        <input type="search" class="bg-blurred form-control search-input" placeholder="{$lang.chat.search}">
                    </div>
                </div>
                <div class="overflow-auto" style="height: calc(100% - 79px);">
                    <ul class="list-unstyled m-0" id="chat-users-list">
                        <!-- Сюда будут добавляться пользователи -->
                    </ul>
                </div>
            </div>
        </div>
        <!-- 💬 Окно чата -->
        <div class="d-none d-md-flex col-12 col-md-7 col-lg-8 d-md-block px-0 m-0" id="chat-window" style="height: 100%;">
            <div class="bg-blurred mb-0 card h-100 shadow-sm rounded-0 d-flex flex-column justify-content-between">
                <!-- Header -->
                <div class=" align-items-center justify-content-between d-none action-header px-xl-4 py-xl-4 p-3 border-bottom cursor-pointer" style="min-height:79px; max-height:79px">
                    <!-- Кнопка назад для мобилок -->
                    <button class="btn btn-link d-md-none me-3 p-0 text-body-emphasis" id="back-to-list">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>
                    </button>

                    <div class="d-flex">
                        <div class="profile-wrapper me-3 d-none">
                            <img src="avatar.jpg" class="rounded-circle" width="38" height="38">
                            <span class="status-indicator status-online"></span>
                        </div>
                        <div>
                            <h6 class="mb-0 fw-semibold"></h6>
                            <p class="small mb-0"></p>
                        </div>
                    </div>
                    <div class="d-flex gap-4 chat-settings d-none">
                        <div>
                            <svg id="volume-toggle" style="cursor: pointer" xmlns="http://www.w3.org/2000/svg"
                                 width="18" height="18" fill="currentColor" class="bi bi-volume-up" viewBox="0 0 16 16">
                                <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>
                                <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>
                                <path d="M10.025 8a4.5 4.5 0 0 1-1.318 3.182L8 10.475A3.5 3.5 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.5 4.5 0 0 1 10.025 8M7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11"/>
                            </svg>
                        </div>
                        <div class="dropdown">
                            <button class="btn p-0 m-0 border-0" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z"/>
                                </svg>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end chat-header-dropdown p-0">
                                <li><a class="dropdown-item item-m-b removeChat" href="#">{$lang.chat.remove_chat_history_me}</a></li>
                                <li><a class="dropdown-item item-m-b blockUser text-danger" href="#">{$lang.chat.block}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="chat-placeholder">
                    <svg class="chat-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.48-1.07L3 21l1.57-3.91A7.999 7.999 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <p class="chat-text">{$lang.chat.select_user_to_chat}</p>
                </div>
                <div id="chat-messages" class="flex-grow-1 overflow-auto p-3 d-flex flex-column">
                    <div id="all-messages" class="d-flex flex-column w-100 flex-grow-1 gap-1"></div>
                </div>
                <div id="typing" class="typing-indicator" style="display: none;">
                    <span id="typing-name"></span>
                    <span class="dots">
                        <span>.</span><span>.</span><span>.</span>
                     </span>
                </div>
                <!-- Ввод сообщения -->
                <div id="reply-preview" class="d-none p-2 position-relative">
                    <span class="fw-medium rounded" id="reply-text"></span>
                    <button type="button" class="btn-close position-absolute top-0 end-0 me-2 mt-2" aria-label="Close" id="cancel-reply"></button>
                </div>
                <div class="edit-preview d-none" id="editPreview">
                    <div class="p-2 mb-0 shadow-sm">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="edit-text">
                                <strong class="text-primary">Редактирование:</strong>
                                <span id="editMessage" class="fw-medium rounded"></span>
                            </div>
                            <button class="btn-close text-muted p-0" type="button" id="cancelEditBtn" aria-label="Close"></button>
                        </div>
                    </div>
                </div>
                <div id="file-info" class="d-none ps-2">
                    <span id="file-name"></span>
                    <button id="remove-file" class="btn btn-sm btn-danger">×</button>
                </div>
                <div class="border-top p-2 align-items-center input-block gap-2 d-none">
                    <input id="message-input" type="text" class="rounded-2 form-control form-control-lg chat-input" placeholder="{$lang.chat.write_message}" autocomplete="off">
                    <div class="d-flex flex-column gap-2 align-items-center ps-2 pe-2">
                        <label for="file-input" class="fa fa-paperclip" style="cursor: pointer;"></label>
                        <input id="file-input" type="file" accept="image/*" class="d-none">
                        <button id="emoji-picker-button" type="button" class="btn p-0 d-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-emoji-laughing" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M12.331 9.5a1 1 0 0 1 0 1A5 5 0 0 1 8 13a5 5 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5M7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5"/>
                            </svg>
                        </button>
                    </div>
                    <button data-type="send" id="send-button" class="w-auto rounded-2 btn bg-reverse text-uppercase">
                        {$lang.chat.send}
                    </button>
                </div>
                <div class="container mt-5 block-block d-none">
                    <div class="alert alert-danger d-flex align-items-center shadow rounded-4 p-4 fade show" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" class="bi bi-ban" viewBox="0 0 16 16">
                            <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
                        </svg>
                        <div style="margin-left: 10px">
                            <h5 class="mb-1">{$lang.chat.access_blocked}</h5>
                            <p class="mb-0">{$lang.chat.account_is_blocked}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- Modal -->
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
<div class="modal fade" id="confirmRemove|ChatModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body text-center">
                <p class="mb-3">{$lang.chat.delete_chat_question}</p>
                <button type="button" class="btn btn-danger btn-sm me-2" id="confirmRCHDeleteBtn">{$lang.chat.delete}</button>
                <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">{$lang.chat.cancel}</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="confirmBlockUserModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body text-center">
                <p class="mb-3">{$lang.chat.block_user_question}</p>
                <button type="button" class="btn btn-danger btn-sm me-2" id="confirmBlockUserBtn">{$lang.chat.block}</button>
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

<!-- Контейнер для алертов -->
<link rel="stylesheet" href="{$theme}/assets/css/personal-messages.css">
<link href="https://cdn.jsdelivr.net/npm/lightbox2@2/dist/css/lightbox.min.css" rel="stylesheet">
<div id="alert-container" class="position-fixed top-0 end-0 p-3" style="z-index: 1100;"></div>
<script src="https://cdn.jsdelivr.net/npm/lightbox2@2/dist/js/lightbox.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@joeattardi/emoji-button@3.0.3/dist/index.min.js"></script>
<script>
    window.chatLang = '{$langJson}';
    window.chatLang = JSON.parse(window.chatLang);
</script>
<script src="{$theme}/assets/ws/personal-messages.js"></script>