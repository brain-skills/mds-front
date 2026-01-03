<section class="container-fluid p-0">
  <div class="row g-4">
    <div class="col-12 col-md-5 col-lg-4 p-0" id="chat-list">
      <div class="chat-members-list card h-100 shadow-sm rounded-4 bg-blurred" style="border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important;">
        <div class="p-3 border-bottom" style="height: 80px;">
          <div class="input-group bg-blurred">
            <input type="search" class="form-control bg-blurred" placeholder="Поиск...">
            <span class="input-group-text bg-transparent border-start-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </span>
          </div>
        </div>

        <div class="overflow-auto" style="max-height: 500px;">
          <ul class="list-unstyled m-0">
            <li class="chat-list-item">
              <a href="#" class="d-flex justify-content-between text-decoration-none text-body open-chat">
                <div class="d-flex align-items-center">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    class="rounded-circle me-2" width="38" height="38">
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
            <li class="chat-list-item">
              <a href="#" class="d-flex justify-content-between text-decoration-none text-body open-chat">
                <div class="d-flex align-items-center">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    class="rounded-circle me-2" width="38" height="38">
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
            <li class="chat-list-item">
              <a href="#" class="d-flex justify-content-between text-decoration-none text-body open-chat">
                <div class="d-flex align-items-center">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    class="rounded-circle me-2" width="38" height="38">
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
            <!-- ... other chat list items omitted for brevity ... -->
          </ul>
        </div>
      </div>
    </div>

    <!-- 💬 Окно чата -->
    <div class="col-12 col-md-7 col-lg-8 d-none d-md-block p-0 " id="chat-window">
      <div class="card h-100 shadow-sm rounded-4 bg-blurred d-flex flex-column" style="border-top-left-radius: 0px !important; border-bottom-left-radius: 0px !important;">
        <!-- Header -->
        <div class="d-flex align-items-center p-3 border-bottom justify-content-between" style="height: 80px;">
          <!-- Кнопка назад для мобилок -->
          <button class="btn btn-link d-md-none me-3 p-0 text-body-emphasis" id="back-to-list">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
          </button>
          <div class="d-flex gap-2 align-items-center">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
              class="rounded-circle" width="45" height="45">
            <div>
              <h6 class="mb-0 fw-semibold">Elon Musk</h6>
              <p class="text-success small mb-0">Online</p>
            </div>
          </div>
          <div class="d-flex gap-4">
            <i class="fa fa-search"></i>
            <i class="fa fa-video-camera"></i>
            <i class="fa fa-gear"></i>
          </div>
        </div>

        <!-- Сообщения -->
        <div id="chat-messages" class="flex-grow-1 overflow-auto p-3" style="max-height: 500px;">
          <div class="d-flex flex-column gap-3">
            <!-- Message 1 -->
            <div class="d-flex flex-column gap-2 message-wrapper">
              <div class="text-muted small mt-1">12:00 PM | Aug 13</div>
              <div class="d-flex gap-3 align-items-center">
                <div class="bg-body-tertiary p-2 rounded-3">Привет!</div>
                <div class="dropdown-wrapper" style="position: relative;">
                  <i class="fa fa-ellipsis-v text-body ellipsis-icon" style="cursor:pointer;"></i>
                  <ul class="chat-dropdown-menu mt-2 dropdown-custom-position dropdown-list">
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none text-body">Edit</a></li>
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none text-body">Reply</a></li>
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none" style="color: red !important;">Delete</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Message 2 -->
            <div class="d-flex flex-column gap-2 align-self-end text-end message-wrapper">
              <div class="text-muted small mt-1">12:00 PM | Aug 13</div>
              <div class="d-flex gap-3 align-items-center" style="flex-direction: row-reverse;">
                <div class="bg-primary text-white p-2 rounded-3">Как дела?</div>
                <div class="dropdown-wrapper" style="position: relative;">
                  <i class="fa fa-ellipsis-v text-body ellipsis-icon" style="cursor:pointer;"></i>
                  <ul class="chat-dropdown-menu mt-2 dropdown-custom-position dropdown-list" style="right: 0px;">
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none text-body">Edit</a></li>
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none text-body">Reply</a></li>
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none" style="color: red !important;">Delete</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Message 3 -->
            <div class="d-flex flex-column gap-2 message-wrapper">
              <div class="text-muted small mt-1">12:00 PM | Aug 13</div>
              <div class="d-flex gap-3 align-items-center">
                <div class="bg-body-tertiary p-2 rounded-3">Привет!</div>
                <div class="dropdown-wrapper" style="position: relative;">
                  <i class="fa fa-ellipsis-v text-body ellipsis-icon" style="cursor:pointer;"></i>
                  <ul class="chat-dropdown-menu mt-2 dropdown-custom-position dropdown-list">
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none text-body">Edit</a></li>
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none text-body">Reply</a></li>
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none" style="color: red !important;">Delete</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Message 4 -->
            <div class="d-flex flex-column gap-2 align-self-end text-end message-wrapper">
              <div class="text-muted small mt-1">12:00 PM | Aug 13</div>
              <div class="d-flex gap-3 align-items-center" style="flex-direction: row-reverse;">
                <div class="bg-primary text-white p-2 rounded-3">Как дела?</div>
                <div class="dropdown-wrapper" style="position: relative;">
                  <i class="fa fa-ellipsis-v text-body ellipsis-icon" style="cursor:pointer;"></i>
                  <ul class="chat-dropdown-menu mt-2 dropdown-custom-position dropdown-list" style="right: 0px;">
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none text-body">Edit</a></li>
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none text-body">Reply</a></li>
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none" style="color: red !important;">Delete</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Message 5 -->
            <div class="d-flex flex-column gap-2 message-wrapper">
              <div class="text-muted small mt-1">12:00 PM | Aug 13</div>
              <div class="d-flex gap-3 align-items-center">
                <div class="bg-body-tertiary p-2 rounded-3">Привет!</div>
                <div class="dropdown-wrapper" style="position: relative;">
                  <i class="fa fa-ellipsis-v text-body ellipsis-icon" style="cursor:pointer;"></i>
                  <ul class="chat-dropdown-menu mt-2 dropdown-custom-position dropdown-list">
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none text-body">Edit</a></li>
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none text-body">Reply</a></li>
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none" style="color: red !important;">Delete</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Message 6 -->
            <div class="d-flex flex-column gap-2 align-self-end text-end message-wrapper">
              <div class="text-muted small mt-1">12:00 PM | Aug 13</div>
              <div class="d-flex gap-3 align-items-center" style="flex-direction: row-reverse;">
                <div class="bg-primary text-white p-2 rounded-3">Как дела?</div>
                <div class="dropdown-wrapper" style="position: relative;">
                  <i class="fa fa-ellipsis-v text-body ellipsis-icon" style="cursor:pointer;"></i>
                  <ul class="chat-dropdown-menu mt-2 dropdown-custom-position dropdown-list" style="right: 0px;">
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none text-body">Edit</a></li>
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none text-body">Reply</a></li>
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none" style="color: red !important;">Delete</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Message 7 -->
            <div class="d-flex flex-column gap-2 message-wrapper">
              <div class="text-muted small mt-1">12:00 PM | Aug 13</div>
              <div class="d-flex gap-3 align-items-center">
                <div class="bg-body-tertiary p-2 rounded-3">Привет!</div>
                <div class="dropdown-wrapper" style="position: relative;">
                  <i class="fa fa-ellipsis-v text-body ellipsis-icon" style="cursor:pointer;"></i>
                  <ul class="chat-dropdown-menu mt-2 dropdown-custom-position dropdown-list">
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none text-body">Edit</a></li>
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none text-body">Reply</a></li>
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none" style="color: red !important;">Delete</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Message 8 -->
            <div class="d-flex flex-column gap-2 align-self-end text-end message-wrapper">
              <div class="text-muted small mt-1">12:00 PM | Aug 13</div>
              <div class="d-flex gap-3 align-items-center" style="flex-direction: row-reverse;">
                <div class="bg-primary text-white p-2 rounded-3">Как дела?</div>
                <div class="dropdown-wrapper" style="position: relative;">
                  <i class="fa fa-ellipsis-v text-body ellipsis-icon" style="cursor:pointer;"></i>
                  <ul class="chat-dropdown-menu mt-2 dropdown-custom-position dropdown-list" style="right: 0px;">
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none text-body">Edit</a></li>
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none text-body">Reply</a></li>
                    <li><a href="#" class="chat-dropdown-item d-block px-3 py-2 text-decoration-none text-body" style="color: red !important;">Delete</a></li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Отправить сообщение -->

        <div class="border-top p-3 d-flex align-items-center gap-2">
          <input type="text" class="form-control form-control-lg bg-blurred" placeholder="Введите сообщение...">
          <button class="btn btn-outline-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
            </svg>
          </button>
        </div>
      </div>
      </div>
    </div>
  </div>
