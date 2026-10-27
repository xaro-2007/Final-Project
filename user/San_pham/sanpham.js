document.addEventListener("DOMContentLoaded", () => {
  renderMainProducts(ALL_PRODUCTS);
});

function renderMainProducts(products) {
  const container = document.getElementById("main-product-grid");
  if (!container) return;

  if (products.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#777;">Không có sản phẩm nào trong danh mục này.</p>`;
    return;
  }

  container.innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}">
      <div class="product-rating">${'⭐'.repeat(p.rating)}</div>
      <h3>${p.name}</h3>
      <div class="price">
        ${p.price.toLocaleString('vi-VN')} đ
        <span class="old-price">${p.oldPrice.toLocaleString('vi-VN')} đ</span>
      </div>
      <button class="btn-add" onclick="addToCart(${p.id})">Thêm vào giỏ</button>
    </div>
  `).join("");
}

function filterCategory(category, element) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');

  if (category === 'all') {
    renderMainProducts(ALL_PRODUCTS);
  } else {
    const filtered = ALL_PRODUCTS.filter(p => p.category === category);
    renderMainProducts(filtered);
  }
}