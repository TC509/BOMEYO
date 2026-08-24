/* Site-wide content data: nav categories, placeholder products, contact/social info. */

const CONTACT = {
  email: "bomeyo.studio@gmail.com",
  phone: "+91 7085800772",
};

const SOCIAL = {
  instagram: "https://www.instagram.com/bomeyo.studio/",
  whatsapp: "https://wa.me/917085800772",
};

/* Metadata for every leaf category page (used by the generic category renderer). */
const CATEGORY_META = {
  "women-ready-shirts": { title: "Shirts", parent: "Women / Ready to Wear" },
  "women-ready-tops": { title: "Tops", parent: "Women / Ready to Wear" },
  "women-ready-skirts": { title: "Skirts", parent: "Women / Ready to Wear" },
  "women-ready-twinsets": { title: "Twin Sets", parent: "Women / Ready to Wear" },

  "women-wedding-wrap": { title: "Wrap", parent: "Women / Wedding Collection" },
  "women-wedding-top": { title: "Top", parent: "Women / Wedding Collection" },
  "women-wedding-set": { title: "Set", parent: "Women / Wedding Collection" },

  "men-ready-shirts": { title: "Shirts", parent: "Men / Ready to Wear" },
  "men-ready-twinsets": { title: "Twin Sets", parent: "Men / Ready to Wear" },

  "men-wedding-tango-jacket": { title: "Tango Jacket", parent: "Men / Wedding Collection" },
  "men-wedding-suits": { title: "Suits", parent: "Men / Wedding Collection" },

  "family-coords": { title: "The Family Co-ords", parent: "Wedding Collection" },
};

const SIZES = ["S", "M", "L", "XL"];

function shirtImages(slug, count) {
  const images = [];
  for (let i = 1; i <= count; i++) {
    images.push(`assets/img/products/women-ready-shirts/${slug}-${i}.jpg`);
  }
  return images;
}

