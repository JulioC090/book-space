import { IHttpRequest, IHttpResponse } from 'presentation/protocols/Http';

export interface Controller {
  handle: (request: IHttpRequest) => Promise<IHttpResponse>;
}
