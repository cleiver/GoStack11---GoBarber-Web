import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  get_avatar: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextProps {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  SignOut(): void;
  UpdateUser(user: User): void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  // estados
  const [authData, setAuthData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  // Functions
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setAuthData({ token, user });
  }, []);

  const SignOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setAuthData({} as AuthState);
  }, []);

  const UpdateUser = useCallback(
    (user: User) => {
      setAuthData({
        token: authData.token,
        user,
      });
      localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    },
    [setAuthData, authData.token],
  );

  // interface
  return (
    <AuthContext.Provider
      value={{ user: authData.user, signIn, SignOut, UpdateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// creating hook to make it easier
export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('`useAuth()` must be used with an `AuthProvider`');
  }

  return context;
}
