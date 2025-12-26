// система перевода
const translations = {
    en: {
        "nav-about": "About me",
        "nav-projects": "Projects",
        "nav-skills": "Skills",
        "nav-contact": "Contact me",
        "tagline": "2D Game Developer | Godot Specialist",
        "about-title": "About Me",
        "project-title": "> _PROJECTs.exe",
        "skills-title": "Skills & Tools",
        "contact-title": "Contact & Links",
        "about-text": "2D Indie-game developer with hands-on experience in full-cycle game creation using Godot Engine. From game design and programming to pixel art and VFX – I bring ideas to life. Evolution never stop and mental progress make world better...",
        "image-label-1": "THOSE ENDLESS NIGHTS WE PLAYED...",
        "image-label-2": "CRUSHING ENEMIES, ONE AFTER ANOTHER...",
        "image-label-3": "WE GAVE OUR HEARTS AND WAITED FOR PARENTS TO COME HOME...",
        "image-label-4": "PIXEL BY PIXEL - WE WERE THERE... TOGETHER..",
        "skills-core": "🛠️ Core Stack",
        "skills-dev": "🎮 Game Dev",
        "skills-art": "✨ Content Creation",
        "btn-email": "📧 Email",
        "btn-github": "💻 GitHub",
        "btn-cv": "📄 Request CV",
        "footer-text": "© 2025 Bagaudin B.A / The Retro Hero studio. Built with ❤️ LOVE to the NEON Generation<span class=\"blinking-cursor\"></span>",
        "alt-image-1": "THOSE ENDLESS NIGHTS WE PLAYED...",
        "alt-image-2": "CRUSHING ENEMIES, ONE AFTER ANOTHER...",
        "alt-image-3": "WE GAVE OUR HEARTS AND WAITED FOR PARENTS TO COME HOME...",
        "alt-image-4": "PIXEL BY PIXEL - WE WERE THERE... TOGETHER..."
    },
    
    ru: {
        "nav-about": "Обо мне",
        "nav-projects": "Проекты",
        "nav-skills": "Навыки",
        "nav-contact": "Контакты",
        "tagline": "Инди-разработка | Специалист по Godot",
        "about-title": "Обо мне",
        "project-title": "> _PROJECTs.exe",
        "skills-title": "Навыки и инструменты",
        "contact-title": "Контакты и ссылки",
        "about-text": "2D инди-разработчик игр с практическим опытом полного цикла создания игр на Godot Engine. От геймдизайна и программирования до пиксель-арта и визуальных эффектов — я воплощаю идеи в жизнь. Эволюция никогда не останавливается, а ментальное развитие делает мир лучше...",
        "image-label-1": "ТЕ БЕСКОНЕЧНЫЕ НОЧИ ЗА ИГРОЙ...",
        "image-label-2": "УНИЧТОЖАЯ ВРАГОВ ОДНОГО ЗА ДРУГИМ...",
        "image-label-3": "МЫ ОТДАВАЛИ СЕРДЦА И ЖДАЛИ РОДИТЕЛЕЙ...",
        "image-label-4": "ПИКСЕЛЬ ЗА ПИКСЕЛЕМ - МЫ БЫЛИ ТАМ... ВМЕСТЕ..",
        "skills-core": "🛠️ Основной стек",
        "skills-dev": "🎮 Разработка игр",
        "skills-art": "✨ Создание контента",
        "btn-email": "📧 Почта",
        "btn-github": "💻 GitHub",
        "btn-cv": "📄 Запросить резюме",
        "footer-text": "© 2025 Bagaudin B.A / The Retro Hero studio. Built with ❤️ LOVE to the NEON Generation<span class=\"blinking-cursor\"></span>",
        "alt-image-1": "Те бесконечные ночи за игрой...",
        "alt-image-2": "Уничтожая врагов одного за другим...",
        "alt-image-3": "Мы отдавали сердца и ждали родителей...",
        "alt-image-4": "Пиксель за пикселем - мы были там... вместе.."
    }
};

