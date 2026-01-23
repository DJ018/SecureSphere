// ===== MATRIX BACKGROUND ANIMATION =====
function createMatrixEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const matrixBg = document.getElementById('matrixBg');

    if (!matrixBg) return;

    matrixBg.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#22d3ee';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize matrix effect on load
document.addEventListener('DOMContentLoaded', createMatrixEffect);

// ===== ANIMATED COUNTER FOR STATS =====
function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target % 1 === 0 ? target : target.toFixed(1);
        }
    };

    updateCounter();
}

// Trigger counter animation when stats come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                if (counter.textContent === '0') {
                    animateCounter(counter);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe hero stats
document.addEventListener('DOMContentLoaded', () => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
});

// ===== SMOOTH SCROLL FUNCTION =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.85)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value,
            source: 'homepage'
        };

        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;

        try {
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                formMessage.className = 'form-message success';
                formMessage.innerHTML = `
          ✅ <strong>Thank you for reaching out!</strong><br>
          Your message has been received. Ticket ID: <strong>${result.ticketId}</strong><br>
          We'll contact you at <strong>${formData.email}</strong> within 24 hours.
        `;
                contactForm.reset();
                showToast('Message sent successfully! 🎉');
            } else {
                formMessage.className = 'form-message error';
                formMessage.textContent = `❌ ${result.error || 'Failed to send message. Please try again.'}`;
            }
        } catch (error) {
            formMessage.className = 'form-message error';
            formMessage.textContent = '❌ Network error. Please check your connection and try again.';
            console.error('Form submission error:', error);
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 10000);
        }
    });
}

// ===== TOAST NOTIFICATION =====
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// ===== SCROLL REVEAL ANIMATION =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all sections for reveal animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.features, .portfolio-preview, .learning-section, .testimonials, .demo-section, .contact-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(section);
    });
});

// ===== TERMINAL TYPING ANIMATION =====
document.addEventListener('DOMContentLoaded', () => {
    const terminalBody = document.getElementById('terminalBody');
    if (!terminalBody) return;

    const lines = [
        { text: '$ securesphere --scan target.com', delay: 0 },
        { text: 'Initializing security scan...', delay: 1000 },
        { text: '✓ Port scanning complete', delay: 2000, class: 'success' },
        { text: '✓ Vulnerability assessment complete', delay: 3000, class: 'success' },
        { text: '⚠ 3 medium-risk vulnerabilities found', delay: 4000, class: 'warning' },
        { text: 'Generating report...', delay: 5000 },
        { text: '█', delay: 6000, class: 'cursor' }
    ];

    terminalBody.innerHTML = '';

    lines.forEach(line => {
        setTimeout(() => {
            const lineElement = document.createElement('div');
            lineElement.className = `terminal-line ${line.class || ''}`;
            lineElement.textContent = line.text;
            terminalBody.appendChild(lineElement);
        }, line.delay);
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
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

// ===== PARALLAX EFFECT FOR FLOATING ICONS =====
window.addEventListener('scroll', () => {
    const floatingIcons = document.querySelectorAll('.float-icon');
    const scrolled = window.pageYOffset;

    floatingIcons.forEach((icon, index) => {
        const speed = 0.5 + (index * 0.1);
        icon.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== PROGRESS BAR ANIMATION =====
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const learningSection = document.querySelector('.learning-visual');
    if (learningSection) {
        progressObserver.observe(learningSection);
    }
});

// ===== FEATURE CARDS STAGGER ANIMATION =====
const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.feature-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
            featureObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.addEventListener('DOMContentLoaded', () => {
    const featuresGrid = document.querySelector('.features-grid');
    if (featuresGrid) {
        const cards = featuresGrid.querySelectorAll('.feature-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        featureObserver.observe(featuresGrid);
    }
});

// ===== PORTFOLIO SLIDER AUTO-SCROLL (OPTIONAL) =====
// Uncomment to enable auto-scrolling portfolio items
/*
let portfolioIndex = 0;
const portfolioItems = document.querySelectorAll('.portfolio-item');

function rotatePortfolio() {
  portfolioItems.forEach((item, index) => {
    item.style.opacity = index === portfolioIndex ? '1' : '0.5';
    item.style.transform = index === portfolioIndex ? 'scale(1.05)' : 'scale(1)';
  });
  
  portfolioIndex = (portfolioIndex + 1) % portfolioItems.length;
}

if (portfolioItems.length > 0) {
  setInterval(rotatePortfolio, 3000);
}
*/

// ===== TESTIMONIAL CARDS HOVER EFFECT =====
document.addEventListener('DOMContentLoaded', () => {
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            testimonialCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.opacity = '0.6';
                }
            });
        });

        card.addEventListener('mouseleave', () => {
            testimonialCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
            });
        });
    });
});

// ===== FORM VALIDATION =====
const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '';
        }
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--primary-cyan)';
    });
});

// ===== EASTER EGG: KONAMI CODE =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showToast('🎮 Konami Code Activated! You found the secret! 🚀', 5000);
        document.body.style.animation = 'rainbow 2s linear infinite';
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images (if you add images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== CONSOLE EASTER EGG =====
console.log('%c🛡️ SecureSphere', 'color: #22d3ee; font-size: 24px; font-weight: bold;');
console.log('%cEducate. Defend. Secure.', 'color: #10b981; font-size: 16px;');
console.log('%cInterested in joining our team? Email: careers@securesphere.com', 'color: #94a3b8; font-size: 12px;');

// ===== ANALYTICS (PLACEHOLDER) =====
// Track page views, button clicks, form submissions, etc.
function trackEvent(category, action, label) {
    console.log(`Analytics: ${category} - ${action} - ${label}`);
    // Integrate with Google Analytics, Mixpanel, etc.
}

// Track CTA button clicks
document.querySelectorAll('.btn-primary, .btn-secondary, .cta-btn').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('Button', 'Click', button.textContent.trim());
    });
});

console.log('🛡️ SecureSphere Homepage - Loaded Successfully');
