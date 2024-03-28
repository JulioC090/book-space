/* eslint-disable no-unused-vars */
export interface IUrlReplaceParamsObject {
  [key: string]: string | number;
}

export default interface IUrlReplaceParams {
  replace(url: string, params: IUrlReplaceParamsObject): string;
}
