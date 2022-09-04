const socket = io();

socket.on("estado-actual", (payload) => {
    try{
        const audio = new Audio("./audio/new-ticket.mp3");
        audio.play();
    }
    catch(ex){
        // Do nothing
    }

    for(let a = 1; a <= payload.length; a++) {
        let lblTicket = document.querySelector(`#lblTicket${a}`);
        let lblEscritorio = document.querySelector(`#lblEscritorio${a}`);

        lblTicket.innerText = `Ticket ${payload[a-1].numero}`;
        lblEscritorio.innerText = payload[a-1].escritorio;
    }

});







