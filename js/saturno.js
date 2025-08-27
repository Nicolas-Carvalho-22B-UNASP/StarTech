let scene, camera, renderer, planet, rings, starField, controls;
let isRotating = true;
let rotationDirection = 1;


document.addEventListener('DOMContentLoaded', function() {

    initSaturno();
});

function initSaturno() {
    console.log('🚀 Iniciando Saturno 3D Realista...');


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
        createSaturnRings();
        createBeautifulStars();
        setupSmoothControls();
        setupEvents();
        animate();

        console.log('✅ Saturno 3D Realista iniciado com sucesso!');
    } catch (error) {
        console.error('❌ Erro:', error);
        showError('Erro: ' + error.message);
    }
}

function setupScene(canvas) {
    scene = new THREE.Scene();

    scene.background = new THREE.Color(0x000005);
    console.log('✓ Cena criada');
}

function setupCamera(canvas) {

    const rect = canvas.getBoundingClientRect();
    const aspect = rect.width / rect.height;


    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    camera.position.set(0, 0, 6);
    console.log('✓ Câmera criada');
}

function setupRenderer(canvas) {
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: false
    });


    const rect = canvas.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 0.6;

    console.log('✓ Renderer realista criado');
}

function setupRealisticLights() {

    const ambientLight = new THREE.AmbientLight(0x202040, 0.1);
    scene.add(ambientLight);


    const sunLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
    sunLight.position.set(8, 3, 4);
    sunLight.castShadow = true;


    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 50;
    sunLight.shadow.camera.left = -10;
    sunLight.shadow.camera.right = 10;
    sunLight.shadow.camera.top = 10;
    sunLight.shadow.camera.bottom = -10;
    sunLight.shadow.bias = -0.0001;
    scene.add(sunLight);


    const fillLight = new THREE.DirectionalLight(0x4a5568, 0.15);
    fillLight.position.set(-5, -2, -3);
    scene.add(fillLight);

    console.log('✓ Iluminação realista criada');
}

function createRealisticPlanet() {

    const geometry = new THREE.SphereGeometry(1.6, 64, 64);


    const material = new THREE.MeshLambertMaterial({
        color: 0xfad5a5,
        emissive: 0x000000,
        transparent: false
    });

    planet = new THREE.Mesh(geometry, material);
    planet.castShadow = true;
    planet.receiveShadow = true;


    planet.rotation.z = 0.001;

    scene.add(planet);
    console.log('✓ Planeta realista criado');


    const loader = new THREE.TextureLoader();
    loader.load(
        '../images/saturno/saturn_texture.jpg',
        function(texture) {

            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();


            const newMaterial = new THREE.MeshLambertMaterial({
                map: texture,
                color: 0xffffff,
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

function createSaturnRings() {

    const ringGroup = new THREE.Group();


    const mainRingGeometry = new THREE.RingGeometry(2.1, 3.2, 128);
    const mainRingMaterial = new THREE.MeshLambertMaterial({
        color: 0xd4a574,
        transparent: true,
        opacity: 0.75,
        side: THREE.DoubleSide
    });

    const mainRing = new THREE.Mesh(mainRingGeometry, mainRingMaterial);
    ringGroup.add(mainRing);


    const outerRingGeometry = new THREE.RingGeometry(3.3, 3.8, 128);
    const outerRingMaterial = new THREE.MeshLambertMaterial({
        color: 0xc8b39e,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide
    });

    const outerRing = new THREE.Mesh(outerRingGeometry, outerRingMaterial);
    ringGroup.add(outerRing);


    ringGroup.rotation.x = Math.PI / 2;
    ringGroup.rotation.z = 0.001;

    rings = ringGroup;
    scene.add(rings);
    console.log('✓ Anéis melhorados de Saturno criados');


    const loader = new THREE.TextureLoader();
    loader.load(
        '../images/saturno/saturn_rings.jpg',
        function(texture) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

            const newRingMaterial = new THREE.MeshLambertMaterial({
                map: texture,
                transparent: true,
                opacity: 0.9,
                side: THREE.DoubleSide,
                color: 0xffffff
            });

            rings.material = newRingMaterial;
            rings.material.needsUpdate = true;
            console.log('✓ Textura dos anéis aplicada');
        },
        function(progress) {
            console.log('⏳ Carregando textura dos anéis...', Math.round((progress.loaded / progress.total) * 100) + '%');
        },
        function(error) {
            console.log('⚠️ Textura dos anéis não carregou, mantendo cor padrão');
        }
    );
}

function createBeautifulStars() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsVertices = [];
    const starsColors = [];
    const starsSizes = [];


    for (let i = 0; i < 1500; i++) {

        const radius = 150 + Math.random() * 200;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        starsVertices.push(x, y, z);


        const starType = Math.random();
        if (starType < 0.7) {

            starsColors.push(1, 1, 1);
        } else if (starType < 0.9) {

            starsColors.push(1, 0.9, 0.7);
        } else {

            starsColors.push(1, 0.7, 0.5);
        }


        starsSizes.push(Math.random() * 3 + 1);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    starsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starsColors, 3));
    starsGeometry.setAttribute('size', new THREE.Float32BufferAttribute(starsSizes, 1));


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


    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.3;
    controls.zoomSpeed = 0.5;
    controls.panSpeed = 0.5;


    controls.minDistance = 2.5;
    controls.maxDistance = 12;
    controls.enablePan = false;


    controls.maxPolarAngle = Math.PI;
    controls.minPolarAngle = 0;

    console.log('✓ Controles suaves criados');
}

function setupEvents() {

    window.addEventListener('resize', handleResize);


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


    const distance = camera.position.length();
    if (distance < 2.5) camera.position.normalize().multiplyScalar(2.5);
    if (distance > 12) camera.position.normalize().multiplyScalar(12);
}

function resetView() {
    camera.position.set(0, 0, 6);
    camera.lookAt(0, 0, 0);
    if (planet) planet.rotation.set(0, 0, 0.001);
    if (rings) {
        rings.rotation.x = Math.PI / 2;
        rings.rotation.z = 0.001;
    }
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


    if (isRotating && planet) {

        planet.rotation.y += 0.002 * rotationDirection;
    }


    if (isRotating && rings) {
        rings.rotation.z += 0.0003 * rotationDirection;
    }


    if (starField) {
        starField.rotation.y += 0.0001;
        starField.rotation.x += 0.00005;
    }


    controls.update();


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

console.log('📄 Script Saturno Realista carregado');
