// ============================================================
// Product catalog — Mini E-Commerce
// QA NOTE: Modul ini sudah bersih. Defect #2 (stok habis)
// sudah DIPERBAIKI di revisi Fase 1.
// ============================================================

const PRODUCTS_URL = "data/products.json";
const listEl = document.getElementById("product-list");
const messageEl = document.getElementById("catalog-message");

/**
 * Format angka ke Rupiah.
 */
function formatRupiah(value) {
  return "Rp " + value.toLocaleString("id-ID");
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
    <h3 class="product-name">${product.name}</h3>
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
    btn.addEventListener("click", () => handleAddToCart(product));
  }

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

  messageEl.textContent = `"${product.name}" ditambahkan ke cart.`;
  messageEl.className = "message success";
}

/**
 * Load & render seluruh produk.
 */
async function loadProducts() {
  try {
    const res = await fetch(PRODUCTS_URL);
    if (!res.ok) throw new Error("Gagal memuat data produk");
    const products = await res.json();

    listEl.innerHTML = "";
    products.forEach((p) => listEl.appendChild(createProductCard(p)));
  } catch (err) {
    messageEl.textContent = "Terjadi kesalahan saat memuat produk.";
    messageEl.className = "message error";
  }
}

loadProducts();