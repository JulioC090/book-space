export type IAuthenticationInput = {
  email: string;
  password: string;
};

export type IAuthenticationOutput = {
  token: string;
  name: string;
} | null;

export default interface IAuthentication {
  auth(user: IAuthenticationInput): Promise<IAuthenticationOutput>;
}
