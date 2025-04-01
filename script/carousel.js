const images = [
    {
        url: "https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/202005/Maharashtra_Day_-1200x1280.jpg?iAUwmHKZb7r6ir9PlTmLptjExUAr4luM",
        text: "Maharashtra"
    },
    {
        url: "https://www.holidify.com/images/bgImages/TELANGANA.jpg",
        text: "Telangana"
    },
    {
        url: "https://i.pinimg.com/originals/35/07/2d/35072da1c9ff1fb736908a47e92d5a13.jpg",
        text: "Andra Pradesh"
    },
    {
        url: "https://lp-cms-production.imgix.net/2019-06/GettyImages-149315250_full.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4",
        text: "Tamil Nadu"
    },
    {
        url: "https://cdn.wallpapersafari.com/41/26/YJxVDg.jpg",
        text: "Kerla"
    },
    {
        url: "https://i.pinimg.com/originals/a0/87/7b/a0877ba7f818ecf2a0409b9dcc93f08a.jpg",
        text: "Karnataka"
    }
];

let currentIndex = 0;
const carousel = document.getElementById("carousel");
const background = document.querySelector(".carousel-background");

// Create slides dynamically
images.forEach((image, index) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.style.backgroundImage = `url(${image.url})`;
    slide.innerHTML = `
        <div class="slide-caption">
            <h2>${image.text}</h2>
        </div>
    `;
    carousel.appendChild(slide);
});

// Update slide positions
const updateSlides = () => {
    const slides = document.querySelectorAll(".slide");
    slides.forEach((slide, index) => {
        let position = (index - currentIndex + images.length) % images.length;
        slide.style.transform = `translateX(${(position - 1) * 40}%) scale(${position === 1 ? 1 : 0.9})`;
        slide.style.opacity = position === 1 ? 1 : 0.5;
        slide.style.zIndex = position === 1 ? 2 : 1;
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
