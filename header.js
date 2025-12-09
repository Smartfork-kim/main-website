// 공통 헤더 컴포넌트
function createHeader(activePage = 'home') {
    const pages = {
        'home': 'index.html',
        'about': 'about.html',
        'ai-courses': 'ai-courses.html',
        'products': 'product.html',
        'contact': 'contact.html'
    };

    const menuItems = [
        { id: 'home', label: 'Home', href: 'index.html' },
        { 
            id: 'about', 
            label: 'About', 
            href: 'about.html',
            submenu: [
                { label: '수상', href: 'awards.html' },
                { label: '브랜드 아이템', href: 'products-showcase.html' },
                { label: 'AI 강의', href: 'courses-showcase.html' }
            ]
        },
        { id: 'ai-courses', label: 'AI Courses', href: 'ai-courses.html' },
        { id: 'products', label: 'Products', href: 'product.html' },
        { id: 'contact', label: 'Contact', href: 'contact.html' }
    ];

    const menuHTML = menuItems.map(item => {
        const isActive = item.id === activePage;
        const activeClass = isActive ? 'text-brand font-semibold' : 'text-slate-600 hover:text-brand font-medium';
        
        if (item.submenu) {
            // About 메뉴에 드롭다운 추가
            const submenuHTML = item.submenu.map(sub => 
                `<a href="${sub.href}" class="block px-4 py-2 text-sm text-slate-700 hover:bg-brand hover:text-white transition-colors rounded-md">${sub.label}</a>`
            ).join('\n                        ');
            
            return `
                    <div class="relative group">
                        <a href="${item.href}" class="nav-link ${activeClass} transition-colors px-2 py-1 flex items-center gap-1">
                            ${item.label}
                            <i data-lucide="chevron-down" class="w-4 h-4 transition-transform group-hover:rotate-180"></i>
                        </a>
                        <div class="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
                            <div class="bg-white rounded-lg shadow-lg border border-slate-200 py-2">
                                ${submenuHTML}
                            </div>
                        </div>
                    </div>`;
        } else {
            return `<a href="${item.href}" class="nav-link ${activeClass} transition-colors px-2 py-1">${item.label}</a>`;
        }
    }).join('\n                    ');

    const mobileMenuHTML = menuItems.map(item => {
        const isActive = item.id === activePage;
        const activeClass = isActive ? 'text-brand bg-brand/10' : 'text-slate-700 hover:text-brand hover:bg-slate-50';
        
        if (item.submenu) {
            // 모바일 메뉴에 서브메뉴 추가
            const submenuId = `mobile-submenu-${item.id}`;
            const submenuHTML = item.submenu.map(sub => 
                `<a href="${sub.href}" class="block px-6 py-2 text-sm text-slate-600 hover:text-brand hover:bg-slate-50 rounded-md">${sub.label}</a>`
            ).join('\n                    ');
            
            return `
                <div>
                    <a href="${item.href}" class="block px-3 py-3 rounded-md text-base font-medium ${activeClass}">${item.label}</a>
                    <button data-submenu-toggle="${submenuId}" class="w-full text-left px-3 py-1 text-sm text-slate-500 hover:text-brand flex items-center gap-1">
                        <i data-lucide="chevron-down" class="w-4 h-4"></i> 더보기
                    </button>
                    <div id="${submenuId}" class="hidden pl-4 space-y-1 mt-1">
                        ${submenuHTML}
                    </div>
                </div>`;
        } else {
            return `<a href="${item.href}" class="block px-3 py-3 rounded-md text-base font-medium ${activeClass}">${item.label}</a>`;
        }
    }).join('\n                ');

    return `
    <!-- Header -->
    <header id="navbar" class="fixed w-full z-50 transition-all duration-300 bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-center h-20 relative">
                <a href="index.html" class="absolute left-0 flex items-center focus-visible:ring-2 focus-visible:ring-brand rounded-lg p-1">
                    <div class="h-10 flex items-center">
                        <img src="images/logo/logo.png" alt="AI Idea Manufacturing Logo" class="h-full w-auto object-contain">
                    </div>
                </a>

                <nav class="hidden md:flex space-x-6" aria-label="메인 메뉴">
                    ${menuHTML}
                </nav>

                <div class="absolute right-0 flex items-center">
                    <button id="mobile-menu-btn" class="md:hidden p-2 rounded-md text-slate-600 hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand">
                        <i data-lucide="menu"></i>
                    </button>
                </div>
            </div>
        </div>

        <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-slate-100 absolute w-full origin-top transition-all duration-300">
            <div class="px-4 pt-2 pb-6 space-y-2 shadow-lg">
                ${mobileMenuHTML}
            </div>
        </div>
    </header>`;
}

// 헤더 로드
document.addEventListener('DOMContentLoaded', function() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        const activePage = headerContainer.getAttribute('data-page') || 'home';
        headerContainer.innerHTML = createHeader(activePage);
        
        // Lucide 아이콘 초기화
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // 모바일 메뉴 토글 기능
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                // 모바일 메뉴가 열릴 때 아이콘 다시 초기화
                if (typeof lucide !== 'undefined') {
                    setTimeout(() => lucide.createIcons(), 100);
                }
            });
        }
        
        // 모바일 서브메뉴 토글 버튼 이벤트
        document.querySelectorAll('[data-submenu-toggle]').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const submenuId = this.getAttribute('data-submenu-toggle');
                const submenu = document.getElementById(submenuId);
                if (submenu) {
                    submenu.classList.toggle('hidden');
                    if (typeof lucide !== 'undefined') {
                        setTimeout(() => lucide.createIcons(), 100);
                    }
                }
            });
        });

        // 스크롤 시 헤더 숨김/표시 기능
        const navbar = document.getElementById('navbar');
        let lastScrollTop = 0;
        let scrollThreshold = 100; // 100px 이상 스크롤 시 작동

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > scrollThreshold) {
                if (scrollTop > lastScrollTop) {
                    // 스크롤 다운 - 헤더 숨김
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    // 스크롤 업 - 헤더 표시
                    navbar.style.transform = 'translateY(0)';
                }
            } else {
                // 최상단 근처에서는 항상 표시
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollTop = scrollTop;
        });
    }
});

