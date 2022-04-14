let mensagens = []

setInterval(buscarMensagens, 3000);

function entrarNaSala(){
    const usuario = {
        nome: prompt("Qual o seu nome?")
    }
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ", usuario)

    promise.then()
    promise.catch(tratarErro)
}

function tratarErro(){
    alert('usuário não encontrado')
}

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
        if(mensagens[i].text === "entra na sala..." || mensagens[i].text === "sai da sala..."){
            ulMensagens.innerHTML += `
            <li class="mensagem cinza">
                <p class="time">(${mensagens[i].time})</p>
                <p class="from">${mensagens[i].from}</p>
                <p>para</p>
                <p class="to">${mensagens[i].to}:</p>
                <p class="text">${mensagens[i].text}</p>
            </li>
            `;
        } else if (mensagens[i].to !== "Todos"){
            ulMensagens.innerHTML += `
            <li class="mensagem rosa">
                <p class="time">(${mensagens[i].time})</p>
                <p class="from">${mensagens[i].from}</p>
                <p>para</p>
                <p class="to">${mensagens[i].to}:</p>
                <p class="text">${mensagens[i].text}</p>
            </li>
            `;
        } else {
            ulMensagens.innerHTML += `
            <li class="mensagem">
                <p class="time">(${mensagens[i].time})</p>
                <p class="from">${mensagens[i].from}</p>
                <p>para</p>
                <p class="to">${mensagens[i].to}:</p>
                <p class="text">${mensagens[i].text}</p>
            </li>
            `;
        }

        let elemento = document.querySelectorAll(".mensagem")
        elemento = elemento[i]
        elemento.scrollIntoView()

    }


}
