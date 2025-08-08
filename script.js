// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Music Player Functionality
const playBtn = document.querySelector('.play-btn');
const progress = document.querySelector('.progress');
const timeDisplay = document.querySelector('.time');
const tracks = document.querySelectorAll('.track');
let isPlaying = false;
let currentTrack = 0;
let currentTime = 0;
let duration = 0;

// Simulate music player functionality
playBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    const icon = playBtn.querySelector('i');
    
    if (isPlaying) {
        icon.className = 'fas fa-pause';
        simulatePlayback();
    } else {
        icon.className = 'fas fa-play';
        clearInterval(window.playbackInterval);
    }
});

function simulatePlayback() {
    currentTime = 0;
    duration = 180; // 3 minutes in seconds
    
    window.playbackInterval = setInterval(() => {
        if (isPlaying) {
            currentTime++;
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = `${progressPercent}%`;
            
            const currentMinutes = Math.floor(currentTime / 60);
            const currentSeconds = currentTime % 60;
            const durationMinutes = Math.floor(duration / 60);
            const durationSeconds = duration % 60;
            
            timeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
            
            if (currentTime >= duration) {
                isPlaying = false;
                playBtn.querySelector('i').className = 'fas fa-play';
                clearInterval(window.playbackInterval);
            }
        }
    }, 1000);
}

// Track selection
tracks.forEach((track, index) => {
    track.addEventListener('click', () => {
        // Remove active class from all tracks
        tracks.forEach(t => t.classList.remove('active'));
        // Add active class to clicked track
        track.classList.add('active');
        currentTrack = index;
        
        // Reset player
        isPlaying = false;
        playBtn.querySelector('i').className = 'fas fa-play';
        clearInterval(window.playbackInterval);
        progress.style.width = '0%';
        timeDisplay.textContent = '0:00 / 0:00';
    });
});

// Newsletter Form Handling
const newsletterForm = document.querySelector('.newsletter-form');
const emailInput = newsletterForm.querySelector('input[type="email"]');
const submitBtn = newsletterForm.querySelector('button[type="submit"]');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    if (!email) {
        showNotification('Bitte geben Sie eine E-Mail-Adresse ein.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
        return;
    }
    
    // Simulate form submission
    submitBtn.innerHTML = '<span class="loading"></span>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Vielen Dank! Sie sind jetzt für den Newsletter angemeldet.', 'success');
        emailInput.value = '';
        submitBtn.innerHTML = 'Anmelden';
        submitBtn.disabled = false;
    }, 2000);
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(notificationStyles);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.event-card, .dj-card, .music-player, .podcast-section');
    animateElements.forEach(el => observer.observe(el));
});

// Event card hover effects
document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// DJ card hover effects
document.querySelectorAll('.dj-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Vinyl animation speed control
let vinylSpeed = 3;
const vinylDisc = document.querySelector('.vinyl-disc');

// Add speed control on hover
vinylDisc.addEventListener('mouseenter', () => {
    vinylDisc.style.animationDuration = '1s';
});

vinylDisc.addEventListener('mouseleave', () => {
    vinylDisc.style.animationDuration = '3s';
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Form validation enhancement
emailInput.addEventListener('blur', () => {
    const email = emailInput.value.trim();
    if (email && !isValidEmail(email)) {
        emailInput.style.borderColor = '#f44336';
    } else {
        emailInput.style.borderColor = '';
    }
});

emailInput.addEventListener('input', () => {
    emailInput.style.borderColor = '';
});

// Keyboard navigation for music player
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && document.activeElement === playBtn) {
        e.preventDefault();
        playBtn.click();
    }
});

// Accessibility improvements
document.querySelectorAll('button, a').forEach(element => {
    if (!element.getAttribute('aria-label')) {
        const text = element.textContent.trim();
        if (text) {
            element.setAttribute('aria-label', text);
        }
    }
});

// Performance optimization - lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console welcome message
console.log(`
🎵 Bussi Baba - No Gossip Just Dancing 🎵
Welcome to the redesigned website!
Built with modern web technologies and love for music.
`);
