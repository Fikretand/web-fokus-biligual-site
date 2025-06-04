
import React from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import { X, ExternalLink, Monitor, Smartphone, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: 'ecommerce' | 'business' | 'portfolio' | 'webapp';
  url?: string;
  features: string[];
}

interface PortfolioModalProps {
  project: PortfolioProject;
  onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ project, onClose }) => {
  const { currentLanguage } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            className="w-full h-64 object-cover rounded-t-lg"
            width={800}
            height={256}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
          <p className="text-muted-foreground mb-6">{project.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <Code className="h-4 w-4 mr-2" />
                {currentLanguage === 'bs' ? 'Tehnologije' : 'Technologies'}
              </h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <Monitor className="h-4 w-4 mr-2" />
                {currentLanguage === 'bs' ? 'Karakteristike' : 'Features'}
              </h4>
              <ul className="space-y-2 mb-6">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button onClick={onClose} variant="outline" className="flex-1">
              {currentLanguage === 'bs' ? 'Zatvori' : 'Close'}
            </Button>
            {project.url && (
              <Button asChild className="flex-1">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {currentLanguage === 'bs' ? 'Posjeti sajt' : 'Visit website'}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
