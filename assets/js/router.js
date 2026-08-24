/* Hash-based SPA router. Every "page" is a render function returning an HTML string
   that gets swapped into #app — no full page reload, works with the browser's
   back/forward buttons, and needs no server-side rewrite rules on Netlify. */

const PATH_TO_CATEGORY = {
  "/women/ready-to-wear/shirts": "women-ready-shirts",
  "/women/ready-to-wear/tops": "women-ready-tops",
  "/women/ready-to-wear/skirts": "women-ready-skirts",
  "/women/ready-to-wear/twin-sets": "women-ready-twinsets",

  "/women/wedding-collection/wrap": "women-wedding-wrap",
  "/women/wedding-collection/top": "women-wedding-top",
  "/women/wedding-collection/set": "women-wedding-set",

  "/men/ready-to-wear/shirts": "men-ready-shirts",
  "/men/ready-to-wear/twin-sets": "men-ready-twinsets",

  "/men/wedding-collection/tango-jacket": "men-wedding-tango-jacket",
  "/men/wedding-collection/suits": "men-wedding-suits",

  "/family-coords": "family-coords",
};

function renderCategoryPage(slug) {
  const meta = CATEGORY_META[slug];
  const items = PRODUCTS.filter((p) => p.category === slug);

  const cards = items
    .map((p) => {
      const image = p.images ? p.images[0] : productImageUrl(p.name);
      const price = p.price ? `<p class="product-price">${formatPrice(p.price)}</p>` : "";
      const inner = `
        <div class="product-image">
          <img src="${image}" alt="${p.name}" loading="lazy" />
        </div>
        <h3 class="product-name">${p.name}</h3>
        ${price}
      `;
      return p.slug
        ? `<a class="product-card reveal" href="#/product/${p.slug}" data-route="/product/${p.slug}">${inner}</a>`
        : `<div class="product-card reveal">${inner}</div>`;
    })
    .join("");

  return `
    <div class="container">
      <div class="page-header reveal">
        <h1>${meta.title}</h1>
      </div>
      <div class="product-grid">${cards || '<p class="empty-state">No products in this category yet.</p>'}</div>
    </div>
  `;
}

function renderProductDetail(slug) {
  const product = PRODUCT_BY_SLUG[slug];
  if (!product) return null;

  return `
    <div class="container">
      ${productDetailMarkup(product)}
    </div>
  `;
}

function renderHome() {
  return `
    <section class="hero">
      <div class="hero-text">
        <div class="hero-text-inner reveal">
          <h1>About Us</h1>
          <p>The essence of BOM ÈYO stems from a passion for preserving and reimagining the rich textile traditions of Northeast India, especially those of Arunachal Pradesh.</p>
          <p>Here, every piece tells a story. Your story.</p>
          <p>We believe in continuous learning and discovering new possibilities in the art of weaving ancestral motifs into contemporary design, blending tradition with your personal narrative while inviting the world to discover the culture of Arunachal Pradesh.</p>
          <p>BOM ÈYO aims to empower the wearer with comfort, confidence, and versatility encouraging them to embrace who they are and who they aspire to become.</p>
          <p>Through every garment, BOM ÈYO carries forward the stories of the past while inspiring new ones for generations to come.</p>
          <div class="hero-tagline">
            <p>Every piece is a statement.</p>
            <p>Every piece is a story.</p>
            <p>Every piece is you.</p>
          </div>
        </div>
      </div>
      ${heroVideoMarkup()}
    </section>
  `;
}

function renderStory() {
  return `
    <div class="container">
      <div class="story-page">
        <div class="story-photo reveal">
          <img src="assets/img/storydp.jpg" alt="Bompie Riram, Founder &amp; Creative Director of BOMÈYO" />
        </div>
        <h1 class="story-title reveal">Founder &amp; Creative Director of BOMÈYO</h1>
        <div class="story-text reveal">
          <p>BOM ÈYO was founded by Bompie Riram, who hails from Basar, Arunachal Pradesh, India. She graduated from NIFT Mumbai in 2013 with a degree in Textile Design. Today, the brand is based in Itanagar.</p>
          <p>The name BOM ÈYO is a sacred coalescence of "BOM," the designer's name, and "ÈYO," her late grandmother's name—an enduring tribute that weaves memory, heritage, and lineage into the fabric of the brand.</p>
        </div>
      </div>
    </div>
  `;
}

