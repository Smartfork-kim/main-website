// 강의 포트폴리오 관리 시스템

// 관리자 인증 시스템 (3중 보안)
class AdminAuth {
    constructor() {
        this.storageKey = 'admin_authenticated';
        this.passwordKey = 'admin_password';
        this.recoveryCodeKey = 'admin_recovery_code';
        this.MASTER_PASSWORD = 'smartfork_master_2024!@#';
        this.defaultPassword = 'admin1234';
        this.initPassword();
    }

    initPassword() {
        if (!localStorage.getItem(this.passwordKey)) {
            localStorage.setItem(this.passwordKey, this.defaultPassword);
            const recoveryCode = this.generateRecoveryCode();
            localStorage.setItem(this.recoveryCodeKey, recoveryCode);
            console.log('%c🔑 중요! 복구 코드를 안전한 곳에 저장하세요!', 'color: red; font-size: 16px; font-weight: bold');
            console.log('%c복구 코드: ' + recoveryCode, 'color: blue; font-size: 14px; background: yellow; padding: 10px;');
        }
    }

    generateRecoveryCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    isAuthenticated() {
        return sessionStorage.getItem(this.storageKey) === 'true';
    }

    authenticate() {
        const password = prompt('관리자 비밀번호를 입력하세요:\n\n비밀번호를 잊으셨다면 "복구" 또는 "마스터"를 입력하세요.');
        if (!password) return false;

        if (password.toLowerCase() === '복구' || password.toLowerCase() === 'recovery') {
            this.recoveryMode();
            return false;
        }

        if (password.toLowerCase() === '마스터' || password.toLowerCase() === 'master') {
            this.masterPasswordMode();
            return false;
        }

        const savedPassword = localStorage.getItem(this.passwordKey);
        if (password === savedPassword || password === this.MASTER_PASSWORD) {
            sessionStorage.setItem(this.storageKey, 'true');
            alert('✅ 관리자 모드로 전환되었습니다.');
            return true;
        } else {
            alert('❌ 비밀번호가 틀렸습니다.');
            return false;
        }
    }

    masterPasswordMode() {
        alert('🔐 마스터 비밀번호 모드');
        const masterPassword = prompt('마스터 비밀번호를 입력하세요:');
        if (!masterPassword) return;

        if (masterPassword === this.MASTER_PASSWORD) {
            const action = confirm('✅ 마스터 비밀번호 인증 성공!\n\n비밀번호를 초기화하시겠습니까?');
            if (action) {
                this.resetPassword();
            } else {
                sessionStorage.setItem(this.storageKey, 'true');
                alert('관리자 모드로 로그인되었습니다.');
                location.reload();
            }
        } else {
            alert('❌ 마스터 비밀번호가 틀렸습니다.');
        }
    }

    recoveryMode() {
        const savedRecoveryCode = localStorage.getItem(this.recoveryCodeKey);
        alert('🔄 복구 모드\n\n처음 사이트를 설정할 때 생성된 8자리 복구 코드를 입력하세요.');
        const recoveryCode = prompt('복구 코드를 입력하세요 (8자리):');
        if (!recoveryCode) return;

        if (recoveryCode.toUpperCase() === savedRecoveryCode) {
            alert('✅ 복구 코드 인증 성공!');
            this.resetPassword();
        } else {
            alert('❌ 복구 코드가 틀렸습니다.');
        }
    }

