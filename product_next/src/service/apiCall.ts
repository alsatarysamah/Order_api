import { iResponse } from "@interface/requestOption";
import { RequestOptions } from "http";

async function apiCall(
  options: RequestOptions,
  url: string
): Promise<iResponse> {
  const { path, method, headers = {}, body, params } = options;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers as Record<string, string>),
    },
  };

  let fullUrl = `${url}${path}`;
  if (params) {
    fullUrl += `?${new URLSearchParams(params).toString()}`;
  }
  const response = await fetch(fullUrl, fetchOptions);
  
  if (!response.ok) {
    return {
      hasErrors: true,
      errors: response?.data.message || response?.data.messages,
    } as iResponse;
  }

  return {
    hasErrors: false,
    data:response?.data,
  } as iResponse;
}
export default apiCall