function mediaCard(item) {
  return `
    <div class="media-card reveal">
      <div class="media-card-image">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
      </div>
      ${item.tag ? `<span class="media-card-tag">${item.tag}</span>` : ""}
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </div>
  `;
}

function mediaImageUrl(name, bg) {
  return `https://placehold.co/600x800/${bg}/2c190d?text=${encodeURIComponent(name)}`;
}

const COLLECTIONS = [
  {
    tag: "Seasonal",
    title: "Spring/Summer 2025",
    text: "Lightweight fabrics and warm-weather silhouettes for the new season.",
    image: mediaImageUrl("Spring/Summer 2025", "ede6da"),
  },
  {
    tag: "Seasonal",
    title: "Wedding Season 2025",
    text: "This year's wedding edit, built around considered, hand-finished pieces.",
    image: mediaImageUrl("Wedding Season 2025", "e2d9c8"),
  },
  {
    tag: "Previous",
    title: "Festive Edit 2024",
    text: "Last year's festive collection, while stocks last.",
    image: mediaImageUrl("Festive Edit 2024", "ede6da"),
  },
  {
    tag: "Previous",
    title: "Monsoon Edit 2024",
    text: "Relaxed, weather-ready pieces from last year's monsoon drop.",
    image: mediaImageUrl("Monsoon Edit 2024", "e2d9c8"),
  },
  {
    tag: "Limited Edition",
    title: "The Anniversary Capsule",
    text: "A small capsule marking the studio's anniversary — limited to a handful of pieces.",
    image: mediaImageUrl("The Anniversary Capsule", "ede6da"),
  },
  {
    tag: "Limited Edition",
    title: "The Ten-Piece Edit",
    text: "Ten pieces, each made in extremely limited numbers.",
    image: mediaImageUrl("The Ten-Piece Edit", "e2d9c8"),
  },
];

function renderCollections() {
  return `
    <div class="container">
      <div class="page-header reveal">
        <h1>Collections</h1>
        <p>Previous seasons, seasonal drops, and limited editions.</p>
      </div>
      <div class="media-grid">${COLLECTIONS.map(mediaCard).join("")}</div>
    </div>
  `;
}

const SHOWS = [
  {
    title: "BOMEYO Wedding Edit — Preview Showcase",
    text: "A first look at the wedding edit, shown to press and stockists ahead of the season.",
    image: mediaImageUrl("Wedding Edit Showcase", "ede6da"),
  },
  {
    title: "Ready to Wear — Season Launch",
    text: "The new ready-to-wear line, presented in a small studio showing.",
    image: mediaImageUrl("Season Launch", "e2d9c8"),
  },
  {
    title: "The Family Co-ords Showcase",
    text: "Matching sets for the whole family, shown as part of the wedding season preview.",
    image: mediaImageUrl("Family Co-ords Showcase", "ede6da"),
  },
];

const CLIENTS = [
  {
    title: "Studio Aria",
    text: "Boutique stockist based in Mumbai, carrying the full ready-to-wear line.",
    image: mediaImageUrl("Studio Aria", "e2d9c8"),
  },
  {
    title: "The Cotton Room",
    text: "Concept store in Bengaluru focused on considered, everyday clothing.",
    image: mediaImageUrl("The Cotton Room", "ede6da"),
  },
  {
    title: "Loom & Co.",
    text: "Delhi concept store stocking BOMEYO's wedding and ready-to-wear pieces.",
    image: mediaImageUrl("Loom & Co.", "e2d9c8"),
  },
];

