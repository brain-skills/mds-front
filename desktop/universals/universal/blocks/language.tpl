<li class="nav-item">
    <form method="post">
        <input type="hidden" name="unique_form_id" value="language_selection_form">
        <input type="hidden" name="current_url" value="{$current_url}">
        <div class="dropdown langlist">
            <button class="btn dropdown-toggle" type="button" id="languageDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <!-- Отображение текущего выбранного языка с флагом -->
                <img src="{$engine}/lang/{$current_lang}/icon.png" alt="{$current_lang} flag" style="width:20px; height:20px;" title="{$current_lang}">
            </button>
            <ul class="dropdown-menu dropdown-menu-end p-xl-2 shadow rounded-2" aria-labelledby="languageDropdown">
                {foreach from=$available_languages item=language}
                    <li>
                        <button class="dropdown-item" type="submit" name="lang" value="{$language}">
                            <img src="{$engine}/lang/{$language}/icon.png" alt="{$language} flag" style="width:20px; height:20px; margin-right:10px;">
                            {$language}
                        </button>
                    </li>
                {/foreach}
            </ul>
        </div>
    </form>
</li>