/* Placeholder catalog. Swap in real products/images whenever they're ready. */
const PRODUCTS = [
  // Women / Ready to Wear — Shirts (real product photos)
  { name: "B&W Mix Stripe", slug: "bw-mix-stripe", price: 5000, category: "women-ready-shirts", images: shirtImages("bw-mix-stripe", 2) },
  { name: "Beige Nyishi", slug: "beige-nyishi", price: 5000, category: "women-ready-shirts", images: shirtImages("beige-nyishi", 2) },
  { name: "Beige Pomo", slug: "beige-pomo", price: 5000, category: "women-ready-shirts", images: shirtImages("beige-pomo", 2) },
  { name: "Black Crochet Galo", slug: "black-crochet-galo", price: 5000, category: "women-ready-shirts", images: shirtImages("black-crochet-galo", 3) },
  { name: "Black Mix Stripe", slug: "black-mix-stripe", price: 5000, category: "women-ready-shirts", images: shirtImages("black-mix-stripe", 2) },
  { name: "Bokar Multi", slug: "bokar-multi", price: 5000, category: "women-ready-shirts", images: shirtImages("bokar-multi", 1) },
  { name: "Brown Crochet Galo", slug: "brown-crochet-galo", price: 5000, category: "women-ready-shirts", images: shirtImages("brown-crochet-galo", 3) },
  { name: "Brown Line Mix", slug: "brown-line-mix", price: 5000, category: "women-ready-shirts", images: shirtImages("brown-line-mix", 2) },
  { name: "Floral Bokar", slug: "floral-bokar", price: 5000, category: "women-ready-shirts", images: shirtImages("floral-bokar", 2) },
  { name: "Monpa Bokar", slug: "monpa-bokar", price: 5000, category: "women-ready-shirts", images: shirtImages("monpa-bokar", 2) },
  { name: "Mud Mix", slug: "mud-mix", price: 5000, category: "women-ready-shirts", images: shirtImages("mud-mix", 2) },
  { name: "Neon Floral", slug: "neon-floral", price: 5000, category: "women-ready-shirts", images: shirtImages("neon-floral", 2) },
  { name: "Peach Nyishi", slug: "peach-nyishi", price: 5000, category: "women-ready-shirts", images: shirtImages("peach-nyishi", 2) },
  { name: "Printed Bokar", slug: "printed-bokar", price: 5000, category: "women-ready-shirts", images: shirtImages("printed-bokar", 2) },
  { name: "TR Printed Bokar", slug: "tr-printed-bokar", price: 5000, category: "women-ready-shirts", images: shirtImages("tr-printed-bokar", 2) },

  { name: "Ribbed Knit Top", price: 2200, category: "women-ready-tops" },
  { name: "Sleeveless Wrap Top", price: 2500, category: "women-ready-tops" },
  { name: "Cropped Cami Top", price: 1800, category: "women-ready-tops" },
  { name: "Draped Jersey Top", price: 2100, category: "women-ready-tops" },

  { name: "Pleated Midi Skirt", price: 3100, category: "women-ready-skirts" },
  { name: "A-Line Denim Skirt", price: 2800, category: "women-ready-skirts" },
  { name: "Wrap Maxi Skirt", price: 3400, category: "women-ready-skirts" },
  { name: "Knit Pencil Skirt", price: 2600, category: "women-ready-skirts" },

  { name: "Knit Twin Set", price: 4200, category: "women-ready-twinsets" },
  { name: "Linen Twin Set", price: 4500, category: "women-ready-twinsets" },
  { name: "Ribbed Cardigan Set", price: 3900, category: "women-ready-twinsets" },
  { name: "Sleeveless Twin Set", price: 3700, category: "women-ready-twinsets" },

  // Women / Wedding Collection
  { name: "Silk Wrap Dress", price: 8500, category: "women-wedding-wrap" },
  { name: "Embroidered Wrap Gown", price: 12000, category: "women-wedding-wrap" },
  { name: "Chiffon Wrap Dress", price: 7600, category: "women-wedding-wrap" },
  { name: "Satin Wrap Gown", price: 9800, category: "women-wedding-wrap" },

  { name: "Embellished Bridal Top", price: 6500, category: "women-wedding-top" },
  { name: "Silk Sequin Top", price: 7200, category: "women-wedding-top" },
  { name: "Hand-Embroidered Top", price: 8800, category: "women-wedding-top" },
  { name: "Beaded Corset Top", price: 9200, category: "women-wedding-top" },

  { name: "Bridal Lehenga Set", price: 18500, category: "women-wedding-set" },
  { name: "Sharara Set", price: 15200, category: "women-wedding-set" },
  { name: "Anarkali Set", price: 16800, category: "women-wedding-set" },
  { name: "Cape Gown Set", price: 21000, category: "women-wedding-set" },

  // Men / Ready to Wear
  { name: "Classic Oxford Shirt", price: 2800, category: "men-ready-shirts" },
  { name: "Linen Casual Shirt", price: 3100, category: "men-ready-shirts" },
  { name: "Printed Cotton Shirt", price: 2600, category: "men-ready-shirts" },
  { name: "Slim Fit Shirt", price: 2900, category: "men-ready-shirts" },

  { name: "Knit Twin Set", price: 3800, category: "men-ready-twinsets" },
  { name: "Casual Twin Set", price: 3600, category: "men-ready-twinsets" },
  { name: "Textured Twin Set", price: 4000, category: "men-ready-twinsets" },
  { name: "Layered Twin Set", price: 3700, category: "men-ready-twinsets" },

  // Men / Wedding Collection
  { name: "Velvet Tango Jacket", price: 9200, category: "men-wedding-tango-jacket" },
  { name: "Embroidered Bandhgala Jacket", price: 11500, category: "men-wedding-tango-jacket" },
  { name: "Silk Nehru Jacket", price: 8600, category: "men-wedding-tango-jacket" },
  { name: "Brocade Tango Jacket", price: 10400, category: "men-wedding-tango-jacket" },

  { name: "Classic Three-Piece Suit", price: 14500, category: "men-wedding-suits" },
  { name: "Slim Fit Wedding Suit", price: 13200, category: "men-wedding-suits" },
  { name: "Textured Sherwani Suit", price: 16800, category: "men-wedding-suits" },
  { name: "Tuxedo Suit", price: 15500, category: "men-wedding-suits" },

  // Shared: The Family Co-ords
  { name: "Classic Family Co-ord", price: 5200, category: "family-coords" },
  { name: "Festive Family Co-ord", price: 6100, category: "family-coords" },
  { name: "Pastel Family Co-ord", price: 4800, category: "family-coords" },
  { name: "Monochrome Family Co-ord", price: 5600, category: "family-coords" },
];

const PRODUCT_BY_SLUG = Object.fromEntries(
  PRODUCTS.filter((p) => p.slug).map((p) => [p.slug, p])
);

function formatPrice(price) {
  return "₹" + price.toLocaleString("en-IN");
}

/* Deterministic placeholder image per product (no local image assets needed). */
function productImageUrl(name) {
  const bg = "ede6da";
  const fg = "2c190d";
  return `https://placehold.co/400x500/${bg}/${fg}?text=${encodeURIComponent(name)}`;
}