const PROJECTS = [
  {
    title: "Heritage Weaves Collaboration",
    text: "A textile research project with local artisan cooperatives, focused on traditional weaving techniques.",
    image: mediaImageUrl("Heritage Weaves", "ede6da"),
  },
  {
    title: "Sustainable Dyeing Initiative",
    text: "An ongoing effort to source natural dyes and reduce the studio's environmental footprint.",
    image: mediaImageUrl("Sustainable Dyeing", "e2d9c8"),
  },
  {
    title: "Made-to-Measure Pilot",
    text: "A small pilot program offering made-to-measure fittings for wedding clients.",
    image: mediaImageUrl("Made-to-Measure Pilot", "ede6da"),
  },
];

const HIGHLIGHT_TABS = [
  { id: "shows", label: "Shows", items: SHOWS },
  { id: "clients", label: "Clients", items: CLIENTS },
  { id: "projects", label: "Projects", items: PROJECTS },
];

function renderHighlights() {
  const buttons = HIGHLIGHT_TABS.map(
    (tab, i) => `<button class="tab-button${i === 0 ? " active" : ""}" data-tab="${tab.id}">${tab.label}</button>`
  ).join("");

  const panels = HIGHLIGHT_TABS.map(
    (tab, i) => `
      <div class="tab-panel${i === 0 ? " active" : ""}" data-tab-panel="${tab.id}">
        <div class="media-grid">${tab.items.map(mediaCard).join("")}</div>
      </div>
    `
  ).join("");

  return `
    <div class="container">
      <div class="tabs" data-highlights-tabs>
        <div class="tab-buttons">${buttons}</div>
        ${panels}
      </div>
    </div>
  `;
}

function initHighlightsTabs() {
  const root = document.querySelector("[data-highlights-tabs]");
  if (!root) return;

  const buttons = Array.from(root.querySelectorAll(".tab-button"));
  const panels = Array.from(root.querySelectorAll(".tab-panel"));

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");
      buttons.forEach((b) => b.classList.toggle("active", b === btn));
      panels.forEach((p) => p.classList.toggle("active", p.getAttribute("data-tab-panel") === target));
    });
  });
}

const STATIC_ROUTES = {
  "/": { title: "BOMEYO — Home", render: renderHome },
  "/story": { title: "The Story — BOMEYO", render: renderStory },
  "/collections": { title: "Collections — BOMEYO", render: renderCollections },
  "/highlights": { title: "Highlights — BOMEYO", render: renderHighlights },
};

function normalizePath() {
  const raw = location.hash.replace(/^#/, "");
  return raw === "" ? "/" : raw;
}

function resolveRoute(path) {
  if (STATIC_ROUTES[path]) return STATIC_ROUTES[path];

  const categorySlug = PATH_TO_CATEGORY[path];
  if (categorySlug) {
    const meta = CATEGORY_META[categorySlug];
    return { title: `${meta.title} — BOMEYO`, render: () => renderCategoryPage(categorySlug) };
  }

  if (path.startsWith("/product/")) {
    const productSlug = path.slice("/product/".length);
    const product = PRODUCT_BY_SLUG[productSlug];
    if (product) {
      return { title: `${product.name} — BOMEYO`, render: () => renderProductDetail(productSlug) };
    }
  }

  return null;
}

function renderRoute() {
  const path = normalizePath();
  const route = resolveRoute(path) || STATIC_ROUTES["/"];
  const app = document.getElementById("app");

  app.innerHTML = route.render();
  document.title = route.title;
  window.scrollTo(0, 0);
  initActiveNavLink(path);

  initHeroAmbient();
  initScrollReveal();
  if (path === "/highlights") initHighlightsTabs();
  if (path.startsWith("/product/")) {
    const product = PRODUCT_BY_SLUG[path.slice("/product/".length)];
    if (product) initProductDetail(product);
  }
}

function initRouter() {
  window.addEventListener("hashchange", renderRoute);
  renderRoute();
}
