<div class="facebook-slider">
    <h2>{$slider.tittle}</h2>
    <div class="slider-container">
        {foreach from=$posts.data item=post}
            <div class="facebook-post">
                <a href="https://facebook.com/{$post.id}" target="_blank">
                    {if $post.media_type == 'photo'}
                        <img src="{$post.media_url}" alt="Facebook post" class="post-image">
                    {elseif $post.media_type == 'video'}
                        <video controls class="post-video">
                            <source src="{$post.media_url}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    {/if}
                    <div class="post-caption">
                        <p>{$post.message|truncate:150}</p>
                    </div>
                </a>
            </div>
        {/foreach}
    </div>
</div>