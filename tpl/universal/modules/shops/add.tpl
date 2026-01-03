<link rel="stylesheet" href="{$stheme}/css/view-access-control.css">
<link href="engine/editor/summernote/summernote-bs4.css" rel="stylesheet">


{if $access['modules.create'] || $user.name == 'Demo profile'}
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    {if isset($error_message) && $error_message}
        <div class="col-12">
            <div class="alert alert-danger">{$error_message}</div>
        </div>
    {/if}

    <div class="col-12">
        <form method="POST" enctype="multipart/form-data">

            <!-- =================== ТАБЫ =================== -->
            <div class="row">
                <div class="col-12">
                    <ul class="nav nav-tabs mb-2" id="couponTabs" role="tablist">

                        <li class="nav-item">
                            <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-main" type="button">
                                Основное
                            </button>
                        </li>

                        <li class="nav-item">
                            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-seo" type="button">
                                SEO
                            </button>
                        </li>

                    </ul>


                    <!-- =================== ТАБЫ КОНТЕНТ =================== -->
                    <div class="tab-content">

                        <!-- =================== ОСНОВНОЕ =================== -->
                        <div class="tab-pane fade active show" id="tab-main">
                            <div class="row">

                                <!-- ЛЕВАЯ КОЛОНКА -->
                                <div class="col-6">

                                    <div class="mb-3">
                                        <label class="form-label">Название магазина *</label>
                                        <input type="text" name="shop_name" class="form-control" required>
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label">Slug (URL) *</label>
                                        <input type="text" name="slug" class="form-control" required>
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label">Локация магазина</label>

                                        <div id="map" style="height: 300px; border-radius: 8px; border: 1px solid #ddd;"></div>

                                        <input type="hidden" name="location_lat" id="location_lat">
                                        <input type="hidden" name="location_lng" id="location_lng">

                                        <small class="text-muted">Кликни по карте — координаты запишутся</small>
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label">Адрес (определяется автоматически)</label>
                                        <input type="text" name="location_address" id="location_address" class="form-control" readonly>
                                    </div>

                                </div>

                                <div class="col-6">
                                    <select class="form-select array-select form-control mt-2 mb-2 h142" name="category[]" id="category" multiple>
                                        <option selected disabled value="">- Категория -</option>
                                        {foreach from=$categories item=category}
                                            {if $category.parentid == 0}
                                                <option value="{$category.id}" style="font-weight: bold;">{$category.name}</option>
                                                {foreach from=$categories item=subcategory}
                                                    {if $subcategory.parentid == $category.id}
                                                        <option value="{$subcategory.id}">{$subcategory.name}</option>
                                                    {/if}
                                                {/foreach}
                                            {/if}
                                        {/foreach}
                                    </select>
                                    <div class="col-12 mt-3">
                                        <h6>Изображения магазина:</h6>
                                        <input type="file" id="shop_images" name="shop_images[]" multiple accept="image/*" class="form-control mb-2">
                                        <input type="hidden" name="is_main_image" id="is_main_image_input">

                                        <div id="images_preview" class="d-flex flex-wrap gap-2"></div>
                                    </div>
                                    <div class="col-12 mt-3">
                                        <h6>Видео магазина:</h6>
                                        <input type="file" id="shop_videos" name="shop_videos[]" multiple accept="video/*" class="form-control mb-2">

                                        <div id="videos_preview" class="d-flex flex-wrap gap-2"></div>
                                    </div>

                                </div>

                            </div>
                        </div>



                        <!-- =================== SEO =================== -->
                        <div class="tab-pane fade" id="tab-seo">

                            <fieldset class="form-icon-group left-icon position-relative">
                                <input type="text" name="meta_keys" class="form-control mt-2 mb-2" placeholder="Meta keywords">
                                <div class="form-icon position-absolute"><svg ...></svg></div>
                            </fieldset>

                            <fieldset class="form-icon-group left-icon position-relative">
                                <input type="text" name="meta_desc" class="form-control mt-2 mb-2" placeholder="Meta description">
                                <div class="form-icon position-absolute"><svg ...></svg></div>
                            </fieldset>

                        </div>

                    </div> <!-- end tabs -->

                </div>


                <!-- =================== ТЕКСТОВЫЕ ПОЛЯ =================== -->
                <div class="col-12">
                    <h6 class="mt-2">Описание:</h6>
                    <textarea id="short_desc" name="description"></textarea>
                </div>

                <!-- =================== ДОПОЛНИТЕЛЬНЫЕ ПОЛЯ =================== -->
                <div class="row">
                    {foreach from=$fields item=field key=index}
                        <div class="col-12 col-md-4 mt-3">
                            <label>{$lang.fields.coupons[$index]}</label>
                            <input type="text" class="form-control" name="x_value[{$index}]">
                            <input type="hidden" name="field_ids[]" value="{$index}">
                        </div>
                    {/foreach}
                </div>

                <!-- =================== SUBMIT =================== -->
                <div class="col-3">
                    <button type="submit" name="addshop" class="btn btn-success mt-2 mb-2">
                        Добавить
                    </button>
                </div>

                <input type="hidden" name="folder" value="coupons">
                <input type="hidden" name="p_id" value="{$page_id}">
            </div>

        </form>
    </div>
    <script src="{$theme}/assets/js/modules_summernote.js"></script>
    <script src="engine/editor/summernote/summernote-bs4.js"></script>

