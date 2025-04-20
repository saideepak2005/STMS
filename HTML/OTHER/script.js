document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    if (!localStorage.getItem('touristCart')) {
        localStorage.setItem('touristCart', JSON.stringify([]));
    }

    // Load offers
    loadOffers();
    
    // Update cart count
    updateCartCount();
    
    // Setup event listeners
    setupEventListeners();
    
    // Add user icon click listener
    setupUserIconListener();
});

// Function to handle user icon click
function setupUserIconListener() {
    const userIcon = document.querySelector('.bx-user');
    if (userIcon) {
        userIcon.parentElement.style.cursor = 'pointer'; // Make the parent element show a pointer cursor
        userIcon.parentElement.addEventListener('click', function() {
            window.location.href = 'home.html'; // Redirect to login page
        });
    }
}

// Sample offer data
const offers = [
    {
        id: 1,
        name: "Premium Package",
        location: "NORTH GOA",
        price: 1299,
        discount: 30,
        image: "https://i.ytimg.com/vi/82bPwndF-J0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDWGQCmRU5-ZzGifVSNiFCzXzrTxg"
    },
    {
        id: 2,
        name: "Special Deal",
        location: "MUMBAI",
        price: 999,
        discount: 25,
        image: "https://i.ytimg.com/vi/8pdAlCxCbKo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCG6SlppcEwzE9MJaSmKr0sRgLajw"
    },
    {
        id: 3,
        name: "Adventure Escape",
        location: "NallamalLa",
        price: 899,
        discount: 20,
        image: "https://ocean6holidays.com/wp-content/uploads/2025/02/nallamala-hills-tour.jpg"
    },
    {
        id: 4,
        name: "Flash Sale",
        location: "BHADRACHALAM",
        price: 799,
        discount: 40,
        image: "https://i.pinimg.com/736x/7b/ff/d1/7bffd1ed9f301ec683013a76a9107164.jpg"
    },
    {
        id: 5,
        name: "Holiday Bundle",
        location: "Warangal",
        price: 1199,
        discount: 35,
        image: "https://live.staticflickr.com/482/19204340060_199d8af452_b.jpg"
    },
    {
        id: 6,
        name: "Seasonal Promotion",
        location: "SOUTH GOA",
        price: 1099,
        discount: 15,
        image: "https://www.shutterstock.com/shutterstock/videos/3514082055/thumb/1.jpg?ip=x480"
    },
    {
        id: 7,
        name: "Luxury Retreat",
        location: "MYSORE",
        price: 1599,
        discount: 50,
        image: "https://i.ytimg.com/vi/qjocQjGmWiM/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCfZbZac_9jISst2EBZnZxy77gsNw"
    },
    {
        id: 8,
        name: "Family Package",
        location: "TIRUPATHI",
        price: 1299,
        discount: 20,
        image: "https://i.ytimg.com/vi/i1PRlMkpUgM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC6r3MdBnocVhICSCXP7tUkn20x8A"
    }
];

