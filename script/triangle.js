document.addEventListener("DOMContentLoaded", function () {
    let navLinks = document.querySelectorAll(".navbar ul li a");

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            // Remove 'active' class from all links
            navLinks.forEach(item => item.classList.remove("active"));
            // Add 'active' class to clicked link
            this.classList.add("active");
        });
    });
});

const categories = [
    {
        id: 'nature',
        name: 'Nature',
        videoUrl: 'nature.mp4',
        description: 'Discover breathtaking natural landscapes'
    },
    {
        id: 'adventure',
        name: 'Adventure',
        videoUrl: 'adventure.mp4',
        description: 'Experience thrilling adventures'
    },
    {
        id: 'heritage',
        name: 'Heritage',
        videoUrl: 'heritage.mp4',
        description: 'Explore rich cultural heritage'
    }
];

// DOM Elements
const mainVideo = document.getElementById('mainVideo');
const muteToggle = document.getElementById('muteToggle');
const categoryDescription = document.getElementById('categoryDescription');
const categoryButtons = document.querySelectorAll('.category-btn');

// Video Controls
function changeVideo(videoUrl, description) {
    const currentTime = mainVideo.currentTime;
    mainVideo.src = videoUrl;
    mainVideo.currentTime = currentTime;
    categoryDescription.textContent = description;
}

// Add click handlers to category buttons
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Find the category data
        const videoUrl = button.dataset.video;
        const category = categories.find(cat => cat.videoUrl === videoUrl);
        
        // Change video and description
        if (category) {
            changeVideo(category.videoUrl, category.description);
        }
    });
});

// Mute toggle
muteToggle.addEventListener('click', () => {
    mainVideo.muted = !mainVideo.muted;
    muteToggle.textContent = mainVideo.muted ? 'Unmute' : 'Mute';
    muteToggle.classList.toggle('unmuted', !mainVideo.muted);
});

// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    if (index < 0) {
        currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }
    
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(-${currentSlide * 100}%)`;
    });
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Initialize first slide
showSlide(0);
document.addEventListener('DOMContentLoaded', () => {
    const offerCards = document.querySelectorAll('.offer-card');
    
    // Add smooth scroll behavior for the offers container
    const offersContainer = document.querySelector('.offers-container');
    let isScrolling = false;
    let startX;
    let scrollLeft;
    offersContainer.addEventListener('mousedown', (e) => {
        isScrolling = true;
        startX = e.pageX - offersContainer.offsetLeft;
        scrollLeft = offersContainer.scrollLeft;
    });
    offersContainer.addEventListener('mouseleave', () => {
        isScrolling = false;
    });
    offersContainer.addEventListener('mouseup', () => {
        isScrolling = false;
    });
    offersContainer.addEventListener('mousemove', (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.pageX - offersContainer.offsetLeft;
        const walk = (x - startX) * 2;
        offersContainer.scrollLeft = scrollLeft - walk;
    });
    // Add intersection observer for fade-in animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    offerCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});
