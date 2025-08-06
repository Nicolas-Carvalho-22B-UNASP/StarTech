document.addEventListener('DOMContentLoaded', function() {

    criarCampoEstrelado();

    configurarNavegacaoSuave();

    configurarBotaoTopo();

    configurarFAQ();

    configurarBotoesDescobertas();

    configurarFormularioContato();

    configurarSecaoAtiva();

    configurarCardsClicaveis();

    configurarLogosClicaveis();

    configurarBotoesHero();
});

function criarCampoEstrelado() {
    const campoEstrelado = document.getElementById('campoEstrelado');
    const numeroEstrelas = 150;

    for (let i = 0; i < numeroEstrelas; i++) {
        const estrela = document.createElement('div');
        estrela.style.position = 'absolute';
        estrela.style.width = Math.random() * 2 + 1 + 'px';
        estrela.style.height = estrela.style.width;
        estrela.style.backgroundColor = '#fff';
        estrela.style.borderRadius = '50%';
        estrela.style.left = Math.random() * 100 + '%';
        estrela.style.top = Math.random() * 100 + '%';
        estrela.style.opacity = Math.random() * 0.6 + 0.3;
        estrela.style.animation = `piscar ${Math.random() * 4 + 3}s infinite alternate`;

        campoEstrelado.appendChild(estrela);
    }

    if (!document.getElementById('estilo-estrelas')) {
        const estilo = document.createElement('style');
        estilo.id = 'estilo-estrelas';
        estilo.textContent = `
            @keyframes piscar {
                0% { opacity: 0.3; }
                100% { opacity: 0.9; }
            }
        `;
        document.head.appendChild(estilo);
    }
}

function configurarNavegacaoSuave() {
    const linksNavegacao = document.querySelectorAll('a[href^="#"]');

    linksNavegacao.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.navegacao').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function configurarBotaoTopo() {
    const botaoTopo = document.getElementById('botaoTopo');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            botaoTopo.classList.add('visivel');
        } else {
            botaoTopo.classList.remove('visivel');
        }
    });

    botaoTopo.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function configurarFAQ() {
    const itensFAQ = document.querySelectorAll('.item-faq');

    itensFAQ.forEach(item => {
        const pergunta = item.querySelector('.pergunta-faq');

        pergunta.addEventListener('click', function() {
            const estaAtivo = item.classList.contains('ativo');

            itensFAQ.forEach(outroItem => {
                outroItem.classList.remove('ativo');
            });

            if (!estaAtivo) {
                item.classList.add('ativo');
            }
        });
    });
}

