import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useSEO } from '@/hooks/useSEO';
import { useTranslation } from '@/hooks/useTranslation';

const API_URL = `${import.meta.env.VITE_API_URL}/users`;

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const { currentLanguage } = useTranslation();

  useSEO({
    title:
      currentLanguage === 'bs'
        ? 'Admin panel - Web Fokus'
        : 'Admin Dashboard - Web Fokus',
    description:
      currentLanguage === 'bs'
        ? 'Administracija korisnika i poruka na Web Fokus sajtu.'
        : 'Administration area for managing users and messages on the Web Fokus site.',
    keywords: 'web fokus admin,panel',
    ogTitle:
      currentLanguage === 'bs'
        ? 'Admin panel - Web Fokus'
        : 'Admin Dashboard - Web Fokus',
    ogDescription:
      currentLanguage === 'bs'
        ? 'Administracija korisnika i poruka na Web Fokus sajtu.'
        : 'Administration area for managing users and messages on the Web Fokus site.',
    ogImage: 'https://webfokus.ba/logo.png',
    ogUrl: 'https://webfokus.ba/admin',
    canonical: 'https://webfokus.ba/admin',
    lang: currentLanguage
  });

  useEffect(() => {
    if (!loading && !user) {
      toast.error('Please log in to access the admin panel.');
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json() as Promise<{ id: number; email: string }[]>;
    },
    enabled: !!user
  });

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <header className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </header>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="ml-auto">
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Logout
            </Button>
          </div>
        </header>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
        </section>

        {isLoading ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">Loading users...</p>
            </CardContent>
          </Card>
        ) : error ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-red-500 mb-2">Error loading users</p>
            </CardContent>
          </Card>
        ) : !users || users.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No users found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {users.map((u) => (
              <Card key={u.id}>
                <CardHeader>
                  <CardTitle>{u.email}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminPage;