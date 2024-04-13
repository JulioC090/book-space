import ILogoutGateway from '@/infra/protocols/gateways/ILogoutGateway';
import ISignInGateway from '@/infra/protocols/gateways/ISignInGateway';
import ISignUpGateway from '@/infra/protocols/gateways/ISignUpGateway';
import IAuthService from '@/infra/protocols/services/IAuthService';
import { User } from '@/models/User';

export default class AuthService implements IAuthService {
  private signUpGateway: ISignUpGateway;
  private signInGateway: ISignInGateway;
  private logoutGateway: ILogoutGateway;

  constructor(
    signUpGateway: ISignUpGateway,
    signInGateway: ISignInGateway,
    logoutGateway: ILogoutGateway,
  ) {
    this.signUpGateway = signUpGateway;
    this.signInGateway = signInGateway;
    this.logoutGateway = logoutGateway;
  }

  async signUp(user: Omit<User, 'id'>): Promise<boolean> {
    return this.signUpGateway.signup(user);
  }

  async signIn(userCredentials: {
    email: string;
    password: string;
  }): Promise<{ token: string; name: string } | null> {
    return this.signInGateway.signin(userCredentials);
  }

  async logout(): Promise<void> {
    return this.logoutGateway.logout();
  }
}
