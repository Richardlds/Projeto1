document.addEventListener('DOMContentLoaded', function() {
    // Configurações dos corações
    const heartConfig = {
        count: 50,
        colors: ['#ff4d6d', '#e32636', '#ff6b81', '#ff8fa3'],
        sizes: [15, 30],
        animationDuration: [5, 15],
        opacity: [0.3, 0.8]
    };

    // Elementos principais
    const elements = {
        heart: document.getElementById('heart'),
        startScreen: document.querySelector('.start-screen'),
        mainContent: document.querySelector('.main-content'),
        heartBalloon: document.getElementById('heartBalloon'),
        musicToggle: document.getElementById('musicToggle'),
        bgMusic: document.getElementById('bgMusic')
    };

    // Inicializa corações em todos os containers
    document.querySelectorAll('.hearts-background').forEach(container => {
        createHearts(container, heartConfig);
    });

    // Evento do coração inicial
    elements.heart.addEventListener('click', function() {
        elements.startScreen.classList.add('animate__animated', 'animate__fadeOut');
        playMusic();
        
        setTimeout(() => {
            elements.startScreen.classList.add('hidden');
            elements.mainContent.classList.remove('hidden');
            elements.mainContent.classList.add('animate__animated', 'animate__fadeIn');
            
            initGallery();
            animateElements();
        }, 1000);
    });

    // Evento do balão
    elements.heartBalloon.addEventListener('click', function() {
        this.classList.add('animate__animated', 'animate__zoomOut');
        triggerConfetti();
        setTimeout(() => this.style.display = 'none', 500);
    });

    // Controle de música
    elements.musicToggle.addEventListener('click', toggleMusic);

    // Funções auxiliares
   function createHearts(container, config) {
    for (let i = 0; i < config.count; i++) {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.innerHTML = '❤'; // Adicione esta linha
        
        const size = randomBetween(config.sizes[0], config.sizes[1]);
        const duration = randomBetween(config.animationDuration[0], config.animationDuration[1]);
        const opacity = randomBetween(config.opacity[0], config.opacity[1]);
        const color = config.colors[Math.floor(Math.random() * config.colors.length)];
        
        heart.style.cssText = `
            left: ${Math.random() * 100}%;
            font-size: ${size}px;
            color: ${color};
            opacity: ${opacity};
            animation: falling-hearts ${duration}s linear infinite ${Math.random() * 5}s;
            z-index: -1;
        `;
        
        container.appendChild(heart);
    }
}

    function playMusic() {
        elements.bgMusic.volume = 0.3;
        elements.bgMusic.play().catch(e => console.log("Autoplay não permitido. Clique para tocar música."));
    }

    function toggleMusic() {
        if (elements.bgMusic.paused) {
            elements.bgMusic.play();
            elements.musicToggle.textContent = '🔊 Desligar Música';
        } else {
            elements.bgMusic.pause();
            elements.musicToggle.textContent = '🎵 Ligar Música';
        }
    }

    function initGallery() {
        if (window.lightGallery) {
            lightGallery(document.getElementById('gallery'), {
                selector: '.photo-container',
                download: false,
                counter: false
            });
        }
    }

    function animateElements() {
        document.querySelectorAll('.main-content > *').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate__animated', 'animate__fadeInUp');
            }, 200 * index);
        });
    }

    function triggerConfetti() {
        const settings = {
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff4d6d', '#ff8fa3', '#ffccd5', '#ffffff']
        };

        confetti(settings);
        
        // Confetti laterais
        setTimeout(() => confetti({...settings, angle: 60, origin: { x: 0, y: 0.7 }}), 300);
        setTimeout(() => confetti({...settings, angle: 120, origin: { x: 1, y: 0.7 }}), 600);
    }

    function randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }
});