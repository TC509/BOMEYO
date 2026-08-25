/* Cart: persisted to localStorage so it survives reloads and navigation.
   The overlay animates in/out scaled from the cart button's own on-screen
   position (read live via getBoundingClientRect, since that button sits in
   a different spot on mobile vs desktop — see .cart-button in style.css). */

const CART_STORAGE_KEY = "bomeyo_cart";

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function persistCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function cartTotalCount(cart) {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

const CART_MAX_QUANTITY = 10;

function addToCart(product, size, quantity) {
  const cart = loadCart();
  const image = product.images ? product.images[0] : productImageUrl(product.name);
  const existing = cart.find((item) => item.slug === product.slug && item.size === size);

  if (existing) {
    existing.quantity = Math.min(CART_MAX_QUANTITY, existing.quantity + quantity);
  } else {
    cart.push({
      slug: product.slug,
      name: product.name,
      size,
      quantity,
      price: product.price || 0,
      image,
    });
  }

  persistCart(cart);
  renderCartBadge();
  renderCartList();
  bumpCartButton();
}

function increaseCartItem(index) {
  const cart = loadCart();
  if (!cart[index]) return;
  cart[index].quantity = Math.min(CART_MAX_QUANTITY, cart[index].quantity + 1);
  persistCart(cart);
  renderCartBadge();
  renderCartList();
  bumpCartButton();
}

function decreaseCartItem(index) {
  const cart = loadCart();
  if (!cart[index]) return;
  cart[index].quantity -= 1;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  persistCart(cart);
  renderCartBadge();
  renderCartList();
}

function renderCartBadge() {
  const badge = document.querySelector("[data-cart-count]");
  if (!badge) return;
  const count = cartTotalCount(loadCart());
  badge.textContent = count;
  badge.hidden = count === 0;
}

function bumpCartButton() {
  const btn = document.querySelector("[data-cart-open]");
  if (!btn) return;
  btn.classList.remove("bump");
  void btn.offsetWidth;
  btn.classList.add("bump");
}

function cartItemMarkup(item, index) {
  const price = item.price ? `<p class="cart-item-price">${formatPrice(item.price * item.quantity)}</p>` : "";
  return `
    <div class="cart-item">
      <div class="cart-item-image"><img src="${item.image}" alt="${item.name}" loading="lazy" /></div>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-meta">Size ${item.size}</p>
        ${price}
        <div class="cart-item-qty">
          <button class="cart-qty-btn" type="button" data-cart-decrease="${index}" aria-label="Decrease quantity">&#8722;</button>
          <span class="cart-qty-value">${item.quantity}</span>
          <button class="cart-qty-btn" type="button" data-cart-increase="${index}" aria-label="Increase quantity">&#43;</button>
        </div>
      </div>
    </div>
  `;
}

function renderCartList() {
  const list = document.querySelector("[data-cart-list]");
  const checkout = document.querySelector("[data-cart-checkout]");
  if (!list || !checkout) return;

  const cart = loadCart();

  list.innerHTML = cart.length
    ? cart.map((item, index) => cartItemMarkup(item, index)).join("")
    : '<p class="cart-empty">Your cart is empty.</p>';

  checkout.hidden = cart.length === 0;

  list.querySelectorAll("[data-cart-decrease]").forEach((btn) => {
    btn.addEventListener("click", () => {
      decreaseCartItem(Number(btn.getAttribute("data-cart-decrease")));
    });
  });

  list.querySelectorAll("[data-cart-increase]").forEach((btn) => {
    btn.addEventListener("click", () => {
      increaseCartItem(Number(btn.getAttribute("data-cart-increase")));
    });
  });
}

function buildCartWhatsAppMessage(cart) {
  const lines = cart.map((item) => `• ${item.quantity} x ${item.name} (Size ${item.size})`);
  return `Hello BOMEYO, I want to order the following:\n${lines.join("\n")}`;
}

function openCart() {
  const overlay = document.querySelector("[data-cart-overlay]");
  const button = document.querySelector("[data-cart-open]");
  if (!overlay || !button) return;

  const rect = button.getBoundingClientRect();
  overlay.style.setProperty("--cart-origin-x", `${rect.left + rect.width / 2}px`);
  overlay.style.setProperty("--cart-origin-y", `${rect.top + rect.height / 2}px`);

  renderCartList();
  overlay.classList.add("open");
}

function closeCart() {
  const overlay = document.querySelector("[data-cart-overlay]");
  if (overlay) overlay.classList.remove("open");
}

function initCart() {
  const openButton = document.querySelector("[data-cart-open]");
  const closeButton = document.querySelector("[data-cart-close]");
  const overlay = document.querySelector("[data-cart-overlay]");
  const orderButton = document.querySelector("[data-cart-order]");

  renderCartBadge();

  if (openButton) openButton.addEventListener("click", openCart);
  if (closeButton) closeButton.addEventListener("click", closeCart);

  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeCart();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCart();
  });

  if (orderButton) {
    orderButton.addEventListener("click", () => {
      const cart = loadCart();
      if (!cart.length) return;
      const message = buildCartWhatsAppMessage(cart);
      window.open(`https://wa.me/917085800772?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    });
  }
}
