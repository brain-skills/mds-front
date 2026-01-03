<form method="get" action="/profile" class="row g-3 mb-4">
{*
    <input type="hidden" name="action" value="grades">
*}

    <div class="col-md-6">
        <label class="form-label">Ребёнок</label>
        <select name="student_id" class="form-select" onchange="this.form.submit()">
            <option value="">— выберите ребёнка —</option>
            {foreach $children as $c}
                <option value="{$c.id}" {if $studentId==$c.id}selected{/if}>
                    {$c.name}
                </option>
            {/foreach}
        </select>
    </div>

    <div class="col-md-6">
        <label class="form-label">Дата</label>
        <input onchange="this.form.submit()" type="date" name="period" class="form-control" value="{$period}">
    </div>

</form>

{if $diary}
    {include file="./diary_grid.tpl" diary=$diary readonly=true}
{else}
    <div class="text-muted">Выберите ребёнка и период</div>
{/if}
