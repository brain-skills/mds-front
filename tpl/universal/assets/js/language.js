document.addEventListener('DOMContentLoaded', function () {
    const languageLocationForm = document.getElementById('languageLocationForm');
    const displayedLanguageButton = document.getElementById('displayedLanguageButton');
    const displayedLocationButton = document.getElementById('displayedLocationButton');
    const displayedCurrencyButton = document.getElementById('displayedCurrencyButton');
    const selectedLanguageInput = document.getElementById('selectedLanguageInput');
    const selectedLocationInput = document.getElementById('selectedLocationInput');
    const selectedCurrencyInput = document.getElementById('selectedCurrencyInput');

    let locationId;

    $('#displayedLocationButton').click(function(e) {
        e.stopPropagation();
        $('#locationList').slideToggle(150);
    });

    $(document).click(function() {
        $('#locationList').slideUp(150);
    });

    $('#locationList').on('click', '.toggle-btn', function(e) {
        e.stopPropagation();
        const $children = $(this).siblings('.children');

        if ($children.length > 0) {
            $children.slideToggle(150);
            $(this).find('.arrow').toggleClass('down');
        }

        const text = $(this).clone().children().remove().end().text().trim();
        $('#displayedLocationButton').contents().first()[0].textContent = text;

        locationId = $(this).parent().data('id');
        $('#location-selected').val(locationId);

    });

    $.ajax({
        url: '/engine/ajax/lib/locationsControl/getSavedLocation.php',
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            updateSelection(response.s_lang, displayedLanguageButton, selectedLanguageInput);
            if (response.s_location !== null) {
                updateSelection(response.s_location, displayedLocationButton, selectedLocationInput);
            }
            updateSelection(response.s_currency, displayedCurrencyButton, selectedCurrencyInput);

        },
        error: function(xhr) {
            alert(window.chatLang.error_in_send_report);
        }
    });

    function updateSelection(value, buttonElement, inputElement) {
        buttonElement.innerHTML = `${value} <span class="ms-2">&#9662;</span>`;
        inputElement.value = value;
    }

    document.getElementById('languageList').addEventListener('click', function (e) {
        const btn = e.target.closest('.ll-lang-btn');
        if (btn) {
            const val = btn.dataset.value;
            updateSelection(val, displayedLanguageButton, selectedLanguageInput);
        }
    });

    document.getElementById('currencyList').addEventListener('click', function (e) {
        const btn = e.target.closest('.ll-currency-btn');
        if (btn) {
            const val = btn.dataset.value;
            updateSelection(val, displayedCurrencyButton, selectedCurrencyInput);
        }
    });

    document.getElementById('languageLocationModal').addEventListener('show.bs.modal', function () {
        $.ajax({
            url: '/engine/ajax/lib/locationsControl/getSavedLocation.php',
            type: 'POST',
            dataType: 'json',
            success: function(response) {
                updateSelection(response.s_lang, displayedLanguageButton, selectedLanguageInput);
                if (response.s_location !== null) {
                    updateSelection(response.s_location, displayedLocationButton, selectedLocationInput);
                }
                updateSelection(response.s_currency, displayedCurrencyButton, selectedCurrencyInput);

            },
            error: function(xhr) {
                alert(window.chatLang.error_in_send_report);
            }
        });


        this.style.paddingRight = '0px';
        const dialog = this.querySelector('.modal-dialog');
        if (dialog) dialog.style.paddingRight = '0px';
        const content = this.querySelector('.modal-content');
        if (content) content.style.paddingRight = '0px';
    });

    languageLocationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        $.ajax({
            url: '/engine/ajax/lib/locationsControl/saveUserLocCurLang.php',
            type: 'POST',
            data: {
                lang: selectedLanguageInput.value,
                currency: selectedCurrencyInput.value,
                locationId: locationId
            },
            dataType: 'json',
            success: function(response) {
                window.location.reload();
            },
            error: function(xhr) {
                alert(window.chatLang.error_in_send_report);
            }
        });

        const modalEl = document.getElementById('languageLocationModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
    });
});
