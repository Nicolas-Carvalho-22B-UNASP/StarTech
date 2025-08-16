/**
 * Sistema 3D para o planeta Netuno - Versão Realista
 */

let scene, camera, renderer, planet, starField, controls;
let isRotating = true;
let rotationDirection = 1;

// Aguardar carregamento completo (inicialização rápida)
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar imediatamente após DOM carregar
    initNetuno();
});

function initNetuno() {
    console.log('🚀 Iniciando Netuno 3D Realista...');
    
    // Verificações básicas
    if (typeof THREE === 'undefined') {
        console.error('❌ Three.js não carregado');
        showError('Three.js não carregado');
        return;
    }
    
    if (typeof THREE.OrbitControls === 'undefined') {
        console.error('❌ OrbitControls não carregado');
        showError('OrbitControls não carregado');
        return;
    }
    
    const canvas = document.getElementById('canvas3d');
    if (!canvas) {
        console.error('❌ Canvas não encontrado');
        showError('Canvas não encontrado');
        return;
    }
    
    try {
        setupScene(canvas);
        setupCamera(canvas);
        setupRenderer(canvas);
        setupRealisticLights();
        createRealisticPlanet();
        createBeautifulStars();
        setupSmoothControls();
        setupEvents();
        animate();
        
        console.log('✅ Netuno 3D Realista iniciado com sucesso!');
    } catch (error) {
        console.error('❌ Erro:', error);
        showError('Erro: ' + error.message);
    }
}

function setupScene(canvas) {
    scene = new THREE.Scene();
    // Fundo espacial escuro e realista
    scene.background = new THREE.Color(0x000005);
    console.log('✓ Cena criada');
}

function setupCamera(canvas) {
    // Usar as dimensões reais do canvas após CSS aplicado
    const rect = canvas.getBoundingClientRect();
    const aspect = rect.width / rect.height;
    
    // Campo de visão menor para aspecto mais realista
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    camera.position.set(0, 0, 6); // Afastado mais (era 4)
    console.log('✓ Câmera criada');
}

function setupRenderer(canvas) {
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: false
    });
    
    // Usar as dimensões reais do canvas definidas pelo CSS
    const rect = canvas.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Configurações para gráficos mais realistas
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Sombras suaves
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 0.6; // Reduzido para não estourar
    
    console.log('✓ Renderer realista criado');
}

function setupRealisticLights() {
    // Luz ambiente muito sutil (espaço é escuro)
    const ambientLight = new THREE.AmbientLight(0x202040, 0.1);
    scene.add(ambientLight);
    
    // Luz principal do Sol - intensidade reduzida para não estourar
    const sunLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
    sunLight.position.set(8, 3, 4);
    sunLight.castShadow = true;
    
    // Configurações de sombra limpa e suave
    sunLight.shadow.mapSize.width = 2048;  // Resolução equilibrada
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 50;
    sunLight.shadow.camera.left = -10;
    sunLight.shadow.camera.right = 10;
    sunLight.shadow.camera.top = 10;
    sunLight.shadow.camera.bottom = -10;
    sunLight.shadow.bias = -0.0001;        // Bias conservador
    scene.add(sunLight);
    
    // Luz de preenchimento muito sutil
    const fillLight = new THREE.DirectionalLight(0x4a5568, 0.15);
    fillLight.position.set(-5, -2, -3);
    scene.add(fillLight);
    
    console.log('✓ Iluminação realista criada');
}

function createRealisticPlanet() {
    // Geometria mais detalhada
    const geometry = new THREE.SphereGeometry(1.6, 64, 64);
    
    // Material realista inicial - cor azul intensa como Netuno real
    const material = new THREE.MeshLambertMaterial({
        color: 0x4169e1, // Azul intenso característico de Netuno
        emissive: 0x000000, // Sem emissão própria
        transparent: false
    });
    
    planet = new THREE.Mesh(geometry, material);
    planet.castShadow = true;
    planet.receiveShadow = true;
    
    // Inclinação axial padrão (mesmo do Mercúrio)
    planet.rotation.z = 0.001;
    
    scene.add(planet);
    console.log('✓ Planeta realista criado');
    
    // Carregar textura com configurações realistas
    const loader = new THREE.TextureLoader();
    loader.load(
        '../images/netuno/neptune_texture.jpg',
        function(texture) {
            // Configurações da textura para realismo
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
            
            // Criar novo material com textura e cor azul intensa realista
            const newMaterial = new THREE.MeshLambertMaterial({
                map: texture,
                color: 0x6699ff, // Azul mais claro para realçar textura
                emissive: 0x000000,
                transparent: false
            });
            
            planet.material = newMaterial;
            planet.material.needsUpdate = true;
            console.log('✓ Textura realista aplicada');
        },
        function(progress) {
            console.log('⏳ Carregando textura...', Math.round((progress.loaded / progress.total) * 100) + '%');
        },
        function(error) {
            console.log('⚠️ Textura não carregou, mantendo cor realista');
        }
    );
}

