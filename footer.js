// 공통 푸터 컴포넌트
function createFooter() {
    return `
    <footer class="bg-slate-900 text-slate-400 py-6 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div class="text-left">
                    <h4 class="text-white font-bold text-lg mb-3">회사명 : 스마트포크</h4>
                    <p class="text-sm mb-1">문의 메일 : <a href="mailto:signboardkr@gmail.com" class="hover:text-brand transition-colors">signboardkr@gmail.com</a></p>
                    <p class="text-sm mb-3">사업자등록번호 : 760-87-01868</p>
                    <p class="text-sm text-slate-500">Copyright © 2025 SMART FORK Co.Ltd All Rights Reserved.</p>
                </div>
                <div class="flex space-x-6 text-sm">
                    <a href="#" class="hover:text-brand transition-colors">이용약관</a>
                    <a href="#" class="hover:text-brand transition-colors">개인정보처리방침</a>
                </div>
            </div>
        </div>
    </footer>`;
}

// 푸터 로드
document.addEventListener('DOMContentLoaded', function() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = createFooter();
    }
});

