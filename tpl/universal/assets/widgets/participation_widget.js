$(document).ready(function() {
    document.querySelectorAll('.uniqNameCounter').forEach(el => {
        let uniqName = el.value;

        var participationWidget = ajaxReadWidget();

        function ajaxReadWidget() {
            var participationWidget = [];
            $.ajax({
                url: '/engine/ajax/lib/participation/participation_widget.php',
                type: 'POST',
                data: {
                    uniq_name: uniqName
                },
                success: function (response) {
                    var jsonArray = JSON.parse(response);
                    participationWidget = jsonArray.participationWidget;

                    $("."+uniqName+"-giveaway-title").html(participationWidget.name);
                    $("."+uniqName+"-giveaway-subtitle").html(jsonArray.placesLeftText);
                    $("."+uniqName+"-progress-bar").css("width", jsonArray.progress)

                    if (jsonArray.winnerExists === true) {
                        $("."+uniqName+"-giveaway-button").hide();
                    }

                    let selector = "."+uniqName+"-giveaway-widget";
                    let btn = "."+uniqName+"-giveaway-button";
                    let notice = "."+uniqName+"-giveaway-notice";


                    let color1 = jsonArray.settings.rgb_first;
                    let color2 = jsonArray.settings.rgb_second;

                    if (color1 && color2) {
                        $(selector).css("background", `linear-gradient(to right, ${color1}, ${color2})`);
                    } else {
                        $(selector).css("background", "var(--body-color)");
                    }

                    if (jsonArray.existsParent !== false) {
                        $(btn).attr("disabled", "disabled").css("background", "#808080").css("cursor", "not-allowed");
                        $(notice).html(jsonArray.parentWidgetText);
                    }

                },
                error: function (xhr, status, error) {
                    console.error('Ошибка:', error);
                }
            });

            return participationWidget;
        }


        $("."+uniqName+"-giveaway-button").on('click', function () {
            $.ajax({
                url: '/engine/ajax/lib/participation/participation.php',
                type: 'POST',
                data: {
                    uniq_name: uniqName
                },
                success: function (response) {
                    if (response == "false") {
                        alert("Вы уже участвуете в розыгрыше");
                    } else if (response == "3") {
                        alert("Вы не соответсвуете группе");
                    } else {
                        ajaxReadWidget();
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Ошибка:', error);
                }
            });


        })
    });
});

