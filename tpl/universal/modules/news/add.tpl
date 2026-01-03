{if $access['modules.create'] || $user.name == 'Demo profile'}
    {if isset($error_message) && $error_message}
        <div class="col-12">
            <div class="alert alert-danger">{$error_message}</div>
        </div>
    {/if}

    <div class="col-12">
        <form method="POST" id="page-save-form" enctype="multipart/form-data">
            <div class="row">
                <div class="col-12">
                    <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button">Основная информация</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button">SEO</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="accesses-tab" data-bs-toggle="tab" data-bs-target="#accesses" type="button">Доступы</button>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="home">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <input type="datetime-local" class="form-control" name="date" id="date" placeholder="Дата">
                                </div>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" name="autor" value="{$user.name}" readonly>
                                </div>
                                <div class="col-12">
                                    <div class="input-group">
                                        <input type="text" name="title" id="title" class="form-control" placeholder="Заголовок новости" required>
                                        <span class="input-group-text" data-bs-toggle="popover" data-bs-content="Заголовок новости">?</span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" name="alt_name" id="alt_name" placeholder="URL новости (латиницей)">
                                </div>
                                <div class="col-md-6">
                                    <select class="form-select" name="language[]" id="language" required>
                                        <option value="" disabled selected>- Выберите язык -</option>
                                        {foreach from=$available_languages item=lang}
                                            <option value="{$lang}">{$lang|capitalize}</option>
                                        {/foreach}
                                    </select>
                                </div>
                                <div class="col-12">
                                    <select class="form-select h142" name="category[]" id="category" multiple required>
                                        <option value="" disabled>- Категория -</option>
                                        {foreach from=$categories item=cat}
                                            {if $cat.parentid == 0}
                                                <option value="{$cat.name}" style="font-weight:bold;background:#f8f9fa;">{$cat.name}</option>
                                                {foreach from=$categories item=sub}
                                                    {if $sub.parentid == $cat.id}
                                                        <option value="{$sub.name}">— {$sub.name}</option>
                                                    {/if}
                                                {/foreach}
                                            {/if}
                                        {/foreach}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="profile">
                            <div class="row g-3">
                                <div class="col-12">
                                    <input type="text" class="form-control" name="meta_keys" placeholder="Meta keywords">
                                </div>
                                <div class="col-12">
                                    <input type="text" class="form-control" name="meta_desc" placeholder="Meta description">
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="accesses">
                            <div class="row g-3">
                                <div class="col-md-4">
                                    <label>Показать для (Include)</label>
                                    <div id="include_locations_tree" class="form-control custom-tree" style="height:142px;overflow:auto;"></div>
                                </div>
                                <div class="col-md-4">
                                    <label>Исключить (Exclude)</label>
                                    <div id="exclude_locations_tree" class="form-control custom-tree" style="height:142px;overflow:auto;"></div>
                                </div>
                                <div class="col-md-4">
                                    <label>Группы пользователей</label>
                                    <select class="form-select h142" name="groups[]" id="groups" multiple>
                                        <option value="" disabled>- Группы -</option>
                                        {foreach from=$groups item=group}
                                            <option value="{$group.id}">{$group.name}</option>
                                        {/foreach}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Описания -->
                <div class="col-12 mt-4">
                    <h6>Короткое описание:</h6>
                    <textarea id="short_desc" name="short_desc"></textarea>
                </div>
                <div class="col-12 mt-3">
                    <h6>Полное описание:</h6>
                    <textarea id="full_desc" name="full_desc"></textarea>
                </div>

                <div class="col-12 mt-3">
                    <label>Изображение:</label>
                    <input type="file" name="image" class="form-control">
                </div>

                <div class="col-12 mt-4">
                    <button type="submit" name="addnews" class="btn btn-success btn-lg">
                        Добавить новость
                    </button>
                </div>

                <input type="hidden" name="folder" value="news">
                <input type="hidden" name="p_id" value="{$page_id}">
            </div>
        </form>
    </div>
{/if}