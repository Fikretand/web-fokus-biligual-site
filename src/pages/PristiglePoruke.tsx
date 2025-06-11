import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSEO } from '@/hooks/useSEO';
import { useTranslation } from '@/hooks/useTranslation';
import { Trash2 } from "lucide-react"; // ili koristi <span>🗑️</span>

interface ContactMessage {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  message: string;
  createdAt: string;
}

const API_URL = `${import.meta.env.VITE_API_URL}/contact`;

const PristiglePoruke = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useTranslation();
  const [authorized, setAuthorized] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useSEO({
    title:
      currentLanguage === 'bs'
        ? 'Pristigle poruke | Web Fokus'
        : 'Inbox Messages | Web Fokus',
    description:
      currentLanguage === 'bs'
        ? 'Pogledajte kontakt poruke pristigle putem sajta.'
        : 'View contact form messages received through the website.',
    keywords: 'kontakt poruke,web fokus',
    ogTitle:
      currentLanguage === 'bs'
        ? 'Pristigle poruke | Web Fokus'
        : 'Inbox Messages | Web Fokus',
    ogDescription:
      currentLanguage === 'bs'
        ? 'Pogledajte kontakt poruke pristigle putem sajta.'
        : 'View contact form messages received through the website.',
    ogImage: 'https://webfokus.ba/logo.png',
    ogUrl: 'https://webfokus.ba/pristigleporuke',
    canonical: 'https://webfokus.ba/pristigleporuke',
    lang: currentLanguage
  });


  if (!authorized) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Zaštićena stranica</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={async e => {
                e.preventDefault();
                try {
                  const res = await fetch(API_URL, {
                     method: 'GET',
                    headers: { 'x-admin-password': password }
                  });
                  if (res.status === 401) {
                    setError('Pogrešna lozinka!');
                    return;
                  }
                  if (!res.ok) throw new Error('Failed to fetch');
                  const data = await res.json();
                  setMessages(data);
                  setAuthorized(true);
                  setError('');
                } catch (err) {
                  console.error(err);
                  setError('Greška pri dohvatu poruka');
                }
              }}
              className="space-y-4"
            >
              <Input
                type="password"
                placeholder="Unesite lozinku"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full">Pristupi</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background p-8">
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
                  {[...messages]
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((m) => (
                      <TableRow key={m.id}>
                        <TableCell>{m.name}</TableCell>
                        <TableCell>{m.phone || '-'}</TableCell>
                        <TableCell>{m.email || '-'}</TableCell>
                        <TableCell className="max-w-xs whitespace-pre-wrap">{m.message}</TableCell>
                        <TableCell>{new Date(m.createdAt).toLocaleString()}</TableCell>
                        <TableCell>
                          <button
                            onClick={async () => {
                              if (
                                window.confirm(
                                  "Da li ste sigurni da želite obrisati ovu poruku?"
                                )
                              ) {
                                try {
                                  const res = await fetch(`${API_URL}/${m.id}`, {
                                    method: "DELETE",
                                    headers: { "x-admin-password": password },
                                  });
                                  if (res.ok) {
                                    setMessages((msgs) => msgs.filter((msg) => msg.id !== m.id));
                                  } else {
                                    alert("Greška pri brisanju poruke.");
                                  }
                                } catch {
                                  alert("Greška pri brisanju poruke.");
                                }
                              }
                            }}
                            title="Obriši poruku"
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default PristiglePoruke;