{literal}
    <script>
        let map = L.map('map').setView([40.1772, 44.50349], 13); // Ереван
        let marker = null;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        map.on('click', async function (e) {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;

            // Записываем координаты в скрытые инпуты
            document.getElementById("location_lat").value = lat;
            document.getElementById("location_lng").value = lng;

            // Ставим маркер
            if (marker) {
                marker.setLatLng(e.latlng);
            } else {
                marker = L.marker(e.latlng).addTo(map);
            }

            // Достаём адрес с Nominatim
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ru`;

            try {
                const response = await fetch(url, {
                    headers: { "User-Agent": "YourAppName/1.0" }
                });
                const data = await response.json();

                if (data && data.display_name) {
                    document.getElementById("location_address").value = data.display_name;
                } else {
                    document.getElementById("location_address").value = "Адрес не найден";
                }

            } catch (err) {
                document.getElementById("location_address").value = "Ошибка получения адреса";
            }
        });

        const imagesInput = document.getElementById('shop_images');
        const imagesPreview = document.getElementById('images_preview');

        let imagesData = [];

        imagesInput.addEventListener('change', (e) => {
            imagesData = Array.from(e.target.files);
            renderImages();
        });

        function renderImages() {
            imagesPreview.innerHTML = '';
            imagesData.forEach((file, idx) => {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    const div = document.createElement('div');
                    div.style.position = 'relative';
                    div.style.width = '100px';
                    div.style.height = '100px';
                    div.style.border = '1px solid #ddd';
                    div.style.borderRadius = '8px';
                    div.style.overflow = 'hidden';
                    div.style.cursor = 'pointer';

                    div.innerHTML = `
                <img src="${ev.target.result}" style="width:100%; height:100%; object-fit:cover;">
                <input type="radio" name="is_main_image" value="${idx}" style="position:absolute; top:5px; left:5px;">
                <button type="button" style="position:absolute; top:5px; right:5px; background:red; border:none; color:white; border-radius:50%;">×</button>
            `;

                    // Удаление
                    div.querySelector('button').addEventListener('click', () => {
                        imagesData.splice(idx, 1);
                        renderImages();
                    });

                    imagesPreview.appendChild(div);
                };
                reader.readAsDataURL(file);
            });
        }

        const videosInput = document.getElementById('shop_videos');
        const videosPreview = document.getElementById('videos_preview');

        let videosData = [];

        videosInput.addEventListener('change', (e) => {
            videosData = Array.from(e.target.files);
            renderVideos();
        });

        function renderVideos() {
            videosPreview.innerHTML = '';
            videosData.forEach((file, idx) => {
                const div = document.createElement('div');
                div.style.position = 'relative';
                div.style.width = '150px';
                div.style.height = '100px';
                div.style.border = '1px solid #ddd';
                div.style.borderRadius = '8px';
                div.style.overflow = 'hidden';

                const videoURL = URL.createObjectURL(file);
                div.innerHTML = `
            <video src="${videoURL}" style="width:100%; height:100%; object-fit:cover;" muted></video>
            <button type="button" style="position:absolute; top:5px; right:5px; background:red; border:none; color:white; border-radius:50%;">×</button>
        `;

                // Удаление
                div.querySelector('button').addEventListener('click', () => {
                    videosData.splice(idx, 1);
                    renderVideos();
                });

                videosPreview.appendChild(div);
            });
        }

        document.querySelector('form').addEventListener('submit', () => {
            document.getElementById('is_main_image_input').value = mainIndex;
        });
    </script>
{/literal}
{/if}
