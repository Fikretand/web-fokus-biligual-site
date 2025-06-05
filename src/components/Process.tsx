import React from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import { MessageCircle, Palette, Code, Rocket } from "lucide-react";

const Process = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-500" />, // Plava
      title: t('process_step1_title'),
      description: t('process_step1_desc')
    },
    {
      icon: <Palette className="h-8 w-8 text-pink-500" />, // Roza
      title: t('process_step2_title'),
      description: t('process_step2_desc')
    },
    {
      icon: <Code className="h-8 w-8 text-purple-500" />, // Ljubičasta
      title: t('process_step3_title'),
      description: t('process_step3_desc')
    },
    {
      icon: <Rocket className="h-8 w-8 text-green-500" />, // Zelena
      title: t('process_step4_title'),
      description: t('process_step4_desc')
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