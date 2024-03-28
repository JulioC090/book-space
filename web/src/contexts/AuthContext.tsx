'use client';

/* eslint-disable no-unused-vars */
import AuthGateway from '@/infra/gateways/AuthGateway';
import AxiosHttpClient from '@/infra/http/AxiosHttpClient';
import UrlReplaceParams from '@/infra/http/UrlReplaceParams';
import { ISignInGatewayInput } from '@/infra/protocols/gateways/ISignInGateway';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import { createContext } from 'react';

interface AuthContextType {
  signIn(user: ISignInGatewayInput): Promise<false | undefined>;
  logout(): void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

const urlReplaceParams = new UrlReplaceParams();
const httpClient = new AxiosHttpClient(
  process.env.NEXT_PUBLIC_API_URL || '',
  urlReplaceParams,
);
const authGateway = new AuthGateway(httpClient);

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();

  async function signIn(user: ISignInGatewayInput) {
    const response = await authGateway.signin(user);

    if (response.status === 401) return false;

    Cookie.set('auth_token', response.body!.token);
    router.push('/');
  }

  async function logout() {
    await authGateway.logout();
    Cookie.remove('auth_token');
    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
