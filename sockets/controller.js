const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl


const socketController = (socket) => {

    socket.emit("ultimo-ticket", ticketControl.ultimo);
    
    socket.on("siguiente-ticket", (payload, callback) => {
        const siguiente = ticketControl.siguiente();
        callback( siguiente );

        //TODO: Notificar nuevo ticket
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

