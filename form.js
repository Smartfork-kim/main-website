export function initForm() {
    const form = document.getElementById('contact-form');
    const statusDiv = document.getElementById('form-status');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button');
        const originalContent = btn.innerHTML;
        

        btn.disabled = true;
        btn.innerHTML = '<span class="animate-spin mr-2">⏳</span> 전송 중...';
        btn.classList.add('opacity-75');
        statusDiv.textContent = '문의를 전송하고 있습니다. 잠시만 기다려주세요.';


        setTimeout(() => {

            btn.innerHTML = '<span class="mr-2">✅</span> 전송 완료!';
            btn.classList.remove('bg-slate-900', 'opacity-75');
            btn.classList.add('bg-green-600');
            statusDiv.textContent = '문의가 성공적으로 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.';
            
            form.reset();
            
            alert('문의가 성공적으로 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.');


            setTimeout(() => {
                btn.disabled = false;
                btn.classList.remove('bg-green-600');
                btn.classList.add('bg-slate-900');
                btn.innerHTML = originalContent;
                lucide.createIcons(); // Re-render icons
                statusDiv.textContent = ''; // Clear status
            }, 3000);
        }, 1500);
    });
}
