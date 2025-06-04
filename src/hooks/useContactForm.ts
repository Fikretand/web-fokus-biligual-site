import { useState } from 'react';
import { toast } from 'sonner';
import { contactFormSchema, type ContactFormData, sanitizeInput, createRateLimiter } from '@/lib/validation';

const API_URL = `${import.meta.env.VITE_API_URL}/contact`;

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

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    validateField(name as keyof ContactFormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!rateLimiter(formData.email)) {
        toast.error('Previše zahtjeva. Molimo sačekajte prije ponovnog slanja.');
        return;
      }

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
        name: sanitizeInput(validationResult.data.name).trim(),
        email: validationResult.data.email.trim(),
        phone: validationResult.data.phone ? sanitizeInput(validationResult.data.phone).trim() : null,
        message: sanitizeInput(validationResult.data.message).trim()
      };

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedData)
      });

      if (!res.ok) {
        toast.error('Greška pri slanju poruke. Molimo pokušajte ponovo.');
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