// Navigation Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Floating Particles Animation
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random starting position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random color variation
    const colors = ['#00d4ff', '#8b5cf6', '#ffffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = `radial-gradient(circle, ${color}, transparent)`;
    
    document.querySelector('.particles-container').appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 20000);
}

// Create particles continuously
setInterval(createParticle, 300);

// Initial particles
for (let i = 0; i < 20; i++) {
    setTimeout(createParticle, i * 100);
}

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling for navigation links
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

// Enhanced navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.borderBottomColor = 'rgba(0, 212, 255, 0.4)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.borderBottomColor = 'rgba(0, 212, 255, 0.2)';
        navbar.style.boxShadow = 'none';
    }
});

// Form submission handler with enhanced effects
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (name && email && message) {
        const submitBtn = document.querySelector('.submit-button');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Add loading state
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.background = 'linear-gradient(45deg, #666, #888)';
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.querySelector('span').textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(45deg, #00ff88, #00cc66)';
            
            // Create success particles
            createSuccessParticles();
            
            setTimeout(() => {
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = 'linear-gradient(45deg, #00d4ff, #8b5cf6)';
                this.reset();
                // Reset email field to original value
                document.getElementById('email').value = 'rajibabu1184@gmail.com';
            }, 3000);
        }, 2000);
    }
});

// Success particles for form submission
function createSuccessParticles() {
    const colors = ['#00ff88', '#00d4ff', '#8b5cf6'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: 50%;
                top: 70%;
                animation: successBurst 1s ease-out forwards;
            `;
            
            const angle = (i / 15) * Math.PI * 2;
            const velocity = 100 + Math.random() * 50;
            
            particle.style.setProperty('--dx', Math.cos(angle) * velocity + 'px');
            particle.style.setProperty('--dy', Math.sin(angle) * velocity + 'px');
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1000);
        }, i * 50);
    }
}

// Add success burst animation
const successStyle = document.createElement('style');
successStyle.textContent = `
@keyframes successBurst {
    0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
    100% {
        transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0);
        opacity: 0;
    }
}
`;
document.head.appendChild(successStyle);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Enhanced hover effects for feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Create hover particles
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                const rect = this.getBoundingClientRect();
                
                particle.style.cssText = `
                    position: fixed;
                    width: 4px;
                    height: 4px;
                    background: radial-gradient(circle, #00d4ff, transparent);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                    left: ${rect.left + Math.random() * rect.width}px;
                    top: ${rect.top + Math.random() * rect.height}px;
                    animation: cardHoverParticle 1s ease-out forwards;
                `;
                
                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 1000);
            }, i * 100);
        }
    });
});

// Add card hover particle animation
const cardHoverStyle = document.createElement('style');
cardHoverStyle.textContent = `
@keyframes cardHoverParticle {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    100% {
        transform: scale(0) translateY(-50px);
        opacity: 0;
    }
}
`;
document.head.appendChild(cardHoverStyle);

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '2px solid #00d4ff';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }
    type();
}

// Initialize typing effect when hero comes into view
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const heroTitle = document.querySelector('.hero-title');
            const titleText = 'Defend Your Digital World';
            typeWriter(heroTitle, titleText, 120);
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

heroObserver.observe(document.querySelector('.hero'));

// Add glitch effect to logo on hover
const logo = document.querySelector('.logo-text');
if (logo) {
    logo.addEventListener('mouseenter', () => {
        logo.style.animation = 'glitch 0.5s ease-in-out';
    });
    
    logo.addEventListener('animationend', () => {
        logo.style.animation = '';
    });
}

// Add CSS for glitch effect
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
@keyframes glitch {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
}
`;
document.head.appendChild(glitchStyle);

// Mouse trail effect
let mouseTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (mouseTrail.length > maxTrailLength) {
        mouseTrail.shift();
    }
    
    updateMouseTrail();
});

function updateMouseTrail() {
    const existingTrails = document.querySelectorAll('.mouse-trail');
    existingTrails.forEach(el => el.remove());
    
    mouseTrail.forEach((point, index) => {
        const trailElement = document.createElement('div');
        trailElement.className = 'mouse-trail';
        const opacity = (index / mouseTrail.length) * 0.5;
        const size = (index / mouseTrail.length) * 8 + 2;
        
        trailElement.style.cssText = `
            position: fixed;
            left: ${point.x}px;
            top: ${point.y}px;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(0,212,255,${opacity}), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(trailElement);
        
        setTimeout(() => {
            if (trailElement.parentNode) {
                trailElement.remove();
            }
        }, 100);
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        const isPercentage = target.includes('%');
        const isTime = target.includes('/');
        
        if (!isPercentage && !isTime && target !== '0') {
            const numericTarget = parseFloat(target);
            let current = 0;
            const increment = numericTarget / 100;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericTarget) {
                    current = numericTarget;
                    clearInterval(timer);
                }
                stat.textContent = current.toFixed(1) + (target.includes('%') ? '%' : '');
            }, 20);
        }
    });
}

// Trigger stats animation when about section comes into view
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    aboutObserver.observe(aboutSection);
}