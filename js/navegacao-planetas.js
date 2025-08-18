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


function initNavegacaoPlanetas() {
    console.log('🧭 Iniciando navegação entre planetas...');
    

    const planetaAtual = detectarPlanetaAtual();
    
    if (planetaAtual !== -1) {
        configurarBotoes(planetaAtual);
    }
    
    console.log('✅ Navegação entre planetas configurada');
}


function detectarPlanetaAtual() {

    const url = window.location.pathname;
    
    for (let i = 0; i < PLANETAS.length; i++) {
        if (url.includes(PLANETAS[i].arquivo) || url.includes(PLANETAS[i].nome)) {
            console.log(`📍 Planeta detectado: ${PLANETAS[i].titulo} (índice ${i})`);
            return i;
        }
    }
    

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


function configurarBotoes(indiceAtual) {
    const btnAnterior = document.getElementById('planetaAnterior');
    const btnProximo = document.getElementById('proximoPlaneta');
    
    if (!btnAnterior || !btnProximo) {
        console.warn('⚠️ Botões de navegação não encontrados');
        return;
    }
    

    const indiceAnterior = indiceAtual === 0 ? PLANETAS.length - 1 : indiceAtual - 1;
    const indiceProximo = indiceAtual === PLANETAS.length - 1 ? 0 : indiceAtual + 1;
    

    btnAnterior.disabled = false;
    btnAnterior.addEventListener('click', () => navegarPara(indiceAnterior));
    btnAnterior.title = `Ir para ${PLANETAS[indiceAnterior].titulo}`;
    

    btnProximo.disabled = false;
    btnProximo.addEventListener('click', () => navegarPara(indiceProximo));
    btnProximo.title = `Ir para ${PLANETAS[indiceProximo].titulo}`;
    

    // Navegação por teclado removida - setas são usadas apenas para rotação do planeta
    
    console.log(`✓ Botões configurados para ${PLANETAS[indiceAtual].titulo} (navegação em loop)`);
}


function navegarPara(indice) {
    if (indice < 0 || indice >= PLANETAS.length) {
        console.error('❌ Índice de planeta inválido:', indice);
        return;
    }
    
    const planeta = PLANETAS[indice];
    const url = `./${planeta.arquivo}`;
    
    console.log(`🚀 Navegando para ${planeta.titulo}...`);
    

    document.body.style.opacity = '0.8';
    
    setTimeout(() => {
        window.location.href = url;
    }, 150);
}


function getPlanetaInfo(indice) {
    if (indice >= 0 && indice < PLANETAS.length) {
        return PLANETAS[indice];
    }
    return null;
}


document.addEventListener('DOMContentLoaded', function() {

    initNavegacaoPlanetas();
});

console.log('📄 Script de navegação entre planetas carregado');
