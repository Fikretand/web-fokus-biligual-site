
import React, { useState } from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import { ChevronDown } from "lucide-react";

const FAQOptimized = () => {
  const { currentLanguage } = useTranslation();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs = currentLanguage === 'bs' ? [
    {
      question: "Koliko vrijeme treba za izradu web sajta?",
      answer: "Osnovni sajt izradimo za 7-14 dana, dok kompleksniji projekti mogu potrajati 3-6 sedmica. Sve ovisi o složenosti funkcionalnosti i broju stranica."
    },
    {
      question: "Da li je hosting i domena uključena u cijenu?",
      answer: "Da! U sve naše pakete uključujemo hosting i domenu za prvu godinu. Nakon toga, troškovi hostinga su oko 10-15 KM mjesečno."
    },
    {
      question: "Mogu li mijenjati sadržaj na sajtu nakon izrade?",
      answer: "Apsolutno! Svi naši sajtovi dolaze sa jednostavnim CMS sistemom gdje možete mijenjati tekst, slike i osnovne sadržaje bez tehničkog znanja."
    },
    {
      question: "Da li nude održavanje web sajta?",
      answer: "Da, nudimo pakete održavanja koji uključuju redovne backup-ove, sigurnosne ažuriranja, tehnička poboljšanja i podršku. Cijena održavanja je od 25 KM mjesečno."
    },
    {
      question: "Da li moj sajt će biti optimizovan za mobilne uređaje?",
      answer: "Svi naši sajtovi su 100% responzivni i optimizovani za sve uređaje - telefone, tablete i računare. Testiramo na svim popularnim uređajima."
    },
    {
      question: "Šta ako nisam zadovoljan rezultatom?",
      answer: "Nudimo neograničene revizije tokom procesa izrade. Ako i dalje niste zadovoljni, vraćamo vam 100% novca u roku od 30 dana."
    }
  ] : [
    {
      question: "How long does it take to build a website?",
      answer: "Basic websites take 7-14 days, while more complex projects can take 3-6 weeks. It all depends on the complexity of functionality and number of pages."
    },
    {
      question: "Is hosting and domain included in the price?",
      answer: "Yes! All our packages include hosting and domain for the first year. After that, hosting costs are around 10-15 KM per month."
    },
    {
      question: "Can I change content on the website after it's built?",
      answer: "Absolutely! All our websites come with a simple CMS system where you can change text, images and basic content without technical knowledge."
    },
    {
      question: "Do you offer website maintenance?",
      answer: "Yes, we offer maintenance packages that include regular backups, security updates, technical improvements and support. Maintenance pricing starts from 25 KM per month."
    },
    {
      question: "Will my website be optimized for mobile devices?",
      answer: "All our websites are 100% responsive and optimized for all devices - phones, tablets and computers. We test on all popular devices."
    },
    {
      question: "What if I'm not satisfied with the result?",
      answer: "We offer unlimited revisions during the development process. If you're still not satisfied, we'll refund 100% of your money within 30 days."
    }
  ];

const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-muted/60 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {currentLanguage === 'bs' ? 'Često Postavljana Pitanja' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {currentLanguage === 'bs'
              ? 'Odgovori na najčešća pitanja o našim uslugama'
              : 'Answers to the most common questions about our services'}
          </p>
        </div>

        <div className="max-w-3xl mx-auto" itemScope itemType="https://schema.org/FAQPage">
          {faqs.map((faq, index) => {
            const isOpen = openItems.includes(index);
            return (
              <div
                key={index}
                className={`
                  faq-item group border border-border rounded-2xl mb-6 overflow-hidden transition-all duration-300
                  ${isOpen
                    ? 'bg-white/90 dark:bg-muted/80 shadow-2xl border-l-8 border-primary scale-[1.02]'
                    : 'bg-card hover:shadow-lg'}
                `}
                style={{
                  boxShadow: isOpen
                    ? '0 8px 32px 0 rgba(80, 80, 180, 0.15)'
                    : undefined,
                }}
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                className={`
                  faq-question w-full px-8 py-5 text-left flex items-center justify-between
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset
                  transition-colors duration-200
                  ${isOpen ? 'text-primary font-semibold dark:text-primary' : 'text-foreground'}
                `}
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="font-semibold text-lg pr-4" itemProp="name">
                    {faq.question}
                  </h3>
                  <span
                    className={`
                      faq-icon flex items-center justify-center rounded-full bg-primary/10
                      transition-all duration-300
                      ${isOpen ? 'rotate-180 bg-primary/20 shadow-md' : ''}
                    `}
                    style={{
                      width: 40,
                      height: 40,
                    }}
                  >
                    <ChevronDown className="h-6 w-6 text-primary" />
                  </span>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`
                    faq-answer transition-all duration-300 ease-in-out
                    ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                  `}
                  style={{
                    overflow: 'hidden'
                  }}
                  itemScope
                  itemType="https://schema.org/Answer"
                >
                  <div className="px-8 pb-6 pt-1 animate-fade-in" style={{ minHeight: isOpen ? '2rem' : 0 }}>
                    <p className="text-muted-foreground leading-relaxed" itemProp="text">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQOptimized;
