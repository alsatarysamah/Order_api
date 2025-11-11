export interface IProduct {
  id: number;
  name: string;
  imageURL?: string;
  sizes: string[];
  colors: string[];
  prices: number;
}
