export function initUI() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    

    if (btn && menu) {
        let isMenuOpen = false;
        const toggleMenu = (forceClose = false) => {
            if (forceClose) {
                isMenuOpen = false;
            } else {
                isMenuOpen = !isMenuOpen;
            }
            
            if (isMenuOpen) {
                menu.classList.remove('hidden');
            } else {
                menu.classList.add('hidden');
            }
        };

        btn.addEventListener('click', () => toggleMenu());
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && isMenuOpen) toggleMenu(true);
        });
    }


    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-md', 'bg-white/95', 'backdrop-blur-md');
            navbar.classList.remove('bg-white/80');
        } else {
            navbar.classList.remove('shadow-md', 'bg-white/95', 'backdrop-blur-md');
            navbar.classList.add('bg-white/80');
        }
    }, { passive: true });


    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        if (href === currentPath || (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('/')))) {
            link.classList.add('text-brand', 'font-bold');
        } else if (currentPath.includes(href) && href !== 'index.html') {
             link.classList.add('text-brand', 'font-bold');
        }
    });
}
