{if isset($news_latest_entries) && $news_latest_entries}
	<div class="container px-lg-3 mt-80 rounded-pill">
		
			<div class="card-body pb-2 rounded-pill">
				<div class="swiper mySwiper">
					<div class="swiper-container">
						<div class="swiper-wrapper">
							{foreach $latestNews as $news}
								<div class="swiper-slide rounded-pill">
									<span class="position-absolute float-start badge rounded-pill bg-dark m-1">{$news.date|date_format:"%d-%m-%Y"}</span>
									<img src="../{$news.image}" class="swiper-responsive rounded-3" alt="">
									<div class="title rounded-3">
										<h6><a href="/news/{$news.alt_name}?lang={$news.language}">{$news.title|truncate:25:"..."}</a></h6>
										<!-- <p class="text-light">{$news.short_desc|truncate:48:"..."}</p> -->
									</div>
								</div>
							{/foreach}
						</div>
						<div class="manage-buttons">
							<div class="swiper-button-next"></div>
							<div class="swiper-button-prev"></div>
							<div class="swiper-pagination"></div>
						</div>
					</div>
				</div>
			</div>
		
	</div>
{/if}