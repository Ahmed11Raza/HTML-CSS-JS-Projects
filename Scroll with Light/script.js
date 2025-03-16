document.addEventListener('DOMContentLoaded', function() {
    // Select elements
    const light = document.querySelector('.light');
    const sections = document.querySelectorAll('.content-section');
    const sizeRange = document.getElementById('size-range');
    const intensityRange = document.getElementById('intensity-range');
    const colorOptions = document.querySelectorAll('.color-option');
    const followCursorToggle = document.getElementById('follow-cursor');
    const showParticlesToggle = document.getElementById('show-particles');
    const particlesContainer = document.getElementById('particles-container');
    
    // Initial variables
    let scrollPosition = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let lightSize = 250;
    let lightIntensity = 0.8;
    let lightColor = '255,255,255';
    let followCursor = false;
    let showParticles = false;
    let particles = [];
    let particleId = 0;
    
    // Update light position based on scroll and mouse position
    function updateLightPosition() {
        // If follow cursor is enabled, use mouse position
        // Otherwise, center the light horizontally and use scroll position for vertical
        const x = followCursor ? mouseX : window.innerWidth / 2;
        const y = followCursor ? mouseY : scrollPosition + (window.innerHeight / 2);
        
        light.style.left = `${x}px`;
        light.style.top = `${y}px`;
        
        // Request next frame update
        requestAnimationFrame(updateLightPosition);
    }
    
    // Start animation loop
    updateLightPosition();
    
    // Handle scroll events
    window.addEventListener('scroll', function() {
        scrollPosition = window.scrollY;
        
        // Check which sections are visible
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = (rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2);
            
            if (isVisible) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
        
        // Create particles on scroll if enabled
        if (showParticles && Math.random() > 0.7) {
            createParticle();
        }
    });
    
    // Track mouse movement if follow cursor is enabled
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY + window.scrollY;
        
        // Create particles on mouse move if enabled
        if (showParticles && followCursor && Math.random() > 0.9) {
            createParticle();
        }
    });
    
    // Handle control panel interactions
    sizeRange.addEventListener('input', function() {
        lightSize = this.value;
        light.style.width = `${lightSize}px`;
        light.style.height = `${lightSize}px`;
    });
    
    intensityRange.addEventListener('input', function() {
        lightIntensity = this.value / 100;
        updateLightColor();
    });
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            lightColor = this.getAttribute('data-color');
            updateLightColor();
            
            // Add selected class
            colorOptions.forEach(opt => opt.style.border = 'none');
            this.style.border = '2px solid white';
        });
    });
    
    followCursorToggle.addEventListener('change', function() {
        followCursor = this.checked;
    });
    
    showParticlesToggle.addEventListener('change', function() {
        showParticles = this.checked;
        if (!showParticles) {
            clearParticles();
        }
    });
    
    // Update light color based on selected color and intensity
    function updateLightColor() {
        light.style.background = `radial-gradient(circle, rgba(${lightColor}, ${lightIntensity}) 0%, rgba(${lightColor}, ${lightIntensity * 0.25}) 40%, rgba(${lightColor}, 0) 70%)`;
    }
    
    // Create a particle at the light position
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '5px';
        particle.style.height = '5px';
        particle.style.background = `rgba(${lightColor}, ${lightIntensity})`;
        particle.style.borderRadius = '50%';
        particle.style.top = `${light.offsetTop}px`;
        particle.style.left = `${light.offsetLeft}px`;
        particle.style.opacity = Math.random() * 0.5 + 0.5;
        document.body.appendChild(particle);

        // Add particle to array
        particles.push(particle);
        }

    // Update particle positions
    function updateParticles() {
        particles.forEach(particle => {
            const x = Math.random() * 2 - 1;
            const y = Math.random() * 2 - 1;
            const size = Math.random() * 5 + 2;
            const opacity = Math.random() * 0.5 + 0.5;
            particle.style.top = `${light.offsetTop + x}px`;
            particle.style.left = `${light.offsetLeft + y}px`;

            // Fade out particles over time
            particle.style.opacity = opacity;   
        });
    }

    // Clear particles from the DOM
    function clearParticles() {
        particles.forEach(particle => {
            particle.remove();
        });
        particles = [];
    }

    // Update particle positions on each frame
    function animate() {
        updateParticles();
        requestAnimationFrame(animate);
    }

    // Start animation loop for particles
    animate();
    }
);