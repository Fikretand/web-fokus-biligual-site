const { z } = require('zod');

// Contact form validation schema
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-ZšđčćžŠĐČĆŽ\s-']+$/, 'Name contains invalid characters'),
  email: z.preprocess(
    (val) => (typeof val === 'string' && val.trim() === '' ? undefined : val),
    z
      .string()
      .email('Invalid email')
      .max(254, 'Email too long')
      .toLowerCase()
      .optional()
  ),
  phone: z
    .string({ required_error: 'Phone is required' })
    .refine((val) => {
      const phoneRegex = /^\+?[1-9]\d{0,15}$/;
      const cleanPhone = val.replace(/[\s-()]/g, '');
      return phoneRegex.test(cleanPhone) && cleanPhone.length >= 8 && cleanPhone.length <= 16;
    }, 'Invalid phone number'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .refine((val) => val.trim().length >= 10, 'Message cannot be only whitespace')
});

// Sanitization utility
const sanitizeInput = (input) => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

module.exports = { contactFormSchema, sanitizeInput };
