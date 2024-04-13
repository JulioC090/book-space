export default interface ILogoutGateway {
  logout(): Promise<void>;
}
