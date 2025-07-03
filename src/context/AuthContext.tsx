import React, { createContext, useContext, useState, useEffect, type ReactNode} from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Global variables provided by the Canvas environment
declare const __app_id: string;
declare const __firebase_config: string;
declare const __initial_auth_token: string;

// Initialize Firebase (will be done once in AuthProvider)
let firebaseApp: any;
let db: any;
let auth: any;

// --- Auth Context ---
interface AuthContextType {
  isAdminAuthenticated: boolean;
  adminToken: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
  userId: string | null;
  isAuthReady: boolean;
  dbInstance: any; // Firestore instance
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);
  const [dbInstance, setDbInstance] = useState<any>(null);

  useEffect(() => {
    const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');

    if (Object.keys(firebaseConfig).length > 0 && !firebaseApp) {
      firebaseApp = initializeApp(firebaseConfig);
      db = getFirestore(firebaseApp);
      auth = getAuth(firebaseApp);
      setDbInstance(db);

      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUserId(user.uid);
          // Check if admin token exists in session storage
          const storedToken = sessionStorage.getItem('adminToken');
          if (storedToken) {
            setAdminToken(storedToken);
            setIsAdminAuthenticated(true);
          }
        } else {
          // Sign in anonymously if no initial token is provided (for non-admin users)
          if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            try {
              await signInWithCustomToken(auth, __initial_auth_token);
            } catch (error) {
              console.error("Error signing in with custom token:", error);
              await signInAnonymously(auth); // Fallback to anonymous
            }
          } else {
            await signInAnonymously(auth);
          }
        }
        setIsAuthReady(true);
      });

      return () => unsubscribe();
    } else if (!firebaseApp) {
      console.error("Firebase configuration not provided.");
      setIsAuthReady(true); // Still set ready even if no firebase config
    }
  }, []);

  const login = (_username: string, token: string) => {
    setIsAdminAuthenticated(true);
    setAdminToken(token);
    sessionStorage.setItem('adminToken', token); // Persist token
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
    setAdminToken(null);
    sessionStorage.removeItem('adminToken');
    // Optionally sign out from Firebase auth if desired, but anonymous login might persist
    // auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ isAdminAuthenticated, adminToken, login, logout, userId, isAuthReady, dbInstance }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
