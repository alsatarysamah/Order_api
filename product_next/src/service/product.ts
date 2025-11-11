import apiCall from "./apiCall";
import { IProduct } from "../interface/product";

export const getProductByIdHandler = async (id: number) => {
  const response = await apiCall({
    path: `product/${id}`,
    method: "GET",
  });

  if (response.data) {
    return response.data as IProduct;
  } else if (response.hasErrors) {
    return response.errors;
  }
};

export const getAllProductsHandler = async () => {
  const response = await apiCall({
    path: "products",
    method: "GET",
  });

  if (response.data) {
    return response.data as IProduct[];
  } else if (response.hasErrors) {
    return response.errors;
  }
};
