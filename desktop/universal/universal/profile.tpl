<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<div class=" mt-4">
    <div class="card shadow-sm p-4 rounded-2">
        <div class="row align-items-center">
            <!-- Аватар и кнопка -->
            <div class="col-md-3 text-center">
                <img id="avatar" src="{$avatar}" class="rounded-circle border shadow-sm" style="width: 120px; height: 120px; object-fit: cover;" alt="">
                <br>
            </div>

            <!-- Основная информация -->
            <div class="col-md-9">
                <div class="row">
                    <div class="col-md-6">
                        <p class="mb-2"><strong>Name:</strong> <span id="name">{$user.name}</span></p>
                        <p class="mb-2"><strong>Email:</strong> <span id="email">{$user.email}</span></p>
                        <p class="mb-2"><strong>Age:</strong> <span id="age">{$user.age}</span></p>
                        <p class="mb-2"><strong>Phone:</strong> <span id="phone">{$user.phone}</span></p>
                        <p class="mb-2"><strong>City:</strong> <span id="city">{$user.city}</span></p>
                    </div>
                    <div class="col-md-6">
                        <p class="mb-2"><strong>Gender:</strong> <span id="gender">{$user.gender}</span></p>
                        <p class="mb-2"><strong>Balance:</strong> <span id="balance">{$balance} {$currency}</span></p>
                        <p class="mb-2"><strong>Followers:</strong> <span id="followers">{$user.followers|default:0}</span></p>
                        <p class="mb-2"><strong>Likes:</strong> <span id="likes">{$user.likes|default:0}</span></p>
        				<p class="fs-6"><strong>Subscription:</strong> {if isset($userSubscription)} {$userSubscription} {if !empty($subscriptionLeftDays) } ({$subscriptionLeftDays}) {/if} {else}  {/if}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Меню секции -->
<nav>
 <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <button class="nav-link active" id="nav-about-me-tab" data-bs-toggle="tab" data-bs-target="#nav-about" type="button" role="tab" aria-controls="nav-home" aria-selected="true">About Me</button>
    <button class="nav-link" id="nav-icomes-tab" data-bs-toggle="tab" data-bs-target="#nav-incomes" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">My Incomes</button>
    <button class="nav-link" id="nav-tasks-tab" data-bs-toggle="tab" data-bs-target="#nav-tasks" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">My Tasks</button>
    <button class="nav-link" id="nav-referall-tab" data-bs-toggle="tab" data-bs-target="#nav-referall" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Referal</button>
    <button class="nav-link" id="nav-messanger-tab" data-bs-toggle="tab" data-bs-target="#nav-messanger" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Messanger</button>
    <button class="nav-link" id="nav-edit-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-edit-profile" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Edit Profile</button>
 </div>
