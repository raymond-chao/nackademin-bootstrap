let cart = [];
const progressBar = document.getElementById('progress-bar');
const badge = document.getElementById('badge');

function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.round((scrollTop / docHeight) * 100);

    progressBar.style.width = progress + '%';
    badge.textContent = progress + '% Läst';

    if (progress >= 100) {
        badge.classList.add('complete');
        badge.textContent = 'Complete!';
    } else {
        badge.classList.remove('complete');
    }
}

window.addEventListener('scroll', updateProgressBar);

function fetchProducts(){
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => displayProducts(data))
    .catch(error => console.error('Error fetching the products', error));
}

function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$ ${product.price}</p>
            <button onclick="orderProduct('${product.title}', ${product.price}, '${product.image}')">
                Add to cart
            </button>
        `;
        
        productList.appendChild(productDiv);
    });
}

function orderProduct(title, price, image) {
    const exists = cart.find(item => item.title === title);
    if (exists) {
        exists.quantity++;
    } else {
        cart.push({ title, price, image, quantity: 1 });
    }
    updateCart();
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${title} added to cart!`);
}

function updateCart() {
    const cartButton = document.querySelector('.cart button');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartButton.textContent = `Cart (${totalItems})`;
}

function buyCart() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const params = new URLSearchParams({
        cart: JSON.stringify(cart)
    });
    
    window.location.href = `cart.html?${params.toString()}`;
}

window.onload = function() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
    
    fetchProducts();
};