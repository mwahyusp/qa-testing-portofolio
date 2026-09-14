// ============================================================
// Shopping Cart — Mini E-Commerce
// QA NOTE: File ini mengandung INTENTIONAL DEFECT #3
// (quantity tidak dibatasi stok).
// ============================================================

const PRODUCTS_URL = "/app/data/products.json";
const CART_STORAGE_KEY = "mini_ecom_cart";

const listEl = document.getElementById("cart-list");
const messageEl = document.getElementById("cart-message");
const emptyEl = document.getElementById("cart-empty");
const summaryEl = document.getElementById("cart-summary");
const summaryItemsEl = document.getElementById("summary-items");
const summarySubtotalEl = document.getElementById("summary-subtotal");
const btnCheckout = document.getElementById("btn-checkout");

let allProducts = [];
let cart = [];

/**
 * Format angka ke Rupiah.
 */
function formatRupiah(value) {
  return "Rp " + value.toLocaleString("id-ID");
}

/**
 * Baca cart dari localStorage.
 */
function loadCart() {
  try {
    cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch {
    cart = [];
  }
}

/**
 * Simpan cart.
 */
function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

/**
 * Cari product by ID.
 */
function findProduct(id) {
  return allProducts.find((p) => p.id === id);
}

/**
 * Render satu baris item cart.
 */
function createCartItem(item) {
  const product = findProduct(item.id);
  if (!product) return null;

  const row = document.createElement("article");
  row.className = "cart-item";
  row.setAttribute("data-id", item.id);

  row.innerHTML = `
    <div class="cart-item-info">
      <h3 class="cart-item-name">${product.name}</h3>
      <p class="cart-item-category">${product.category}</p>
      <p class="cart-item-price">${formatRupiah(product.price)}</p>
    </div>
    <div class="cart-item-controls">
      <button class="btn btn-qty" data-action="dec" data-id="${item.id}">−</button>
      <input type="number" class="qty-input" value="${item.qty}" min="1"
        data-id="${item.id}" />
      <button class="btn btn-qty" data-action="inc" data-id="${item.id}">+</button>
      <button class="btn btn-remove" data-action="remove" data-id="${item.id}">Hapus</button>
    </div>
    <p class="cart-item-subtotal">${formatRupiah(product.price * item.qty)}</p>
  `;

  return row;
}

/**
 * Render seluruh cart.
 */
function renderCart() {
  listEl.innerHTML = "";

  if (cart.length === 0) {
    emptyEl.hidden = false;
    summaryEl.hidden = true;
    return;
  }

  emptyEl.hidden = true;
  summaryEl.hidden = false;

  cart.forEach((item) => {
    const row = createCartItem(item);
    if (row) listEl.appendChild(row);
  });

  renderSummary();
}

/**
 * Render summary (total item & subtotal).
 */
function renderSummary() {
  let totalItems = 0;
  let subtotal = 0;

  cart.forEach((item) => {
    const product = findProduct(item.id);
    if (!product) return;
    totalItems += item.qty;
    subtotal += product.price * item.qty;
  });

  summaryItemsEl.textContent = totalItems;
  summarySubtotalEl.textContent = formatRupiah(subtotal);
}

/**
 * Ubah qty item.
 * ------------------------------------------------------------
 * INTENTIONAL DEFECT #3
 * Tidak ada validasi terhadap stok produk. User bisa menaikkan
 * qty melebihi stok yang tersedia (misal stok 5, qty jadi 99).
 * Expected: qty dibatasi max = product.stock.
 * ------------------------------------------------------------
 */
function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  const newQty = item.qty + delta;

  if (newQty < 1) return;

  // DEFECT: seharusnya cek juga `newQty <= product.stock`
  item.qty = newQty;

  saveCart();
  renderCart();
}

/**
 * Set qty langsung dari input.
 * ------------------------------------------------------------
 * INTENTIONAL DEFECT #3 (lanjutan)
 * Input manual juga tidak divalidasi terhadap stok.
 * ------------------------------------------------------------
 */
function setQty(id, value) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  const qty = parseInt(value, 10);
  if (isNaN(qty) || qty < 1) {
    renderCart();
    return;
  }

  // DEFECT: tidak ada batas atas
  item.qty = qty;

  saveCart();
  renderCart();
}

/**
 * Hapus item dari cart.
 */
function removeItem(id) {
  cart = cart.filter((i) => i.id !== id);
  saveCart();
  renderCart();

  messageEl.textContent = "Item dihapus dari cart.";
  messageEl.className = "message success";
}

/**
 * Handler tombol Checkout.
 * Arahkan ke halaman checkout kalau cart tidak kosong.
 */
function handleCheckout() {
  if (cart.length === 0) {
    messageEl.textContent = "Cart kosong, tidak bisa checkout.";
    messageEl.className = "message error";
    return;
  }
  window.location.href = "checkout.html";
}

/**
 * Event delegation untuk semua tombol di cart.
 */
listEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;

  const { action, id } = btn.dataset;

  if (action === "inc") changeQty(id, +1);
  if (action === "dec") changeQty(id, -1);
  if (action === "remove") removeItem(id);
});

listEl.addEventListener("change", (e) => {
  if (!e.target.classList.contains("qty-input")) return;
  setQty(e.target.dataset.id, e.target.value);
});

btnCheckout.addEventListener("click", handleCheckout);

/**
 * Init halaman cart.
 */
async function initCart() {
  try {
    const res = await fetch(PRODUCTS_URL);
    if (!res.ok) throw new Error("Gagal memuat data produk");
    allProducts = await res.json();

    loadCart();
    renderCart();
  } catch (err) {
    messageEl.textContent = "Terjadi kesalahan saat memuat cart.";
    messageEl.className = "message error";
  }
}

initCart();