</nav>
<div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="nav-about" role="tabpanel" aria-labelledby="nav-home-tab">
    <div class="p-3 mt-4">
        <p class="fs-6"><strong>Bio:</strong> {$user.bio|escape}</p>
    </div>
  </div>
  <div class="tab-pane fade" id="nav-incomes" role="tabpanel" aria-labelledby="nav-profile-tab">
  	<p>
    	Lorem Ipsum is simply dummy text of
        the printing and typesetting industry. Lorem 
        Ipsum has been the industry's standard dummy text ever since the 
        1500s, when an unknown printer took a galley 
        of type and scrambled it to make a type specimen book.
    </p>
  </div>
  <div class="tab-pane fade" id="nav-tasks" role="tabpanel" aria-labelledby="nav-contact-tab">
   <p>
      Lorem Ipsum is simply dummy text of the printing and
      typesetting industry. Lorem Ipsum has been the 
      industry's standard dummy text ever since the 1500s,
      when an unknown printer took a 
      galley of type and scrambled it to make a type specimen book.
   </p>
  </div>
  <div class="tab-pane fade" id="nav-referall" role="tabpanel" aria-labelledby="nav-contact-tab">
  	    <!-- Блок рефералов -->
    <div class="card shadow-sm p-3 mt-4">
        <p class="fw-bold fs-5">Referral Code: <span class="text-primary">{$referralCode}</span></p>
        <p class="fs-6">Referrals: <span class="text-success fw-bold">{$referralsCount}</span></p>
        <p class="fs-6">Total Bonus: <span class="text-warning fw-bold">{$referralsTotalReward}</span></p>
        <p class="fs-6">Percentage Earnings: <span class="text-warning fw-bold">{$allPercentage}%</span></p>
        <p class="fs-6">
            Last 7 Days Earnings:
            <span class="fw-bold" style="color: {if $percentage_change_7 > 0} #38a169 {else} #e53e3e {/if};">
                {$total_reward_last_7_days} ({$percentage_change_7}%)
            </span>
        </p>
    </div>
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; border-radius: 12px; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); transition: transform 0.3s;">
    <p style="margin: 10px 0; font-size: 18px; font-weight: 600;">
        {$lang.referralsection.refcode}
        <strong style="color: #4299e1;">{$referralCode}</strong>
        <sup>
            <strong style="margin: 10px 0; font-size: 10px; font-weight: 600; color: #718096; cursor: pointer;">
                {if !empty($refSettings) && $refSettings["discount"] > 0 }
                    {if $refSettings["type"] == "percent"}
                        {$lang.referralsection.paypercent} {htmlspecialchars($refSettings["discount"])} %

                        {else}
                        {$lang.referralsection.paybonus} {htmlspecialchars($refSettings["discount"])}

                    {/if}

                    {elseif $config['referral_reward_percentage'] != ''}
                    {$lang.referralsection.paypercent} {htmlspecialchars($config['referral_reward_percentage'])} %

                    {elseif $referralFixSum != 0}
                    {$lang.referralsection.paybonus} {$referralFixSum}

                {/if}

            </strong>
        </sup>
    </p>
    <p style="margin: 0; font-size: 18px; font-weight: 600;">{$lang.referralsection.refcount}
        <strong style="color: #48bb78;">{$referralsCount}</strong>
    </p>
    <p style="margin: 10px 0; font-size: 18px; font-weight: 600;">{$lang.referralsection.allbonsum}
        <strong style="color: #d69e2e;">{$referralsTotalReward}</strong>
    </p>
    <p style="margin: 10px 0; font-size: 18px; font-weight: 600;">{$lang.referralsection.allpercsum}
        <strong style="color: #d69e2e;">{$allPercentage}%</strong>
    </p>
    <p style="margin: 10px 0; font-size: 13px; font-weight: 600;">
        {$lang.referralsection.last7day}
        <strong style="color: #38a169;">
            {$total_reward_last_7_days}
            <sup style="cursor: pointer; transition: transform 0.3s; {if $percentage_change_7 > 0} color: #38a169; {else} color: #e53e3e; {/if}">
                {$percentage_change_7}%
            </sup>
        </strong>
    </p>
    <p style="margin: 10px 0; font-size: 13px; font-weight: 600;">
        {$lang.referralsection.last30day}
        <strong style="color: #38a169;">
            {$total_reward_last_30_days}
            <sup style="cursor: pointer; transition: transform 0.3s; {if $percentage_change_30 > 0} color: #38a169; {else} color: #e53e3e; {/if}">
                {$percentage_change_30}%
            </sup>
        </strong>
    </p>

    <label for="referral-url" style="font-size: 16px; color: #4a5568; display: block; margin-bottom: 5px;">
        {$lang.referralsection.refsys}
    </label>
    <input id="referral-url" class="form-control" style="width: 100%; padding: 12px; font-size: 16px; border: 1px solid rgba(203,213,224,0); border-radius: 8px; outline: none; transition: box-shadow 0.3s;" name="referral-url" disabled value="{$referralUrl}" onfocus="this.style.boxShadow='0 0 10px rgba(66, 153, 225, 0.5)'" onblur="this.style.boxShadow='none'">
    <hr>

    {include file='main/datatable.tpl' tableTitle="{$lang.referralsection.myrefs}"
    theads=["ID", {$lang.widgets.reg_date}, {$lang.widgets.name}, {$lang.widgets.all_sum_count}, {$lang.widgets.percent}, {$lang.widgets.reward_amount}]
    data=$referrals }
</div>
  </div>
  <div class="tab-pane fade" id="nav-messanger" role="tabpanel" aria-labelledby="nav-contact-tab">
  	 <p>
      Lorem Ipsum is simply dummy text of the printing and
      typesetting industry. Lorem Ipsum has been the 
      industry's standard dummy text ever since the 1500s,
      when an unknown printer took a 
      galley of type and scrambled it to make a type specimen book.
   </p>
  </div>
  <div class="tab-pane fade" id="nav-edit-profile" role="tabpanel" aria-labelledby="nav-contact-tab">
  	<p>
      Lorem Ipsum is simply dummy text of the printing and
      typesetting industry. Lorem Ipsum has been the 
      industry's standard dummy text ever since the 1500s,
      when an unknown printer took a 
      galley of type and scrambled it to make a type specimen book.
   </p>
  </div>
</div>
   
</div>

<style>
    .container {
        max-width: 1320px;
    }
    sup:hover {
        color: #2c5282;
        transform: scale(1.1);
    }
