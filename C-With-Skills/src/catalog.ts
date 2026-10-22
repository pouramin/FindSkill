export type Category = "All sneakers" | "Everyday" | "Running" | "Court";
export type Product = {
  id: string;
  name: string;
  color: string;
  price: number;
  category: Exclude<Category, "All sneakers">;
  image: string;
  tag?: string;
  description: string;
  tones: string[];
};
export type CartItem = { id: string; size: number; quantity: number };
export const sizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];
export const categories: Category[] = [
  "All sneakers",
  "Everyday",
  "Running",
  "Court",
];
export const products: Product[] = [
  {
    id: "air-01",
    name: "Aeron Air 01",
    color: "Chalk / Burnt orange",
    price: 145,
    category: "Everyday",
    image: "hero",
    tag: "Bestseller",
    description:
      "A little lift for your everyday. A breathable upper, generous cushioning, and a flash of burnt orange. The pair you reach for without thinking twice.",
    tones: ["#ddd9ca", "#ec663b", "#414747"],
  },
  {
    id: "court-02",
    name: "Aeron Court 02",
    color: "Cloud / Forest",
    price: 130,
    category: "Court",
    image: "court",
    tag: "New arrival",
    description:
      "Old-school court energy, reworked for whatever is next. Clean leather panels meet a grounded rubber sole and a comfortably padded collar.",
    tones: ["#e9e6db", "#456047"],
  },
  {
    id: "pace-01",
    name: "Aeron Pace 01",
    color: "Bone / Sand",
    price: 160,
    category: "Running",
    image: "pace",
    description:
      "For the long way home. Lightweight mesh and soft, responsive cushioning keep your feet comfortable from the first step to the last.",
    tones: ["#d7c9ad", "#bbb8ae", "#555853"],
  },
  {
    id: "terra-01",
    name: "Aeron Terra 01",
    color: "Ochre / Gum",
    price: 150,
    category: "Everyday",
    image: "terra",
    description:
      "Warm earth tones with a go-anywhere attitude. A textured upper and sturdy gum outsole bring a little character to your daily rotation.",
    tones: ["#bc8350", "#d3bc99"],
  },
  {
    id: "form-01",
    name: "Aeron Form 01",
    color: "Ivory / Rose",
    price: 135,
    category: "Court",
    description:
      "A clean silhouette with a softer side. Understated colors, a cushioned footbed, and considered details that go with just about everything.",
    image: "form",
    tones: ["#e5dfd4", "#d4b5b4", "#333739"],
  },
  {
    id: "drift-02",
    name: "Aeron Drift 02",
    color: "Cloud / Slate",
    price: 170,
    category: "Running",
    image: "drift",
    tag: "New arrival",
    description:
      "Take a different route. A sculpted sole, breathable construction, and a secure fit make room for movement, all day long.",
    tones: ["#d4d4cf", "#78848a"],
  },
];
export const money = (value: number) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
export function readCart(): CartItem[] {
  try {
    const stored: unknown = JSON.parse(
      localStorage.getItem("aeron:cart:v1") ?? "[]",
    );
    if (!Array.isArray(stored)) return [];
    return stored
      .filter(
        (item): item is CartItem =>
          item !== null &&
          typeof item === "object" &&
          products.some((p) => p.id === item.id) &&
          sizes.includes(item.size) &&
          Number.isInteger(item.quantity) &&
          item.quantity > 0 &&
          item.quantity <= 10,
      )
      .reduce<CartItem[]>((items, item) => {
        const existing = items.find(
          (i) => i.id === item.id && i.size === item.size,
        );
        if (existing)
          existing.quantity = Math.min(10, existing.quantity + item.quantity);
        else
          items.push({ id: item.id, size: item.size, quantity: item.quantity });
        return items;
      }, []);
  } catch {
    return [];
  }
}
