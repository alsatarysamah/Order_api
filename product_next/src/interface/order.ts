// interface/order.ts

export interface IOrderItem {
  item_id: number;
  quantity: number;
  price: number;
}

export interface IOrderResponse {
  orderId: number;
  totalAmount: number;
  createdAt: string;
  items: IOrderItem[];
}
