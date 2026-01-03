{block name="pagination"}
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <!-- Button "Previous" -->
      {if $currentPage > 1}
        <li class="page-item"><a class="page-link" href="?page={$currentPage-1}" aria-label="Previous">Previous</a></li>
      {else}
        <li class="page-item disabled"><span class="page-link">Previous</span></li>
      {/if}
      {foreach $pagination as $page}
        <li class="page-item {$page.class}"><a class="page-link" href="?page={$page.number}">{$page.label}</a></li>
      {/foreach}
      <!-- Button "Next" -->
      {if $currentPage < $totalPages}
        <li class="page-item"><a class="page-link" href="?page={$currentPage+1}" aria-label="Next">Next</a></li>
      {else}
        <li class="page-item disabled"><span class="page-link">Next</span></li>
      {/if}
    </ul>
  </nav>
{/block}