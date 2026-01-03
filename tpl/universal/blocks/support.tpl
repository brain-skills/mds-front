<link rel="stylesheet" href="{$theme}/assets/css/support.css">

<li class="ps-0 pe-2 px-3 d-flex justify-content-between align-items-center">
    {if $user.group === 1 }
        <a href="/admin?action=tickets" class="text-decoration-none dropdown-item rounded-2 ps-3 fw-medium w-auto">
            Мои Тикеты
        </a>
    {else}
        <a href="/myTickets" class="text-decoration-none dropdown-item rounded-2 ps-3 fw-medium w-auto">
            Мои Тикеты
        </a>
    {/if}
    <a href="#" id="openTicketModal" data-bs-toggle="modal" data-bs-target="#ticketModal"><i class="fa fa-plus mt-1"></i></a>
</li>

<div class="modal w-100 fade" id="ticketModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Создать тикет</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <form id="ticketForm">
                    <div class="mb-3">
                        <label class="form-label">Тема</label>
                        <input type="text" id="ticketTitle" name="title" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Описание</label>
                        <textarea id="ticketDescription" name="description" class="form-control" rows="4" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Приоритет</label>
                        <select id="ticketPriority" name="priority" class="form-select">
                            <option value="low">Низкий</option>
                            <option value="medium" selected>Средний</option>
                            <option value="high">Высокий</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light rounded-2" data-bs-dismiss="modal">Отмена</button>
                <button type="submit" form="ticketForm" class="btn btn-primary btn-sm fs-6 py-1 px-2 rounded-1">Отправить</button>
            </div>
        </div>
    </div>
</div>

<script src="{$theme}/assets/ws/support.js"></script>