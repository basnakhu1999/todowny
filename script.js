/* ========================================
   Valentine Surprise Website - JavaScript
   Theme: "Every Click is My Feeling 💗"
   ======================================== */

// ========================================
// Configuration
// ========================================

// Google Apps Script Web App URL (ใส่ URL หลัง deploy)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwRQ4LnPsd_G85LIKu-oHVEBEnSsOqofredvgqf_UNLQqffTENP288cxXgEFoM85cqbyQ/exec';

// ========================================
// Intro Screen
// ========================================

let introOpened = false;

// Wait for everything to load (including images) before showing envelope
window.addEventListener('load', function () {
    const loading = document.getElementById('introLoading');
    const ready = document.getElementById('introReady');

    // Add small delay to ensure smooth experience
    setTimeout(() => {
        // Hide loading
        if (loading) {
            loading.style.transition = 'all 0.5s ease';
            loading.style.opacity = '0';
            loading.style.transform = 'translateY(-20px)';

            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }

        // Show envelope with animation
        if (ready) {
            setTimeout(() => {
                ready.style.display = 'block';
                ready.style.opacity = '0';
                ready.style.transform = 'translateY(20px)';

                // Trigger animation
                setTimeout(() => {
                    ready.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    ready.style.opacity = '1';
                    ready.style.transform = 'translateY(0)';
                }, 50);
            }, 300);
        }
    }, 500); // Minimum delay for UX
});

// Open intro and reveal main content
function openIntro() {
    if (introOpened) return;
    introOpened = true;

    const introScreen = document.getElementById('introScreen');
    const envelope = document.getElementById('introEnvelope');
    const introContent = document.querySelector('.intro-content');

    // Create heart explosion effect
    createIntroHeartExplosion();

    // Hide text first
    introContent.querySelectorAll('.intro-text, .intro-hint').forEach(el => {
        el.style.transition = 'all 0.3s ease';
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
    });

    // Add "opening" animation to envelope
    envelope.style.animation = 'envelopeOpen 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';

    // Add keyframe dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes envelopeOpen {
            0% { transform: scale(1); }
            20% { transform: scale(1.2) rotate(-10deg); }
            40% { transform: scale(1.3) rotate(10deg); }
            60% { transform: scale(1.4) rotate(-5deg); }
            80% { transform: scale(1.6); filter: brightness(1.5); }
            100% { transform: scale(2); opacity: 0; filter: brightness(2); }
        }
    `;
    document.head.appendChild(style);

    // Hide intro screen with beautiful transition
    setTimeout(() => {
        introScreen.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        introScreen.style.background = 'radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(255,214,232,0) 70%)';
        introScreen.style.transform = 'scale(1.5)';
        introScreen.style.opacity = '0';
    }, 500);

    setTimeout(() => {
        introScreen.classList.add('hidden');
        createHeartBurst();
    }, 1200);
}

// Create heart explosion from envelope
function createIntroHeartExplosion() {
    const envelope = document.getElementById('introEnvelope');
    const rect = envelope.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const hearts = ['💕', '❤️', '💗', '💖', '💝', '✨', '🌟', '💫'];

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: ${15 + Math.random() * 25}px;
                pointer-events: none;
                z-index: 10001;
                animation: heartExplode 1s ease-out forwards;
                --tx: ${(Math.random() - 0.5) * 300}px;
                --ty: ${(Math.random() - 0.5) * 300}px;
                --r: ${Math.random() * 360}deg;
            `;
            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 1000);
        }, i * 30);
    }

    // Add explosion keyframe
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartExplode {
            0% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(0);
            }
            50% {
                opacity: 1;
                transform: translate(calc(-50% + var(--tx) / 2), calc(-50% + var(--ty) / 2)) scale(1.2) rotate(var(--r));
            }
            100% {
                opacity: 0;
                transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0.5) rotate(var(--r));
            }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Page Navigation
// ========================================

let currentPage = 1;
const totalPages = 6;

