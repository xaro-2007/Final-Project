document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();
});

function renderCartPage() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = id => document.getElementById(id);
  const cartContent = cartContainer("cart-content");

  if (!cartContent) return;

  if (cart.length === 0) {
    cartContent.style.gridTemplateColumns = "1fr";
    cartContent.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <h3>Giỏ hàng của bạn đang trống!</h3>
        <p>Hãy khám phá các sản phẩm tuyệt vời của AuraBeauty và lấp đầy giỏ hàng nhé.</p>
        <a href="../San_pham/sanpham.html" class="btn-checkout" style="display:inline-block; width:auto; padding: 10px 30px;">Xem Sản Phẩm</a>
      </div>
    `;
    return;
  }

  const tbody = cartContainer("cart-items-body");
  let subtotal = 0;

  tbody.innerHTML = cart.map((item) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    return `
      <tr>
        <td>
          <div class="cart-item-info">
            <img src="${item.img}" alt="${item.name}">
            <span class="cart-item-title">${item.name}</span>
          </div>
        </td>
        <td>${item.price.toLocaleString('vi-VN')} đ</td>
        <td>
          <div class="qty-btn-group">
            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
          </div>
        </td>
        <td><strong>${itemTotal.toLocaleString('vi-VN')} đ</strong></td>
        <td>
          <button class="btn-remove-item" onclick="removeCartItem(${item.id})">Xóa</button>
        </td>
      </tr>
    `;
  }).join("");

  cartContainer("subtotal-price").innerText = subtotal.toLocaleString('vi-VN') + " đ";
  cartContainer("total-price").innerText = subtotal.toLocaleString('vi-VN') + " đ";
}

// Thay đổi số lượng sản phẩm
function updateQuantity(id, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex(item => item.id === id);

  if (index > -1) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartPage();
  if (typeof updateCartCount === "function") {
    updateCartCount();
  }
}

// Xóa sản phẩm khỏi giỏ hàng
function removeCartItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartPage();
  if (typeof updateCartCount === "function") {
    updateCartCount();
  }
}

// Thanh toán
function checkout() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    alert("Vui lòng Đăng nhập để tiến hành thanh toán!");
    if (typeof openModal === "function") {
      openModal("login-modal");
    }
    return;
  }

  alert(`Cảm ơn ${user.name} đã đặt hàng thành công!\nĐơn hàng sẽ được chuyển đến địa chỉ của bạn trong thời gian sớm nhất.`);
  localStorage.removeItem("cart");
  renderCartPage();
  if (typeof updateCartCount === "function") {
    updateCartCount();
  }
}