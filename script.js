document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const settingsPanel = document.getElementById('settingsPanel');
    const openSettingsBtn = document.getElementById('openSettings');
    const closeSettingsBtn = document.getElementById('closeSettings');
    const themeSelect = document.getElementById('themeSelect');
    const bgImageInput = document.getElementById('bgImageInput');
    const musicInput = document.getElementById('musicInput');
    const autoPlayCheckbox = document.getElementById('autoPlayCheckbox');
    const telegramInput = document.getElementById('telegramInput');
    const discordInput = document.getElementById('discordInput');
    const saveSettingsBtn = document.getElementById('saveSettings');
    const resetSettingsBtn = document.getElementById('resetSettings');
    const toggleMusicBtn = document.getElementById('toggleMusic');
    const musicStatus = document.getElementById('musicStatus');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = document.getElementById('playIcon');
    const volumeSlider = document.getElementById('volumeSlider');
    const progressSlider = document.getElementById('progressSlider');
    const badgesContainer = document.getElementById('badgesContainer');
    const badgesCount = document.getElementById('badgesCount');
    const linksContainer = document.getElementById('linksContainer');
    const headerBackground = document.getElementById('headerBackground');
    const viewCountElement = document.getElementById('viewCount');
    const currentYear = document.getElementById('currentYear');
    
    // Установка текущего года в футере
    currentYear.textContent = new Date().getFullYear();
    
    // Инициализация просмотров
    let views = localStorage.getItem('profileViews') || 1248;
    viewCountElement.textContent = numberWithCommas(views);
    
    // Увеличиваем счетчик просмотров при загрузке страницы
    views = parseInt(views) + 1;
    localStorage.setItem('profileViews', views);
    viewCountElement.textContent = numberWithCommas(views);
    
    // Данные значков
    const badgesData = [
        { id: 1, name: 'Verified', description: 'Проверенный пользователь', color: '#10b981', icon: 'fas fa-check-circle' },
        { id: 2, name: 'Premium', description: 'Премиум подписка', color: '#f59e0b', icon: 'fas fa-crown' },
        { id: 3, name: 'Donor', description: 'Пожертвовал 10€+', color: '#ef4444', icon: 'fas fa-heart' },
        { id: 4, name: 'Bug Hunter', description: 'Сообщил об ошибке', color: '#8b5cf6', icon: 'fas fa-bug' },
        { id: 5, name: 'Early Supporter', description: 'Ранний сторонник', color: '#06b6d4', icon: 'fas fa-star' },
        { id: 6, name: 'Staff', description: 'Команда проекта', color: '#3b82f6', icon: 'fas fa-user-shield' },
        { id: 7, name: 'Christmas 2024', description: 'Зимняя распродажа 2024', color: '#10b981', icon: 'fas fa-gift' },
        { id: 8, name: 'Winner', description: 'Победитель события', color: '#f59e0b', icon: 'fas fa-trophy' }
    ];
    
    // Данные ссылок
    const linksData = [
        { id: 1, title: 'Telegram Channel', description: 'Мой Telegram канал', url: 'https://t.me/ago106', icon: 'fab fa-telegram' },
        { id: 2, title: 'Discord Server', description: 'Присоединяйтесь к нашему Discord', url: 'https://discord.gg/spacerb', icon: 'fab fa-discord' },
        { id: 3, title: 'FunPay Shop', description: 'Мой магазин', url: '#', icon: 'fas fa-shopping-bag' }
    ];
    
    // Функция форматирования чисел с запятыми
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // Функция загрузки значков
    function loadBadges() {
        badgesContainer.innerHTML = '';
        
        badgesData.forEach(badge => {
            const badgeElement = document.createElement('div');
            badgeElement.className = 'badge-item';
            badgeElement.innerHTML = `
                <div class="badge-icon" style="background-color: ${badge.color}">
                    <i class="${badge.icon}"></i>
                </div>
                <div class="badge-info">
                    <h4>${badge.name}</h4>
                    <p>${badge.description}</p>
                </div>
            `;
            badgesContainer.appendChild(badgeElement);
        });
        
        badgesCount.textContent = badgesData.length;
    }
    
    // Функция загрузки ссылок
    function loadLinks() {
        linksContainer.innerHTML = '';
        
        linksData.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.className = 'link-item';
            linkElement.href = link.url;
            linkElement.target = '_blank';
            linkElement.innerHTML = `
                <div class="link-content">
                    <div class="link-icon">
                        <i class="${link.icon}"></i>
                    </div>
                    <div>
                        <div class="link-title">${link.title}</div>
                        <div class="link-description">${link.description}</div>
                    </div>
                </div>
                <div class="link-arrow">
                    <i class="fas fa-chevron-right"></i>
                </div>
            `;
            linksContainer.appendChild(linkElement);
        });
    }
    
    // Функция загрузки настроек из localStorage
    function loadSettings() {
        const savedTheme = localStorage.getItem('profileTheme') || 'dark';
        const savedBgImage = localStorage.getItem('profileBgImage') || '';
        const savedMusicUrl = localStorage.getItem('profileMusicUrl') || 'assets/audio/background-music.mp3';
        const savedAutoPlay = localStorage.getItem('profileAutoPlay') === 'true';
        const savedTelegram = localStorage.getItem('profileTelegram') || 'https://t.me/ago106';
        const savedDiscord = localStorage.getItem('profileDiscord') || 'https://discord.gg/spacerb';
        
        // Применение темы
        themeSelect.value = savedTheme;
        document.body.className = savedTheme + '-theme';
        
        // Применение фонового изображения
        if (savedBgImage) {
            headerBackground.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${savedBgImage}')`;
            headerBackground.style.backgroundSize = 'cover';
            headerBackground.style.backgroundPosition = 'center';
        }
        
        bgImageInput.value = savedBgImage;
        musicInput.value = savedMusicUrl;
        autoPlayCheckbox.checked = savedAutoPlay;
        telegramInput.value = savedTelegram;
        discordInput.value = savedDiscord;
        
        // Обновление музыки
        backgroundMusic.src = savedMusicUrl;
        
        if (savedAutoPlay) {
            backgroundMusic.play().catch(e => console.log("Автовоспроизведение заблокировано"));
            musicStatus.textContent = 'Музыка: Вкл';
            playIcon.className = 'fas fa-pause';
        }
        
        // Обновление ссылок в данных
        linksData[0].url = savedTelegram;
        linksData[1].url = savedDiscord;
        loadLinks();
    }
    
    // Функция сохранения настроек
    function saveSettings() {
        localStorage.setItem('profileTheme', themeSelect.value);
        localStorage.setItem('profileBgImage', bgImageInput.value);
        localStorage.setItem('profileMusicUrl', musicInput.value);
        localStorage.setItem('profileAutoPlay', autoPlayCheckbox.checked);
        localStorage.setItem('profileTelegram', telegramInput.value);
        localStorage.setItem('profileDiscord', discordInput.value);
        
        // Применение новых настроек
        document.body.className = themeSelect.value + '-theme';
        
        if (bgImageInput.value) {
            headerBackground.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${bgImageInput.value}')`;
            headerBackground.style.backgroundSize = 'cover';
            headerBackground.style.backgroundPosition = 'center';
        } else {
            headerBackground.style.background = 'linear-gradient(135deg, var(--primary-color), #3b0764)';
        }
        
        backgroundMusic.src = musicInput.value;
        
        if (autoPlayCheckbox.checked) {
            backgroundMusic.play().catch(e => console.log("Автовоспроизведение заблокировано"));
            musicStatus.textContent = 'Музыка: Вкл';
            playIcon.className = 'fas fa-pause';
        }
        
        // Обновление ссылок
        linksData[0].url = telegramInput.value;
        linksData[1].url = discordInput.value;
        loadLinks();
        
        // Закрытие панели настроек
        settingsPanel.classList.remove('active');
        
        // Уведомление о сохранении
        alert('Настройки сохранены!');
    }
    
    // Функция сброса настроек
    function resetSettings() {
        if (confirm('Вы уверены, что хотите сбросить все настройки?')) {
            localStorage.clear();
            loadSettings();
            alert('Настройки сброшены к значениям по умолчанию!');
        }
    }
    
    // Управление музыкой
    function toggleMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicStatus.textContent = 'Музыка: Вкл';
            playIcon.className = 'fas fa-pause';
        } else {
            backgroundMusic.pause();
            musicStatus.textContent = 'Музыка: Выкл';
            playIcon.className = 'fas fa-play';
        }
    }
    
    // Обновление громкости
    function updateVolume() {
        backgroundMusic.volume = volumeSlider.value / 100;
    }
    
    // Обновление прогресса воспроизведения
    function updateProgress() {
        if (backgroundMusic.duration) {
            const progressPercent = (backgroundMusic.currentTime / backgroundMusic.duration) * 100;
            progressSlider.value = progressPercent;
        }
    }
    
    // Перемотка музыки
    function seekMusic() {
        const seekTime = (progressSlider.value / 100) * backgroundMusic.duration;
        backgroundMusic.currentTime = seekTime;
    }
    
    // События
    openSettingsBtn.addEventListener('click', () => {
        settingsPanel.classList.add('active');
    });
    
    closeSettingsBtn.addEventListener('click', () => {
        settingsPanel.classList.remove('active');
    });
    
    saveSettingsBtn.addEventListener('click', saveSettings);
    resetSettingsBtn.addEventListener('click', resetSettings);
    toggleMusicBtn.addEventListener('click', toggleMusic);
    
    playPauseBtn.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            playIcon.className = 'fas fa-pause';
        } else {
            backgroundMusic.pause();
            playIcon.className = 'fas fa-play';
        }
    });
    
    volumeSlider.addEventListener('input', updateVolume);
    
    backgroundMusic.addEventListener('timeupdate', updateProgress);
    progressSlider.addEventListener('input', seekMusic);
    
    // Инициализация
    loadBadges();
    loadLinks();
    loadSettings();
    
    // Установка начальной громкости
    backgroundMusic.volume = volumeSlider.value / 100;
    
    // Добавление обработчика для добавления новой ссылки
    document.getElementById('addLinkBtn').addEventListener('click', () => {
        const title = prompt('Введите название ссылки:');
        if (title) {
            const url = prompt('Введите URL ссылки:');
            if (url) {
                const description = prompt('Введите описание ссылки:') || '';
                const icon = prompt('Введите иконку (FontAwesome класс, например: fab fa-twitter):') || 'fas fa-link';
                
                linksData.push({
                    id: linksData.length + 1,
                    title: title,
                    description: description,
                    url: url,
                    icon: icon
                });
                
                loadLinks();
                alert('Ссылка добавлена!');
            }
        }
    });
    
    // Добавление обработчиков для переключения треков
    document.getElementById('prevBtn').addEventListener('click', () => {
        alert('Функция переключения на предыдущий трек будет реализована позже');
    });
    
    document.getElementById('nextBtn').addEventListener('click', () => {
        alert('Функция переключения на следующий трек будет реализована позже');
    });
});
