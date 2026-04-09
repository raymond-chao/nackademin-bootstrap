let cart = [];

window.onload = function() {
    loadCart();
    displayCart();
};

function loadCart() {
    const params = new URLSearchParams(window.location.search);
    const cartData = params.get('cart');
    
    if (cartData) {
        cart = JSON.parse(cartData);
    } else {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
    }
}

function displayCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartDiv = document.getElementById('emptyCart');
    const cartSummary = document.getElementById('cartSummary');
    const itemCount = document.getElementById('itemCount');
    
    cartItemsContainer.innerHTML = '';
    
    // kolla om cart är tom
    if (cart.length === 0) {
        emptyCartDiv.style.display = 'block';
        cartSummary.style.display = 'none';
        itemCount.textContent = '0 items';
        return;
    }
    
    emptyCartDiv.style.display = 'none';
    cartSummary.style.display = 'block';
    
    // Uppdatera item count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    itemCount.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
    
    // visa varje produkt
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        cartItem.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}" />
            <div class="item-info">
                <h3>${item.title}</h3>
                <p class="item-price">$${item.price.toFixed(2)}</p>
            </div>
            
            <div class="quantity-controls">
                <button class="qty-btn" onclick="decreaseQuantity(${index})">
                    <i class="fa-solid fa-minus"></i>
                </button>
                <span class="quantity">${item.quantity}</span>
                <button class="qty-btn" onclick="increaseQuantity(${index})">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            
            <div class="item-total">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-btn" onclick="removeItem(${index})">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Uppdatera totaler
    updateSummary();
}

function increaseQuantity(index) {
    cart[index].quantity++;
    saveCart();
    displayCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        saveCart();
        displayCart();
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}

function updateSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 10.00;
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const params = new URLSearchParams({
        cart: JSON.stringify(cart)
    });
                    
    window.location.href = `form.html?${params.toString()}`;
}
