// ============================================================
// Checkout — Mini E-Commerce
// QA NOTE: File ini mengandung INTENTIONAL DEFECT #4 dan #5.
// ============================================================

const PRODUCTS_URL = "/app/data/products.json";
const CART_STORAGE_KEY = "mini_ecom_cart";
const LAST_ORDER_KEY = "mini_ecom_last_order";

const form = document.getElementById("checkout-form");
const messageEl = document.getElementById("checkout-message");
const summaryListEl = document.getElementById("summary-list");
const summaryItemsEl = document.getElementById("summary-items");
const summarySubtotalEl = document.getElementById("summary-subtotal");

let allProducts = [];
let cart = [];

function formatRupiah(value) {
  return "Rp " + value.toLocaleString("id-ID");
}

function loadCart() {
  try {
    cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch {
    cart = [];
  }
}

function findProduct(id) {
  return allProducts.find((p) => p.id === id);
}

// INTENTIONAL DEFECT #4 — subtotal tidak reaktif
function renderSummary() {
  summaryListEl.innerHTML = "";

  let totalItems = 0;
  let subtotal = 0;

  cart.forEach((item) => {
    const product = findProduct(item.id);
    if (!product) return;

    totalItems += item.qty;
    subtotal += product.price * item.qty;

    const row = document.createElement("div");
    row.className = "summary-item";
    row.innerHTML = `
      <span>${product.name} × ${item.qty}</span>
      <span>${formatRupiah(product.price * item.qty)}</span>
    `;
    summaryListEl.appendChild(row);
  });

  summaryItemsEl.textContent = totalItems;
  summarySubtotalEl.textContent = formatRupiah(subtotal);
}

function validateForm(data) {
  if (data.fullname.trim() === "") return "Nama penerima wajib diisi.";
  if (data.phone.trim() === "") return "Nomor telepon wajib diisi.";
  if (!/^[0-9]{10,13}$/.test(data.phone.trim()))
    return "Nomor telepon harus 10–13 digit angka.";
  if (data.address.trim() === "") return "Alamat wajib diisi.";
  return null;
}

// INTENTIONAL DEFECT #5 — order ID collision
function generateOrderId() {
  const ts = Math.floor(Date.now() / 1000);
  return `ORD-${ts}`;
}

function buildOrder(formData) {
  const items = cart.map((item) => {
    const p = findProduct(item.id);
    return {
      id: item.id,
      name: p.name,
      price: p.price,
      qty: item.qty,
      subtotal: p.price * item.qty,
    };
  });

  const subtotal = items.reduce((sum, i) => sum + i.subtotal, 0);

  return {
    orderId: generateOrderId(),
    createdAt: new Date().toISOString(),
    customer: formData,
    items,
    subtotal,
    status: "confirmed",
  };
}

function handleSubmit(event) {
  event.preventDefault();

  const formData = {
    fullname: document.getElementById("fullname").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    payment: form.querySelector('input[name="payment"]:checked').value,
  };

  const error = validateForm(formData);
  if (error) {
    messageEl.textContent = error;
    messageEl.className = "message error";
    return;
  }

  if (cart.length === 0) {
    messageEl.textContent = "Cart kosong.";
    messageEl.className = "message error";
    return;
  }

  const order = buildOrder(formData);

  localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
  localStorage.removeItem(CART_STORAGE_KEY);

  // Absolute path
  window.location.href = "/app/confirmation.html";
}

async function initCheckout() {
  try {
    const res = await fetch(PRODUCTS_URL);
    if (!res.ok) throw new Error("Gagal memuat data produk");
    allProducts = await res.json();

    loadCart();

    if (cart.length === 0) {
      messageEl.textContent = "Cart kosong. Tidak ada yang bisa di-checkout.";
      messageEl.className = "message error";
      document.getElementById("btn-place-order").disabled = true;
      return;
    }

    renderSummary();
  } catch (err) {
    messageEl.textContent = "Terjadi kesalahan saat memuat checkout.";
    messageEl.className = "message error";
  }
}

form.addEventListener("submit", handleSubmit);
initCheckout();