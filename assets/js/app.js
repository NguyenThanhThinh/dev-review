const reveals = document.querySelectorAll('.scroll-reveal');
        
function reveal() {
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check on load

// Animate progress bars
function animateProgressBars() {
    $('.progress-bar').each(function() {
        const width = $(this).attr('style').replace('width: ', '');
        $(this).css('width', '0').animate({
            width: width
        }, 1500);
    });
}

// Initialize when DOM is ready
$(document).ready(function() {
    // Initialize all animations and effects
    animateProgressBars();
    initParticles();

    // Animate progress bars when they come into view
    $(window).scroll(function() {
        $('.progress').each(function() {
            const bottom_of_object = $(this).offset().top + $(this).outerHeight();
            const bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if (bottom_of_window > bottom_of_object) {
                $(this).find('.progress-bar').css('width', $(this).find('.progress-bar').attr('style').replace('width: ', ''));
            }
        });
    });

    // Lazy load images
    document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
    });
});

// Tech stack hover effect
$('.tech-stack-item').hover(
    function() {
        $(this).addClass('animate__animated animate__pulse');
    },
    function() {
        $(this).removeClass('animate__animated animate__pulse');
    }
);

// Achievement cards interaction
$('.card').hover(
    function() {
        $(this).find('.achievement-icon').addClass('animate__animated animate__heartBeat');
    },
    function() {
        $(this).find('.achievement-icon').removeClass('animate__animated animate__heartBeat');
    }
);

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

class Particle {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = options.x || Math.random() * canvas.width;
        this.y = options.y || Math.random() * canvas.height;
        this.vx = options.vx || (Math.random() - 0.5) * 2;
        this.vy = options.vy || (Math.random() - 0.5) * 2;
        this.size = options.size || Math.random() * 3;
        this.color = options.color || '#ffffff';
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}

function initParticles() {
    const canvas = document.createElement('canvas');
    const heroSection = document.querySelector('.bg-dotnet');
    heroSection.appendChild(canvas);
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';

    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas, {
            color: 'rgba(255, 255, 255, 0.5)'
        }));
    }

    function animate() {
        requestAnimationFrame(animate);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
    }

    animate();
}

// Handle loading state
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});