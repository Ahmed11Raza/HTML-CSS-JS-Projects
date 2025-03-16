document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // 3D tilt effect
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
        
        // Click animation
        card.addEventListener('click', handleClick);
    });
    
    function handleTilt(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;
        
        // Calculate mouse position relative to card
        const mouseX = e.clientX - cardRect.left;
        const mouseY = e.clientY - cardRect.top;
        
        // Calculate rotation angle (max 15 degrees)
        const rotateY = ((mouseX / cardWidth) - 0.5) * 15;
        const rotateX = ((0.5 - (mouseY / cardHeight)) * 15);
        
        // Apply the transformation
        card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        // Position the shine effect based on mouse
        const shine = card.querySelector('.card-shine');
        shine.style.background = `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)`;
    }
    
    function resetTilt() {
        this.style.transform = '';
        
        // Reset the shine effect
        const shine = this.querySelector('.card-shine');
        shine.style.background = '';
    }
    
    function handleClick(e) {
        // Quick scale animation on click
        const card = this;
        card.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    }

    VanillaTilt.init(document.querySelectorAll('.card-3d'), {
        max: 25,
        speed: 400
    }); 

});