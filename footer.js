// 공통 푸터 컴포넌트
function createFooter() {
    return `
    <footer class="bg-slate-900 text-slate-400 py-6 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div class="text-left">
                    <h4 class="text-white font-bold text-lg mb-3">회사명 : 스마트포크</h4>
                    <p class="text-sm mb-1">대표이사 : 김상철, 유예찬</p>
                    <p class="text-sm mb-1">문의 메일 : <a href="mailto:signboardkr@gmail.com" class="hover:text-brand transition-colors">signboardkr@gmail.com</a></p>
                    <p class="text-sm mb-1">전화번호 : <a href="tel:070-5220-1050" class="hover:text-brand transition-colors">070-5220-1050</a> <span class="text-slate-500">(평일 13:00~17:00)</span></p>
                    <p class="text-sm mb-1">사업자등록번호 : 760-87-01868</p>
                    <p class="text-sm mb-3">통신판매업신고 : 2024-고양덕양구-1120호</p>
                    <p class="text-sm text-slate-500">Copyright © 2025 SMART FORK Co.Ltd All Rights Reserved.</p>
                </div>
                <div class="flex space-x-6 text-sm">
                    <a href="#" id="terms-link" class="hover:text-brand transition-colors">이용약관</a>
                    <a href="#" id="privacy-link" class="hover:text-brand transition-colors">개인정보처리방침</a>
                </div>
            </div>
        </div>
    </footer>`;
}

// 모달 HTML 생성
function createModal() {
    return `
    <div id="policy-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 items-center justify-center p-4" style="display: none;">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div class="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                <h2 id="modal-title" class="text-2xl font-bold text-slate-800"></h2>
                <button id="close-modal-btn" class="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
            </div>
            <div id="modal-content" class="p-6 overflow-y-auto flex-1 text-slate-700 leading-relaxed whitespace-pre-line">
            </div>
        </div>
    </div>`;
}

// 개인정보처리방침 내용
const privacyPolicyContent = `[스마트포크] 개인정보 처리방침

제1조 (개인정보의 처리 목적) 스마트포크('회사')는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.

프로젝트 상담 및 견적 문의 처리: 신원 확인, 문의 사항 확인, 사실 조사를 위한 연락·통지, 처리 결과 통보 등

제2조 (수집하는 개인정보의 항목) 회사는 상담 및 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.

수집 항목: 이름(또는 회사명), 휴대전화번호, 이메일 주소, 문의 내용

수집 방법: 홈페이지 내 문의하기(Contact) 폼 작성

제3조 (개인정보의 처리 및 보유 기간) ① 회사는 법령에 따른 개인정보 보유·이용 기간 또는 정보 주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유·이용 기간 내에서 개인정보를 처리·보유합니다. ② 구체적인 개인정보 처리 및 보유 기간은 다음과 같습니다.

고객 문의 및 상담 기록: 문의 접수 시점으로부터 3년 (전자상거래 등에서의 소비자 보호에 관한 법률에 따름)

단, 정보 주체의 개인정보 삭제 요청이 있을 경우 지체 없이 파기합니다.

제4조 (개인정보의 파기 절차 및 방법) 회사는 원칙적으로 개인정보 처리 목적이 달성된 경우에는 지체 없이 해당 개인정보를 파기합니다.

파기 절차: 목적이 달성된 후 내부 방침 및 기타 관련 법령에 따라 일정 기간 저장된 후 파기됩니다.

파기 방법: 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.

제5조 (개인정보 보호책임자) 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보 주체의 불만 처리 및 피해 구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.

개인정보 보호책임자

성명: 김상철

직책: 대표이사

이메일:signboardkr@gmail.com

연락처:070-5220-1050`;

// 이용약관 내용
const termsContent = `[스마트포크] 웹사이트 이용약관 (초안)

제1조 (목적) 이 약관은 주식회사 스마트포크(이하 "회사")가 운영하는 웹사이트에서 제공하는 인터넷 관련 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

제2조 (저작권의 귀속 및 이용제한) ① 회사가 작성한 저작물(텍스트, 이미지, 로고, 디자인 등)에 대한 저작권 및 기타 지적재산권은 회사에 귀속합니다. ② 이용자는 서비스를 이용함으로써 얻은 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리 목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다. ③ 회사는 이용자가 본 약관을 위배하여 회사에 손해를 끼친 경우, 민·형사상의 법적 조치를 취할 수 있습니다.

제3조 (서비스의 내용 및 변경) ① 회사는 웹사이트를 통해 회사의 정보, 포트폴리오, 프로젝트 문의 기능 등을 제공합니다. ② 회사는 경영상, 기술상의 이유로 사전 예고 없이 서비스의 내용을 변경하거나 중단할 수 있습니다.

제4조 (면책조항) ① 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다. ② 회사는 웹사이트에 게재된 정보의 정확성, 신뢰도 등 그 내용에 관하여는 (고의 또는 중대한 과실이 없는 한) 법적 책임을 지지 않습니다. 웹사이트의 정보는 참고용이며, 실제 비즈니스 계약은 별도의 절차를 따릅니다.

제5조 (분쟁해결 및 관할법원) 서비스 이용과 관련하여 회사와 이용자 간에 발생한 분쟁에 대해서는 대한민국 법을 적용하며, 소송이 제기될 경우 회사의 본점 소재지를 관할하는 법원을 전속 관할법원으로 합니다.

부칙 이 약관은 2025년 12월 10일부터 시행합니다.`;

// 모달 열기 함수
function openModal(title, content) {
    const modal = document.getElementById('policy-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    if (modal && modalTitle && modalContent) {
        modalTitle.textContent = title;
        modalContent.textContent = content;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
        
        // 아이콘 다시 렌더링
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

// 모달 닫기 함수
function closeModal() {
    const modal = document.getElementById('policy-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // 배경 스크롤 복원
    }
}

// 푸터 로드 및 이벤트 설정
document.addEventListener('DOMContentLoaded', function() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = createFooter();
        
        // 모달이 없으면 생성
        if (!document.getElementById('policy-modal')) {
            document.body.insertAdjacentHTML('beforeend', createModal());
        }
        
        // 이용약관 링크 이벤트
        const termsLink = document.getElementById('terms-link');
        if (termsLink) {
            termsLink.addEventListener('click', function(e) {
                e.preventDefault();
                openModal('이용약관', termsContent);
            });
        }
        
        // 개인정보처리방침 링크 이벤트
        const privacyLink = document.getElementById('privacy-link');
        if (privacyLink) {
            privacyLink.addEventListener('click', function(e) {
                e.preventDefault();
                openModal('개인정보처리방침', privacyPolicyContent);
            });
        }
        
        // 모달 닫기 버튼 이벤트
        const closeBtn = document.getElementById('close-modal-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        // 모달 배경 클릭 시 닫기
        const modal = document.getElementById('policy-modal');
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }
        
        // ESC 키로 모달 닫기
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const modal = document.getElementById('policy-modal');
                if (modal && modal.style.display !== 'none') {
                    closeModal();
                }
            }
        });
    }
});

