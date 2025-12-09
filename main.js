import { initUI } from './ui.js';
import { initAnimations } from './animations.js';
import { initPortfolio } from './portfolio.js';
import { initContact } from './contact.js';

document.addEventListener('DOMContentLoaded', () => {

    lucide.createIcons();


    initUI();


    initAnimations();


    if (document.getElementById('portfolio-grid')) {
        initPortfolio();
    }

    if (document.getElementById('contact-form')) {
        initContact();
    }
});
