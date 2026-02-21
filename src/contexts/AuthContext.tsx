import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';
import keycloak from '@/lib/keycloak';
import api from '@/lib/api';

// User profile returned by GET /api/auth/me
interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'PATIENT' | 'DOCTOR' | 'CLINIC_ADMIN';
  languagePreference: string;
  createdAt: string;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  error: string | null;
  login: () => void;
  logout: () => void;
  keycloak: typeof keycloak;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_REFRESH_INTERVAL_MS = 30_000; // Check every 30 seconds
const TOKEN_MIN_VALIDITY_SECONDS = 60; // Refresh when < 60s remaining

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const refreshIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const login = useCallback(() => {
    keycloak.login();
  }, []);

  const logout = useCallback(() => {
    keycloak.logout({ redirectUri: window.location.origin });
  }, []);

  // Fetch the full user profile from the backend
  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await api.get<UserProfile>('/auth/me');
      setUser(response.data);
    } catch (err) {
      // The backend may not be running yet during early dev.
      // Fall back to Keycloak token claims so the UI still works.
      console.warn('Could not fetch user profile from /api/auth/me:', err);
      const tokenParsed = keycloak.tokenParsed;
      if (tokenParsed) {
        setUser({
          id: tokenParsed.sub ?? '',
          email: tokenParsed.email ?? '',
          name: tokenParsed.name ?? tokenParsed.preferred_username ?? '',
          role: 'PATIENT',
          languagePreference: 'hu',
          createdAt: new Date().toISOString(),
        });
      }
    }
  }, []);

  // Set up automatic token refresh
  const startTokenRefresh = useCallback(() => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
    }

    refreshIntervalRef.current = setInterval(async () => {
      try {
        const refreshed = await keycloak.updateToken(TOKEN_MIN_VALIDITY_SECONDS);
        if (refreshed) {
          console.debug('Keycloak token refreshed');
        }
      } catch {
        console.warn('Token refresh failed, session may have expired');
        setIsAuthenticated(false);
        setUser(null);
      }
    }, TOKEN_REFRESH_INTERVAL_MS);
  }, []);

  const stopTokenRefresh = useCallback(() => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function initKeycloak() {
      try {
        const authenticated = await keycloak.init({
          onLoad: 'check-sso',
          pkceMethod: 'S256',
          silentCheckSsoRedirectUri:
            window.location.origin + '/silent-check-sso.html',
        });

        if (cancelled) return;

        setIsAuthenticated(authenticated);

        if (authenticated) {
          await fetchUserProfile();
          startTokenRefresh();
        }
      } catch (err) {
        if (cancelled) return;
        console.error('Keycloak initialization failed:', err);
        setError(
          'Authentication service is unavailable. Please ensure Keycloak is running on http://localhost:8180.'
        );
        setIsAuthenticated(false);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    initKeycloak();

    return () => {
      cancelled = true;
      stopTokenRefresh();
    };
  }, [fetchUserProfile, startTokenRefresh, stopTokenRefresh]);

  const value: AuthContextValue = {
    isAuthenticated,
    isLoading,
    user,
    error,
    login,
    logout,
    keycloak,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
