import IHttpResponse from '@/infra/protocols/http/IHttpResponse';
import { User } from '@/models/User';

/* eslint-disable no-unused-vars */
export type ISignInGatewayInput = Omit<User, 'id' | 'name'>;

export type ISignInGatewayOutput = {
  token: string;
};

export default interface ISignInGateway {
  signin(
    user: ISignInGatewayInput,
  ): Promise<IHttpResponse<ISignInGatewayOutput>>;
}
