
// Language translations
const translations = {
    bs: {
        // Navigation
        nav_home: "Početna",
        nav_services: "Usluge", 
        nav_portfolio: "Portfolio",
        nav_process: "Proces",
        nav_pricing: "Cijene",
        nav_reviews: "Recenzije",
        nav_contact: "Kontakt",
        
        // Hero section
        hero_title: "Brzi i povoljni web-sajtovi za mali biznis",
        hero_subtitle: "Profesionalni web sajt za vaš biznis spreman za 7 dana. Već od 250 KM sa uključenim hostingom i domenom.",
        hero_cta: "Zatraži ponudu",
        hero_portfolio: "Pogledaj radove",
        
        // Services section
        services_title: "Naše usluge",
        services_subtitle: "Sve što trebate za uspješan online biznis",
        service_design_title: "Web dizajn & razvoj",
        service_design_desc: "Moderni, responzivni dizajn prilagođen vašem brendu",
        service_seo_title: "SEO optimizacija",
        service_seo_desc: "Osnovna optimizacija za bolje rangiranje na Google-u",
        service_multilang_title: "Višejezičnost",
        service_multilang_desc: "Bosanski i engleski jezik uključeni u cijenu",
        service_hosting_title: "Hosting & domena",
        service_hosting_desc: "Besplatni hosting i domena za prvu godinu",
        service_themes_title: "Dark/Light mode",
        service_themes_desc: "Moderna funkcionalnost mijenjanja tema",
        service_speed_title: "Brza isporuka",
        service_speed_desc: "Vaš sajt spreman za maksimalno 7 radnih dana",
        service_maintenance_title: "Početno održavanje",
        service_maintenance_desc: "Besplatno rješavamo tehničke kvarove i manje izmjene tokom prvih 3 mjeseca",
        
        // Portfolio section
        portfolio_title: "Naši radovi",
        portfolio_subtitle: "Pogledajte uspješne projekte koje smo realizovali",
        portfolio_view: "Pogledaj više",
        portfolio_salon_title: "Beauty salon \"Elegance\"",
        portfolio_salon_desc: "Moderan sajt za frizerski salon sa online rezervacijama",
        portfolio_apartment_title: "Apartmani \"Stari grad\"",
        portfolio_apartment_desc: "Prezentacijski sajt za apartmane sa galerijom slika",
        
        // Process section
        process_title: "Naš proces rada",
        process_subtitle: "Jednostavan i transparentan proces u 4 koraka",
        process_step1_title: "Besplatne konsultacije",
        process_step1_desc: "Razgovaramo o vašim potrebama i ciljevima",
        process_step2_title: "Dizajn predlog",
        process_step2_desc: "Kreiramo dizajn koji odgovara vašem brendu",
        process_step3_title: "Izrada & testiranje",
        process_step3_desc: "Razvijamo sajt i testiramo na svim uređajima",
        process_step4_title: "Lansiranje + obuka",
        process_step4_desc: "Postavljamo sajt i obučavamo vas za korištenje",
        
        // Pricing section
        pricing_title: "Naše cijene",
        pricing_subtitle: "Transparentno i povoljno - bez skrivenih troškova",
        pricing_popular: "Najpopularniji",
        pricing_start_title: "Start",
        pricing_start_delivery: "7 dana",
        pricing_start_feature1: "1 stranica",
        pricing_start_feature2: "SEO optimizacija",
        pricing_start_feature3: "Hosting i domena",
        pricing_start_feature4: "BS & EN jezici",
        pricing_start_feature5: "Responzivni dizajn",
        pricing_plus_title: "Plus",
        pricing_plus_delivery: "10 dana",
        pricing_plus_feature1: "Do 3 stranice",
        pricing_plus_feature2: "Osnovni blog",
        pricing_plus_feature3: "SEO optimizacija",
        pricing_plus_feature4: "Hosting i domena",
        pricing_plus_feature5: "3 mjeseca održavanje",
        pricing_pro_title: "Pro",
        pricing_pro_delivery: "14 dana",
        pricing_pro_feature1: "Do 5 stranica",
        pricing_pro_feature2: "Blog sa CMS",
        pricing_pro_feature3: "Google Analytics",
        pricing_pro_feature4: "Advanced SEO",
        pricing_pro_feature5: "6 mjeseci održavanje",
        pricing_choose: "Izaberi paket",
        pricing_note: "Sve cijene bez PDV-a. Plaćanje u dvije rate - 50% unaprijed, 50% po završetku.",
        
        // Reviews section
        reviews_title: "Što kažu naši klijenti",
        reviews_subtitle: "Povjerenje koje gradimo svakodnevno",
        review1_text: "\"Izuzetno sam zadovoljna web sajtom koji mi je Web Fokus napravio. Brzi, profesionalni i povoljni. Preporučujem!\"",
        review1_author: "Amela K., vlasnica frizerskog salona",
        review2_text: "\"Odličan tim, brza komunikacija i kvaliteran rad. Sajt je gotov za 5 dana kako su i obećali.\"",
        review2_author: "Marko T., vlasnik apartmana",
        review3_text: "\"Profesionalan pristup od početka do kraja. Sajt izgleda fantastično i funkcioniše besprijekorno.\"",
        review3_author: "Selma H., vlasnica restorana",
        
        // FAQ section
        faq_title: "Često postavljana pitanja",
        faq_subtitle: "Odgovori na najčešća pitanja naših klijenata",
        faq1_question: "Koliko dugo traje izrada web sajta?",
        faq1_answer: "Ovisno o paketu, sajt je spreman za 7-14 radnih dana. Start paket za 7 dana, Plus za 10 dana, a Pro paket za 14 dana.",
        faq2_question: "Da li dobijam sve izvorne datoteke?",
        faq2_answer: "Da, nakon završetka projekta dobijate sve izvorne datoteke i punu kontrolu nad sajtom. Vi ste vlasnik svog sadržaja.",
        faq3_question: "Šta se dešava nakon prve godine hostinga?",
        faq3_answer: "Nakon prve godine, možete nastaviti sa nama (cca 50-80 KM godišnje) ili prenijeti sajt na svoj hosting.",
        faq4_question: "Da li mogu mijenjati sadržaj nakon lansiranja?",
        faq4_answer: "Da, obučit ćemo vas kako da mijenjate osnovni sadržaj. Za veće izmjene, možemo dogovoriti dodatne usluge.",
        faq5_question: "Da li sajt radi na svim uređajima?",
        faq5_answer: "Da, svi naši sajtovi su responzivni i rade savršeno na računarima, tabletima i telefonima.",
        faq6_question: "Kakav je način plaćanja?",
        faq6_answer: "Plaćanje se vrši u dvije rate: 50% unaprijed za početak rada, 50% po završetku projekta. Prihvatamo bankovni transfer.",
        
        // Contact section
        contact_title: "Kontaktirajte nas",
        contact_subtitle: "Spremni smo odgovoriti na sva vaša pitanja",
        contact_location_title: "Lokacija",
        contact_email_title: "Email",
        contact_phone_title: "Telefon",
        contact_form_name: "Ime i prezime",
        contact_form_email: "Email adresa",
        contact_form_phone: "Telefon (opciono)",
        contact_form_message: "Vaša poruka",
        contact_form_submit: "Pošaljite poruku",
        
        // Footer
        footer_tagline: "Vi se fokusirate na posao, mi na vaš web",
        footer_services_title: "Usluge",
        footer_web_design: "Web dizajn",
        footer_seo: "SEO optimizacija",
        footer_hosting: "Hosting & Domene",
        footer_maintenance: "Održavanje",
        footer_company_title: "Kompanija",
        footer_portfolio: "Portfolio",
        footer_process: "Proces rada",
        footer_pricing: "Cijene",
        footer_contact: "Kontakt",
        footer_rights: "Sva prava zadržana."
    },
    en: {
        // Navigation
        nav_home: "Home",
        nav_services: "Services",
        nav_portfolio: "Portfolio", 
        nav_process: "Process",
        nav_pricing: "Pricing",
        nav_reviews: "Reviews",
        nav_contact: "Contact",
        
        // Hero section
        hero_title: "Fast & Affordable Websites for Small Business",
        hero_subtitle: "Professional website for your business ready in 7 days. Starting from 250 KM with hosting and domain included.",
        hero_cta: "Get a Quote",
        hero_portfolio: "View Work",
        
        // Services section
        services_title: "Our Services",
        services_subtitle: "Everything you need for successful online business",
        service_design_title: "Web Design & Development",
        service_design_desc: "Modern, responsive design tailored to your brand",
        service_seo_title: "SEO Optimization",
        service_seo_desc: "Basic optimization for better Google ranking",
        service_multilang_title: "Multilingual",
        service_multilang_desc: "Bosnian and English languages included in price",
        service_hosting_title: "Hosting & Domain",
        service_hosting_desc: "Free hosting and domain for the first year",
        service_themes_title: "Dark/Light Mode",
        service_themes_desc: "Modern theme switching functionality",
        service_speed_title: "Fast Delivery",
        service_speed_desc: "Your website ready in maximum 7 working days",
        service_maintenance_title: "Initial Maintenance",
        service_maintenance_desc: "We solve technical issues and minor changes free for the first 3 months",
        
        // Portfolio section
        portfolio_title: "Our Work",
        portfolio_subtitle: "See successful projects we've completed",
        portfolio_view: "View More",
        portfolio_salon_title: "Beauty Salon \"Elegance\"",
        portfolio_salon_desc: "Modern website for hair salon with online bookings",
        portfolio_apartment_title: "Apartments \"Old Town\"",
        portfolio_apartment_desc: "Presentation website for apartments with image gallery",
        
        // Process section
        process_title: "Our Work Process",
        process_subtitle: "Simple and transparent process in 4 steps",
        process_step1_title: "Free Consultation",
        process_step1_desc: "We discuss your needs and goals",
        process_step2_title: "Design Proposal",
        process_step2_desc: "We create design that matches your brand",
        process_step3_title: "Development & Testing",
        process_step3_desc: "We develop the site and test on all devices",
        process_step4_title: "Launch + Training",
        process_step4_desc: "We deploy the site and train you how to use it",
        
        // Pricing section
        pricing_title: "Our Pricing",
        pricing_subtitle: "Transparent and affordable - no hidden costs",
        pricing_popular: "Most Popular",
        pricing_start_title: "Start",
        pricing_start_delivery: "7 days",
        pricing_start_feature1: "1 page",
        pricing_start_feature2: "SEO optimization",
        pricing_start_feature3: "Hosting & domain",
        pricing_start_feature4: "BS & EN languages",
        pricing_start_feature5: "Responsive design",
        pricing_plus_title: "Plus",
        pricing_plus_delivery: "10 days",
        pricing_plus_feature1: "Up to 3 pages",
        pricing_plus_feature2: "Basic blog",
        pricing_plus_feature3: "SEO optimization",
        pricing_plus_feature4: "Hosting & domain",
        pricing_plus_feature5: "3 months maintenance",
        pricing_pro_title: "Pro",
        pricing_pro_delivery: "14 days",
        pricing_pro_feature1: "Up to 5 pages",
        pricing_pro_feature2: "Blog with CMS",
        pricing_pro_feature3: "Google Analytics",
        pricing_pro_feature4: "Advanced SEO",
        pricing_pro_feature5: "6 months maintenance",
        pricing_choose: "Choose Package",
        pricing_note: "All prices exclude VAT. Payment in two installments - 50% upfront, 50% upon completion.",
        
        // Reviews section
        reviews_title: "What Our Clients Say",
        reviews_subtitle: "Trust we build every day",
        review1_text: "\"Extremely satisfied with the website Web Fokus made for me. Fast, professional and affordable. I recommend!\"",
        review1_author: "Amela K., hair salon owner",
        review2_text: "\"Excellent team, fast communication and quality work. The site was ready in 5 days as promised.\"",
        review2_author: "Marko T., apartment owner",
        review3_text: "\"Professional approach from start to finish. The site looks fantastic and works flawlessly.\"",
        review3_author: "Selma H., restaurant owner",
        
        // FAQ section
        faq_title: "Frequently Asked Questions",
        faq_subtitle: "Answers to our clients' most common questions",
        faq1_question: "How long does website development take?",
        faq1_answer: "Depending on the package, the site is ready in 7-14 working days. Start package in 7 days, Plus in 10 days, and Pro package in 14 days.",
        faq2_question: "Do I get all source files?",
        faq2_answer: "Yes, after project completion you get all source files and full control over the site. You own your content.",
        faq3_question: "What happens after the first year of hosting?",
        faq3_answer: "After the first year, you can continue with us (approx. 50-80 KM annually) or transfer the site to your hosting.",
        faq4_question: "Can I change content after launch?",
        faq4_answer: "Yes, we'll train you how to change basic content. For major changes, we can arrange additional services.",
        faq5_question: "Does the site work on all devices?",
        faq5_answer: "Yes, all our sites are responsive and work perfectly on computers, tablets and phones.",
        faq6_question: "What is the payment method?",
        faq6_answer: "Payment is made in two installments: 50% upfront to start work, 50% upon project completion. We accept bank transfer.",
        
        // Contact section
        contact_title: "Contact Us",
        contact_subtitle: "We're ready to answer all your questions",
        contact_location_title: "Location",
        contact_email_title: "Email",
        contact_phone_title: "Phone",
        contact_form_name: "Full Name",
        contact_form_email: "Email Address",
        contact_form_phone: "Phone (optional)",
        contact_form_message: "Your Message",
        contact_form_submit: "Send Message",
        
        // Footer
        footer_tagline: "You focus on business, we focus on your web",
        footer_services_title: "Services",
        footer_web_design: "Web Design",
        footer_seo: "SEO Optimization",
        footer_hosting: "Hosting & Domains",
        footer_maintenance: "Maintenance",
        footer_company_title: "Company",
        footer_portfolio: "Portfolio",
        footer_process: "Work Process",
        footer_pricing: "Pricing",
        footer_contact: "Contact",
        footer_rights: "All rights reserved."
    }
};

