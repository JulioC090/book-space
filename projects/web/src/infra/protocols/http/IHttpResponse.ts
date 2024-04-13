export default interface IHttpResponse<BodyType = undefined> {
  body?: BodyType;
  status: number;
}
