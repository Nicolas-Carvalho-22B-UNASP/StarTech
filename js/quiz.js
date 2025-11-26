const todasPerguntas = [

    {
        planeta: "MERCÚRIO",
        pergunta: "Qual é o diâmetro de Mercúrio?",
        alternativas: ["4.879 km", "6.792 km", "12.104 km", "12.742 km"],
        respostaCorreta: 0
    },
    {
        planeta: "MERCÚRIO",
        pergunta: "Quanto tempo dura um ano em Mercúrio?",
        alternativas: ["88 dias", "176 dias", "225 dias", "365 dias"],
        respostaCorreta: 0
    },

    {
        planeta: "VÊNUS",
        pergunta: "Qual é a temperatura média de Vênus?",
        alternativas: ["167°C", "464°C", "15°C", "-65°C"],
        respostaCorreta: 1
    },
    {
        planeta: "VÊNUS",
        pergunta: "Quantos satélites naturais Vênus possui?",
        alternativas: ["0", "1", "2", "4"],
        respostaCorreta: 0
    },

    {
        planeta: "TERRA",
        pergunta: "Qual é a inclinação axial da Terra?",
        alternativas: ["0,034°", "23,4°", "25,2°", "97,8°"],
        respostaCorreta: 1
    },
    {
        planeta: "TERRA",
        pergunta: "Qual é a composição principal da atmosfera terrestre?",
        alternativas: ["78% N₂, 21% O₂", "96% H₂, 3% He", "83% H₂, 15% He", "95% CO₂, 3% N₂"],
        respostaCorreta: 0
    },

    {
        planeta: "MARTE",
        pergunta: "Quais são as duas luas de Marte?",
        alternativas: ["Titã e Europa", "Fobos e Deimos", "Io e Ganimedes", "Titânia e Oberon"],
        respostaCorreta: 1
    },
    {
        planeta: "MARTE",
        pergunta: "Qual é a temperatura média de Marte?",
        alternativas: ["15°C", "-65°C", "-110°C", "-195°C"],
        respostaCorreta: 1
    },

    {
        planeta: "JÚPITER",
        pergunta: "Quantos satélites Júpiter possui?",
        alternativas: ["27", "95", "274", "28"],
        respostaCorreta: 1
    },
    {
        planeta: "JÚPITER",
        pergunta: "Qual é o período de rotação de Júpiter?",
        alternativas: ["9,9 horas", "23,9 horas", "10,7 horas", "17,2 horas"],
        respostaCorreta: 0
    },

    {
        planeta: "SATURNO",
        pergunta: "Qual é a densidade de Saturno?",
        alternativas: ["1.326 kg/m³", "687 kg/m³", "5.243 kg/m³", "1.270 kg/m³"],
        respostaCorreta: 1
    },
    {
        planeta: "SATURNO",
        pergunta: "Quantos satélites Saturno possui?",
        alternativas: ["95", "274", "28", "27"],
        respostaCorreta: 1
    },
    {
        planeta: "SATURNO",
        pergunta: "Qual é a velocidade máxima dos ventos em Saturno?",
        alternativas: ["1.200 km/h", "1.800 km/h", "2.100 km/h", "900 km/h"],
        respostaCorreta: 1
    },

    {
        planeta: "URANO",
        pergunta: "Qual é a característica única da rotação de Urano?",
        alternativas: ["Rotação retrógrada", "Inclinação de 97,8°", "Rotação mais lenta", "Sem rotação"],
        respostaCorreta: 1
    },
    {
        planeta: "URANO",
        pergunta: "Quantos satélites Urano possui?",
        alternativas: ["14", "28", "95", "274"],
        respostaCorreta: 1
    },
    {
        planeta: "URANO",
        pergunta: "Qual gás dá a cor azul-esverdeada a Urano?",
        alternativas: ["Hidrogênio", "Hélio", "Metano", "Amônia"],
        respostaCorreta: 2
    },

    {
        planeta: "NETUNO",
        pergunta: "Qual é a temperatura média de Netuno?",
        alternativas: ["-140°C", "-195°C", "-200°C", "-110°C"],
        respostaCorreta: 2
    },
    {
        planeta: "NETUNO",
        pergunta: "Qual é o período orbital de Netuno?",
        alternativas: ["84 anos", "165 anos", "29,5 anos", "11,9 anos"],
        respostaCorreta: 1
    },

    {
        planeta: "SISTEMA SOLAR",
        pergunta: "Quantos planetas oficiais existem no Sistema Solar?",
        alternativas: ["7", "8", "9", "10"],
        respostaCorreta: 1
    },
    {
        planeta: "SISTEMA SOLAR",
        pergunta: "Qual planeta é conhecido como 'O Senhor dos Anéis'?",
        alternativas: ["Júpiter", "Saturno", "Urano", "Netuno"],
        respostaCorreta: 1
    }
];


let perguntasDoQuiz = [];
let perguntaAtual = 0;
let pontuacao = 0;
let respostaSelecionada = null;
let mostrandoResposta = false;


function embaralharArray(array) {
    const novoArray = [...array];
    for (let i = novoArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
    }
    return novoArray;
}


function selecionarPerguntasAleatorias() {
    const perguntasEmbaralhadas = embaralharArray(todasPerguntas);
    return perguntasEmbaralhadas.slice(0, 10);
}


function iniciarQuiz() {
    perguntasDoQuiz = selecionarPerguntasAleatorias();
    perguntaAtual = 0;
    pontuacao = 0;
    respostaSelecionada = null;
    mostrandoResposta = false;


    document.getElementById('quizIntro').style.display = 'none';
    document.getElementById('quizGame').style.display = 'block';
    document.getElementById('quizResultado').style.display = 'none';


    carregarPergunta();
    atualizarProgresso();
}