// Current language (default Bosnian)
let currentLang = localStorage.getItem('webfokus-lang') || 'bs';

// DOM elements
const langToggle = document.getElementById('lang-toggle');
const currentLangSpan = document.getElementById('current-lang');
const themeToggle = document.getElementById('theme-toggle');
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set initial language
    setLanguage(currentLang);
    
    // Set initial theme
    const savedTheme = localStorage.getItem('webfokus-theme') || 'light';
    setTheme(savedTheme);
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Initialize components
    initializeCarousel();
    initializeFAQ();
    initializeScrollSpy();
    initializeSmoothScroll();
    initializeAnimations();
    
    console.log('Web Fokus website initialized successfully');
});

// Event listeners
function initializeEventListeners() {
    // Language toggle
    langToggle.addEventListener('click', toggleLanguage);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Mobile menu toggle
    mobileToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Contact form submission
    contactForm.addEventListener('submit', handleContactForm);
    
    // Portfolio modal triggers
    const portfolioButtons = document.querySelectorAll('.portfolio-view');
    portfolioButtons.forEach(button => {
        button.addEventListener('click', openPortfolioModal);
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Resize handler
    window.addEventListener('resize', handleResize);
}

// Language functions
function toggleLanguage() {
    currentLang = currentLang === 'bs' ? 'en' : 'bs';
    setLanguage(currentLang);
    localStorage.setItem('webfokus-lang', currentLang);
}

function setLanguage(lang) {
    currentLang = lang;
    currentLangSpan.textContent = lang.toUpperCase();
    
    // Update document language
    document.documentElement.lang = lang;
    
    // Update all translatable elements
    const translatableElements = document.querySelectorAll('[data-translate]');
    translatableElements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update page title and meta description
    updatePageMeta(lang);
    
    console.log(`Language changed to: ${lang}`);
}

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
    document.querySelector('meta[name="description"]').setAttribute('content', descriptions[lang]);
}

// Theme functions
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('webfokus-theme', newTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeIcon = themeToggle.querySelector('.theme-icon');
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    
    console.log(`Theme changed to: ${theme}`);
}

// Mobile menu functions
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
}

