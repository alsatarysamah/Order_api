import apiCall from "./apiCall";
import { IVariantResponse } from "../interface/variant";

export const getVariantByIdHandler = async (id: number) => {
  const response = await apiCall({
    path: `variant/${id}`,
    method: "GET",
  });

  if (response.data) {
    return response.data as IVariantResponse;
  } else if (response.hasErrors) {
    return response.errors;
  }
};

export const getAllVariantsHandler = async () => {
  const response = await apiCall({
    path: "variants",
    method: "GET",
  });

  if (response.data) {
    return response.data as IVariantResponse[];
  } else if (response.hasErrors) {
    return response.errors;
  }
};
