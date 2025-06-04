
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { contactFormSchema, type ContactFormData, sanitizeInput, createRateLimiter } from '@/lib/validation';

const API_URL = import.meta.env.VITE_API_URL;

// Rate limiter: max 3 submissions per 5 minutes per email
const rateLimiter = createRateLimiter(3, 5 * 60 * 1000);

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const validateField = (name: keyof ContactFormData, value: string) => {
    try {
      const fieldSchema = contactFormSchema.shape[name];
      fieldSchema.parse(value);
      setErrors(prev => ({ ...prev, [name]: undefined }));
      return true;
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === 'object' && 'errors' in error
          ? (error as { errors?: { message?: string }[] }).errors?.[0]?.message || 'Invalid input'
          : 'Invalid input';
      setErrors(prev => ({ ...prev, [name]: errorMessage }));
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));

    // Real-time validation
    validateField(name as keyof ContactFormData, sanitizedValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Client-side rate limiting
      if (!rateLimiter(formData.email)) {
        toast.error('Previše zahtjeva. Molimo sačekajte prije ponovnog slanja.');
        return;
      }

      // Validate entire form
      const validationResult = contactFormSchema.safeParse(formData);
      
      if (!validationResult.success) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        validationResult.error.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as keyof ContactFormData] = error.message;
          }
        });
        setErrors(fieldErrors);
        toast.error('Molimo ispravite greške u formi.');
        return;
      }

      const sanitizedData = {
        name: sanitizeInput(validationResult.data.name),
        email: validationResult.data.email,
        phone: validationResult.data.phone ? sanitizeInput(validationResult.data.phone) : null,
        message: sanitizeInput(validationResult.data.message)
      };

      const { error } = await supabase
        .from('messages')
        .insert([sanitizedData]);

      if (error) {
        console.error('Database error:', error);
        
        // User-friendly error messages
        if (error.code === '23505') {
          toast.error('Ova poruka je već poslana. Molimo sačekajte prije ponovnog slanja.');
        } else if (error.code === 'PGRST301') {
          toast.error('Greška u pristupanju bazi podataka. Molimo pokušajte ponovo.');
        } else {
          toast.error('Greška pri slanju poruke. Molimo kontaktirajte nas direktno.');
        }
        return;
      }

      toast.success('Poruka je uspješno poslana! Kontaktiraćemo vas uskoro.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setErrors({});
    } catch (error: unknown) {
      console.error('Unexpected error:', error);
      toast.error('Neočekivana greška. Molimo pokušajte ponovo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    hasErrors: Object.values(errors).some(error => error !== undefined)
  };
};
