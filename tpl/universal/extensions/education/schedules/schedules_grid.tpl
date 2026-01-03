{if $access['schedules.create']}
    <button type="button" class="btn btn-dark add-schedule-modal mb-3" data-bs-toggle="modal" data-bs-target="#addSchedule">
        Добавить
    </button>
{/if}

{if $group == "Parent"}
    <form method="get" class="mb-3">
        <select name="student_id" class="form-select" onchange="this.form.submit()">
            {foreach $scheduleChildren as $child}
                <option value="{$child.student_id}"
                        {if $child.student_id == $selectedChild.student_id}selected{/if}>
                    {$child.student_name} ({$child.class_name})
                </option>
            {/foreach}
        </select>
    </form>
{/if}

<!-- Main Schedule Container -->
<div class="container">
    <div class="card-body">

        <!-- Title Section -->
        <div class="d-flex justify-content-between align-items-start mb-4">
            <div>
                <h2 class="h4 fw-bold mb-1">Расписания</h2>
                <div class="text-muted small">{$weekLabel}</div>
            </div>
            <!-- Grade Filter -->
            <div class="grade-filter mb-3">
                <form method="get" class="d-flex align-items-center gap-3 flex-wrap">
                    <div class="col-auto">
                        <label for="schedule_date" class="form-label small mb-1">Дата</label>
                        <input type="date" name="schedule_date" id="schedule_date" class="form-control form-control-sm modern-date"
                               value="{$smarty.get.schedule_date|default:''}" onchange="this.form.submit()">
                    </div>

                    <div class="btn-group" role="group" aria-label="Grade filter">
                        {foreach $scheduleClasses as $class}
                            <input type="radio" class="btn-check" name="class_id" value="{$class.id}" id="grade{$class.id}" autocomplete="off" onchange="this.form.submit()"
                                   {if $class_id == $class.id}checked{/if}>
                            <label class="btn btn-outline-secondary btn-sm" for="grade{$class.id}">{$class.name}</label>
                        {/foreach}
                    </div>
                </form>
            </div>


        </div>
        <!-- Schedule Grid -->
        <div class="schedule-container">
            <!-- Header -->
            <div class="schedule-header">
                <div class="time-header">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                    </svg>
                </div>

                {foreach $schedulesDays as $day}
                    <div class="day-header">
                        {$day.label}<br>
                        {$day.day}
                    </div>
                {/foreach}
            </div>


            <!-- Time Slots -->
            {foreach $lessons as $i => $time}
                <div class="schedule-row">
                    <div class="time-slot">{$time}</div>

                    {foreach $schedulesDays as $day}
                        {if isset($schedule[$day.date][$i])}
                            {assign var=lesson value=$schedule[$day.date][$i]}

                            <div class="lesson-slot {if $access['schedules.edit']}edit-schedule{/if}"
                                 data-date="{$lesson.schedule_date}"
                                 data-time-starts="{$lesson.starts}"
                                 data-time-ends="{$lesson.ends}"
                                 data-schedule-id="{$lesson.schedule_id}"
                                 data-subject="{$lesson.subject_id}"
                                 data-class="{$lesson.class_id}"

                                 style="cursor: pointer">
                                <div class="lesson-card" style="background:#cdcdcd">
                                    <div class="lesson-title">{$lesson.subject}</div>
                                    <div class="lesson-teacher">{$lesson.teacher_name}</div>

                                </div>
                            </div>
                        {else}
                            <div class="lesson-slot d-flex justify-content-center align-items-center">
                                {if $access['schedules.create']}
                                    <button
                                            class="btn btn-default d-flex justify-content-center align-items-center add-schedule"
                                            data-date="{$day.date}"
                                            data-time-starts="{$lesson.starts}"
                                            data-time-ends="{$lesson.ends}"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus-square-dotted" viewBox="0 0 16 16">
                                            <path d="M2.5 0q-.25 0-.487.048l.194.98A1.5 1.5 0 0 1 2.5 1h.458V0zm2.292 0h-.917v1h.917zm1.833 0h-.917v1h.917zm1.833 0h-.916v1h.916zm1.834 0h-.917v1h.917zm1.833 0h-.917v1h.917zM13.5 0h-.458v1h.458q.151 0 .293.029l.194-.981A2.5 2.5 0 0 0 13.5 0m2.079 1.11a2.5 2.5 0 0 0-.69-.689l-.556.831q.248.167.415.415l.83-.556zM1.11.421a2.5 2.5 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415zM16 2.5q0-.25-.048-.487l-.98.194q.027.141.028.293v.458h1zM.048 2.013A2.5 2.5 0 0 0 0 2.5v.458h1V2.5q0-.151.029-.293zM0 3.875v.917h1v-.917zm16 .917v-.917h-1v.917zM0 5.708v.917h1v-.917zm16 .917v-.917h-1v.917zM0 7.542v.916h1v-.916zm15 .916h1v-.916h-1zM0 9.375v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .916v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .917v.458q0 .25.048.487l.98-.194A1.5 1.5 0 0 1 1 13.5v-.458zm16 .458v-.458h-1v.458q0 .151-.029.293l.981.194Q16 13.75 16 13.5M.421 14.89c.183.272.417.506.69.689l.556-.831a1.5 1.5 0 0 1-.415-.415zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373Q2.25 16 2.5 16h.458v-1H2.5q-.151 0-.293-.029zM13.5 16q.25 0 .487-.048l-.194-.98A1.5 1.5 0 0 1 13.5 15h-.458v1zm-9.625 0h.917v-1h-.917zm1.833 0h.917v-1h-.917zm1.834-1v1h.916v-1zm1.833 1h.917v-1h-.917zm1.833 0h.917v-1h-.917zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                                        </svg>
                                    </button>
                                {/if}
                            </div>
                        {/if}
                    {/foreach}
                </div>
            {/foreach}
        </div>

    </div>
