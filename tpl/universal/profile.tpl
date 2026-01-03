<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<div class="mt-4">
    <div class="user-profile-card card shadow-sm p-4 rounded-2 bg-blurred-dark">
        <div class="row align-items-center">
            <!-- Avatar and button -->
            <div class="col-md-3 text-center">
                <img id="avatar" src="{$avatar}" class="profile-avatar border shadow-sm" alt="profile avatar">
                <br>
            </div>

            <!-- Main information -->
            <div class="col-md-9 bl">
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
                        <p class="fs-6">
                            <strong>Subscription:</strong>
                            {if isset($userSubscription)}
                                {$userSubscription}
                                {if !empty($subscriptionLeftDays)} ({$subscriptionLeftDays}) {/if}
                            {else}

                            {/if}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Section menu -->
    <nav class="d-flex gap-3">
        <div class="nav nav-tabs border-0 d-flex flex-column align-items-start ps-3 pe-3 gap-2" id="nav-tab" role="tablist" style="border-right: 1px solid #b0b0b0 !important;">
            {if $config['extensions']['grades']['enabled'] == true && $access['grades.view']}
                <button class="btn-tab active text-start w-100"
                        id="nav-grades-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-grades"
                        type="button"
                        role="tab">
                    Успеваемость
                </button>
            {/if}

            {if $config['extensions']['schedules']['enabled'] == true && $access['schedules.view']}
                <button class="btn-tab text-start w-100"
                        id="nav-schedules-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-schedules"
                        type="button"
                        role="tab">
                    Расписания
                </button>
            {/if}

            {if $config['extensions']['student_progress']['enabled'] == true && $access['students_progress.view']}
                <button class="btn-tab text-start w-100"
                        id="nav-students-progress-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-students_progress"
                        type="button"
                        role="tab">
                    Активность
                </button>
            {/if}

            {*<button class="btn-tab text-start w-100" id="nav-about-me-tab" data-bs-toggle="tab" data-bs-target="#nav-shop" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                Магазин
            </button>*}

            <button class="btn-tab text-start w-100" id="nav-about-me-tab" data-bs-toggle="tab" data-bs-target="#nav-about" type="button" role="tab" aria-controls="nav-home" aria-selected="false">
                О себе
            </button>
            <button class="btn-tab text-start w-100" id="nav-icomes-tab" data-bs-toggle="tab" data-bs-target="#nav-incomes" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                Мои Доходы
            </button>
            <button class="btn-tab text-start w-100" id="nav-tasks-tab" data-bs-toggle="tab" data-bs-target="#nav-tasks" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                Мои Задачи
            </button>
            {if $access['referrals.view']}
                <button class="btn-tab text-start w-100" id="nav-referall-tab" data-bs-toggle="tab" data-bs-target="#nav-referall" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                    Рефералы
                </button>
            {/if}
            <button class="btn-tab text-start w-100" id="nav-messanger-tab" data-bs-toggle="tab" data-bs-target="#nav-messanger" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                Мессенджер
            </button>
            <button class="btn-tab text-start w-100" id="nav-edit-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-edit-profile" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                Редактирование
            </button>
        </div>
        <div class="tab-content" style="width: 100%;" id="nav-tabContent">
            {if $config['extensions']['grades']['enabled'] == true && $access['grades.view']}
                {if $group == "Teacher" || $group == "Admin"}
                    <div class="tab-pane fade show active" id="nav-grades" role="tabpanel" aria-labelledby="nav-grades-tab">
                        <div class="user-profile-card p-3 bg-blurred-dark">
                            {include './extensions/education/grades/teacher_grades.tpl'}
                        </div>
                    </div>

                {elseif $group == "Parent" || $group == "Admin"}

                    <div class="tab-pane fade show active" id="nav-grades" role="tabpanel" aria-labelledby="nav-grades-tab">
                        <div class="user-profile-card p-3 bg-blurred-dark">
                            {include './extensions/education/grades/parent_grades.tpl'}
                        </div>
                    </div>
                {/if}
            {/if}

            {if $config['extensions']['schedules']['enabled'] == true && $access['schedules.view']}
                <div class="tab-pane fade show" id="nav-schedules" role="tabpanel" aria-labelledby="nav-schedules-tab">
                    <div class="user-profile-card p-3 bg-blurred-dark">
                        {include './extensions/education/schedules/schedules_grid.tpl'}
                    </div>
                </div>
            {/if}

            {if $config['extensions']['student_progress']['enabled'] == true && $access['students_progress.view']}
                <div class="tab-pane fade show" id="nav-students_progress" role="tabpanel" aria-labelledby="nav-students_progress-tab">
                    <div class="user-profile-card p-3 bg-blurred-dark">
                        {include './extensions/education/students_progress/students_progress.tpl'}
                    </div>
                </div>
            {/if}

            <div class="tab-pane fade show" id="nav-shop" role="tabpanel" aria-labelledby="nav-shop-tab">
                <div class="user-profile-card p-3 bg-blurred-dark">
                    <h1>shop</h1>
                </div>
            </div>

            <!-- About -->
            <div class="tab-pane fade show" id="nav-about" role="tabpanel" aria-labelledby="nav-home-tab">
                <div class="user-profile-card p-3 bg-blurred-dark">
                    <p class="fs-6"><strong>Bio:</strong> {$user.bio|escape}</p>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                        Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                        printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
            </div>

            <!-- Incomes -->
            <div class="user-profile-card bg-blurred-dark p-3 tab-pane fade" id="nav-incomes" role="tabpanel" aria-labelledby="nav-profile-tab">
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a type specimen book.
                </p>
            </div>

            <!-- Tasks -->
            <div class="user-profile-card bg-blurred-dark p-3 tab-pane fade" id="nav-tasks" role="tabpanel" aria-labelledby="nav-contact-tab">
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                    has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                    took a galley of type and scrambled it to make a type specimen book.
                </p>
            </div>
            {if $access['referrals.view']}

                <!-- Referrals -->
                <div class="user-profile-card bg-blurred-dark p-3 tab-pane fade" id="nav-referall" role="tabpanel" aria-labelledby="nav-contact-tab">
                    <!-- Referral summary block -->
                    <div class="card shadow-sm p-3 bg-blurred-dark">
                        <p class="fw-bold fs-5">Referral Code: <span class="text-primary">{$referralCode}</span></p>
                        <p class="fs-6">Referrals: <span class="text-success fw-bold">{$referralsCount}</span></p>
                        <p class="fs-6">Total Bonus: <span class="text-warning fw-bold">{$referralsTotalReward}</span></p>
                        <p class="fs-6">Percentage Earnings: <span class="text-warning fw-bold">{$allPercentage}%</span></p>
                        <p class="fs-6">
                            Last 7 Days Earnings:
                            <span class="fw-bold">
                                {$total_reward_last_7_days} ({$percentage_change_7}%)
                            </span>
                        </p>
                    </div>

                    <div class="bg-blurred-dark" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; border-radius: 12px; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); transition: transform 0.3s;">
                        <p style="margin: 10px 0; font-size: 18px; font-weight: 600;">
                            {$lang.referralsection.refcode}
                            <strong style="color: #4299e1;">{$referralCode}</strong>
                            <sup>
                                <strong style="margin: 10px 0; font-size: 10px; font-weight: 600; color: #718096; cursor: pointer;">
                                    {if !empty($refSettings) && $refSettings["discount"] > 0}
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

                        <p style="margin: 0; font-size: 18px; font-weight: 600;">
                            {$lang.referralsection.refcount} <strong style="color: #48bb78;">{$referralsCount}</strong>
                        </p>
                        <p style="margin: 10px 0; font-size: 18px; font-weight: 600;">
                            {$lang.referralsection.allbonsum} <strong style="color: #d69e2e;">{$referralsTotalReward}</strong>
                        </p>
                        <p style="margin: 10px 0; font-size: 18px; font-weight: 600;">
                            {$lang.referralsection.allpercsum} <strong style="color: #d69e2e;">{$allPercentage}%</strong>
                        </p>
                        <p style="margin: 10px 0; font-size: 13px; font-weight: 600;">
                            {$lang.referralsection.last7day}
                            <strong style="color: #38a169;">
                                {$total_reward_last_7_days}
                                <sup>
                                    {$percentage_change_7}%
                                </sup>
                            </strong>
                        </p>
                        <p style="margin: 10px 0; font-size: 13px; font-weight: 600;">
                            {$lang.referralsection.last30day}
                            <strong style="color: #38a169;">
                                {$total_reward_last_30_days}
                                <sup>
                                    {$percentage_change_30}%
                                </sup>
                            </strong>
                        </p>

                        <label for="referral-url" style="font-size: 16px; color: #4a5568; display: block; margin-bottom: 5px;">
                            {$lang.referralsection.refsys}
                        </label>
                        <input id="referral-url" class="form-control" style="width: 100%; padding: 12px; font-size: 16px; border: 1px solid rgba(203,213,224,0); border-radius: 8px; outline: none; transition: box-shadow 0.3s;"
                               name="referral-url" disabled value="{$referralUrl}"
                               onfocus="this.style.boxShadow='0 0 10px rgba(66, 153, 225, 0.5)'"
                               onblur="this.style.boxShadow='none'">
                        <hr>

                        {include file='main/datatable.tpl'
                        tableTitle="{$lang.referralsection.myrefs}"
                        theads=["ID", {$lang.widgets.reg_date}, {$lang.widgets.name}, {$lang.widgets.all_sum_count}, {$lang.widgets.percent}, {$lang.widgets.reward_amount}]
                        data=$referrals}
                    </div>
                </div>

            {/if}
            <!-- Messenger -->
            <div class="user-profile-card bg-blurred-dark p-3 tab-pane fade" id="nav-messanger" role="tabpanel" aria-labelledby="nav-contact-tab">
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                    scrambled it to make a type specimen book.
                </p>
            </div>

            <!-- Edit Profile -->
            <div class="user-profile-card bg-blurred-dark p-3 tab-pane fade" id="nav-edit-profile" role="tabpanel" aria-labelledby="nav-contact-tab">
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                    scrambled it to make a type specimen book.
                </p>
            </div>
        </div>
    </nav>
</div>
<!-- Edit Profile Modal -->
<div class="modal fade" id="editProfileModal" tabindex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editProfileModalLabel">Edit Profile</h5>
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
                            <input id="profileImage" name="image" type="file" accept="image/*" style="margin-bottom: 10px" />
                            <p id="error" style="color: red; display: none;">Изображение должно быть минимум 300x300 пикселей.</p>
                        </div>
                    </div>

                    <div class="row g-3">
                        <div class="col-md-12">
                            <label for="bio" class="form-label">Bio</label>
                            <textarea class="form-control" id="bio" name="bio" rows="3">{$user.bio}</textarea>
                        </div>
                    </div>

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

<script src="{$theme}/assets/js/custom.js"></script>