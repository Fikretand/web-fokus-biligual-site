import React from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import { MessageCircle, Palette, Code, Rocket } from "lucide-react";

const Process = () => {
  const { currentLanguage, t } = useTranslation();

  const steps = [
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-500" />,
      title:
        currentLanguage === 'bs'
          ? 'Korak 1: Kontaktirajte nas'
          : 'Step 1: Get in touch',
      description:
        currentLanguage === 'bs'
          ? 'Pošaljite nam osnovne informacije i brzo odgovaramo na sve upite.'
          : 'Send us your basic info and we will reply quickly to all inquiries.'
    },
    {
      icon: <Palette className="h-8 w-8 text-pink-500" />,
      title:
        currentLanguage === 'bs'
          ? 'Korak 2: Dogovor dizajna'
          : 'Step 2: Plan the design',
      description:
        currentLanguage === 'bs'
          ? 'Zajedno određujemo izgled i funkcionalnosti koje želite na sajtu.'
          : 'Together we define the look and features you want on the site.'
    },
    {
      icon: <Code className="h-8 w-8 text-purple-500" />,
      title:
        currentLanguage === 'bs'
          ? 'Korak 3: Izrada'
          : 'Step 3: Development',
      description:
        currentLanguage === 'bs'
          ? 'Izrađujemo stranicu modernim alatima i prilagođavamo je svim uređajima.'
          : 'We build the site with modern tools and optimize it for all devices.'
    },
    {
      icon: <Rocket className="h-8 w-8 text-green-500" />,
      title:
        currentLanguage === 'bs'
          ? 'Korak 4: Isporuka i podrška'
          : 'Step 4: Delivery & support',
      description:
        currentLanguage === 'bs'
          ? 'Dobijate gotov sajt uz kratko uputstvo i dostupnu podršku za pitanja.'
          : 'You receive the finished site with a quick guide and ongoing support.'
    }
  ];

  return (
    <section id="process" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-header text-3xl md:text-4xl font-bold mb-4">
            {t('process_title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('process_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center relative"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;