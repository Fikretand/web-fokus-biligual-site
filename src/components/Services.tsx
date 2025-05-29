
import React from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import { Palette, Search, Globe, Server, Moon, Zap, Wrench } from "lucide-react";

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Palette className="h-8 w-8" />,
      title: t('service_design_title'),
      description: t('service_design_desc')
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: t('service_seo_title'),
      description: t('service_seo_desc')
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: t('service_multilang_title'),
      description: t('service_multilang_desc')
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: t('service_hosting_title'),
      description: t('service_hosting_desc')
    },
    {
      icon: <Moon className="h-8 w-8" />,
      title: t('service_themes_title'),
      description: t('service_themes_desc')
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: t('service_speed_title'),
      description: t('service_speed_desc')
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: t('service_maintenance_title'),
      description: t('service_maintenance_desc')
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
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
              className="service-card bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="text-primary mb-4 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
