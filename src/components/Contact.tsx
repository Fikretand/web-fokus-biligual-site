
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useContactForm } from "@/hooks/useContactForm";
import { useTranslation } from "@/hooks/useTranslation";

const Contact = () => {
  const { currentLanguage, t } = useTranslation();
  const { formData, errors, handleChange, handleSubmit, isSubmitting, isFormValid } = useContactForm();

  return (
    <section id="contact" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {t('contact_title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('contact_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                {t('contact_info')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">+387 61 234 567</p>
                  <p className="text-sm text-muted-foreground">
                    {currentLanguage === 'bs' ? 'Pozovite nas' : 'Call us'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">info@webfokus.ba</p>
                  <p className="text-sm text-muted-foreground">
                    {currentLanguage === 'bs' ? 'Pošaljite email' : 'Send email'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Sarajevo, BiH</p>
                  <p className="text-sm text-muted-foreground">
                    {currentLanguage === 'bs' ? 'Naša lokacija' : 'Our location'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" />
                {t('contact_form_title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('contact_form_name')} *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t('contact_form_namePlaceholder')}
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                    required
                    maxLength={100}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('contact_form_email')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t('contact_form_emailPlaceholder')}
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                    maxLength={254}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t('contact_form_phone')} *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder={t('contact_form_phonePlaceholder')}
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                    required
                    maxLength={20}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t('contact_form_message')} *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={t('contact_form_messagePlaceholder')}
                    value={formData.message}
                    onChange={handleChange}
                    className={`min-h-[120px] resize-none ${errors.message ? 'border-red-500' : ''}`}
                    disabled={isSubmitting}
                    required
                    maxLength={2000}
                  />
                  <div className="flex justify-between items-center">
                    {errors.message && (
                      <p className="text-sm text-red-500">{errors.message}</p>
                    )}
                    <p className="text-xs text-muted-foreground ml-auto">
                      {formData.message.length}/2000
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || !isFormValid}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? t('contact_form_sending') : t('contact_form_send')}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  {currentLanguage === 'bs' 
                    ? '* Obavezna polja. Vaše podatke koristimo samo za odgovor na vašu poruku.'
                    : '* Required fields. We only use your data to respond to your message.'}
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
