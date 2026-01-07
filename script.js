document.addEventListener('DOMContentLoaded', () => {
    const description = document.querySelector('.description');
    const text = '* Days, weeks, months may pass — but our meeting is inevitable. * \n ♥ However long it takes, we will wait for one another. ♥';
    let i = 0;
    const typingSpeed = 40;

    function typeWriter() {
        if (i < text.length) {
            description.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    typeWriter();

    const guildId = '1406607908577218681';
    fetch(`https://discord.com/api/guilds/${guildId}/widget.json`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('discord-online').textContent = data.presence_count;
        })
        .catch(error => console.error('Error fetching Discord data:', error));

    const badges = document.querySelectorAll('.badge');
    let hue = 0;
    
    setInterval(() => {
        hue = (hue + 1) % 360;
        badges.forEach(badge => {
            badge.style.filter = `hue-rotate(${hue}deg)`;
        });
    }, 50);
});
