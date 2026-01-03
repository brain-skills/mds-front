<li class="tree-item" data-id="{$item.id}">
    {assign var="children" value=[]}
    {foreach $all as $child}
        {if $child.parent_id == $item.id}
            {$children[] = $child}
        {/if}
    {/foreach}

    <button type="button" class="dropdown-item d-flex align-items-center p-2 {if $children}toggle{/if}">
        {$item.name}
    </button>

    {if $children}
        <ul class="children ps-3">
            {foreach $children as $child}
                {include file="location_item.tpl" item=$child all=$all}
            {/foreach}
        </ul>
    {/if}
</li>
