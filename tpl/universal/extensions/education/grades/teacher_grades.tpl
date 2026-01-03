<form method="get" action="/profile" class="row g-3 mb-4">

    <div class="col-md-4">
        <label class="form-label">Класс</label>
        <select name="class_id" class="form-select" onchange="this.form.submit()">
            <option value="">— выбери класс —</option>
            {foreach $classes as $c}
                <option value="{$c.id}" {if $classId==$c.id}selected{/if}>
                    {$c.name}
                </option>
            {/foreach}
        </select>
    </div>

    <div class="col-md-4">
        <label class="form-label">Предмет</label>
        <select name="subject_id" class="form-select"
                onchange="this.form.submit()"
                {if !$classId}disabled{/if}>
            <option value="">— выберите предмет —</option>
            {foreach $subjects as $s}
                <option value="{$s.id}" {if $subjectId==$s.id}selected{/if}>
                    {$s.subject}
                </option>
            {/foreach}
        </select>
    </div>

    <div class="col-md-4">
        <label class="form-label">Дата</label>
        <input onchange="this.form.submit()" type="date" name="period" class="form-control"
               value="{$period}">
    </div>
</form>

<div class="modal fade" id="gradeModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <form class="modal-content" id="gradeForm">
            <div class="modal-header">
                <h5 class="modal-title">Оценка</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body">
                <input type="hidden" name="grade_id">
                <input type="hidden" name="student_id">
                <input type="hidden" name="subject">
                <input type="hidden" name="day">
                <input type="hidden" id="teacher_id" name="teacher_id" value="{$teacherId}">
                <input type="hidden" id="class_id" name="class_id" value="{$classId}">

                <input type="text" name="grade" class="form-control" placeholder="Оценка">
            </div>

            <div class="modal-footer">
                <button class="btn btn-primary" type="submit">Сохранить</button>
            </div>
        </form>
    </div>
</div>
{if !empty($students)}
    <table class="table table-bordered diary-grid">
        <thead>
        <tr>
            <th style="width:220px">Ученик</th>
            {foreach $days as $day}
                <th>{$day|date_format:"%d.%m"}</th>
            {/foreach}
        </tr>
        </thead>

        <tbody>
        {foreach $students as $s}
            <tr>
                <td class="fw-bold">{$s.name}</td>

                {foreach $days as $day}
                    {assign var=cell value=$gradeMap[$s.id][$day]|default:null}

                    <td class="text-center">
                        <div class="grade-cell"
                             data-student="{$s.id}"
                             data-subject="{$subjectId}"
                             data-day="{$day}"
                             data-grade-id="{$cell.id|default:''}">
                            {$cell.grade|default:''}
                        </div>
                    </td>
                {/foreach}
            </tr>
        {/foreach}
        </tbody>
    </table>

    {else}
    Данные учеников отсуствуют
{/if}

{*
<table class="table table-bordered diary-grid">
    <thead>
    <tr>
        <th>Предмет</th>
        {foreach $days as $day}
            <th class="text-center">
                {$day|date_format:"%d.%m"}
            </th>
        {/foreach}
    </tr>
    </thead>

    <tbody>
    {foreach $subjects as $s}
        <tr>
            <td class="fw-bold">{$s.subject}</td>

            {foreach $days as $day}
                {assign var=cell value=$gradeMap[$s.subject][$day]|default:null}

                <td class="text-center">
                    <div class="grade-cell"
                         data-student="{$studentId}"
                         data-subject="{$s.subject}"
                         data-day="{$day}"
                         data-grade-id="{$cell.id|default:''}">
                        {$cell.grade|default:''}
                    </div>
                </td>
            {/foreach}
        </tr>
    {/foreach}
    </tbody>
</table>
*}

<style>
    .grade-cell {
        width: 36px;
        height: 36px;
        border: 2px solid #0d6efd;
        border-radius: 6px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-weight: 700;
    }
    .grade-cell:hover {
        background: #0d6efd;
        color: #fff;
    }
    .grade-input {
        width: 100%;
        height: 100%;
        text-align: center;
        border: none;
        outline: none;
        font-weight: 700;
        font-size: 14px;
        border-radius: 6px;
    }
</style>

<script>
    $(document).ready(function() {

        $(document).on('click', '.grade-cell', function() {
            const $cell = $(this);
            if ($cell.find('input').length) return; // уже редактируется

            debugger;
            const currentGrade = $cell.text().trim();
            const studentId = $cell.data('student');
            const subject = $cell.data('subject');
            const day = $cell.data('day');
            const gradeId = $cell.data('grade-id');
            const teacherId = $("#teacher_id").val();
            const class_id = $("#class_id").val();

            $cell.html('<input type="text" class="grade-input" value="' + currentGrade + '" />');
            const $input = $cell.find('input');
            $input.focus().select();

            $input.on('blur keyup', function(e) {
                if (e.type === 'blur' || e.key === 'Enter') {
                    const newGrade = $input.val().trim();

                    // нормальный AJAX
                    $.ajax({
                        url: 'engine/ajax/lib/education/grades/save_grade.php',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            grade_id: gradeId,
                            student_id: studentId,
                            subject: subject,
                            day: day,
                            grade: newGrade,
                            teacher_id: teacherId,
                            class_id: class_id
                        },
                        success: function(response) {
                            if (response && response.success) {
                                $cell.text(newGrade); // обновляем квадрат
                            } else {
                                $cell.text(currentGrade); // откат
                                alert(response.message || 'Ошибка при сохранении оценки');
                            }
                        },
                        error: function(xhr, status, error) {
                            $cell.text(currentGrade); // откат
                            console.error('AJAX error:', status, error);
                        }
                    });
                }
            });
        });
/*

        $('#gradeForm').on('submit', function(e) {
            e.preventDefault();
            $.post('/teacher/save_grade.php', $(this).serialize(), function() {
                location.reload(); // или ajax обновление ячейки
            });
        });
*/

    });
</script>