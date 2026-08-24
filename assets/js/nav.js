/* Mobile menu toggle + click-driven accordion/flyout dropdowns (works alongside the
   CSS :hover behavior used on desktop pointer devices). */

function closeAllDropdowns() {
  document.querySelectorAll(".has-dropdown.open, .has-flyout.open").forEach((el) => {
    el.classList.remove("open");
  });
}

function closeMobileMenu() {
  const header = document.querySelector(".site-header");
  if (header) header.classList.remove("nav-open");
  closeAllDropdowns();
}

function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const header = document.querySelector(".site-header");
  if (!toggle || !header) return;

  toggle.addEventListener("click", () => {
    header.classList.toggle("nav-open");
    if (!header.classList.contains("nav-open")) {
      closeAllDropdowns();
    }
  });
}

function initDropdowns() {
  document.querySelectorAll(".has-dropdown > .nav-toplevel").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const parent = trigger.parentElement;
      const wasOpen = parent.classList.contains("open");
      parent.parentElement.querySelectorAll(":scope > .has-dropdown.open").forEach((sibling) => {
        if (sibling !== parent) sibling.classList.remove("open");
      });
      parent.classList.toggle("open", !wasOpen);
    });
  });

  document.querySelectorAll(".has-flyout > .dropdown-item").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const parent = trigger.parentElement;
      const wasOpen = parent.classList.contains("open");
      parent.parentElement.querySelectorAll(":scope > .has-flyout.open").forEach((sibling) => {
        if (sibling !== parent) sibling.classList.remove("open");
      });
      parent.classList.toggle("open", !wasOpen);
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-menu")) {
      closeAllDropdowns();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileMenu();
  });

  document.querySelectorAll(".nav-side a[data-route], .nav-side a.nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });
}

function initActiveNavLink(path) {
  document.querySelectorAll(".nav-link[data-route]").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("data-route") === path);
  });
}

function initNavScrollShrink() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener(
    "scroll",
    () => {
      header.classList.toggle("scrolled", window.scrollY > 40);
    },
    { passive: true }
  );
}

function searchResultMarkup(product) {
  const image = product.images ? product.images[0] : productImageUrl(product.name);
  const price = product.price ? `<p class="search-result-price">${formatPrice(product.price)}</p>` : "";
  return `
    <a class="search-result" href="#/product/${product.slug}" data-route="/product/${product.slug}">
      <div class="search-result-image"><img src="${image}" alt="${product.name}" loading="lazy" /></div>
      <div>
        <p class="search-result-name">${product.name}</p>
        ${price}
      </div>
    </a>
  `;
}

function initSearch() {
  const overlay = document.querySelector("[data-search-overlay]");
  const input = document.querySelector("[data-search-input]");
  const results = document.querySelector("[data-search-results]");
  const openButtons = document.querySelectorAll("[data-search-open]");
  const closeButton = document.querySelector("[data-search-close]");
  if (!overlay || !input || !results) return;

  const searchable = PRODUCTS.filter((p) => p.slug);

  function open() {
    overlay.classList.add("open");
    input.value = "";
    results.innerHTML = "";
    setTimeout(() => input.focus(), 150);
  }

  function close() {
    overlay.classList.remove("open");
  }

  openButtons.forEach((btn) => btn.addEventListener("click", open));
  if (closeButton) closeButton.addEventListener("click", close);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      results.innerHTML = "";
      return;
    }
    const matches = searchable.filter((p) => p.name.toLowerCase().includes(query));
    results.innerHTML = matches.length
      ? matches.map(searchResultMarkup).join("")
      : `<p class="search-empty">No products found for "${input.value}".</p>`;
  });

  results.addEventListener("click", (e) => {
    if (e.target.closest(".search-result")) close();
  });
}

function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal:not(.is-visible)");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
}
