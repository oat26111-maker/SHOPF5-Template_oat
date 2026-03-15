document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    const product = products.find(p => p.id === productId);

    if (product) {
        document.querySelector('.detail-title').innerText = product.name;
        document.querySelector('.detail-price').innerText = product.priceDisplay;
        document.querySelector('.product-image-box img').src = product.img;
        document.querySelector('.product-image-box img').alt = product.name;
        
        const breadcrumbSpan = document.querySelector('.breadcrumb-clean span');
        if(breadcrumbSpan) breadcrumbSpan.innerText = product.name;
        
        const addBtn = document.querySelector('.btn-add-to-cart-large');
        if(addBtn) {
            addBtn.onclick = () => {
                const qty = parseInt(document.getElementById('qty-input').value) || 1;
                addToCart(product.id, qty);
            };
        }
    }
});