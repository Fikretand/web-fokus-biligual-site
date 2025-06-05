
import React from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import { Check, Star, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingOptimized = () => {
  const { t, currentLanguage } = useTranslation();

  const plans = [
    {
      id: 'basic',
      name: currentLanguage === 'bs' ? 'Osnovni paket' : 'Basic Plan',
      price: '250',
      description: currentLanguage === 'bs'
        ? 'Savršen za mali biznis koji tek kreće online'
        : 'Perfect for small businesses just getting started',
      icon: <Star className="h-6 w-6" />,
      features: currentLanguage === 'bs'
        ? [
            'Do 3 stranice',
            'Bez kontakt forme',
            'Responsive dizajn',
            'SEO osnovna optimizacija'
          ]
        : [
            'Up to 3 pages',
            'No contact form',
            'Responsive design',
            'Basic SEO'
          ],
      popular: false
    },
    {
      id: 'pro',
      name: currentLanguage === 'bs' ? 'Profesionalni paket' : 'Professional Plan',
      price: '450',
      description: currentLanguage === 'bs'
        ? 'Idealan za rastući biznis kojem treba više funkcionalnosti'
        : 'Ideal for growing businesses needing more features',
      icon: <Zap className="h-6 w-6" />,
      features: currentLanguage === 'bs'
        ? [
            'Sve iz Osnovnog paketa',
            'Do 7 stranica',
            'Kontakt forma',
            'Galerija slika',
            'Dvojezičnost'
          ]
        : [
            'Includes everything from Basic Plan',
            'Up to 7 pages',
            'Contact form',
            'Image gallery',
            'Multilingual support'
          ],
      popular: true
    },
    {
      id: 'premium',
      name: currentLanguage === 'bs' ? 'Premium paket' : 'Premium Plan',
      price: '750',
      description: currentLanguage === 'bs'
        ? 'Kompletno rješenje za ozbiljan online biznis'
        : 'Complete solution for serious online business',
      icon: <Crown className="h-6 w-6" />,
      features: currentLanguage === 'bs'
        ? [
            'Sve iz Profesionalnog paketa',
            'Hosting i domena 1 godina',
            'Prioritetna podrška',
            'Izmjene do 30 dana'
          ]
        : [
            'Includes everything from Professional Plan',
            '1 year domain & hosting',
            'Priority support',
            'Revisions up to 30 days'
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

        <div className="text-center mt-12 space-y-2">
          <p className="font-semibold">
            {currentLanguage === 'bs'
              ? 'Akcijske cijene! Važe do 30.06.'
              : 'Promo prices! Valid until June 30th.'}
          </p>
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