function nextPage() {
    if (currentPage >= totalPages) return;

    const currentSection = document.getElementById(`page${currentPage}`);
    const nextSection = document.getElementById(`page${currentPage + 1}`);

    // Add exit animation
    currentSection.classList.remove('active');

    // Small delay for smooth transition
    setTimeout(() => {
        nextSection.classList.add('active');
        currentPage++;

        // Update page indicator
        updatePageIndicator();

        // Special page initializations
        if (currentPage === 2) {
            initFeelPage();
        } else if (currentPage === 3) {
            initPhotoPage();
        }
    }, 100);

    // Play click sound (optional)
    playClickSound();
}

// Update page indicator dots
function updatePageIndicator() {
    const dots = document.querySelectorAll('.indicator-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentPage - 1);
    });
}

function goToPage(pageNum) {
    if (pageNum < 1 || pageNum > totalPages) return;

    const currentSection = document.getElementById(`page${currentPage}`);
    const targetSection = document.getElementById(`page${pageNum}`);

    currentSection.classList.remove('active');

    setTimeout(() => {
        targetSection.classList.add('active');
        currentPage = pageNum;
    }, 100);
}

// ========================================
// Page 2: Memory Feel
// ========================================

const feelings = [
    { emoji: '🥰', text: 'อยู่กับเธอแล้ว เราสบายใจจัง' },
    { emoji: '😊', text: 'แค่เห็นเธอยิ้ม วันก็สดใสขึ้น' },
    { emoji: '💪', text: 'บางทีเราอาจไม่เก่ง แต่เราตั้งใจนะ' },
    { emoji: '💕', text: 'ขอบคุณที่เข้ามาในชีวิตเรา' },
    { emoji: '🌟', text: 'เธอทำให้ทุกวันของเราพิเศษขึ้น' }
];

let feelIndex = 0;
let feelViewCount = 0;

function initFeelPage() {
    document.getElementById('feelTotal').textContent = feelings.length;
    feelIndex = 0;
    feelViewCount = 0;
    document.getElementById('feelCounter').textContent = '0';
    document.getElementById('feelNextBtn').style.display = 'none';
}

function nextFeel() {
    const emojiEl = document.getElementById('feelEmoji');
    const textEl = document.getElementById('feelText');
    const counterEl = document.getElementById('feelCounter');
    const nextBtn = document.getElementById('feelNextBtn');

    // Add animation class
    emojiEl.style.animation = 'none';
    textEl.style.animation = 'none';

    // Trigger reflow
    void emojiEl.offsetWidth;
    void textEl.offsetWidth;

    // Update content
    emojiEl.textContent = feelings[feelIndex].emoji;
    textEl.textContent = feelings[feelIndex].text;

    // Update view count (max at feelings.length)
    feelViewCount = Math.min(feelViewCount + 1, feelings.length);
    counterEl.textContent = feelViewCount;

    // Update progress hearts
    updateProgressHearts(feelViewCount);

    // Restart animations
    emojiEl.style.animation = 'bounceIn 0.5s ease-out';
    textEl.style.animation = 'fadeInUp 0.4s ease-out';

    // Move to next feeling
    feelIndex = (feelIndex + 1) % feelings.length;

    // Show next button when all feelings are viewed
    if (feelViewCount >= feelings.length) {
        nextBtn.style.display = 'block';
        nextBtn.style.animation = 'fadeInUp 0.4s ease-out';
    }

    // Create heart burst effect
    createHeartBurst();
}

// Update progress hearts display
function updateProgressHearts(count) {
    const hearts = document.querySelectorAll('.progress-heart');
    hearts.forEach((heart, index) => {
        if (index < count) {
            heart.classList.add('filled');
            heart.textContent = '💗';
        }
    });
}

// ========================================
// Page 3: Photo Moment
// ========================================

const photos = [
    { icon: '📷', caption: 'รูปนี้...เราเผลอยิ้มทั้งวันเลยรู้ไหม 😊' },
    { icon: '🎠', caption: 'วันนั้นสนุกมากเลย จำได้ไหม?' },
    { icon: '🌅', caption: 'ทุกช่วงเวลากับเธอมันพิเศษหมดเลย' },
    { icon: '🎂', caption: 'ขอบคุณที่อยู่ด้วยกันในวันสำคัญ' }
];

let photoIndex = 0;
let photosViewed = new Set();

