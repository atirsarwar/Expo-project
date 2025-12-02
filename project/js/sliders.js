// Hero Slider
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('sliderPrev');
        this.nextBtn = document.getElementById('sliderNext');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.init();
    }

    init() {
        this.showSlide(0);
        this.startAutoSlide();
        this.attachEventListeners();
    }

    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));

        // Show current slide
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
        this.currentSlide = index;
    }

    nextSlide() {
        let nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }

    prevSlide() {
        let prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }

    startAutoSlide() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
    }

    attachEventListeners() {
        // Navigation buttons
        this.nextBtn.addEventListener('click', () => {
            this.stopAutoSlide();
            this.nextSlide();
            this.startAutoSlide();
        });

        this.prevBtn.addEventListener('click', () => {
            this.stopAutoSlide();
            this.prevSlide();
            this.startAutoSlide();
        });

        // Dot indicators
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.stopAutoSlide();
                this.showSlide(index);
                this.startAutoSlide();
            });
        });

        // Pause on hover
        const slider = document.querySelector('.hero-slider');
        slider.addEventListener('mouseenter', () => this.stopAutoSlide());
        slider.addEventListener('mouseleave', () => this.startAutoSlide());

        // Touch swipe support
        this.addTouchSupport();
    }

    addTouchSupport() {
        const slider = document.querySelector('.slider-track');
        let startX = 0;
        let endX = 0;

        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            this.stopAutoSlide();
        });

        slider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe();
            this.startAutoSlide();
        });

        this.handleSwipe = () => {
            const diff = startX - endX;
            const swipeThreshold = 50;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        };
    }
}

// Testimonials Slider
class TestimonialsSlider {
    constructor() {
        this.track = document.getElementById('testimonialsTrack');
        this.cards = document.querySelectorAll('.testimonial-card');
        this.prevBtn = document.getElementById('testimonialPrev');
        this.nextBtn = document.getElementById('testimonialNext');
        this.currentIndex = 0;
        this.cardWidth = this.cards[0].offsetWidth;
        this.init();
    }

    init() {
        this.updateTrackPosition();
        this.attachEventListeners();
        this.handleResize();
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.updateTrackPosition();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.updateTrackPosition();
    }

    updateTrackPosition() {
        const translateX = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
    }

    attachEventListeners() {
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.prevBtn.addEventListener('click', () => this.prevSlide());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.cardWidth = this.cards[0].offsetWidth;
            this.updateTrackPosition();
        });
    }
}

// Initialize sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
    new TestimonialsSlider();
});

