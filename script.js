/**
 * Ape Authority Associates - Main JavaScript
 * Handles navigation, form submission, and interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initFormHandler();
    initScrollEffects();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            e.preventDefault();
            
            const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const targetPosition = targetElement.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Custom Order Form Handler
 */
function initFormHandler() {
    const form = document.getElementById('custom-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual backend endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        
        // Show success message
        form.innerHTML = `
            <div class="form-success active">
                <h3>🎉 Request Received!</h3>
                <p>Thanks for your interest, ${data.name}! We'll review your design idea and get back to you within 24-48 hours.</p>
                <p style="margin-top: 1rem; color: var(--color-gray-500);">Keep an eye on your inbox at ${data.email}</p>
            </div>
        `;
    });
}

/**
 * Scroll Effects - Navbar background & reveal animations
 */
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });
    
    // Intersection Observer for reveal animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections for reveal
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal-section');
        observer.observe(section);
    });
}

// Add reveal animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    .reveal-section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .reveal-section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    .navbar.scrolled {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style);
