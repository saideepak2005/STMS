document.addEventListener("DOMContentLoaded", function () {
    const videoElement = document.getElementById("mainVideo");
    const categoryButtons = document.querySelectorAll(".category-btn");
    const videos = ["nature.mp4", "adventure.mp4", "Heritage2.mp4"];
    let currentVideoIndex = 0;

    function changeVideo(index) {
        videoElement.src = videos[index];
        videoElement.play();
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

    document.getElementById("muteToggle").addEventListener("click", function () {
        videoElement.muted = !videoElement.muted;
        this.textContent = videoElement.muted ? "Unmute" : "Mute";
    });

    updateActiveButton();
});

