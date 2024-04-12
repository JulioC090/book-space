'use client';

import useLocalStorage from '@/hooks/useLocalStorage';
/* eslint-disable no-unused-vars */
import { ISignInGatewayInput } from '@/infra/protocols/gateways/ISignInGateway';
import { makeAuthGateway } from '@/main/factories/gateways/AuthGatewayFactory';
import { User } from '@/models/User';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import { createContext } from 'react';

interface AuthContextType {
  userInfo: Omit<User, 'id' | 'password'> | undefined;
  signIn(user: ISignInGatewayInput): Promise<false | undefined>;
  logout(): void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

const authGateway = makeAuthGateway();

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [userInfo, setUserInfo] =
    useLocalStorage<Omit<User, 'id' | 'password'>>('userInfo');

  async function signIn(user: ISignInGatewayInput) {
    const response = await authGateway.signin(user);

    if (response.status !== 200) return false;

    setUserInfo({ email: user.email, name: response.body!.name });
    Cookie.set('auth_token', response.body!.token);
    router.push('/');
  }

  async function logout() {
    await authGateway.logout();
    setUserInfo();
    Cookie.remove('auth_token');
    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ userInfo, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
