
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { MapPin, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Molimo popunite sva obavezna polja / Please fill all required fields');
      return;
    }

    // Create mailto link
    const subject = encodeURIComponent('Web Fokus - Upit za web sajt');
    const body = encodeURIComponent(
      `Ime: ${formData.name}\nEmail: ${formData.email}\nTelefon: ${formData.phone}\n\nPoruka:\n${formData.message}`
    );
    
    window.location.href = `mailto:info@webfokus.ba?subject=${subject}&body=${body}`;
    
    toast.success('Poruka je pripremljena / Message prepared');
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-header text-3xl md:text-4xl font-bold mb-4">
            {t('contact_title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('contact_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{t('contact_location_title')}</h3>
                <p className="text-muted-foreground">Sarajevo, Bosnia and Herzegovina</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{t('contact_email_title')}</h3>
                <p className="text-muted-foreground">info@webfokus.ba</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{t('contact_phone_title')}</h3>
                <p className="text-muted-foreground">+387 61 234 567</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                {t('contact_form_name')} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {t('contact_form_email')} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                {t('contact_form_phone')}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                {t('contact_form_message')} *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background resize-vertical"
              />
            </div>

            <Button type="submit" className="w-full btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              {t('contact_form_submit')}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
