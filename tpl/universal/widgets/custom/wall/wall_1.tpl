<link rel="stylesheet" href="{$theme}/assets/css/wall_custom.css">
<div class="wall-wrapper">

    <!-- Wall Header -->
    <div class="wall-header">
        <h1>{$widgetData.title}</h1>
        <p class="description">{$widgetData.description}</p>
        <div class="d-flex justify-content-between align-items-center">
            <span class="followers">
                <span id="followers-count">{$widgetData.followersCount}</span> подписчиков
            </span>

            {if $widgetData.usrToken }
                {if $widgetData.isOwner === false }
                    <button class="btn btn-outline-primary btn-subscribe" id="subscribe-btn">
                        Подписаться
                    </button>
                {/if}
            {/if}
        </div>
    </div>

    <input type="hidden" id="wall-id" value="{$widgetData.id}">

    {if !empty($widgetData.usrToken) }
        <!-- New Post Form -->
        <div class="post-card mb-4 d-flex">
            <div class="d-flex w-100 align-items-center">
                <img src="{$widgetData.usrAvatar}" class="rounded-circle me-2" alt="User Avatar" width="40" height="40" loading="lazy">
                <div class="post-input-container w-100 position-relative">
                    <div class="form-control" id="post-content" contenteditable="true" placeholder="Что у вас нового?" aria-label="Post content input"></div>
                </div>
            </div>

            <div class="modal-footer">
                <div class="container-fluid p-0 d-flex justify-content-between align-items-center">
                    <div class="d-flex flex-column ps-3 pe-3">
                        <label for="file-upload" class="p-0 btn {if ($wsConfig.live_chat.file_send === false && $wsConfig.live_chat.image_send === false)} d-none {/if}" style="cursor: pointer;" aria-label="Attach file">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
                                <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z"/>
                            </svg>
                            <input id="file-upload" type="file" class="d-none {if ($wsConfig.live_chat.file_send === false && $wsConfig.live_chat.image_send === false)} d-none {/if}" aria-hidden="true">
                        </label>
                        <button id="emoji-picker-btn" type="button" class="p-0 btn {if ($wsConfig.live_chat.emoji_select === false) } d-none {/if}" aria-label="Open emoji picker">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-emoji-laughing" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M12.331 9.5a1 1 0 0 1 0 1A5 5 0 0 1 8 13a5 5 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5M7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5"/>
                            </svg>
                        </button>
                    </div>
                    <button data-mid="" id="send-message" class="btn btn-dark rounded-4 send-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                        </svg>
                    </button>
                    <div class="text-end ms-auto punlic">
                        <button class="btn bg-reverse rounded-2 px-4 py-2" id="submit-post-btn">Опубликовать</button>
                    </div>
                </div>
            </div>
        </div>
    {/if}

    <!-- Posts List -->
    <div id="posts-container">
        <!-- Posts will be added via JS -->
    </div>

    <div id="post-modal" class="modal fade" tabindex="-1">
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Публикация</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                </div>
                <div class="modal-body" style="padding-bottom: 100px;">
                    <div id="modal-post-content"></div>
                    <textarea class="form-control mb-2" id="new-comment-input" rows="2" placeholder="Напишите комментарий..."></textarea>
                    <button class="btn btn-primary btn-sm comment-send" id="add-comment-btn">Отправить</button>
                </div>
            </div>
        </div>
    </div>

</div>

<script src="{$theme}/assets/widgets/walls.js"></script>