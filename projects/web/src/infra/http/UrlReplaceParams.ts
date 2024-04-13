import IUrlReplaceParams, {
  IUrlReplaceParamsObject,
} from '@/infra/protocols/http/IUrlReplaceParams';

export default class UrlReplaceParams implements IUrlReplaceParams {
  replace(url: string, params: IUrlReplaceParamsObject): string {
    Object.keys(params).forEach((key) => {
      const value = params[key];
      url = url.replace(`:${key}`, String(value));
    });
    return url;
  }
}
