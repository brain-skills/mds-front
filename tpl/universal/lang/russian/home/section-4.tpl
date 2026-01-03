<div class="container mt-2 text-center">
  <div class="swiper">
    <div class="row mt-1">
      <div class="col-12">
        <div class="swiper-container mySwiper3">
          <div class="swiper-wrapper">

            <div class="swiper-slide">
              <div class="video-wrapper" data-src="https://www.youtube.com/embed/vz854-qau-g?si=yDd2hFF7Dg_nJ8nZ" role="button" tabindex="0" aria-label="Play video 1">
                <img src="https://img.youtube.com/vi/vz854-qau-g/hqdefault.jpg" alt="Video thumbnail 1" loading="lazy" />
                <button class="custom-play-button" aria-hidden="true" tabindex="-1" type="button" aria-label="Play video">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <path d="M8 5v14l11-7z" fill="white"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="video-wrapper" data-src="https://www.youtube.com/embed/z2s2pogllis?si=VBixDG_53SDxC8Y8" role="button" tabindex="0" aria-label="Play video 2">
                <img src="https://img.youtube.com/vi/z2s2pogllis/hqdefault.jpg" alt="Video thumbnail 2" loading="lazy" />
                <button class="custom-play-button" aria-hidden="true" tabindex="-1" type="button" aria-label="Play video">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <path d="M8 5v14l11-7z" fill="white"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="video-wrapper" data-src="https://www.youtube.com/embed/StfGFHP3VtI?si=qODyNlsJdDwVxLla" role="button" tabindex="0" aria-label="Play video 3">
                <img src="https://img.youtube.com/vi/StfGFHP3VtI/hqdefault.jpg" alt="Video thumbnail 3" loading="lazy" />
                <button class="custom-play-button" aria-hidden="true" tabindex="-1" type="button" aria-label="Play video">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <path d="M8 5v14l11-7z" fill="white"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="video-wrapper" data-src="https://www.youtube.com/embed/HTY1HAdytok?si=ZoOD30YREToD_Bal" role="button" tabindex="0" aria-label="Play video 4">
                <img src="https://img.youtube.com/vi/HTY1HAdytok/hqdefault.jpg" alt="Video thumbnail 4" loading="lazy" />
                <button class="custom-play-button" aria-hidden="true" tabindex="-1" type="button" aria-label="Play video">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <path d="M8 5v14l11-7z" fill="white"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="swiper-slide">
              <div class="video-wrapper" data-src="https://www.youtube.com/embed/r4CVRf9iPlE?si=FRseH9P_jZShB7_n" role="button" tabindex="0" aria-label="Play video 5">
                <img src="https://img.youtube.com/vi/r4CVRf9iPlE/hqdefault.jpg" alt="Video thumbnail 5" loading="lazy" />
                <button class="custom-play-button" aria-hidden="true" tabindex="-1" type="button" aria-label="Play video">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <path d="M8 5v14l11-7z" fill="white"/>
                  </svg>
                </button>
              </div>
            </div>

          </div>

          <div class="manage-buttons mb-2">
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  document.querySelectorAll('.video-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', () => {
      if (wrapper.querySelector('iframe')) return;

      const videoSrc = wrapper.getAttribute('data-src');
      const iframe = document.createElement('iframe');

      iframe.setAttribute('src', videoSrc + '&autoplay=1');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', 'true');

      wrapper.innerHTML = '';
      wrapper.appendChild(iframe);
    });

    wrapper.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        wrapper.click();
      }
    });
  });
</script>

<style>
  .video-wrapper {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    height: 0;
    overflow: hidden;
    cursor: pointer;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    background: #000;
  }

  .video-wrapper img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    user-select: none;
    pointer-events: none;
  }

  .custom-play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    background-color:  #ff0000;
    border: none;
    border-radius: 50%;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
  }

  .custom-play-button svg {
    width: 24px;
    height: 24px;
    fill: white;
  }

  .video-wrapper:hover .custom-play-button {
    background-color: #ff0000;
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: 0 0 12px rgba(34, 34, 34, 0.9);
  }

  .video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 8px;
  }
</style>