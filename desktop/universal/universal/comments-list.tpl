{foreach $comments as $comment}
    <li class="mb-4">
        <div class="comment">
            {if isset($comment.author)}
            <button class="border-0 bg-transparent reply-button float-end text-success" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#replyForm{$comment.id}" 
                    aria-expanded="false" 
                    aria-controls="replyForm{$comment.id}">
                Ответить
            </button>
            <p class="mb-0 d-block">
                <strong>{$comment.author}</strong>
                {if isset($comment.date)}<span class="text-muted"> | {$comment.date}</span>{/if}
            </p>
            {/if}
            {if isset($comment.comment_text)}
                <p>{$comment.comment_text}</p>
            {/if}
        </div>

        {if isset($comment.replies)}
            <ul class="list-unstyled ms-4">
                {include file='main/comments-list.tpl' comments=$comment.replies}
            </ul>
        {/if}

        <div class="collapse mt-2" id="replyForm{$comment.id}">
            {include file='main/add-comment.tpl' entity_id=$entity.id entity_type=$entity_type parent_id=$comment.id}
        </div>
    </li>
{/foreach}