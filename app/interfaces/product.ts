// ── Chocolate content inside a box ──────────────────────────────────────────
export interface BoxContent {
  name: string;
  quantity: number;
  image: string;
  unit_price: number; // cost per unit in ₡ CRC
}

// Master list of all chocolates available as box contents, with their unit costs
export const AVAILABLE_CHOCOLATES: BoxContent[] = [
  { name: 'Ferrero Rocher', quantity: 1, image: '/chocolates/ferrero.png', unit_price: 410 },
  { name: 'Raffaello', quantity: 1, image: '/chocolates/raffaello.png', unit_price: 410 },
  { name: 'Copper Kettle', quantity: 1, image: '/chocolates/copper.png', unit_price: 250 },
  { name: "Nugget Hershey's", quantity: 1, image: '/chocolates/nugget.jpg', unit_price: 105 },
  { name: "Mini Hershey's", quantity: 1, image: '/chocolates/mini1.png', unit_price: 75 },
  { name: 'Kiss', quantity: 1, image: '/chocolates/kiss1.png', unit_price: 100 },
  { name: 'Guayabitas', quantity: 1, image: '/chocolates/guayabita.png', unit_price: 105 },
  { name: 'Tutto', quantity: 1, image: '/chocolates/Tutto.webp', unit_price: 225 },
  { name: 'Ghirardelli', quantity: 1, image: '/chocolates/ghirardelli.png', unit_price: 413 },
];

// ── Pricing calculator ────────────────────────────────────────────────────────
/**
 * Calculate the suggested retail price for a variant.
 * Formula: (chocolates + box + labor) × 1.40, rounded up to nearest ₡100.
 */
export function calcSuggestedPrice(
  contents: BoxContent[],
  costBox: number,
  costLabor: number
): number {
  const costChocolates = contents.reduce(
    (sum, c) => sum + c.quantity * (c.unit_price ?? 0),
    0
  );
  const totalCost = costChocolates + costBox + costLabor;
  const withProfit = totalCost * 1.40;
  return Math.ceil(withProfit / 100) * 100;
}

// ── Product Variant (Diamante / Oro) ─────────────────────────────────────────
export interface ProductVariant {
  contents: BoxContent[];
  cost_box: number;    // cost of the physical box itself
  cost_labor: number;  // labor / mano de obra
  price: number;       // final selling price (editable, starts from suggested)
}

const emptyVariant = (): ProductVariant => ({
  contents: [],
  cost_box: 0,
  cost_labor: 0,
  price: 0,
});

export { emptyVariant };

// ── DB Product ────────────────────────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  /** Diamond selling price — also used as the main display price in the catalog */
  price: number;
  /** Gold version selling price */
  price_gold?: number;
  stock: number;
  category: string;
  image_url: string | null;
  is_active: boolean;
  /** Full Diamond variant data */
  diamond_variant?: ProductVariant | null;
  /** Full Gold variant data */
  gold_variant?: ProductVariant | null;
  /** Legacy flat contents (kept for backward compatibility) */
  contents?: BoxContent[] | null;
  created_at?: string;
  updated_at?: string;
}

export type NewProduct = Omit<Product, 'id' | 'created_at' | 'updated_at'>;
