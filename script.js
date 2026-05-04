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

// ===================== DROPDOWN HOVER FIX =====================
let dropdownTimeout;
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const content = dropdown.querySelector('.dropdown-content');
    
    dropdown.addEventListener('mouseenter', () => {
        clearTimeout(dropdownTimeout);
        
        // Close all other dropdowns
        dropdowns.forEach(d => {
            if (d !== dropdown) {
                d.classList.remove('show');
            }
        });
        
        // Open this dropdown
        dropdown.classList.add('show');
    });
    
    dropdown.addEventListener('mouseleave', () => {
        dropdownTimeout = setTimeout(() => {
            dropdown.classList.remove('show');
        }, 100); // Close after 100ms of leaving
    });
    
    // Also close when clicking a link in the dropdown
    if (content) {
        content.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                dropdown.classList.remove('show');
            });
        });
    }
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
    const form = e.target;
    const msg = document.getElementById('formMsg');
    const formData = new FormData(form);

    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const subjectRaw = (formData.get('subject') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    if (!name || !email || !message) {
        msg.textContent = 'Please fill in name, email, and message.';
        return;
    }

    const subject = subjectRaw || 'Smart Farmer Website Enquiry';
    const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        'Message:',
        message
    ].join('\n');

    const mailtoUrl = `mailto:chathuniyasassri@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    msg.textContent = 'Opening your email app with a pre-filled draft...';
    form.reset();
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
