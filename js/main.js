let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    badges.forEach(badge => badge.innerText = totalQty);
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity; 
    } else {
        cart.push({ ...product, quantity: quantity }); 
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
});