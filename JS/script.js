let mensagens = []
let nome

entrarNaSala()

function manterConexao(){
    let nameCopy = {
        name: nome
    }
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nameCopy)

    requisicao.catch(tratarErro2)
}

const tratarErro2 = () => console.log(error.response)

function entrarNaSala(){
    let name = prompt("Qual o seu nome?")
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ", {
        name: `${name}`
    })

    nome = name

    requisicao.then(setInterval(manterConexao, 5000))
    requisicao.then(setInterval(buscarMensagens, 3000))
    requisicao.catch(tratarErro)
}

function tratarErro(){
    alert('Usuário já cadastrado, tente entrar novamente!')
    entrarNaSala();
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

function enviarMensagem(){
    let text = document.querySelector("input").value
    let newMessage = {
        from: `${nome}`,
        to: "Todos",
        text: `${text}`,
        type: "message"
    }

    console.log(newMessage)

    const enviarMensagem = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", newMessage)
}