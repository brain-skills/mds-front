<div class="container">
    {if $qr_success}
        <div class="qr-check">
            <p>Код: {$qr_token.code}</p>
            <p>Тип: {$qr_token.target_type}</p>
            <p>ID: {$qr_token.target_id}</p>
            <p>Label: {$qr_token.metadata.label}</p>
            <p>Модуль: {$qr_token.metadata.module_name}</p>
        </div>
    {else}
        <p style="color:red">Ошибка: {$qr_error}</p>
    {/if}

</div>
