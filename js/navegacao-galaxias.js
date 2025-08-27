const GALAXIAS = [
    { nome: 'via-lactea', titulo: 'Via Láctea', arquivo: 'via-lactea.html' },
    { nome: 'andromeda', titulo: 'Andrômeda', arquivo: 'andromeda.html' },
    { nome: 'triangulo', titulo: 'Triângulo', arquivo: 'triangulo.html' },
    { nome: 'magalhaes', titulo: 'Magalhães', arquivo: 'magalhaes.html' }
];


function initNavegacaoGalaxias() {
    console.log('🌌 Iniciando navegação entre galáxias...');


    const galaxiaAtual = detectarGalaxiaAtual();

    if (galaxiaAtual !== -1) {
        configurarBotoes(galaxiaAtual);
    }

    console.log('✅ Navegação entre galáxias configurada');
}


function detectarGalaxiaAtual() {

    const url = window.location.pathname;

    for (let i = 0; i < GALAXIAS.length; i++) {
        if (url.includes(GALAXIAS[i].arquivo) || url.includes(GALAXIAS[i].nome)) {
            console.log(`🌌 Galáxia detectada: ${GALAXIAS[i].titulo} (índice ${i})`);
            return i;
        }
    }


    const titulo = document.title;
    for (let i = 0; i < GALAXIAS.length; i++) {
        if (titulo.includes(GALAXIAS[i].titulo)) {
            console.log(`🌌 Galáxia detectada pelo título: ${GALAXIAS[i].titulo} (índice ${i})`);
            return i;
        }
    }

    console.warn('⚠️ Não foi possível detectar a galáxia atual');
    return -1;
}


function configurarBotoes(indiceAtual) {
    const btnAnterior = document.getElementById('galaxiaAnterior');
    const btnProxima = document.getElementById('proximaGalaxia');

    if (!btnAnterior || !btnProxima) {
        console.warn('⚠️ Botões de navegação não encontrados');
        return;
    }


    const indiceAnterior = indiceAtual === 0 ? GALAXIAS.length - 1 : indiceAtual - 1;
    const indiceProxima = indiceAtual === GALAXIAS.length - 1 ? 0 : indiceAtual + 1;


    btnAnterior.disabled = false;
    btnAnterior.addEventListener('click', () => navegarPara(indiceAnterior));
    btnAnterior.title = `Ir para ${GALAXIAS[indiceAnterior].titulo}`;


    btnProxima.disabled = false;
    btnProxima.addEventListener('click', () => navegarPara(indiceProxima));
    btnProxima.title = `Ir para ${GALAXIAS[indiceProxima].titulo}`;

    console.log(`✓ Botões configurados para ${GALAXIAS[indiceAtual].titulo} (navegação em loop)`);
}


function navegarPara(indice) {
    if (indice < 0 || indice >= GALAXIAS.length) {
        console.error('❌ Índice de galáxia inválido:', indice);
        return;
    }

    const galaxia = GALAXIAS[indice];
    const url = `./${galaxia.arquivo}`;

    console.log(`🚀 Navegando para ${galaxia.titulo}...`);


    document.body.style.opacity = '0.8';

    setTimeout(() => {
        window.location.href = url;
    }, 150);
}


function getGalaxiaInfo(indice) {
    if (indice >= 0 && indice < GALAXIAS.length) {
        return GALAXIAS[indice];
    }
    return null;
}


document.addEventListener('DOMContentLoaded', function() {

    initNavegacaoGalaxias();
});

console.log('📄 Script de navegação entre galáxias carregado');
