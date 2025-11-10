import axios, { AxiosRequestConfig } from "axios";
import { RequestOptions, iResponse } from "@interface/requestOption";
import { API_URL } from "@constants/baseURLs";

async function apiCall(options: RequestOptions): Promise<iResponse> {
  const { path, method, body, params } = options;

  const config: AxiosRequestConfig = {
    url: `${API_URL}${path}`,
    method,
    data: body,
    params,
  };

  try {
    const response = await axios(config);

    return {
      hasErrors: false,
      data: response.data,
    } as iResponse;
  } catch (error: any) {
    return {
      hasErrors: true,
      errors:
        error.response?.data?.message ||
        error.response?.data?.errors ||
        error.message,
    } as iResponse;
  }
}

export default apiCall;
