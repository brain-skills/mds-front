{if $group == "Teacher"}

    <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="mb-0">Активности учеников</h3>

        <button type="button"
                class="btn btn-dark add-student-progress-modal"
                data-bs-toggle="modal"
                data-bs-target="#addStudentProgress">
            + Добавить
        </button>
    </div>

    <div class="row g-3">
        {foreach $activityList as $a}
            <div class="col-md-6 col-xl-4">
                <div class="card h-100 shadow-sm border-0">

                    <div class="card-body d-flex flex-column gap-2">

                        <!-- Ученик + дата -->
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <div class="fw-semibold">{$a.student_name}</div>
                                <div class="text-muted small">{$a.category_title}</div>
                            </div>

                            <div class="text-muted small">
                                {$a.created_at|date_format:"%d.%m"}
                            </div>
                        </div>

                        <!-- Уровень -->
                        <div>
                        <span class="badge px-3 py-2 fs-6 bg-{if $a.progress_level > 0}success{elseif $a.progress_level < 0}danger{else}secondary{/if}">
                            {if $a.progress_level > 0}+{/if}{$a.progress_level}
                        </span>
                        </div>

                        <!-- Краткий вывод -->
                        {if $a.summary}
                            <div class="text-muted small">
                                {$a.summary|truncate:90}
                            </div>
                        {/if}

                        <!-- Действия -->
                        <div class="mt-auto d-flex justify-content-end gap-2">
                     {*       <a href="/teacher/progress/view/{$a.id}"
                               class="btn btn-sm btn-outline-secondary">
                                Просмотр
                            </a>*}

                            <a href="#"
                               class="btn btn-sm btn-outline-primary edit_student_progress">
                                Ред.
                            </a>

                            <a href="/profile?action=delete_student_progress&progress_id={$a.id}"
                               onclick="return confirm('Удалить активность?')"
                               class="btn btn-sm btn-outline-danger">
                                ✕
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        {/foreach}
    </div>

    {elseif $group == "Parent"}
    <h3 class="mb-0">Активность учеников</h3><br>
    <div class="accordion" id="progressAccordion">
        {foreach $progressByCategory as $i => $category}
            <div class="accordion-item mb-3 shadow-sm border-0">
                <h2 class="accordion-header" id="heading{$i}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse{$i}" aria-expanded="false" aria-controls="collapse{$i}">
                        <strong>{$category.title}</strong> ({count($category.items)} ученика)
                    </button>
                </h2>

                <div id="collapse{$i}" class="accordion-collapse collapse" aria-labelledby="heading{$i}" data-bs-parent="#progressAccordion">
                    <div class="accordion-body">
                        {foreach $category.items as $item}
                            <div class="card mb-3 shadow-sm">
                                <div class="card-body">
                                    <!-- Верхняя строка: имя ученика, badge, дата и учитель -->
                                    <div class="d-flex justify-content-between align-items-start mb-2">
                                        <div class="flex-grow-1">
                                            <div class="d-flex align-items-center gap-2 flex-wrap">
                                                <h5 class="mb-0">{$item.student_name}</h5>
                                                <span class="badge bg-{$item.color}">{$item.label}</span>
                                            </div>
                                            <small class="text-muted">
                                                <i class="bi bi-calendar"></i> {$item.date|date_format:"%d.%m.%Y"} | Учитель: {$item.teacher_name}
                                            </small>
                                        </div>
                                        <img src="{if !empty($student_avatar)}{$student_avatar}{else}/uploads/profiles/default.svg{/if}" class="rounded-circle" width="50" height="50" alt="avatar">
                                    </div>

                                    {if $item.summary}
                                        <p class="text-muted mt-2 mb-2">{$item.summary}</p>
                                    {/if}

                                    <!-- Было / Стало -->
                                    <div class="row g-2 mt-2">
                                        <div class="col-md-6">
                                            <strong class="text-muted">Было</strong>
                                            <div class="border rounded p-2 bg-light">{$item.before_text|default:"—"}</div>
                                        </div>
                                        <div class="col-md-6">
                                            <strong class="text-muted">Стало</strong>
                                            <div class="border rounded p-2 bg-light">{$item.after_text|default:"—"}</div>
                                        </div>
                                    </div>

                                    <!-- Медиа -->
                                    {if $item.media}
                                        <div class="mt-3 d-flex gap-2 flex-wrap">
                                            {foreach $item.media as $m}
                                                <img src="{$m.file_path}" class="rounded shadow-sm" style="width:100px;cursor:pointer;" onclick="window.open('{$m.file_path}','_blank')">
                                            {/foreach}
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        {/foreach}
                    </div>
                </div>
            </div>
        {/foreach}
    </div>

{/if}
