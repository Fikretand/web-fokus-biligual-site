
import React, { useState } from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import { Plus, Minus } from "lucide-react";

const FAQ = () => {
  const { t } = useTranslation();
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqItems = [
    {
      question: t('faq1_question'),
      answer: t('faq1_answer')
    },
    {
      question: t('faq2_question'),
      answer: t('faq2_answer')
    },
    {
      question: t('faq3_question'),
      answer: t('faq3_answer')
    },
    {
      question: t('faq4_question'),
      answer: t('faq4_answer')
    },
    {
      question: t('faq5_question'),
      answer: t('faq5_answer')
    },
    {
      question: t('faq6_question'),
      answer: t('faq6_answer')
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-header text-3xl md:text-4xl font-bold mb-4">
            {t('faq_title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('faq_subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`faq-item bg-card border border-border rounded-lg overflow-hidden ${
                openItem === index ? 'open' : ''
              }`}
            >
              <button
                onClick={() => toggleItem(index)}
                className="faq-question w-full text-left p-6 hover:bg-muted/50 transition-colors duration-300 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
              >
                <span className="font-semibold text-lg pr-4">{item.question}</span>
                <div className={`faq-icon transition-transform duration-300 ${openItem === index ? 'rotate-45' : ''}`}>
                  <Plus className="h-5 w-5 text-primary" />
                </div>
              </button>
              <div
                className={`faq-answer transition-all duration-300 ease-in-out ${
                  openItem === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-muted-foreground">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