</style>
<div class="modal fade" id="editProfileModal" tabindex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editProfileModalLabel">Edit Profile</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="editProfileForm" enctype="multipart/form-data">
                    <input type="hidden" id="user_id" name="user_id" value="{$user.id}" required>

                    <div class="row g-3">
                        <div class="col-md-4">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" name="name" value="{$user.name}" required>
                        </div>
                        <div class="col-md-4">
                            <label for="age" class="form-label">Age</label>
                            <input type="number" class="form-control" id="age" name="age" value="{$user.age}" required>
                        </div>
                        <div class="col-md-4">
                            <label for="gender" class="form-label">Gender</label>
                            <select class="form-select" id="gender" name="gender" required>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div class="row g-3">
                        <div class="col-md-4">
                            <label for="phone" class="form-label">Phone</label>
                            <input type="text" class="form-control" id="phone" name="phone" value="{$user.phone}" required>
                        </div>
                        <div class="col-md-4">
                            <label for="city" class="form-label">City</label>
                            <input type="text" class="form-control" id="city" name="city" value="{$user.city}" required>
                        </div>
                        <div class="col-md-4">
                            <input type="hidden" value="{$user.avatar}" name="user_avatar">
                            <label for="profileImage">Profile avatar</label>
                            <input id="profileImage" value="{$user.avatar}" name="image" type="file" accept="image/*" style="margin-bottom: 10px" />
                            <p id="error" style="color: red; display: none;">Изображение должно быть минимум 300x300 пикселей.</p>

                            <script>
                                document.getElementById("profileImage").addEventListener("change", function(event) {
                                    let file = event.target.files[0];
                                    if (!file) return;

                                    let img = new Image();
                                    img.src = URL.createObjectURL(file);
                                    img.onload = function() {
                                        if (img.width < 300 || img.height < 300) {
                                            document.getElementById("error").style.display = "block";
                                            event.target.value = ""; // Очистка файла
                                        } else {
                                            document.getElementById("error").style.display = "none";
                                        }
                                    };
                                });
                            </script>

                        </div>
                    </div>
                    <div class="row g-3">
                        <div class="col-md-4">
                            <label for="bio" class="form-label">Bio</label>
                            <textarea class="form-control" id="bio" name="bio" rows="3">{$user.bio}</textarea>
                        </div>
                    </div>
                  {*  <div class="row g-3">
                        <div class="col-md-4">
                            <label for="banned" class="form-label">Banned</label>
                            <select class="form-select" id="banned" name="banned" required>
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label for="allowpm" class="form-label">Allow Private Messages</label>
                            <select class="form-select" id="allowpm" name="allowpm" required>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label for="allpm" class="form-label">Receive All Private Messages</label>
                            <select class="form-select" id="allpm" name="allpm" required>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="pmunread" class="form-label">Unread Private Messages</label>
                        <input type="number" class="form-control" id="pmunread" name="pmunread">
                    </div>*}
                    <br>
                    <button type="submit" id="save-user" class="btn btn-primary w-100">Save Changes</button>
                </form>
            </div>
        </div>
    </div>
</div>

<div id="loadingOverlay" class="loading-overlay">
    <div class="spinner"></div>
</div>
<div id="notification-container" class="notification-container"></div>
<style>
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .spinner {
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid #fff;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .notification-container {
        position: fixed;
        top: 10px;
        right: 100px; /* Смещаем контейнер вправо */
        z-index: 1050;
        width: 300px; /* Ширина уведомлений */
    }

    .notification {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 15px;
        margin-bottom: 10px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        animation: fadeIn 0.3s ease;
        color: #fff;
    }

    .notification .close-btn {
        background: none;
        border: none;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
    }

    .notification.error {
        background-color: #e6231e; /* Цвет для ошибок */
    }

    .notification.success {
        background-color: #28a745; /* Цвет для успеха */
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateX(10%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(10%);
        }
    }

</style>

<script>
    $('#editProfileForm').on('submit', function(event) {
        event.preventDefault();

        let formData = new FormData(this);
        let file = $("#profileImage")[0].files[0];

        formData.append("image", file);

        $.ajax({
            url: 'engine/ajax/lib/user/update_user.php',
            type: 'POST',
            dataType: 'json',
            processData: false, // Отключаем обработку данных (важно для файлов!)
            contentType: false, // Отключаем заголовок (браузер сам установит нужный
            data: formData,
            success: function (response) {
                if (response.success) {
                    showNotification("Изменения сохранены", "success", 10000)
                    $("#editProfileModal").modal("hide");
                    $('#avatar').attr('src', response.data.avatar);
                    $('#name').text(response.data.name);
                    $('#email').text(response.data.email);
                    $('#age').text(response.data.age);
                    $('#phone').text(response.data.phone);
                    $('#city').text(response.data.city);
                    $('#gender').text(response.data.gender);
                    $('#balance').text(response.data.balance + ' USD');
                    $('#pay_methods').text(response.data.pay_methods);
                }
            },
            error: function (xhr, status, error) {
                showNotification("Ошибка при обновлении данных пользователя", "error", 10000)
                return;
            }
        });
    });

    function showNotification(message, type, duration) {
        duration = 10000;//(typeof duration === 'undefined') duration = 5000; // Значение по умолчанию
        if (typeof type === 'undefined') type = 'success'; // Значение по умолчанию

        var container = document.getElementById('notification-container');

        // Создаем элемент уведомления
        var notification = document.createElement('div');
        notification.className = 'notification ' + type; // Используем конкатенацию вместо шаблонных строк
        notification.innerHTML =
            '<span>' + message + '</span>' +
            '<button class="close-btn" onclick="this.parentElement.remove()">×</button>';

        container.appendChild(notification);

        // Удаляем уведомление через заданное время
        setTimeout(function () {
            notification.style.animation = 'fadeOut 0.3s ease';
            notification.addEventListener('animationend', function () {
                notification.remove();
            });
        }, duration);
    }
</script>