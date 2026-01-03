<div class="modal fade" id="addSchedule" tabindex="-1" aria-labelledby="addScheduleLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg"> <!-- сделал большую модалку -->
        <div class="modal-content">
            <!-- Заголовок модального окна -->
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitle">Добавить расписание</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Тело модального окна -->
            <form id="scheduleForm" method="post" action="/profile" class="mb-0">
            <input type="hidden" name="action" value="save-schedule">
            <input type="hidden" name="schedule_id" id="schedule_id" value="">
            <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-md-4">
                            <label class="form-label">Название</label>
                            <input type="text" name="title" class="form-control" placeholder="Напр. Алгебра">
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">Класс *</label>
                            <select name="class_id" id="class_id" class="form-select" required>
                                <!-- options -->
                                {foreach $scheduleClasses as $class}
                                    <option value="{$class.id}">{$class.name}</option>
                                {/foreach}
                            </select>
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">Предмет *</label>
                            <select name="subject_id" id="subject_id" class="form-select">
                                {foreach $subjects as $subject}
                                    <option value="{$subject.id}">{$subject.subject}</option>
                                {/foreach}
                            </select>
                        </div>

                        <div class="col-md-2">
                            <label class="form-label">Начало *</label>
                            <input type="time" name="starts" id="starts" class="form-control" required>
                        </div>

                        <div class="col-md-2">
                            <label class="form-label">Конец *</label>
                            <input type="time" name="ends" id="ends" class="form-control" required>
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">День расписания *</label>
                            <input type="date" name="schedule_date" id="schedule_date" class="form-control" required>
                        </div>

                    </div>
            </div>

            <!-- Подвал модального окна -->
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-bs-dismiss="modal">Закрыть</button>
                <button type="button" data-schedule-id="" name="delete_schedule" class="btn btn-danger" style="display: none" id="deleteSchedule">Удалить</button>
                <button type="submit" name="save_schedule" class="btn btn-secondary" id="modalOkBtn">Сохранить</button>
            </div>
            </form>

        </div>
    </div>
</div>
