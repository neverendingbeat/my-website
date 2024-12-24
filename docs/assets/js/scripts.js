document.body.classList.add('loaded');

document.addEventListener('DOMContentLoaded', function() {

    // Example: Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });
    

    // 3D Transformation for the Futuristic Figure
    const figure = document.querySelector('.figure');
    // Mouse tracking for 3D effect
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        // 3D transformation on figure
        const { innerWidth, innerHeight } = window;
        const x = (mouse.x / innerWidth) * 2 - 1;
        const y = (mouse.y / innerHeight) * 2 - 1;

        figure.style.transform = `perspective(1000px) rotateY(${x * 20}deg) rotateX(${y * -20}deg)`;
    });

    // Call this function only for pages that need particles
    function initParticles() {
        const canvas = document.getElementById('particleCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Particle settings
        let particles = [];
        const numParticles = 20;

        // Initialize particles
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
            });
        }

        // Draw particles
        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                ctx.fillStyle = `rgba(0, 0, 255, 0.7)`; // Bright green color
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                particle.size = 5;

                // Move particles
                particle.x += particle.speedX * 2;
                particle.y += particle.speedY * 2;

                // Bounce particles off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

                // Attract particles to mouse
                const dx = particle.x - mouse.x;
                const dy = particle.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    particle.x -= dx / 10;
                    particle.y -= dy / 10;
                }
            });

            requestAnimationFrame(drawParticles);
        }

        drawParticles();
    }

    // Call the particle initialization only on pages where you need it
    if (!document.body.classList.contains('home-page')) {
        initParticles();  // Initialize particles only if it's the home page
    }
    window.onload = function() {
        document.body.classList.add('loaded');
    };
    
    // Load default page content (e.g., Home) when the page load
    
    const popupTriggers = document.querySelectorAll('.popup-trigger');

// Add event listeners for each image to trigger the popup
    popupTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const popupId = this.getAttribute('data-popup-id'); // Get the corresponding popup ID
            const popup = document.getElementById(popupId); // Find the popup
            popup.style.display = 'block'; // Show the popup
        });
    });

    // Get all close buttons and add event listeners to close the popups
    const closeButtons = document.querySelectorAll('.close-btn');

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const popupId = this.getAttribute('data-popup-id');
            const popup = document.getElementById(popupId);
            popup.style.display = 'none'; // Hide the popup when the close button is clicked
        });
    });

    // Optionally, close the popup if user clicks outside the popup content
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('popup')) {
            event.target.style.display = 'none';
        }
    });
});



