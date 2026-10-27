document.addEventListener("DOMContentLoaded", () => {
  renderHomeProducts();
});

// Hiển thị sản phẩm bán chạy ở trang chủ
function renderHomeProducts() {
  const container = document.getElementById("home-featured-products");
  if (!container || typeof ALL_PRODUCTS === "undefined") return;

  container.innerHTML = ALL_PRODUCTS.map(p => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <div class="price">${p.price.toLocaleString('vi-VN')} đ</div>
      <button class="btn-add" onclick="addToCart(${p.id})">Thêm vào giỏ</button>
    </div>
  `).join("");
}

// Thêm sản phẩm vào giỏ (nếu nhấn từ trang chủ)
function addToCart(id) {
  const product = ALL_PRODUCTS.find(p => p.id === id);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex(item => item.id === id);

  if (index > -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
  if (typeof updateCartCount === "function") {
    updateCartCount();
  }
}

// Xử lý Form Đăng ký nhận bản tin
function handleNewsletter(e) {
  e.preventDefault();
  alert("Cảm ơn bạn đã đăng ký nhận bản tin từ AuraBeauty!");
  e.target.reset();
}