function carregarPergunta() {
    const pergunta = perguntasDoQuiz[perguntaAtual];


    document.getElementById('planetaTag').textContent = pergunta.planeta;
    document.getElementById('perguntaTexto').textContent = pergunta.pergunta;


    const alternativasContainer = document.getElementById('alternativas');
    alternativasContainer.innerHTML = '';

    pergunta.alternativas.forEach((alternativa, index) => {
        const botaoAlternativa = document.createElement('button');
        botaoAlternativa.className = 'alternativa';
        botaoAlternativa.textContent = alternativa;
        botaoAlternativa.onclick = () => selecionarResposta(index);
        alternativasContainer.appendChild(botaoAlternativa);
    });


    respostaSelecionada = null;
    mostrandoResposta = false;
    document.getElementById('botaoProxima').disabled = true;


    const botaoProxima = document.getElementById('botaoProxima');
    if (perguntaAtual === perguntasDoQuiz.length - 1) {
        botaoProxima.textContent = 'VER RESULTADO';
    } else {
        botaoProxima.textContent = 'PRÓXIMA PERGUNTA';
    }
}


function selecionarResposta(index) {
    if (mostrandoResposta) return;


    document.querySelectorAll('.alternativa').forEach(btn => {
        btn.classList.remove('selecionada');
    });


    document.querySelectorAll('.alternativa')[index].classList.add('selecionada');

    respostaSelecionada = index;
    document.getElementById('botaoProxima').disabled = false;
}


function mostrarResultadoPergunta() {
    const pergunta = perguntasDoQuiz[perguntaAtual];
    const alternativas = document.querySelectorAll('.alternativa');

    mostrandoResposta = true;


    alternativas[pergunta.respostaCorreta].classList.add('correta');


    if (respostaSelecionada !== pergunta.respostaCorreta) {
        alternativas[respostaSelecionada].classList.add('incorreta');
    } else {
        pontuacao++;
    }


    alternativas.forEach(alt => {
        alt.classList.add('desabilitada');
        alt.onclick = null;
    });
}


function proximaPergunta() {
    if (!mostrandoResposta) {

        mostrarResultadoPergunta();


        const botaoProxima = document.getElementById('botaoProxima');
        botaoProxima.disabled = true;
        botaoProxima.textContent = 'AGUARDE...';


        setTimeout(() => {
            if (perguntaAtual < perguntasDoQuiz.length - 1) {
                perguntaAtual++;
                carregarPergunta();
                atualizarProgresso();
            } else {
                mostrarResultado();
            }
        }, 2000);
    }
}


function atualizarProgresso() {
    const progresso = ((perguntaAtual + 1) / perguntasDoQuiz.length) * 100;
    document.getElementById('progressFill').style.width = progresso + '%';
    document.getElementById('progressText').innerHTML = `<span class="numero">${perguntaAtual + 1}</span> de <span class="numero">${perguntasDoQuiz.length}</span>`;
}


async function mostrarResultado() {

    document.getElementById('quizGame').style.display = 'none';
    document.getElementById('quizResultado').style.display = 'block';

    const pontuacaoTotal = pontuacao * 10;

    document.getElementById('pontuacaoFinal').textContent = `${pontuacao}/10`;
    document.getElementById('acertos').textContent = pontuacao;

    const usuario = sessionStorage.getItem('usuario');
    if (usuario) {
        const usuarioData = JSON.parse(usuario);
        await salvarPontuacao(usuarioData.id, pontuacaoTotal);
    }

    let descricao = '';
    if (pontuacao >= 9) {
        descricao = 'Fantástico! Você é um verdadeiro especialista em astronomia!';
    } else if (pontuacao >= 7) {
        descricao = 'Excelente! Você tem um ótimo conhecimento sobre o Sistema Solar!';
    } else if (pontuacao >= 5) {
        descricao = 'Bom trabalho! Você conhece bem os planetas do Sistema Solar!';
    } else if (pontuacao >= 3) {
        descricao = 'Não foi mal! Continue estudando para melhorar seus conhecimentos!';
    } else {
        descricao = 'Continue explorando o StarTech para aprender mais sobre o Sistema Solar!';
    }

    document.getElementById('resultadoDescricao').textContent = descricao;
}

async function salvarPontuacao(usuarioId, pontuacao) {
    try {
        const response = await fetch("https://backend-startech.vercel.app/salvar-pontuacao", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usuarioId, pontuacao })
        });

        const data = await response.json();
        console.log(data.message);
    } catch (error) {
        console.error("Erro ao salvar pontuação:", error);
    }
}


function reiniciarQuiz() {

    document.getElementById('quizResultado').style.display = 'none';
    document.getElementById('quizIntro').style.display = 'block';
}


function voltarParaIntro() {

    document.getElementById('quizGame').style.display = 'none';
    document.getElementById('quizIntro').style.display = 'block';
}


document.addEventListener('keydown', function(event) {
    if (document.getElementById('quizGame').style.display !== 'none') {

        if (!mostrandoResposta && event.key >= '1' && event.key <= '4') {
            const index = parseInt(event.key) - 1;
            if (index < document.querySelectorAll('.alternativa').length) {
                selecionarResposta(index);
            }
        } else if (event.key === 'Enter' && !document.getElementById('botaoProxima').disabled && respostaSelecionada !== null) {
            proximaPergunta();
        }
    }
});


document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('quizIntro').style.display = 'block';
    document.getElementById('quizGame').style.display = 'none';
    document.getElementById('quizResultado').style.display = 'none';
});
