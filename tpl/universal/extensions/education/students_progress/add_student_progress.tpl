<div class="modal fade" id="addStudentProgress" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content rounded-4 shadow">

            <form method="post" enctype="multipart/form-data">
                <input type="hidden" name="action" value="save-stud-progress">

                <!-- Header -->
                <div class="modal-header border-0 pb-0">
                    <h5 class="modal-title fw-semibold">
                        📈 Добавить активность ученика
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <!-- Body -->
                <div class="modal-body pt-2">

                    <!-- 1. Кому -->
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Ученик</label>
                        <select name="student_id" class="form-select form-select-lg" required>
                            {foreach $studentOptions as $student}
                                <option value="{$student.id}">{$student.name}</option>
                            {/foreach}
                        </select>
                    </div>

                    <!-- 2. Категория -->
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Навык / область</label>
                        <select name="category_id" class="form-select" required>
                            {foreach $categoryOptions as $category}
                                <option value="{$category.id}">{$category.title}</option>
                            {/foreach}
                        </select>
                    </div>

                    <!-- 3. Результат -->
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Результат занятия</label>
                        <textarea name="texts[after]"
                                  class="form-control"
                                  rows="3"
                                  placeholder="Что получилось? Что ученик освоил?"></textarea>
                    </div>

                    <!-- 4. Медиа -->
                    <!-- 4. Медиа -->
                    <div class="mb-3">
                        <label class="form-label fw-semibold">Материалы (фото / видео)</label>
                        <input type="file"
                               name="media[after][]"
                               multiple
                               class="form-control"
                               id="mediaInput">
                        <div id="mediaPreview" class="mt-2 d-flex flex-wrap gap-2"></div>
                        <div class="form-text">
                            Можно прикрепить фото тетрадей, видео выполнения задания и т.д.
                        </div>
                    </div>

                    <!-- Добавляем стиль -->
                    <style>
                        #mediaPreview div {
                            background-color: #f8f9fa;
                            border: 1px solid #dee2e6;
                            border-radius: 6px;
                            padding: 6px 10px;
                            font-size: 0.875rem;
                            color: #495057;
                            display: flex;
                            align-items: center;
                            gap: 6px;
                        }
                        #mediaPreview div span {
                            cursor: pointer;
                            font-weight: bold;
                            color: #dc3545;
                        }
                    </style>

                    <!-- JS для отображения файлов -->
                    <script>
                        const mediaInput = document.getElementById('mediaInput');
                        const mediaPreview = document.getElementById('mediaPreview');

                        mediaInput.addEventListener('change', () => {
                            mediaPreview.innerHTML = '';
                            Array.from(mediaInput.files).forEach((file, index) => {
                                const fileDiv = document.createElement('div');
                                fileDiv.textContent = file.name;

                                const removeSpan = document.createElement('span');
                                removeSpan.textContent = '×';
                                removeSpan.addEventListener('click', () => {
                                    const dt = new DataTransfer();
                                    Array.from(mediaInput.files)
                                        .forEach((f, i) => { if(i !== index) dt.items.add(f); });
                                    mediaInput.files = dt.files;
                                    fileDiv.remove();
                                });

                                fileDiv.appendChild(removeSpan);
                                mediaPreview.appendChild(fileDiv);
                            });
                        });
                    </script>


                    <!-- 5. Уровень -->
                    <div class="mb-4">
                        <label class="form-label fw-semibold">Оценка прогресса</label>
                        <div class="d-flex gap-2">
                            {foreach [-2,-1,0,1,2] as $lvl}
                                <input type="radio"
                                       class="btn-check"
                                       name="progress_level"
                                       value="{$lvl}"
                                       id="lvl{$lvl}">
                                <label class="btn btn-outline-{if $lvl>0}success{elseif $lvl<0}danger{else}secondary{/if}"
                                       for="lvl{$lvl}">
                                    {$lvl}
                                </label>
                            {/foreach}
                        </div>
                    </div>

                    <!-- OPTIONAL: Было раньше -->
                    <div class="accordion" id="beforeAccordion">
                        <div class="accordion-item border-0">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed bg-light"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#beforeBlock">
                                    Было раньше (необязательно)
                                </button>
                            </h2>
                            <div id="beforeBlock" class="accordion-collapse collapse">
                                <div class="accordion-body">
                  <textarea name="texts[before]"
                            class="form-control"
                            rows="2"
                            placeholder="С чем были сложности раньше?"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Footer -->
                <div class="modal-footer border-0">
                    <button type="button"
                            class="btn btn-light"
                            data-bs-dismiss="modal">
                        Отмена
                    </button>
                    <button type="submit"
                            class="btn btn-primary px-4">
                        Сохранить
                    </button>
                </div>

            </form>

        </div>
    </div>
</div>
