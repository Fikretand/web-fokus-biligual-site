
import React, { useState, useEffect } from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Reviews = () => {
  const { t } = useTranslation();
  const [currentReview, setCurrentReview] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const reviews = [
    {
      text: t('review1_text'),
      author: t('review1_author'),
      rating: 5
    },
    {
      text: t('review2_text'),
      author: t('review2_author'),
      rating: 5
    },
    {
      text: t('review3_text'),
      author: t('review3_author'),
      rating: 5
    },
    {
      text: t('review4_text'),
      author: t('review4_author'),
      rating: 5
    },
    {
      text: t('review5_text'),
      author: t('review5_author'),
      rating: 5
    },
    {
      text: t('review6_text'),
      author: t('review6_author'),
      rating: 5
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index: number) => {
    setCurrentReview(index);
  };

  return (
    <section id="reviews" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-header text-3xl md:text-4xl font-bold mb-4">
            {t('reviews_title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('reviews_subtitle')}
          </p>
        </div>

        <div 
          className="reviews-carousel max-w-4xl mx-auto relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className={`review-card w-full flex-shrink-0 text-center px-8 ${
                    index === currentReview ? 'active' : ''
                  }`}
                >
                  <div className="bg-card border border-border rounded-lg p-8 mx-auto max-w-2xl">
                    <div className="flex justify-center mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-lg italic mb-6 text-muted-foreground">
                      "{review.text}"
                    </blockquote>
                    <cite className="font-semibold text-foreground">— {review.author}</cite>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={prevReview}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextReview}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="carousel-dots flex justify-center space-x-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                className={`dot w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentReview 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
