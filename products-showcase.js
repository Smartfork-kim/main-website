// 제품 쇼케이스 관리 시스템

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

class ProductsManager {
    constructor() {
        this.storageKey = 'products_data';
        this.products = this.loadProducts();
        this.currentEditId = null;
        this.auth = new AdminAuth();
        this.initElements();
        this.bindEvents();
        this.updateAdminUI();
        this.render();
    }

    initElements() {
        this.adminModeBtn = document.getElementById('admin-mode-btn');
        this.addBtn = document.getElementById('add-product-btn');
        this.closeModalBtn = document.getElementById('close-modal-btn');
        this.cancelBtn = document.getElementById('cancel-btn');
        this.uploadBtn = document.getElementById('upload-btn');
        
        this.modal = document.getElementById('product-modal');
        this.modalTitle = document.getElementById('modal-title');
        
        this.form = document.getElementById('product-form');
        this.productId = document.getElementById('product-id');
        this.imageInput = document.getElementById('product-image');
        this.imagePreview = document.getElementById('image-preview');
        this.previewImg = document.getElementById('preview-img');
        this.titleInput = document.getElementById('product-title');
        this.descriptionInput = document.getElementById('product-description');
        this.categoryInput = document.getElementById('product-category');
        this.yearInput = document.getElementById('product-year');
        
        this.grid = document.getElementById('products-grid');
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

    loadProducts() {
        const data = localStorage.getItem(this.storageKey);
        if (data) {
            return JSON.parse(data);
        }
        return [
            {
                id: Date.now(),
                title: '샘플 제품',
                description: '이것은 샘플 제품입니다. 수정하거나 삭제 후 새로운 제품을 추가해보세요!',
                category: '카테고리',
                year: '2024',
                image: null
            }
        ];
    }

    saveProducts() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.products));
    }

    openModal(product = null) {
        this.currentEditId = product ? product.id : null;
        
        if (product) {
            this.modalTitle.textContent = '상품 수정';
            this.productId.value = product.id;
            this.titleInput.value = product.title;
            this.descriptionInput.value = product.description;
            this.categoryInput.value = product.category || '';
            this.yearInput.value = product.year;
            
            if (product.image) {
                this.previewImg.src = product.image;
                this.imagePreview.classList.remove('hidden');
            }
        } else {
            this.modalTitle.textContent = '상품 추가';
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
        const productData = {
            title: this.titleInput.value.trim(),
            description: this.descriptionInput.value.trim(),
            category: this.categoryInput.value.trim() || '미분류',
            year: this.yearInput.value.trim(),
            image: this.previewImg.src || null
        };
        
        if (this.currentEditId) {
            const index = this.products.findIndex(p => p.id === this.currentEditId);
            if (index !== -1) {
                this.products[index] = {
                    ...this.products[index],
                    ...productData
                };
            }
        } else {
            this.products.unshift({
                id: Date.now(),
                ...productData
            });
        }
        
        this.saveProducts();
        this.closeModal();
        this.render();
    }

    deleteProduct(id) {
        if (!confirm('정말 이 제품을 삭제하시겠습니까?')) return;
        
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            this.render();
        }
    }

    render() {
        const isAdmin = this.auth.isAuthenticated();
        
        if (this.products.length === 0) {
            this.grid.innerHTML = '';
            this.emptyMessage.classList.remove('hidden');
            lucide.createIcons();
            return;
        }
        
        this.emptyMessage.classList.add('hidden');
        
        this.grid.innerHTML = this.products.map(product => `
            <div class="product-card bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300">
                <div class="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                    ${product.image ? 
                        `<img src="${product.image}" alt="${this.escapeHtml(product.title)}" class="w-full h-full object-cover">` :
                        `<div class="flex items-center justify-center h-full">
                            <div class="text-center p-8">
                                <div class="text-6xl mb-4">📦</div>
                                <p class="text-slate-500 text-sm">이미지 없음</p>
                            </div>
                        </div>`
                    }
                </div>
                <div class="p-6">
                    <h4 class="text-xl font-bold text-slate-900 mb-2">${this.escapeHtml(product.title)}</h4>
                    <p class="text-slate-600 mb-4">${this.escapeHtml(product.description)}</p>
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
                            <span class="flex items-center gap-1">
                                <i data-lucide="tag" class="w-4 h-4"></i>
                                ${this.escapeHtml(product.category)}
                            </span>
                            <span class="flex items-center gap-1">
                                <i data-lucide="calendar" class="w-4 h-4"></i>
                                ${product.year}
                            </span>
                        </div>
                    </div>
                    ${isAdmin ? `
                    <div class="flex gap-2 pt-4 border-t border-slate-200">
                        <button onclick="productsManager.openModal(${JSON.stringify(product).replace(/"/g, '&quot;')})" class="flex-1 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                            <i data-lucide="edit-2" class="w-4 h-4"></i>
                            수정
                        </button>
                        <button onclick="productsManager.deleteProduct(${product.id})" class="flex-1 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
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

let productsManager;
document.addEventListener('DOMContentLoaded', () => {
    productsManager = new ProductsManager();
    lucide.createIcons();
});