// Load offers into the page
function loadOffers() {
    const offersContainer = document.querySelector('.offers-container');
    
    if (!offersContainer) return;
    
    // Map of locations to their exact package paths
    const locationToPackage = {
        'NORTH GOA': '/HTML/PACKAGE HTML/GOA/NorthGoa.html',
        'SOUTH GOA': '/HTML/PACKAGE HTML/GOA/SouthGoa.html',
        'MUMBAI': '/HTML/PACKAGE HTML/MAHARASHTRA/MUMBAICITYTOUR.HTML',
        'NallamalLa': '/HTML/PACKAGE HTML/TELANAGANA/NALLAMALLA.HTML',
        'BHADRACHALAM': '/HTML/PACKAGE HTML/TELANAGANA/BHADHRACHALAM.HTML',
        'Warangal': '/HTML/PACKAGE HTML/TELANAGANA/WARANGAL.HTML',
        'MYSORE': '/HTML/PACKAGE HTML/KARNATAKA/MysoreTour.html',
        'TIRUPATHI': '/HTML/PACKAGE HTML/ANDHRA/TirupatiPilgrimTour.html'
    };

    // Transport charges for each location
    const transportCharges = {
        'NORTH GOA': 500,
        'SOUTH GOA': 500,
        'MUMBAI': 300,
        'NallamalLa': 400,
        'BHADRACHALAM': 400,
        'Warangal': 300,
        'MYSORE': 400,
        'TIRUPATHI': 300
    };
    
    offersContainer.innerHTML = offers.map(offer => {
        const packagePath = locationToPackage[offer.location] || 'PACKAGE HTML/OTHER/' + offer.name.replace(/\s+/g, '') + '.html';
        const transportCharge = transportCharges[offer.location] || 300;
        
        // Calculate the original price (no need to calculate discount here)
        const originalPrice = offer.price;
        
        return `
            <div class="offer-card" data-package-path="${packagePath}">
                <img src="${offer.image}" alt="${offer.name}">
                <div class="offer-content">
                    <span class="discount-badge">Save ${offer.discount}%</span>
                    <h3>${offer.name}</h3>
                    <p class="location-name">${offer.location}</p>
                    <p class="price">$${originalPrice.toFixed(2)}</p>
                    <button class="add-to-cart-btn" 
                            data-id="${offer.id}" 
                            data-name="${offer.name}" 
                            data-price="${originalPrice}" 
                            data-location="${offer.location}"
                            data-transport="${transportCharge}">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Add event listeners for Add to Cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling to the parent card
            const offer = {
                id: this.getAttribute('data-id'),
                name: this.getAttribute('data-name'),
                price: parseFloat(this.getAttribute('data-price')),
                location: this.getAttribute('data-location'),
                transport: parseFloat(this.getAttribute('data-transport')),
                type: 'offer-package',
                food: true,
                accommodation: true
            };
            addToCart(offer);
            showNotification(`${offer.name} added to cart!`);
        });
    });
    
    // Add event listeners for the entire offer card
    document.querySelectorAll('.offer-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Only redirect if the click wasn't on the Add to Cart button
            if (!e.target.classList.contains('add-to-cart-btn')) {
                const packagePath = this.getAttribute('data-package-path');
                if (packagePath) {
                    window.location.href = packagePath;
                }
            }
        });
        
        // Add cursor pointer to show clickable
        card.style.cursor = 'pointer';
    });
}

// Setup event listeners
function setupEventListeners() {
    // Video category buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video');
            changeVideo(videoSrc);
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Mute toggle button
    const muteToggle = document.getElementById('muteToggle');
    if (muteToggle) {
        muteToggle.addEventListener('click', toggleMute);
    }
    
    // Arrow buttons
    const prevBtn = document.getElementById('prevVideo');
    const nextBtn = document.getElementById('nextVideo');
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', showPreviousVideo);
        nextBtn.addEventListener('click', showNextVideo);
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            subscribeToNewsletter(email);
        });
    }
}

// Video control functions
function changeVideo(src) {
    const video = document.querySelector('.background-video');
    if (video) {
        video.src = src;
        video.load();
        video.play();
    }
}

function toggleMute() {
    const video = document.querySelector('.background-video');
    if (video) {
        video.muted = !video.muted;
        this.textContent = video.muted ? 'Unmute' : 'Mute';
    }
}

function showPreviousVideo() {
    // In a real app, you would cycle through an array of videos
    console.log('Previous video');
}

function showNextVideo() {
    // In a real app, you would cycle through an array of videos
    console.log('Next video');
}

// Cart functions
function addToCart(item) {
    console.log('Adding to cart:', item);
    
    // Get existing cart or initialize empty array
    let cart = JSON.parse(localStorage.getItem('touristCart') || '[]');
    
    // Completely clear the cart no matter what type we're adding
    // This ensures any existing package (state or offer) will be replaced
    cart = [];
    
    // Add transport charge for offer packages
    if (item.type === 'offer-package') {
        // Use the original price from the offers array
        item.totalPrice = item.price + item.transport;
        // Add mandatory food and accommodation for offer packages
        item.food = true;
        item.accommodation = true;
        item.packageDetails = {
            type: 'offer-package',
            food: 'Included',
            accommodation: 'Included',
            transport: item.transport
        };
    } else {
        // For state-wise selection packages
        // Set default transport charge (can be updated later)
        const defaultTransport = 300; // Default transport charge
        item.transport = defaultTransport;
        item.totalPrice = item.price + defaultTransport;
        item.type = 'state-package';
        item.packageDetails = {
            type: 'state-package',
            food: item.food ? 'Included' : 'Not Included',
            accommodation: item.accommodation ? 'Included' : 'Not Included',
            transport: defaultTransport,
            tripPrice: item.price // Store the base trip price separately
        };
    }
    
    cart.push(item);
    localStorage.setItem('touristCart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${item.name} added to cart!`);
    
    // Redirect based on package type
    if (item.type === 'offer-package') {
        // For offer packages, redirect to the respective package page
        const packagePage = getPackagePage(item.location);
        if (packagePage) {
            window.location.href = packagePage;
        }
    } else if (item.type === 'state-package') {
        // For state packages, redirect to vehicle selection
        window.location.href = 'veh.html';
    }
}

// Helper function to get the correct package page URL
function getPackagePage(packageName) {
    const packagePages = {
        'NORTH GOA': '/HTML/PACKAGE HTML/GOA/NorthGoa.html',
        'SOUTH GOA': '/HTML/PACKAGE HTML/GOA/SouthGoa.html',
        'MUMBAI': '/HTML/PACKAGE HTML/MAHARASHTRA/MUMBAICITYTOUR.HTML',
        'NallamalLa': '/HTML/PACKAGE HTML/TELANAGANA/NALLAMALLA.HTML',
        'BHADRACHALAM': '/HTML/PACKAGE HTML/TELANAGANA/BHADHRACHALAM.HTML',
        'Warangal': '/HTML/PACKAGE HTML/TELANAGANA/WARANGAL.HTML',
        'MYSORE': '/HTML/PACKAGE HTML/KARNATAKA/MysoreTour.html',
        'TIRUPATHI': '/HTML/PACKAGE HTML/ANDHRA/TirupatiPilgrimTour.html'
    };

    return packagePages[packageName] || null;
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('touristCart') || '[]');
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'flex' : 'none';
    }
}

