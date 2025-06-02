<form method="post" action="" class="border rounded-4 p-4 shadow-sm bg-body mt-4">
    <input type="hidden" name="action" value="add_comment">
    <input type="hidden" name="entity_id" value="{$entity_id}">
    <input type="hidden" name="entity_type" value="{$entity_type}">
    {if isset($parent_id)}
        <input type="hidden" name="parent_id" value="{$parent_id}">
    {/if}

    <h5 class="mb-4 text-body-emphasis">Оставить комментарий</h5>

    <div class="mb-3">
        <label for="author" class="form-label text-body">Имя</label>
        <input type="text" class="form-control" id="author" name="author" required placeholder="Ваше имя">
    </div>

    <div class="mb-3">
        <label for="content" class="form-label text-body">Комментарий</label>
        <textarea class="form-control" id="content" name="content" rows="4" required placeholder="Напишите что-нибудь..."></textarea>
    </div>

    <button type="submit" class="btn btn-primary w-100">
        <i class="bi bi-send me-2"></i> Отправить
    </button>
</form>
