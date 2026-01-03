$(document).ready(function() {

    let tickets = {};
    let currentUserToken = null;
    let wsUrl = null;
    let ws;

    $.ajax({
        url: '/engine/ajax/lib/notification/get_token.php', // Замените на ваш маршрут
        type: 'GET',
        data: { },
        dataType: 'json',
        success: function(response) {
            if (response.token !== false) {
                currentUserToken = response.token;
                wsUrl = response.ws_config.web_socket_url;
                connectToWebSocket();
            }
        },
        error: function(xhr) {
        }
    });


    function connectToWebSocket() {

        ws = new WebSocket(wsUrl + '?usr_token=' + currentUserToken);

        ws.onopen = function () {
            ws.send(JSON.stringify({
                type: 'ticket',
                from_user_token: currentUserToken,
                action: "connect",
                //globalLang: window.globalLang
            }));
        };

        ws.onmessage = function (event) {
            const data = JSON.parse(event.data);

            if (data.type === "ticket" && data.action === "sendTicketMessage") {

                if (data.from === "support") {

                    tickets[data.ticketId].messages.push({message: data.message.message, from: 'user'});
                    $('#reply-text').val('');
                    renderTickets($('#search').val(), $('#priority-filter').val());
                    $(`.ticket-item[data-id="${data.ticketId}"]`).trigger('click');

                } else {

                    tickets[data.ticketId].messages.push({message: data.message.message, from: 'support'});
                    $('#reply-text').val('');
                    renderTickets($('#search').val(), $('#priority-filter').val());
                    $(`.ticket-item[data-id="${data.ticketId}"]`).trigger('click');

                }


            } else if (data.type === "ticket" && data.action === "closeTicket") {

                const ticketId = data.ticketId;
                tickets[ticketId]["status"] = "close";
                $(".tic-close-block").html('');
                $("#reply-text").prop('disabled', true);
                $(".send-ticket-message").addClass("disabled");

                renderTickets();

            }
        }
    }


    $.ajax({
        url: '/engine/ajax/lib/support/tickets_list.php', // Замените на ваш маршрут
        type: 'GET',
        data: { },
        dataType: 'json',
        success: function(response) {

            tickets = response;
            renderTickets();
            const hash = window.location.hash;
            const match = hash.match(/ticket-(\d+)/);
            if (match) {
                const ticketId = match[1];
                const ticketItem = $('.ticket-item[data-id="' + ticketId + '"]');
                if (ticketItem.length) {
                    ticketItem.trigger('click');
                }
            }
        },
        error: function(xhr) {
        }
    });

/*
    $(".send-ticket-message").on("click", function () {

        debugger;


    });*/



    function renderTickets(filter = "", priority = "") {
        const list = $('#ticket-items');
        list.empty();
        Object.entries(tickets).forEach(([id, ticket]) => {
            if (
                (!filter || ticket.title.toLowerCase().includes(filter.toLowerCase())) &&
                (!priority || ticket.priority === priority)
            ) {

                let colorSpan = "";
                if (ticket.status === "open") {
                    colorSpan = "green";
                } else if (ticket.status === "closed") {
                    colorSpan = "gray";
                } else {
                    colorSpan = "red";
                }

                const div = $('<div class="ticket-item"></div>')
                    .text(ticket.title + (ticket.priority ? ` (${ticket.priority})` : '')).append(` <span style="color: ${colorSpan}">${ticket.status}</span>`)
                    .attr('data-id', ticket.id);
                list.append(div);
            }
        });
    }


    $('#search').on('input', function () {
        const term = $(this).val();
        const priority = $('#priority-filter').val();
        renderTickets(term, priority);
    });

    $('#priority-filter').on('change', function () {
        const term = $('#search').val();
        const priority = $(this).val();
        renderTickets(term, priority);
    });

    $(document).on('click', '.ticket-item', function () {
        $('.ticket-item').removeClass('active');
        $(this).addClass('active');

        const ticketId = $(this).data('id');
        const ticket = tickets[ticketId];

        if (ticket.status === "close") {

            $(".tic-close-block").html('');
            $("#reply-text").prop('disabled', true);
            $(".send-ticket-message").addClass("disabled");

        } else {
            $("#reply-text").prop('disabled', false);
            $(".send-ticket-message").removeClass("disabled");
        }


        $('#ticket-subject').text(ticket.title);
        const container = $('#ticket-messages');
        container.empty();

        ticket.messages.forEach(msg => {
            const bubble = $('<div class="message"></div>')
                .addClass(msg.from)
                .text(msg.message);
            container.append(bubble);
        });

        $('#reply-form').show().data('ticket-id', ticketId);
        setTimeout(() => container.scrollTop(container[0].scrollHeight), 50);
    });

    $('#reply-form').submit(function (e) {
        e.preventDefault();
        const ticketId = $(this).data('ticket-id');
        const text = $('#reply-text').val();
        if (text.trim() === '') return;
        const message = $("#reply-text").val();


        if (message !== "") {
            ws.send(JSON.stringify({
                type: 'ticket',
                from_user_token: currentUserToken,
                action: "sendTicketMessage",
                message: message,
                ticketId: ticketId,
                globalLang: window.globalLang
            }));
        }
    });

});