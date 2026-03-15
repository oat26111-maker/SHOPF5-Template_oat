// js/index.js
function renderProducts(data = products) {
    const container = document.getElementById('product-container');
    if (!container) return;
    container.innerHTML = "";

    data.forEach(p => {
        // แก้ไขให้ใช้ตัวแปร saleBadge จริงๆ 
        const saleBadge = p.isSale ? `<span class="badge-sale">ขายดีที่สุด</span>` : "";

        const cardHTML = `
        <div class="product-card">
            ${saleBadge}
            <img src="${p.img}" alt="${p.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${p.name}</h3>
                <p class="product-price">${p.priceDisplay}</p>
                <div class="product-actions">
                    <button class="btn-details" onclick="window.location.href='Product.html?id=${p.id}'">รายละเอียดสินค้า</button>
                    <button class="btn-add-cart" onclick="addToCart(${p.id})">เพิ่มลงตะกร้า</button>
                </div>
            </div>
        </div>`;
        container.innerHTML += cardHTML;
    });
}

function searchProduct() {
    const keyword = document.getElementById('search-input').value.toLowerCase();
    const filtered = products.filter(item => item.name.toLowerCase().includes(keyword));
    renderProducts(filtered);
}

// รันฟังก์ชันตอนโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});