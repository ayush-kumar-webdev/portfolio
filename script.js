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

// Active navigation highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px',
    once: true
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections for animation
sections.forEach(section => {
    observer.observe(section);
});

// Observe cards for staggered animation
const cards = document.querySelectorAll('.experience-card, .project-card, .skill-category, .highlight-card');
cards.forEach((card, index) => {
    observer.observe(card);
    // Add delay for staggered effect (100ms increments)
    card.style.animationDelay = `${index * 0.1}s`;
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Form submission (placeholder)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
    });
}

// Add some CSS for animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    .animate {
        animation: reveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        opacity: 0;
        transform: translateY(16px) scale(0.96);
    }

    @keyframes reveal {
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    .loaded {
        animation: fadeIn 0.5s ease-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(13, 17, 23, 0.95);
        padding: 1rem 0;
        border-top: 1px solid rgba(20, 184, 166, 0.1);
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);