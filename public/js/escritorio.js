const lblEscritorio = document.querySelector("h1");
const btnAtender = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAlert = document.querySelector(".alert");

const search = new URLSearchParams( window.location.search );

if( !search.has("escritorio") ) {
    window.location = "index.html";
    throw new Error("El escritorio es obligatorio");
}

const escritorio = search.get("escritorio");
lblEscritorio.innerText = escritorio;
divAlert.style.display = "none";

const socket = io();

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on('ultimo-ticket', (ultimo) => {
    // lblNuevoTicket.innerText = `Ticket ${ ultimo }`;
});

btnAtender.addEventListener("click", (e) => {
    socket.emit("atender-ticket", {escritorio}, (payload) => {
        if( !payload.ok ) {
            lblTicket.innerText = "Nadie";
            divAlert.innerText = payload.msg;
            divAlert.style.display = "";
            return;
        }

        lblTicket.innerText = `Ticket ${payload.ticket.numero}`;
    });
});


















