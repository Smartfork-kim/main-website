// 연락처 자동 하이픈 삽입
document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phone-input');
    const phoneError = document.getElementById('phone-error');
    const emailInput = document.getElementById('email-input');
    const emailError = document.getElementById('email-error');
    const form = document.getElementById('contact-form');
    
    // 모든 필수 입력란에 대한 커스텀 메시지 설정
    const nameInput = form.querySelector('input[name="name"]');
    const messageInput = form.querySelector('textarea[name="message"]');

    // 연락처 입력 시 자동 하이픈 삽입
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 추출
            
            // 자동 하이픈 삽입 (010-0000-0000)
            if (value.length <= 3) {
                e.target.value = value;
            } else if (value.length <= 7) {
                e.target.value = value.slice(0, 3) + '-' + value.slice(3);
            } else if (value.length <= 11) {
                e.target.value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7);
            } else {
                e.target.value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
            }

            // 실시간 검증
            validatePhone();
        });

        phoneInput.addEventListener('blur', validatePhone);
    }

    // 이메일 실시간 검증
    if (emailInput) {
        emailInput.addEventListener('input', validateEmail);
        emailInput.addEventListener('blur', validateEmail);
    }

    // 연락처 검증 함수
    function validatePhone() {
        const value = phoneInput.value;
        const pattern = /^010-\d{4}-\d{4}$/;
        
        if (value && !pattern.test(value)) {
            phoneInput.classList.remove('border-slate-300');
            phoneInput.classList.add('border-red-500', 'bg-red-50');
            phoneError.classList.remove('hidden');
            return false;
        } else {
            phoneInput.classList.remove('border-red-500', 'bg-red-50');
            phoneInput.classList.add('border-slate-300');
            phoneError.classList.add('hidden');
            return true;
        }
    }

    // 이메일 검증 함수
    function validateEmail() {
        const value = emailInput.value;
        const pattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
        
        if (value && !pattern.test(value)) {
            emailInput.classList.remove('border-slate-300');
            emailInput.classList.add('border-red-500', 'bg-red-50');
            emailError.classList.remove('hidden');
            return false;
        } else {
            emailInput.classList.remove('border-red-500', 'bg-red-50');
            emailInput.classList.add('border-slate-300');
            emailError.classList.add('hidden');
            return true;
        }
    }

    // 브라우저 기본 유효성 검사 메시지 커스터마이징
    
    // 이름/회사명 필드
    if (nameInput) {
        nameInput.addEventListener('invalid', () => {
            if (nameInput.validity.valueMissing) {
                nameInput.setCustomValidity('이름 또는 회사명을 입력해주세요');
            }
        });
        
        nameInput.addEventListener('input', () => {
            nameInput.setCustomValidity('');
        });
    }
    
    // 연락처 필드
    if (phoneInput) {
        phoneInput.addEventListener('invalid', () => {
            if (phoneInput.validity.valueMissing) {
                phoneInput.setCustomValidity('연락처를 입력해주세요');
            } else if (phoneInput.validity.patternMismatch) {
                phoneInput.setCustomValidity('형식에 맞춰 작성해주세요 (예: 010-0000-0000)');
            }
        });
        
        phoneInput.addEventListener('input', () => {
            phoneInput.setCustomValidity('');
        });
    }

    // 이메일 필드
    if (emailInput) {
        emailInput.addEventListener('invalid', () => {
            if (emailInput.validity.valueMissing) {
                emailInput.setCustomValidity('이메일을 입력해주세요');
            } else if (emailInput.validity.patternMismatch || emailInput.validity.typeMismatch) {
                emailInput.setCustomValidity('형식에 맞춰 작성해주세요 (예: example@email.com)');
            }
        });
        
        emailInput.addEventListener('input', () => {
            emailInput.setCustomValidity('');
        });
    }
    
    // 문의 내용 필드
    if (messageInput) {
        messageInput.addEventListener('invalid', () => {
            if (messageInput.validity.valueMissing) {
                messageInput.setCustomValidity('문의 내용을 입력해주세요');
            }
        });
        
        messageInput.addEventListener('input', () => {
            messageInput.setCustomValidity('');
        });
    }

    // 폼 제출 시 검증
    if (form) {
        form.addEventListener('submit', (e) => {
            const isPhoneValid = validatePhone();
            const isEmailValid = validateEmail();

            if (!isPhoneValid || !isEmailValid) {
                e.preventDefault();
                alert('형식에 맞춰 작성해주세요.\n\n연락처: 010-0000-0000 (11자리)\n이메일: example@email.com');
                
                // 아이콘 다시 렌더링
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
                return false;
            }

            // 유효성 검사 통과 시 FormSubmit으로 자동 제출
            return true;
        });
    }
});
