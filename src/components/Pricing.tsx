
import React from 'react';
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { Check } from "lucide-react";

const Pricing = () => {
  const { t } = useTranslation();

  const packages = [
    {
      name: t('pricing_start_title'),
      price: '250 KM',
      delivery: t('pricing_start_delivery'),
      features: [
        t('pricing_start_feature1'),
        t('pricing_start_feature2'),
        t('pricing_start_feature3'),
        t('pricing_start_feature4'),
        t('pricing_start_feature5')
      ],
      popular: false
    },
    {
      name: t('pricing_plus_title'),
      price: '350 KM',
      delivery: t('pricing_plus_delivery'),
      features: [
        t('pricing_plus_feature1'),
        t('pricing_plus_feature2'),
        t('pricing_plus_feature3'),
        t('pricing_plus_feature4'),
        t('pricing_plus_feature5')
      ],
      popular: true
    },
    {
      name: t('pricing_pro_title'),
      price: '500 KM',
      delivery: t('pricing_pro_delivery'),
      features: [
        t('pricing_pro_feature1'),
        t('pricing_pro_feature2'),
        t('pricing_pro_feature3'),
        t('pricing_pro_feature4'),
        t('pricing_pro_feature5')
      ],
      popular: false
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-header text-3xl md:text-4xl font-bold mb-4">
            {t('pricing_title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('pricing_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`pricing-card bg-card border rounded-lg p-8 relative hover:shadow-lg transition-all duration-300 ${
                pkg.popular ? 'border-primary shadow-lg scale-105' : 'border-border'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                    {t('pricing_popular')}
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold text-primary mb-2">{pkg.price}</div>
                <div className="text-muted-foreground">{pkg.delivery}</div>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full btn" 
                variant={pkg.popular ? "default" : "outline"}
                onClick={scrollToContact}
              >
                {t('pricing_choose')}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            {t('pricing_note')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
