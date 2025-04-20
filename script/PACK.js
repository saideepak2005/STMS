document.addEventListener("DOMContentLoaded", function () {
    const tripCard = document.getElementById("trip-card");
    const accommodationCard = document.getElementById("accommodation-card");
    const foodCard = document.getElementById("food-card");
    const proceedButton = document.getElementById("proceed-button");

    let isTripSelected = false;
    let isAccommodationSelected = false;
    let isFoodSelected = false;
    
    // Generate a unique package ID when page loads
    const packageId = 'package-' + Date.now();
    
    // Function to update card colors based on selection
    function updateSelection() {
        tripCard.classList.toggle("selected", isTripSelected);
        accommodationCard.classList.toggle("selected", isAccommodationSelected);
        foodCard.classList.toggle("selected", isFoodSelected);
    }

    // Function to get the package image
    function getPackageImage() {
        // First try to get image from destination grid
        const destinationGrid = document.querySelector('.destination-grid');
        if (destinationGrid) {
            const firstDestination = destinationGrid.querySelector('.destination');
            if (firstDestination) {
                const style = window.getComputedStyle(firstDestination);
                const backgroundImage = style.backgroundImage;
                
                // Extract the URL from the background-image style
                if (backgroundImage && backgroundImage !== 'none') {
                    const imageUrl = backgroundImage.replace(/^url\(['"](.+)['"]\)$/, '$1');
                    if (imageUrl) return imageUrl;
                }
            }
        }
        
        // If no destination image, try hero background
        const hero = document.querySelector('.hero');
        if (hero) {
            const style = window.getComputedStyle(hero);
            const backgroundImage = style.backgroundImage;
            
            if (backgroundImage && backgroundImage !== 'none') {
                const imageUrl = backgroundImage.replace(/^url\(['"](.+)['"]\)$/, '$1');
                if (imageUrl) return imageUrl;
            }
        }
        
        // Default fallback
        return '/assets/images/package-default.jpg';
    }

    // Function to get details from HTML
    function getDetailsFromCard(cardElement) {
        if (!cardElement) return [];
        
        const listItems = cardElement.querySelectorAll('ul li');
        const details = [];
        
        listItems.forEach(item => {
            details.push({ name: item.textContent.trim() });
        });
        
        return details;
    }

    // Function to get package name
    function getPackageName() {
        // First try to get from hero content
        const heroTitle = document.querySelector('.hero-content h1');
        if (heroTitle) return heroTitle.textContent.trim();
        
        // Fallback to document title
        const docTitle = document.title;
        if (docTitle) {
            // Extract package name from title if it follows a pattern like "Tour Package - Package Name"
            const titleParts = docTitle.split('-');
            if (titleParts.length > 1) {
                return titleParts[1].trim();
            }
            return docTitle;
        }
        
        // Last resort default
        return 'Tour Package';
    }

    // Function to sync cart with current selections
    function syncCart() {
        // Get package details
        const packageName = getPackageName();
        const packageImage = getPackageImage();
        
        // Get item details from cards
        const tripDetails = getDetailsFromCard(tripCard);
        const accommodationDetails = getDetailsFromCard(accommodationCard);
        const foodDetails = getDetailsFromCard(foodCard);
        
        // Get prices from data attributes or use defaults
        const tripPrice = tripCard.getAttribute('data-price') ? 
            parseFloat(tripCard.getAttribute('data-price')) : 500;
        const accommodationPrice = accommodationCard.getAttribute('data-price') ? 
            parseFloat(accommodationCard.getAttribute('data-price')) : 200;
        const foodPrice = foodCard.getAttribute('data-price') ? 
            parseFloat(foodCard.getAttribute('data-price')) : 150;
        
        // Get names from data attributes or use defaults
        const tripName = tripCard.getAttribute('data-name') || packageName;
        const accommodationName = accommodationCard.getAttribute('data-name') || 'Accommodation Package';
        const foodName = foodCard.getAttribute('data-name') || 'Food Package';
        
        // Create new cart - this will replace the entire existing cart
        const newCart = [];
        
        // Add selected items to cart
        if (isTripSelected) {
            // Add trip package with default transport
            const defaultTransport = 300;
            newCart.push({
                id: `trip-${packageId}`,
                packageId: packageId,
                name: tripName,
                type: 'state-package',
                image: packageImage,
                price: tripPrice,
                transport: defaultTransport,
                totalPrice: tripPrice + defaultTransport,
                packageDetails: {
                    type: 'state-package',
                    food: isFoodSelected ? 'Included' : 'Not Included',
                    accommodation: isAccommodationSelected ? 'Included' : 'Not Included',
                    transport: defaultTransport,
                    tripPrice: tripPrice,
                    details: tripDetails
                }
            });
            
            // Add accommodation if selected
            if (isAccommodationSelected) {
                newCart.push({
                    id: `accommodation-${packageId}`,
                    packageId: packageId,
                    name: accommodationName,
                    type: 'accommodation',
                    image: packageImage,
                    price: accommodationPrice,
                    totalPrice: accommodationPrice,
                    packageDetails: {
                        type: 'accommodation',
                        details: accommodationDetails
                    }
                });
            }
            
            // Add food if selected
            if (isFoodSelected) {
                newCart.push({
                    id: `food-${packageId}`,
                    packageId: packageId,
                    name: foodName,
                    type: 'food',
                    image: packageImage,
                    price: foodPrice,
                    totalPrice: foodPrice,
                    packageDetails: {
                        type: 'food',
                        details: foodDetails
                    }
                });
            }
        }
        
        // Get existing cart to check what changed
        const existingCart = JSON.parse(localStorage.getItem('touristCart') || '[]');
        const existingLength = existingCart.length;
        
        // Store new cart in localStorage (replacing the old one)
        localStorage.setItem('touristCart', JSON.stringify(newCart));
        
        // Update cart count
        updateCartCount();
        
        // Show appropriate notification
        if (newCart.length === 0 && existingLength > 0) {
            showNotification('Cart cleared');
        } else if (newCart.length > 0 && existingLength === 0) {
            showNotification('Package added to cart');
        } else if (newCart.length > 0 && existingLength > 0) {
            showNotification('Package updated in cart');
        }
    }

    // Function to update cart count
    function updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const cart = JSON.parse(localStorage.getItem('touristCart') || '[]');
            cartCount.textContent = cart.length;
            cartCount.style.display = cart.length > 0 ? 'flex' : 'none';
        }
    }

    // Function to show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Trip card toggle (selects or deselects all)
    if (tripCard) {
        tripCard.addEventListener("click", function () {
            isTripSelected = !isTripSelected;
            
            // If trip is deselected, deselect accommodation and food as well
            if (!isTripSelected) {
                isAccommodationSelected = false;
                isFoodSelected = false;
            }
            
            updateSelection();
            syncCart();
        });
    }

    // Toggle Accommodation
    if (accommodationCard) {
        accommodationCard.addEventListener("click", function () {
            if (isTripSelected) {
                isAccommodationSelected = !isAccommodationSelected;
                updateSelection();
                syncCart();
            } else {
                showNotification('Please select Trip Details first');
            }
        });
    }

    // Toggle Food
    if (foodCard) {
        foodCard.addEventListener("click", function () {
            if (isTripSelected) {
                isFoodSelected = !isFoodSelected;
                updateSelection();
                syncCart();
            } else {
                showNotification('Please select Trip Details first');
            }
        });
    }

    // Proceed button
    if (proceedButton) {
        proceedButton.addEventListener("click", function() {
            if (isTripSelected) {
                window.location.href = "../../cart.html";
            } else {
                alert("Please select a trip package first!");
            }
        });
    }

    // Check if there's already a package in the cart to pre-select options
    function initializeFromCart() {
        const cart = JSON.parse(localStorage.getItem('touristCart') || '[]');
        if (cart.length > 0) {
            // There are items in the cart, but don't pre-select them
            // because this is likely a different package page
            // We'll let the user make their selections which will replace the cart
        }
    }

    // Initialize selection on page load
    updateSelection();
    initializeFromCart();
    
    // Initialize cart count
    updateCartCount();
});