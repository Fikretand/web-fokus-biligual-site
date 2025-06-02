
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, Calendar, Shield, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, userRole, loading, signOut } = useAuth();

  // Enhanced authentication check
  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.error('Please log in to access the admin panel.');
        navigate('/login');
        return;
      }
      
      if (userRole !== 'admin') {
        toast.error('Access denied. Admin privileges required.');
        navigate('/');
        return;
      }
    }
  }, [user, userRole, loading, navigate]);

  // Fetch messages with enhanced error handling
  const { data: messages, isLoading: messagesLoading, error: fetchError } = useQuery({
    queryKey: ['admin-messages'],
    queryFn: async () => {
      if (!user || userRole !== 'admin') {
        throw new Error('Unauthorized access');
      }

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Database error fetching messages:', error);
        throw new Error('Failed to fetch messages');
      }
      
      return data;
    },
    enabled: !!user && userRole === 'admin',
    retry: (failureCount, error) => {
      // Don't retry on auth errors
      if (error.message === 'Unauthorized access') return false;
      return failureCount < 2;
    }
  });

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Successfully signed out.');
      navigate('/login');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Error signing out. Please try again.');
    }
  };

  // Show loading state
  if (loading || (user && userRole === null)) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Verifying admin access...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show unauthorized if not admin
  if (!user || userRole !== 'admin') {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Access Denied</h1>
          </div>
          <Card>
            <CardContent className="py-8 text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">You don't have permission to access this page.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Welcome, {user.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Logout
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Contact Messages ({messages?.length || 0})
          </h2>
        </div>

        {messagesLoading ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">Loading messages...</p>
            </CardContent>
          </Card>
        ) : fetchError ? (
          <Card>
            <CardContent className="py-8 text-center">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-red-500" />
              <p className="text-red-500 mb-2">Error loading messages</p>
              <p className="text-sm text-muted-foreground">
                {fetchError.message === 'Unauthorized access' 
                  ? 'You don\'t have permission to view messages.' 
                  : 'Please try refreshing the page.'}
              </p>
            </CardContent>
          </Card>
        ) : !messages || messages.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No messages yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <Card key={message.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg">{message.name}</span>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(message.created_at).toLocaleDateString()}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    <a href={`mailto:${message.email}`} className="hover:underline">
                      {message.email}
                    </a>
                  </div>
                  {message.phone && (
                    <div className="flex items-center text-sm text-muted-foreground gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{message.phone}</span>
                      {/* WhatsApp */}
                      <a
                        href={`https://wa.me/${message.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="WhatsApp"
                        className="ml-2 text-green-600 hover:underline"
                      >
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.67-.5-5.24-1.44l-.37-.22-3.67.97.98-3.58-.24-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.18.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.02-.22-.54-.45-.47-.61-.48-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.36-.26.29-1 1-.97 2.43.03 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.1 5.03 4.23.7.24 1.25.38 1.68.49.71.18 1.36.15 1.87.09.57-.07 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z"/>
                        </svg>
                      </a>
                      {/* Viber */}
                      <a
                        href={`viber://chat?number=${message.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Viber"
                        className="ml-2 text-purple-600 hover:underline"
                      >
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.967-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.173.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.009-.372-.009-.571-.009-.198 0-.52.074-.793.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.104 3.222 5.104 4.377.714.246 1.27.393 1.703.502.716.182 1.367.156 1.882.095.574-.068 1.758-.719 2.007-1.413.248-.694.248-1.287.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421-11.41C6.533 2.972 2.972 6.533 2.972 12c0 1.104.2 2.163.592 3.153l-1.26 4.603 4.719-1.24A9.025 9.025 0 0 0 12 21.028c5.467 0 9.028-3.561 9.028-9.028 0-5.467-3.561-9.028-9.028-9.028zm0 16.528c-1.635 0-3.163-.446-4.463-1.216l-.319-.19-2.801.735.744-2.785-.208-.326A7.963 7.963 0 0 1 4.028 12c0-4.393 3.579-7.972 7.972-7.972 4.393 0 7.972 3.579 7.972 7.972 0 4.393-3.579 7.972-7.972 7.972zm4.992-6.197c-.068-.112-.248-.182-.521-.317-.273-.135-1.611-.793-1.86-.884-.248-.09-.429-.135-.627.135-.198.272-.793.884-.97 1.081-.178.198-.33.223-.627.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.173.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.009-.372-.009-.571-.009-.198 0-.52.074-.793.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.104 3.222 5.104 4.377.714.246 1.27.393 1.703.502.716.182 1.367.156 1.882.095.574-.068 1.758-.719 2.007-1.413.248-.694.248-1.287.173-1.413z"/>
                        </svg>
                      </a>
                    </div>
                  )}
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Message:</p>
                    <p className="text-sm bg-muted p-3 rounded-md whitespace-pre-wrap">
                      {message.message}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
