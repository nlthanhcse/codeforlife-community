// Enhanced CodeForLife Community Landing Page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeTheme();
    initializeAnimations();
    initializeDemo();
    initializeLiveActivity();
    initializeScrollProgress();
    initializeWaitlist();
    initializePerformanceOptimizations();
    initializeAccessibility();

    console.log('🚀 CodeForLife Community - Enhanced Landing Page Loaded!');
});

// Navigation & Menu System
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksArray = document.querySelectorAll('.nav-link[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on links
    navLinksArray.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Navbar scroll effects
    window.addEventListener('scroll', throttle(handleNavbarScroll, 16));

    // Smooth scrolling with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });

    // Active section highlighting
    window.addEventListener('scroll', throttle(updateActiveSection, 16));

    function toggleMobileMenu() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }

    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    function handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            closeMobileMenu();

            // Track navigation
            trackEvent('navigation', 'scroll_to_section', targetId);
        }
    }

    function updateActiveSection() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksArray.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Advanced Theme System
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Load saved theme or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = prefersDark.matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemTheme;

    setTheme(currentTheme);

    // Theme toggle functionality
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Listen for system theme changes
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        // Add transition animation
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);

        trackEvent('user_interaction', 'theme_toggle', newTheme);
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);

        // Update meta theme color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f172a' : '#2563eb');
        }
    }
}

// Enhanced Animation System
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('[data-aos]').forEach(element => {
        animationObserver.observe(element);
    });

    // Counter animations
    initializeCounters();

    // Typing animation for hero
    initializeTypingAnimation();

    // Parallax effects
    initializeParallax();

    function handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-aos-delay') || 0;

                setTimeout(() => {
                    element.classList.add('aos-animate');
                }, parseInt(delay));

                // Unobserve after animation
                animationObserver.unobserve(element);
            }
        });
    }

    function initializeCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    animateCounter(entry.target);
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    function animateCounter(element) {
        const target = parseFloat(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(current * 10) / 10);
            }
        }, 16);
    }

    function formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    function initializeTypingAnimation() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const texts = ['Community', 'Collaboration', 'Innovation', 'Excellence'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 1000);
    }

    function initializeParallax() {
        const parallaxElements = document.querySelectorAll('.floating-element');

        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach((element, index) => {
                const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        }, 16));
    }
}

