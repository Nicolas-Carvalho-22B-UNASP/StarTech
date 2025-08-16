/**
 * Sistema de Navegação entre Planetas - StarTech
 */

// Ordem dos planetas no Sistema Solar
const PLANETAS = [
    { nome: 'mercurio', titulo: 'Mercúrio', arquivo: 'mercurio.html' },
    { nome: 'venus', titulo: 'Vênus', arquivo: 'venus.html' },
    { nome: 'terra', titulo: 'Terra', arquivo: 'terra.html' },
    { nome: 'marte', titulo: 'Marte', arquivo: 'marte.html' },
    { nome: 'jupiter', titulo: 'Júpiter', arquivo: 'jupiter.html' },
    { nome: 'saturno', titulo: 'Saturno', arquivo: 'saturno.html' },
    { nome: 'urano', titulo: 'Urano', arquivo: 'urano.html' },
    { nome: 'netuno', titulo: 'Netuno', arquivo: 'netuno.html' }
];

/**
 * Inicializar navegação entre planetas
 */
function initNavegacaoPlanetas() {
    console.log('🧭 Iniciando navegação entre planetas...');
    
    // Detectar planeta atual pela URL ou título da página
    const planetaAtual = detectarPlanetaAtual();
    
    if (planetaAtual !== -1) {
        configurarBotoes(planetaAtual);
    }
    
    console.log('✅ Navegação entre planetas configurada');
}

/**
 * Detectar qual planeta estamos visualizando
 */
function detectarPlanetaAtual() {
    // Tentar detectar pelo nome do arquivo na URL
    const url = window.location.pathname;
    
    for (let i = 0; i < PLANETAS.length; i++) {
        if (url.includes(PLANETAS[i].arquivo) || url.includes(PLANETAS[i].nome)) {
            console.log(`📍 Planeta detectado: ${PLANETAS[i].titulo} (índice ${i})`);
            return i;
        }
    }
    
    // Se não conseguiu detectar pela URL, tentar pelo título da página
    const titulo = document.title;
    for (let i = 0; i < PLANETAS.length; i++) {
        if (titulo.includes(PLANETAS[i].titulo)) {
            console.log(`📍 Planeta detectado pelo título: ${PLANETAS[i].titulo} (índice ${i})`);
            return i;
        }
    }
    
    console.warn('⚠️ Não foi possível detectar o planeta atual');
    return -1;
}

/**
 * Configurar botões de navegação (com loop contínuo)
 */
function configurarBotoes(indiceAtual) {
    const btnAnterior = document.getElementById('planetaAnterior');
    const btnProximo = document.getElementById('proximoPlaneta');
    
    if (!btnAnterior || !btnProximo) {
        console.warn('⚠️ Botões de navegação não encontrados');
        return;
    }
    
    // Calcular índices com loop
    const indiceAnterior = indiceAtual === 0 ? PLANETAS.length - 1 : indiceAtual - 1;
    const indiceProximo = indiceAtual === PLANETAS.length - 1 ? 0 : indiceAtual + 1;
    
    // Configurar botão anterior (sempre habilitado)
    btnAnterior.disabled = false;
    btnAnterior.addEventListener('click', () => navegarPara(indiceAnterior));
    btnAnterior.title = `Ir para ${PLANETAS[indiceAnterior].titulo}`;
    
    // Configurar botão próximo (sempre habilitado)
    btnProximo.disabled = false;
    btnProximo.addEventListener('click', () => navegarPara(indiceProximo));
    btnProximo.title = `Ir para ${PLANETAS[indiceProximo].titulo}`;
    
    // Adicionar navegação por teclado (com loop)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            navegarPara(indiceAnterior);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            navegarPara(indiceProximo);
        }
    });
    
    console.log(`✓ Botões configurados para ${PLANETAS[indiceAtual].titulo} (navegação em loop)`);
}

/**
 * Navegar para um planeta específico
 */
function navegarPara(indice) {
    if (indice < 0 || indice >= PLANETAS.length) {
        console.error('❌ Índice de planeta inválido:', indice);
        return;
    }
    
    const planeta = PLANETAS[indice];
    const url = `./${planeta.arquivo}`;
    
    console.log(`🚀 Navegando para ${planeta.titulo}...`);
    
    // Adicionar efeito de transição suave (opcional)
    document.body.style.opacity = '0.8';
    
    setTimeout(() => {
        window.location.href = url;
    }, 150);
}

/**
 * Obter informações do planeta atual
 */
function getPlanetaInfo(indice) {
    if (indice >= 0 && indice < PLANETAS.length) {
        return PLANETAS[indice];
    }
    return null;
}

// Inicializar quando a página carregar (rápido)
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar imediatamente
    initNavegacaoPlanetas();
});

console.log('📄 Script de navegação entre planetas carregado');
