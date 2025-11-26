document.addEventListener('DOMContentLoaded', function() {
    criarCampoEstrelado();
    configurarToggleSenha();
    configurarFormularios();
    criarEstiloNotificacoes();
});

function criarCampoEstrelado() {
    const campoEstrelado = document.getElementById('campoEstrelado');
    if (!campoEstrelado) return;
    
    const numeroEstrelas = 150;

    for (let i = 0; i < numeroEstrelas; i++) {
        const estrela = document.createElement('div');
        estrela.style.cssText = `
            position: absolute;
            width: ${Math.random() * 2 + 1}px;
            height: ${Math.random() * 2 + 1}px;
            background: #fff;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.6 + 0.3};
            animation: piscar ${Math.random() * 4 + 3}s infinite alternate;
        `;
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

function configurarToggleSenha() {
    document.querySelectorAll('.toggle-senha').forEach(botao => {
        botao.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const iconeAberto = this.querySelector('.icone-olho-aberto');
            const iconeFechado = this.querySelector('.icone-olho-fechado');
            
            if (input.type === 'password') {
                input.type = 'text';
                iconeAberto.style.display = 'none';
                iconeFechado.style.display = 'block';
            } else {
                input.type = 'password';
                iconeAberto.style.display = 'block';
                iconeFechado.style.display = 'none';
            }
        });
    });
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
        top: 6.25rem;
        right: 1.25rem;
        background: ${tipo === 'sucesso' ? 'linear-gradient(45deg, #10b981, #059669)' : 'linear-gradient(45deg, #ef4444, #dc2626)'};
        color: white;
        padding: 0.9375rem 1.25rem;
        border-radius: 0.625rem;
        box-shadow: 0 0.3125rem 0.9375rem rgba(0,0,0,0.3);
        z-index: 10000;
        animation: deslizarEntrada 0.3s ease-out;
        max-width: 18.75rem;
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

function criarEstiloNotificacoes() {
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
}

function configurarFormularios() {
    const formLogin = document.getElementById('formLogin');
    const formCadastro = document.getElementById('formCadastro');
    
    if (formLogin) {
        formLogin.addEventListener('submit', async function(e) {
            e.preventDefault();
            await realizarLogin();
        });
    }
    
    if (formCadastro) {
        formCadastro.addEventListener('submit', async function(e) {
            e.preventDefault();
            await realizarCadastro();
        });
    }
}

async function realizarLogin() {
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;

    const usuario = {
        email,
        senha,
    };

    try {
        const response = await fetch("https://backend-startech.vercel.app/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usuario })
        });

        const data = await response.json();

        if (data.message) {
            mostrarNotificacao(data.message, 'erro');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            return;
        }

        const { id, nome } = data;
        sessionStorage.setItem("usuario", JSON.stringify({ id, nome }));
        
        mostrarNotificacao("Login efetuado com sucesso!", 'sucesso');
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    } catch (error) {
        console.error("Erro ao realizar login:", error);
        mostrarNotificacao("Erro ao conectar com o servidor. Verifique se o backend está rodando.", 'erro');
    }
}

async function realizarCadastro() {
    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;

    const usuario = {
        nome,
        email,
        senha
    };

    try {
        const response = await fetch("https://backend-startech.vercel.app/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usuario })
        });

        const data = await response.json();
        
        if (response.status === 201) {
            mostrarNotificacao(data.message, 'sucesso');
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        } else {
            mostrarNotificacao(data.message, 'erro');
        }
    } catch (error) {
        console.error("Erro ao realizar cadastro:", error);
        mostrarNotificacao("Erro ao conectar com o servidor. Verifique se o backend está rodando.", 'erro');
    }
}
