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

    const bgMusic = document.getElementById('bg-music');
    bgMusic.volume = 0.3;
    
    document.body.addEventListener('click', () => {
        if (bgMusic.paused) bgMusic.play();
    });

    const guildId = '1406607908577218681';
    fetch(`https://discord.com/api/guilds/${guildId}/widget.json`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('discord-online').textContent = data.presence_count;
        })
        .catch(error => console.error('Error fetching Discord data:', error));

    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.pageX}px`;
        cursor.style.top = `${e.pageY}px`;
    });
});