</div>

<style>
    /* Grade Filter */
    .grade-filter .btn-group {
        flex-wrap: wrap; /* чтобы кнопки переносились, если не влезают */
    }

    .grade-filter .btn {
        min-width: 60px;
        font-size: 12px;
        padding: 4px 8px;
        border-color: #dee2e6;
    }

    .grade-filter .btn-check:checked + .btn {
        background-color: #2c3e50;
        border-color: #2c3e50;
        color: white;
    }


    /* Class Curators */
    .class-curator-item {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 8px 12px;
        min-width: 110px;
    }

    .class-number {
        font-weight: 600;
        font-size: 13px;
        color: #2c3e50;
    }

    .curator-name {
        font-size: 12px;
        color: #6c757d;
    }

    /* Schedule Container */
    .schedule-container {
        border: 1px solid #e9ecef;
        border-radius: 8px;
        overflow: hidden;
    }

    /* Schedule Header */
    .schedule-header {
        display: grid;
        grid-template-columns: 100px repeat(5, 1fr);
        background-color: #2c3e50;
        color: white;
    }

    .time-header {
        padding: 12px;
        font-weight: 600;
        font-size: 13px;
    }

    .day-header {
        padding: 12px;
        text-align: center;
        font-weight: 500;
        font-size: 13px;
        border-left: 1px solid #3d4f65;
    }

    /* Schedule Rows */
    .schedule-row {
        display: grid;
        grid-template-columns: 100px repeat(5, 1fr);
        border-bottom: 1px solid #e9ecef;
        min-height: 70px;
    }

    .schedule-row:last-child {
        border-bottom: none;
    }

    .time-slot {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        font-size: 11px;
        color: #6c757d;
        font-weight: 500;
        background-color: #f8f9fa;
        border-right: 1px solid #e9ecef;
    }

    .lesson-slot {
        padding: 6px;
        border-left: 1px solid #e9ecef;
        background-color: white;
    }

    /* Lesson Cards */
    .lesson-card {
        height: 100%;
        border-radius: 6px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        transition: transform 0.2s ease;
    }

    .lesson-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .lesson-title {
        font-weight: 600;
        font-size: 13px;
        margin-bottom: 4px;
    }

    .lesson-teacher {
        font-size: 11px;
        opacity: 0.9;
    }

    /* Subject Colors */
    .lesson-card.math {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .lesson-card.literature {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }

    .lesson-card.arts {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }

    .lesson-card.english {
        background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    }

    .lesson-card.sport {
        background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    }

    /* Responsive Design */
    @media (max-width: 1200px) {
        .schedule-header,
        .schedule-row {
            grid-template-columns: 80px repeat(5, 1fr);
        }

        .time-slot {
            padding: 10px 6px;
            font-size: 12px;
        }

        .day-header {
            padding: 10px 6px;
            font-size: 12px;
        }

        .lesson-card {
            padding: 8px;
        }

        .lesson-title {
            font-size: 12px;
        }

        .lesson-teacher {
            font-size: 10px;
        }
    }

    @media (max-width: 768px) {
        .grade-filter .btn {
            min-width: 50px;
            font-size: 11px;
            padding: 3px 6px;
        }

        .class-curator-item {
            min-width: 90px;
            padding: 6px 8px;
        }

        .schedule-header,
        .schedule-row {
            grid-template-columns: 60px repeat(5, 1fr);
        }

        .time-slot {
            padding: 8px 4px;
            font-size: 11px;
        }

        .day-header {
            padding: 8px 4px;
            font-size: 11px;
        }
    }
    .modal-backdrop {
        z-index: 1040; /* стандартное значение для Bootstrap */
    }

    .modal {
        z-index: 1050; /* чтобы была над backdrop */
    }

</style>

<script>
    // JavaScript для фильтрации по классам
    document.addEventListener('DOMContentLoaded', function() {

        $(".add-schedule-modal").on("click", function () {

            const addScheduleModal = $("#addSchedule");

            addScheduleModal.find("#starts").val("");
            addScheduleModal.find("#ends").val("");
            addScheduleModal.find("#schedule_date").val("");
            addScheduleModal.find("#class_id").val("");
            addScheduleModal.find("#subject_id").val("");
            addScheduleModal.find("#schedule_id").val("");
            addScheduleModal.find("#deleteSchedule").css("display", "none");

            addScheduleModal.find("#modalTitle").html("Добавление расписания")

            addScheduleModal.modal('show');


        });

        $(".add-schedule").on("click", function () {

            debugger;

            const timeStarts = $(this).data('time-starts');
            const timeEnds = $(this).data('time-ends');

            const date = $(this).data('date');
            const addScheduleModal = $("#addSchedule");

            addScheduleModal.find("#starts").val(timeStarts);
            addScheduleModal.find("#ends").val(timeEnds);
            addScheduleModal.find("#schedule_date").val(date);
            addScheduleModal.find("#deleteSchedule").css("display", "none");

            addScheduleModal.find("#modalTitle").html("Добавление расписания даты " + date + ', ' + timeStarts + ' - ' + timeEnds)

            addScheduleModal.modal('show');


        });


        $(".edit-schedule").on("click", function () {

            debugger;

            const timeStarts = $(this).data('time-starts');
            const timeEnds = $(this).data('time-ends');

            const date = $(this).data('date');
            const addScheduleModal = $("#addSchedule");

            addScheduleModal.find("#starts").val(timeStarts);
            addScheduleModal.find("#ends").val(timeEnds);
            addScheduleModal.find("#schedule_date").val(date);
            addScheduleModal.find("#class_id").val($(this).data('class'));
            addScheduleModal.find("#subject_id").val($(this).data('subject'));
            addScheduleModal.find("#schedule_id").val($(this).data('schedule-id'));
            addScheduleModal.find("#deleteSchedule").css("display", "block");
            addScheduleModal.find("#deleteSchedule").attr('data-schedule-id', $(this).data('schedule-id'));

            addScheduleModal.find("#modalTitle").html("Редактирование расписания даты " + date + ', ' + timeStarts + ' - ' + timeEnds)
            addScheduleModal.modal('show');


        })

        $("#deleteSchedule").on("click", function() {
            const scheduleId = $(this).data('schedule-id');
            if (!scheduleId) {
                alert("ID расписания не найден!");
                return;
            }

            const form = $("#scheduleForm");

            // Меняем action внутри формы
            form.find('input[name="action"]').val('delete-schedule');

            // Заполняем hidden для schedule_id
            form.find('#schedule_id').val(scheduleId);

            // Отправляем форму
            form.submit();
        });


        const gradeRadios = document.querySelectorAll('input[name="gradeFilter"]');

        gradeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const selectedGrade = this.id.replace('grade', '');
                // Здесь будет логика фильтрации расписания по классу
                console.log('Selected grade:', selectedGrade);

                // Обновление отображения расписания в зависимости от выбранного класса
                // Это нужно будет реализовать на серверной стороне или через AJAX
            });
        });

    });
</script>