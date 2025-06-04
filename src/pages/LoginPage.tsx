import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { useSEO } from '@/hooks/useSEO';
import { useTranslation } from '@/hooks/useTranslation';

const API_URL = `${import.meta.env.VITE_API_URL}/users`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { currentLanguage } = useTranslation();

  useSEO({
    title:
      currentLanguage === 'bs'
        ? 'Prijava u admin panel | Web Fokus'
        : 'Admin Login | Web Fokus',
    description:
      currentLanguage === 'bs'
        ? 'Pristupite administraciji sajta Web Fokus.'
        : 'Sign in to manage the Web Fokus website.',
    keywords: 'web fokus login,admin',
    ogTitle:
      currentLanguage === 'bs'
        ? 'Prijava u admin panel | Web Fokus'
        : 'Admin Login | Web Fokus',
    ogDescription:
      currentLanguage === 'bs'
        ? 'Pristupite administraciji sajta Web Fokus.'
        : 'Sign in to manage the Web Fokus website.',
    ogImage: 'https://webfokus.ba/logo.png',
    ogUrl: 'https://webfokus.ba/login',
    canonical: 'https://webfokus.ba/login',
    lang: currentLanguage
  });

  useEffect(() => {
    if (!loading && user) {
      navigate('/admin');
    }
  }, [user, loading, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isSignUp && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      if (isSignUp) {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.toLowerCase().trim(), password })
        });
        if (!res.ok) {
          throw new Error('Failed to create account');
        }
        const newUser = await res.json();
        localStorage.setItem('user', JSON.stringify(newUser));
        toast.success('Account created successfully!');
        navigate('/admin');
      } else {
        const res = await fetch(API_URL);
        const users: { id: number; email: string; password: string }[] = await res.json();
        const found = users.find(
          u => u.email === email.toLowerCase().trim() && u.password === password
        );
        if (!found) {
          setErrors({ general: 'Invalid email or password. Please try again.' });
          return;
        }
        localStorage.setItem('user', JSON.stringify(found));
        toast.success('Successfully signed in!');
        navigate('/admin');
      }
    } catch (error) {
      console.error('Auth error:', error);
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {isSignUp ? 'Create Account' : 'Admin Login'}
            </CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              {isSignUp
                ? 'Create your admin account to access the dashboard'
                : 'Sign in to access the admin dashboard'}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="text-sm text-red-500 text-center p-2 bg-red-50 rounded">
                  {errors.general}
                </div>
              )}

              <div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="admin@example.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className={errors.email ? 'border-red-500' : ''}
    disabled={isLoading}
    required
  />
  {errors.email && (
    <p className="text-sm text-red-500">{errors.email}</p>
  )}
</div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={errors.confirmPassword ? 'border-red-500' : ''}
                    disabled={isLoading}
                    required
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setErrors({});
                  }}
                  disabled={isLoading}
                >
                  {isSignUp
                    ? 'Already have an account? Sign in'
                    : 'Need an account? Sign up'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default LoginPage;