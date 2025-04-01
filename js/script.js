
// Inicialização
document.addEventListener('DOMContentLoaded', function () {
    initCursor();
    initTypingEffect();
    initScrollTriggers();
    initThemeToggle();
    initNavigation();
    initBackgroundParticles();
    initPhoneMockup();
});

// Efeito de cursor personalizado
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    document.addEventListener('mousemove', function (e) {
        gsap.to(cursor, {
            duration: 0.5,
            x: e.clientX,
            y: e.clientY,
            ease: "power3.out"
        });

        gsap.to(cursorDot, {
            duration: 0.1,
            x: e.clientX,
            y: e.clientY,
            ease: "power3.out"
        });
    });

    document.addEventListener('mousedown', function () {
        cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
        cursor.style.borderColor = "var(--secondary)";
    });

    document.addEventListener('mouseup', function () {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
        cursor.style.borderColor = "var(--primary)";
    });

    // Efeito hover nos botões e elementos interativos
    const interactiveElements = document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .nav-item, .feature-card, .testimonial-card, .app-store-btn, .play-store-btn, .mode-toggle, .nav-toggle');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function () {
            cursor.style.width = "50px";
            cursor.style.height = "50px";
            cursor.style.borderColor = "var(--secondary)";
            cursorDot.style.backgroundColor = "var(--secondary)";
        });

        el.addEventListener('mouseleave', function () {
            cursor.style.width = "30px";
            cursor.style.height = "30px";
            cursor.style.borderColor = "var(--primary)";
            cursorDot.style.backgroundColor = "var(--primary)";
        });
    });
}

// Efeito de digitação no título
function initTypingEffect() {
    const text = "Controle suas finanças. Realize seus sonhos.";
    const typingText = document.getElementById('typing-text');
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingText.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 70);
        }
    }

    typeWriter();
}

// ScrollTrigger para animações
function initScrollTriggers() {
    gsap.registerPlugin(ScrollTrigger);

    // Animação das feature cards
    gsap.utils.toArray('.feature-card').forEach((card, i) => {
        const delay = card.getAttribute('data-delay') || 0;

        gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: parseFloat(delay),
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });

    // Animação das testimonial cards
    gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
        const delay = card.getAttribute('data-delay') || 0;

        gsap.from(card, {
            x: 100,
            opacity: 0,
            duration: 0.8,
            delay: parseFloat(delay),
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });

    // Animação do phone mockup
    gsap.from('#phoneMockup', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
            trigger: '#hero',
            start: "top 50%",
            toggleActions: "play none none none"
        }
    });
}

// Toggle de tema claro/escuro
function initThemeToggle() {
    const modeToggle = document.getElementById('modeToggle');

    modeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');

        // Animação do toggle
        gsap.to(modeToggle, {
            rotation: document.body.classList.contains('dark-mode') ? 360 : 0,
            duration: 0.6,
            ease: "back.out(1.7)"
        });
    });
}

// Navegação
function initNavigation() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.querySelector('.nav-toggle');
    const navItems = document.querySelectorAll('.nav-item');

    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('nav-open');
    });

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remover classe 'active' de todos os itens
            navItems.forEach(i => i.classList.remove('active'));

            // Adicionar classe 'active' ao item clicado
            this.classList.add('active');

            // Fechar o menu
            navMenu.classList.remove('nav-open');

            // Scroll até a seção
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);

            if (section) {
                window.scrollTo({
                    top: section.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Atualizar navegação ao rolar
    window.addEventListener('scroll', function () {
        const sections = ['hero', 'features', 'testimonials', 'download'];
        let currentSection = '';

        sections.forEach(section => {
            const el = document.getElementById(section);
            const rect = el.getBoundingClientRect();

            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSection = section;
            }
        });

        if (currentSection) {
            navItems.forEach(item => {
                item.classList.remove('active');

                if (item.getAttribute('data-section') === currentSection) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Background de partículas
function initBackgroundParticles() {
    const container = document.getElementById('canvas-container');

    // Configurar Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Partículas
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = window.innerWidth > 768 ? 1500 : 800;

    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 10;
        posArray[i + 1] = (Math.random() - 0.5) * 10;
        posArray[i + 2] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material das partículas
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.01,
        transparent: true,
        color: 0x5642da,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    // Criar as partículas
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Posicionar câmera
    camera.position.z = 3;

    // Mouse move para interatividade
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = (event.clientY / window.innerHeight) * 2 - 1;
    });

    // Função de animação
    function animate() {
        requestAnimationFrame(animate);

        // Rotação suave das partículas
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;

        // Movimento baseado no mouse
        particlesMesh.rotation.x += mouseY * 0.0003;
        particlesMesh.rotation.y += mouseX * 0.0003;

        // Atualizar a cor conforme o tema
        if (document.body.classList.contains('dark-mode')) {
            particlesMaterial.color.set(0x7a5cf7);
        } else {
            particlesMaterial.color.set(0x5642da);
        }

        renderer.render(scene, camera);
    }

    animate();

    // Redimensionar
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Animação do Phone Mockup
function initPhoneMockup() {
    const phoneMockup = document.getElementById('phoneMockup');

    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

        gsap.to(phoneMockup, {
            rotationY: xAxis,
            rotationX: yAxis,
            duration: 0.5,
            ease: "power2.out"
        });
    });

    // Animação de scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroSection = document.getElementById('hero');
        const heroHeight = heroSection.offsetHeight;

        if (scrollPosition <= heroHeight) {
            const rotationValue = scrollPosition / 20;

            gsap.to(phoneMockup, {
                rotationY: rotationValue,
                duration: 0.5,
                ease: "power2.out"
            });
        }
    });
}