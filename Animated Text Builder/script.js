        document.addEventListener('DOMContentLoaded', function() {
            const textInput = document.getElementById('text-input');
            const animationType = document.getElementById('animation-type');
            const colorOption = document.getElementById('color-option');
            const applyBtn = document.getElementById('apply-btn');
            const animatedText = document.getElementById('animated-text');
            const codeOutput = document.getElementById('code-output');
            const copyBtn = document.getElementById('copy-btn');
            
            // Apply animation
            applyBtn.addEventListener('click', function() {
                // First remove all animation classes
                animatedText.className = 'animated-text';
                
                // Force a reflow to restart animation
                void animatedText.offsetWidth;
                
                // Apply new text
                animatedText.textContent = textInput.value || "Animated Text";
                
                // Apply new animation and color
                animatedText.classList.add(animationType.value);
                if (colorOption.value !== 'color-white') {
                    animatedText.classList.add(colorOption.value);
                }
                
                // Update code output
                updateCodeOutput();
            });
            
            // Update code output function
            function updateCodeOutput() {
                let animName = animationType.value;
                let keyframes = '';
                let colorStyle = '';
                
                // Get keyframes based on animation type
                switch(animName) {
                    case 'fade-in':
                        keyframes = `@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}`;
                        break;
                    case 'slide-in':
                        keyframes = `@keyframes slideIn {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}`;
                        break;
                    case 'bounce':
                        keyframes = `@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-30px); }
    60% { transform: translateY(-15px); }
}`;
                        break;
                    case 'wave':
                        keyframes = `@keyframes wave {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}`;
                        break;
                    case 'typing':
                        keyframes = `@keyframes typing {
    from { width: 0; }
    to { width: 100%; }
}
@keyframes blink-caret {
    from, to { border-color: transparent; }
    50% { border-color: #fff; }
}`;
                        break;
                    case 'glow':
                        keyframes = `@keyframes glow {
    from { text-shadow: 0 0 5px #fff, 0 0 10px #f06, 0 0 15px #f06; }
    to { text-shadow: 0 0 10px #fff, 0 0 20px #f06, 0 0 30px #f06, 0 0 40px #f06; }
}`;
                        break;
                }
                
                // Get color style based on selection
                switch(colorOption.value) {
                    case 'color-blue':
                        colorStyle = '\n    color: #4a9fff;';
                        break;
                    case 'color-green':
                        colorStyle = '\n    color: #4aff9f;';
                        break;
                    case 'color-purple':
                        colorStyle = '\n    color: #9f4aff;';
                        break;
                    case 'color-gradient-1':
                        colorStyle = '\n    background: linear-gradient(45deg, #f06, #ff0);\n    -webkit-background-clip: text;\n    background-clip: text;\n    color: transparent;';
                        break;
                    case 'color-gradient-2':
                        colorStyle = '\n    background: linear-gradient(45deg, #4a9fff, #9f4aff);\n    -webkit-background-clip: text;\n    background-clip: text;\n    color: transparent;';
                        break;
                }
                
                // Build CSS output
                let animationStyle = '';
                if (animName === 'typing') {
                    animationStyle = 'animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;\n    overflow: hidden;\n    white-space: nowrap;\n    border-right: 3px solid;\n    width: 0;';
                } else {
                    let duration = (animName === 'fade-in' || animName === 'slide-in') ? '2s ease forwards' : '2s ease infinite';
                    animationStyle = `animation: ${animName} ${duration};`;
                }
                
                codeOutput.textContent = `.your-element {
    ${animationStyle}${colorStyle}
}

${keyframes}`;
            }
            
            // Copy code function
            copyBtn.addEventListener('click', function() {
                const tempTextArea = document.createElement('textarea');
                tempTextArea.value = codeOutput.textContent;
                document.body.appendChild(tempTextArea);
                tempTextArea.select();
                document.execCommand('copy');
                document.body.removeChild(tempTextArea);
                
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                }, 2000);
            });
            
            // Initialize code output on load
            updateCodeOutput();
        });