const START_DATE = new Date('2017-06-18T22:10:00');

function updateCounter() {
    const now = new Date();
    const diff = now.getTime() - START_DATE.getTime();

    if (diff < 0) return;

    const msInYear = 365.25 * 24 * 60 * 60 * 1000;
    const totalYears = Math.floor(diff / msInYear);

    let totalSeconds = Math.floor(diff / 1000);
    let remainingSeconds = totalSeconds % (365 * 24 * 60 * 60);

    const days = Math.floor(remainingSeconds / (24 * 60 * 60));
    const hours = Math.floor((remainingSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
    const seconds = remainingSeconds % 60;

    const yearsEl = document.getElementById('years');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (yearsEl) yearsEl.textContent = totalYears;
    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

const messages = [
    "Cada momento importa, por mais breve que seja.",
    "O tempo passa, mas a nossa história permanece.",
    "Tudo o que vivemos nos trouxe até aqui."
];

let messageIndex = 0;
const messageContainer = document.getElementById('message-container');
const scrollPrompt = document.getElementById('scroll-prompt');
const indicatorNav = document.getElementById('indicator-nav');
const scrollArrow = document.querySelector('.scroll-arrow');

function showNextMessage() {
    if (!messageContainer) {
        if (scrollPrompt) scrollPrompt.style.opacity = 1;
        if (indicatorNav) indicatorNav.classList.add('indicator-visible');
        return;
    }

    if (messageIndex >= messages.length) {
        if (scrollPrompt) scrollPrompt.style.opacity = 1;
        if (indicatorNav) indicatorNav.classList.add('indicator-visible');
        if (scrollArrow) scrollArrow.classList.add('arrow-visible');
        return;
    }

    const text = messages[messageIndex];
    const messageElement = document.createElement('h1');
    messageElement.className = 'message';
    messageElement.textContent = text;

    messageContainer.appendChild(messageElement);

    setTimeout(() => {
        messageElement.classList.add('fade-in-out');
    }, 10);

    messageIndex++;

    setTimeout(() => {
        messageElement.remove();
        showNextMessage();
    }, 4500);
}

function sim() {
    // Registrar o clique com data/hora
    const agora = new Date();
    const dataFormatada = agora.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Mostrar no console (você pode ver apertando F12)
    console.log('🎉 BOTÃO SIM CLICADO!');
    console.log('Data/Hora:', dataFormatada);
    console.log('----------------------------');
    
    // Opção 1: Salvar contador de cliques
    let cliques = parseInt(localStorage.getItem('cliques_sim') || '0');
    cliques++;
    localStorage.setItem('cliques_sim', cliques);
    localStorage.setItem('ultimo_clique', dataFormatada);
    
    console.log('Total de cliques registrados:', cliques);
    
    // Opção 2: Enviar notificação para Telegram
    enviarTelegram(dataFormatada, cliques);
    
    // Mostrar modal customizado
    abrirModal();
}

function abrirModal() {
    const modal = document.getElementById('modal-resposta');
    if (modal) {
        modal.style.display = 'flex';
        // Prevenir scroll do body
        document.body.style.overflow = 'hidden';
    }
}

function fecharModal() {
    const modal = document.getElementById('modal-resposta');
    if (modal) {
        modal.style.display = 'none';
        // Restaurar scroll do body
        document.body.style.overflow = '';
    }
}

// Função para enviar notificação via Telegram
function enviarTelegram(data, totalCliques) {
    // Configure aqui suas credenciais do Telegram
    const BOT_TOKEN = '8454732811:AAFlUaACaDaQtQY2c8lZpHTP1sB_X9Q8ML8'; // Ex: '123456789:ABCdefGHIjklMNOpqrsTUVwxyz'
    const CHAT_ID = '399422255';     // Ex: '123456789'
    
    // Se não configurou, não envia (para não dar erro)
    if (BOT_TOKEN === 'SEU_BOT_TOKEN_AQUI' || CHAT_ID === 'SEU_CHAT_ID_AQUI') {
        console.log('⚠️ Telegram não configurado. Configure BOT_TOKEN e CHAT_ID.');
        return;
    }
    
    const mensagem = `🎉 A PAOLA ACEITOU!\n\n` +
                    `📅 Data/Hora: ${data}\n`;
    
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: mensagem,
            parse_mode: 'Markdown'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log('✅ Notificação enviada para o Telegram!');
        } else {
            console.log('❌ Erro ao enviar:', data.description);
        }
    })
    .catch(err => console.log('❌ Erro ao enviar para Telegram:', err));
}

// Função para ver o histórico (execute no console: verHistorico())
function verHistorico() {
    const cliques = localStorage.getItem('cliques_sim') || '0';
    const ultimoClique = localStorage.getItem('ultimo_clique') || 'Nunca';
    
    console.log('📊 HISTÓRICO DE CLIQUES');
    console.log('Total de cliques:', cliques);
    console.log('Último clique:', ultimoClique);
    
    return {
        total: cliques,
        ultimo: ultimoClique
    };
}

let btnPosicaoOriginal = true;
let btnInicializado = false;

