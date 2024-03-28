/* eslint-disable no-unused-vars */
import { User } from '@/models/User';

export default interface ISignUpGateway {
  signup(user: Omit<User, 'id'>): Promise<boolean>;
}
