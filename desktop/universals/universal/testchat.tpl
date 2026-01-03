<section class="container-fluid">
  <div class="row g-4">

    <!-- 📱 Чат-лист -->
    <div class="col-12 col-md-5 col-lg-4" id="chat-list">
      <div class="card h-100 shadow-sm rounded-4 bg-body">
        <div class="p-3 border-bottom">
          <div class="input-group">
            <input type="search" class="form-control" placeholder="Поиск...">
            <span class="input-group-text bg-transparent border-start-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </span>
          </div>
        </div>

        <div class="overflow-auto" style="max-height: 500px;">
          <ul class="list-unstyled m-0">
            <li class="p-3 border-bottom">
              <a href="#" class="d-flex justify-content-between text-decoration-none text-body open-chat">
                <div class="d-flex">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    class="rounded-circle me-3" width="50">
                  <div>
                    <p class="mb-1 fw-semibold">Marie Horwitz</p>
                    <p class="small text-muted mb-0">Hello, are you there?</p>
                  </div>
                </div>
                <div class="text-end">
                  <p class="small text-muted mb-1">Just now</p>
                  <span class="badge bg-danger rounded-pill">3</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 💬 Окно чата -->
    <div class="col-12 col-md-7 col-lg-8 d-none d-md-block" id="chat-window">
      <div class="card h-100 shadow-sm rounded-4 bg-body d-flex flex-column">
        <!-- Header -->
        <div class="d-flex align-items-center p-3 border-bottom">
          <!-- Кнопка назад для мобилок -->
          <button class="btn btn-link d-md-none me-3 p-0 text-body-emphasis" id="back-to-list">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
          </button>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
            class="rounded-circle me-3" width="45" height="45">
          <div>
            <h6 class="mb-0 fw-semibold">Elon Musk</h6>
            <p class="text-success small mb-0">Online</p>
          </div>
        </div>

        <!-- Сообщения -->
        <div id="chat-messages" class="flex-grow-1 overflow-auto p-3" style="max-height: 500px;">
          <div class="d-flex flex-column gap-3">
            <!-- Пример фейковых сообщений -->
            <div class="align-self-start">
              <div class="bg-body-tertiary p-2 rounded-3">Привет!</div>
              <div class="text-muted small mt-1">12:00 PM | Aug 13</div>
            </div>

            <div class="align-self-end text-end">
              <div class="bg-primary text-white p-2 rounded-3">Как дела?</div>
              <div class="text-muted small mt-1">12:01 PM | Aug 13</div>
            </div>

            <div class="align-self-start">
              <div class="bg-body-tertiary p-2 rounded-3">Сообщение 1</div>
              <div class="text-muted small mt-1">12:02 PM</div>
            </div>
            <div class="align-self-end text-end">
              <div class="bg-primary text-white p-2 rounded-3">Сообщение 2</div>
              <div class="text-muted small mt-1">12:03 PM</div>
            </div>
            <div class="align-self-start">
              <div class="bg-body-tertiary p-2 rounded-3">Сообщение 3</div>
              <div class="text-muted small mt-1">12:04 PM</div>
            </div>
            <div class="align-self-end text-end">
              <div class="bg-primary text-white p-2 rounded-3">Сообщение 4</div>
              <div class="text-muted small mt-1">12:05 PM</div>
            </div>
            <!-- ...добавь ещё по желанию -->
          </div>
        </div>

        <!-- Ввод -->
        <div class="border-top p-3 d-flex align-items-center gap-2">
          <input type="text" class="form-control form-control-lg" placeholder="Введите сообщение...">
          <button class="btn btn-outline-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

  </div>
</section>

<script>
  const chatList = document.getElementById('chat-list');
  const chatWindow = document.getElementById('chat-window');
  const openChatLinks = document.querySelectorAll('.open-chat');
  const backBtn = document.getElementById('back-to-list');

  openChatLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.innerWidth < 768) {
        chatList.classList.add('d-none');
        chatWindow.classList.remove('d-none');
      }
    });
  });

  backBtn.addEventListener('click', function () {
    chatWindow.classList.add('d-none');
    chatList.classList.remove('d-none');
  });
</script>