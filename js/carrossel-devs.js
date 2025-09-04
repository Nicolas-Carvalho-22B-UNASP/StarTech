class CarrosselDevs {
    constructor() {
        this.slideAtual = 0;
        this.slides = document.querySelectorAll('.slide-desenvolvedor');
        this.pontos = document.querySelectorAll('.ponto-navegacao');
        this.carrossel = document.querySelector('.carrossel-desenvolvedores');
        this.totalSlides = this.slides.length;
        this.autoplayTimer = null;
        this.autoplayInterval = 4000;
        
        this.init();
    }
    
    init() {
        if (!this.slides.length) return;
        
        this.pontos.forEach((ponto, index) => {
            ponto.addEventListener('click', () => this.irParaSlide(index));
        });
        
        this.adicionarEventosArraste();
        
        this.carrossel.addEventListener('mouseenter', () => this.pausarAutoplay());
        this.carrossel.addEventListener('mouseleave', () => this.iniciarAutoplay());
        
        this.iniciarAutoplay();
        
        this.mostrarSlide(0);
    }
    
    irParaSlide(index) {
        this.slideAtual = index;
        this.mostrarSlide(index);
        this.reiniciarAutoplay();
    }
    
    mostrarSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('ativo'));
        this.pontos.forEach(ponto => ponto.classList.remove('ativo'));
        
        this.slides[index].classList.add('ativo');
        this.pontos[index].classList.add('ativo');
    }
    
    proximoSlide() {
        this.slideAtual = (this.slideAtual + 1) % this.totalSlides;
        this.mostrarSlide(this.slideAtual);
    }
    
    slideAnterior() {
        this.slideAtual = (this.slideAtual - 1 + this.totalSlides) % this.totalSlides;
        this.mostrarSlide(this.slideAtual);
    }
    
    iniciarAutoplay() {
        this.autoplayTimer = setInterval(() => {
            this.proximoSlide();
        }, this.autoplayInterval);
    }
    
    pausarAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    }
    
    reiniciarAutoplay() {
        this.pausarAutoplay();
        this.iniciarAutoplay();
    }
    
    adicionarEventosArraste() {
        let inicioX = 0;
        let arrastando = false;
        
        this.carrossel.addEventListener('mousedown', (e) => {
            inicioX = e.clientX;
            arrastando = true;
            this.carrossel.style.cursor = 'grabbing';
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!arrastando) return;
            e.preventDefault();
        });
        
        document.addEventListener('mouseup', (e) => {
            if (!arrastando) return;
            
            const diferencaX = e.clientX - inicioX;
            const minimaDistancia = 50;
            
            if (Math.abs(diferencaX) > minimaDistancia) {
                if (diferencaX > 0) {
                    this.slideAnterior();
                } else {
                    this.proximoSlide();
                }
                this.reiniciarAutoplay();
            }
            
            arrastando = false;
            this.carrossel.style.cursor = 'grab';
        });
        
        this.carrossel.addEventListener('touchstart', (e) => {
            inicioX = e.touches[0].clientX;
        });
        
        this.carrossel.addEventListener('touchend', (e) => {
            const fimX = e.changedTouches[0].clientX;
            const diferencaX = fimX - inicioX;
            const minimaDistancia = 50;
            
            if (Math.abs(diferencaX) > minimaDistancia) {
                if (diferencaX > 0) {
                    this.slideAnterior();
                } else {
                    this.proximoSlide();
                }
                this.reiniciarAutoplay();
            }
        });
        
        this.carrossel.style.cursor = 'grab';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CarrosselDevs();
});