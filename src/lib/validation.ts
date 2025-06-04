import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-ZšđčćžŠĐČĆŽ\s-']+$/, 'Name contains invalid characters'),
  email: z.preprocess(
    (val) => (typeof val === 'string' && val.trim() === '' ? undefined : val),
    z
      .string()
      .email('Unesite važeću email adresu')
      .max(254, 'Email je predugačak')
      .toLowerCase()
      .optional()
  ),
  phone: z
    .string({ required_error: 'Telefon je obavezan' })
    .refine((val) => {
      const phoneRegex = /^\+?[1-9]\d{0,15}$/;
      const cleanPhone = val.replace(/[\s-()]/g, '');
      return phoneRegex.test(cleanPhone) && cleanPhone.length >= 8 && cleanPhone.length <= 16;
    }, 'Unesite ispravan broj telefona'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .refine((val) => val.trim().length >= 10, 'Message cannot be only whitespace')
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Sanitization utility
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

// Rate limiting helper (client-side)
export const createRateLimiter = (maxAttempts: number, windowMs: number) => {
  const attempts = new Map<string, number[]>();
  
  return (identifier: string): boolean => {
    const now = Date.now();
    const userAttempts = attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const validAttempts = userAttempts.filter(time => now - time < windowMs);
    
    if (validAttempts.length >= maxAttempts) {
      return false; // Rate limit exceeded
    }
    
    validAttempts.push(now);
    attempts.set(identifier, validAttempts);
    return true;
  };
};