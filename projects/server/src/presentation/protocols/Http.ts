export interface IHttpRequest {
  body?: unknown;
  query?: unknown;
  params?: unknown;
  headers?: { [key: string]: string | string[] | undefined };
}

export interface IHttpResponse {
  body?: unknown;
  status: number;
}
