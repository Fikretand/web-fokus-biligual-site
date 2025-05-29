
// === PATCH 2025-05-29 ===

// Global variables
let currentLang = localStorage.getItem('webfokus-lang') || 'bs';
let currentTheme = localStorage.getItem('webfokus-theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
let translations = {};
let currentReviewIndex = 0;
let reviewInterval;

// DOM elements
const langToggle = document.getElementById('lang-toggle');
const themeToggle = document.getElementById('theme-toggle');
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');
const reviewsCarousel = document.getElementById('reviews-carousel');

// Initialize app on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    loadTranslations();
    initializeEventListeners();
    initializeScrollSpy();
    initializeSmoothScroll();
    initializeReviewsCarousel();
    initializeFAQ();
    initializeAnimations();
    
    console.log('Web Fokus website initialized successfully');
});

// Initialize theme system
function initializeTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

// Update theme toggle icon
function updateThemeIcon() {
    const icon = themeToggle.querySelector('.theme-icon');
    if (icon) {
        icon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    }
}

// Toggle theme
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('webfokus-theme', currentTheme);
    updateThemeIcon();
    console.log(`Theme switched to: ${currentTheme}`);
}

// Load language translations from JSON files
async function loadTranslations() {
    try {
        const [bsResponse, enResponse] = await Promise.all([
            fetch('./lang/bs.json'),
            fetch('./lang/en.json')
        ]);
        
        const bsTranslations = await bsResponse.json();
        const enTranslations = await enResponse.json();
        
        translations = {
            bs: bsTranslations,
            en: enTranslations
        };
        
        setLanguage(currentLang);
        updateLanguageToggle();
        
    } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to existing translations object if JSON files fail
        setLanguage(currentLang);
    }
}

// Set language and update all translatable elements
function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    
    if (!translations[lang]) return;
    
    // Update all elements with data-translate attribute
    const translatableElements = document.querySelectorAll('[data-translate]');
    translatableElements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update page meta
    updatePageMeta(lang);
    
    // Update reviews carousel content
    updateReviewsContent();
    
    console.log(`Language changed to: ${lang}`);
}

// Update page meta tags
function updatePageMeta(lang) {
    const titles = {
        bs: "Web Fokus - Brzi i povoljni web-sajtovi za mali biznis",
        en: "Web Fokus - Fast & Affordable Websites for Small Business"
    };
    
    const descriptions = {
        bs: "Profesionalni web sajtovi za male biznise u BiH. Brza isporuka, povoljne cijene, uključen hosting i domena. Započnite već od 250 KM.",
        en: "Professional websites for small businesses in BiH. Fast delivery, affordable prices, hosting and domain included. Starting from 250 KM."
    };
    
    document.title = titles[lang];
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', descriptions[lang]);
    }
}

// Toggle language
function toggleLanguage() {
    currentLang = currentLang === 'bs' ? 'en' : 'bs';
    setLanguage(currentLang);
    localStorage.setItem('webfokus-lang', currentLang);
    updateLanguageToggle();
}

// Update language toggle display
function updateLanguageToggle() {
    const currentLangSpan = document.getElementById('current-lang');
    if (currentLangSpan) {
        currentLangSpan.textContent = currentLang.toUpperCase();
    }
}

// Initialize scroll spy for active navigation links
function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        const scrollY = window.pageYOffset + 100; // Offset for fixed navbar
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Check if section is 50% in viewport
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }
    
    // Throttle scroll events for performance
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveLink();
                handleNavbarScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    updateActiveLink(); // Initial call
}

// Initialize smooth scrolling for navigation
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    });
}

// Initialize reviews carousel with 6 reviews
function initializeReviewsCarousel() {
    if (!reviewsCarousel) return;
    
    updateReviewsContent();
    
    // Auto-play carousel
    function startAutoplay() {
        reviewInterval = setInterval(() => {
            nextReview();
        }, 5000);
    }
    
    // Pause on hover
    reviewsCarousel.addEventListener('mouseenter', () => {
        clearInterval(reviewInterval);
    });
    
    reviewsCarousel.addEventListener('mouseleave', () => {
        startAutoplay();
    });
    
    // Initialize dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showReview(index);
            clearInterval(reviewInterval);
            startAutoplay();
        });
    });
    
    startAutoplay();
}

