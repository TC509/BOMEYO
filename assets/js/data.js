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

/* Placeholder catalog. Swap in real products/images whenever they're ready. */
const PRODUCTS = [
  // Women / Ready to Wear
  { name: "Ivory Poplin Shirt", price: 3200, category: "women-ready-shirts" },
  { name: "Relaxed Linen Shirt", price: 3600, category: "women-ready-shirts" },
  { name: "Striped Cotton Shirt", price: 2900, category: "women-ready-shirts" },
  { name: "Oversized Denim Shirt", price: 3400, category: "women-ready-shirts" },

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

function formatPrice(price) {
  return "₹" + price.toLocaleString("en-IN");
}

/* Deterministic placeholder image per product (no local image assets needed). */
function productImageUrl(name) {
  const bg = "ede6da";
  const fg = "2c190d";
  return `https://placehold.co/400x500/${bg}/${fg}?text=${encodeURIComponent(name)}`;
}
