document.addEventListener('DOMContentLoaded', function() {
    // Инициализация переменных
    const elements = {
        cursor: document.getElementById('customCursor'),
        audio: document.getElementById('backgroundAudio'),
        playPauseBtn: document.getElementById('playPauseBtn'),
        nextTrackBtn: document.getElementById('nextTrackBtn'),
        volumeSlider: document.getElementById('volumeSlider'),
        viewCount: document.getElementById('viewCount'),
        badgesGrid: document.getElementById('badgesGrid'),
        socialsGrid: document.getElementById('socialsGrid'),
        customLinksList: document.getElementById('customLinksList'),
        mediaEmbed: document.getElementById('mediaEmbed'),
        typingText: document.getElementById('typingText'),
        username: document.getElementById('username'),
        avatarWrapper: document.getElementById('avatarWrapper')
    };

    // Загрузка данных из localStorage
    const loadSettings = () => {
        // Загрузка цветовой темы
        const theme = localStorage.getItem('theme') || 'dark';
        document.body.className = `theme-${theme}`;
        
        // Загрузка CSS переменных
        const cssVars = JSON.parse(localStorage.getItem('cssVars') || '{}');
        Object.keys(cssVars).forEach(key => {
            document.documentElement.style.setProperty(key, cssVars[key]);
        });
        
        // Загрузка просмотров
        let views = parseInt(localStorage.getItem('views')) || 1847;
        views++;
        localStorage.setItem('views', views);
        elements.viewCount.textContent = views.toLocaleString();
        
        // Загрузка значков
        loadBadges();
        
        // Загрузка социальных сетей
        loadSocials();
        
        // Загрузка кастомных ссылок
        loadCustomLinks();
        
        // Загрузка медиа
        loadMediaEmbed();
        
        // Загрузка музыки
        loadMusicSettings();
        
        // Инициализация анимаций
        initAnimations();
    };

    // Загрузка значков
    const loadBadges = () => {
        const badges = JSON.parse(localStorage.getItem('badges') || '[]');
        
        // Если нет сохраненных значков, используем стандартные
        if (badges.length === 0) {
            const defaultBadges = [
                { name: 'Verified', description: 'Проверенный пользователь', icon: 'fas fa-check-circle', color: '#10b981' },
                { name: 'Premium', description: 'Премиум подписка', icon: 'fas fa-crown', color: '#f59e0b' },
                { name: 'Donor', description: 'Пожертвовал 10€+', icon: 'fas fa-heart', color: '#ef4444' },
                { name: 'Bug Hunter', description: 'Сообщил об ошибке', icon: 'fas fa-bug', color: '#8b5cf6' },
                { name: 'Staff', description: 'Команда проекта', icon: 'fas fa-user-shield', color: '#3b82f6' },
                { name: 'Christmas 2024', description: 'Зимняя распродажа 2024', icon: 'fas fa-gift', color: '#10b981' }
            ];
            localStorage.setItem('badges', JSON.stringify(defaultBadges));
            badges.push(...defaultBadges);
        }
        
        elements.badgesGrid.innerHTML = '';
        badges.forEach(badge => {
            const badgeElement = document.createElement('div');
            badgeElement.className = 'badge-item';
            badgeElement.innerHTML = `
                <div class="badge-icon" style="background: ${badge.color}">
                    <i class="${badge.icon}"></i>
                </div>
                <div class="badge-info">
                    <h4>${badge.name}</h4>
                    <p>${badge.description}</p>
                </div>
            `;
            elements.badgesGrid.appendChild(badgeElement);
        });
    };

    // Загрузка социальных сетей
    const loadSocials = () => {
        const socials = JSON.parse(localStorage.getItem('socials') || '[]');
        
        if (socials.length === 0) {
            const defaultSocials = [
                { platform: 'telegram', url: 'https://t.me/agushenka', text: 'Telegram Channel', icon: 'fab fa-telegram' },
                { platform: 'discord', url: 'https://discord.gg/example', text: 'Discord Server', icon: 'fab fa-discord' },
                { platform: 'shop', url: '#', text: 'Runfoy Shop', icon: 'fas fa-shopping-bag' }
            ];
            localStorage.setItem('socials', JSON.stringify(defaultSocials));
            socials.push(...defaultSocials);
        }
        
        elements.socialsGrid.innerHTML = '';
        socials.forEach(social => {
            const socialElement = document.createElement('a');
            socialElement.className = 'social-link';
            socialElement.href = social.url;
            socialElement.target = '_blank';
            socialElement.innerHTML = `
                <div class="social-icon">
                    <i class="${social.icon}"></i>
                </div>
                <div class="social-text">
                    <div class="social-name">${social.text}</div>
                    <div class="social-url">${social.url}</div>
                </div>
                <i class="fas fa-chevron-right"></i>
            `;
            elements.socialsGrid.appendChild(socialElement);
        });
    };

    // Загрузка кастомных ссылок
    const loadCustomLinks = () => {
        const links = JSON.parse(localStorage.getItem('customLinks') || '[]');
        
        if (links.length === 0) {
            const defaultLinks = [
                { title: 'My NextJS Blog Post', url: 'https://example.com', icon: 'fas fa-blog' },
                { title: 'FunPay Shop', url: 'https://funpay.com', icon: 'fas fa-store' },
                { title: 'My Telegram', url: 'https://t.me/agushenka', icon: 'fab fa-telegram' },
                { title: 'Telegram Channel', url: 'https://t.me/agushenka_channel', icon: 'fab fa-telegram-plane' }
            ];
            localStorage.setItem('customLinks', JSON.stringify(defaultLinks));
            links.push(...defaultLinks);
        }
        
        elements.customLinksList.innerHTML = '';
        links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.className = 'custom-link';
            linkElement.href = link.url;
            linkElement.target = '_blank';
            linkElement.innerHTML = `
                <div class="link-icon">
                    <i class="${link.icon}"></i>
                </div>
                <div class="link-content">
                    <div class="link-title">${link.title}</div>
                    <div class="link-url">${link.url}</div>
                </div>
                <i class="fas fa-chevron-right"></i>
            `;
            elements.customLinksList.appendChild(linkElement);
        });
    };

    // Загрузка медиа
    const loadMediaEmbed = () => {
        const embed = JSON.parse(localStorage.getItem('mediaEmbed') || '{}');
        
        if (!embed.url) {
            embed.url = 'https://www.youtube.com/embed/xwfZjp5Pg60';
            embed.title = 'My Favorite YouTube Video!';
            localStorage.setItem('mediaEmbed', JSON.stringify(embed));
        }
        
        elements.mediaEmbed.innerHTML = `
            <iframe src="${embed.url}" 
                    title="${embed.title}" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
            </iframe>
        `;
    };

    // Настройки музыки
    const loadMusicSettings = () => {
        const musicSettings = JSON.parse(localStorage.getItem('musicSettings') || '{}');
        
        if (musicSettings.volume) {
            elements.audio.volume = musicSettings.volume / 100;
            elements.volumeSlider.value = musicSettings.volume;
        }
        
        if (musicSettings.autoplay) {
            elements.audio.play().catch(e => console.log("Автовоспроизведение заблокировано"));
            elements.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
    };

    // Инициализация анимаций
    const initAnimations = () => {
        // Эффект наклона для карточек
        if (localStorage.getItem('tiltEffect') !== 'false') {
            initTiltEffect();
        }
        
        // Кастомный курсор
        if (localStorage.getItem('cursorEffect') !== 'false') {
            initCustomCursor();
        }
        
        // Анимация печатания
        if (localStorage.getItem('typingEffect') !== 'none') {
            initTypingEffect();
        }
        
        // Сверкание имени
        if (localStorage.getItem('usernameSparkle') !== 'false') {
            initUsernameSparkle();
        }
        
        // Украшение аватара
        if (localStorage.getItem('avatarDecoration') !== 'false') {
            initAvatarDecoration();
        }
    };

    // Эффект наклона
    const initTiltEffect = () => {
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mousemove', (e) => {
                const rect = link.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = (x - centerX) / 10;
                const rotateX = (centerY - y) / 10;
                
                link.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg)';
            });
        });
    };

    // Кастомный курсор
    const initCustomCursor = () => {
        document.addEventListener('mousemove', (e) => {
            elements.cursor.style.left = e.clientX + 'px';
            elements.cursor.style.top = e.clientY + 'px';
        });
        
        // Эффект при наведении на кликабельные элементы
        const interactiveElements = document.querySelectorAll('a, button, .social-link, .custom-link');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                elements.cursor.style.transform = 'scale(1.5)';
                elements.cursor.style.background = 'var(--secondary-color)';
            });
            
            el.addEventListener('mouseleave', () => {
                elements.cursor.style.transform = 'scale(1)';
                elements.cursor.style.background = 'var(--primary-color)';
            });
        });
    };

    // Анимация печатания
    const initTypingEffect = () => {
        const text = elements.typingText.textContent;
        elements.typingText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                elements.typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Запуск с задержкой
        setTimeout(typeWriter, 1000);
    };

    // Сверкание имени
    const initUsernameSparkle = () => {
        setInterval(() => {
            const sparkle = document.querySelector('.username-sparkle');
            sparkle.style.animation = 'none';
            setTimeout(() => {
                sparkle.style.animation = 'sparkle 3s infinite';
            }, 10);
        }, 3000);
    };

    // Украшение аватара
    const initAvatarDecoration = () => {
        const decoration = document.querySelector('.avatar-decoration');
        decoration.style.display = 'block';
        
        // Случайное изменение цвета каждые 5 секунд
        setInterval(() => {
            const colors = ['#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            decoration.style.borderColor = randomColor;
        }, 5000);
    };

    // Управление музыкой
    elements.playPauseBtn.addEventListener('click', () => {
        if (elements.audio.paused) {
            elements.audio.play();
            elements.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            elements.audio.pause();
            elements.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    elements.nextTrackBtn.addEventListener('click', () => {
        // Здесь будет логика переключения треков
        alert('Следующий трек');
    });

    elements.volumeSlider.addEventListener('input', (e) => {
        elements.audio.volume = e.target.value / 100;
        localStorage.setItem('musicSettings', JSON.stringify({
            volume: e.target.value,
            autoplay: !elements.audio.paused
        }));
    });

    // Сохранение состояния музыки при закрытии
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('musicSettings', JSON.stringify({
            volume: elements.volumeSlider.value,
            autoplay: !elements.audio.paused
        }));
    });

    // Загрузка всех настроек
    loadSettings();
});
