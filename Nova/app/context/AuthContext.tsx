import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

type AuthState = { token: string | null; isLoading: boolean };

interface AuthContextProps {
  authState?: AuthState;
  logout?: () => Promise<any>;
  setToken?: (token: string) => Promise<any>;
}

const TOKEN_KEY = "auth-token";
const AuthContext = createContext<AuthContextProps>({});

// sirve para no llamar useContext todo el tiempo
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [token, setStateToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function setToken(token: string) {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    setStateToken(token);
  }

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      setStateToken(token);
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const logout = async () => {
    // Delete token from storage
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    // Reset auth state
    setStateToken(null);
  };

  const value = {
    logout,
    authState: {
      token,
      isLoading,
    },
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
