/**
 * Romantic Love Wish Web Application for Uneeba Aamir ❤️
 * Vanilla JavaScript Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const particlesContainer = document.getElementById('particles-container');
    const introScreen = document.getElementById('intro-screen');
    const introTyping = document.getElementById('intro-typing');
    const introName = document.getElementById('intro-name');
    const startBtn = document.getElementById('start-btn');
    const mainContent = document.getElementById('main-content');
    
    const heroTypewriter = document.getElementById('hero-typewriter');
    const codeSnippet1 = document.getElementById('code-snippet-1');
    const interactiveHeart = document.getElementById('interactive-heart');
    const heartWrapper = document.getElementById('interactive-heart-wrapper');
    const heartMsgBox = document.getElementById('heart-message-box');
    const terminalBody = document.getElementById('terminal-body');
    const openHeartBtn = document.getElementById('open-heart-btn');
    const finalReveal = document.getElementById('final-reveal');
    const finalCard = document.getElementById('final-card');
    
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    let isPlayingMusic = false;

    // --- 1. Background Floating Particles (Hearts & Glows) ---
    function createFloatingElements() {
        const particleCount = 25;
        const symbols = ['❤️', '✨', '💖', '🌸', '✨'];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            const isHeart = Math.random() > 0.4;

            if (isHeart) {
                particle.className = 'floating-heart-bg';
                particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
                particle.style.fontSize = `${Math.random() * 1.2 + 0.7}rem`;
            } else {
                particle.className = 'floating-particle';
                const size = Math.random() * 8 + 4;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.backgroundColor = 'rgba(255, 182, 200, 0.6)';
                particle.style.boxShadow = '0 0 10px rgba(255, 143, 171, 0.8)';
            }

            particle.style.left = `${Math.random() * 100}%`;
            const duration = Math.random() * 8 + 7;
            const delay = Math.random() * 5;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;

            particlesContainer.appendChild(particle);
        }
    }
    createFloatingElements();

    // --- 2. Generic Typewriter Effect Helper ---
    function typeText(element, text, speed = 50, callback = null) {
        let i = 0;
        element.innerHTML = '';
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                if (callback) callback();
            }
        }, speed);
    }

    // --- 3. Opening Animation Sequence ---
    function startOpeningSequence() {
        const line1 = "Initializing something special...";
        const line2 = "Loading Love.exe ❤️";
        const line3 = "For someone very special...";

        typeText(introTyping, line1, 50, () => {
            setTimeout(() => {
                typeText(introTyping, line2, 50, () => {
                    setTimeout(() => {
                        typeText(introTyping, line3, 50, () => {
                            setTimeout(() => {
                                introTyping.style.display = 'none';
                                introName.classList.remove('hidden');
                                introName.style.animation = 'fadeIn 1s ease forwards';
                                setTimeout(() => {
                                    startBtn.classList.remove('hidden');
                                    startBtn.style.animation = 'fadeIn 0.8s ease forwards';
                                }, 600);
                            }, 800);
                        });
                    }, 800);
                });
            }, 800);
        });
    }

    // Start Intro on load
    startOpeningSequence();

    // --- 4. Transition to Main Webpage & Music Autoplay Attempt ---
    startBtn.addEventListener('click', () => {
        // Try playing audio on first user gesture
        playMusic();

        introScreen.style.opacity = '0';
        setTimeout(() => {
            introScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.style.animation = 'fadeIn 1s ease forwards';
            
            // Trigger Hero Typewriter & Code Card Animations
            startMainSectionAnimations();
        }, 1000);
    });

    // --- Music Controls & Web Audio Romantic Synthesizer ---
    let audioCtx = null;
    let synthInterval = null;

    function playSynthesizedSong() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23, 392.00, 523.25];
        let noteIndex = 0;

        function playNote() {
            if (!isPlayingMusic || !audioCtx) return;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(notes[noteIndex % notes.length], audioCtx.currentTime);
            
            gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            osc.start();
            osc.stop(audioCtx.currentTime + 1.2);
            
            noteIndex++;
        }

        playNote();
        if (synthInterval) clearInterval(synthInterval);
        synthInterval = setInterval(playNote, 600);
    }

    function playMusic() {
        bgMusic.volume = 0.4;
        bgMusic.play().then(() => {
            isPlayingMusic = true;
            musicToggle.querySelector('.music-text').innerText = "Playing for Uneeba ❤️";
        }).catch(err => {
            console.log("File playback blocked, falling back to Web Audio Synth", err);
            isPlayingMusic = true;
            musicToggle.querySelector('.music-text').innerText = "Playing for Uneeba ❤️";
            playSynthesizedSong();
        });
    }

    musicToggle.addEventListener('click', () => {
        if (isPlayingMusic) {
            bgMusic.pause();
            if (audioCtx && audioCtx.state === 'running') {
                audioCtx.suspend();
            }
            if (synthInterval) clearInterval(synthInterval);
            isPlayingMusic = false;
            musicToggle.querySelector('.music-text').innerText = "Play Music 🎵";
        } else {
            playMusic();
        }
    });

    // --- 5. Main Section Typing Animations ---
    function startMainSectionAnimations() {
        // Hero Section Typewriter
        const heroMsg = "Some people enter our lives and become a beautiful part of our story.\nBut you, Uneeba, became a story I never want to end.";
        
        let i = 0;
        heroTypewriter.innerText = '';
        const heroTimer = setInterval(() => {
            if (i < heroMsg.length) {
                heroTypewriter.innerText += heroMsg.charAt(i);
                i++;
            } else {
                clearInterval(heroTimer);
            }
        }, 40);

        // Code Editor Typing Animation
        const codeText = `const myFavoritePerson = "Uneeba Aamir";\nconst love = true;\n\nif (love) {\n    console.log("You mean everything to me ❤️");\n}`;
        typeText(codeSnippet1, codeText, 30);

        // Trigger Terminal Animation
        startTerminalAnimation();
    }

    // --- 6. Interactive Heart Click Effect ---
    interactiveHeart.addEventListener('click', (e) => {
        // Heart pulse scale effect
        interactiveHeart.style.transform = 'rotate(-45deg) scale(1.3)';
        setTimeout(() => {
            interactiveHeart.style.transform = 'rotate(-45deg) scale(1)';
        }, 300);

        // Explode pink particles & small hearts
        createHeartExplosion(e);

        // Show message
        heartMsgBox.classList.remove('hidden');
    });

    function createHeartExplosion(e) {
        const rect = heartWrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const symbols = ['❤️', '💖', '✨', '🌸', '💕'];

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'explosion-particle';
            particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
            
            // Random direction
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 120 + 40;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            particle.style.left = `${centerX}px`;
            particle.style.top = `${centerY}px`;

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }

    // --- 7. Terminal Animation ---
    function startTerminalAnimation() {
        const logs = [
            "> Starting Love Program...",
            "> Loading memories...",
            "> Loading smiles...",
            "> Loading beautiful moments...",
            "> Loading Uneeba...",
            "> 100% Complete ❤️",
            "",
            "> Status: Forever Yours"
        ];

        let index = 0;
        function printLine() {
            if (index < logs.length) {
                const line = document.createElement('div');
                line.className = 'terminal-line';
                if (logs[index].includes('100%') || logs[index].includes('Forever Yours')) {
                    line.style.color = '#FF8FAB';
                    line.style.fontWeight = 'bold';
                }
                line.innerText = logs[index];
                terminalBody.appendChild(line);
                index++;
                setTimeout(printLine, 600);
            } else {
                // Add blinking cursor at end
                const cursorLine = document.createElement('div');
                cursorLine.className = 'terminal-line';
                cursorLine.innerHTML = '> <span class="cursor"></span>';
                terminalBody.appendChild(cursorLine);
            }
        }
        printLine();
    }

    // --- 8. Final Surprise Reveal & Celebration FX ---
    openHeartBtn.addEventListener('click', () => {
        openHeartBtn.style.display = 'none';
        finalReveal.classList.remove('hidden');

        // Trigger grand background celebratory state
        document.body.classList.add('celebration-mode');

    // --- 9. Romantic Promises Generator ---
    const promises = [
        `"I promise to choose you, every single day, without a second thought."`,
        `"I promise to listen to your quietest thoughts and cherish your happiest smiles."`,
        `"In a world full of noise, I promise to be your calm and peaceful place."`,
        `"I promise to stand by you through every bug, error, and victory in life."`,
        `"You are my favorite notification, my favorite conversation, and my favorite person forever."`
    ];
    let promiseIdx = 0;
    const promiseText = document.getElementById('promise-text');
    const nextPromiseBtn = document.getElementById('next-promise-btn');

    if (nextPromiseBtn && promiseText) {
        nextPromiseBtn.addEventListener('click', () => {
            promiseIdx = (promiseIdx + 1) % promises.length;
            promiseText.style.opacity = '0';
            setTimeout(() => {
                promiseText.innerText = promises[promiseIdx];
                promiseText.style.opacity = '1';
            }, 250);
        });
    }
});
