$(document).ready(function() {

    document.querySelectorAll('.safeUniqNames').forEach(el => {
        let uniqName = el.value;

        function loadStats() {
            $.ajax({
                url: "engine/ajax/lib/pWidgetStatistics/p_widget_statistics.php",
                type: "POST",
                data: { uniq_name: uniqName },
                success: function(response) {
                    let html = "";
                    var data = JSON.parse(response);
                    data = Array.isArray(data) ? data : Object.values(data);

                    if (data) {
                        data.forEach(function(item) {
                            html += `<tr class="animate__animated animate__fadeIn">
                                    <td class="ps-4">
                                        <div class="d-flex align-items-center gap-2">
                                            <img src="https://flagcdn.com/28x21/${item.iso.toLowerCase()}.png"
                                                 class="flag-img rounded-2">
                                            <span>${item.country}</span>
                                        </div>
                                    </td>
                                    <td class="pe-4 text-end">
                                        <span style="font-size: 15px" class="badge bg-primary-soft text-primary fw-semibold">${item.total_payments}</span>
                                    </td>
                                </tr>`;
                        });
                    } else {
                        html = `<tr>
                                <td colspan="2" class="text-center py-4">
                                    <div class="d-flex flex-column align-items-center gap-2 text-muted">
                                        <svg class="bi" width="32" height="32" fill="currentColor">
                                            <use xlink:href="#pie-chart"/>
                                        </svg>
                                        Нет данных для отображения
                                    </div>
                                </td>
                            </tr>`;
                    }

                    $("#stats-table-"+uniqName).html(html);
                },
                error: function() {
                    $("#stats-table-"+uniqName).html(`<tr>
                            <td colspan="2" class="text-center py-4">
                                <div class="text-danger d-flex align-items-center gap-2 justify-content-center">
                                    <svg class="bi flex-shrink-0" width="20" height="20" fill="currentColor">
                                        <use xlink:href="#error-icon"/>
                                    </svg>
                                    Ошибка загрузки данных
                                </div>
                            </td>
                        </tr>`);
                }
            });
        }
        loadStats();


    })

});