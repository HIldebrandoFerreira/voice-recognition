var engine = {
  palavras: [
    "olá",
    "como você está?",
    "aprendizado é divertido",
    "viva a vida",
    "codifique o futuro",
    "siga em frente",
    "bom trabalho",
    "você é incrível",
  ],
  moedas: 0,
};

const audioMoeda = new Audio("resources/audio/moeda.mp3");
const audioErrou = new Audio("resources/audio/errou.mp3");

function sortearPalavra() {
  var indexPalavraSorteada = Math.floor(Math.random() * engine.palavras.length);
  var legendaPalavra = document.getElementById("palavra-sorteada");
  var palavraSorteada = engine.palavras[indexPalavraSorteada];

  legendaPalavra.innerText = palavraSorteada;

  return palavraSorteada;
}

function atualizaPontuacao(valor) {
  var pontuacao = document.getElementById("pontuacao-atual");

  engine.moedas += valor;

  if (valor < 0) {
    audioErrou.play();
  } else {
    audioMoeda.play();
  }

  pontuacao.innerText = engine.moedas;
}

// Inicializa com uma palavra sorteada
var respostaCorreta = sortearPalavra();

var btnGravador = document.getElementById("btn-responder");
var transcricaoAudio = "";

if (window.SpeechRecognition || window.webkitSpeechRecognition) {
  var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
  var gravador = new SpeechAPI();

  gravador.continuos = false;
  gravador.lang = "pt-BR"; // Define o idioma para português (Brasil)

  gravador.onstart = function () {
    btnGravador.innerText = "Estou Ouvindo";
    btnGravador.style.backgroundColor = "white";
    btnGravador.style.color = "black";
  };

  gravador.onend = function () {
    btnGravador.innerText = "Responder";
    btnGravador.style.backgroundColor = "transparent";
    btnGravador.style.color = "white";
  };

  gravador.onresult = function (event) {
    transcricaoAudio = event.results[0][0].transcript.toUpperCase();
    respostaCorreta = document
      .getElementById("palavra-sorteada")
      .innerText.toUpperCase();

    if (transcricaoAudio === respostaCorreta.toUpperCase()) {
      atualizaPontuacao(1);
    } else {
      atualizaPontuacao(-1);
    }

    respostaCorreta = sortearPalavra();
  };
} else {
  console.log("não tem suporte");
}

btnGravador.addEventListener("click", function (e) {
  gravador.start();
});
