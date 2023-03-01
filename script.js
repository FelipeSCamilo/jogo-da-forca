const tecnologias = [
    "java", "react", "node", "python", "php", "css", "html",
    "mysql", "unity"
];

const palavraSecreta = tecnologias[Math.floor(Math.random() * tecnologias.length)];
//Armazenando a palavra secreta contida dentro do Array acima.

const letrasErradas = [];
const letrasCorretas = [];

document.addEventListener("keydown", (evento) => { //Ao apertar uma tecla, faça:
    const codigo = evento.keyCode; //Capturando o valor da tecla através do keyCode
    if(isLetra(codigo)) {
        const letra = evento.key; //Capturando a letra da tecla apertada.
        if(letrasErradas.includes(letra)) { //Se tentar colocar uma letra errada que já foi tentada no jogo, faça:
            mostraAvisoLetraRepetida(); //Mostra mensagem de aviso de letra repetida.
        } else { //Se não, faça:
            if(palavraSecreta.includes(letra)) { //Se a palavra secreta inclui a letra digitada, faça:
                letrasCorretas.push(letra); //Introduza a letra no array de letras corretas.
            } else { //Se não,
                letrasErradas.push(letra); //introduza no array de letras erradas
            }
        }
        atualizarJogo();
    }
});

function atualizarJogo() {
    mostrarLetrasErradas();
    mostrarLetrasCertas();
    desenharForca();
    checarJogo();
}

function mostrarLetrasErradas() {
    const div = document.querySelector(".letras-erradas-container");
    div.innerHTML = "<h3>Letras Erradas</h3>";
    letrasErradas.forEach((letra) => {
        div.innerHTML += `<span>${letra}</span>`;
    });
}

function mostrarLetrasCertas() {
    const container = document.querySelector(".palavra-secreta-container");
    container.innerHTML = "";
    palavraSecreta.split("").forEach((letra) => { //Separando as letras da palavra escolhida em outro array. Ex.: Java => ["j", "a", "v", "a"]
        if(letrasCorretas.includes(letra)) {
            container.innerHTML += `<span>${letra}</span>`;
        } else {
            container.innerHTML += `<span>_</span>`;
        }
    })
}

function checarJogo() {
    let mensagem = "";
    const container = document.querySelector(".palavra-secreta-container");
    const partesCorpo = document.querySelectorAll(".forca-parte");
    if(letrasErradas.length == partesCorpo.length) {
        mensagem = "Fim de jogo! Você perdeu.";
    }

    if(palavraSecreta == container.innerText) {
        mensagem = "Parabéns! Você ganhou."
    }

    if(mensagem) {
        document.querySelector("#mensagem").innerHTML = mensagem;
        document.querySelector(".popup-container").style.display = "flex";
    }
}

function desenharForca() {
    const partesCorpo = document.querySelectorAll(".forca-parte");
    for(let i = 0; i < letrasErradas.length; i++){
        partesCorpo[i].style.display = "block";
    }
}

function mostraAvisoLetraRepetida() {
    const aviso = document.querySelector(".aviso-letra-repetida");
    aviso.classList.add("show");
    setTimeout(() => {
        aviso.classList.remove("show");
    }, 1000);
}

function isLetra(codigo) { //função para descobrir se a tecla apertada é uma letra ou não.
    return codigo >= 65 && codigo <= 90;
}

//Cada tecla no teclado possui um código interno, o A tem o 65 e o Z tem 90.
//Ou seja, se um valor dentre esses dois citados for capturado, significa que uma letra foi capturada.
//Quem captura isso é o keyCode.

function reiniciarJogo() {
    window.location.reload(); //Recarregando a página.
}