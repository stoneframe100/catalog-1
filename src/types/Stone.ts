export interface Stone {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  sku: string;
  isSold: boolean;
  created_at: string; // ISO date string
  price: number;
}