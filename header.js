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
        { 
            id: 'ai-courses', 
            label: 'AI Courses', 
            href: 'ai-courses.html',
            submenu: [
                { label: 'AI 활용 입문', href: 'course-intro.html' },
                { label: 'AI 실전 활용 심화', href: 'course-advanced.html' },
                { label: '기업 맞춤형 출강', href: 'course-corporate.html' }
            ]
        },
        { id: 'products', label: 'Products', href: 'product.html' },
        { id: 'contact', label: 'Contact', href: 'contact.html' }
    ];

    const menuHTML = menuItems.map(item => {
        const isActive = item.id === activePage;
        const activeClass = isActive ? 'text-brand font-semibold' : 'text-slate-600 hover:text-brand font-medium';
        
        if (item.submenu) {
            // 메가 메뉴용 서브메뉴 ID 생성
            const megaMenuId = `megamenu-${item.id}`;
            const submenuHTML = item.submenu.map(sub => 
                `<a href="${sub.href}" class="block px-6 py-4 text-base text-slate-700 hover:bg-brand hover:text-white transition-all duration-200 rounded-lg font-medium">${sub.label}</a>`
            ).join('\n                            ');
            
            return `
                    <div class="relative group">
                        <a href="${item.href}" class="nav-link ${activeClass} transition-colors px-2 py-1 flex items-center gap-1" data-megamenu-trigger="${megaMenuId}">
                            ${item.label}
                            <i data-lucide="chevron-down" class="w-4 h-4 transition-transform group-hover:rotate-180"></i>
                        </a>
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

    // 메가 메뉴 HTML 생성
    const megaMenuHTML = menuItems
        .filter(item => item.submenu)
        .map(item => {
            const megaMenuId = `megamenu-${item.id}`;
            const submenuHTML = item.submenu.map(sub => 
                `<a href="${sub.href}" class="block px-6 py-4 text-base text-slate-700 hover:bg-brand hover:text-white transition-all duration-200 rounded-lg font-medium">${sub.label}</a>`
            ).join('\n                        ');
            
            return `
            <div id="${megaMenuId}" class="megamenu-container fixed left-0 w-full bg-white/80 backdrop-blur-sm border-b border-slate-200 shadow-xl opacity-0 invisible pointer-events-none transition-all duration-300 z-40" style="top: 80px; transform: translateY(-10px);">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        ${submenuHTML}
                    </div>
                </div>
            </div>`;
        }).join('\n        ');

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
    </header>
    ${megaMenuHTML}`;
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

        // 메가 메뉴 표시/숨김 처리
        const megaMenuTriggers = document.querySelectorAll('[data-megamenu-trigger]');
        const megaMenus = document.querySelectorAll('.megamenu-container');
        let hideTimeout = null;
        let currentActiveTrigger = null;
        
        function hideAllMegaMenus() {
            megaMenus.forEach(menu => {
                menu.classList.add('opacity-0', 'invisible', 'pointer-events-none');
                menu.style.transform = 'translateY(-10px)';
            });
            // 모든 메뉴 항목의 활성화 상태 제거
            megaMenuTriggers.forEach(trigger => {
                trigger.classList.remove('text-brand', 'font-semibold');
                trigger.classList.add('text-slate-600', 'font-medium');
            });
            currentActiveTrigger = null;
        }
        
        function showMegaMenu(megaMenu, trigger) {
            // 기존 타이머 취소
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }
            
            hideAllMegaMenus();
            if (megaMenu) {
                megaMenu.classList.remove('opacity-0', 'invisible', 'pointer-events-none');
                megaMenu.style.transform = 'translateY(0)';
            }
            // 현재 메뉴 항목 활성화
            if (trigger) {
                trigger.classList.remove('text-slate-600', 'font-medium');
                trigger.classList.add('text-brand', 'font-semibold');
                currentActiveTrigger = trigger;
            }
        }
        
        function scheduleHide() {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
            }
            hideTimeout = setTimeout(() => {
                // 현재 마우스가 메뉴 영역에 있는지 확인
                const isOverMenu = Array.from(megaMenuTriggers).some(trigger => 
                    trigger.matches(':hover')
                ) || Array.from(megaMenus).some(menu => 
                    menu.matches(':hover')
                );
                if (!isOverMenu) {
                    hideAllMegaMenus();
                }
                hideTimeout = null;
            }, 300); // 지연 시간을 300ms로 증가
        }
        
        if (megaMenuTriggers.length > 0 && megaMenus.length > 0) {
            megaMenuTriggers.forEach(trigger => {
                const megaMenuId = trigger.getAttribute('data-megamenu-trigger');
                const megaMenu = document.getElementById(megaMenuId);
                
                if (megaMenu) {
                    // 메뉴 항목에 마우스 올리기
                    trigger.addEventListener('mouseenter', (e) => {
                        // 타이머 취소
                        if (hideTimeout) {
                            clearTimeout(hideTimeout);
                            hideTimeout = null;
                        }
                        showMegaMenu(megaMenu, trigger);
                    });
                    
                    // 메가 메뉴 영역에 마우스 올리기 - 타이머 취소
                    megaMenu.addEventListener('mouseenter', () => {
                        // 타이머 취소
                        if (hideTimeout) {
                            clearTimeout(hideTimeout);
                            hideTimeout = null;
                        }
                        showMegaMenu(megaMenu, trigger);
                    });
                    
                    // 메뉴 항목에서 마우스가 벗어나면
                    trigger.addEventListener('mouseleave', (e) => {
                        const relatedTarget = e.relatedTarget;
                        // 메가 메뉴로 직접 이동하는 경우는 무시
                        if (relatedTarget && megaMenu.contains(relatedTarget)) {
                            return;
                        }
                        // 다른 메뉴 항목으로 이동하는 경우는 즉시 처리
                        const targetTrigger = Array.from(megaMenuTriggers).find(t => 
                            t !== trigger && (t.contains(relatedTarget) || t === relatedTarget)
                        );
                        if (targetTrigger) {
                            const targetMegaMenuId = targetTrigger.getAttribute('data-megamenu-trigger');
                            const targetMegaMenu = document.getElementById(targetMegaMenuId);
                            if (targetMegaMenu) {
                                showMegaMenu(targetMegaMenu, targetTrigger);
                                return;
                            }
                        }
                        // 그 외의 경우는 지연 후 숨기기
                        scheduleHide();
                    });
                }
            });

            // 메가 메뉴에서 마우스가 벗어나면 숨기기
            megaMenus.forEach(megaMenu => {
                megaMenu.addEventListener('mouseleave', (e) => {
                    const relatedTarget = e.relatedTarget;
                    // 다른 메뉴 항목으로 이동하는 경우
                    const targetTrigger = Array.from(megaMenuTriggers).find(trigger => 
                        trigger.contains(relatedTarget) || trigger === relatedTarget
                    );
                    if (targetTrigger) {
                        const targetMegaMenuId = targetTrigger.getAttribute('data-megamenu-trigger');
                        const targetMegaMenu = document.getElementById(targetMegaMenuId);
                        if (targetMegaMenu) {
                            showMegaMenu(targetMegaMenu, targetTrigger);
                            return;
                        }
                    }
                    // 다른 메가 메뉴로 이동하는 경우
                    const targetMegaMenu = Array.from(megaMenus).find(menu => 
                        menu !== megaMenu && (menu.contains(relatedTarget) || menu === relatedTarget)
                    );
                    if (targetMegaMenu) {
                        return; // 다른 메가 메뉴로 이동 중이므로 숨기지 않음
                    }
                    // 그 외의 경우는 지연 후 숨기기
                    scheduleHide();
                });
            });
            
            // 헤더 영역 전체에서 마우스가 벗어나면 즉시 숨기기
            const navbar = document.getElementById('navbar');
            if (navbar) {
                navbar.addEventListener('mouseleave', (e) => {
                    const relatedTarget = e.relatedTarget;
                    // 메가 메뉴로 이동하는 경우는 무시
                    const isMovingToMegaMenu = Array.from(megaMenus).some(menu => 
                        menu.contains(relatedTarget) || menu === relatedTarget
                    );
                    if (!isMovingToMegaMenu) {
                        if (hideTimeout) {
                            clearTimeout(hideTimeout);
                            hideTimeout = null;
                        }
                        hideAllMegaMenus();
                    }
                });
            }
        }

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

