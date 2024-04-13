'use client';

import useLocalStorage from '@/presentation/hooks/useLocalStorage';
/* eslint-disable no-unused-vars */
import { ISignInGatewayInput } from '@/infra/protocols/gateways/ISignInGateway';
import { makeAuthService } from '@/main/factories/services/AuthServiceFactory';
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

const authService = makeAuthService();

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [userInfo, setUserInfo] =
    useLocalStorage<Omit<User, 'id' | 'password'>>('userInfo');

  async function signIn(user: ISignInGatewayInput) {
    const response = await authService.signIn(user);

    if (!response) return false;

    setUserInfo({ email: user.email, name: response.name });
    Cookie.set('auth_token', response.token);
    router.push('/');
  }

  async function logout() {
    await authService.logout();
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
