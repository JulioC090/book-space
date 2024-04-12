import AxiosHttpClient from '@/infra/http/AxiosHttpClient';
import UrlReplaceParams from '@/infra/http/UrlReplaceParams';

const urlReplaceParams = new UrlReplaceParams();

export const axiosHttpClient = new AxiosHttpClient(
  process.env.NEXT_PUBLIC_API_URL || '',
  urlReplaceParams,
);
