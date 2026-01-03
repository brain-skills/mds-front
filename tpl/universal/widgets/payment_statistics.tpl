{if !isset($uniqNames) }
    <p class="alert alert-danger text-center mt-3">Ошибка: При include() шаблона uniqName обязателен</p>
{else}
    {$safeUniqNames = preg_replace('/[^a-zA-Z0-9_]/', '_', $uniqNames)}

    <div class="col-6">
        <div class="card shadow-lg border-0 rounded-xxl overflow-hidden bg-glass">
            <div class="card-header bg-transparent py-3 border-bottom">
                <h4 class="d-flex align-items-center gap-2 mb-0">
                    <svg class="bi flex-shrink-0" width="24" height="24" fill="currentColor">
                        <use xlink:href="#pie-chart"/>
                    </svg>
                    Статистика платежей
                </h4>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive rounded-xl">
                    <table class="table table-borderless mb-0">
                        <thead class="text-secondary bg-light">
                        <tr>
                            <th class="ps-4 fw-normal">Страна</th>
                            <th class="pe-4 fw-normal text-end">Платежи</th>
                        </tr>
                        </thead>
                        <tbody id="stats-table-{$safeUniqNames}">
                        <tr class="skeleton-row">
                            <td colspan="2" class="px-4 py-3">
                                <div class="skeleton-line w-100"></div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    {* required hidden data *}
    <input type="hidden" value="{$safeUniqNames}" id="safeUniqNames" class="safeUniqNames">
{/if}