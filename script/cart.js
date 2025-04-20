function displayCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartEmptyMessage = document.querySelector('.cart-empty');
    const cartSummary = document.querySelector('.cart-summary');
    const cartActions = document.querySelector('.cart-actions');
    const selectVehicleBtn = document.getElementById('selectVehicleBtn');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    if (!cartItemsContainer) {
        console.error("Cart items container not found");
        return;
    }
    
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('touristCart') || '[]');
    console.log("Cart contents from localStorage:", cart);
    
    if (!Array.isArray(cart)) {
        console.error("Cart is not an array:", cart);
        localStorage.setItem('touristCart', '[]');
        return;
    }
    
    if (cart.length === 0) {
        console.log("Cart is empty");
        if (cartEmptyMessage) cartEmptyMessage.style.display = 'block';
        if (cartSummary) cartSummary.style.display = 'none';
        if (cartActions) cartActions.style.display = 'none';
        cartItemsContainer.innerHTML = '';
        return;
    }
    
    console.log("Displaying", cart.length, "items in cart");
    
    if (cartEmptyMessage) cartEmptyMessage.style.display = 'none';
    if (cartSummary) cartSummary.style.display = 'block';
    if (cartActions) cartActions.style.display = 'flex';
    
    // Clear previous content
    cartItemsContainer.innerHTML = '';
    
    // Check if any state-package exists
    const hasStatePackage = cart.some(item => item.type === 'state-package');
    const hasOfferPackage = cart.some(item => item.type === 'offer-package');
    
    // Configure buttons based on package types
    if (selectVehicleBtn) {
        if (hasStatePackage) {
            selectVehicleBtn.style.display = 'block';
            selectVehicleBtn.onclick = function() {
                window.location.href = '../OTHER/veh.html';
            };
        } else {
            selectVehicleBtn.style.display = 'none';
        }
    }
    
    if (checkoutBtn) {
        checkoutBtn.onclick = function() {
            if (hasOfferPackage && !hasStatePackage) {
                window.location.href = 'payment.html';
            } else if (hasStatePackage) {
                showNotification('Please select a vehicle first!');
            } else {
                showNotification('Your cart is empty!');
            }
        };
    }
    
    // Display each item in cart
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        // Configure details based on item type
        let detailsHtml = '';
        if (item.type === 'offer-package') {
            detailsHtml = `
                <div class="cart-item-details-list">
                    <ul>
                        <li>Transport: $${item.transport ? item.transport.toFixed(2) : '0.00'}</li>
                        <li>Food: Included</li>
                        <li>Accommodation: Included</li>
                        <li>Location: ${item.location || 'Not specified'}</li>
                    </ul>
                </div>
            `;
        } else if (item.type === 'state-package') {
            detailsHtml = `
                <div class="cart-item-details-list">
                    <ul>
                        <li>Transport: $${item.transport ? item.transport.toFixed(2) : '0.00'}</li>
                        <li>Food: ${item.food ? 'Included' : 'Not Included'}</li>
                        <li>Accommodation: ${item.accommodation ? 'Included' : 'Not Included'}</li>
                        <li>Location: ${item.location || 'Not specified'}</li>
                    </ul>
                </div>
            `;
        }
        
        // Find image for the item
        let imagePath = '';
        if (item.image) {
            imagePath = item.image;
        } else {
            // Default image
            imagePath = 'https://via.placeholder.com/150';
        }
        
        // Calculate total price correctly
        const totalPrice = (parseFloat(item.price || 0) + parseFloat(item.transport || 0)).toFixed(2);
        
        cartItem.innerHTML = `
            <div class="cart-item-content">
                <div class="cart-item-image-container">
                    <img src="${imagePath}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/150'">
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-type">${item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
                    ${detailsHtml}
                    <div class="cart-item-price">$${totalPrice}</div>
                    <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">Remove</button>
                </div>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Update summary amounts
    updateCartSummary();
}

// Function to update the cart summary amounts
function updateCartSummary() {
    const subtotalElement = document.getElementById('summary-subtotal');
    const taxElement = document.getElementById('summary-tax');
    const totalElement = document.getElementById('summary-total');
    
    const subtotal = calculateCartTotal();
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + tax;
    
    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
}

// Function to calculate cart total - include price and transport costs
function calculateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('touristCart') || '[]');
    return cart.reduce((total, item) => {
        const itemPrice = parseFloat(item.price || 0);
        const transportCost = parseFloat(item.transport || 0);
        return total + itemPrice + transportCost;
    }, 0);
}

// Function to remove item from cart
function removeFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('touristCart') || '[]');
    
    // Find the item
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        const removedItem = cart[itemIndex];
        
        // If the removed item is a main package, remove all related items
        if (removedItem.type === 'state-package' || removedItem.type === 'offer-package') {
            // Keep only items that don't match the package type
            if (removedItem.type === 'state-package') {
                // Remove all state packages and their components
                cart = cart.filter(item => item.type !== 'state-package' && 
                                        item.type !== 'accommodation' && 
                                        item.type !== 'food' &&
                                        item.type !== 'vehicle');
            } else {
                // Remove only offer packages
                cart = cart.filter(item => item.type !== 'offer-package');
            }
        } else {
            // Just remove this specific item
            cart.splice(itemIndex, 1);
        }
        
        // Update localStorage
        localStorage.setItem('touristCart', JSON.stringify(cart));
        
        // Update the display
        displayCartItems();
        
        // Update cart count in header
        updateCartCount();
        
        // Show notification
        showNotification('Item removed from cart');
    }
}

// Function to update cart count in header
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
    // First, check if there's an existing notification element
    let notification = document.querySelector('.cart-notification');
    
    // If there's no notification element, create one
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'cart-notification';
        document.body.appendChild(notification);
    }
    
    // Update the notification message and show it
    notification.textContent = message;
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
    
    // Hide the notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
    }, 3000);
}

// Function to proceed to checkout - handled within displayCartItems now
function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('touristCart') || '[]');
    
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    // Check if any state-package exists that needs vehicle selection
    const hasStatePackage = cart.some(item => item.type === 'state-package');
    
    if (hasStatePackage) {
        showNotification('Please select a vehicle first!');
    } else {
        window.location.href = 'payment.html';
    }
}

// Initialize cart display when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("Cart page loaded, initializing cart display");
    displayCartItems();
    updateCartCount();
});