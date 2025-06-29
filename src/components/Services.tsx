import { useState, useEffect, useRef } from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import {
  Palette,
  Search,
  Globe,
  Server,
  Moon,
  Zap,
  Wrench,
  Code,
  MessageCircle,
} from "lucide-react";

const Services = () => {
  const { t, currentLanguage } = useTranslation();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setOffsetY(-rect.top);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: <Palette className="h-8 w-8 text-purple-600" />,
      title: t('service_design_title'),
      description: t('service_design_desc'),
      details: t('service_design_details'), // Dodaj detalje u prevodima
    },
    {
      icon: <Search className="h-8 w-8 text-purple-600" />,
      title: t('service_seo_title'),
      description: t('service_seo_desc'),
      details: t('service_seo_details'),
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      title: t('service_multilang_title'),
      description: t('service_multilang_desc'),
      details: t('service_multilang_details'),
    },
    {
      icon: <Server className="h-8 w-8 text-purple-600" />,
      title: t('service_hosting_title'),
      description: t('service_hosting_desc'),
      details: t('service_hosting_details'),
    },
    {
      icon: <Moon className="h-8 w-8 text-purple-600" />,
      title: t('service_themes_title'),
      description: t('service_themes_desc'),
      details: t('service_themes_details'),
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-600" />,
      title: t('service_speed_title'),
      description: t('service_speed_desc'),
      details: t('service_speed_details'),
    },
    {
      icon: <Wrench className="h-8 w-8 text-purple-600" />,
      title: t('service_maintenance_title'),
      description: t('service_maintenance_desc'),
      details: t('service_maintenance_details'),
    }
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-20 bg-background overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Code
          className="absolute left-8 top-16 w-48 h-48 text-purple-500/20"
          style={{ transform: `translateY(${offsetY * 0.2}px)` }}
        />
        <Globe
          className="absolute right-10 top-0 w-56 h-56 text-purple-500/20"
          style={{ transform: `translateY(${offsetY * 0.1}px)` }}
        />
        <MessageCircle
          className="absolute left-1/2 bottom-0 w-40 h-40 text-purple-500/20"
          style={{ transform: `translate(-50%, ${offsetY * -0.15}px)` }}
        />
      </div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-header text-3xl md:text-4xl font-bold mb-4">
            {t('services_title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('services_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedService(index)}
            >
              <div className="mb-4 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>

        {selectedService !== null && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-8 max-w-md w-full shadow-lg relative flex flex-col items-center text-center">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl"
                onClick={() => setSelectedService(null)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="flex justify-center mb-4">
                {services[selectedService].icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{services[selectedService].title}</h3>
              <p className="mb-4">{services[selectedService].details}</p>
              <button
                className="btn bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded"
                onClick={() => setSelectedService(null)}
              >
                {t('close')}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
