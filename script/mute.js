document.addEventListener("DOMContentLoaded", function () {
    const videoElement = document.getElementById("mainVideo");
    const categoryButtons = document.querySelectorAll(".category-btn");
    const videos = ["nature.mp4", "adventure.mp4", "Heritage2.mp4"];
    let currentVideoIndex = 0;
    const muteToggle = document.getElementById("muteToggle");

    function changeVideo(index) {
        videoElement.src = videos[index];
        videoElement.load();
        videoElement.play().catch(error => console.warn("Autoplay blocked:", error));
        currentVideoIndex = index;
        updateActiveButton();
    }

    function updateActiveButton() {
        categoryButtons.forEach((btn, idx) => {
            if (idx === currentVideoIndex) {
                btn.classList.add("active");
                btn.style.backgroundColor = "white";
                btn.style.color = "black";
            } else {
                btn.classList.remove("active");
                btn.style.backgroundColor = "";
                btn.style.color = "";
            }
        });
    }

    categoryButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            changeVideo(index);
        });
    });

    document.getElementById("prevVideo").addEventListener("click", function () {
        currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
        changeVideo(currentVideoIndex);
    });

    document.getElementById("nextVideo").addEventListener("click", function () {
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        changeVideo(currentVideoIndex);
    });

    if (muteToggle && videoElement) {
        muteToggle.addEventListener("click", function () {
            if (videoElement.muted) {
                videoElement.muted = false;
                videoElement.volume = 1.0; // Ensure full volume
                muteToggle.textContent = "Mute";
            } else {
                videoElement.muted = true;
                muteToggle.textContent = "Unmute";
            }
            muteToggle.classList.toggle("unmuted", !videoElement.muted);
        });
    } else {
        console.error("Mute button or video element not found!");
    }

    // Ensure the video starts unmuted (if allowed by browser)
    videoElement.muted = false;
    videoElement.volume = 1.0;

    updateActiveButton();
});
