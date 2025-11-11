import apiCall from "./apiCall";
import { IOrderItem, IOrderResponse } from "../interface/order";

export const createOrderHandler = async (orderItems: IOrderItem[]) => {
  const response = await apiCall({
    path: "orders",
    method: "POST",
    body: orderItems
  });

  if (response.data) {
    return response.data as IOrderResponse;
  } else if (response.hasErrors) {
    return response.errors;
  }
};
