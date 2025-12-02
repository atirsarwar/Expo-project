// Scroll animations
class ScrollAnimations {
    constructor() {
        this.animatedElements = [];
        this.init();
    }

    init() {
        this.cacheElements();
        this.setupIntersectionObserver();
        this.handleCounterAnimations();
    }

    cacheElements() {
        this.animatedElements = document.querySelectorAll(
            '.fade-in, .slide-in-left, .slide-in-right, .scale-in, .stagger-item'
        );
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Handle staggered animations
                    if (entry.target.classList.contains('stagger-item')) {
                        this.animateStaggerItems(entry.target.parentElement);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    animateStaggerItems(container) {
        const items = container.querySelectorAll('.stagger-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 100);
        });
    }

    handleCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }
}

// Loading screen animation
class LoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.init();
    }

    init() {
        // Simulate loading process
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 2000);

        // Ensure loading screen hides even if there are issues
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hideLoadingScreen();
            }, 1000);
        });
    }

    hideLoadingScreen() {
        this.loadingScreen.style.opacity = '0';
        this.loadingScreen.style.visibility = 'hidden';
        
        setTimeout(() => {
            this.loadingScreen.remove();
        }, 500);
    }
}

// Parallax effects
class ParallaxEffects {
    constructor() {
        this.init();
    }

    init() {
        this.handleHeroParallax();
    }

    handleHeroParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.slide');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Hover effects
class HoverEffects {
    constructor() {
        this.init();
    }

    init() {
        this.addRippleEffects();
        this.addCardHoverEffects();
    }

    addRippleEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    position: absolute;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add ripple animation to CSS
        if (!document.querySelector('#ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    addCardHoverEffects() {
        const cards = document.querySelectorAll('.program-card, .stat-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    new LoadingScreen();
    new ParallaxEffects();
    new HoverEffects();
});