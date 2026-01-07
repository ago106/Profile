document.addEventListener('DOMContentLoaded', () => {
    const description = document.querySelector('.description');
    const text = '* Days, weeks, months may pass — but our meeting is inevitable. * \n ♥ However long it takes, we will wait for one another. ♥';
    let i = 0;
    const typingSpeed = 50;

    function typeWriter() {
        if (i < text.length) {
            description.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    typeWriter();

    // Music Player
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('play-pause');
    const songSelect = document.getElementById('song-select');

    // Autoplay fix for browsers
    document.body.addEventListener('click', () => {
        if (audio.paused) audio.play();
    });

    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            audio.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    songSelect.addEventListener('change', (e) => {
        audio.src = e.target.value;
        audio.play();
        playPauseBtn.textContent = 'Pause';
    });

    // Discord Real-Time
    const guildId = 'YOUR_GUILD_ID';
    fetch(`https://discord.com/api/guilds/${guildId}/widget.json`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('discord-online').textContent = data.presence_count;
        })
        .catch(error => console.error('Error fetching Discord data:', error));

    // Custom Cursor Effect (simple trail simulation)
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.pageX}px`;
        cursor.style.top = `${e.pageY}px`;
    });
});

// Add to style.css for cursor: .custom-cursor { position: absolute; width: 20px; height: 20px; background: rgba(0, 206, 209, 0.5); border-radius: 50%; pointer-events: none; transform: translate(-50%, -50%); }
