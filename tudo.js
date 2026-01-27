// ========== CURSOR PERSONALIZADO ==========
const customCursor = document.getElementById('custom-cursor');
const cursorDot = document.getElementById('cursor-dot');

document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
    
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

// Efeito hover em elementos interativos
const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        customCursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        customCursor.classList.remove('hover');
    });
});

// ========== PARTÍCULAS DE FUNDO ==========
const particlesCanvas = document.getElementById('particles-canvas');
const pCtx = particlesCanvas.getContext('2d');
let particles = [];
let particleCount = 80;

function resizeParticlesCanvas() {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = document.body.scrollHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * particlesCanvas.width;
        this.y = Math.random() * particlesCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.hue = Math.random() * 60 + 180; // Tons de azul/ciano
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > particlesCanvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > particlesCanvas.height) this.speedY *= -1;
    }

    draw() {
        pCtx.beginPath();
        pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        pCtx.fillStyle = `hsla(${this.hue}, 100%, 70%, ${this.opacity})`;
        pCtx.shadowBlur = 10;
        pCtx.shadowColor = `hsl(${this.hue}, 100%, 70%)`;
        pCtx.fill();
        pCtx.shadowBlur = 0;
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                pCtx.beginPath();
                pCtx.strokeStyle = `rgba(0, 217, 255, ${0.15 * (1 - distance / 120)})`;
                pCtx.lineWidth = 0.5;
                pCtx.moveTo(particles[i].x, particles[i].y);
                pCtx.lineTo(particles[j].x, particles[j].y);
                pCtx.stroke();
            }
        }
    }
}

function animateParticles() {
    pCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    connectParticles();
    requestAnimationFrame(animateParticles);
}

// ========== SCROLL REVEAL PROFISSIONAL ==========
function revealOnScroll() {
    const revealSections = document.querySelectorAll('.reveal-section');
    
    revealSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add('active');
        }
    });
}

// ========== EFEITO DE DIGITAÇÃO PROFISSIONAL ==========
class TypeWriter {
    constructor(element, speed = 50) {
        this.element = element;
        this.text = element.getAttribute('data-text') || element.textContent;
        this.speed = speed;
        this.isTyping = false;
    }
    
    async type() {
        if (this.isTyping) return;
        this.isTyping = true;
        
        this.element.textContent = '';
        this.element.style.opacity = '1';
        
        for (let i = 0; i < this.text.length; i++) {
            this.element.textContent += this.text.charAt(i);
            await new Promise(resolve => setTimeout(resolve, this.speed));
        }
        
        this.isTyping = false;
    }
}

// Inicializar efeito de digitação para elementos visíveis
function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-text');
    const observers = new Map();
    
    typingElements.forEach((element, index) => {
        const typewriter = new TypeWriter(element, 50);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !element.dataset.typed) {
                    setTimeout(() => {
                        typewriter.type();
                        element.dataset.typed = 'true';
                    }, index * 200);
                }
            });
        }, {
            threshold: 0.3
        });
        
        observer.observe(element);
        observers.set(element, observer);
    });
}

// Efeito de digitação para parágrafos longos
function typeWriteParagraphs() {
    const paragraphs = document.querySelectorAll('[data-typing="true"]');
    
    paragraphs.forEach((p, idx) => {
        const text = p.textContent.trim();
        p.textContent = '';
        p.style.opacity = '1';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !p.dataset.typed) {
                    p.dataset.typed = 'true';
                    let i = 0;
                    
                    const typeInterval = setInterval(() => {
                        if (i < text.length) {
                            p.textContent += text.charAt(i);
                            i++;
                        } else {
                            clearInterval(typeInterval);
                        }
                    }, 20);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(p);
    });
}

// ========== HIGHLIGHT ACTIVE NAV LINK ==========
const sections = document.querySelectorAll('main section');
const navLinksScroll = document.querySelectorAll('.nav-links a');

function setActiveLink() {
    let index = sections.length;
    while (--index && window.scrollY + 150 < sections[index].offsetTop) {}
    navLinksScroll.forEach(link => link.classList.remove('active'));
    if (navLinksScroll[index]) navLinksScroll[index].classList.add('active');
}

// Event listeners para scroll
window.addEventListener('scroll', () => {
    setActiveLink();
    revealOnScroll();
});

