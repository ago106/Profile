document.addEventListener('DOMContentLoaded', function() {
    // Инициализация табов
    const tabs = document.querySelectorAll('.admin-nav li');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Убрать активный класс со всех табов
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Добавить активный класс текущему табу
            tab.classList.add('active');
            document.getElementById(`tab-${tabId}`).classList.add('active');
            
            // Обновить заголовок
            document.getElementById('adminTabTitle').textContent = tab.textContent.trim();
            document.getElementById('adminTabDescription').textContent = 
                getTabDescription(tabId);
        });
    });
    
    // Описание табов
    function getTabDescription(tabId) {
        const descriptions = {
            general: 'Управление основными параметрами профиля',
            cosmetic: 'Настройка внешнего вида и стилей',
            social: 'Управление социальными сетями и ссылками',
            links: 'Добавление и редактирование кастомных ссылок',
            media: 'Настройка встроенного медиа контента',
            files: 'Загрузка и управление файлами профиля',
            badges: 'Управление значками и достижениями'
        };
        return descriptions[tabId] || 'Настройки профиля';
    }
    
    // Загрузка текущих настроек
    function loadSettings() {
        // Основные настройки
        document.getElementById('profileUrl').value = 
            localStorage.getItem('profileUrl') || 'ago106';
        document.getElementById('aliasUrl').value = 
            localStorage.getItem('aliasUrl') || 'agushenka';
        document.getElementById('pageTitle').value = 
            localStorage.getItem('pageTitle') || 'ENKA-VIKOS-AGUSH';
        document.getElementById('displayName').value = 
            localStorage.getItem('displayName') || 'Agushenka';
        document.getElementById('animatedTitle').value = 
            localStorage.getItem('animatedTitle') || 'typing';
        document.getElementById('profileDescription').value = 
            localStorage.getItem('profileDescription') || 
            '◆ Days, weeks, months may pass — but our meeting is inevitable. ◆\n◊ However long it takes, we will wait for one another. ◊';
        document.getElementById('typingEffect').value = 
            localStorage.getItem('typingEffect') || 'typewriter';
        
        // Настройки внешнего вида
        document.getElementById('primaryColor').value = 
            localStorage.getItem('primaryColor') || '#7c3aed';
        document.getElementById('secondaryColor').value = 
            localStorage.getItem('secondaryColor') || '#10b981';
        document.getElementById('accentColor').value = 
            localStorage.getItem('accentColor') || '#f59e0b';
        document.getElementById('textColor').value = 
            localStorage.getItem('textColor') || '#f8fafc';
        document.getElementById('backgroundColor').value = 
            localStorage.getItem('backgroundColor') || '#0f172a';
        
        // Чекбоксы
        ['showViews', 'showBadges', 'animations', 'tiltEffect', 
         'usernameSparkle', 'cursorEffect', 'avatarDecoration', 
         'themeColoredIcons'].forEach(id => {
            const value = localStorage.getItem(id);
            document.getElementById(id).checked = value !== 'false';
        });
        
        // Слайдеры
        ['opacity', 'blur', 'borderRadius', 'backgroundBlur'].forEach(id => {
            const value = localStorage.getItem(id) || 
                (id === 'opacity' ? '75' : 
                 id === 'blur' ? '5' : 
                 id === 'borderRadius' ? '15' : '10');
            document.getElementById(id).value = value;
            document.getElementById(`${id}Value`).textContent = value;
        });
        
        // Социальные сети
        loadSocials();
        
        // Кастомные ссылки
        loadCustomLinks();
        
        // Медиа
        document.getElementById('embedTitle').value = 
            localStorage.getItem('embedTitle') || 'Мое любимое видео на YouTube!';
        document.getElementById('embedUrl').value = 
            localStorage.getItem('embedUrl') || 'https://www.youtube.com/watch?v=xwfZjp5Pg60';
        document.getElementById('embedOpenByDefault').checked = 
            localStorage.getItem('embedOpenByDefault') !== 'false';
        
        // Discord
        document.getElementById('discordInvite').value = 
            localStorage.getItem('discordInvite') || 'https://discord.gg/spacerb';
        document.getElementById('showDiscordPresence').checked = 
            localStorage.getItem('showDiscordPresence') !== 'false';
        
        // Музыка
        loadMusicList();
        document.getElementById('autoplayFix').checked = 
            localStorage.getItem('autoplayFix') === 'true';
        document.getElementById('useBackgroundAudio').checked = 
            localStorage.getItem('useBackgroundAudio') === 'true';
        
        // Значки
        loadBadges();
    }
    
    // Загрузка социальных сетей
    function loadSocials() {
        const socials = JSON.parse(localStorage.getItem('socials') || '[]');
        const container = document.getElementById('activeSocials');
        
        container.innerHTML = '';
        socials.forEach((social, index) => {
            const item = document.createElement('div');
            item.className = 'sortable-item';
            item.innerHTML = `
                <i class="fas fa-grip-vertical"></i>
                <i class="${social.icon}"></i>
                <span>${social.text}</span>
                <span style="color: #94a3b8; margin-left: auto;">${social.url}</span>
                <i class="fas fa-edit edit-social" data-index="${index}"></i>
                <i class="fas fa-trash delete-social" data-index="${index}"></i>
            `;
            container.appendChild(item);
        });
        
        // Добавляем обработчики для редактирования и удаления
        document.querySelectorAll('.edit-social').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                editSocial(index);
            });
        });
        
        document.querySelectorAll('.delete-social').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                deleteSocial(index);
            });
        });
    }
    
    // Загрузка кастомных ссылок
    function loadCustomLinks() {
        const links = JSON.parse(localStorage.getItem('customLinks') || '[]');
        const container = document.getElementById('customLinksList');
        
        container.innerHTML = '';
        links.forEach((link, index) => {
            const item = document.createElement('div');
            item.className = 'sortable-item';
            item.innerHTML = `
                <i class="fas fa-grip-vertical"></i>
                <i class="${link.icon}"></i>
                <span>${link.title}</span>
                <span style="color: #94a3b8; margin-left: auto;">${link.url}</span>
                <i class="fas fa-edit edit-link" data-index="${index}"></i>
                <i class="fas fa-trash delete-link" data-index="${index}"></i>
            `;
            container.appendChild(item);
        });
        
        document.getElementById('showLinkUrl').checked = 
            localStorage.getItem('showLinkUrl') !== 'false';
    }
    
    // Загрузка списка музыки
    function loadMusicList() {
        const musicList = JSON.parse(localStorage.getItem('musicList') || '[]');
        const container = document.getElementById('musicList');
        
        if (musicList.length === 0) {
            const defaultMusic = [
                { name: 'Its A Dream.mp3', url: 'assets/audio/song1.mp3' },
                { name: 'KPACABMIA (speed up).mp3', url: 'assets/audio/song2.mp3' },
                { name: 'devil town.mp3', url: 'assets/audio/song3.mp3' }
            ];
            localStorage.setItem('musicList', JSON.stringify(defaultMusic));
            musicList.push(...defaultMusic);
        }
        
        container.innerHTML = '';
        musicList.forEach((track, index) => {
            const item = document.createElement('div');
            item.className = 'music-item';
            item.innerHTML = `
                <span>${track.name}</span>
                <div>
                    <button class="btn-secondary btn-sm play-music" data-index="${index}">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="btn-secondary btn-sm delete-music" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            container.appendChild(item);
        });
    }
    
    // Загрузка значков
    function loadBadges() {
        const badges = JSON.parse(localStorage.getItem('badges') || '[]');
        const container = document.getElementById('badgesSelector');
        
        const allBadges = [
            { name: 'Verified', icon: 'fas fa-check-circle', color: '#10b981' },
            { name: 'Premium', icon: 'fas fa-crown', color: '#f59e0b' },
            { name: 'Donor', icon: 'fas fa-heart', color: '#ef4444' },
            { name: 'Bug Hunter', icon: 'fas fa-bug', color: '#8b5cf6' },
            { name: 'Staff', icon: 'fas fa-user-shield', color: '#3b82f6' },
            { name: 'Christmas 2024', icon: 'fas fa-gift', color: '#10b981' },
            { name: 'Winner', icon: 'fas fa-trophy', color: '#f59e0b' },
            { name: 'Early Supporter', icon: 'fas fa-star', color: '#06b6d4' },
            { name: 'Image Host', icon: 'fas fa-image', color: '#8b5cf6' },
            { name: 'Server Booster', icon: 'fas fa-rocket', color: '#f59e0b' },
            { name: 'The Million', icon: 'fas fa-award', color: '#7c3aed' },
            { name: 'Helper', icon: 'fas fa-hands-helping', color: '#10b981' },
            { name: 'Domain Legend', icon: 'fas fa-globe', color: '#3b82f6' },
            { name: 'Easter 2025', icon: 'fas fa-egg', color: '#8b5cf6' }
        ];
        
        container.innerHTML = '';
        allBadges.forEach((badge, index) => {
            const isSelected = badges.some(b => b.name === badge.name);
            const item = document.createElement('div');
            item.className = `badge-select-item ${isSelected ? 'selected' : ''}`;
            item.innerHTML = `
                <div style="font-size: 2rem; color: ${badge.color}; margin-bottom: 10px;">
                    <i class="${badge.icon}"></i>
                </div>
                <div>${badge.name}</div>
            `;
            item.addEventListener('click', () => {
                toggleBadge(badge);
                item.classList.toggle('selected');
            });
            container.appendChild(item);
        });
    }
    
    // Добавление социальной сети
    document.getElementById('addSocialBtn').addEventListener('click', () => {
        const platform = document.getElementById('socialPlatform').value;
        const url = document.getElementById('socialUrl').value;
        const text = document.getElementById('socialText').value;
        
        if (!url || !text) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        
        const iconMap = {
            discord: 'fab fa-discord',
            telegram: 'fab fa-telegram',
            youtube: 'fab fa-youtube',
            github: 'fab fa-github',
            twitter: 'fab fa-twitter',
            instagram: 'fab fa-instagram',
            vkontakte: 'fab fa-vk',
            spotify: 'fab fa-spotify',
            twitch: 'fab fa-twitch',
            custom: 'fas fa-link'
        };
        
        const social = {
            platform,
            url,
            text,
            icon: iconMap[platform] || 'fas fa-link'
        };
        
        const socials = JSON.parse(localStorage.getItem('socials') || '[]');
        socials.push(social);
        localStorage.setItem('socials', JSON.stringify(socials));
        
        loadSocials();
        
        // Очистка полей
        document.getElementById('socialUrl').value = '';
        document.getElementById('socialText').value = '';
        
        alert('Социальная сеть добавлена!');
    });
    
    // Добавление кастомной ссылки
    document.getElementById('addCustomLinkBtn').addEventListener('click', () => {
        const title = document.getElementById('linkTitle').value;
        const url = document.getElementById('linkUrl').value;
        const icon = document.getElementById('linkIcon').value || 'fas fa-link';
        
        if (!title || !url) {
            alert('Пожалуйста, заполните заголовок и ссылку');
            return;
        }
        
        const link = { title, url, icon };
        const links = JSON.parse(localStorage.getItem('customLinks') || '[]');
        links.push(link);
        localStorage.setItem('customLinks', JSON.stringify(links));
        
        loadCustomLinks();
        
        // Очистка полей
        document.getElementById('linkTitle').value = '';
        document.getElementById('linkUrl').value = '';
        document.getElementById('linkIcon').value = '';
        
        alert('Ссылка добавлена!');
    });
    
    // Сохранение основных настроек
    document.getElementById('saveGeneralBtn').addEventListener('click', () => {
        const settings = {
            profileUrl: document.getElementById('profileUrl').value,
            aliasUrl: document.getElementById('aliasUrl').value,
            pageTitle: document.getElementById('pageTitle').value,
            displayName: document.getElementById('displayName').value,
            animatedTitle: document.getElementById('animatedTitle').value,
            profileDescription: document.getElementById('profileDescription').value,
            typingEffect: document.getElementById('typingEffect').value
        };
        
        Object.keys(settings).forEach(key => {
            localStorage.setItem(key, settings[key]);
        });
        
        alert('Основные настройки сохранены!');
    });
    
    // Сохранение настроек внешнего вида
    document.getElementById('saveCosmeticBtn').addEventListener('click', () => {
        // Сохранение цветов
        const colors = {
            primaryColor: document.getElementById('primaryColor').value,
            secondaryColor: document.getElementById('secondaryColor').value,
            accentColor: document.getElementById('accentColor').value,
            textColor: document.getElementById('textColor').value,
            backgroundColor: document.getElementById('backgroundColor').value
        };
        
        Object.keys(colors).forEach(key => {
            localStorage.setItem(key, colors[key]);
        });
        
        // Сохранение CSS переменных
        const cssVars = {
            '--primary-color': colors.primaryColor,
            '--secondary-color': colors.secondaryColor,
            '--accent-color': colors.accentColor,
            '--text-color': colors.textColor,
            '--bg-color': colors.backgroundColor,
            '--opacity': (document.getElementById('opacity').value / 100).toString(),
            '--blur': document.getElementById('blur').value + 'px',
            '--border-radius': document.getElementById('borderRadius').value + 'px',
            '--bg-blur': document.getElementById('backgroundBlur').value + 'px'
        };
        
        localStorage.setItem('cssVars', JSON.stringify(cssVars));
        
        // Сохранение переключателей
        ['showViews', 'showBadges', 'animations', 'tiltEffect', 
         'usernameSparkle', 'cursorEffect', 'avatarDecoration', 
         'themeColoredIcons'].forEach(id => {
            localStorage.setItem(id, document.getElementById(id).checked.toString());
        });
        
        // Сохранение слайдеров
        ['opacity', 'blur', 'borderRadius', 'backgroundBlur'].forEach(id => {
            localStorage.setItem(id, document.getElementById(id).value);
        });
        
        alert('Настройки внешнего вида сохранены!');
    });
    
    // Сохранение медиа
    document.getElementById('saveEmbedBtn').addEventListener('click', () => {
        localStorage.setItem('embedTitle', document.getElementById('embedTitle').value);
        localStorage.setItem('embedUrl', document.getElementById('embedUrl').value);
        localStorage.setItem('embedOpenByDefault', document.getElementById('embedOpenByDefault').checked.toString());
        
        alert('Настройки медиа сохранены!');
    });
    
    // Сохранение Discord
    document.getElementById('discordInvite').addEventListener('change', () => {
        localStorage.setItem('discordInvite', document.getElementById('discordInvite').value);
    });
    
    document.getElementById('showDiscordPresence').addEventListener('change', () => {
        localStorage.setItem('showDiscordPresence', document.getElementById('showDiscordPresence').checked.toString());
    });
    
    // Загрузка файлов
    const fileInputs = ['avatarUpload', 'bannerUpload', 'cursorUpload', 'musicUpload'];
    fileInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('change', function(e) {
                handleFileUpload(this.id, e.target.files);
            });
        }
    });
    
    // Использование Discord аватара
    document.getElementById('useDiscordAvatarBtn').addEventListener('click', () => {
        // Здесь можно интегрировать Discord API
        alert('Функция Discord аватара будет доступна после интеграции с Discord API');
    });
    
    // Удаление баннера
    document.getElementById('removeBannerBtn').addEventListener('click', () => {
        if (confirm('Удалить баннер?')) {
            localStorage.removeItem('bannerImage');
            document.getElementById('bannerPreview').src = '';
            alert('Баннер удален!');
        }
    });
    
    // Сохранение всех настроек
    document.getElementById('saveAllBtn').addEventListener('click', () => {
        // Сохраняем все вкладки
        document.getElementById('saveGeneralBtn').click();
        document.getElementById('saveCosmeticBtn').click();
        document.getElementById('saveEmbedBtn').click();
        
        // Сохраняем Discord настройки
        localStorage.setItem('discordInvite', document.getElementById('discordInvite').value);
        localStorage.setItem('showDiscordPresence', 
            document.getElementById('showDiscordPresence').checked.toString());
        
        // Сохраняем настройки ссылок
        localStorage.setItem('showLinkUrl', 
            document.getElementById('showLinkUrl').checked.toString());
        
        // Сохраняем настройки музыки
        localStorage.setItem('autoplayFix', 
            document.getElementById('autoplayFix').checked.toString());
        localStorage.setItem('useBackgroundAudio', 
            document.getElementById('useBackgroundAudio').checked.toString());
        
        alert('Все настройки сохранены!');
    });
    
    // Предпросмотр
    document.getElementById('previewBtn').addEventListener('click', () => {
        window.open('index.html', '_blank');
    });
    
    // Сброс основных настроек
    document.getElementById('resetGeneralBtn').addEventListener('click', () => {
        if (confirm('Сбросить основные настройки к значениям по умолчанию?')) {
            ['profileUrl', 'aliasUrl', 'pageTitle', 'displayName', 
             'animatedTitle', 'profileDescription', 'typingEffect'].forEach(key => {
                localStorage.removeItem(key);
            });
            loadSettings();
            alert('Основные настройки сброшены!');
        }
    });
    
    // Сброс темы
    document.getElementById('themeResetBtn').addEventListener('click', () => {
        if (confirm('Сбросить настройки темы к стандартным?')) {
            ['primaryColor', 'secondaryColor', 'accentColor', 
             'textColor', 'backgroundColor', 'cssVars'].forEach(key => {
                localStorage.removeItem(key);
            });
            
            ['showViews', 'showBadges', 'animations', 'tiltEffect', 
             'usernameSparkle', 'cursorEffect', 'avatarDecoration', 
             'themeColoredIcons', 'opacity', 'blur', 'borderRadius', 
             'backgroundBlur'].forEach(key => {
                localStorage.removeItem(key);
            });
            
            loadSettings();
            alert('Настройки темы сброшены!');
        }
    });
    
    // Вспомогательные функции
    function editSocial(index) {
        const socials = JSON.parse(localStorage.getItem('socials') || '[]');
        const social = socials[index];
        
        const newUrl = prompt('Новая ссылка:', social.url);
        if (newUrl !== null) {
            const newText = prompt('Новый текст:', social.text);
            if (newText !== null) {
                socials[index].url = newUrl;
                socials[index].text = newText;
                localStorage.setItem('socials', JSON.stringify(socials));
                loadSocials();
            }
        }
    }
    
    function deleteSocial(index) {
        if (confirm('Удалить эту социальную сеть?')) {
            const socials = JSON.parse(localStorage.getItem('socials') || '[]');
            socials.splice(index, 1);
            localStorage.setItem('socials', JSON.stringify(socials));
            loadSocials();
        }
    }
    
    function toggleBadge(badge) {
        const badges = JSON.parse(localStorage.getItem('badges') || '[]');
        const existingIndex = badges.findIndex(b => b.name === badge.name);
        
        if (existingIndex > -1) {
            badges.splice(existingIndex, 1);
        } else {
            badges.push({
                name: badge.name,
                description: getBadgeDescription(badge.name),
                icon: badge.icon,
                color: badge.color
            });
        }
        
        localStorage.setItem('badges', JSON.stringify(badges));
    }
    
    function getBadgeDescription(name) {
        const descriptions = {
            'Verified': 'Проверенный пользователь',
            'Premium': 'Премиум подписка',
            'Donor': 'Пожертвовал 10€+',
            'Bug Hunter': 'Сообщил об ошибке',
            'Staff': 'Команда проекта',
            'Christmas 2024': 'Зимняя распродажа 2024',
            'Winner': 'Победитель события',
            'Early Supporter': 'Ранний сторонник',
            'Image Host': 'Купил Image Host',
            'Server Booster': 'Сделал boost Discord сервера',
            'The Million': 'Значок в честь 1М пользователей',
            'Helper': 'Активен и помогает пользователям',
            'Domain Legend': 'Добавил публичный домен',
            'Easter 2025': 'Эксклюзивный значок Пасхи 2025'
        };
        return descriptions[name] || 'Достижение';
    }
    
    function handleFileUpload(type, files) {
        if (!files.length) return;
        
        if (type === 'musicUpload') {
            handleMusicUpload(files);
            return;
        }
        
        const file = files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const dataUrl = e.target.result;
            
            switch(type) {
                case 'avatarUpload':
                    document.getElementById('avatarPreview').src = dataUrl;
                    localStorage.setItem('avatarImage', dataUrl);
                    break;
                case 'bannerUpload':
                    document.getElementById('bannerPreview').src = dataUrl;
                    localStorage.setItem('bannerImage', dataUrl);
                    break;
                case 'cursorUpload':
                    document.getElementById('cursorPreview').src = dataUrl;
                    localStorage.setItem('cursorImage', dataUrl);
                    break;
            }
            
            alert('Файл загружен!');
        };
        
        reader.readAsDataURL(file);
    }
    
    function handleMusicUpload(files) {
        const musicList = JSON.parse(localStorage.getItem('musicList') || '[]');
        
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                musicList.push({
                    name: file.name,
                    url: e.target.result,
                    size: file.size
                });
                
                localStorage.setItem('musicList', JSON.stringify(musicList));
                loadMusicList();
            };
            
            reader.readAsDataURL(file);
        });
        
        alert(`Загружено ${files.length} треков!`);
    }
    
    // Инициализация загрузки настроек
    loadSettings();
    
    // Инициализация слайдеров
    ['opacity', 'blur', 'borderRadius', 'backgroundBlur'].forEach(id => {
        const slider = document.getElementById(id);
        const valueSpan = document.getElementById(`${id}Value`);
        
        slider.addEventListener('input', () => {
            valueSpan.textContent = slider.value;
        });
    });
});
