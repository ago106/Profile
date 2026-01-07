document.addEventListener('DOMContentLoaded', () => {
    // Typing Effect
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
    
    // Запускаем эффект печати с небольшой задержкой
    setTimeout(typeWriter, 500);

    // Music Player
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('play-pause');
    const songSelect = document.getElementById('song-select');

    // Автовоспроизведение с учетом политики браузеров
    let playAttempt = setInterval(() => {
        audio.play()
            .then(() => {
                clearInterval(playAttempt);
                playPauseBtn.textContent = '⏸ Pause';
            })
            .catch(error => {
                console.log("Autoplay prevented. User interaction required.");
                clearInterval(playAttempt);
            });
    }, 1000);

    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = '⏸ Pause';
        } else {
            audio.pause();
            playPauseBtn.textContent = '▶ Play';
        }
    });

    songSelect.addEventListener('change', (e) => {
        audio.src = e.target.value;
        audio.play();
        playPauseBtn.textContent = '⏸ Pause';
    });

    // Discord Real-Time Status
    const updateDiscordStatus = async () => {
        const guildId = '1406607908577218681'; // Ваш Guild ID
        try {
            const response = await fetch(`https://discord.com/api/guilds/${guildId}/widget.json`);
            if (response.ok) {
                const data = await response.json();
                document.getElementById('discord-online').textContent = data.presence_count || '0';
            } else {
                console.warn('Discord widget not available');
            }
        } catch (error) {
            console.error('Error fetching Discord data:', error);
        }
    };

    // Обновляем статус каждые 30 секунд
    updateDiscordStatus();
    setInterval(updateDiscordStatus, 30000);

    // Custom Cursor Effect
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Показываем/скрываем курсор при входе/выходе мыши
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
});

// Дополнительные функции для аудио
window.addEventListener('click', () => {
    const audio = document.getElementById('audio');
    // Эта функция помогает разблокировать аудио при первом клике пользователя
    if (audio.paused) {
        audio.play().catch(e => console.log("Audio play failed:", e));
    }
});