// Interactive Demo System
function initializeDemo() {
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoContents = document.querySelectorAll('.demo-tab-content');

    demoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            // Remove active class from all tabs and contents
            demoTabs.forEach(t => t.classList.remove('active'));
            demoContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const targetContent = document.getElementById(`demo-${targetTab}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Initialize specific demo content
            initializeDemoContent(targetTab);

            trackEvent('demo_interaction', 'tab_change', targetTab);
        });
    });

    // Initialize syntax highlighting
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }

    function initializeDemoContent(tabType) {
        switch (tabType) {
            case 'code':
                initializeCodeEditor();
                break;
            case 'chat':
                simulateLiveChat();
                break;
            case 'profile':
                animateProfileStats();
                break;
        }
    }

    function initializeCodeEditor() {
        const editorContent = document.querySelector('.editor-content pre code');
        if (editorContent && typeof Prism !== 'undefined') {
            Prism.highlightElement(editorContent);
        }
    }

    function simulateLiveChat() {
        const messages = [
            { author: 'Alex Chen', time: '2:36 PM', text: 'Perfect! AbortController is exactly what I needed.' },
            { author: 'Jordan Smith', time: '2:37 PM', text: 'Mind sharing the complete implementation?' },
            { author: 'Sarah Kim', time: '2:38 PM', text: 'I\'ve been working on something similar. Great timing!' }
        ];

        const chatMessages = document.querySelector('.chat-messages');
        if (!chatMessages) return;

        let messageIndex = 0;
        const addMessage = () => {
            if (messageIndex < messages.length) {
                const message = messages[messageIndex];
                const messageElement = createMessageElement(message);
                chatMessages.appendChild(messageElement);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                messageIndex++;
                setTimeout(addMessage, 2000);
            }
        };

        setTimeout(addMessage, 1000);
    }

    function createMessageElement(message) {
        const avatarColors = ['css-avatar-1', 'css-avatar-2', 'css-avatar-3'];
        const colorClass = avatarColors[Math.floor(Math.random() * 3)];
        const initials = message.author.split(' ').map(n => n[0]).join('').substring(0, 2);
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.innerHTML = `
            <div class="css-avatar ${colorClass} message-avatar" aria-label="${message.author}">${initials}</div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-author">${message.author}</span>
                    <span class="message-time">${message.time}</span>
                </div>
                <p>${message.text}</p>
            </div>
        `;
        return messageDiv;
    }

    function animateProfileStats() {
        const stats = document.querySelectorAll('.profile-stats span');
        stats.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.opacity = '0';
                stat.style.transform = 'translateY(10px)';
                stat.style.transition = 'all 0.3s ease';

                setTimeout(() => {
                    stat.style.opacity = '1';
                    stat.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    }
}

// Live Activity Feed
function initializeLiveActivity() {
    const activityFeed = document.getElementById('activity-feed');
    if (!activityFeed) return;

    const activities = [
        { user: 'Sarah Chen', action: 'shared a React optimization tip', time: '2 minutes ago', type: 'share' },
        { user: 'Marcus Johnson', action: 'joined the Docker discussion', time: '5 minutes ago', type: 'join' },
        { user: 'Emma Rodriguez', action: 'liked your post about microservices', time: '8 minutes ago', type: 'like' },
        { user: 'Alex Kim', action: 'commented on Angular best practices', time: '12 minutes ago', type: 'comment' },
        { user: 'Jordan Smith', action: 'started following you', time: '15 minutes ago', type: 'follow' }
    ];

    let currentActivityIndex = 0;

    function showNextActivity() {
        const activity = activities[currentActivityIndex];
        const activityElement = createActivityElement(activity);

        activityFeed.innerHTML = '';
        activityFeed.appendChild(activityElement);

        currentActivityIndex = (currentActivityIndex + 1) % activities.length;
    }

    function createActivityElement(activity) {
        const div = document.createElement('div');
        div.className = 'activity-item';
        div.innerHTML = `
            <div class="activity-content">
                <span class="activity-user">${activity.user}</span>
                <span class="activity-action">${activity.action}</span>
                <span class="activity-time">${activity.time}</span>
            </div>
        `;
        div.style.cssText = `
            display: flex;
            align-items: center;
            padding: 0.75rem 1rem;
            background: var(--bg-primary);
            border-radius: 8px;
            box-shadow: var(--shadow);
            animation: slideInUp 0.5s ease;
        `;
        return div;
    }

    // Start the activity feed
    showNextActivity();
    setInterval(showNextActivity, 4000);
}

// Scroll Progress Bar
function initializeScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
        progressBar.setAttribute('aria-valuenow', Math.round(progress));
    }, 16));
}

// Waitlist Form Handler
function initializeWaitlist() {
    const form = document.getElementById('waitlist-form');
    if (!form) return;

    const nameInput = document.getElementById('waitlist-name');
    const emailInput = document.getElementById('waitlist-email');
    const messageEl = document.getElementById('waitlist-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        // Clear previous state
        nameInput.classList.remove('error');
        emailInput.classList.remove('error');
        messageEl.className = 'waitlist-message';
        messageEl.textContent = '';

        // Validate
        let valid = true;
        if (!name) { nameInput.classList.add('error'); valid = false; }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailInput.classList.add('error');
            valid = false;
        }

        if (!valid) {
            messageEl.className = 'waitlist-message error';
            messageEl.textContent = 'Please fill in your name and a valid email address.';
            return;
        }

        const submitBtn = form.querySelector('.waitlist-submit');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Joining...</span>';

        setTimeout(() => {
            form.innerHTML = `
                <div class="waitlist-success">
                    <i class="fas fa-check-circle"></i>
                    <p>You're on the list, <strong>${escapeHtml(name)}</strong>! We'll reach out to <strong>${escapeHtml(email)}</strong> when beta opens.</p>
                </div>
            `;
            trackEvent('conversion', 'waitlist_signup', 'success');
        }, 1200);
    });
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// Performance Optimizations
function initializePerformanceOptimizations() {
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Preload critical resources
    preloadCriticalResources();

    // Service Worker registration (if available)
    if ('serviceWorker' in navigator) {
        registerServiceWorker();
    }

    function preloadCriticalResources() {
        // Images are CSS-generated; no file preloading needed
    }

    function registerServiceWorker() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    }
}

// Enhanced Accessibility
function initializeAccessibility() {
    // Skip to main content link
    addSkipLink();

    // Focus management
    improveFocusManagement();

    // Keyboard navigation
    enhanceKeyboardNavigation();

    // ARIA live regions
    setupLiveRegions();

    function addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    function improveFocusManagement() {
        // Improve focus indicators
        const focusableElements = document.querySelectorAll('a, button, input, [tabindex="0"]');

        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.setAttribute('data-focused', 'true');
            });

            element.addEventListener('blur', () => {
                element.removeAttribute('data-focused');
            });
        });
    }

    function enhanceKeyboardNavigation() {
        // Escape key to close mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const navLinks = document.querySelector('.nav-links');
                const navToggle = document.querySelector('.nav-toggle');

                if (navLinks && navLinks.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });

        // Tab navigation for demo tabs
        const demoTabs = document.querySelectorAll('.demo-tab');
        demoTabs.forEach((tab, index) => {
            tab.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    const nextTab = demoTabs[(index + 1) % demoTabs.length];
                    nextTab.focus();
                    nextTab.click();
                } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const prevTab = demoTabs[(index - 1 + demoTabs.length) % demoTabs.length];
                    prevTab.focus();
                    prevTab.click();
                }
            });
        });
    }

    function setupLiveRegions() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(liveRegion);

        // Announce theme changes
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                liveRegion.textContent = `Switched to ${newTheme} theme`;
            });
        }
    }
}

// Utility Functions
function throttle(func, wait) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, wait);
        }
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Analytics & Tracking
function trackEvent(category, action, label) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: 1
        });
    }

    // Custom analytics
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Copy to clipboard functionality
function initializeClipboard() {
    document.querySelectorAll('.code-block, .code-preview').forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.title = 'Copy to clipboard';
        copyButton.setAttribute('aria-label', 'Copy code to clipboard');

        block.style.position = 'relative';
        block.appendChild(copyButton);

        copyButton.addEventListener('click', async () => {
            const code = block.querySelector('code')?.textContent || block.textContent;

            try {
                await navigator.clipboard.writeText(code);
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                copyButton.style.color = 'var(--accent-color)';

                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                    copyButton.style.color = '';
                }, 2000);

                trackEvent('user_interaction', 'copy_code', 'clipboard');
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    });
}

// Back to top functionality
function initializeBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.title = 'Back to top';
    backToTopButton.setAttribute('aria-label', 'Scroll back to top');
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }, 100));

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        trackEvent('navigation', 'back_to_top', 'button_click');
    });
}

// Initialize additional features
setTimeout(() => {
    initializeClipboard();
    initializeBackToTop();
}, 1000);

// Loading state management
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Hide loading spinner if any
    const loadingSpinner = document.querySelector('.loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.style.opacity = '0';
        setTimeout(() => {
            loadingSpinner.style.display = 'none';
        }, 300);
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Page error:', e.error);
    trackEvent('error', 'javascript_error', e.error?.message || 'Unknown error');
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    trackEvent('error', 'promise_rejection', e.reason?.message || 'Unknown rejection');
});

// Additional CSS for JavaScript-enhanced elements
const enhancedStyles = `
    .skip-link:focus {
        top: 6px !important;
    }
    
    .activity-item {
        animation: slideInUp 0.5s ease;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .copy-button {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: var(--text-secondary);
        padding: 0.5rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: var(--transition);
        z-index: 10;
        backdrop-filter: blur(10px);
    }
    
    .copy-button:hover {
        background: rgba(255, 255, 255, 0.2);
        color: var(--text-primary);
    }
    
    .back-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--gradient-primary);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: var(--transition);
        z-index: 1000;
        box-shadow: var(--shadow);
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
    }
    
    [data-focused="true"] {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .loaded .lazy {
        opacity: 1;
    }
    
    @media (max-width: 768px) {
        .back-to-top {
            bottom: 1rem;
            right: 1rem;
            width: 45px;
            height: 45px;
        }
        
        .copy-button {
            top: 0.5rem;
            right: 0.5rem;
            padding: 0.25rem;
            font-size: 0.8rem;
        }
    }
    
    @media (prefers-reduced-motion: reduce) {
        .activity-item {
            animation: none;
        }
        
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

// Inject enhanced styles
const styleSheet = document.createElement('style');
styleSheet.textContent = enhancedStyles;
document.head.appendChild(styleSheet);

