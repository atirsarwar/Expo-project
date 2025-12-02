// Navigation functionality
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.init();
    }

    init() {
        this.handleScroll();
        this.handleMobileToggle();
        this.handleDropdowns();
        this.handleActiveLinks();
    }

    handleScroll() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }

    handleMobileToggle() {
        this.navToggle.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
                this.navToggle.classList.remove('active');
            });
        });
    }

    handleDropdowns() {
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        
        dropdowns.forEach(dropdown => {
            if (window.innerWidth > 768) {
                dropdown.addEventListener('mouseenter', () => {
                    dropdown.querySelector('.dropdown-menu').style.display = 'block';
                });
                
                dropdown.addEventListener('mouseleave', () => {
                    dropdown.querySelector('.dropdown-menu').style.display = 'none';
                });
            } else {
                dropdown.addEventListener('click', (e) => {
                    e.preventDefault();
                    const menu = dropdown.querySelector('.dropdown-menu');
                    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                });
            }
        });
    }

    handleActiveLinks() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || 
                (currentPage === 'index.html' && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});