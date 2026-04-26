// ===================== SMOOTH SCROLL =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const hash = this.getAttribute('href');
        if (hash && hash !== '#') {
            e.preventDefault();
            const target = document.querySelector(hash);
            if (target) {
                window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
                // Close mobile nav on link click
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
            }
        }
    });
});

// ===================== NAVBAR SCROLL =====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ===================== HAMBURGER MENU =====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// ===================== SCROLL REVEAL =====================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, entry.target.dataset.delay || 0);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left').forEach((el, i) => {
    el.dataset.delay = (i % 4) * 80;
    revealObserver.observe(el);
});

// ===================== HERO PARTICLES =====================
const particleContainer = document.getElementById('particles');
const particleCount = 18;

for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 5 + 3;
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 10;
    const delay = Math.random() * 15;
    p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: -${delay}s;
    `;
    particleContainer.appendChild(p);
}

// ===================== STAGGER CARDS =====================
document.querySelectorAll('.grid-container .card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
});

document.querySelectorAll('.docs-grid .doc-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
});

// ===================== METHODOLOGY TABS =====================
document.querySelectorAll('.mtab').forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        document.querySelectorAll('.mtab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.mtab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(target).classList.add('active');
    });
});

// ===================== CONTACT FORM =====================
function handleForm(e) {
    e.preventDefault();
    const msg = document.getElementById('formMsg');
    msg.textContent = '✅ Message sent! We will get back to you shortly.';
    e.target.reset();
    setTimeout(() => { msg.textContent = ''; }, 5000);
}

// ===================== ACTIVE NAV HIGHLIGHT =====================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links > li > a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navAnchors.forEach(a => {
        a.classList.toggle('nav-active', a.getAttribute('href') === '#' + current);
    });
}, { passive: true });

console.log('Smart Farmer Website Loaded.');
