<div class="quiz-widget">
    <h2>{$widgetData.main_title}</h2>
    {foreach from=$widgetData.questions item=question}
        <div class="quiz-question">
            <p>{$question.question}</p>
            {if $question.image}
                <img src="{$question.image}" alt="Изображение вопроса">
            {/if}
            <ul>
                {foreach from=$question.answers item=answer}
                    <li><button onclick='window.location.href = "{$answer.handleUrl}"' class="quiz-answer">{$answer.answer}</button></li>
                {/foreach}
            </ul>
        </div>
    {/foreach}
</div>