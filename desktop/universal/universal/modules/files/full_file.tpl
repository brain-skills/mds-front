<div class="card py-3 px-3">
    <div class="row">
        <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mb-3">
            <img class="img-responsive" src="../../{$files.image}" alt="" style="min-height: 210px;">
        </div>
        <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8 mb-3">
            <h4 class="fs-5">{$files.title}</h4>
            <p class="mb-2"><span class="text-muted">Категории</span>:
                {assign var='categoryAltNames' value=','|explode:$files.category_alt_names}
                {foreach $categories as $index => $category}
                    {if $index > 0}, {/if}<a href="/fc/{$categoryAltNames[$index]|default:''|escape:'url'}">{$category}</a>
                {/foreach}
            </p>
            <div class="row">
                <div class="col-6">
                    <p class="mb-2"><span class="text-muted">Обновлено:</span> {$files.date}</p>
                    <p class="mb-2"><span class="text-muted">Просмотров:</span> {$files.views}</p>
                    <p class="mb-2"><span class="text-muted">Цена:</span> {$files.price}</p>
                </div>
                <div class="col-6">
                    <p class="mb-2"><span class="text-muted">Версия:</span> {$files.version}</p>
                    <p class="mb-2"><span class="text-muted">Лицензия:</span> {$files.license}</p>
                    <p class="mb-2"><span class="text-muted">Контактная информация:</span> {$files.contact_info}</p>
                </div>
            </div>
            {if $fileExists}
                <p><a href="../../{$files.file_path}" class="btn btn-success mt-2" download>Скачать файл ({$fileSizeFormatted})</a></p>
            {else}
                <p><a href="#" class="btn btn-outline-success" download>Файл отсутствует или был удалён</a></p>
            {/if}
        </div>
        <div class="col-12 mt-2">
            <p class="mb-0">Краткое описание</p>
            <pre class="bg-dark text-light px-2 py-2">{$files.short_desc}</pre>
        </div>
        <div class="col-12 mt-2">
            <p class="mb-0">Полное описание</p>
            <pre class="bg-dark text-light px-2 py-2">{$files.full_desc}</pre>
        </div>
        <div class="col-12 mt-3">
            <h5>Комментарии:</h5>
            {include file='main/comments.tpl' comments=$comments files=$files}
        </div>
    </div>
</div>