type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export interface RequestOptions {
  path: string;
  method: HttpMethod;
  headers?: HeadersInit;
  body?: object;
  params?: { [key: string]: string };
}

export interface iErrorFormResponse {
  field: string;
  message: string;
  value: string;
}

export interface iResponse {
  hasErrors?: boolean;
  errors?: string | iErrorFormResponse[];
  data?: object;
}
