$(document).ready(function() {
    let showTypeName = $("#showTypeName").val();
    let prefix = $("#prefix").val();

    document.querySelectorAll('.counterUniqName').forEach(el => {
        const uniqName = el.value;

        $.ajax({
            url: '/engine/ajax/lib/counter/counter_widget.php',
            type: 'POST',
            data: {
                uniq_name: uniqName,
                showTypeName: showTypeName,
                prefix: prefix,
            },
            success: function (response) {
                $("#"+uniqName+"-counter-text").html(response);
            },
            error: function (xhr, status, error) {
                console.error('Ошибка:', error);
            }
        });

    });

});

