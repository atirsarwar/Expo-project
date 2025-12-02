// Main application controller
class App {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScroll();
        this.setupLazyLoading();
        this.setupImageZoom();
        this.setupDynamicYear();
        this.setupServiceWorker();
    }

    setupSmoothScroll() {
        // Smooth scroll for anchor links
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
    }

    setupLazyLoading() {
        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    setupImageZoom() {
        // Image zoom functionality for gallery
        const galleryImages = document.querySelectorAll('.gallery-image');
        
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                this.openLightbox(img);
            });
        });

        // Keyboard navigation for lightbox
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeLightbox();
            }
        });
    }

    openLightbox(img) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${img.src}" alt="${img.alt}">
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-prev">&lt;</button>
                <button class="lightbox-next">&gt;</button>
            </div>
        `;

        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        document.body.appendChild(lightbox);

        // Fade in
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);

        // Close lightbox
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            this.closeLightbox();
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });

        this.currentLightbox = lightbox;
    }

    closeLightbox() {
        if (this.currentLightbox) {
            this.currentLightbox.style.opacity = '0';
            setTimeout(() => {
                this.currentLightbox.remove();
                this.currentLightbox = null;
            }, 300);
        }
    }

    setupDynamicYear() {
        // Update copyright year
        const yearElements = document.querySelectorAll('.current-year');
        const currentYear = new Date().getFullYear();
        
        yearElements.forEach(element => {
            element.textContent = currentYear;
        });
    }

    setupServiceWorker() {
        // Register service worker for PWA functionality
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
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize main application
document.addEventListener('DOMContentLoaded', () => {
    new App();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { App };
}

  // Student Life page functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Events Slider
            const eventsTrack = document.getElementById('eventsTrack');
            const eventsPrev = document.getElementById('eventsPrev');
            const eventsNext = document.getElementById('eventsNext');
            const eventSlides = document.querySelectorAll('.event-slide');
            let currentEventSlide = 0;
            const slideWidth = eventSlides[0].offsetWidth;

            function updateEventsSlider() {
                eventsTrack.style.transform = `translateX(-${currentEventSlide * slideWidth}px)`;
            }

            eventsNext.addEventListener('click', function() {
                currentEventSlide = (currentEventSlide + 1) % eventSlides.length;
                updateEventsSlider();
            });

            eventsPrev.addEventListener('click', function() {
                currentEventSlide = (currentEventSlide - 1 + eventSlides.length) % eventSlides.length;
                updateEventsSlider();
            });

            // Auto slide events
            let eventsInterval = setInterval(() => {
                currentEventSlide = (currentEventSlide + 1) % eventSlides.length;
                updateEventsSlider();
            }, 5000);

            // Pause on hover
            eventsTrack.addEventListener('mouseenter', () => {
                clearInterval(eventsInterval);
            });

            eventsTrack.addEventListener('mouseleave', () => {
                eventsInterval = setInterval(() => {
                    currentEventSlide = (currentEventSlide + 1) % eventSlides.length;
                    updateEventsSlider();
                }, 5000);
            });

            // Image grid hover effect
            const gridItems = document.querySelectorAll('.grid-item');
            gridItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.querySelector('.grid-overlay').style.opacity = '1';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.querySelector('.grid-overlay').style.opacity = '0';
                });
            });

            // Smooth scroll for internal links
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

            // Initialize animations
            const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(element => {
                observer.observe(element);
            });
        });

                // Facilities page specific functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Amenities Slider
            const amenitiesTrack = document.getElementById('amenitiesTrack');
            const amenitiesPrev = document.getElementById('amenitiesPrev');
            const amenitiesNext = document.getElementById('amenitiesNext');
            const amenitiesDots = document.getElementById('amenitiesDots');
            const amenitySlides = document.querySelectorAll('.amenity-slide');
            let currentAmenitySlide = 0;
            const slideWidth = amenitiesTrack.clientWidth / 4; // Show 4 slides in desktop
            
            // Create dots
            amenitySlides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentAmenitySlide = index;
                    updateAmenitiesSlider();
                });
                amenitiesDots.appendChild(dot);
            });
            
            function updateAmenitiesSlider() {
                const offset = currentAmenitySlide * slideWidth;
                amenitiesTrack.style.transform = `translateX(-${offset}px)`;
                
                // Update active dot
                document.querySelectorAll('.slider-dot').forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentAmenitySlide);
                });
            }
            
            amenitiesNext.addEventListener('click', function() {
                if (currentAmenitySlide < amenitySlides.length - 1) {
                    currentAmenitySlide++;
                    updateAmenitiesSlider();
                }
            });
            
            amenitiesPrev.addEventListener('click', function() {
                if (currentAmenitySlide > 0) {
                    currentAmenitySlide--;
                    updateAmenitiesSlider();
                }
            });
            
            // Auto slide amenities
            let amenitiesInterval = setInterval(() => {
                if (currentAmenitySlide < amenitySlides.length - 1) {
                    currentAmenitySlide++;
                } else {
                    currentAmenitySlide = 0;
                }
                updateAmenitiesSlider();
            }, 6000);
            
            // Pause on hover
            amenitiesTrack.addEventListener('mouseenter', () => {
                clearInterval(amenitiesInterval);
            });
            
            amenitiesTrack.addEventListener('mouseleave', () => {
                amenitiesInterval = setInterval(() => {
                    if (currentAmenitySlide < amenitySlides.length - 1) {
                        currentAmenitySlide++;
                    } else {
                        currentAmenitySlide = 0;
                    }
                    updateAmenitiesSlider();
                }, 6000);
            });
            
            // Facility card hover effect
            const facilityCards = document.querySelectorAll('.facility-card');
            facilityCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.querySelector('.facility-overlay').style.opacity = '1';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.querySelector('.facility-overlay').style.opacity = '0';
                });
            });
            
            // Initialize animations
            const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            animatedElements.forEach(element => {
                observer.observe(element);
            });
            
            // Smooth scroll for internal links
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
        });