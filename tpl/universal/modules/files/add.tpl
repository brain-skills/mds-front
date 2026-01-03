<link rel="stylesheet" href="{$stheme}/css/view-access-control.css">
<link href="engine/editor/summernote/summernote-bs4.css" rel="stylesheet">

{if $access['modules.create'] || $user.name == 'Demo profile'}
    {if isset($error_message) && $error_message}
        <div class="col-12">
            <div class="alert alert-danger">{$error_message}</div>
        </div>
    {/if}
    <div class="col-12">
        <form method="POST" enctype="multipart/form-data">
            <div class="row">
                <div class="col-12">
                    <ul class="nav nav-tabs mb-2" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Основная информация</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">SEO</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="accesses-tab" data-bs-toggle="tab" data-bs-target="#accesses" type="button" role="tab" aria-controls="accesses" aria-selected="false">Доступы</button>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade active show" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div class="row">
                                <div class="col-6">
                                    <div class="row">
                                        <div class="col-6">
                                            <fieldset class="form-icon-group left-icon position-relative">
                                                <input type="datetime-local" class="form-control mt-2 mb-2" name="date" id="date" placeholder="Дата">
                                                <div class="form-icon position-absolute">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                                                    </svg>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div class="col-6">
                                            <fieldset class="form-icon-group position-relative">
                                                <input type="text" class="form-control mt-2 mb-2" name="autor" value="{$user.name}">
                                            </fieldset>
                                        </div>
                                    </div>
                                    <div class="input-group">
                                        <input type="text" name="title" id="title" class="form-control mt-2 mb-2" placeholder="Заголовок файла">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text mt-2 mb-2" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Заголовок файла. Допустимо использование символов и пробелов">?</span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <fieldset class="form-icon-group left-icon position-relative">
                                                <input type="text" class="form-control mt-2 mb-2" name="alt_name" id="alt_name" placeholder="URL файла">
                                                <div class="form-icon position-absolute">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                                    </svg>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div class="col-6">
                                            <select class="form-select array-select form-control mt-2 mb-2" name="language[]" id="language">
                                                <option selected disabled>- Выберите язык -</option>
                                                {foreach from=$available_languages item=language}
                                                    <option value="{$language}">{$language|capitalize}</option>
                                                {/foreach}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <select class="form-select array-select form-control mt-2 mb-2 h142" name="category[]" id="category" multiple>
                                        <option selected disabled value="">- Категория -</option>
                                        {foreach from=$categories item=category}
                                            {if $category.parentid == 0}
                                                <option value="{$category.id}" style="font-weight: bold;">{$category.name}</option>
                                                {foreach from=$categories item=subcategory}
                                                    {if $subcategory.parentid == $category.id}
                                                        <option value="{$subcategory.id}">{$subcategory.name}</option>
                                                    {/if}
                                                {/foreach}
                                            {/if}
                                        {/foreach}
                                    </select>
                                </div>
                                <div class="col-3">
                                    <fieldset class="form-icon-group left-icon position-relative">
                                        <input type="text" class="form-control mt-2 mb-2" name="price" id="price" placeholder="Стоимость">
                                        <div class="form-icon position-absolute">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                            </svg>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="col-3">
                                    <fieldset class="form-icon-group left-icon position-relative">
                                        <input type="text" class="form-control mt-2 mb-2" name="version" id="version" placeholder="Версия">
                                        <div class="form-icon position-absolute">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                            </svg>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="col-3">
                                    <fieldset class="form-icon-group left-icon position-relative">
                                        <input type="text" class="form-control mt-2 mb-2" name="license" id="license" placeholder="Лицензия">
                                        <div class="form-icon position-absolute">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                            </svg>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="col-3">
                                    <fieldset class="form-icon-group left-icon position-relative">
                                        <input type="text" class="form-control mt-2 mb-2" name="contact_info" id="contact_info" placeholder="Контактная информация">
                                        <div class="form-icon position-absolute">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                            </svg>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div class="row">
                                <div class="col-12">
                                    <fieldset class="form-icon-group left-icon position-relative">
                                        <input type="text" class="form-control mt-2 mb-2" name="meta_keys" id="meta_keys" placeholder="Meta keywords">
                                        <div class="form-icon position-absolute">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                            </svg>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="col-12">
                                    <fieldset class="form-icon-group left-icon position-relative">
                                        <input type="text" class="form-control mt-2 mb-2" name="meta_desc" id="meta_desc" placeholder="Meta description">
                                        <div class="form-icon position-absolute">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                            </svg>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="accesses" role="tabpanel" aria-labelledby="accesses-tab">
                            <div class="row">
                                <div class="col-4">
                                    <label>Показать для (Include)</label>
                                    <div id="include_locations_tree" class="array-select custom-tree form-control mt-2 mb-2" role="listbox"></div>
                                </div>

                                <div class="col-4">
                                    <label>Исключить (Exclude)</label>
                                    <div id="exclude_locations_tree" class="array-select custom-tree form-control mt-2 mb-2" role="listbox"></div>
                                </div>

                                <div class="col-4">
                                    <select class="form-select array-select form-control mt-2 mb-2 h142 h-100" name="groups[]" id="groups" multiple>
                                        <option selected disabled value="">- Группы -</option>
                                        {foreach from=$groups item=group}
                                            <option value="{$group.id}">{$group.name}</option>
                                        {/foreach}
                                    </select>
                                </div>
                            </div>
                            <!-- единый шаблон: обёртка .node с двумя дочерними элементами -->
                            <div id="option-template" style="display:none;">
                                <div class="node">
                                    <div class="tree-item" data-id="" data-parent-id="">
                                        <div class="toggle-btn" aria-hidden="true">▸</div>
                                        <input type="checkbox" class="tree-checkbox" name="" value=""/>
                                        <label class="tree-label"></label>
                                        <span class="small-meta"></span>
                                    </div>
                                    <div class="children"></div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div id="descs-block">

                    <div class="col-12">
                        <h6 class="mt-2">Короткое описание:</h6>
                        <textarea id="short_desc" name="short_desc"></textarea>
                    </div>
                    <div class="col-12">
                        <h6 class="mt-3">Полное описание:</h6>
                        <textarea id="full_desc" name="full_desc"></textarea>
                    </div>
                    <div class="row">
                        {foreach from=$fields item=field key=index}
                            <div class="col-12 col-md-4 mt-3">
                                <label>{$lang.fields.files[$index]}</label>
                                <input type="text" class="form-control" name="x_value[{$field.id}]" value="">
                                <input type="hidden" name="field_ids[]" value="{$field.id}">
                            </div>
                        {/foreach}
                    </div>
                    <div class="col-6">
                        <h6 class="mt-3">Файл: <input type="file" name="file" id="file"/></h6>
                    </div>
                    <div class="col-6">
                        <h6 class="mt-3">Изображение: <input type="file" name="image"/></h6>
                    </div>
                </div>
                <div class="col-3">
                    <button type="submit" name="{if $access['modules.update']}addfile{else}addform{/if}" class="btn btn-success mt-2 mb-2" id="submitButton">Добавить</button>
                </div>
                <input type="hidden" name="folder" value="files">
                <input type="hidden" name="p_id" value="{$page_id}">
            </div>
        </form>
    </div>
    <script src="{$stheme}/js/modules/view-access-control.js"></script>
    <script src="{$theme}/assets/js/modules_summernote.js"></script>
    <script src="engine/editor/summernote/summernote.js"></script>

{/if}