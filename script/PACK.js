document.addEventListener("DOMContentLoaded", function () {
    const tripCard = document.getElementById("trip-card");
    const accommodationCard = document.getElementById("accommodation-card");
    const foodCard = document.getElementById("food-card");

    let isTripSelected = false;
    let isAccommodationSelected = false;
    let isFoodSelected = false;

    // Function to update card colors based on selection
    function updateSelection() {
        tripCard.style.background = isTripSelected ? "#6196ff" : "white";
        accommodationCard.style.background = isAccommodationSelected ? "#6196ff" : "white";
        foodCard.style.background = isFoodSelected ? "#6196ff" : "white";
    }

    // Trip card toggle (selects or deselects all)
    tripCard.addEventListener("click", function () {
        isTripSelected = !isTripSelected;
        if (isTripSelected) {
            isAccommodationSelected = true;
            isFoodSelected = true;
        } else {
            isAccommodationSelected = false;
            isFoodSelected = false;
        }
        updateSelection();
    });

    // Toggle Accommodation
    accommodationCard.addEventListener("click", function () {
        if (isTripSelected) {
            isAccommodationSelected = !isAccommodationSelected;
            updateSelection();
        }
    });

    // Toggle Food
    foodCard.addEventListener("click", function () {
        if (isTripSelected) {
            isFoodSelected = !isFoodSelected;
            updateSelection();
        }
    });

    // Initialize selection on page load
    updateSelection();

    // Destination Click Event (Each box links to its respective page)
    document.getElementById("destination1").addEventListener("click", function () {
        window.location.href = "html\char.html";
    });

    document.getElementById("destination2").addEventListener("click", function () {
        window.location.href = "html\char.html"; // Change to actual page
    });

    document.getElementById("destination3").addEventListener("click", function () {
        window.location.href = "html\char.html"; // Change to actual page
    });
});
