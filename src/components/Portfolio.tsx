
import React from 'react';
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { ExternalLink } from "lucide-react";

const Portfolio = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: t('portfolio_salon_title'),
      description: t('portfolio_salon_desc'),
      image: '/placeholder.svg',
      link: '#'
    },
    {
      title: t('portfolio_apartment_title'),
      description: t('portfolio_apartment_desc'),
      image: '/placeholder.svg',
      link: '#'
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-header text-3xl md:text-4xl font-bold mb-4">
            {t('portfolio_title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('portfolio_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="portfolio-card bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 flex items-center justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t('portfolio_view')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
