document.querySelectorAll('.icon-wrapper').forEach(icon => {
    icon.addEventListener('mousemove', (e) => {
        const rect = icon.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 10;
        const angleY = (centerX - x) / 10;
        
        const iconElement = icon.querySelector('.icon');
        iconElement.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.1)`;
    });
    
    icon.addEventListener('mouseleave', (e) => {
        const iconElement = icon.querySelector('.icon');
        iconElement.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
});