// Contact form handler
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
    
    // Simulate form submission
    showNotification('Poruka je uspješno poslana! / Message sent successfully!', 'success');
    contactForm.reset();
    
    // In real implementation, you would send this to your backend
    console.log('Form data:', data);
    
    // Alternative: Open mailto link
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

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
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
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.color = 'white';
    closeBtn.style.fontSize = '1.5rem';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.padding = '0';
    closeBtn.style.marginLeft = 'auto';
    
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
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

// Carousel functionality
function initializeCarousel() {
    const carousel = document.getElementById('reviews-carousel');
    const cards = carousel.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all cards
        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current card
        cards[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto-play carousel
    setInterval(() => {
        currentSlide = (currentSlide + 1) % cards.length;
        showSlide(currentSlide);
    }, 5000);
    
    console.log('Carousel initialized');
}

// FAQ accordion
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    console.log('FAQ accordion initialized');
}

// Scroll spy for navigation
function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
    
    console.log('Scroll spy initialized');
}

// Smooth scrolling
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
            }
        });
    });
    
    console.log('Smooth scroll initialized');
}

// Animation on scroll
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
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.service-card, .portfolio-card, .process-step, .pricing-card, .review-card');
    animateElements.forEach(el => observer.observe(el));
    
    console.log('Scroll animations initialized');
}

