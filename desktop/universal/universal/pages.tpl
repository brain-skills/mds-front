<div class="card py-3 px-3">
    {$page.full_desc}
    {if $currentUrl == '/contacts'}
    <div class="col-12 p-4 blur">
        {include file="./submit_feedback.tpl"}
    </div>
    {/if}
</div>