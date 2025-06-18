// Highlight active nav link on scroll
const sections = document.querySelectorAll('main section');
const navLinksScroll = document.querySelectorAll('.nav-links a');

function setActiveLink() {
    let index = sections.length;
    while (--index && window.scrollY + 100 < sections[index].offsetTop) {}
    navLinksScroll.forEach(link => link.classList.remove('active'));
    if (navLinksScroll[index]) navLinksScroll[index].classList.add('active');
}
window.addEventListener('scroll', setActiveLink);

// Spaceship animation in 'Sobre' background
const canvas = document.getElementById('spaceship-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let stars = [];
let starCount = 80;
let spaceship = {
    x: 0,
    y: 0,
    width: 80,
    height: 40,
    speed: 1.5,
};

function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width;
    canvas.height = height;
}

class Star {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 1.3 + 0.3;
        this.speed = Math.random() * 0.3 + 0.1;
        this.opacity = Math.random() * 0.8 + 0.2;
    }
    update() {
        this.x -= this.speed;
        if (this.x < 0) this.x = width;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 5;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.shadowBlur = 0;
    }
}

function drawSpaceship(x, y) {
    // Simple spaceship shape (triangular and circle)
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = '#38bdf8'; // cyan color
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2;
    // body
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(spaceship.width * 0.8, spaceship.height / 2);
    ctx.lineTo(0, spaceship.height);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // window
    ctx.beginPath();
    ctx.fillStyle = '#a5f3fc';
    ctx.arc(spaceship.width * 0.25, spaceship.height / 2, spaceship.height * 0.25, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}

function initStars() {
    stars = [];
    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    // Draw stars
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    // Update spaceship position
    spaceship.x += spaceship.speed;
    if (spaceship.x > width + spaceship.width) {
        spaceship.x = -spaceship.width;
        spaceship.y = Math.random() * (height - spaceship.height);
        if (spaceship.y < 20) spaceship.y = 20;
    }

    drawSpaceship(spaceship.x, spaceship.y);

    requestAnimationFrame(animate);
}

function startAnimation() {
    resize();
    initStars();
    spaceship.x = -spaceship.width;
    spaceship.y = height / 2 - spaceship.height / 2;
    animate();
}

window.addEventListener('resize', () => {
    resize();
    initStars();
});

document.addEventListener('DOMContentLoaded', () => {
    startAnimation();
});

// Highlight nav links on click or keyboard navigation
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.classList.remove('active'));
        e.currentTarget.classList.add('active');
    });
});