function createBeautifulStars() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsVertices = [];
    const starsColors = [];
    const starsSizes = [];
    
    // Criar 1500 estrelas com variações realistas
    for (let i = 0; i < 1500; i++) {
        // Posições em esfera ao redor
        const radius = 150 + Math.random() * 200;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        starsVertices.push(x, y, z);
        
        // Cores variadas para as estrelas
        const starType = Math.random();
        if (starType < 0.7) {
            // Estrelas brancas/azuladas (maioria)
            starsColors.push(1, 1, 1);
        } else if (starType < 0.9) {
            // Estrelas amareladas
            starsColors.push(1, 0.9, 0.7);
        } else {
            // Estrelas avermelhadas
            starsColors.push(1, 0.7, 0.5);
        }
        
        // Tamanhos variados
        starsSizes.push(Math.random() * 3 + 1);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    starsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starsColors, 3));
    starsGeometry.setAttribute('size', new THREE.Float32BufferAttribute(starsSizes, 1));
    
    // Material das estrelas com shader personalizado
    const starsMaterial = new THREE.PointsMaterial({
        size: 2,
        sizeAttenuation: false,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
    });
    
    starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);
    console.log('✓ Campo de estrelas realista criado');
}

function setupSmoothControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    // Configurações para controles mais suaves
    controls.enableDamping = true;
    controls.dampingFactor = 0.08; // Mais suave
    controls.rotateSpeed = 0.3; // Velocidade de rotação reduzida
    controls.zoomSpeed = 0.5; // Velocidade de zoom reduzida
    controls.panSpeed = 0.5; // Velocidade de pan reduzida
    
    // Limites
    controls.minDistance = 2.5;
    controls.maxDistance = 12;
    controls.enablePan = false; // Desabilitar pan
    
    // Limites de ângulo para manter foco no planeta
    controls.maxPolarAngle = Math.PI;
    controls.minPolarAngle = 0;
    
    console.log('✓ Controles suaves criados');
}

function setupEvents() {
    // Redimensionamento
    window.addEventListener('resize', handleResize);
    
    // Botões
    const btnPausar = document.getElementById('btnPausar');
    if (btnPausar) btnPausar.addEventListener('click', toggleRotation);
    
    const btnRotateLeft = document.getElementById('btnRotateLeft');
    if (btnRotateLeft) btnRotateLeft.addEventListener('click', () => setRotation(-1));
    
    const btnRotateRight = document.getElementById('btnRotateRight');
    if (btnRotateRight) btnRotateRight.addEventListener('click', () => setRotation(1));
    
    const btnZoomIn = document.getElementById('btnZoomIn');
    if (btnZoomIn) btnZoomIn.addEventListener('click', () => zoom(0.5));
    
    const btnZoomOut = document.getElementById('btnZoomOut');
    if (btnZoomOut) btnZoomOut.addEventListener('click', () => zoom(-0.5));
    
    const btnHome = document.getElementById('btnHome');
    if (btnHome) btnHome.addEventListener('click', resetView);
    
    // Teclado
    document.addEventListener('keydown', (e) => {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                toggleRotation();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                setRotation(-1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                setRotation(1);
                break;
            case 'KeyR':
                e.preventDefault();
                resetView();
                break;
        }
    });
    
    console.log('✓ Eventos configurados');
}

function toggleRotation() {
    isRotating = !isRotating;
    updatePauseButton();
}

function setRotation(direction) {
    rotationDirection = direction;
    isRotating = true;
    updatePauseButton();
}

function zoom(delta) {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    camera.position.addScaledVector(direction, delta);
    
    // Limitar zoom
    const distance = camera.position.length();
    if (distance < 2.5) camera.position.normalize().multiplyScalar(2.5);
    if (distance > 12) camera.position.normalize().multiplyScalar(12);
}

function resetView() {
    camera.position.set(0, 0, 6); // Mesma distância inicial
    camera.lookAt(0, 0, 0);
    if (planet) planet.rotation.set(0, 0, 0.001);
    controls.reset();
    isRotating = true;
    rotationDirection = 1;
    updatePauseButton();
}

function updatePauseButton() {
    const btn = document.getElementById('btnPausar');
    if (!btn) return;
    
    if (isRotating) {
        btn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
                <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
            </svg>
        `;
        btn.title = 'Pausar rotação';
    } else {
        btn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="5,3 19,12 5,21" fill="currentColor"/>
            </svg>
        `;
        btn.title = 'Continuar rotação';
    }
}

function handleResize() {
    const canvas = document.getElementById('canvas3d');
    const rect = canvas.getBoundingClientRect();
    const aspect = rect.width / rect.height;
    
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(rect.width, rect.height);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotação padrão do planeta (mesmo do Mercúrio)
    if (isRotating && planet) {
        // Velocidade padrão igual ao Mercúrio
        planet.rotation.y += 0.002 * rotationDirection; // Mesma velocidade
    }
    
    // Rotação muito sutil das estrelas para efeito dinâmico
    if (starField) {
        starField.rotation.y += 0.0001;
        starField.rotation.x += 0.00005;
    }
    
    // Atualizar controles suaves
    controls.update();
    
    // Renderizar
    renderer.render(scene, camera);
}

function showError(message) {
    const canvas = document.getElementById('canvas3d');
    if (canvas) {
        canvas.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
        canvas.style.display = 'flex';
        canvas.style.alignItems = 'center';
        canvas.style.justifyContent = 'center';
        canvas.innerHTML = `
            <div style="color: white; background: rgba(139, 92, 246, 0.2); padding: 1rem; border-radius: 8px; text-align: center; border: 1px solid rgba(139, 92, 246, 0.3);">
                <strong>Erro no modelo 3D</strong><br>
                <small>${message}</small>
            </div>
        `;
    }
}

console.log('📄 Script Netuno Realista carregado');