// Определяем язык
function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const savedLang = localStorage.getItem('portfolio-lang');
    
    if (savedLang) return savedLang;
    if (browserLang.startsWith('ru')) return 'ru';
    return 'en';
}

// Обновление фавикон
function forceTabUpdate() {
    try {
        const link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        
        // Добавление временную метку чтобы сбросить кэш
        const timestamp = new Date().getTime();
        link.href = './assets/favicon.png?' + timestamp;
        
        // Удаление старого фавикон если есть
        const oldLinks = document.querySelectorAll("link[rel*='icon']");
        oldLinks.forEach(oldLink => {
            if (oldLink.parentNode) {
                oldLink.parentNode.removeChild(oldLink);
            }
        });
        
        document.head.appendChild(link);
        
        console.log('🔄 Favicon updated to force tab refresh');
        return true;
    } catch (error) {
        console.log('⚠️ Could not update favicon:', error.message);
        return false;
    }
}

// обновления тайтла для языка
function updatePageTitle(lang) {
    const titles = {
        'en': 'Bagaudin B.A | 2D Game Developer',
        'ru': 'Bagaudin B.A | Разработчик игр'
    };
    
    const newTitle = titles[lang] || titles.en;
    
    console.log('📝 Updating title to:', newTitle);
    
    // Обновление всеми способами
    document.title = newTitle;
    
    const titleElement = document.getElementById('page-title');
    if (titleElement) {
        titleElement.textContent = newTitle;
    }
    
    const titleByQuery = document.querySelector('title');
    if (titleByQuery) {
        titleByQuery.textContent = newTitle;
    }
    
    // Принудительно re
    const forceUpdate = () => {
        document.title = newTitle + ' ';
        setTimeout(() => {
            document.title = newTitle;
        }, 20);
    };
    
    // Вызов несколько раз на всякий пожарный
    forceUpdate();
    setTimeout(forceUpdate, 50);
    setTimeout(forceUpdate, 100);
    
    console.log('✅ Title update initiated');
    return newTitle;
}

// Смена языка
function setLanguage(lang) {
    console.log('🔄 Switching to language:', lang);
    
    // Обновление кнопки
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Обновление текста
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
            
            if (key === 'about-text') {
                const text = element.innerHTML;
                element.innerHTML = text.replace('Godot Engine', '<strong>Godot Engine</strong>');
            }
        }
    });
    
    // Обновление альт атрибуты
    document.querySelectorAll('[data-i18n-alt]').forEach(img => {
        const key = img.dataset.i18nAlt;
        if (translations[lang] && translations[lang][key]) {
            img.alt = translations[lang][key];
        }
    });
    
    // Обновление тайтла страницы
    updatePageTitle(lang);
    
    // форсирую фавикон
    setTimeout(() => {
        forceTabUpdate();
    }, 30);
    
    // Обновление атрибута лэнг html
    document.documentElement.lang = lang;
    
    // Сохранение выбора
    localStorage.setItem('portfolio-lang', lang);
    
    console.log('✅ Language switched to', lang);
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, initializing translation...');
    
    const currentLang = detectLanguage();
    console.log('🌍 Detected language:', currentLang);
    
    // Настраиваем переключатели
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('🎯 Language button clicked:', this.dataset.lang);
            setLanguage(this.dataset.lang);
        });
    });
    
    // язык
    setLanguage(currentLang);
    
    console.log('✅ Translation system initialized');
    
    // Проверка тайтл в консоли
    window.checkTitle = function() {
        const titleEl = document.getElementById('page-title');
        console.log('Title by id:', titleEl ? titleEl.textContent : 'not found');
        console.log('Title by query:', document.querySelector('title')?.textContent);
        console.log('document.title:', document.title);
    };
    
    // теста обновы
    window.testTitleUpdate = function() {
        console.log('Testing title update...');
        document.title = 'ТЕСТ РУССКИЙ ' + Date.now();
        setTimeout(() => {
            document.title = 'Bagaudin B.A | 2D/3D Game Developer';
            forceTabUpdate();
        }, 100);
    };
});