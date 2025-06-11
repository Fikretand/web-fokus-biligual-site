import request from 'supertest';
import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest';

let app;
let prisma;

beforeAll(async () => {
  process.env.ADMIN_ACCESS_PASSWORD = 'secret';
  process.env.PRODUCTION_DOMAIN = 'http://localhost';
  const mod = await import('./server.js');
  ({ app, prisma } = mod.default ? mod.default : mod);
  vi.spyOn(prisma.contactMessage, 'create').mockResolvedValue({ id: 1 });
  vi.spyOn(prisma.user, 'findMany').mockResolvedValue([{ id: 1, email: 'test@example.com' }]);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Contact form', () => {
  it('accepts valid data', async () => {
    await request(app)
      .post('/contact')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        message: 'This is a test message.'
      })
      .expect(201)
      .then(res => {
        expect(res.body).toEqual({ success: true });
      });
  });

  it('rejects invalid data', async () => {
    await request(app)
      .post('/contact')
      .send({
        name: 'J',
        email: 'invalid',
        phone: '123',
        message: 'short'
      })
      .expect(400);
  });
});

describe('Authentication middleware', () => {
  it('blocks requests without correct password', async () => {
    await request(app)
      .get('/users')
      .expect(401);
  });

  it('allows access with correct password', async () => {
    await request(app)
      .get('/users')
      .set('x-admin-password', 'secret')
      .expect(200)
      .then(res => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });
});