function initPhotoPage() {
    createPhotoDots();
    photosViewed.clear();
    document.getElementById('photoNextBtn').style.display = 'none';
    showPhoto(0);
}

function createPhotoDots() {
    const dotsContainer = document.getElementById('photoDots');
    dotsContainer.innerHTML = '';

    photos.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'photo-dot' + (index === 0 ? ' active' : '');
        dot.onclick = () => showPhoto(index);
        dotsContainer.appendChild(dot);
    });
}

function showPhoto(index) {
    const photoDisplay = document.getElementById('photoDisplay');
    const captionEl = document.getElementById('photoCaption');
    const dots = document.querySelectorAll('.photo-dot');
    const nextBtn = document.getElementById('photoNextBtn');

    // Track viewed photos
    photosViewed.add(index);

    // Update active dot
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    // Fade transition
    photoDisplay.style.opacity = '0';
    captionEl.style.opacity = '0';

    setTimeout(() => {
        photoDisplay.innerHTML = `
            <span class="photo-icon">${photos[index].icon}</span>
            <p>รูปความทรงจำของเรา</p>
        `;
        captionEl.textContent = photos[index].caption;

        photoDisplay.style.opacity = '1';
        captionEl.style.opacity = '1';
    }, 300);

    photoIndex = index;

    // Show next button when all photos are viewed
    if (photosViewed.size >= photos.length) {
        nextBtn.style.display = 'block';
        nextBtn.style.animation = 'fadeInUp 0.4s ease-out';
    }
}

function nextPhoto() {
    const nextIndex = (photoIndex + 1) % photos.length;
    showPhoto(nextIndex);
}

// ========================================
// Page 4: Postcard
// ========================================

let isCardFlipped = false;
let isTyping = false;

// Message lines to type
const postcardMessages = [
    { id: 'greetingText', text: 'สุขสันต์วันวาเลนไทน์นะ', type: 'typewriter' },
    { id: 'messageLine1', text: 'ขอบคุณที่เข้ามาเป็นความสบายใจของเรา', type: 'typewriter' },
    { id: 'messageLine2', text: 'ไม่รู้อนาคตจะเป็นยังไง', type: 'typewriter' },
    { id: 'messageLine3', text: 'แต่วันนี้…เราดีใจที่มีเธอจริงๆ', type: 'typewriter' },
    { id: 'signatureText', text: '💗', type: 'pop' }
];

function startPostcard() {
    if (isCardFlipped || isTyping) return;

    const postcard = document.getElementById('postcard');
    isCardFlipped = true;
    isTyping = true;

    // Flip the card
    postcard.classList.add('flipped');
    createHeartBurst();

    // Clear all text first
    postcardMessages.forEach(msg => {
        document.getElementById(msg.id).textContent = '';
    });

    // Start typewriter effect after flip animation
    setTimeout(() => {
        typeAllMessages(0);
    }, 800);
}

function typeAllMessages(index) {
    if (index >= postcardMessages.length) {
        // All messages typed, show image popup
        isTyping = false;
        setTimeout(() => {
            showPostcardPopup();
        }, 500);
        return;
    }

    const msg = postcardMessages[index];
    const element = document.getElementById(msg.id);

    if (msg.type === 'pop') {
        // Pop animation for emoji/signature
        element.textContent = msg.text;
        element.style.animation = 'none';
        void element.offsetWidth; // Trigger reflow
        element.style.animation = 'signaturePop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';

        setTimeout(() => {
            typeAllMessages(index + 1);
        }, 600);
    } else {
        // Typewriter for text (slower speed: 80ms per character)
        typeText(element, msg.text, 80, () => {
            setTimeout(() => {
                typeAllMessages(index + 1);
            }, 400);
        });
    }
}

function typeText(element, text, speed, callback) {
    let charIndex = 0;

    // Add cursor
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    element.appendChild(cursor);

    function type() {
        if (charIndex < text.length) {
            // Insert character before cursor
            element.insertBefore(
                document.createTextNode(text.charAt(charIndex)),
                cursor
            );
            charIndex++;
            setTimeout(type, speed);
        } else {
            // Remove cursor when done
            cursor.remove();
            if (callback) callback();
        }
    }

    type();
}

