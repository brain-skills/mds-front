{if $config.modules[$moduleName]["filter_form"] === true}

    <div class="container mb-3">
        <form method="GET" id="filterForm">
            <div class="row g-3 align-items-end">

                <div class="col-md-6">
                    <label class="form-label">Категории</label>
                    <select class="form-select form-select-lg" name="category" onchange="this.form.submit()">
                        <option selected value="">Все категории</option>
                        {foreach $categories as $category}
                            <option {if $category.id == $filterCategory }selected{/if} value="{$category.id}">{$category.name}</option>
                        {/foreach}
                    </select>
                </div>

                <div class="col-md-6">
                    <label class="form-label">Сортировать по</label>
                    <select class="form-select form-select-lg" name="sort" onchange="this.form.submit()">
                        <option {if $filterSort == "date" }selected{/if} value="date">Дате загрузки</option>
                        <option {if $filterSort == "views" }selected{/if} value="views">Просмотрам</option>
                        <option {if $filterSort == "rating" }selected{/if} value="rating">Рейтингу</option>
                    </select>
                </div>

            </div>
        </form>
    </div>

{/if}