// Portfolio modal (placeholder)
function openPortfolioModal(e) {
    const card = e.target.closest('.portfolio-card');
    const category = card.getAttribute('data-category');
    
    // In a real implementation, you would open a modal with project details
    showNotification(`Portfolio detalji za ${category} projekt / Portfolio details for ${category} project`, 'info');
    
    console.log(`Opening portfolio modal for: ${category}`);
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
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
    // Close mobile menu on desktop
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
}

// Performance optimization: Lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error occurred:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
    
    // Enter key on FAQ questions
    if (e.key === 'Enter' && e.target.classList.contains('faq-question')) {
        e.target.click();
    }
});

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics tracking (placeholder)
function trackEvent(category, action, label) {
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    console.log(`Analytics event: ${category} - ${action} - ${label}`);
}

// Track form submissions
document.addEventListener('submit', (e) => {
    if (e.target.id === 'contact-form') {
        trackEvent('Contact', 'Form Submit', 'Contact Form');
    }
});

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-primary')) {
        trackEvent('CTA', 'Click', e.target.textContent.trim());
    }
    
    if (e.target.classList.contains('portfolio-view')) {
        trackEvent('Portfolio', 'View Project', 'Portfolio Modal');
    }
});

console.log('Web Fokus JavaScript loaded successfully');
