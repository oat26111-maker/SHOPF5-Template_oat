// js/cart.js
function renderCart() {
    const cartContainer = document.getElementById('cart-items-container');
    if (!cartContainer) return;
    
    cartContainer.innerHTML = "";
    let subtotal = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<div style='text-align:center; padding: 40px; color: #999;'>ตะกร้าของคุณว่างเปล่า</div>";
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            cartContainer.innerHTML += `
            <div class="cart-item-row">
                <div class="td-product">
                    <button class="btn-remove-item" onclick="removeFromCart(${item.id})"><i class="bi bi-x"></i></button>
                    <img src="${item.img}" alt="${item.name}">
                    <span class="item-name">${item.name}</span>
                </div>
                <div class="td-price">฿${item.price.toFixed(2)}</div>
                <div class="td-qty">
                    <div class="qty-control">
                        <button onclick="updateQty(${item.id}, -1)">-</button>
                        <input type="text" value="${item.quantity}" readonly>
                        <button onclick="updateQty(${item.id}, 1)">+</button>
                    </div>
                </div>
                <div class="td-total">฿${itemTotal.toFixed(2)}</div>
            </div>`;
        });
    }

    const shipping = cart.length > 0 ? 0 : 0; 
    const total = subtotal + shipping;

    document.querySelector('.subtotal').innerText = `฿${subtotal.toFixed(2)}`;
    document.querySelector('.tax').innerText = shipping === 0 ? "ฟรีค่าจัดส่ง" : `฿${shipping.toFixed(2)}`;
    document.querySelector('.total').innerText = `฿${total.toFixed(2)}`;
}
function updateQty(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id); 
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartBadge();
            renderCart();
        }
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
}

function clearCart() {
    if(confirm) {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        renderCart();
    }
}

function checkout() {
    if (cart.length === 0) {
        alert("ตะกร้าของคุณว่างเปล่า! กรุณาเลือกต้นไม้ลงตะกร้าก่อนสั่งซื้อครับ");
        return;
    }

    const overlay = document.createElement('div');
    overlay.className = 'checkout-overlay';


    overlay.innerHTML = `
        <div class="checkout-popup">
            <i class="bi bi-check-circle-fill text-success icon-success"></i>
            <h3>สั่งซื้อสำเร็จ!</h3>
            <p>ขอบคุณที่อุดหนุนต้นไม้บ้านสุวรรณครับ ระบบได้รับรายการสั่งซื้อของคุณแล้ว</p>
            <button id="closePopupBtn" class="btn btn-success btn-close-popup">ตกลง</button>
        </div>
    `;

    document.body.appendChild(overlay);
    document.getElementById('closePopupBtn').onclick = () => {
        document.body.removeChild(overlay); 
        cart = []; 
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        renderCart();
    };
}


document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});