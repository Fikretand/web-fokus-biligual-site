
import React, { useState } from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import { ChevronDown, ChevronUp } from "lucide-react";

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
    <section id="faq" className="py-20 bg-muted/50">
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
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item border border-border rounded-lg mb-4 overflow-hidden"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                className="faq-question w-full px-6 py-4 text-left bg-card hover:bg-muted/50 transition-colors duration-200 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                onClick={() => toggleItem(index)}
                aria-expanded={openItems.includes(index)}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="font-semibold text-lg pr-4" itemProp="name">
                  {faq.question}
                </h3>
                <div className="faq-icon text-primary transition-transform duration-200">
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </button>
              
              <div
                id={`faq-answer-${index}`}
                className={`faq-answer transition-all duration-300 ease-in-out ${
                  openItems.includes(index) 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
                style={{
                  maxHeight: openItems.includes(index) ? '24rem' : '0',
                  overflow: 'hidden'
                }}
                itemScope
                itemType="https://schema.org/Answer"
              >
                <div className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed" itemProp="text">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQOptimized;
