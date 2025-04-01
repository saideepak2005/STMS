    document.addEventListener('DOMContentLoaded', () => {
        // Initialize video playback
        const heroVideo = document.getElementById('heroVideo');
        if (heroVideo) {
            heroVideo.play().catch(error => {
                console.log("Auto-play prevented:", error);
            });
        }

        // Intersection Observer for animation triggers
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.info-card, .place-card').forEach(el => {
            observer.observe(el);
        });

        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const videoOverlay = document.querySelector('.video-overlay');
            if (videoOverlay) {
                videoOverlay.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
        const reviewCards = document.querySelectorAll('.review-card');
    
        const reviewObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                    }, index * 200); // Staggered animation
                    reviewObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px'
        });
    
        reviewCards.forEach(card => {
            reviewObserver.observe(card);
        });
    
        // Add hover effect to review cards
        reviewCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        // Interactive elements animation
        const addHoverAnimation = (elements, className) => {
            elements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    element.classList.add(className);
                });
                element.addEventListener('mouseleave', () => {
                    element.classList.remove(className);
                });
            });
        };

        // Add hover animations to buttons and cards
        addHoverAnimation(document.querySelectorAll('.nav-btn'), 'hover-scale');
        addHoverAnimation(document.querySelectorAll('.place-card'), 'hover-lift');

        // Dynamic time-based greeting
        const updateGreeting = () => {
            const hour = new Date().getHours();
            let greeting;
            
            if (hour < 12) greeting = "Good Morning";
            else if (hour < 18) greeting = "Good Afternoon";
            else greeting = "Good Evening";
            
            const titleElement = document.querySelector('.title-animate');
            if (titleElement) {
                titleElement.textContent = `${greeting}, Welcome to`;
            }
        };

        updateGreeting();
        setInterval(updateGreeting, 60000); // Update every minute
    });