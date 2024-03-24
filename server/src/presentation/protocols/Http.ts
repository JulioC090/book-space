export interface IHttpRequest {
  body?: unknown;
  query?: unknown;
  params?: unknown;
}

export interface IHttpResponse {
  body?: unknown;
  status: number;
}