// Scroll suave ao clicar nos links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== SPACESHIP ANIMATION (REMOVIDA PARA HERO LIMPO) ==========
// Mantendo apenas para compatibilidade, mas não será exibido no hero

// ========== SCROLL REVEAL ANIMATION ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar canvas de partículas
    resizeParticlesCanvas();
    initParticles();
    animateParticles();
    
    // Iniciar reveal on scroll
    revealOnScroll();
    
    // Iniciar efeito de digitação
    initTypingEffect();
    typeWriteParagraphs();
    
    // Revelar primeira seção imediatamente
    const firstSection = document.querySelector('.reveal-section');
    if (firstSection) {
        setTimeout(() => {
            firstSection.classList.add('active');
        }, 300);
    }
});

window.addEventListener('resize', () => {
    resizeParticlesCanvas();
    initParticles();
});

// ========== NAV LINKS HIGHLIGHT ==========
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.classList.remove('active'));
        e.currentTarget.classList.add('active');
    });
});

// ========== CONTADOR DE PROGRESSO DE SCROLL ==========
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Efeito de paralaxe na foto do hero
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const scrollPosition = window.pageYOffset;
        heroSection.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        heroSection.style.opacity = 1 - (scrollPosition / 800);
    }
});

// ========== CONTROLE DO CARROSSEL 3D DE HABILIDADES ==========
let isRotating = true;
const innerSkills = document.querySelector('.inner-skills');
const wrapperSkills = document.querySelector('.wrapper-skills');
let expandedCard = null;

// Função para expandir card
function expandCard(card) {
    if (expandedCard) {
        expandedCard.classList.remove('expanded');
    }
    
    card.classList.add('expanded');
    expandedCard = card;
    
    // Pausar rotação
    if (innerSkills) {
        innerSkills.style.animationPlayState = 'paused';
    }
}

// Função para fechar card
function closeCard() {
    if (expandedCard) {
        expandedCard.classList.remove('expanded');
        expandedCard = null;
    }
    
    // Retomar rotação se estava ativa
    if (isRotating && innerSkills) {
        innerSkills.style.animationPlayState = 'running';
    }
}

// Adicionar eventos nos cards
const skillCards = document.querySelectorAll('.card-skill');
skillCards.forEach(card => {
    card.addEventListener('click', (e) => {
        e.stopPropagation();
        if (card.classList.contains('expanded')) {
            closeCard();
        } else {
            expandCard(card);
        }
    });
});

// Fechar com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && expandedCard) {
        closeCard();
    }
});

// Clique para pausar/retomar rotação (apenas no wrapper, não nos cards)
if (wrapperSkills) {
    wrapperSkills.addEventListener('click', (e) => {
        // Não fazer nada se clicou em um card
        if (e.target.closest('.card-skill')) {
            return;
        }
        
        isRotating = !isRotating;
        if (innerSkills) {
            innerSkills.style.animationPlayState = isRotating ? 'running' : 'paused';
        }
    });
    
    // Adicionar indicador visual
    const indicator = document.createElement('div');
    indicator.className = 'rotation-indicator';
    indicator.innerHTML = '▶ Clique para pausar/retomar';
    indicator.style.cssText = `
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        color: #00d9ff;
        font-size: 0.9rem;
        opacity: 0.7;
        transition: opacity 0.3s ease;
        pointer-events: none;
        z-index: 10;
        background: rgba(0, 0, 0, 0.5);
        padding: 8px 16px;
        border-radius: 20px;
        border: 1px solid rgba(0, 217, 255, 0.3);
    `;
    wrapperSkills.appendChild(indicator);
    
    wrapperSkills.addEventListener('mouseenter', () => {
        if (!expandedCard) {
            indicator.style.opacity = '1';
        }
    });
    
    wrapperSkills.addEventListener('mouseleave', () => {
        indicator.style.opacity = '0.7';
    });
}

// ========== EFEITO DE DIGITAÇÃO NO H1 ==========
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ========== CONTADOR DE SKILLS (efeito de loading) ==========
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start) + '%';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ========== EFEITO DE CLIQUE COM RIPPLE ==========
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(0, 217, 255, 0.5)';
    ripple.style.left = e.clientX - 10 + 'px';
    ripple.style.top = e.clientY - 10 + 'px';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'rippleEffect 0.6s ease-out';
    ripple.style.zIndex = '9999';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// CSS da animação do ripple via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);