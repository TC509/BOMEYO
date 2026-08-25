/* Product detail page: photo gallery (manual nav, no autoplay), size + quantity
   selection, and the "Order via WhatsApp" pre-filled message link. */

function productGalleryMarkup(product) {
  const slides = product.images
    .map((src, i) => `<div class="slider-slide"><img src="${src}" alt="${product.name} photo ${i + 1}" loading="lazy" /></div>`)
    .join("");

  const controls =
    product.images.length > 1
      ? `
        <button class="slider-arrow slider-prev" data-gallery-prev aria-label="Previous photo">&#8249;</button>
        <button class="slider-arrow slider-next" data-gallery-next aria-label="Next photo">&#8250;</button>
        <div class="slider-dots">
          ${product.images
            .map((_, i) => `<button class="slider-dot${i === 0 ? " active" : ""}" data-slide-index="${i}" aria-label="Go to photo ${i + 1}"></button>`)
            .join("")}
        </div>
      `
      : "";

  return `
    <div class="hero-slider product-gallery" data-product-gallery>
      <div class="slider-track">${slides}</div>
      ${controls}
    </div>
  `;
}

function productDetailMarkup(product) {
  return `
    <div class="product-detail">
      ${productGalleryMarkup(product)}
      <div class="product-info">
        <h1>${product.name}</h1>
        ${product.price ? `<p class="product-detail-price">${formatPrice(product.price)}</p>` : ""}

        <div class="product-field">
          <span class="product-field-label">Size</span>
          <div class="size-options" data-size-options>
            ${SIZES.map((size) => `<button class="size-option" data-size="${size}">${size}</button>`).join("")}
          </div>
        </div>

        <div class="product-field">
          <span class="product-field-label">Quantity</span>
          <div class="quantity-stepper">
            <button class="quantity-btn" data-qty-decrease aria-label="Decrease quantity">&#8722;</button>
            <span class="quantity-value" data-qty-value>1</span>
            <button class="quantity-btn" data-qty-increase aria-label="Increase quantity">&#43;</button>
          </div>
        </div>

        <p class="size-warning" data-size-warning hidden>Please select a size first.</p>

        <button class="add-to-cart-btn" data-add-to-cart>Add to Cart</button>
        <button class="whatsapp-order-btn" data-order-button>
          <svg class="whatsapp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
            <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
          </svg>
          <span>Order via Whatsapp</span>
        </button>
      </div>
    </div>
  `;
}

function initProductDetail(product) {
  const root = document.querySelector("[data-product-gallery]");
  if (root) {
    const track = root.querySelector(".slider-track");
    const dots = Array.from(root.querySelectorAll(".slider-dot"));
    const total = product.images.length;
    let index = 0;

    function goTo(i) {
      index = (i + total) % total;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, di) => dot.classList.toggle("active", di === index));
    }

    const prevBtn = root.querySelector("[data-gallery-prev]");
    const nextBtn = root.querySelector("[data-gallery-next]");
    if (prevBtn) prevBtn.addEventListener("click", () => goTo(index - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goTo(index + 1));
    dots.forEach((dot) => {
      dot.addEventListener("click", () => goTo(Number(dot.getAttribute("data-slide-index"))));
    });
  }

  let selectedSize = null;
  let quantity = 1;
  const MAX_QUANTITY = 10;

  const sizeButtons = Array.from(document.querySelectorAll("[data-size-options] .size-option"));
  const sizeWarning = document.querySelector("[data-size-warning]");
  const qtyValueEl = document.querySelector("[data-qty-value]");

  sizeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedSize = btn.getAttribute("data-size");
      sizeButtons.forEach((b) => b.classList.toggle("active", b === btn));
      if (sizeWarning) sizeWarning.hidden = true;
    });
  });

  const decreaseBtn = document.querySelector("[data-qty-decrease]");
  const increaseBtn = document.querySelector("[data-qty-increase]");

  if (decreaseBtn) {
    decreaseBtn.addEventListener("click", () => {
      quantity = Math.max(1, quantity - 1);
      qtyValueEl.textContent = quantity;
    });
  }

  if (increaseBtn) {
    increaseBtn.addEventListener("click", () => {
      quantity = Math.min(MAX_QUANTITY, quantity + 1);
      qtyValueEl.textContent = quantity;
    });
  }

  const orderButton = document.querySelector("[data-order-button]");
  if (orderButton) {
    orderButton.addEventListener("click", () => {
      if (!selectedSize) {
        if (sizeWarning) sizeWarning.hidden = false;
        return;
      }
      const message = `Hello BOMEYO, I want to buy ${quantity} ${product.name} in size ${selectedSize}`;
      window.open(`https://wa.me/917085800772?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    });
  }

  const addToCartButton = document.querySelector("[data-add-to-cart]");
  if (addToCartButton) {
    const defaultLabel = addToCartButton.textContent;
    let feedbackTimer = null;

    addToCartButton.addEventListener("click", () => {
      if (!selectedSize) {
        if (sizeWarning) sizeWarning.hidden = false;
        return;
      }
      addToCart(product, selectedSize, quantity);

      clearTimeout(feedbackTimer);
      addToCartButton.textContent = "Added to Cart";
      addToCartButton.disabled = true;
      feedbackTimer = setTimeout(() => {
        addToCartButton.textContent = defaultLabel;
        addToCartButton.disabled = false;
      }, 1500);
    });
  }
}
