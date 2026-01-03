{if $error_message}
    <div class="alert alert-danger" role="alert">
        {$error_message}
    </div>
{/if}

{if $success_message}
    <div class="alert alert-success" role="alert">
        {$success_message}
    </div>
{/if}

{if !$hideRegistrationForm}
    <form id="registration-form" method="POST" class="needs-validation" novalidate enctype="multipart/form-data">
        <input type="hidden" name="form_token" value="{$form_token}">
        <input type="hidden" name="selected_role" id="selected_role" value="User">

        <!-- Role selector -->
        <div>
            <label for="roleSelector" class="form-label">Выберите Роль:</label>
            <select id="roleSelector" class="form-select">
                <option value="Company">Company</option>
                <option value="Creator">Creator</option>
                <option value="SelfEmployer">SelfEmployer</option>
                <option value="User" selected>User</option>
            </select>
        </div>

        <!-- Company type (for Company role only) -->
        <div class="mb-3 mt-3" id="companyTypeWrapper" style="display: none;">
            <label for="company_type" class="mb-2">Company Type:</label>
            <select name="company_type" id="company_type" class="form-control">
                <option value="single" selected>Single Location</option>
                <option value="business">Business Network</option>
            </select>
        </div>

        <!-- Role-specific forms -->
        <div class="role-form" id="Company" style="display: none;">
            <div id="company_single">
                {include file="templates/registration/SingleLocationWizard.tpl"}
            </div>
            <div id="company_business" style="display: none;">
                {include file="templates/registration/BusinessNetworkWizard.tpl"}
            </div>
        </div>

        <div class="role-form" id="Creator" style="display: none;">
            {include file="templates/registration/CreatorWizard.tpl"}
        </div>

        <div class="role-form" id="SelfEmployer" style="display: none;">
            {include file="templates/registration/SelfEmployer.tpl"}
        </div>

        <div class="role-form" id="User" style="display: block;">
            {include file="templates/registration/UserWizard.tpl"}
        </div>
    </form>

    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/jquery.validate.min.js"></script>
    <script src="/templates/universal/assets/js/registration_block.js"></script>

{/if}