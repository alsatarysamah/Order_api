export interface IVariant {
  id: number;
  product_id: number;
  size: string;
  color: string;
  price: number;
  stock: number;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}


export interface IVariantResponse {
  success: boolean;
  message?: string;
  data?: IVariant | IVariant[];
}


