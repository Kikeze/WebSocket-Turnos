const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl


const socketController = (socket) => {
    socket.emit("ultimo-ticket", ticketControl.ultimo);
    socket.emit("estado-actual", ticketControl.ultimos);
    socket.emit("tickets-pendientes", ticketControl.tickets.length);
    
    socket.on("siguiente-ticket", (payload, callback) => {
        const siguiente = ticketControl.siguiente();
        callback( siguiente );

        socket.broadcast.emit("tickets-pendientes", ticketControl.tickets.length);
        socket.emit("estado-actual", ticketControl.ultimos);
    });

    socket.on("atender-ticket", (payload, callback) => {
        const escritorio = payload.escritorio;

        if( !escritorio ) {
            return callback({
                ok: false,
                msg: "No se especifico el escritorio"
            });
        }

        const ticket = ticketControl.atenderTicket( escritorio );

        socket.broadcast.emit("estado-actual", ticketControl.ultimos);
        socket.broadcast.emit("tickets-pendientes", ticketControl.tickets.length);
        socket.emit("tickets-pendientes", ticketControl.tickets.length);

        if( !ticket ) {
            return callback({
                ok: false,
                msg: "No hay tickets por atender"
            });
        }
        else {
            return callback({
                ok: true,
                ticket
            });
        }
    });
};


module.exports = {
    socketController
};

