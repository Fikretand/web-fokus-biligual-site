
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: 'admin' | 'user' | null;
  loading: boolean;
  signOut: () => Promise<void>;
  checkUserRole: () => Promise<void>;
}

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'user' | null>(null);
  const [loading, setLoading] = useState(true);

  const checkUserRole = async () => {
    if (!user) {
      setUserRole(null);
      return;
    }

    try {
      const { data, error } = await supabase
        .rpc('get_user_role', { user_uuid: user.id });

      if (error) {
        console.error('Error fetching user role:', error);
        setUserRole('user'); // Default to user role
        return;
      }

      setUserRole(data || 'user');
    } catch (error) {
      console.error('Unexpected error checking user role:', error);
      setUserRole('user');
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        throw error;
      }
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    }
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting initial session:', error);
        }
        
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
      } catch (error) {
        console.error('Unexpected error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Check user role when user changes
        if (session?.user && event === 'SIGNED_IN') {
          setTimeout(() => {
            checkUserRole();
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          setUserRole(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Check role when user changes
  useEffect(() => {
    if (user && !loading) {
      checkUserRole();
    }
  }, [user, loading]);

  return {
    user,
    session,
    userRole,
    loading,
    signOut,
    checkUserRole
  };
};
