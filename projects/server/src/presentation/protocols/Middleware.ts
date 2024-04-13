import { IHttpRequest, IHttpResponse } from 'presentation/protocols/Http';

export interface Middleware {
  handle: (request: IHttpRequest) => Promise<IHttpResponse>;
}
