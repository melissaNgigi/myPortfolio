// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize EmailJS
(function() {
    // This is your PUBLIC KEY
    emailjs.init("XeFhHRtCNzR2Gim_6");
})();

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Send email using EmailJS
        emailjs.send(
            'service_jjvyvea',     // Service ID
            'template_16cmtne',    // Template ID
            {
                from_name: this.from_name.value,
                from_email: this.from_email.value,
                subject: this.subject.value,
                message: this.message.value,
                to_name: 'Melissa',  // Your name
                reply_to: this.from_email.value
            }
        )
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        }, function(error) {
            console.log('FAILED...', error);
            alert('Oops! Something went wrong. Please try again later.');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Add scroll reveal animations
window.addEventListener('scroll', reveal);

function reveal() {
    const reveals = document.querySelectorAll('.project-card, .skill-tag');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    // Toggle body scroll
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target) && navLinks.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = '';
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Initialize AOS
AOS.init({
    duration: 800,
    offset: 100,
    mirror: true,
    anchorPlacement: 'top-bottom',
    easing: 'ease-in-out',
    once: false,
    disable: 'mobile'
});

// Refresh AOS on scroll to handle dynamic content
window.addEventListener('scroll', () => {
    AOS.refresh();
});

// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Update theme icon
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}); 