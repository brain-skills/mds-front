<table class="table table-bordered diary-grid">
    <thead>
    <tr>
        <th>Предмет</th>
        {foreach $diary.days as $day}
            <th>{$day|date_format:"%d.%m"}</th>
        {/foreach}
    </tr>
    </thead>

    <tbody>
    {foreach $diary.subjects as $subject}
        <tr>
            <td class="fw-bold">{$subject}</td>

            {foreach $diary.days as $day}
                {assign var=cell value=$diary.map[$subject][$day]|default:null}

                <td class="grade-cell
                        {if !$readonly} clickable {/if}"
                        {if !$readonly}
                            data-subject="{$subject}"
                            data-day="{$day}"
                        {/if}
                >
                    {if $cell}
                        {$cell.grade}
                    {/if}
                </td>
            {/foreach}
        </tr>
    {/foreach}
    </tbody>
</table>
