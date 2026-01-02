/**
 * Visual Neuro - Main JavaScript
 * Handles smooth scrolling, mobile menu, form validation, and video controls
 */

(function() {
    'use strict';

    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const iconBars = this.querySelectorAll('.icon-bar');
            if (!isExpanded) {
                iconBars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                iconBars[1].style.opacity = '0';
                iconBars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                iconBars[0].style.transform = 'none';
                iconBars[1].style.opacity = '1';
                iconBars[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove('active');
                    const iconBars = mobileMenuToggle.querySelectorAll('.icon-bar');
                    iconBars[0].style.transform = 'none';
                    iconBars[1].style.opacity = '1';
                    iconBars[2].style.transform = 'none';
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 768) {
                const isClickInsideNav = navMenu.contains(event.target) || mobileMenuToggle.contains(event.target);
                if (!isClickInsideNav && navMenu.classList.contains('active')) {
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove('active');
                    const iconBars = mobileMenuToggle.querySelectorAll('.icon-bar');
                    iconBars[0].style.transform = 'none';
                    iconBars[1].style.opacity = '1';
                    iconBars[2].style.transform = 'none';
                }
            }
        });
    }

    // ============================================
    // Smooth Scrolling for Anchor Links
    // ============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#' || href === '') {
                return;
            }

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset for sticky header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without triggering scroll
                history.pushState(null, null, href);
            }
        });
    });

    // ============================================
    // Video Controls Enhancement
    // ============================================
    const demoVideo = document.getElementById('demo-video');
    
    if (demoVideo) {
        // Add play/pause on click for better UX
        demoVideo.addEventListener('click', function() {
            if (this.paused) {
                this.play();
            } else {
                this.pause();
            }
        });

        // Add keyboard controls
        demoVideo.addEventListener('keydown', function(e) {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                if (this.paused) {
                    this.play();
                } else {
                    this.pause();
                }
            }
        });

        // Lazy load video on scroll into view
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Video is in view, ensure it's ready
                    if (demoVideo.readyState === 0) {
                        demoVideo.load();
                    }
                }
            });
        }, { rootMargin: '50px' });

        videoObserver.observe(demoVideo);
    }

    // ============================================
    // Contact Form Handling
    // ============================================
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        // Client-side validation
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form fields
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Reset previous messages
            formMessage.className = 'form-message';
            formMessage.textContent = '';

            // Validation
            let isValid = true;
            let errorMessage = '';

            if (!name) {
                isValid = false;
                errorMessage = 'Please enter your name.';
            } else if (!email) {
                isValid = false;
                errorMessage = 'Please enter your email address.';
            } else if (!isValidEmail(email)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            } else if (!message) {
                isValid = false;
                errorMessage = 'Please enter a message.';
            }

            if (!isValid) {
                formMessage.className = 'form-message error';
                formMessage.textContent = errorMessage;
                formMessage.setAttribute('role', 'alert');
                return;
            }

            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Submit form (Formspree will handle this)
            const formData = new FormData(contactForm);
            
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    formMessage.className = 'form-message success';
                    formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                    contactForm.reset();
                } else {
                    return response.json().then(data => {
                        throw new Error(data.error || 'There was an error sending your message.');
                    });
                }
            })
            .catch(error => {
                formMessage.className = 'form-message error';
                formMessage.textContent = error.message || 'There was an error sending your message. Please try again later.';
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
        });

        // Real-time email validation
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const email = this.value.trim();
                if (email && !isValidEmail(email)) {
                    this.setCustomValidity('Please enter a valid email address.');
                } else {
                    this.setCustomValidity('');
                }
            });
        }
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ============================================
    // Header Scroll Effect
    // ============================================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // Intersection Observer for Animations
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards for fade-in animation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // ============================================
    // Accessibility Enhancements
    // ============================================
    
    // Skip link focus management
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
                
                // Remove tabindex after focus to avoid tab navigation issues
                setTimeout(() => {
                    targetElement.removeAttribute('tabindex');
                }, 1000);
            }
        });
    }

    // Keyboard navigation for video
    if (demoVideo) {
        demoVideo.setAttribute('tabindex', '0');
    }

    // ============================================
    // Performance: Lazy Load Images
    // ============================================
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

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ============================================
    // Console Message
    // ============================================
    console.log('%cVisual Neuro', 'font-size: 20px; font-weight: bold; color: #4ecdc4;');
    console.log('%cInteractive Brain Cohort Analysis', 'font-size: 12px; color: #666;');

})();

