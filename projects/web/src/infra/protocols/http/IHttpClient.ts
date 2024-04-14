import IHttpRequest from '@/infra/protocols/http/IHttpRequest';
import IHttpResponse from '@/infra/protocols/http/IHttpResponse';

export interface IHttpClientProps<RequestBodyType = undefined>
  extends IHttpRequest<RequestBodyType> {
  url: string;
}

export default interface IHttpClient {
  get<ResponseBodyType>(
    params: Omit<IHttpClientProps, 'body'>,
  ): Promise<IHttpResponse<ResponseBodyType>>;

  post<RequestBodyType, ResponseBodyType = undefined>(
    params: IHttpClientProps<RequestBodyType>,
  ): Promise<IHttpResponse<ResponseBodyType>>;

  put<RequestBodyType, ResponseBodyType = undefined>(
    params: IHttpClientProps<RequestBodyType>,
  ): Promise<IHttpResponse<ResponseBodyType>>;

  patch<RequestBodyType, ResponseBodyType = undefined>(
    params: IHttpClientProps<RequestBodyType>,
  ): Promise<IHttpResponse<ResponseBodyType>>;

  delete<RequestBodyType = undefined, ResponseBodyType = undefined>(
    params: IHttpClientProps<RequestBodyType>,
  ): Promise<IHttpResponse<ResponseBodyType>>;

  setHeader(header: string, value: string): void;
}
