
import React, { useState, lazy, Suspense } from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import { ExternalLink, Code, Smartphone, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

// Lazy load modal for performance
const PortfolioModal = lazy(() => import('./PortfolioModal'));

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

const PortfolioOptimized = () => {
  const { t, currentLanguage } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const projects: PortfolioProject[] = [
    {
      id: 'apartman-rental',
      title: currentLanguage === 'bs' ? 'Apartman Ilidža' : 'Apartment Rental Ilidža',
      description: currentLanguage === 'bs' 
        ? 'Moderni sajt za iznajmljivanje apartmana sa online rezervacijama'
        : 'Modern apartment rental website with online booking system',
      image: '/portfolio/apartman.webp',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
      category: 'business',
      url: 'https://cerulean-taffy-73a3e9.netlify.app/',
      features: currentLanguage === 'bs' 
        ? ['Online rezervacije', 'Galerija slika', 'Kontakt forma', 'Responzivan dizajn']
        : ['Online booking', 'Image gallery', 'Contact form', 'Responsive design']
    },{
      id: 'beauty-salon',
      title: currentLanguage === 'bs' ? 'Salon ljepote Atelier Rosa' : 'Atelier Rosa Beauty Salon',
      description: currentLanguage === 'bs'
        ? 'Elegantni sajt za salon lepote sa galerijom radova i cenikom'
        : 'Elegant beauty salon website with portfolio gallery and pricing',
      image: '/portfolio/salon.webp',
      technologies: ['React', 'CSS3', 'JavaScript', 'Node.js'],
      category: 'business',
      url: 'https://atelierrosa.netlify.app/',
      features: currentLanguage === 'bs'
        ? ['Galerija radova', 'Cenik usluga', 'Lokacija', 'Mobilna optimizacija']
        : ['Work gallery', 'Service pricing', 'Location', 'Mobile optimization']
    },
  
    {
      id: 'german courses',
      title: currentLanguage === 'bs' ? 'Njemački jezik - online kursevi' : 'German Language - Online Courses',
      description: currentLanguage === 'bs' 
        ? 'Interaktivni sajt za online kurseve njemačkog jezika sa video lekcijama'
        : 'Interactive website for online German language courses with video lessons',
      image: '/portfolio/german-courses.webp',  
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'],
      category: 'business',
      url: 'https://skolanjemackogjezika.netlify.app/', 
      features: currentLanguage === 'bs' 
        ? ['Video lekcije', 'Interaktivne vježbe', 'Online testovi', 'Responzivan dizajn']
        : ['Video lessons', 'Interactive exercises', 'Online tests', 'Responsive design']
    }
  ];

  const categories = [
    { id: 'all', label: currentLanguage === 'bs' ? 'Svi projekti' : 'All projects' },
    { id: 'business', label: currentLanguage === 'bs' ? 'Biznis sajtovi' : 'Business websites' },
    { id: 'ecommerce', label: currentLanguage === 'bs' ? 'Online prodavnice' : 'E-commerce' },
    { id: 'webapp', label: currentLanguage === 'bs' ? 'Web aplikacije' : 'Web applications' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="portfolio" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {t('portfolio_title') || (currentLanguage === 'bs' ? 'Naši Projekti' : 'Our Projects')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {currentLanguage === 'bs' 
              ? 'Pogledajte neke od naših najuspješnijih web projekata'
              : 'Check out some of our most successful web projects'}
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filter === category.id ? 'default' : 'outline'}
              onClick={() => setFilter(category.id)}
              className="transition-all duration-200"
            >
              {category.label}
            </Button>
          ))}
        </div>

{/* Projects grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {filteredProjects.length > 0 ? (
    filteredProjects.map((project, index) => (
      <article
        key={project.id}
        className="portfolio-card bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="relative overflow-hidden">
          <img
            src={project.image}
            alt={`Screenshot ${currentLanguage === 'bs' ? 'sajta' : 'of'} ${project.title}`}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            width="400"
            height="200"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-foreground">{project.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedProject(project)}
              className="flex-1"
            >
              <Code className="h-4 w-4 mr-2" />
              {currentLanguage === 'bs' ? 'Detalji' : 'Details'}
            </Button>
            {project.url && (
              <Button
                variant="default"
                size="sm"
                asChild
                className="flex-1"
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${currentLanguage === 'bs' ? 'Posjetite' : 'Visit'} ${project.title}`}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {currentLanguage === 'bs' ? 'Posjeti' : 'Visit'}
                </a>
              </Button>
            )}
          </div>
        </div>
      </article>
    ))
  ) : (
    <div className="col-span-full flex flex-col items-center justify-center py-16">
      <span className="text-3xl font-bold text-primary mb-2">
        {currentLanguage === 'bs' ? 'USKORO DOSTUPNO' : 'COMING SOON'}
      </span>
      <span className="text-muted-foreground text-lg">
        {currentLanguage === 'bs'
          ? 'Radimo na novim projektima u ovoj kategoriji.'
          : 'We are working on new projects in this category.'}
      </span>
    </div>
  )}
</div>


        {/* Modal */}
        {selectedProject && (
          <Suspense fallback={
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-card p-8 rounded-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            </div>
          }>
            <PortfolioModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          </Suspense>
        )}
      </div>
    </section>
  );
};

export default PortfolioOptimized;
