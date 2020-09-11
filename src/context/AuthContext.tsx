import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

// object para evitar dependências de dados da api
interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  isLoading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
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

      setAuthData({ token, user });
    },
    [],
  );

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:user', '@GoBarber:token']);

    setAuthData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: authData.user, isLoading, signIn, signOut }}
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

  const { user, signIn, signOut, isLoading } = context;

  return { user, signIn, signOut, isLoading };
}

export { AuthProvider, useAuth };
