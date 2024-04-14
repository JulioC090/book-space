import { User } from '@/models/User';

export type ISignInGatewayInput = Omit<User, 'id' | 'name'>;

export type ISignInGatewayOutput = {
  token: string;
  name: string;
};

export default interface ISignInGateway {
  signin(user: ISignInGatewayInput): Promise<ISignInGatewayOutput | null>;
}
