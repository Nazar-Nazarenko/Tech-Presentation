const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-navigation');
const mobileMenu = window.matchMedia('(max-width: 767px)');

function setMenuOpen(open) {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню');
    navigation.classList.toggle('is-open', open);
}

menuToggle.addEventListener('click', () => {
    setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});

navigation.addEventListener('click', (event) => {
    if (event.target.closest('a') && mobileMenu.matches) {
        setMenuOpen(false);
        menuToggle.focus({ preventScroll: true });
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        menuToggle.focus();
    }
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) {
        setMenuOpen(false);
    }
});

mobileMenu.addEventListener('change', () => setMenuOpen(false));

const animatedBlocks = document.querySelectorAll('.main-container > p, .market-analysis, .video-section, .closing-card');

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    animatedBlocks.forEach((block) => {
        block.classList.add('reveal-ready');
        observer.observe(block);
    });
}
