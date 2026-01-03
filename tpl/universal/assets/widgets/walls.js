
$(document).ready(function () {

    let currentUserToken = null;
    let wsUrl = null;
    let ws;

    const postsContainer = document.getElementById('postsContainer');
    const postInput = document.getElementById('postContent');
    const mediaInput = document.getElementById('postMedia');
    const submitButton = document.getElementById('submitPost');

    const subscribeBtn = document.getElementById("subscribeBtn");
    const followersCount = document.getElementById("followersCount");
    const wallId = document.getElementById("wall_id").value;

    let posts;
    let currentPostId;

    showLoading();

    let isSubscribed = false;

    $.ajax({
        url: '/engine/ajax/lib/notification/get_token.php',
        type: 'GET',
        data: { },
        dataType: 'json',
        success: function(response) {
            if (response.token !== false) {
                currentUserToken = response.token;
                wsUrl = response.ws_config.wall_web_socket_url;
                connectToWebSocket();
            }
        },
        error: function(xhr) {
        }
    });

    function connectToWebSocket() {

        ws = new WebSocket(wsUrl + '?usr_token=' + currentUserToken);

        ws.onopen = function () {
            console.log("Connected to WALL");
            ws.send(JSON.stringify({
                type: 'wall',
                from_user_token: currentUserToken,
                action: "connect",
                wallId: wallId
                //globalLang: window.globalLang
            }));
        };

        ws.onmessage = function () {

            const data = JSON.parse(event.data);

            if (data.type === "wall") {

                if (data.action === "connect") {

                    if (data.currentUserToken === currentUserToken) {

                        if (data.wallId === wallId) {
                            isSubscribed = data.isSubscribed;
                            subscribeUnsubscribe();

                            posts = data.wallPosts;

                            for (let i = 0; i < data.wallPosts.length; i++) {
                                renderPost(data.wallPosts[i])
                            }
                            hideLoading()
                        }

                    }

                } else if (data.action === "subscribeUnsubscribe") {
                    if (data.wallId === wallId) {
                        if (data.currentUserToken === currentUserToken) {
                            isSubscribed = data.isSubscribed;
                            subscribeUnsubscribe();
                        }

                        followersCount.textContent = data.wallFollowersCount;
                    }

                } else if (data.action === "createPost") {

                    if (data.wallId === wallId) {
                        posts.push(data.post);
                        renderPost(data.post);
                        postInput.value = '';
                        mediaInput.value = '';
                    }

                } else if (data.action === "error") {

                    if (data.wallId === wallId) {
                        if (data.currentUserToken === currentUserToken) {
                            Swal.fire({
                                title: 'Error',
                                text: data.errorMessage,
                                icon: 'error',
                                confirmButtonText: 'ok'
                            });
                        }
                    }

                } else if (data.action === "comment") {

                    if (data.post.comments) {
                        renderCommentsForPost(data.postId, data.post.comments)

                        let index = posts.findIndex(post => post.id === data.post.id);

                        if (index !== -1) {
                            posts[index]["comments"][data.postId] = data.post.comments;
                        }

                        const postEl = $("#post-"+data.postId);

                        $("#post-modal").find("#post-"+data.postId).find(".comments-count").html(data.commentsCount);
                        postEl.find(".comments-count").html(data.commentsCount);

                        $("#new-comment-text").val("");
                    }


                } else if (data.action === "replyComment") {

                    if (data.post.comments) {
                        renderCommentsForPost(data.postId, data.post.comments)

                        const postEl = $("#post-"+data.postId);

                        $("#post-modal").find("#post-"+data.postId).find(".comments-count").html(data.commentsCount);
                        postEl.find(".comments-count").html(data.commentsCount);
                    }

                } else if (data.action === "likeUnlike") {
                    const postEl = $("#post-"+data.postId);

                    postEl.find(".like-count").html(data.likes);
                    $("#post-modal").find("#post-"+data.postId).find(".like-count").html(data.likes);

                }

            }

        };

    }

    function getPostById(postId) {
        return posts.find(p => p.id == postId);
    }

    function subscribeUnsubscribe() {
        if (subscribeBtn) {
            subscribeBtn.classList.toggle("btn-outline-primary", !isSubscribed);
            subscribeBtn.classList.toggle("btn-secondary", isSubscribed);
            subscribeBtn.textContent = isSubscribed ? "Вы подписаны" : "Подписаться";
        }
    }

    if (subscribeBtn) {
        subscribeBtn.addEventListener("click", async () => {

            ws.send(JSON.stringify({
                type: 'wall',
                from_user_token: currentUserToken,
                action: "subscribeUnsubscribe",
                wallId: wallId,
                isSubscribed: isSubscribed
            }));

        });
    }


    const currentUser = {
        id: 1,
        name: 'Иван Петров',
        avatar: 'https://via.placeholder.com/40'
    };



    if (submitButton) {
        // Публикация нового поста
        submitButton.addEventListener('click', async () => {
            const text = postInput.value.trim();
            const mediaFiles = Array.from(mediaInput.files);

            if (!text && mediaFiles.length === 0) return;

            const base64Files = await Promise.all(mediaFiles.map(file => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        resolve({
                            name: file.name,
                            type: file.type.startsWith('image') ? 'image' : 'video',
                            data: reader.result // base64 data URL
                        });
                    };
                    reader.readAsDataURL(file); // 👈 base64
                });
            }));

            const post = {
                type: 'wall',
                from_user_token: currentUserToken,
                action: "createPost",
                wallId: wallId,
                content: text,
                file: base64Files, // 👈 файлы в base64
                createdAt: new Date().toLocaleString()
            };

            ws.send(JSON.stringify(post));
        });
    }


    document.addEventListener('click', async function (e) {
        const postEl = e.target.closest('.post-card');
        if (!postEl) return;

        const postId = postEl.dataset.postId;

        if (e.target.closest('.btn-like')) {
            const likeBtn = e.target.closest('.btn-like');
            const countEl = likeBtn.querySelector('.like-count');

            ws.send(JSON.stringify({
                type: 'wall',
                from_user_token: currentUserToken,
                action: "likeUnlike",
                wallId: wallId,
                postId: postId
            }));


           //
        }
        // Комментировать
        if (e.target.closest('#post-modal .btn-toggle-comments')) {
            const commentsSection = document.querySelector("#post-modal").querySelector('.comments-section');
            commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
        }
        // Отправка комментария
        if (e.target.classList.contains('comment-send')) {

            const input = postEl.querySelector('#new-comment-text');
            const text = input.value.trim();
            if (!text) return;

            ws.send(JSON.stringify({
                type: 'wall',
                from_user_token: currentUserToken,
                action: "comment",
                wallId: wallId,
                text: text,
                postId: postId
            }));

        }


/*
        // Репорт
        if (e.target.closest('.btn-report')) {
            if (confirm('Вы действительно хотите пожаловаться на этот пост?')) {
                const res = await fetch(`/api/report`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ post_id: postId })
                });
                const data = await res.json();
                if (data.success) {
                    e.target.closest('.btn-report').textContent = '🚫 Жалоба отправлена';
                }
            }
        }*/
    });

    $(".comment-send").on("click", function (e) {

        const input = document.querySelector("#post-modal").querySelector('#new-comment-text');
        const text = input.value.trim();
        if (!text) return;

        ws.send(JSON.stringify({
            type: 'wall',
            from_user_token: currentUserToken,
            action: "comment",
            wallId: wallId,
            text: text,
            postId: currentPostId
        }));
    })


    let offset = 5;
    const limit = 10;
    let isLoading = false;
    let noMorePosts = false;

    function loadPosts() {
        if (isLoading || noMorePosts) return;
        isLoading = true;
        showLoading();

        $.ajax({
            url: `/engine/ajax/lib/wall/get_wall_posts.php`,
            method: 'GET',
            data: {
                wall_id: wallId,
                offset: offset,
                limit: limit
            },
            dataType: 'json',
            success: function(data) {
                data.forEach(post => renderPost(post, "append"));

                posts = [...posts, ...data];

                offset += data.length;

                if (data.length < limit) {
                    noMorePosts = true;
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Ошибка загрузки постов:", textStatus, errorThrown);
            },
            complete: function() {
                isLoading = false;
                hideLoading();

            }
        });
    }


    postsContainer.addEventListener('scroll', () => {
        const scrollTop = postsContainer.scrollTop;
        const scrollHeight = postsContainer.scrollHeight;
        const clientHeight = postsContainer.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - 50) {
            // Достигли низа контейнера — грузим новые посты
            loadPosts();
        }
    });

    function showLoading() {
        $('#loadingOverlay').fadeIn(150);
    }

    function hideLoading() {
        $('#loadingOverlay').fadeOut(150);
    }

    $(document).on('click', '.post-card', function (e) {
        // Не реагировать, если уже в модалке
        if ($(this).closest('#post-modal').length) return;
        if ($('#post-modal').is('button, .btn, textarea, .reply-btn, .submit-reply, .cancel-reply, .bi-hand-thumbs-up, .btn-toggle-comments')) return;

        // Игнорируем клики по интерактивным элементам
        if ($(e.target).is('button, .btn, textarea, .reply-btn, .submit-reply, .cancel-reply, .btn-like, .bi-hand-thumbs-up, #postContent')) return;

        const postId = $(this).data('postId');

        currentPostId = postId;
        openPostInModal(postId);
    });


    function openPostInModal(postId, focusComments = false) {
        const post = getPostById(postId);
        const modalContainer = $('#modal-post-container');

        modalContainer.html('');
        renderPost(post, 'modal');

        const modal = new bootstrap.Modal(document.getElementById('post-modal'));
        modal.show();

        // Через 300мс прокрутка к комментариям, если надо
        if (focusComments) {
            setTimeout(() => {
                $('#post-modal .comments-section').slideDown();
                document.getElementById('post-modal').querySelector('.comments-section').scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    }

    $(document).on('click', '#postsContainer .btn-toggle-comments', function (e) {
        e.stopPropagation(); // Не запускаем открытие по .post-card

        const postId = $(this).closest('.post-card').data('postId');

        currentPostId = postId;

        openPostInModal(postId, true);
    });



    // Отрисовка поста
    function renderPost(post, type = "prepend") {
     /*   if (document.getElementById('post-' + post.id)) {
            return; // уже отрисован
        }
*/

        let commentsData = post.comments;

        const card = document.createElement('div');
        card.className = 'post-card';
        card.dataset.postId = post.id;
        card.id = "post-"+post.id;

        card.innerHTML = `
    <div class="d-flex align-items-center mb-2">
      <img src="${post.author_data.avatar}" class="rounded-circle me-2" width="40" height="40" alt="">
      <div>
        <div class="author">${post.author_data.name} </div>
        ${post.author_data.is_owner === true ? `<small class="text-muted">Владелец стены</small><br>` : ""}
        <small class="text-muted">${post.created_at}</small>
      </div>
    </div>
    <div>${post.content || ''}</div>

    <div class="post-media">
      ${
                post.media && post.media.url
                    ? (post.media.media_type === 1
                        ? `<img src="${post.media.url}" alt="image">`
                        : `<video controls src="${post.media.url}"></video>`)
                    : ''
            }
    </div>


    <div class="d-flex justify-content-between align-items-center mt-3">
      <div>
        <button class="btn btn-sm btn-like me-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
          <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
        </svg> <span class="like-count">${post.likes || 0}</span>
        </button>
        <button class="btn btn-sm btn-toggle-comments"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chat-dots" viewBox="0 0 16 16">
          <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
          <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
        </svg> <span class="comments-count">${post.commentsCount || 0}</span></button>
      </div>
      <button class="btn btn-sm btn-outline-danger btn-report"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-flag" viewBox="0 0 16 16">
          <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21 21 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21 21 0 0 0 14 7.655V1.222z"/>
        </svg></button>
    </div>

    <div class="comments-section mt-3" style="display: none;">
      <div class="comments-container">
        <h5 class="mb-4">Комментарии</h5>
        
        <!-- Контейнер для комментариев -->
        <div id="comments-list"></div>
    </div>

    <!-- Шаблон комментария (скрыт) -->
    <!-- Шаблон комментария -->
    <div id="comment-template" style="display: none;">
      <div class="comment" data-id="{id}">
        <div class="comment-header">
         <img class="comment-avatar" src="{avatar}" width="40" alt="">
          <!--<div class="comment-avatar"></div>-->
          <span class="comment-author">{author}</span>
          <span class="comment-date">{date}</span>
        </div>
        <div class="comment-text">{text}</div>
        <div class="comment-actions">
          <span class="comment-action reply-btn">Ответить</span>
          <span class="comment-action toggle-replies-btn" style="display: none;"></span>
        </div>
        <div class="reply-form" style="display: none;">
          <textarea class="form-control mb-2 reply-textarea" rows="2" placeholder="Напишите ответ..."></textarea>
          <button class="btn btn-primary btn-sm submit-reply">Отправить</button>
          <button class="btn btn-outline-secondary btn-sm cancel-reply">Отмена</button>
        </div>
        <div class="replies-container" style="display: none;"></div>
      </div>
    </div>

    </div>
  `;

        if (type === "prepend") {
            postsContainer.prepend(card);
        } else if (type === "append") {
            postsContainer.append(card);
        } else if (type === "modal") {
            document.getElementById('modal-post-container').appendChild(card);
        }


        if (commentsData[post.id]) {
            renderCommentsForPost(post.id, commentsData[post.id]);
        }
    }

    function renderCommentsForPost(postId, comments) {
        const container = document.querySelector(`#post-${postId} .comments-section #comments-list`);
        if (!container) return;

        $('#modal-post-container').find(".comments-section #comments-list").html("");

        if (comments.length > 0) {
            comments.forEach(comment => {
                $('#modal-post-container').find(".comments-section #comments-list").append(createCommentElement(comment));
            });
        } else {
            $('#modal-post-container').find(".comments-section #comments-list").append(`<h6>Нету комментариев</h6>`);
        }

    }

    function createCommentElement(comment) {
        const template = document.querySelector('#comment-template').innerHTML;

        const html = template
            .replace('{id}', comment.id)
            .replace('{avatar}', comment.avatar)
            .replace('{author}', comment.author)
            .replace('{date}', comment.date)
            .replace('{text}', comment.text)
            .replace('{likes}', comment.likes);

        const wrapper = document.createElement('div');
        wrapper.innerHTML = html.trim();
        const el = wrapper.firstChild;

        const repliesContainer = el.querySelector('.replies-container');
        const toggleBtn = el.querySelector('.toggle-replies-btn');

        if (comment.replies && comment.replies.length > 0) {
            // Показать кнопку и подписать её
            toggleBtn.style.display = 'inline';
            toggleBtn.textContent = `Показать ответы (${comment.replies.length})`;

            // Создать дочерние элементы, но пока не показывать
            comment.replies.forEach(reply => {
                repliesContainer.appendChild(createCommentElement(reply));
            });

            // Поведение кнопки «Показать ответы»
            toggleBtn.addEventListener('click', function () {
                const visible = repliesContainer.style.display === 'block';
                repliesContainer.style.display = visible ? 'none' : 'block';
                toggleBtn.textContent = visible
                    ? `Показать ответы (${comment.replies.length})`
                    : `Скрыть ответы`;
            });
        }

        return el;
    }

    $(document).on('click', '.submit-reply', function () {
        const replyForm = $(this).closest('.reply-form');
        const commentEl = replyForm.closest('.comment');
        const textarea = replyForm.find('.reply-textarea');
        const replyText = textarea.val().trim();

        if (replyText === '') {
            alert('Введите текст ответа');
            return;
        }

        const postId = commentEl.closest('.post-card').data('postId');
        const parentId = commentEl.data('id');


        ws.send(JSON.stringify({
            type: 'wall',
            from_user_token: currentUserToken,
            action: "replyComment",
            wallId: wallId,
            replyText: replyText,
            postId: postId,
            parentId: parentId
        }));

/*
        $.ajax({
            url: '/add-comment.php',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                entity_id: postId,
                entity_type: 'wall_post',
                parent_id: parentId,
                author: 'Вы',
                text: replyText
            }),
            success: function (response) {
                textarea.val('');
                replyForm.slideUp();

                const newReply = {
                    id: response.comment_id,
                    parentId: parentId,
                    author: 'Вы',
                    date: response.date,
                    text: replyText,
                    likes: 0,
                    replies: []
                };

                const repliesContainer = commentEl.children('.replies-container')[0];
                repliesContainer.appendChild(createCommentElement(newReply));
                $(repliesContainer).slideDown();

                // Обновим кнопку "Показать ответы"
                const toggleBtn = commentEl.find('> .comment-actions .toggle-replies-btn');
                if (toggleBtn.length && toggleBtn.is(':hidden')) {
                    toggleBtn.text('Скрыть ответы').show();
                }
            }
        });
*/
    });


    $(document).on('click', '.reply-btn', function () {
        const commentEl = $(this).closest('.comment');
        const replyForm = commentEl.children('.reply-form');

        $('.reply-form').not(replyForm).slideUp(); // Закрыть другие формы
        replyForm.slideToggle();
    });

    $(document).on('click', '.cancel-reply', function () {
        $(this).closest('.reply-form').slideUp();
    });



    $('<style>')
        .prop('type', 'text/css')
        .html(`
        #loadingOverlay {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            padding: 10px 20px;
            border-radius: 30px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            display: none;
        }

        #loadingOverlay .loader {
            width: 24px;
            height: 24px;
            border: 3px solid #ccc;
            border-top: 3px solid #007bff;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin: auto;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `)
        .appendTo('head');

    // Создаем сам overlay
    $('<div>', { id: 'loadingOverlay' })
        .append($('<div>', { class: 'loader' }))
        .appendTo('body');
})
