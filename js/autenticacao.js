document.addEventListener('DOMContentLoaded', function() {
    criarCampoEstrelado();
    configurarToggleSenha();
    configurarFormularios();
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

function configurarFormularios() {
    const formLogin = document.getElementById('formLogin');
    const formCadastro = document.getElementById('formCadastro');
    
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);
        });
    }
    
    if (formCadastro) {
        formCadastro.addEventListener('submit', function(e) {
            e.preventDefault();
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);
        });
    }
}
