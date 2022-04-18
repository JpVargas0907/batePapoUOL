let mensagens = []
let nome
const tela = document.querySelector(".tela-entrada")

function manterConexao(){
    let nameCopy = {
        name: nome
    }
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nameCopy)
}

function registrarNome(){
    if(document.querySelector(".tela-entrada .text-input").value !== ""){
        nome = document.querySelector(".tela-entrada .text-input").value
        tela.style.display = "none"
        entrarNaSala()
    } else if (document.querySelector(".tela-entrada .text-input").value === ""){
        alert("Campo nome vazio. Registre seu nome para poder entrar!")
    }
}

function entrarNaSala(){
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", {
        name: `${nome}`
    })

    requisicao.then(setInterval(manterConexao, 5000))
    requisicao.then(setInterval(buscarMensagens, 3000))
    requisicao.catch(tratarErro)
}

function tratarErro(){
    alert('Usuário já cadastrado, tente entrar novamente!')
    tela.style.display = "flex"
}

function tratarErroUsuarioOff(){
    alert("Você está offline. Entre novamente!")
    tela.style.display = "flex"
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
        elemento[i].scrollIntoView()
    }


}

function enviarMensagem(){
    let text = document.querySelector(".menu-footer .text-input").value
    let newMessage = {
        from: `${nome}`,
        to: "Todos",
        text: `${text}`,
        type: "message"
    }
    const enviarMensagem = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", newMessage)
    enviarMensagem.catch(tratarErroUsuarioOff);
    document.querySelector(".menu-footer .text-input").value = ""
}

function aparecerMenuLateral(){

}

document.addEventListener("keypress", function(e){
    let verificarConteudo = document.querySelector(".menu-footer .text-input").value
    if(e.key === "Enter" && verificarConteudo !== ""){
        enviarMensagem()
    } else if (e.key === "Enter" && verificarConteudo === ""){
        alert("Digite algo para enviar uma mensagem.")
    }
})