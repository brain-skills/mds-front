<li class="dropdown d-md-inline-flex user position-relative">
    <a class="dropdown-toggle {if !isset($user_authenticated) || !$user_authenticated}dropdown-avatar{/if} gray-6 d-flex text-decoration-none align-items-center lh-sm p-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
        <img 
            class="rounded-2 shadow-sm" 
            src="{$avatar}" 
            alt="avatar" 
            data-bs-toggle="tooltip" 
            data-bs-placement="top" 
            title="{if isset($user_authenticated) && $user_authenticated}{$user_name|escape}{else}User Info{/if}">
    </a>

    <div class="auth dropdown-menu dropdown-menu-end shadow-lg p-xl-2 p-sm-3 p-2 rounded-3 
        {if isset($user_authenticated) && $user_authenticated}authenticated{/if}" id="authDropdown">

        {if isset($user_authenticated) && $user_authenticated}
            <div class="bg-body p-3 rounded-3">
                <h4 class="mb-1 title-font fw-bold">{$user_name}</h4>
                <p class="small text-muted mb-2"><b>{$lang.header.email}:</b> {$user_email}</p>
                <p class="small text-muted mb-0"><b>{$lang.header.group}:</b> {$group_name}</p>
            </div>
            <ul class="list-unstyled">
                {if $access['mna.create']}<a class="dropdown-item rounded-2 py-2 px-3 fw-medium" href="/admin">{$lang.header.control_panel}</a>{/if}
                <li><a class="dropdown-item rounded-2 py-2 px-3 fw-medium" href="/pm">Сообщения</a></li>
                <li class="dropdown-divider my-2"></li>
            </ul>
            {if !empty($rulesForAdd)}
                <form method="post" action="/?addObject" class="form-scrollable">
                    <div>
                        <div class="d-flex align-items-center gap-2">
                            <select class="form-select form-select-sm w-75" name="object" aria-label="Select type">
                                {foreach $rulesForAdd as $ruleForAdd}
                                    <option {if $ruleForAdd == $selectedModuleAdd}selected{/if} value="{$ruleForAdd}">{$lang.module_name.$ruleForAdd}</option>
                                {/foreach}
                            </select>
                            <button type="submit" class="btn btn-primary btn-sm fs-6 py-1 px-2 rounded-1">Добавить</button>
                        </div>
                    </div>
                </form>
            {/if}
            <ul class="list-unstyled">
                {if !empty($user) }
                    <a class="dropdown-item rounded-2 py-2 px-3 fw-medium" href="/profile">Мой профиль</a>
              {*      {if $access['grades.view']}
                        <a class="dropdown-item rounded-2 py-2 px-3 fw-medium" href="/profile?action=grades">Успеваемость</a>
                    {/if}*}

                    <a class="dropdown-item rounded-2 py-2 px-3 fw-medium" href="/?myWallet">Кошелек</a>
                {/if}

                {if !empty($user) && $user.group !== 4}
                    {include file="./blocks/support.tpl"}
                {/if}
            </ul>
            <a class="btn py-2 btn-danger w-100 mt-3 rounded-2 fw-bold d-flex align-items-center justify-content-center gap-2" href="#" onclick="logout(event)">
                <img src="{$stheme}/svg/logout.svg" alt="">
                <span>{$lang.header.logout}</span>
            </a>
            <script>
                function logout(event) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', '/engine/logout.php', true);
                    xhr.onload = function () {
                        location.reload();
                    };
                    xhr.send();
                    event.preventDefault();
                }
            </script>
        {else}
            <ul class="nav nav-pills mb-3 d-flex gap-2" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active rounded-2 px-4 py-1 h-6 loginRegBtn" id="pills-sign-in" data-bs-toggle="pill" data-bs-target="#pills-signin" type="button" role="tab" aria-controls="pills-signin" aria-selected="true">{$lang.header.login}</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-2 px-4 py-1 loginRegBtn" id="pills-sign-up" data-bs-toggle="pill" data-bs-target="#pills-signup" type="button" role="tab" aria-controls="pills-signup" aria-selected="false">{$lang.header.create_account}</button>
                </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-signin" role="tabpanel" aria-labelledby="pills-sign-in">
                    {$login}
                </div>
                <div class="registration tab-pane fade" id="pills-signup" role="tabpanel" aria-labelledby="pills-sign-up">
                    {$registration}
                </div>
            </div>
        {/if}

        <div class="mt-3 btn-group w-100 d-flex flex-row rounded-2">
            <a class="btn btn-outline-secondary btn-sm" id="openPolicy">{$lang.header.policy}</a>
            <a class="btn btn-outline-secondary btn-sm" id="openTerms">{$lang.header.terms}</a>
            <a class="btn btn-outline-secondary btn-sm" id="openCookies">{$lang.header.cookies}</a>
        </div>

        <!-- JS: toggle .registration-open based on active tab -->
        <script>
            document.addEventListener('DOMContentLoaded', function () {
                const authDropdown = document.getElementById('authDropdown');
                const signInTab = document.getElementById('pills-sign-in');
                const signUpTab = document.getElementById('pills-sign-up');

                function updateDropdownPosition() {
                    if (signUpTab.classList.contains('active')) {
                        authDropdown.classList.add('registration-open');
                    } else {
                        authDropdown.classList.remove('registration-open');
                    }
                }
                document.addEventListener('DOMContentLoaded', function () {
                    const authDropdown = document.getElementById('authDropdown');
                    const signInTab = document.getElementById('pills-sign-in');
                    const signUpTab = document.getElementById('pills-sign-up');

                    function updateDropdownPosition() {
                        if (signUpTab?.classList.contains('active')) {
                            authDropdown?.classList.add('registration-open');
                        } else {
                            authDropdown?.classList.remove('registration-open');
                        }
                    }

                    if (signInTab && signUpTab) {
                        signInTab.addEventListener('click', updateDropdownPosition);
                        signUpTab.addEventListener('click', updateDropdownPosition);
                    }
                });
            });
        </script>
</li>
<style>
    .loginRegBtn {
        border: 1px solid #0d6efd;
    }
</style>