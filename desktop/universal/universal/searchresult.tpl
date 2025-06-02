{if $results}
    <div class="row">
        <h3 class="ml-0 mb-3">Найденные результаты:</h3>
        {foreach from=$results item=result}
            <div class="col-12">
                <div class="alert alert-secondary" role="alert">
                    {if $result.source == 'static_pages'}
                        <a href="{$root_url}/{$result.alt_name}?lang={$result.language}">{$result.title}</a>
                    {elseif $result.source == 'ads'}
                        <a href="{$root_url}/ads/{$result.alt_name}?lang={$result.language}">{$result.title}</a>
                    {elseif $result.source == 'files'}
                        <a href="{$root_url}/files/{$result.alt_name}?lang={$result.language}">{$result.title}</a>
                    {elseif $result.source == 'movies'}
                        <a href="{$root_url}/movies/{$result.alt_name}?lang={$result.language}">{$result.title}</a>
                    {elseif $result.source == 'news'}
                        <a href="{$root_url}/news/{$result.alt_name}?lang={$result.language}">{$result.title}</a>
                    {elseif $result.source == 'products'}
                        <a href="{$root_url}/products/{$result.alt_name}?lang={$result.language}">{$result.title}</a>
                    {/if}
                </div>
            </div>
        {/foreach}
    </div>
{else}
    <p>Результаты не найдены.</p>
{/if}