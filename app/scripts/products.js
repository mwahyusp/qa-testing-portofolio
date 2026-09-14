// ============================================================
// Product catalog — Mini E-Commerce
// QA NOTE: File ini mengandung INTENTIONAL DEFECT #2 (search
// case-sensitive). Detail: test-documentation/bug-reports.md
// ============================================================

const PRODUCTS_URL = "/app/data/products.json";
const CART_STORAGE_KEY = "mini_ecom_cart";

const listEl = document.getElementById("product-list");
const messageEl = document.getElementById("catalog-message");
const searchInput = document.getElementById("search-input");
const searchHint = document.getElementById("search-hint");
const emptyState = document.getElementById("empty-state");
const cartCountEl = document.getElementById("cart-count");
const detailModal = document.getElementById("detail-modal");
const modalBody = document.getElementById("modal-body");

let allProducts = [];

/**
 * Format angka ke Rupiah.
 */
function formatRupiah(value) {
  return "Rp " + value.toLocaleString("id-ID");
}

/**
 * Baca cart dari localStorage.
 * @returns {Array<{id:string, qty:number}>}
 */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

/**
 * Simpan cart ke localStorage.
 */
function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartCount();
}

/**
 * Update badge jumlah item di header.
 */
function updateCartCount() {
  const total = getCart().reduce((sum, item) => sum + item.qty, 0);
  if (cartCountEl) cartCountEl.textContent = total;
}

/**
 * Render satu kartu produk.
 */
function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.setAttribute("data-id", product.id);

  const outOfStock = product.stock === 0;

  card.innerHTML = `
    <div class="product-thumb" data-open-detail="${product.id}">
      <span class="product-thumb-label">${product.category}</span>
    </div>
    <h3 class="product-name" data-open-detail="${product.id}">${product.name}</h3>
    <p class="product-category">${product.category}</p>
    <p class="product-price">${formatRupiah(product.price)}</p>
    <p class="product-stock ${outOfStock ? "stock-empty" : ""}">
      ${outOfStock ? "Stok habis" : "Stok: " + product.stock}
    </p>
    <button class="btn btn-add" data-id="${product.id}"
      ${outOfStock ? "disabled" : ""}>
      ${outOfStock ? "Stok Habis" : "Add to Cart"}
    </button>
  `;

  if (!outOfStock) {
    const btn = card.querySelector(".btn-add");
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      handleAddToCart(product);
    });
  }

  // Klik nama/gambar → buka modal detail
  card.querySelectorAll("[data-open-detail]").forEach((el) => {
    el.addEventListener("click", () => openDetailModal(product));
  });

  return card;
}

/**
 * Handler Add to Cart — dengan guard stok.
 */
function handleAddToCart(product) {
  if (product.stock === 0) {
    messageEl.textContent = `"${product.name}" sedang habis.`;
    messageEl.className = "message error";
    return;
  }

  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, qty: 1 });
  }

  saveCart(cart);

  messageEl.textContent = `"${product.name}" ditambahkan ke cart.`;
  messageEl.className = "message success";
}

/**
 * Buka modal detail produk.
 */
function openDetailModal(product) {
  const outOfStock = product.stock === 0;

  modalBody.innerHTML = `
    <div class="detail-thumb">
      <span class="product-thumb-label">${product.category}</span>
    </div>
    <h2 id="modal-title" class="detail-name">${product.name}</h2>
    <p class="detail-category">Kategori: ${product.category}</p>
    <p class="detail-price">${formatRupiah(product.price)}</p>
    <p class="detail-stock ${outOfStock ? "stock-empty" : ""}">
      ${outOfStock ? "Stok habis" : "Stok tersedia: " + product.stock}
    </p>
    <p class="detail-desc">
      Produk demo untuk portfolio QA. ID: ${product.id}.
    </p>
    <button class="btn btn-add" id="modal-add-btn" ${outOfStock ? "disabled" : ""}>
      ${outOfStock ? "Stok Habis" : "Add to Cart"}
    </button>
  `;

  if (!outOfStock) {
    document.getElementById("modal-add-btn").addEventListener("click", () => {
      handleAddToCart(product);
      closeDetailModal();
    });
  }

  detailModal.hidden = false;
  document.body.style.overflow = "hidden";
}

/**
 * Tutup modal detail.
 */
function closeDetailModal() {
  detailModal.hidden = true;
  document.body.style.overflow = "";
}

/**
 * Render daftar produk (dengan filter).
 * @param {Array} products
 */
function renderProducts(products) {
  listEl.innerHTML = "";

  if (products.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  products.forEach((p) => listEl.appendChild(createProductCard(p)));
}

/**
 * Filter produk berdasarkan keyword.
 * ------------------------------------------------------------
 * INTENTIONAL DEFECT #2
 * Search bersifat CASE-SENSITIVE. Mencari "kaos" tidak akan
 * menemukan "Kaos Polos Hitam". Expected: case-insensitive.
 * ------------------------------------------------------------
 */
function filterProducts(keyword) {
  if (keyword === "") return allProducts;

  // DEFECT: toLowerCase() tidak dipakai di kedua sisi
  return allProducts.filter((p) => p.name.includes(keyword));
}

/**
 * Handler input search.
 */
function handleSearch(event) {
  const keyword = event.target.value.trim();
  const filtered = filterProducts(keyword);

  renderProducts(filtered);

  if (keyword !== "") {
    searchHint.textContent = `${filtered.length} produk ditemukan`;
  } else {
    searchHint.textContent = "";
  }
}

/**
 * Load & render seluruh produk.
 */
async function loadProducts() {
  try {
    const res = await fetch(PRODUCTS_URL);
    if (!res.ok) throw new Error("Gagal memuat data produk");
    allProducts = await res.json();

    renderProducts(allProducts);
    updateCartCount();
  } catch (err) {
    messageEl.textContent = "Terjadi kesalahan saat memuat produk.";
    messageEl.className = "message error";
  }
}

// Event listeners
searchInput.addEventListener("input", handleSearch);
detailModal.querySelectorAll("[data-close-modal]").forEach((el) => {
  el.addEventListener("click", closeDetailModal);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !detailModal.hidden) closeDetailModal();
});

loadProducts();