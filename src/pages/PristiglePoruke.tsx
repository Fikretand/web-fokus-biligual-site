import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ContactMessage {
  id: number;
  name: string;
  email: string | null;
  phone?: string | null;
  message: string;
  createdAt: string;
}

const API_URL = `${import.meta.env.VITE_API_URL}/contact`;

const PristiglePoruke = () => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const pwd = window.prompt('Enter password');
    if (pwd === 'tajna123') {
      setAuthorized(true);
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (!authorized) return;
    const fetchMessages = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [authorized]);

  if (!authorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Pristigle poruke</CardTitle>
          </CardHeader>
          <CardContent>
            {messages.length === 0 ? (
              <p className="text-muted-foreground text-center">No messages</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell>{m.name}</TableCell>
                      <TableCell>{m.phone || '-'}</TableCell>
                      <TableCell>{m.email || '-'}</TableCell>
                      <TableCell className="max-w-xs whitespace-pre-wrap">{m.message}</TableCell>
                      <TableCell>{new Date(m.createdAt).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PristiglePoruke;

