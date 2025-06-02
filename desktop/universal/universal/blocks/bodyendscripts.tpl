<script>
    // Function to open the modal and load content
    function ptcModal(title, content) {
        document.getElementById("modalTitle").textContent = title;
        document.getElementById("modalBody").innerHTML = content;
        $('#ptcModal').modal('show'); // Открыть модальное окно
    }

    // Event listeners for buttons
    document.getElementById("openPolicy").addEventListener("click", function() {
        ptcModal("{$lang.header.policy}", document.getElementById("policyContent").innerHTML);
    });
    document.getElementById("openTerms").addEventListener("click", function() {
        ptcModal("{$lang.header.terms}", document.getElementById("termsContent").innerHTML);
    });
    document.getElementById("openCookies").addEventListener("click", function() {
        ptcModal("{$lang.header.cookies}", document.getElementById("cookiesContent").innerHTML);
    });

    // Закрыть модальное окно
    $('#closeModal').on('click', function() {
        $('#ptcModal').modal('hide'); // Используем встроенный метод для закрытия окна
    });
</script>
{if isset($homepage)}
    <script src="{$stheme}/js/js-typed.js"></script>
    <script>
        let typed = new Typed('#typed', { // Тут id того блока, в которм будет анимация
        stringsElement: '#typed-strings', // Тут id блока из которого берем строки для анимации
        typeSpeed: 5, // Скорость печати
        startDelay: 2000, // Задержка перед стартом анимации
        backSpeed: 15, // Скорость удаления
    	backDelay: 3000, // Пауза перед удалением
        loop: true // Указываем, повторять ли анимацию
        });
    </script>
{/if}