    resetPassword() {
        const newPassword = prompt('새 비밀번호를 입력하세요 (4자 이상):');
        if (!newPassword || newPassword.length < 4) {
            alert('비밀번호는 4자 이상이어야 합니다.');
            return;
        }
        const confirmPassword = prompt('새 비밀번호를 다시 입력하세요:');
        if (newPassword !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        localStorage.setItem(this.passwordKey, newPassword);
        alert('✅ 비밀번호가 초기화되었습니다!');
        location.reload();
    }

    logout() {
        sessionStorage.removeItem(this.storageKey);
        alert('관리자 모드가 해제되었습니다.');
    }

    changePassword() {
        const currentPassword = prompt('현재 비밀번호를 입력하세요:');
        if (!currentPassword) return;
        const savedPassword = localStorage.getItem(this.passwordKey);
        if (currentPassword !== savedPassword && currentPassword !== this.MASTER_PASSWORD) {
            alert('❌ 현재 비밀번호가 틀렸습니다.');
            return;
        }
        const newPassword = prompt('새 비밀번호를 입력하세요 (4자 이상):');
        if (!newPassword || newPassword.length < 4) {
            alert('비밀번호는 4자 이상이어야 합니다.');
            return;
        }
        const confirmPassword = prompt('새 비밀번호를 다시 입력하세요:');
        if (newPassword !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        localStorage.setItem(this.passwordKey, newPassword);
        alert('✅ 비밀번호가 변경되었습니다!');
    }
}

class CoursesManager {
    constructor() {
        this.storageKey = 'courses_data';
        this.courses = this.loadCourses();
        this.currentEditId = null;
        this.auth = new AdminAuth();
        this.initElements();
        this.bindEvents();
        this.updateAdminUI();
        this.render();
    }

    initElements() {
        this.adminModeBtn = document.getElementById('admin-mode-btn');
        this.addBtn = document.getElementById('add-course-btn');
        this.closeModalBtn = document.getElementById('close-modal-btn');
        this.cancelBtn = document.getElementById('cancel-btn');
        this.uploadBtn = document.getElementById('upload-btn');
        
        this.modal = document.getElementById('course-modal');
        this.modalTitle = document.getElementById('modal-title');
        
        this.form = document.getElementById('course-form');
        this.courseId = document.getElementById('course-id');
        this.imageInput = document.getElementById('course-image');
        this.imagePreview = document.getElementById('image-preview');
        this.previewImg = document.getElementById('preview-img');
        this.titleInput = document.getElementById('course-title');
        this.descriptionInput = document.getElementById('course-description');
        this.levelInput = document.getElementById('course-level');
        this.platformInput = document.getElementById('course-platform');
        this.studentsInput = document.getElementById('course-students');
        this.durationInput = document.getElementById('course-duration');
        
        this.grid = document.getElementById('courses-grid');
        this.emptyMessage = document.getElementById('empty-message');
    }

    bindEvents() {
        this.adminModeBtn.addEventListener('click', () => {
            if (this.auth.isAuthenticated()) {
                const action = confirm('관리자 모드를 해제하시겠습니까?\n\n비밀번호 변경을 원하시면 "취소"를 누르세요.');
                if (action) {
                    this.auth.logout();
                } else {
                    this.auth.changePassword();
                }
            } else {
                if (this.auth.authenticate()) {
                    // 인증 성공
                }
            }
            this.updateAdminUI();
        });
        
        this.addBtn.addEventListener('click', () => this.openModal());
        this.closeModalBtn.addEventListener('click', () => this.closeModal());
        this.cancelBtn.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
        
        this.uploadBtn.addEventListener('click', () => this.imageInput.click());
        this.imageInput.addEventListener('change', (e) => this.handleImageUpload(e));
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    updateAdminUI() {
        const isAdmin = this.auth.isAuthenticated();
        this.addBtn.style.display = isAdmin ? 'flex' : 'none';
        
        if (isAdmin) {
            this.adminModeBtn.innerHTML = `
                <i data-lucide="unlock" class="w-4 h-4"></i>
                관리자 모드 활성
            `;
            this.adminModeBtn.className = 'px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 font-semibold rounded-lg transition-all duration-300 flex items-center gap-2';
        } else {
            this.adminModeBtn.innerHTML = `
                <i data-lucide="lock" class="w-4 h-4"></i>
                관리자 모드
            `;
            this.adminModeBtn.className = 'px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-all duration-300 flex items-center gap-2';
        }
        
        lucide.createIcons();
        this.render();
    }

    loadCourses() {
        const data = localStorage.getItem(this.storageKey);
        if (data) {
            return JSON.parse(data);
        }
        return [
            {
                id: Date.now(),
                title: 'ChatGPT 실전 활용',
                description: '생성형 AI를 활용한 업무 효율화와 실전 활용 방법을 배웁니다.',
                level: '입문',
                platform: '인프런',
                students: '1,000+',
                duration: '4시간',
                image: null
            }
        ];
    }

    saveCourses() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.courses));
    }

