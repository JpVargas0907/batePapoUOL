let mensagens = []

setInterval(buscarMensagens, 3000);

function buscarMensagens() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");

    //callback
    promise.then(carregarDados);
}

function carregarDados(response) {
    mensagens = response.data;
    renderizarMensagens();
}

function renderizarMensagens() {
    const ulMensagens = document.querySelector(".lista-mensagens");
    ulMensagens.innerHTML = "";

    for(let i = 0; i < mensagens.length; i++){
        ulMensagens.innerHTML += `
        <li class="mensagem" verificarStatus(this)">
            <p class="time">(${mensagens[i].time})</p>
            <p class="from">${mensagens[i].from}</p>
            <p>para</p>
            <p class="to">${mensagens[i].to}:</p>
            <p class="text">${mensagens[i].text}</p>
        </li>
        `;
    }
}

function verificarStatus(elemento){
    if(mensagens[i].text === "entra na sala ..." || mensagens[i].text === "sai da sala..."){
        elemento.classList.add(".cinza")
    } else if(mensagens[i] !== "Todos"){
        elemento.classList.add(".rosa")
    }
}