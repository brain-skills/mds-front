{if !empty($smarty.session.lang)}
<div class="container mb-4">
    <div class="row justify-content-center">
        <div class="col-12 bg-dark">
            <div class="row align-items-center">
                <div class="col-12 col-md-8 px-4 py-3">
                    {if $smarty.session.lang == 'english'}<h5 class="text-white">Send a message to the White House – support the flash mob!</h5>{/if}
                    {if $smarty.session.lang == 'russian'}<h5 class="text-white">Отправьте послание в Белый Дом – поддержите флешмоб! </h5>{/if}
                    {if $smarty.session.lang == 'spanish'}<h5 class="text-white">Envía un mensaje a la Casa Blanca – apoya el flashmob!</h5>{/if}
                    {if $smarty.session.lang == 'ukrainian'}<h5 class="text-white">Надішліть послання до Білого дому – підтримайте флешмоб!</h5>{/if}

                    {if $smarty.session.lang == 'english'}<p class="text-white mb-0">The voice that unites the world!</p>{/if}
                    {if $smarty.session.lang == 'russian'}<p class="text-white mb-0">Голос, который объединяет мир!</p>{/if}
                    {if $smarty.session.lang == 'spanish'}<p class="text-white mb-0">La voz que une al mundo!</p>{/if}
                    {if $smarty.session.lang == 'ukrainian'}<p class="text-white mb-0">Голос, що об'єднує світ!</p>{/if}

                </div>
                <div class="col-12 col-md-4 px-4 py-3 text-end">
                    {if $smarty.session.lang == 'english'}<a href="/worldwide-hello" class="btn btn-success fs-4">Join</a>{/if}
                    {if $smarty.session.lang == 'russian'}<a href="/worldwide-hello" class="btn btn-success fs-4">Присоединиться</a>{/if}
                    {if $smarty.session.lang == 'spanish'}<a href="/worldwide-hello" class="btn btn-success fs-4">Unirse</a>{/if}
                    {if $smarty.session.lang == 'ukrainian'}<a href="/worldwide-hello" class="btn btn-success fs-4">Приєднатися</a>{/if}
                </div>
            </div>
        </div>
    </div>
</div>
{/if}