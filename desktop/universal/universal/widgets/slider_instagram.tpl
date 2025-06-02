<div class="instagram-slider">
    <h2>{$slider.tittle}</h2>
    <div class="slider-container">
        {foreach from=$posts.data item=post}
            <div class="instagram-post">
                <a href="https://www.instagram.com/p/{$post.id}" target="_blank">
                    <img src="{$post.media_url}" alt="Instagram post" class="post-image">
                    <div class="post-caption">
                        <p>{$post.caption|truncate:150}</p>
                    </div>
                </a>
            </div>
        {/foreach}
    </div>
</div>