// Update reviews content based on current language
function updateReviewsContent() {
    if (!translations[currentLang]) return;
    
    const reviewCards = document.querySelectorAll('.review-card');
    const reviews = [
        { text: 'review1_text', author: 'review1_author' },
        { text: 'review2_text', author: 'review2_author' },
        { text: 'review3_text', author: 'review3_author' },
        { text: 'review4_text', author: 'review4_author' },
        { text: 'review5_text', author: 'review5_author' },
        { text: 'review6_text', author: 'review6_author' }
    ];
    
    reviewCards.forEach((card, index) => {
        if (reviews[index]) {
            const blockquote = card.querySelector('blockquote');
            const cite = card.querySelector('cite');
            
            if (blockquote && translations[currentLang][reviews[index].text]) {
                blockquote.textContent = `"${translations[currentLang][reviews[index].text]}"`;
            }
            
            if (cite && translations[currentLang][reviews[index].author]) {
                cite.textContent = translations[currentLang][reviews[index].author];
            }
        }
    });
}

// Show specific review
function showReview(index) {
    const cards = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    
    cards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (cards[index]) {
        cards[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    currentReviewIndex = index;
}

// Show next review
function nextReview() {
    const totalReviews = document.querySelectorAll('.review-card').length;
    currentReviewIndex = (currentReviewIndex + 1) % totalReviews;
    showReview(currentReviewIndex);
}

// Initialize FAQ accordion
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('open');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                    }
                });
                
                // Toggle current item
                if (!isOpen) {
                    item.classList.add('open');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });
}

// Initialize event listeners
function initializeEventListeners() {
    // Language toggle
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Portfolio modal triggers
    const portfolioButtons = document.querySelectorAll('.portfolio-view');
    portfolioButtons.forEach(button => {
        button.addEventListener('click', openPortfolioModal);
    });
    
    // Window resize handler
    window.addEventListener('resize', handleResize);
}

// Toggle mobile menu
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    };
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
        showNotification('Molimo popunite sva obavezna polja / Please fill all required fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Molimo unesite valjanu email adresu / Please enter a valid email address', 'error');
        return;
    }
    
    // Show success message
    showNotification('Poruka je uspješno poslana! / Message sent successfully!', 'success');
    contactForm.reset();
    
    console.log('Form data:', data);
    
    // Open mailto link
    const subject = encodeURIComponent('Kontakt sa Web Fokus sajta');
    const body = encodeURIComponent(`
Ime: ${data.name}
Email: ${data.email}
Telefon: ${data.phone || 'Nije uneseno'}

Poruka:
${data.message}
    `);
    
    window.location.href = `mailto:info@webfokus.ba?subject=${subject}&body=${body}`;
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        maxWidth: '400px',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    // Close button handler
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = 'background:none;border:none;color:white;font-size:1.5rem;cursor:pointer;padding:0;margin-left:auto;';
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Add to page and animate in
    document.body.appendChild(notification);
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Portfolio modal placeholder
function openPortfolioModal(e) {
    const card = e.target.closest('.portfolio-card');
    const category = card ? card.getAttribute('data-category') : 'unknown';
    
    showNotification(`Portfolio detalji za ${category} projekt / Portfolio details for ${category} project`, 'info');
    console.log(`Opening portfolio modal for: ${category}`);
}

// Handle navbar background on scroll
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    const scrolled = window.pageYOffset > 50;
    
    if (scrolled) {
        navbar.style.background = currentTheme === 'dark' 
            ? 'rgba(15, 23, 42, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = currentTheme === 'dark' 
            ? 'rgba(15, 23, 42, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Handle window resize
function handleResize() {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
}

// Initialize scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe animatable elements
    const animateElements = document.querySelectorAll('.service-card, .portfolio-card, .process-step, .pricing-card, .review-card');
    animateElements.forEach(el => observer.observe(el));
}

// Analytics tracking placeholder
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    console.log(`Analytics event: ${category} - ${action} - ${label}`);
}

// Track important user interactions
document.addEventListener('submit', (e) => {
    if (e.target.id === 'contact-form') {
        trackEvent('Contact', 'Form Submit', 'Contact Form');
    }
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-primary')) {
        trackEvent('CTA', 'Click', e.target.textContent.trim());
    }
    
    if (e.target.classList.contains('portfolio-view')) {
        trackEvent('Portfolio', 'View Project', 'Portfolio Modal');
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
    
    if (e.key === 'Enter' && e.target.classList.contains('faq-question')) {
        e.target.click();
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error occurred:', e.error);
});

console.log('Web Fokus JavaScript enhanced with PATCH 2025-05-29');