// Notification function
function showNotification(message) {
    const notification = document.querySelector('.cart-notification');
    if (notification) {
        notification.textContent = message;
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
        }, 3000);
    }
}

// Newsletter function
function subscribeToNewsletter(email) {
    console.log('Subscribed with email:', email);
    showNotification('Thanks for subscribing!');
    document.querySelector('.newsletter-form input').value = '';
}

// Update displayCartItems function
function displayCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartEmptyMessage = document.querySelector('.cart-empty');
    const cartSummary = document.querySelector('.cart-summary');
    const cartActions = document.querySelector('.cart-actions');
    
    if (!cartItemsContainer) return;
    
    const cart = JSON.parse(localStorage.getItem('touristCart') || '[]');
    
    if (cart.length === 0) {
        if (cartEmptyMessage) cartEmptyMessage.style.display = 'block';
        if (cartSummary) cartSummary.style.display = 'none';
        if (cartActions) cartActions.style.display = 'none';
        cartItemsContainer.innerHTML = '';
        return;
    }
    
    if (cartEmptyMessage) cartEmptyMessage.style.display = 'none';
    if (cartSummary) cartSummary.style.display = 'block';
    if (cartActions) cartActions.style.display = 'flex';
    
    // Group items by package
    const packages = {};
    cart.forEach(item => {
        if (!packages[item.packageId]) {
            packages[item.packageId] = [];
        }
        packages[item.packageId].push(item);
    });
    
    // Display each package group
    cartItemsContainer.innerHTML = Object.values(packages).map(packageItems => {
        // Get the trip item (should be first in the group)
        const tripItem = packageItems.find(item => item.type === 'state-package');
        if (!tripItem) return '';
        
        // Create package header
        const packageHeader = `
            <div class="package-header">
                <h2>${tripItem.name}</h2>
            </div>
        `;
        
        // Create items list
        const itemsList = packageItems.map(item => {
            let detailsHtml = '';
            if (item.type === 'state-package') {
                detailsHtml = `
                    <div class="cart-item-details-list">
                        <ul>
                            <li>Transport: $${item.packageDetails.transport.toFixed(2)}</li>
                            <li>Food: ${item.packageDetails.food}</li>
                            <li>Accommodation: ${item.packageDetails.accommodation}</li>
                        </ul>
                    </div>
                `;
            } else if (item.type === 'accommodation' || item.type === 'food') {
                detailsHtml = `
                    <div class="cart-item-details-list">
                        <ul>
                            <li>${item.packageDetails.details}</li>
                        </ul>
                    </div>
                `;
            }
            
            return `
                <div class="cart-item">
                    <div class="cart-item-content">
                        <div class="cart-item-image-container">
                            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        </div>
                        <div class="cart-item-details">
                            <h3 class="cart-item-name">${item.name}</h3>
                            <p class="cart-item-type">${item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
                            ${detailsHtml}
                            <div class="cart-item-price">$${item.totalPrice.toFixed(2)}</div>
                            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">Remove</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        return `
            <div class="package-group">
                ${packageHeader}
                ${itemsList}
            </div>
        `;
    }).join('');
    
    // Update summary amounts
    updateCartSummary();
}

// Update cart summary
function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('touristCart') || '[]');
    const total = cart.reduce((sum, item) => sum + (item.totalPrice || item.price), 0);
    
    const summaryHTML = `
        <h3>Order Summary</h3>
        <div class="summary-row">
            <span>Subtotal</span>
            <span>$${total.toFixed(2)}</span>
        </div>
        <div class="summary-row total">
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
        </div>
    `;
    
    const cartSummary = document.querySelector('.cart-summary');
    if (cartSummary) {
        cartSummary.innerHTML = summaryHTML;
    }
}

// Function to remove item from cart
function removeFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('touristCart') || '[]');
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('touristCart', JSON.stringify(cart));
    
    // Update display
    updateCartCount();
    displayCartItems();
    showNotification('Item removed from cart');
}