export default interface IHttpRequest<BodyType = undefined> {
  body?: BodyType;
  params?: { [key: string]: string | number };
  headers?: { [key: string]: string | string[] | undefined };
  query?: { [key: string]: string | number };
}
