/* ============================================
   UNDERSTANDING KOREA — Scroll & Navigation
   ============================================ */

(function () {
    'use strict';

    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.nav-dot');
    const progressBar = document.getElementById('progressBar');

    // ---- Intersection Observer for scroll animations ----
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    updateNav(entry.target);
                }
            });
        },
        {
            threshold: 0.3,
        }
    );

    slides.forEach((slide) => observer.observe(slide));

    // ---- Update nav dots ----
    function updateNav(activeSlide) {
        const index = Array.from(slides).indexOf(activeSlide);
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // ---- Dot click navigation ----
    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.section, 10);
            slides[index]?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ---- Progress bar ----
    window.addEventListener(
        'scroll',
        () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
        },
        { passive: true }
    );

    // ---- Keyboard navigation (arrow keys for presenting) ----
    let currentSlide = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            currentSlide = Math.min(currentSlide + 1, slides.length - 1);
            slides[currentSlide].scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            currentSlide = Math.max(currentSlide - 1, 0);
            slides[currentSlide].scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Sync currentSlide with scroll position
    const scrollObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    currentSlide = Array.from(slides).indexOf(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    slides.forEach((slide) => scrollObserver.observe(slide));
})();