</section>

<style>
	.dropdown-list {
      display: none;
      position: absolute;
      top: 100%;
      background: #fff;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      padding: 0;
      margin: 0;
      list-style: none;
      z-index: 1000;
      width: 100px;
	}
    .chat-list-item {
      padding: 10px;
      border-bottom: 1px solid #dee2e6;
      transition: background-color 0.2s ease;
	}
    .chat-list-item:hover {
      background-color: #f8f9fa;
    }
    [data-bs-theme="dark"] .chat-members-list {
      border-right: 1px solid;
    }
    [data-bs-theme="dark"] .chat-dropdown-item {
      color: black !important;
    }

</style>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const dropdownWrappers = document.querySelectorAll('.dropdown-wrapper');

    dropdownWrappers.forEach(wrapper => {
      const icon = wrapper.querySelector('.ellipsis-icon');
      const menu = wrapper.querySelector('.chat-dropdown-menu');

      icon.addEventListener('click', (e) => {
        e.stopPropagation();

        document.querySelectorAll('.chat-dropdown-menu').forEach(m => {
          if (m !== menu) m.style.display = 'none';
        });

        if (menu.style.display === 'block') {
          menu.style.display = 'none';
        } else {
          menu.style.display = 'block';
        }
      });
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('.chat-dropdown-menu').forEach(menu => {
        menu.style.display = 'none';
      });
    });
  });
</script>
