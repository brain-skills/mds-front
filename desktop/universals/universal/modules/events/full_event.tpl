<div class="card py-3 px-3">
    {if isset($message) && $message != ''}
    <div
        class="alert {if $message == 'Incorrect answer to security question.'}alert-danger{else}alert-success{/if} py-2">
        {$message}
    </div>
    {/if}
    <div class="row">
        <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mb-3">
            <img class="img-responsive" src="../../{$events.image}" alt="" style="min-height: 210px;">
            <div class="countdown d-flex justify-content-center align-items-center my-2 py-2 border-top border-bottom"
                data-end-time='{$events.end_date|date_format:"%m/%d/%Y - %H:%M:%S"}'>
                <div><span class="days">00</span>
                    <p>{$lang.general.days}</p>
                </div> :
                <div><span class="hours">00</span>
                    <p>{$lang.general.hours}</p>
                </div> :
                <div><span class="minutes">00</span>
                    <p>{$lang.general.min}</p>
                </div> :
                <div><span class="seconds">00</span>
                    <p>{$lang.general.sec}</p>
                </div>
            </div>
            <a href="#" class="btn btn-outline-success w-100" id="openApplicationForm">{$lang.modules_desc.join_button}</a>
        </div>
        <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8 mb-3">
            <span class="float-end">
                <span class="text-muted">{$lang.modules_desc.views_count}:</span> {$events.views}
            </span>
            <h4 class="fs-5">{$events.title}</h4>
            <p class="mb-2"><span class="text-muted">{$lang.modules_desc.categories}</span>:
                {assign var='categoryAltNames' value=','|explode:$events.category_alt_names}
                {foreach $categories as $index => $category}
                {if $index > 0}, {/if}<a href="/nc/{$categoryAltNames[$index]|default:''|escape:'url'}">{$category}</a>
                {/foreach}
            </p>
            <p class="mb-2"><span class="text-muted">{$lang.modules_desc.participants_count}:</span> {$events.participants}</p>
            <p class="mb-2"><span class="text-muted">{$lang.modules_desc.total_seats}:</span> {$events.capacity}</p>            
            <p class="mb-2"><span class="text-muted">{$lang.modules_desc.location}:</span> {$events.location}</p>
            <p class="mb-2"><span class="text-muted">{$lang.modules_desc.start_date}:</span>
                {$events.start_date|date_format:"%m/%d/%Y - %H:%M:%S"} | <span
                    class="text-muted">{$lang.modules_desc.end_date}:</span> {$events.end_date|date_format:"%m/%d/%Y -
                %H:%M:%S"}</p>
            <p class="mb-2">
                <span class="text-muted">{$lang.modules_desc.status}:</span>
                {if $events.status == 'upcoming'}
                <span class="text-success">upcoming</span>
                {elseif $events.status == 'ongoing'}
                <span class="text-primary">ongoing</span>
                {elseif $events.status == 'completed'}
                <span class="text-danger">completed</span>
                {/if}
            </p>

            {if isset($x_value[0])}<p><span class="text-muted">{$lang.fields.events.0}:</span> {$x_value[0]}</p>{/if}
            {if isset($x_value[1])}<p><span class="text-muted">{$lang.fields.events.1}:</span> {$x_value[1]}</p>{/if}
            {if isset($x_value[2])}<p><span class="text-muted">{$lang.fields.events.2}:</span> {$x_value[2]}</p>{/if}
            {if isset($x_value[3])}<p><span class="text-muted">{$lang.fields.events.3}:</span> {$x_value[3]}</p>{/if}

            <div class="row">
                <div class="col-12">
                    <p class="mb-2"><span class="text-muted">{$lang.modules_desc.performers_list}:</span></p>
                    <pre class="px-2 mb-2">{$events.performers}</pre>
                </div>
            </div>
        </div>
        <div class="col-12 mt-2">
            <p class="mb-2"><span class="text-muted">{$lang.modules_desc.participants_list}:</span></p>
            {if $confirmed_participants|@count > 0}
            <pre class="px-2 mb-3">
                    {foreach from=$confirmed_participants item=participant name=participants}
                        {$participant.username}{if !$smarty.foreach.participants.last}, {/if}
                    {/foreach}
                </pre>
            {else}
            <pre class="px-2 mb-3">{$lang.modules_desc.none_participants}.</pre>
            {/if}
        </div>
        <div class="col-12 mt-2">
            <p class="mb-2"><span class="text-muted">{$lang.modules_desc.event_description}:</span></p>
            <pre class="px-2 mb-3">{$events.full_desc}</pre>
        </div>
        <div class="col-12 mt-3">
            <h5 class="text-muted">{$lang.modules_desc.comments}:</h5>
            {include file='universal/comments.tpl' comments=$comments events=$events}
        </div>
    </div>
</div>
<script>
    document.getElementById("openApplicationForm").addEventListener("click", function () {
        ptcModal("{$lang.eventform.formtitle}", document.getElementById("applicationForm").innerHTML);
    });
</script>