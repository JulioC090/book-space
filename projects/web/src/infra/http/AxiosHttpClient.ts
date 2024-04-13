import { HttpCode } from '@/infra/protocols/http/httpCodes';
import IHttpClient, {
  IHttpClientProps,
} from '@/infra/protocols/http/IHttpClient';
import IHttpResponse from '@/infra/protocols/http/IHttpResponse';
import IUrlReplaceParams from '@/infra/protocols/http/IUrlReplaceParams';
import axios, { AxiosInstance } from 'axios';
import Cookie from 'js-cookie';

export default class AxiosHttpClient implements IHttpClient {
  private axios: AxiosInstance;
  private urlReplaceParams: IUrlReplaceParams;

  constructor(baseURl: string, urlReplaceParams: IUrlReplaceParams) {
    this.urlReplaceParams = urlReplaceParams;

    this.axios = axios.create({
      baseURL: baseURl,
      headers: { 'Content-Type': 'application/json' },
      validateStatus: function (status) {
        return status < HttpCode.INTERNAL_SERVER_ERROR;
      },
    });

    this.loadToken();
  }

  loadToken() {
    const token = Cookie.get('auth_token');

    if (token) {
      this.axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  async get<ResponseBodyType>(
    params: Omit<IHttpClientProps<undefined>, 'body'>,
  ): Promise<IHttpResponse<ResponseBodyType>> {
    const url = params.params
      ? this.urlReplaceParams.replace(params.url, params.params)
      : params.url;

    this.loadToken();

    const response = await this.axios.get(url, {
      headers: params.headers,
      params: params.query,
    });

    return { body: response.data, status: response.status };
  }

  async post<RequestBodyType, ResponseBodyType = undefined>(
    params: IHttpClientProps<RequestBodyType>,
  ): Promise<IHttpResponse<ResponseBodyType>> {
    const url = params.params
      ? this.urlReplaceParams.replace(params.url, params.params)
      : params.url;

    this.loadToken();

    const response = await this.axios.post(url, params.body, {
      headers: params.headers,
      params: params.query,
    });

    return { body: response.data, status: response.status };
  }

  async put<RequestBodyType, ResponseBodyType = undefined>(
    params: IHttpClientProps<RequestBodyType>,
  ): Promise<IHttpResponse<ResponseBodyType>> {
    const url = params.params
      ? this.urlReplaceParams.replace(params.url, params.params)
      : params.url;

    this.loadToken();

    const response = await this.axios.put(url, params.body, {
      headers: params.headers,
      params: params.query,
    });

    return { body: response.data, status: response.status };
  }

  async patch<RequestBodyType, ResponseBodyType = undefined>(
    params: IHttpClientProps<RequestBodyType>,
  ): Promise<IHttpResponse<ResponseBodyType>> {
    const url = params.params
      ? this.urlReplaceParams.replace(params.url, params.params)
      : params.url;

    this.loadToken();

    const response = await this.axios.patch(url, params.body, {
      headers: params.headers,
      params: params.query,
    });

    return { body: response.data, status: response.status };
  }

  async delete<RequestBodyType = undefined, ResponseBodyType = undefined>(
    params: IHttpClientProps<RequestBodyType>,
  ): Promise<IHttpResponse<ResponseBodyType>> {
    const url = params.params
      ? this.urlReplaceParams.replace(params.url, params.params)
      : params.url;

    this.loadToken();

    const response = await this.axios.delete(url, {
      headers: params.headers,
      params: params.query,
      data: params.body,
    });

    return { body: response.data, status: response.status };
  }

  setHeader(header: string, value: string): void {
    this.axios.defaults.headers[header] = value;
  }
}
