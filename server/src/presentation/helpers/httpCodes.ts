import { IHttpResponse } from 'presentation/protocols/Http';

export const ok = (): IHttpResponse => ({ status: 200 });

export const created = (): IHttpResponse => ({ status: 201 });

export const badRequest = (error: unknown): IHttpResponse => ({
  status: 400,
  body: error,
});
