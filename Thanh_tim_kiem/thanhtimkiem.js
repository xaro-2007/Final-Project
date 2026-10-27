// Danh sách sản phẩm mẫu dùng chung cho toàn bộ website
const ALL_PRODUCTS = [
  { id: 1, category: "makeup", name: "Son Thỏi Glossy Lipstick", price: 350000, oldPrice: 420000, img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500", rating: 5 },
  { id: 2, category: "skincare", name: "Serum Dưỡng Ấm B5 Hydrating", price: 590000, oldPrice: 650000, img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500", rating: 5 },
  { id: 3, category: "makeup", name: "Kem Nền Flawless Coverage", price: 420000, oldPrice: 500000, img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500", rating: 4 },
  { id: 4, category: "perfume", name: "Nước Hoa Rose Elegance 50ml", price: 1250000, oldPrice: 1500000, img: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500", rating: 5 },
  { id: 5, category: "skincare", name: "Kem Dưỡng Phục Hồi Skin Barrier", price: 480000, oldPrice: 550000, img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500", rating: 4 },
  { id: 6, category: "skincare", name: "Sữa Rửa Mặt Tẩy Tế Bào Chết", price: 290000, oldPrice: 340000, img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500", rating: 5 }
];

document.addEventListener("DOMContentLoaded", () => {
  initAuth();
  initSearch();
  updateCartCount();
});

// Xử lý Trạng thái Đăng ký / Đăng nhập / Đăng xuất
function initAuth() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const authContainer = document.getElementById("auth-container");

  if (!authContainer) return;

  if (user) {
    authContainer.innerHTML = `
      <span class="user-greeting">👋 Xin chào, <strong>${user.name}</strong></span>
      <button onclick="logout()" class="btn-auth btn-logout">Đăng xuất</button>
    `;
  } else {
    authContainer.innerHTML = `
      <button onclick="openModal('login-modal')" class="btn-auth">Đăng nhập</button>
      <button onclick="openModal('register-modal')" class="btn-auth btn-primary">Đăng ký</button>
    `;
  }
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "flex";
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "none";
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const user = { name: email.split("@")[0], email: email };
  localStorage.setItem("currentUser", JSON.stringify(user));
  alert("🎉 Đăng nhập thành công!");
  closeModal("login-modal");
  initAuth();
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const user = { name: name, email: email };
  localStorage.setItem("currentUser", JSON.stringify(user));
  alert("🎉 Đăng ký tài khoản thành công!");
  closeModal("register-modal");
  initAuth();
}

function logout() {
  localStorage.removeItem("currentUser");
  alert("Đã đăng xuất tài khoản!");
  initAuth();
}

// Xử lý Tìm kiếm Sản phẩm
function initSearch() {
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  if (!searchInput || !searchResults) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (query === "") {
      searchResults.style.display = "none";
      return;
    }

    const filtered = ALL_PRODUCTS.filter(p => p.name.toLowerCase().includes(query));
    if (filtered.length > 0) {
      searchResults.innerHTML = filtered.map(p => `
        <div class="search-item" onclick="quickAddToCart(${p.id})">
          <img src="${p.img}" alt="${p.name}" width="40" height="40" style="object-fit:cover; border-radius:4px;">
          <div>
            <div style="font-weight:600; font-size:13px;">${p.name}</div>
            <small style="color:#ff758c;">${p.price.toLocaleString('vi-VN')} đ</small>
          </div>
        </div>
      `).join("");
      searchResults.style.display = "block";
    } else {
      searchResults.innerHTML = `<div class="search-item" style="color:#777; font-size:13px;">Không tìm thấy sản phẩm</div>`;
      searchResults.style.display = "block";
    }
  });

  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.style.display = "none";
    }
  });
}

// Hàm thêm nhanh vào giỏ hàng
function addToCart(id) {
  const product = ALL_PRODUCTS.find(p => p.id === id);
  if (!product) return;
  
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex(item => item.id === id);

  if (index > -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`🛍️ Đã thêm "${product.name}" vào giỏ hàng!`);
  updateCartCount();
}

function quickAddToCart(id) {
  addToCart(id);
  const searchResults = document.getElementById("search-results");
  if (searchResults) searchResults.style.display = "none";
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countEl = document.getElementById("cart-count");
  if (countEl) countEl.innerText = total;
}