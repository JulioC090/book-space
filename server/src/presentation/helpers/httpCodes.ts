import { IHttpResponse } from 'presentation/protocols/Http';

export const ok = (data: unknown): IHttpResponse => ({
  status: 200,
  body: data,
});

export const created = (): IHttpResponse => ({ status: 201 });

export const badRequest = (error: unknown): IHttpResponse => ({
  status: 400,
  body: error,
});

export const unauthorized = (): IHttpResponse => ({ status: 401 });
