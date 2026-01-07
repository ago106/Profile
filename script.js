document.addEventListener('DOMContentLoaded', () => {
    // 1. Typing Effect
    const description = document.querySelector('.description');
    const text = '* Days, weeks, months may pass — but our meeting is inevitable. * \n ♥ However long it takes, we will wait for one another. ♥';
    let i = 0;
    const typingSpeed = 50;

    function typeWriter() {
        if (i < text.length) {
            if (text.charAt(i) === '\n') {
                description.innerHTML += '<br>';
            } else {
                description.innerHTML += text.charAt(i);
            }
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    setTimeout(typeWriter, 500);

    // 2. Background Music - Auto Play
    const bgMusic = document.getElementById('bg-music');
    
    // Попытка автовоспроизведения с обработкой ошибок
    const playMusic = () => {
        bgMusic.play()
            .then(() => {
                console.log("Background music started");
                bgMusic.volume = 0.3; // Устанавливаем громкость 30%
            })
            .catch(error => {
                console.log("Autoplay prevented. Waiting for user interaction.");
                // Добавляем кнопку для запуска музыки
                addMusicButton();
            });
    };

    // Добавляем кнопку запуска музыки если автоплей заблокирован
    function addMusicButton() {
        const musicBtn = document.createElement('button');
        musicBtn.id = 'start-music-btn';
        musicBtn.innerHTML = '🎵 Start Music';
        musicBtn.style.cssText = `
            background: linear-gradient(45deg, #00CED1, #FF6B9E);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            cursor: pointer;
            font-family: 'Lexend', sans-serif;
            margin: 10px 0;
            transition: transform 0.3s ease;
        `;
        
        musicBtn.addEventListener('click', () => {
            bgMusic.play();
            bgMusic.volume = 0.3;
            musicBtn.style.display = 'none';
        });
        
        musicBtn.addEventListener('mouseover', () => {
            musicBtn.style.transform = 'scale(1.05)';
        });
        
        musicBtn.addEventListener('mouseout', () => {
            musicBtn.style.transform = 'scale(1)';
        });
        
        const profile = document.querySelector('.profile');
        profile.appendChild(musicBtn);
    }

    // Запускаем музыку
    setTimeout(playMusic, 1000);

    // 3. Discord Status
    const updateDiscordStatus = async () => {
        const guildId = '1406607908577218681';
        try {
            const response = await fetch(`https://discord.com/api/guilds/${guildId}/widget.json`);
            if (response.ok) {
                const data = await response.json();
                document.getElementById('discord-online').textContent = data.presence_count || '0';
            }
        } catch (error) {
            console.log('Discord status unavailable');
        }
    };

    updateDiscordStatus();
    setInterval(updateDiscordStatus, 30000);

    // 4. Achievements - проверяем существование изображений
    const achievementsContainer = document.getElementById('achievements-container');
    const badges = ['badge1.png', 'badge2.png', 'badge3.png', 'badge4.png'];
    
    badges.forEach((badge, index) => {
        const img = new Image();
        img.src = `assets/${badge}`;
        
        img.onload = function() {
            const badgeElement = document.createElement('div');
            badgeElement.className = 'badge';
            badgeElement.innerHTML = `<img src="assets/${badge}" alt="Achievement ${index + 1}" loading="lazy">`;
            achievementsContainer.appendChild(badgeElement);
        };
        
        img.onerror = function() {
            console.log(`Badge ${badge} not found, skipping...`);
        };
    });

    // 5. View Counter - имитация
    const counterElement = document.querySelector('.counter');
    let views = Math.floor(Math.random() * 1000) + 500;
    counterElement.textContent = views;
    
    // Обновляем счетчик каждые 5 секунд (имитация)
    setInterval(() => {
        views += Math.floor(Math.random() * 10);
        counterElement.textContent = views;
    }, 5000);

    // 6. Custom Cursor (опционально)
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // 7. Social Icons - проверяем существование
    const socialIcons = document.querySelectorAll('.social-icon img');
    socialIcons.forEach(icon => {
        icon.addEventListener('error', function() {
            this.parentElement.style.display = 'none';
        });
    });
});

// Разрешаем аудио при любом клике пользователя
document.addEventListener('click', function() {
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic.paused) {
        bgMusic.play().catch(e => console.log("Audio play failed"));
    }
}, { once: true }); // Сработает только один раз
