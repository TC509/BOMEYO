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
    .map(
      (p) => `
        <div class="product-card">
          <div class="product-image">
            <img src="${productImageUrl(p.name)}" alt="${p.name}" loading="lazy" />
          </div>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-price">${formatPrice(p.price)}</p>
        </div>
      `
    )
    .join("");

  return `
    <div class="container">
      <div class="breadcrumb"><a href="#/" data-route="/">Home</a> / ${meta.parent}</div>
      <div class="page-header">
        <h1>${meta.title}</h1>
      </div>
      <div class="product-grid">${cards || '<p class="empty-state">No products in this category yet.</p>'}</div>
    </div>
  `;
}

function renderHome() {
  return `
    <section class="hero">
      <div class="hero-text">
        <h1>Contemporary craft, made to be worn.</h1>
        <p>BOMEYO designs considered ready-to-wear and wedding pieces for women and men, built on hand-finished detail.</p>
      </div>
      ${heroSliderMarkup()}
    </section>
  `;
}

function renderAbout() {
  return `
    <div class="container">
      <div class="page-header">
        <h1>About Us</h1>
        <p>Who we are and what we stand for.</p>
      </div>

      <section class="about-content">
        <div>
          <h2>Our mission</h2>
          <p>
            BOMEYO exists to make thoughtfully made clothing feel effortless —
            for everyday wear and for the biggest days. Every piece is designed
            to be worn often, not just once.
          </p>
          <p>
            We work closely with our makers, keep our collections focused, and
            put craft ahead of trend.
          </p>
        </div>
        <img src="https://placehold.co/600x450/ede6da/2c190d?text=BOMEYO" alt="About BOMEYO" />
      </section>

      <div class="values-grid">
        <div class="value-card">
          <h3>Considered design</h3>
          <p>Fewer pieces, made with more intention. Nothing in the collection is filler.</p>
        </div>
        <div class="value-card">
          <h3>Hand-finished detail</h3>
          <p>From everyday knitwear to wedding sets, the finishing is done by hand.</p>
        </div>
        <div class="value-card">
          <h3>For women and men</h3>
          <p>Ready-to-wear and wedding collections designed side by side, not as an afterthought.</p>
        </div>
      </div>
    </div>
  `;
}

function renderStory() {
  return `
    <div class="container">
      <div class="page-header">
        <h1>The Story</h1>
        <p>How BOMEYO came to be.</p>
      </div>

      <section class="story-content">
        <div>
          <h2>Where it started</h2>
          <p>
            BOMEYO began as a small studio experiment: could everyday clothing
            carry the same care usually reserved for wedding wear? That question
            shaped everything that followed.
          </p>
          <p>
            What started as a handful of hand-finished pieces made for friends
            grew into two full collections — Ready to Wear and Wedding Collection —
            each designed for women and men.
          </p>
          <p>
            Today, BOMEYO is still a studio-first label: small runs, close
            attention to construction, and a refusal to chase every trend.
          </p>
        </div>
        <img src="https://placehold.co/600x450/e2d9c8/2c190d?text=Our+Story" alt="The BOMEYO story" />
      </section>
    </div>
  `;
}

const SHOWS = [
  { title: "BOMEYO Wedding Edit — Preview Showcase", meta: "Coming soon · Mumbai" },
  { title: "Ready to Wear — Season Launch", meta: "Coming soon · Delhi" },
  { title: "The Family Co-ords Showcase", meta: "Coming soon · Bengaluru" },
];

function renderShows() {
  const items = SHOWS.map(
    (show) => `
      <div class="show-item">
        <h3>${show.title}</h3>
        <span class="show-meta">${show.meta}</span>
      </div>
    `
  ).join("");

  return `
    <div class="container">
      <div class="page-header">
        <h1>Shows</h1>
        <p>Where to see BOMEYO next.</p>
      </div>
      <div class="shows-list">${items}</div>
    </div>
  `;
}

const STATIC_ROUTES = {
  "/": { title: "BOMEYO — Home", render: renderHome },
  "/about": { title: "About Us — BOMEYO", render: renderAbout },
  "/story": { title: "The Story — BOMEYO", render: renderStory },
  "/shows": { title: "Shows — BOMEYO", render: renderShows },
};

function normalizePath() {
  const raw = location.hash.replace(/^#/, "");
  return raw === "" ? "/" : raw;
}

function resolveRoute(path) {
  if (STATIC_ROUTES[path]) return STATIC_ROUTES[path];
  const slug = PATH_TO_CATEGORY[path];
  if (slug) {
    const meta = CATEGORY_META[slug];
    return { title: `${meta.title} — BOMEYO`, render: () => renderCategoryPage(slug) };
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

  if (path === "/") initHeroSlider();
}

function initRouter() {
  window.addEventListener("hashchange", renderRoute);
  renderRoute();
}