function desvia(btn) {
    // Inicializar o botão na primeira vez
    if (!btnInicializado) {
        btn.style.position = 'relative';
        btn.style.transition = 'left 0.3s ease';
        btn.style.left = '0px';
        btnInicializado = true;
        
        // Pequeno delay para garantir que a transição está aplicada
        setTimeout(() => {
            if (btnPosicaoOriginal) {
                btn.style.left = '200px';
                btnPosicaoOriginal = false;
            }
        }, 10);
        return;
    }
    
    if (btnPosicaoOriginal) {
        btn.style.left = '200px';
        btnPosicaoOriginal = false;
    } else {
        btn.style.left = '0px';
        btnPosicaoOriginal = true;
    }
}

function setupCarousel(carouselId) {
    const carouselElement = document.getElementById(carouselId);
    if (!carouselElement) {
        return;
    }

    const mediaContainer = carouselElement.querySelector('.media-container');
    const indicatorsContainer = carouselElement.querySelector('.indicators');
    const prevBtn = carouselElement.querySelector('.nav-button.left');
    const nextBtn = carouselElement.querySelector('.nav-button.right');
    const mediaItems = carouselElement.querySelectorAll('.media-item');
    
    if (!mediaContainer || !indicatorsContainer || !prevBtn || !nextBtn || mediaItems.length === 0) {
        return;
    }
    
    // Preparar todos os vídeos
    mediaItems.forEach(item => {
        const video = item.querySelector('video');
        if (video) {
            video.style.opacity = '0';
            
            const showVideo = () => {
                video.classList.add('loaded');
                video.style.opacity = '1';
            };
            
            // Múltiplos eventos para garantir carregamento
            video.addEventListener('loadedmetadata', showVideo);
            video.addEventListener('loadeddata', showVideo);
            video.addEventListener('canplay', showVideo);
            
            // Se já estiver carregado, mostrar imediatamente
            if (video.readyState >= 2) {
                showVideo();
            } else {
                video.load();
            }
        }
    });
    
    let currentIndex = 0;
    const totalSlides = mediaItems.length;

    // Criar os dots antes de usá-los
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) {
            dot.classList.add('active');
        }
        indicatorsContainer.appendChild(dot);
    }
    const dots = indicatorsContainer.querySelectorAll('.dot');

    function stopAllMedia() {
        mediaItems.forEach(item => {
            const video = item.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });
    }

    function goToSlide(index) {
        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 1;

        currentIndex = index;
        const offset = -currentIndex * 100;
        mediaContainer.style.transform = `translateX(${offset}%)`;

        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === currentIndex) {
                dot.classList.add('active');
            }
        });
        
        stopAllMedia();
    }
    
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    let startX;
    let currentX;
    let isDragging = false;

    mediaContainer.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        mediaContainer.style.transition = 'none';
    });

    mediaContainer.addEventListener('mousemove', (e) => {
        if (!isDragging || !startX) return;
        currentX = e.clientX;
        const diffX = currentX - startX;
        mediaContainer.style.transform = `translateX(calc(${(-currentIndex * 100)}% + ${diffX}px))`;
    });

    mediaContainer.addEventListener('mouseup', (e) => {
        if (!isDragging || !startX) return;
        const diffX = e.clientX - startX;
        mediaContainer.style.transition = 'transform 0.3s ease-in-out';
        isDragging = false;
        startX = null;
        
        const SWIPE_THRESHOLD = 50; 

        if (diffX > SWIPE_THRESHOLD) {
            prevSlide();
        } else if (diffX < -SWIPE_THRESHOLD) {
            nextSlide();
        } else {
            goToSlide(currentIndex);
        }
    });

    mediaContainer.addEventListener('mouseleave', () => {
        if (isDragging) {
            mediaContainer.style.transition = 'transform 0.3s ease-in-out';
            goToSlide(currentIndex);
            isDragging = false;
            startX = null;
        }
    });
    
    mediaContainer.addEventListener('dragstart', (e) => e.preventDefault());

    // Inicializar no primeiro slide
    goToSlide(0);
}

document.addEventListener('DOMContentLoaded', () => {
    
    const sections = document.querySelectorAll('.section');
    const indicatorDots = document.querySelectorAll('.indicator-dot');

    const options = {
        threshold: 0.6
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.id;

                indicatorDots.forEach(dot => {
                    dot.classList.remove('active-dot');
                    dot.classList.add('inactive-dot');
                });

                const currentDot = document.querySelector(`.indicator-dot[href="#${currentSectionId}"]`);
                if (currentDot) {
                    currentDot.classList.add('active-dot');
                    currentDot.classList.remove('inactive-dot');
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    indicatorDots.forEach(dot => {
        dot.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    const nextSection = document.getElementById('section2');
    if (scrollArrow && nextSection) {
        scrollArrow.addEventListener('click', () => {
            nextSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    setupCarousel('meu-carrossel-1');
    setupCarousel('meu-carrossel-2');
});

updateCounter();
setInterval(updateCounter, 1000);
showNextMessage();