function configurarBotoesDescobertas() {
    const botaoVerMais = document.querySelector('.botao-ver-mais');
    const botaoVerMenos = document.querySelector('.botao-ver-menos');
    const eventosDescobertas = document.querySelectorAll('.evento-descoberta');

    const eventosIniciais = 3;
    for (let i = eventosIniciais; i < eventosDescobertas.length; i++) {
        eventosDescobertas[i].style.display = 'none';
    }

    botaoVerMais.addEventListener('click', function() {

        eventosDescobertas.forEach(evento => {
            evento.style.display = 'flex';
        });

        botaoVerMais.style.display = 'none';
        botaoVerMenos.style.display = 'inline-block';
    });

    botaoVerMenos.addEventListener('click', function() {

        for (let i = eventosIniciais; i < eventosDescobertas.length; i++) {
            eventosDescobertas[i].style.display = 'none';
        }

        botaoVerMenos.style.display = 'none';
        botaoVerMais.style.display = 'inline-block';

        document.querySelector('#descobertas').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

function configurarFormularioContato() {
    const formContato = document.querySelector('.form-contato');

    formContato.addEventListener('submit', function(e) {
        e.preventDefault();

        const dadosForm = new FormData(formContato);
        const nome = dadosForm.get('nome');
        const email = dadosForm.get('email');
        const assunto = dadosForm.get('assunto');
        const mensagem = dadosForm.get('mensagem');

        if (!nome || !email || !assunto || !mensagem) {
            mostrarNotificacao('Por favor, preencha todos os campos.', 'erro');
            return;
        }

        if (!validarEmail(email)) {
            mostrarNotificacao('Por favor, insira um email válido.', 'erro');
            return;
        }

        const botaoEnviar = formContato.querySelector('.botao-enviar');
        const textoOriginal = botaoEnviar.textContent;

        botaoEnviar.textContent = 'ENVIANDO...';
        botaoEnviar.disabled = true;

        setTimeout(() => {
            mostrarNotificacao('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'sucesso');
            formContato.reset();
            botaoEnviar.textContent = textoOriginal;
            botaoEnviar.disabled = false;
        }, 2000);
    });
}

function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

function mostrarNotificacao(mensagem, tipo) {

    const notificacaoExistente = document.querySelector('.notificacao');
    if (notificacaoExistente) {
        notificacaoExistente.remove();
    }

    const notificacao = document.createElement('div');
    notificacao.className = `notificacao notificacao-${tipo}`;
    notificacao.textContent = mensagem;

    notificacao.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${tipo === 'sucesso' ? 'linear-gradient(45deg, #10b981, #059669)' : 'linear-gradient(45deg, #ef4444, #dc2626)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: deslizarEntrada 0.3s ease-out;
        max-width: 300px;
        font-weight: 500;
    `;

    document.body.appendChild(notificacao);

    setTimeout(() => {
        notificacao.style.animation = 'deslizarSaida 0.3s ease-in';
        setTimeout(() => {
            if (notificacao.parentNode) {
                notificacao.remove();
            }
        }, 300);
    }, 5000);
}

if (!document.getElementById('estilo-notificacoes')) {
    const estilo = document.createElement('style');
    estilo.id = 'estilo-notificacoes';
    estilo.textContent = `
        @keyframes deslizarEntrada {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes deslizarSaida {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(estilo);
}

document.addEventListener('DOMContentLoaded', function() {

    const cards = document.querySelectorAll('.card-conteudo, .card-explorar, .card-jogo');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    });

    if (!document.getElementById('estilo-animacoes')) {
        const estilo = document.createElement('style');
        estilo.id = 'estilo-animacoes';
        estilo.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .animacao-entrada {
                opacity: 0;
                transform: translateY(30px);
            }
        `;
        document.head.appendChild(estilo);
    }

    const elementosParaAnimacao = document.querySelectorAll('.card-conteudo, .card-explorar, .card-jogo, .evento-descoberta');
    elementosParaAnimacao.forEach(elemento => {
        elemento.classList.add('animacao-entrada');
        observer.observe(elemento);
    });
});

function configurarSecaoAtiva() {
    const linksNavegacao = document.querySelectorAll('.menu-navegacao a');
    const secoes = document.querySelectorAll('section[id]');

    function atualizarSecaoAtiva() {
        let secaoAtual = '';
        let maiorVisibilidade = 0;

        secoes.forEach(secao => {
            const secaoTop = secao.offsetTop;
            const secaoHeight = secao.clientHeight;
            const scrollPos = window.pageYOffset + 150;

            const inicioVisivel = Math.max(scrollPos - 150, secaoTop);
            const fimVisivel = Math.min(scrollPos + window.innerHeight - 150, secaoTop + secaoHeight);
            const parteVisivel = Math.max(0, fimVisivel - inicioVisivel);

            if (parteVisivel > maiorVisibilidade) {
                maiorVisibilidade = parteVisivel;
                secaoAtual = secao.getAttribute('id');
            }
        });

        linksNavegacao.forEach(link => {
            link.classList.remove('ativo');
        });

        if (secaoAtual) {
            const linkAtivo = document.querySelector(`.menu-navegacao a[href="#${secaoAtual}"]`);
            if (linkAtivo) {
                linkAtivo.classList.add('ativo');
            }
        }
    }

    if (!document.getElementById('estilo-secao-ativa')) {
        const estilo = document.createElement('style');
        estilo.id = 'estilo-secao-ativa';
        estilo.textContent = `
            .menu-navegacao a.ativo {
                color: #a855f7 !important;
            }

            .menu-navegacao a.ativo::after {
                width: calc(100% - 32px) !important;
            }
        `;
        document.head.appendChild(estilo);
    }

    window.addEventListener('scroll', atualizarSecaoAtiva);

    atualizarSecaoAtiva();
}

function configurarCardsClicaveis() {

    const cardsConteudos = document.querySelectorAll('.card-conteudo');
    cardsConteudos.forEach(card => {
        card.addEventListener('click', function() {
            document.querySelector('#explorar').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    const cardsExplorar = document.querySelectorAll('.card-explorar');
    cardsExplorar.forEach(card => {
        card.addEventListener('click', function() {

            console.log('Card clicado:', card.querySelector('h3').textContent);

            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });

    const botoesExplorar = document.querySelectorAll('.botao-explorar');
    botoesExplorar.forEach(botao => {
        botao.addEventListener('click', function(e) {
            e.stopPropagation();

            console.log('Botão explorar clicado');
        });
    });
}

function configurarLogosClicaveis() {
    const logos = document.querySelectorAll('.logo, .logo-rodape');

    logos.forEach(logo => {
        logo.addEventListener('click', function(e) {
            e.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
}

function configurarBotoesHero() {
    const botaoIniciarExploracao = document.querySelector('.botao-primario');
    const botaoUltimasDescobertas = document.querySelector('.botao-secundario');

    if (botaoIniciarExploracao) {
        botaoIniciarExploracao.addEventListener('click', function() {
            document.querySelector('#explorar').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    if (botaoUltimasDescobertas) {
        botaoUltimasDescobertas.addEventListener('click', function() {
            document.querySelector('#descobertas').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}