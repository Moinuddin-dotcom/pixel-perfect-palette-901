import { PRODUCTS, type Product } from "./products";

const KEY = "gh_cart_v1";

export interface CartLine {
  slug: string;
  qty: number;
}

function read(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

function write(lines: CartLine[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event("gh:cart"));
}

export function getCart(): CartLine[] {
  return read();
}

export function addToCart(slug: string, qty = 1) {
  const lines = read();
  const existing = lines.find((l) => l.slug === slug);
  if (existing) existing.qty += qty;
  else lines.push({ slug, qty });
  write(lines);
}

export function setQty(slug: string, qty: number) {
  const lines = read().map((l) => (l.slug === slug ? { ...l, qty } : l)).filter((l) => l.qty > 0);
  write(lines);
}

export function removeFromCart(slug: string) {
  write(read().filter((l) => l.slug !== slug));
}

export function clearCart() {
  write([]);
}

export interface CartItemDetail {
  product: Product;
  qty: number;
  subtotal: number;
}

export function getCartDetails(): { items: CartItemDetail[]; total: number } {
  const items: CartItemDetail[] = [];
  for (const line of read()) {
    const product = PRODUCTS.find((p) => p.slug === line.slug);
    if (!product) continue;
    items.push({ product, qty: line.qty, subtotal: product.price * line.qty });
  }
  return { items, total: items.reduce((s, i) => s + i.subtotal, 0) };
}
