import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface User {
  name: string;
  email: string;
  avatar_url: string;
  id: string;
}

// object para evitar dependências de dados da api
interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  isLoading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthState>({} as AuthState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getAuthDataFromAsyncStorage() {
      const user = await AsyncStorage.getItem('@GoBarber:user');
      const token = await AsyncStorage.getItem('@GoBarber:token');

      if (user && token) {
        api.defaults.headers.authorization = `Bearer ${token}`;

        setAuthData({ user: JSON.parse(user), token });
      }

      setIsLoading(false);
    }

    getAuthDataFromAsyncStorage();
  }, []);

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials): Promise<void> => {
      const response = await api.post('/sessions', { email, password });

      const { token, user } = response.data;

      await AsyncStorage.multiSet([
        ['@GoBarber:user', JSON.stringify(user)],
        ['@GoBarber:token', token],
      ]);

      api.defaults.headers.authorization = `Bearer ${token}`;
      setAuthData({ token, user });
    },
    [],
  );

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:user', '@GoBarber:token']);

    setAuthData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      setAuthData({
        token: authData.token,
        user,
      });

      await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));
    },
    [authData.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: authData.user, isLoading, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be within an AuthProvider context');
  }

  const { user, signIn, signOut, updateUser, isLoading } = context;

  return { user, signIn, signOut, updateUser, isLoading };
}

export { AuthProvider, useAuth };
