document.addEventListener('DOMContentLoaded', () => {
    const lampShade = document.querySelector('.lamp-shade');
    const switchElement = document.querySelector('.switch');
    const scene = document.querySelector('.scene');
    const body = document.body;
    
    // Function to toggle lamp on/off
    function toggleLamp() {
        body.classList.toggle('lamp-on');
        switchElement.classList.toggle('on');
        
        // Change background color based on lamp state
        if (body.classList.contains('lamp-on')) {
            body.style.backgroundColor = '#1a1a1a';
        } else {
            body.style.backgroundColor = '#121212';
        }
    }
    
    // Event listeners for lamp shade and switch
    lampShade.addEventListener('click', toggleLamp);
    switchElement.addEventListener('click', toggleLamp);
    
    // Mouse move effect for glow
    const glow = document.querySelector('.glow');
    
    document.addEventListener('mousemove', (e) => {
        if (body.classList.contains('lamp-on')) {
            // Calculate mouse position relative to the center of the scene
            const rect = scene.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate distance from center (max 100px)
            const distX = Math.min(Math.max((e.clientX - centerX) / 10, -10), 10);
            const distY = Math.min(Math.max((e.clientY - centerY) / 10, -10), 10);
            
            // Move glow slightly in response to mouse movement
            glow.style.transform = `translate(calc(-50% + ${distX}px), calc(-30% + ${distY}px))`;
        }
    });
    
    // Add flickering effect
    function flicker() {
        if (body.classList.contains('lamp-on')) {
            const lampBulb = document.querySelector('.lamp-bulb');
            const flickerIntensity = Math.random() * 0.1 + 0.9; // Between 0.9 and 1.0
            
            lampBulb.style.opacity = flickerIntensity;
            glow.style.opacity = flickerIntensity * 0.4;
            
            // Random flicker timing
            setTimeout(flicker, Math.random() * 1000 + 500);
        } else {
            setTimeout(flicker, 1000);
        }
    }
    
    // Start flickering effect
    flicker();
});