// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.main-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            nav.classList.toggle('open');
        });

        // Close on link click (mobile)
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('open');
            });
        });
    }

    // Smooth scroll for in-page anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Set min date for reservation form to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    // Scroll reveal — progressive fade/slide in as elements enter viewport
    const revealTargets = document.querySelectorAll(
        '.reveal, .showcase-item, .showcase-header, .stat, .gallery-item, .menu-category'
    );
    if ('IntersectionObserver' in window && revealTargets.length) {
        revealTargets.forEach(el => el.classList.add('reveal'));
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
        revealTargets.forEach(el => io.observe(el));
    }

    // Parallax tilt on showcase media — subtle mouse follow
    document.querySelectorAll('.showcase-item').forEach(item => {
        const media = item.querySelector('.showcase-media');
        if (!media) return;
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            media.style.setProperty('--tilt-x', `${x * 6}deg`);
            media.style.setProperty('--tilt-y', `${-y * 6}deg`);
        });
        item.addEventListener('mouseleave', () => {
            media.style.setProperty('--tilt-x', `0deg`);
            media.style.setProperty('--tilt-y', `0deg`);
        });
    });
});