function showPostcardPopup() {
    const popup = document.getElementById('postcardPopup');
    popup.classList.add('active');
    createHeartBurst();
}

function closePostcardPopup() {
    const popup = document.getElementById('postcardPopup');
    const nextBtn = document.getElementById('postcardNextBtn');
    popup.classList.remove('active');

    // Show next button instead of auto-navigate
    if (nextBtn) {
        nextBtn.style.display = 'block';
        nextBtn.style.animation = 'fadeInUp 0.4s ease-out';
    }
}

// Keep flipCard for backwards compatibility
function flipCard() {
    startPostcard();
}

// ========================================
// Page 5: Form Submission
// ========================================

async function sendToSheet(event) {
    event.preventDefault();

    const nickname = document.getElementById('nickname').value.trim();
    const message = document.getElementById('message').value.trim();
    const submitBtn = event.target.querySelector('button[type="submit"]');

    if (!message) {
        showFormMessage('กรุณาพิมพ์ข้อความก่อนนะ 💕', 'error');
        return;
    }

    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> กำลังส่ง...';
    submitBtn.disabled = true;

    try {
        // Check if URL is configured
        if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
            // Demo mode - just show success
            console.log('Demo mode - Form data:', { nickname, message });

            setTimeout(() => {
                showFormMessage('ส่งแล้ว! ขอบคุณนะ 💖', 'success');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                // Clear form
                document.getElementById('nickname').value = '';
                document.getElementById('message').value = '';

                // Go to next page after delay
                setTimeout(() => nextPage(), 1500);
            }, 1000);

            return;
        }

        // Send to Google Sheet
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nickname: nickname || 'ไม่ระบุชื่อ',
                message: message,
                timestamp: new Date().toISOString()
            })
        });

        showFormMessage('ส่งแล้ว! ขอบคุณนะ 💖', 'success');

        // Clear form
        document.getElementById('nickname').value = '';
        document.getElementById('message').value = '';

        // Go to next page after delay
        setTimeout(() => nextPage(), 1500);

    } catch (error) {
        console.error('Error:', error);
        showFormMessage('ส่งไม่สำเร็จ ลองใหม่นะ 😢', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function showFormMessage(text, type) {
    // Remove existing message
    const existingMsg = document.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();

    const msgEl = document.createElement('p');
    msgEl.className = `form-message ${type}-message`;
    msgEl.textContent = text;

    const form = document.getElementById('feelingForm');
    form.appendChild(msgEl);

    // Remove message after 3 seconds
    setTimeout(() => msgEl.remove(), 3000);
}

// ========================================
// Page 6: Celebration
// ========================================

function celebrate() {
    const overlay = document.getElementById('celebrationOverlay');
    const heartsContainer = overlay.querySelector('.celebration-hearts');

    // Create many hearts
    heartsContainer.innerHTML = '';
    const hearts = ['💕', '❤️', '💗', '💖', '💝', '🥰', '😍'];

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: absolute;
                font-size: ${20 + Math.random() * 30}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatUp 3s ease-out forwards;
            `;
            heartsContainer.appendChild(heart);
        }, i * 100);
    }

    // Show overlay
    overlay.classList.add('active');

    // Launch confetti
    launchConfetti();

    // Hide after animation and show restart button
    setTimeout(() => {
        overlay.classList.remove('active');
        // Show restart button
        const restartBtn = document.getElementById('restartBtn');
        if (restartBtn) {
            restartBtn.style.display = 'block';
            restartBtn.style.animation = 'fadeInUp 0.4s ease-out';
        }
    }, 4000);
}

// Confetti Animation
function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiColors = ['#FF6F91', '#FFD6E8', '#FF8FAB', '#FFF5EC', '#FFAAC8', '#FF69B4'];
    const confetti = [];

    // Create confetti pieces
    for (let i = 0; i < 150; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * 10,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            tilt: Math.random() * 10 - 10,
            tiltAngle: Math.random() * Math.PI,
            tiltAngleIncrement: Math.random() * 0.07 + 0.05
        });
    }

    let animationFrame;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach((c, i) => {
            ctx.beginPath();
            ctx.lineWidth = c.r;
            ctx.strokeStyle = c.color;
            ctx.moveTo(c.x + c.tilt + c.r / 4, c.y);
            ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 4);
            ctx.stroke();
        });

        update();
    }

    function update() {
        let allFallen = true;

        confetti.forEach((c, i) => {
            if (c.y < canvas.height) {
                allFallen = false;
            }
            c.tiltAngle += c.tiltAngleIncrement;
            c.y += (Math.cos(c.d) + 3 + c.r / 2) / 1.5;
            c.x += Math.sin(c.d) * 2;
            c.tilt = Math.sin(c.tiltAngle) * 15;
        });

        if (allFallen) {
            cancelAnimationFrame(animationFrame);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }

        animationFrame = requestAnimationFrame(draw);
    }

    draw();

    // Stop after 5 seconds
    setTimeout(() => {
        cancelAnimationFrame(animationFrame);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 5000);
}

// Restart Surprise
function restartSurprise() {
    // Reset all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Reset to page 1
    currentPage = 1;
    document.getElementById('page1').classList.add('active');
    updatePageIndicator();

    // Reset feelings page
    feelIndex = 0;
    feelViewCount = 0;
    document.getElementById('feelNextBtn').style.display = 'none';
    document.querySelectorAll('.progress-heart').forEach(heart => {
        heart.classList.remove('filled');
        heart.textContent = '🤍';
    });

    // Reset photos page
    photosViewed.clear();
    document.getElementById('photoNextBtn').style.display = 'none';

    // Reset postcard page
    isCardFlipped = false;
    isTyping = false;
    document.getElementById('postcard').classList.remove('flipped');
    document.getElementById('postcardNextBtn').style.display = 'none';

    // Hide restart button
    document.getElementById('restartBtn').style.display = 'none';

    // Scroll to top
    window.scrollTo(0, 0);
}

// ========================================
// Floating Hearts Background
// ========================================

function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['💕', '❤️', '💗', '💖', '🤍', '💓'];

    // Create initial hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createOneHeart(container, hearts), i * 500);
    }

    // Continue creating hearts
    setInterval(() => {
        createOneHeart(container, hearts);
    }, 2000);
}

function createOneHeart(container, hearts) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (15 + Math.random() * 20) + 'px';
    heart.style.animationDuration = (6 + Math.random() * 4) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';

    container.appendChild(heart);

    // Remove after animation
    setTimeout(() => heart.remove(), 12000);
}

// ========================================
// Heart Burst Effect
// ========================================

function createHeartBurst() {
    const hearts = ['💕', '❤️', '💗'];
    const burstContainer = document.createElement('div');
    burstContainer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        pointer-events: none;
        z-index: 1000;
    `;
    document.body.appendChild(burstContainer);

    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('span');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

        const angle = (i / 8) * Math.PI * 2;
        const distance = 80 + Math.random() * 40;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        heart.style.cssText = `
            position: absolute;
            font-size: 20px;
            animation: burstOut 0.6s ease-out forwards;
            --x: ${x}px;
            --y: ${y}px;
        `;
        burstContainer.appendChild(heart);
    }

    // Add burst animation style if not exists
    if (!document.getElementById('burstStyle')) {
        const style = document.createElement('style');
        style.id = 'burstStyle';
        style.textContent = `
            @keyframes burstOut {
                0% {
                    transform: translate(0, 0) scale(0);
                    opacity: 1;
                }
                100% {
                    transform: translate(var(--x), var(--y)) scale(1);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Remove container after animation
    setTimeout(() => burstContainer.remove(), 700);
}

// ========================================
// Sound Effects (Optional)
// ========================================

function playClickSound() {
    // Create a simple click sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Audio not supported, skip
    }
}

// ========================================
// Initialize
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Start floating hearts
    createFloatingHearts();

    // Add smooth transitions to photo elements
    const photoDisplay = document.getElementById('photoDisplay');
    const photoCaption = document.getElementById('photoCaption');
    if (photoDisplay) photoDisplay.style.transition = 'opacity 0.3s ease';
    if (photoCaption) photoCaption.style.transition = 'opacity 0.3s ease';

    console.log('💕 Valentine Surprise Website Ready!');
});
