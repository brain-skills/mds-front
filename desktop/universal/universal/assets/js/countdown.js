// Таймер обратного отсчёта
document.addEventListener("DOMContentLoaded", function() {
  // Находим все элементы с классом "countdown"
  const countdownElements = document.querySelectorAll(".countdown");
  countdownElements.forEach(function(countdownElement) {
    // Получаем строку с конечной датой из атрибута data-end-time
    let endTimeString = countdownElement.getAttribute("data-end-time");
    // Преобразуем формат с "MM/DD/YYYY - HH:MM:SS" в "MM/DD/YYYY HH:MM:SS"
    endTimeString = endTimeString.replace(" - ", " ");
    // Преобразуем строку в дату
    const countdownDate = new Date(endTimeString).getTime();
    // Функция для обновления таймера
    function updateCountdown() {
      // Определяем текущее время
      const now = new Date().getTime();
      // Вычисляем оставшееся время
      const timeLeft = countdownDate - now;
      // Локальные переменные для вычислений времени
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      // Локальные переменные для обновления элементов DOM
      const daysElement = countdownElement.querySelector(".days");
      const hoursElement = countdownElement.querySelector(".hours");
      const minutesElement = countdownElement.querySelector(".minutes");
      const secondsElement = countdownElement.querySelector(".seconds");
      // Обновляем значения на странице
      if (daysElement && hoursElement && minutesElement && secondsElement) {
        daysElement.innerHTML = days.toString().padStart(2, "0");
        hoursElement.innerHTML = hours.toString().padStart(2, "0");
        minutesElement.innerHTML = minutes.toString().padStart(2, "0");
        secondsElement.innerHTML = seconds.toString().padStart(2, "0");
      }
      // Останавливаем таймер, если дата достигнута
      if (timeLeft < 0) {
        clearInterval(countdownFunction);
        countdownElement.innerHTML = "EXPIRED";
      }
    }
    // Запускаем интервал для обновления каждую секунду
    const countdownFunction = setInterval(updateCountdown, 1000);
    // Немедленно запускаем обновление таймера при загрузке
    updateCountdown();
  });
});