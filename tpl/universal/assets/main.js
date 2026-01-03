$(document).ready(function () {
    let urlParams = new URLSearchParams(window.location.search);
    let status = urlParams.get("status");
    let widgetStatus = urlParams.get("widgetStatus");
    let registrationStatus = urlParams.get("registrationStatus");

    let message = null;
    let bgColor = null;

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Отправим на сервер через AJAX или hidden input
    fetch('/engine/ajax/lib/timezone/save-timezone.php', {
        method: 'POST',
        body: new URLSearchParams({ timezone: userTimeZone })
    });

    if (widgetStatus === "success" || widgetStatus === "alreadyParticipated" || widgetStatus === "groupError" || widgetStatus === "notLoggedIn") {

        if (widgetStatus === "success") {
            message = "Участие принято";
        } else if (widgetStatus === "alreadyParticipated") {
            message = "Вы уже учавствуете";
        } else if (widgetStatus === "groupError") {
            message = "Вы не соответсвуете группе";
        } else if (widgetStatus === "notLoggedIn") {
            message = "Вы не авторизованы";
        }

        bgColor = widgetStatus === "success" ? "#4CAF50" : "#F44336";

    }

    if (registrationStatus === "success" || registrationStatus === "error") {
        message = registrationStatus === "success" ? "Успешная регистрация!" : "Ошибка регистрации!";
        bgColor = registrationStatus === "success" ? "#4CAF50" : "#F44336";
    }

    if (status === "success" || status === "error") {
        message = status === "success" ? "Платеж прошел успешно!" : "Ошибка платежа!";
        bgColor = status === "success" ? "#4CAF50" : "#F44336";

    }

    if (message !== null && bgColor !== null) {
        let alertBox = $(`
            <div class="custom-alert">${message}</div>
        `);

        $("body").append(alertBox);

        $(".custom-alert").css({
            "position": "fixed",
            "top": "20px",
            "right": "20px",
            "background": bgColor,
            "color": "#fff",
            "padding": "15px 20px",
            "border-radius": "8px",
            "box-shadow": "0px 4px 10px rgba(0,0,0,0.2)",
            "z-index": "9999",
            "font-size": "16px",
            "font-weight": "bold",
            "opacity": "0",
            "transition": "opacity 0.5s ease-in-out"
        });

        setTimeout(() => $(".custom-alert").css("opacity", "1"), 100);

        setTimeout(() => {
            $(".custom-alert").css("opacity", "0");
            setTimeout(() => $(".custom-alert").remove(), 500);
        }, 10000);

        urlParams = new URLSearchParams(window.location.search);
        urlParams.delete("status");
        urlParams.delete("widgetStatus");
        urlParams.delete("registrationStatus");

        let newUrl = window.location.pathname + (urlParams.toString() ? "?" + urlParams.toString() : "") + window.location.hash;
        window.history.replaceState(null, "", newUrl);
    }

});
