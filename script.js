// Sample Product Data
const products = [
    { id: 1, name: "Product 1", price: 99.99, category: "electronics", image: "https://via.placeholder.com/300" },
    { id: 2, name: "Product 2", price: 149.99, category: "clothing", image: "https://via.placeholder.com/300" },
    { id: 3, name: "Product 3", price: 199.99, category: "accessories", image: "https://via.placeholder.com/300" },
    { id: 4, name: "Product 4", price: 249.99, category: "home", image: "https://via.placeholder.com/300" },
];

// Shopping Cart
let cart = [];
let cartTotal = 0;

// Toggle Sidebar
document.getElementById("sidebarToggle").addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("active");
});

// Render Products
function renderProducts(category = "all") {
    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = "";

    const filteredProducts = category === "all" ? products : products.filter(product => product.category === category);

    filteredProducts.forEach(product => {
        const productCard = `
            <div class="col-md-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">$${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        productGrid.innerHTML += productCard;
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    cartTotal += product.price;
    updateCart();
}

// Update Cart
function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotalElement = document.getElementById("cartTotal");

    cartItems.innerHTML = "";
    cart.forEach(item => {
        const cartItem = `<li>${item.name} - $${item.price.toFixed(2)}</li>`;
        cartItems.innerHTML += cartItem;
    });

    cartCount.textContent = cart.length;
    cartTotalElement.textContent = cartTotal.toFixed(2);
}

// Category Filter
document.querySelectorAll(".category-link").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const category = this.getAttribute("data-category");
        renderProducts(category);
    });
});

// Open Cart Modal
document.getElementById("cartIcon").addEventListener("click", function () {
    const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
    cartModal.show();
});

// Initialize
renderProducts();