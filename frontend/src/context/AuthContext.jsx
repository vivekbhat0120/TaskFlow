import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loginUser, registerUser } from '../services/authService';
import { setAuthToken, setUnauthorizedHandler } from '../services/api';

const AuthContext = createContext(null);
const STORAGE_KEY = 'taskflow_auth';

const getStoredSession = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(getStoredSession);

  const persistSession = useCallback((nextSession) => {
    setSession(nextSession);
    if (nextSession?.token) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
      setAuthToken(nextSession.token);
    } else {
      localStorage.removeItem(STORAGE_KEY);
      setAuthToken(null);
    }
  }, []);

  const logout = useCallback(() => {
    persistSession(null);
  }, [persistSession]);

  useEffect(() => {
    setAuthToken(session?.token);
    setUnauthorizedHandler(logout);
    return () => setUnauthorizedHandler(null);
  }, [logout, session?.token]);

  const login = useCallback(
    async (payload) => {
      const data = await loginUser(payload);
      persistSession({ token: data.token, user: data.user });
      return data.user;
    },
    [persistSession]
  );

  const register = useCallback(
    async (payload) => {
      const data = await registerUser(payload);
      persistSession({ token: data.token, user: data.user });
      return data.user;
    },
    [persistSession]
  );

  const value = useMemo(
    () => ({
      user: session?.user || null,
      token: session?.token || null,
      isAuthenticated: Boolean(session?.token),
      login,
      register,
      logout
    }),
    [login, logout, register, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }
  return context;
};
