
import React from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import { Check, Star, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingOptimized = () => {
  const { t, currentLanguage } = useTranslation();

  const plans = [
    {
      id: 'basic',
      name: currentLanguage === 'bs' ? 'Osnovni' : 'Basic',
      price: '250',
      description: currentLanguage === 'bs' 
        ? 'Savršen za mala preduzeća koja tek počinju'
        : 'Perfect for small businesses just getting started',
      icon: <Star className="h-6 w-6" />,
      features: currentLanguage === 'bs' ? [
        'Do 5 stranica',
        'Responzivan dizajn',
        'Kontakt forma',
        'Google Maps integracija',
        'SSL sertifikat',
        '1 godina hosting'
      ] : [
        'Up to 5 pages',
        'Responsive design',
        'Contact form',
        'Google Maps integration',
        'SSL certificate',
        '1 year hosting'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: currentLanguage === 'bs' ? 'Profesionalni' : 'Professional',
      price: '450',
      description: currentLanguage === 'bs'
        ? 'Idealan za rastući biznis sa više funkcionalnosti'
        : 'Ideal for growing businesses with more functionality',
      icon: <Zap className="h-6 w-6" />,
      features: currentLanguage === 'bs' ? [
        'Do 15 stranica',
        'Responzivan dizajn',
        'CMS sistem',
        'SEO optimizacija',
        'Google Analytics',
        'Email marketing integracija',
        'Chat podrška',
        '1 godina hosting + domena'
      ] : [
        'Up to 15 pages',
        'Responsive design',
        'CMS system',
        'SEO optimization',
        'Google Analytics',
        'Email marketing integration',
        'Chat support',
        '1 year hosting + domain'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: currentLanguage === 'bs' ? 'Premium' : 'Premium',
      price: '750',
      description: currentLanguage === 'bs'
        ? 'Kompletno rješenje za ozbiljan online biznis'
        : 'Complete solution for serious online business',
      icon: <Crown className="h-6 w-6" />,
      features: currentLanguage === 'bs' ? [
        'Neograničeno stranica',
        'E-commerce funkcionalnost',
        'Napredna SEO optimizacija',
        'Analitika i izvještaji',
        'Rezervacije online',
        'Višejezična podrška',
        'Premium podrška 24/7',
        '2 godine hosting + domena'
      ] : [
        'Unlimited pages',
        'E-commerce functionality',
        'Advanced SEO optimization',
        'Analytics and reports',
        'Online booking system',
        'Multi-language support',
        'Premium 24/7 support',
        '2 years hosting + domain'
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
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {currentLanguage === 'bs' ? 'Naše Cijene' : 'Our Pricing'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {currentLanguage === 'bs'
              ? 'Transparentne cijene bez skrivenih troškova. Sve uključeno!'
              : 'Transparent pricing with no hidden costs. Everything included!'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <article
              key={plan.id}
              className={`pricing-card relative bg-card border-2 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'border-border hover:border-primary/50'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              itemScope
              itemType="https://schema.org/Offer"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    {currentLanguage === 'bs' ? 'Najpopularniji' : 'Most Popular'}
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  plan.popular ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                }`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2" itemProp="name">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold" itemProp="price">{plan.price}</span>
                  <span className="text-xl text-muted-foreground ml-1">KM</span>
                </div>
                <p className="text-sm text-muted-foreground" itemProp="description">
                  {currentLanguage === 'bs' ? 'Jednovremen plaćanje' : 'One-time payment'}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start" itemProp="itemOffered">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={scrollToContact}
                className={`w-full ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                    : ''
                }`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                {currentLanguage === 'bs' ? 'Poručite sada' : 'Order now'}
              </Button>

              {/* Structured data */}
              <meta itemProp="priceCurrency" content="BAM" />
              <meta itemProp="availability" content="https://schema.org/InStock" />
              <meta itemProp="seller" content="Web Fokus" />
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            {currentLanguage === 'bs'
              ? 'Trebate nešto specifično? Kontaktirajte nas za prilagođenu ponudu.'
              : 'Need something specific? Contact us for a custom quote.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingOptimized;
