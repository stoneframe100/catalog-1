export interface Item {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  sku: string;
  isSold: boolean;
  created_at: string; // ISO date string
  price?: number | null;
  size: string; // Size of the item, e.g., "small", "medium", "large"
}