    openModal(course = null) {
        this.currentEditId = course ? course.id : null;
        
        if (course) {
            this.modalTitle.textContent = '강의 수정';
            this.courseId.value = course.id;
            this.titleInput.value = course.title;
            this.descriptionInput.value = course.description;
            this.levelInput.value = course.level || '입문';
            this.platformInput.value = course.platform || '';
            this.studentsInput.value = course.students || '';
            this.durationInput.value = course.duration || '';
            
            if (course.image) {
                this.previewImg.src = course.image;
                this.imagePreview.classList.remove('hidden');
            }
        } else {
            this.modalTitle.textContent = '강의 추가';
            this.form.reset();
            this.imagePreview.classList.add('hidden');
        }
        
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            lucide.createIcons();
        }, 100);
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = '';
        this.form.reset();
        this.imagePreview.classList.add('hidden');
        this.currentEditId = null;
    }

    handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        if (file.size > 5 * 1024 * 1024) {
            alert('이미지 크기는 5MB 이하여야 합니다.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            this.previewImg.src = e.target.result;
            this.imagePreview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }

    handleSubmit() {
        const courseData = {
            title: this.titleInput.value.trim(),
            description: this.descriptionInput.value.trim(),
            level: this.levelInput.value,
            platform: this.platformInput.value.trim() || '미정',
            students: this.studentsInput.value.trim() || '0',
            duration: this.durationInput.value.trim() || '미정',
            image: this.previewImg.src || null
        };
        
        if (this.currentEditId) {
            const index = this.courses.findIndex(c => c.id === this.currentEditId);
            if (index !== -1) {
                this.courses[index] = {
                    ...this.courses[index],
                    ...courseData
                };
            }
        } else {
            this.courses.unshift({
                id: Date.now(),
                ...courseData
            });
        }
        
        this.saveCourses();
        this.closeModal();
        this.render();
    }

    deleteCourse(id) {
        if (!confirm('정말 이 강의를 삭제하시겠습니까?')) return;
        
        const index = this.courses.findIndex(c => c.id === id);
        if (index !== -1) {
            this.courses.splice(index, 1);
            this.saveCourses();
            this.render();
        }
    }

    getLevelBadgeClass(level) {
        const classes = {
            '입문': 'bg-brand/10 text-brand',
            '초급': 'bg-green-100 text-green-600',
            '중급': 'bg-blue-100 text-blue-600',
            '고급': 'bg-purple-100 text-purple-600'
        };
        return classes[level] || 'bg-slate-100 text-slate-600';
    }

    render() {
        const isAdmin = this.auth.isAuthenticated();
        
        if (this.courses.length === 0) {
            this.grid.innerHTML = '';
            this.emptyMessage.classList.remove('hidden');
            lucide.createIcons();
            return;
        }
        
        this.emptyMessage.classList.add('hidden');
        
        this.grid.innerHTML = this.courses.map(course => `
            <div class="course-card bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300">
                <div class="aspect-[16/10] bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                    ${course.image ? 
                        `<img src="${course.image}" alt="${this.escapeHtml(course.title)}" class="w-full h-full object-cover">` :
                        `<div class="flex items-center justify-center h-full">
                            <div class="text-center p-8">
                                <div class="text-6xl mb-4">🎓</div>
                                <p class="text-slate-500 text-sm">이미지 없음</p>
                            </div>
                        </div>`
                    }
                </div>
                <div class="p-6">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="px-3 py-1 ${this.getLevelBadgeClass(course.level)} text-xs font-semibold rounded-full">${this.escapeHtml(course.level)}</span>
                    </div>
                    <h4 class="text-xl font-bold text-slate-900 mb-2">${this.escapeHtml(course.title)}</h4>
                    <p class="text-slate-600 mb-4">${this.escapeHtml(course.description)}</p>
                    <div class="space-y-2 mb-4">
                        <div class="flex items-center text-sm text-slate-500">
                            <i data-lucide="users" class="w-4 h-4 mr-2"></i>
                            <span>수강생 ${this.escapeHtml(course.students)}</span>
                        </div>
                        <div class="flex items-center text-sm text-slate-500">
                            <i data-lucide="clock" class="w-4 h-4 mr-2"></i>
                            <span>${this.escapeHtml(course.duration)}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded">${this.escapeHtml(course.platform)}</span>
                        </div>
                    </div>
                    ${isAdmin ? `
                    <div class="flex gap-2 pt-4 border-t border-slate-200">
                        <button onclick="coursesManager.openModal(${JSON.stringify(course).replace(/"/g, '&quot;')})" class="flex-1 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                            <i data-lucide="edit-2" class="w-4 h-4"></i>
                            수정
                        </button>
                        <button onclick="coursesManager.deleteCourse(${course.id})" class="flex-1 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                            삭제
                        </button>
                    </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
        
        lucide.createIcons();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

let coursesManager;
document.addEventListener('DOMContentLoaded', () => {
    coursesManager = new CoursesManager();
    lucide.createIcons();
});

