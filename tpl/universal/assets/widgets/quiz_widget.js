$(document).ready(function () {

    $('.quizUniqName').each(function () {
        const uniqName = $(this).val();
        const container = $('#' + uniqName + '-widget_container');
        const stats = {};

        $.ajax({
            url: '/engine/ajax/lib/quiz/quiz_widget.php',
            type: 'POST',
            data: { uniq_name: uniqName },
            success: function (response) {
                const data = JSON.parse(response);
                if (!data.questions) return;

                const questions = data.questions;
                let html = '';

                questions.forEach((q, i) => {
                    html += `
                        <div class="poll-card" style="width: 50%">
                            <img src="${q.image}" class="poll-image w-100">
                            <div class="p-4">
                                <h3 class="poll-question">${q.question}</h3>
                                <p>Количество участников: ${q.participations_count}</p>
                                <div class="row">
                                    ${q.answers.map(a => {
                                        const checked = q.answered === a.id ? 'checked' : '';
                                        return `
                                            <div class="col-md-6">
                                                <input ${checked} data-questionid="${q.id}" data-answerid="${a.id}" 
                                                    type="radio" name="q${i + 1}" id="answer-${a.id}" class="d-none">
                                                <label for="answer-${a.id}" class="option-label">${a.answer}</label>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                                <button type="button" class="btn btn-success submit-answer mt-3" data-questionid="${q.id}">
                                    Подтвердить выбор
                                </button>
                                <div id="stats${q.id}" class="mt-3"></div>
                            </div>
                        </div>
                    `;

                    stats[q.id] = { total: 0, answers: {} };

                    q.participations.forEach(p => {
                        const qId = p.quiz_question_id;
                        const selected = p.selected_option;
                        stats[qId].total++;
                        stats[qId].answers[selected] = (stats[qId].answers[selected] || 0) + 1;
                    });
                });

                container.html(html);

                Object.keys(stats).forEach(showStatistics);

                container.on('click', '.submit-answer', function () {
                    const questionId = $(this).data('questionid');
                    const selectedInput = container.find(`input[data-questionid="${questionId}"]:checked`);
                    if (!selectedInput.length) return;

                    const answerId = selectedInput.data('answerid');

                    $.ajax({
                        url: '/engine/ajax/lib/quiz/user_answer.php',
                        type: 'POST',
                        data: { answer_id: answerId, question_id: questionId },
                        success: function (response) {
                            const data = JSON.parse(response);
                            stats[questionId] = { total: 0, answers: {} };

                            data.forEach(p => {
                                const qId = p.quiz_question_id;
                                const selected = p.selected_option;
                                stats[qId].total++;
                                stats[qId].answers[selected] = (stats[qId].answers[selected] || 0) + 1;
                            });

                            showStatistics(questionId);
                        },
                        error: function (xhr, status, error) {
                            console.error('Ошибка:', error);
                        }
                    });
                });

                function showStatistics(questionId) {
                    const statContainer = $('#stats' + questionId);
                    statContainer.empty().show();

                    Object.entries(stats[questionId].answers).forEach(([answerId, count]) => {
                        const percent = ((count / stats[questionId].total) * 100).toFixed(1);
                        const label = container.find(`label[for="answer-${answerId}"]`).text();

                        statContainer.append(`
                            <div class="mb-3">
                                <div class="d-flex justify-content-between">
                                    <span>${label}</span>
                                    <span>${percent}%</span>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar" style="width: ${percent}%;"></div>
                                </div>
                            </div>
                        `);
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error('Ошибка:', error);
            }
        });
    });

});
