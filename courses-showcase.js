// 강의 포트폴리오 관리 시스템 (Firebase 버전)

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
        this.collection = 'courses';
        this.courses = [];
        this.currentEditId = null;
        this.auth = new AdminAuth();
        this.initElements();
        this.bindEvents();
        this.updateAdminUI();
        this.loadCourses();
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
        this.editImageBtn = document.getElementById('edit-image-btn');
        this.titleInput = document.getElementById('course-title');
        this.descriptionInput = document.getElementById('course-description');
        this.levelInput = document.getElementById('course-level');
        this.totalInput = document.getElementById('course-total');
        
        // 이미지 편집 모달
        this.cropModal = document.getElementById('image-crop-modal');
        this.cropImage = document.getElementById('crop-image');
        this.cropContainer = document.getElementById('crop-container');
        this.closeCropModalBtn = document.getElementById('close-crop-modal-btn');
        this.cropConfirmBtn = document.getElementById('crop-confirm-btn');
        this.cropCancelBtn = document.getElementById('crop-cancel-btn');
        
        this.grid = document.getElementById('courses-grid');
        this.emptyMessage = document.getElementById('empty-message');
        
        this.cropper = null;
        this.originalImageFile = null;
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
        
        // 모달 배경 클릭 시 닫기 (드래그로 인한 실수 방지)
        let modalMouseDownTarget = null;
        this.modal.addEventListener('mousedown', (e) => {
            if (e.target === this.modal) {
                modalMouseDownTarget = this.modal;
            } else {
                modalMouseDownTarget = null;
            }
        });
        this.modal.addEventListener('mouseup', (e) => {
            if (e.target === this.modal && modalMouseDownTarget === this.modal) {
                this.closeModal();
            }
            modalMouseDownTarget = null;
        });
        
        this.uploadBtn.addEventListener('click', () => this.imageInput.click());
        this.imageInput.addEventListener('change', (e) => this.handleImageUpload(e));
        this.editImageBtn.addEventListener('click', () => this.openCropModal());
        this.closeCropModalBtn.addEventListener('click', () => this.closeCropModal());
        this.cropCancelBtn.addEventListener('click', () => this.closeCropModal());
        this.cropConfirmBtn.addEventListener('click', () => this.applyCrop());
        this.cropModal.addEventListener('click', (e) => {
            if (e.target === this.cropModal) this.closeCropModal();
        });
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
            this.adminModeBtn.className = 'fixed bottom-6 right-6 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg z-40';
        } else {
            this.adminModeBtn.innerHTML = `
                <i data-lucide="lock" class="w-4 h-4"></i>
                관리자 모드
            `;
            this.adminModeBtn.className = 'fixed bottom-6 right-6 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg z-40';
        }
        
        lucide.createIcons();
        this.render();
    }

    async loadCourses() {
        try {
            console.log('📡 Firebase에서 데이터 로드 중...');
            const snapshot = await db.collection(this.collection).get();
            
            this.courses = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            // 생성일 기준 최신순 정렬
            this.courses.sort((a, b) => {
                if (a.createdAt && b.createdAt) {
                    return b.createdAt.seconds - a.createdAt.seconds; // 내림차순 (최신순)
                }
                return 0;
            });
            
            this.render();
            console.log('✅ 강의 로드 완료:', this.courses.length, '개');
        } catch (error) {
            console.error('❌ 데이터 로드 실패:', error);
            console.error('에러 코드:', error.code);
            console.error('에러 메시지:', error.message);
            alert('데이터를 불러오는데 실패했습니다.\n\n에러: ' + error.message);
        }
    }

    openModal(course = null) {
        this.currentEditId = course ? course.id : null;
        
        if (course) {
            this.modalTitle.textContent = '강의 수정';
            this.courseId.value = course.id;
            this.titleInput.value = course.title;
            this.descriptionInput.value = course.description;
            this.levelInput.value = course.level || '입문';
            this.totalInput.value = course.total || '';
            
            if (course.imageUrl) {
                this.previewImg.src = course.imageUrl;
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
        this.originalImageFile = null;
        this.previewImg.src = '';
    }

    handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        if (file.size > 5 * 1024 * 1024) {
            alert('이미지 크기는 5MB 이하여야 합니다.');
            return;
        }
        
        this.originalImageFile = file;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            this.previewImg.src = e.target.result;
            this.imagePreview.classList.remove('hidden');
            lucide.createIcons();
        };
        reader.readAsDataURL(file);
    }

    openCropModal() {
        if (!this.originalImageFile && !this.previewImg.src) {
            alert('먼저 이미지를 선택해주세요.');
            return;
        }
        
        if (this.originalImageFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.cropImage.src = e.target.result;
                this.initCropper();
            };
            reader.readAsDataURL(this.originalImageFile);
        } else {
            this.cropImage.src = this.previewImg.src;
            this.initCropper();
        }
        
        this.cropModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    initCropper() {
        if (this.cropper) {
            this.cropper.destroy();
        }
        
        // 2480×3508 비율 고정
        this.cropper = new Cropper(this.cropImage, {
            aspectRatio: 2480 / 3508,
            viewMode: 1,
            dragMode: 'move',
            autoCropArea: 0.8,
            restore: false,
            guides: true,
            center: true,
            highlight: false,
            cropBoxMovable: true,
            cropBoxResizable: true,
            toggleDragModeOnDblclick: false,
        });
    }

    applyCrop() {
        if (!this.cropper) return;
        
        const canvas = this.cropper.getCroppedCanvas({
            width: 2480,
            height: 3508,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high',
        });
        
        canvas.toBlob((blob) => {
            if (!blob) {
                alert('이미지 편집에 실패했습니다.');
                return;
            }
            
            const editedFile = new File([blob], this.originalImageFile?.name || 'edited-image.jpg', {
                type: 'image/jpeg',
                lastModified: Date.now()
            });
            
            this.originalImageFile = editedFile;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                this.previewImg.src = e.target.result;
                lucide.createIcons();
            };
            reader.readAsDataURL(editedFile);
            
            this.closeCropModal();
        }, 'image/jpeg', 0.9);
    }

    closeCropModal() {
        this.cropModal.style.display = 'none';
        document.body.style.overflow = '';
        
        if (this.cropper) {
            this.cropper.destroy();
            this.cropper = null;
        }
    }

    async handleSubmit() {
        const courseData = {
            title: this.titleInput.value.trim(),
            description: this.descriptionInput.value.trim(),
            level: this.levelInput.value,
            total: this.totalInput.value.trim(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        try {
            if (this.originalImageFile) {
                const imageUrl = await this.uploadImage(this.originalImageFile);
                courseData.imageUrl = imageUrl;
            } else if (this.imageInput.files[0]) {
                const imageUrl = await this.uploadImage(this.imageInput.files[0]);
                courseData.imageUrl = imageUrl;
            } else if (this.currentEditId) {
                const existingCourse = this.courses.find(c => c.id === this.currentEditId);
                if (existingCourse && existingCourse.imageUrl) {
                    courseData.imageUrl = existingCourse.imageUrl;
                }
            }
            
            if (this.currentEditId) {
                await db.collection(this.collection).doc(this.currentEditId).update(courseData);
                alert('✅ 수정되었습니다!');
            } else {
                courseData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
                await db.collection(this.collection).add(courseData);
                alert('✅ 추가되었습니다!');
            }
            
            this.closeModal();
            await this.loadCourses();
        } catch (error) {
            console.error('❌ 저장 실패:', error);
            alert('저장에 실패했습니다: ' + error.message);
        }
    }

    async uploadImage(file) {
        try {
            const timestamp = Date.now();
            const fileName = `courses/${timestamp}_${file.name}`;
            const storageRef = storage.ref(fileName);
            
            await storageRef.put(file);
            const url = await storageRef.getDownloadURL();
            console.log('✅ 이미지 업로드 완료:', url);
            return url;
        } catch (error) {
            console.error('❌ 이미지 업로드 실패:', error);
            throw error;
        }
    }

    async deleteCourse(id) {
        if (!confirm('정말 이 강의를 삭제하시겠습니까?')) return;
        
        try {
            const course = this.courses.find(c => c.id === id);
            if (course && course.imageUrl) {
                try {
                    const imageRef = storage.refFromURL(course.imageUrl);
                    await imageRef.delete();
                    console.log('✅ 이미지 삭제 완료');
                } catch (error) {
                    console.warn('⚠️ 이미지 삭제 실패:', error);
                }
            }
            
            await db.collection(this.collection).doc(id).delete();
            alert('✅ 삭제되었습니다!');
            await this.loadCourses();
        } catch (error) {
            console.error('❌ 삭제 실패:', error);
            alert('삭제에 실패했습니다.');
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
                <div class="aspect-[2480/3508] bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                    ${course.imageUrl ? 
                        `<img src="${course.imageUrl}" alt="${this.escapeHtml(course.title)}" class="w-full h-full object-contain">` :
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
                    <div class="mb-4">
                        ${this.getDescriptionHTML(course)}
                    </div>
                    <div class="flex items-center text-sm text-slate-500 mb-4">
                        <i data-lucide="book-open" class="w-4 h-4 mr-2"></i>
                        <span>총 강의 수: ${this.escapeHtml(course.total || '미정')}</span>
                    </div>
                    ${isAdmin ? `
                    <div class="flex gap-2 pt-4 border-t border-slate-200">
                        <button onclick="coursesManager.openModal(${JSON.stringify(course).replace(/"/g, '&quot;')})" class="flex-1 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                            <i data-lucide="edit-2" class="w-4 h-4"></i>
                            수정
                        </button>
                        <button onclick="coursesManager.deleteCourse('${course.id}')" class="flex-1 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
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

    getDescriptionHTML(course) {
        const description = course.description || '';
        const maxLength = 100;
        
        if (description.length <= maxLength) {
            return `<p class="text-slate-600 whitespace-pre-wrap">${this.escapeHtml(description)}</p>`;
        }
        
        const shortDesc = description.substring(0, maxLength) + '...';
        const fullDesc = description;
        
        return `
            <p id="course-desc-${course.id}" class="text-slate-600 whitespace-pre-wrap">${this.escapeHtml(shortDesc)}</p>
            <p id="course-desc-full-${course.id}" class="text-slate-600 whitespace-pre-wrap hidden">${this.escapeHtml(fullDesc)}</p>
            <button onclick="coursesManager.toggleDescription('${course.id}')" id="course-desc-btn-${course.id}" class="mt-2 text-brand hover:text-brand-dark font-semibold text-sm flex items-center gap-1 transition-colors">
                <span>자세히 보기</span>
                <i data-lucide="chevron-down" class="w-4 h-4"></i>
            </button>
        `;
    }

    toggleDescription(courseId) {
        const shortDesc = document.getElementById(`course-desc-${courseId}`);
        const fullDesc = document.getElementById(`course-desc-full-${courseId}`);
        const btn = document.getElementById(`course-desc-btn-${courseId}`);
        
        if (shortDesc && fullDesc && btn) {
            if (shortDesc.classList.contains('hidden')) {
                // 접기
                shortDesc.classList.remove('hidden');
                fullDesc.classList.add('hidden');
                btn.innerHTML = '<span>자세히 보기</span><i data-lucide="chevron-down" class="w-4 h-4"></i>';
            } else {
                // 펼치기
                shortDesc.classList.add('hidden');
                fullDesc.classList.remove('hidden');
                btn.innerHTML = '<span>접기</span><i data-lucide="chevron-up" class="w-4 h-4"></i>';
            }
            lucide.createIcons();
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

let coursesManager;
document.addEventListener('DOMContentLoaded', () => {
    if (typeof firebase === 'undefined') {
        console.error('❌ Firebase가 로드되지 않았습니다!');
        alert('Firebase 연결에 실패했습니다. 페이지를 새로고침해주세요.');
        return;
    }
    
    coursesManager = new CoursesManager();
    lucide.createIcons();
});
