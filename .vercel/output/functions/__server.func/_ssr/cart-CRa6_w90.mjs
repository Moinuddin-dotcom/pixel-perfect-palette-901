import { P as PRODUCTS } from "./products-C5MT_6BH.mjs";
const KEY = "gh_cart_v1";
function read() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function write(lines) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event("gh:cart"));
}
function addToCart(slug, qty = 1) {
  const lines = read();
  const existing = lines.find((l) => l.slug === slug);
  if (existing) existing.qty += qty;
  else lines.push({ slug, qty });
  write(lines);
}
function setQty(slug, qty) {
  const lines = read().map((l) => l.slug === slug ? { ...l, qty } : l).filter((l) => l.qty > 0);
  write(lines);
}
function removeFromCart(slug) {
  write(read().filter((l) => l.slug !== slug));
}
function clearCart() {
  write([]);
}
function getCartDetails() {
  const items = [];
  for (const line of read()) {
    const product = PRODUCTS.find((p) => p.slug === line.slug);
    if (!product) continue;
    items.push({ product, qty: line.qty, subtotal: product.price * line.qty });
  }
  return { items, total: items.reduce((s, i) => s + i.subtotal, 0) };
}
export {
  addToCart as a,
  clearCart as c,
  getCartDetails as g,
  removeFromCart as r,
  setQty as s
};
