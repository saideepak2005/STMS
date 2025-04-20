const images = [
    {
        url: "https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/202005/Maharashtra_Day_-1200x1280.jpg?iAUwmHKZb7r6ir9PlTmLptjExUAr4luM",
        text: "Maharashtra",
        link: "../STATE/MAHARASHTRAPACKAGE.html" // Corrected path to Maharashtra HTML page
    },
    {
        url: "https://www.holidify.com/images/bgImages/TELANGANA.jpg",
        text: "Telangana",
        link: "../STATE/TELPACKAGE.html" // Corrected relative path
    },
    {
        url: "https://i.pinimg.com/originals/35/07/2d/35072da1c9ff1fb736908a47e92d5a13.jpg",
        text: "Andra Pradesh",
        link: "../STATE/ANDHRAPACKAGE.html" // Corrected relative path
    },
    {
        url: "https://images.pexels.com/photos/88212/pexels-photo-88212.jpeg?cs=srgb&dl=pexels-umaraffan499-88212.jpg&fm=jpg",
        text: "GOA",
        link: "../STATE/GOAPACKAGE.html" // Corrected relative path (though check if this is the right file for Tamil Nadu)
    },
    {
        url: "https://i.pinimg.com/originals/a0/87/7b/a0877ba7f818ecf2a0409b9dcc93f08a.jpg",
        text: "Karnataka",
        link: "../STATE/KARNATAKAPACKAGES.html" // Corrected relative path
    }
];

let currentIndex = 0;
const carousel = document.getElementById("carousel");
const background = document.querySelector(".carousel-background");

// Remove the generic explore button if it exists
const existingExploreButton = document.querySelector(".explore-button");
if (existingExploreButton) {
    existingExploreButton.remove();
}

// Create slides dynamically
images.forEach((image, index) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.style.backgroundImage = `url(${image.url})`;
    
    // Create slide caption and explore button for each state
    slide.innerHTML = `
        <div class="slide-caption">
            <h2>${image.text}</h2>
            <a href="${image.link}" class="explore-button">Explore</a>
        </div>
    `;
    
    carousel.appendChild(slide);
});

// Update slide positions
const updateSlides = () => {
    const slides = document.querySelectorAll(".slide");
    slides.forEach((slide, index) => {
        let position = (index - currentIndex + images.length) % images.length;
        
        // Remove all position classes first
        slide.classList.remove("center", "left", "right");
        
        if (position === 0) {
            slide.classList.add("center");
        } else if (position === images.length - 1) {
            slide.classList.add("left");
        } else if (position === 1) {
            slide.classList.add("right");
        } else {
            // Hide other slides
            slide.style.opacity = 0;
            slide.style.transform = "scale(0)";
            return;
        }
        
        // Set appropriate transforms based on class
        if (slide.classList.contains("center")) {
            slide.style.transform = "scale(1)";
            slide.style.opacity = 1;
            slide.style.zIndex = 30;
        } else if (slide.classList.contains("left")) {
            slide.style.transform = "translateX(-60%) scale(0.95)";
            slide.style.opacity = 0.9;
            slide.style.zIndex = 20;
        } else if (slide.classList.contains("right")) {
            slide.style.transform = "translateX(60%) scale(0.95)";
            slide.style.opacity = 0.9;
            slide.style.zIndex = 20;
        }
    });
};

// Initialize positions
updateSlides();

// Event listeners for navigation
document.querySelector(".prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlides();
});

document.querySelector(".next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlides();
});