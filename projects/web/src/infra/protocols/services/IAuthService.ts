import { User } from '@/models/User';

export default interface IAuthService {
  signUp(user: Omit<User, 'id'>): Promise<boolean>;
  signIn(userCredentials: {
    email: string;
    password: string;
  }): Promise<{ token: string; name: string } | null>;
  logout(): Promise<void>;
}
