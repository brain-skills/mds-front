$(document).ready(function() {
    let currentStep = 1;
    const totalSteps = $('.step').length;

    document.getElementById("global-spinner").classList.add("hidden");

    let installationData = {
        siteSettings: {},
        databaseSettings: {},
        adminSettings: {}
    };

    function updateProgress() {
        const progress = (currentStep / totalSteps) * 100;
        $('.progress').css('width', progress + '%');
    }

    function validateStep(step) {
        let isValid = true;
        $(`.step[data-step="${step}"] input`).each(function() {
            if (!$(this).val().trim() && $(this).prop('required')) {
                isValid = false;
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        });

        if (step === 1) {
            const siteName = $('#siteName').val();

            if (siteName === "") {
                $("#settingsErrorBlock").removeAttr("hidden").html("Site name required");
            } else {
                $("#settingsErrorBlock").attr("hidden", "hidden");

            }
        }

        // Дополнительные проверки для шага 3
        if (step === 3) {
            const pass = $('#adminPass').val();
            const passConfirm = $('#adminPassConfirm').val();

            if (pass !== passConfirm) {
                isValid = false;
                $('#adminPass, #adminPassConfirm').addClass('error');
                alert('Пароли не совпадают!');
            } else {
                /*registerAdmin().then(isValid => {
                    debugger;
                    if (isValid) {
                        debugger;
                    } else {
                        return false;
                    }
                });*/
            }
        }

        if (isValid) {
            saveStepData(step);
        }

        if (step === 2) {
            validateDatabase().then(isValid => {
                if (isValid) {
                    currentStep = 3;
                    showStep(3);
                } else {
                    return false;
                }
            });
        } else {
            return isValid;
        }
    }

    function validateDatabase() {
        document.getElementById("global-spinner").classList.remove("hidden");

        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'engine/ajax/lib/installCMS/validateDB.php',
                method: 'POST',
                data: installationData.databaseSettings,
                success: function(response) {
                    document.getElementById("global-spinner").classList.add("hidden");

                    if (response === '1') {
                        $("#dbErrorBlock").attr("hidden", "hidden");
                        resolve(true);
                    } else {
                        $("#dbErrorBlock").removeAttr("hidden").html(response);
                        resolve(false);
                    }
                },
                error: function() {
                    document.getElementById("global-spinner").classList.add("hidden");

                    alert('Ошибка установки!');
                    reject(false);
                }
            });
        });
    }

    function registerAdmin() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'engine/ajax/lib/installCMS/createAdmin.php',
                method: 'POST',
                data: installationData.adminSettings,
                success: function(response) {
                    if (response === '1') {
                        $("#adminErrorBlock").attr("hidden", "hidden");
                        resolve(true);
                    } else {
                        $("#adminErrorBlock").removeAttr("hidden").html(response);
                        resolve(false);
                    }
                },
                error: function() {
                    alert('Ошибка установки!');
                    reject(false);
                }
            });
        });
    }

    function showConfirmationData() {
        const { siteSettings, databaseSettings, adminSettings } = installationData;

        $('#confirmSiteName').text(siteSettings.siteName);
        $('#confirmLanguage').text(siteSettings.language);
        $('#confirmCurrency').text(siteSettings.currency);

        $('#confirmDbHost').text(databaseSettings.dbHost);
        $('#confirmDbUser').text(databaseSettings.dbUser);
        $('#confirmDbName').text(databaseSettings.dbName);

        $('#confirmAdminEmail').text(adminSettings.adminEmail);
    }

    function showStep(step) {
        $('.step').removeClass('active');
        $(`.step[data-step="${step}"]`).addClass('active');
        updateProgress();

        $('.btn-prev').prop('disabled', step === 1);
        $('.btn-next').text(step === totalSteps ? 'Установить' : 'Далее');

        // Обновить индикатор шагов
        $('.step-item').removeClass('active completed');

        $('.step-item').each(function() {
            const itemStep = parseInt($(this).data('step'));
            if(itemStep === step) {
                $(this).addClass('active');
            } else if(itemStep < step) {
                $(this).addClass('completed');
            }
        });

        if (step === 4) {
            showConfirmationData();
        }
    }
    showStep(currentStep);


    $('.btn-next').click(function() {
        if (!validateStep(currentStep)) return;

        if (currentStep === totalSteps) {
            document.getElementById("global-spinner").classList.remove("hidden");

            // Отправка данных
            const formData = {
                siteName: $('#siteName').val(),
                dbHost: $('#dbHost').val(),
                dbUser: $('#dbUser').val(),
                dbPass: $('#dbPass').val(),
                dbName: $('#dbName').val(),
                adminEmail: $('#adminEmail').val(),
                adminPass: $('#adminPass').val(),
                siteLanguage: $('#siteLanguage').val(),
                siteCurrency: $('#siteCurrency').val(),
                dbType: $("#dbType").val()
            };

            // AJAX запрос для установки
            $.ajax({
                url: 'engine/ajax/lib/installCMS/installCMS.php',
                method: 'POST',
                data: formData,
                success: function(response) {
                    document.getElementById("global-spinner").classList.add("hidden");
                    window.location.href = "/"
                },
                error: function() {
                    document.getElementById("global-spinner").classList.add("hidden");
                }
            });
            return;
        }

        currentStep++;
        showStep(currentStep);
    });

    $('.btn-prev').click(function() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    function saveStepData(step) {
        switch(step) {
            case 1:
                installationData.siteSettings = {
                    siteName: $('#siteName').val(),
                    language: $('#siteLanguage').val(),
                    currency: $('#siteCurrency').val()
                };
                break;

            case 2:
                installationData.databaseSettings = {
                    dbHost: $('#dbHost').val(),
                    dbUser: $('#dbUser').val(),
                    dbPass: $('#dbPass').val(),
                    dbName: $('#dbName').val(),
                    dbType: $('#dbType').val()
                };
                break;

            case 3:
                installationData.adminSettings = {
                    adminEmail: $('#adminEmail').val(),
                    adminPass: $('#adminPass').val()
                };
                break;
        }
    }


    // Инициализация
    updateProgress();
});