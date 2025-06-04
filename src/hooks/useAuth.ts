import { useState, useEffect } from 'react';

export interface User {
  id: number;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => void;
}

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
 useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
          }
    setLoading(false);
  }, []);

  const signOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, loading, signOut };
};