const FENOMENOS = [
    { nome: 'eclipse-solar', titulo: 'Eclipse Solar', arquivo: 'eclipse-solar.html' },
    { nome: 'erupcao-solar', titulo: 'Erupção Solar', arquivo: 'erupcao-solar.html' },
    { nome: 'meteoro', titulo: 'Meteoro', arquivo: 'meteoro.html' },
    { nome: 'supernova', titulo: 'Supernova', arquivo: 'supernova.html' }
];


function initNavegacaoFenomenos() {
    console.log('🌟 Iniciando navegação entre fenômenos cósmicos...');


    const fenomenoAtual = detectarFenomenoAtual();

    if (fenomenoAtual !== -1) {
        configurarBotoes(fenomenoAtual);
    }

    console.log('✅ Navegação entre fenômenos cósmicos configurada');
}


function detectarFenomenoAtual() {

    const url = window.location.pathname;

    for (let i = 0; i < FENOMENOS.length; i++) {
        if (url.includes(FENOMENOS[i].arquivo) || url.includes(FENOMENOS[i].nome)) {
            console.log(`🌟 Fenômeno detectado: ${FENOMENOS[i].titulo} (índice ${i})`);
            return i;
        }
    }


    const titulo = document.title;
    for (let i = 0; i < FENOMENOS.length; i++) {
        if (titulo.includes(FENOMENOS[i].titulo)) {
            console.log(`🌟 Fenômeno detectado pelo título: ${FENOMENOS[i].titulo} (índice ${i})`);
            return i;
        }
    }

    console.warn('⚠️ Não foi possível detectar o fenômeno atual');
    return -1;
}


function configurarBotoes(indiceAtual) {
    const btnAnterior = document.getElementById('fenomenoAnterior');
    const btnProximo = document.getElementById('proximoFenomeno');

    if (!btnAnterior || !btnProximo) {
        console.warn('⚠️ Botões de navegação não encontrados');
        return;
    }


    const indiceAnterior = indiceAtual === 0 ? FENOMENOS.length - 1 : indiceAtual - 1;
    const indiceProximo = indiceAtual === FENOMENOS.length - 1 ? 0 : indiceAtual + 1;


    btnAnterior.disabled = false;
    btnAnterior.addEventListener('click', () => navegarPara(indiceAnterior));
    btnAnterior.title = `Ir para ${FENOMENOS[indiceAnterior].titulo}`;


    btnProximo.disabled = false;
    btnProximo.addEventListener('click', () => navegarPara(indiceProximo));
    btnProximo.title = `Ir para ${FENOMENOS[indiceProximo].titulo}`;

    console.log(`✓ Botões configurados para ${FENOMENOS[indiceAtual].titulo} (navegação em loop)`);
}


function navegarPara(indice) {
    if (indice < 0 || indice >= FENOMENOS.length) {
        console.error('❌ Índice de fenômeno inválido:', indice);
        return;
    }

    const fenomeno = FENOMENOS[indice];
    const url = `./${fenomeno.arquivo}`;

    console.log(`🚀 Navegando para ${fenomeno.titulo}...`);


    document.body.style.opacity = '0.8';

    setTimeout(() => {
        window.location.href = url;
    }, 150);
}


function getFenomenoInfo(indice) {
    if (indice >= 0 && indice < FENOMENOS.length) {
        return FENOMENOS[indice];
    }
    return null;
}


document.addEventListener('DOMContentLoaded', function() {

    initNavegacaoFenomenos();
});

console.log('📄 Script de navegação entre fenômenos cósmicos carregado');
