// ============================================================
// Order Confirmation — Mini E-Commerce
// ============================================================

const LAST_ORDER_KEY = "mini_ecom_last_order";

const orderIdEl = document.getElementById("order-id");
const orderNameEl = document.getElementById("order-name");
const orderPaymentEl = document.getElementById("order-payment");
const orderItemsEl = document.getElementById("order-items");
const orderTotalEl = document.getElementById("order-total");
const orderItemsListEl = document.getElementById("order-items-list");
const messageEl = document.getElementById("confirmation-message");

const PAYMENT_LABELS = {
  transfer: "Transfer Bank",
  cod: "COD (Bayar di Tempat)",
  ewallet: "E-Wallet",
};

/**
 * Format angka ke Rupiah.
 */
function formatRupiah(value) {
  return "Rp " + value.toLocaleString("id-ID");
}

/**
 * Baca order terakhir dari localStorage.
 */
function loadOrder() {
  try {
    return JSON.parse(localStorage.getItem(LAST_ORDER_KEY));
  } catch {
    return null;
  }
}

/**
 * Render detail order.
 */
function renderOrder(order) {
  orderIdEl.textContent = order.orderId;
  orderNameEl.textContent = order.customer.fullname;
  orderPaymentEl.textContent =
    PAYMENT_LABELS[order.customer.payment] || order.customer.payment;
  orderItemsEl.textContent = order.items.reduce((s, i) => s + i.qty, 0);
  orderTotalEl.textContent = formatRupiah(order.subtotal);

  orderItemsListEl.innerHTML = "";
  order.items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "order-item-row";
    row.innerHTML = `
      <span>${item.name} × ${item.qty}</span>
      <span>${formatRupiah(item.subtotal)}</span>
    `;
    orderItemsListEl.appendChild(row);
  });
}

/**
 * Init halaman confirmation.
 */
function init() {
  const order = loadOrder();

  if (!order) {
    messageEl.textContent =
      "Tidak ada order terbaru. Silakan kembali ke katalog untuk memulai.";
    messageEl.className = "message error";
    return;
  }

  renderOrder(order);
}

init();