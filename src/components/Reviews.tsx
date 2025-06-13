import { useState, useEffect, useRef } from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import { Star, ChevronLeft, ChevronRight, User, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviewIcons = [
  <Quote className="h-8 w-8" />,
  <User className="h-8 w-8" />,
  <Star className="h-8 w-8" />,
  <Quote className="h-8 w-8" />,
  <User className="h-8 w-8" />,
  <Star className="h-8 w-8" />,
];

const Reviews = () => {
  const { t } = useTranslation();
  const [currentReview, setCurrentReview] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Touch state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

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

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 50) {
        // swipe left
        setCurrentReview((prev) => (prev + 1) % reviews.length);
      } else if (distance < -50) {
        // swipe right
        setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const nextReview = () => setCurrentReview((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  const goToReview = (index: number) => setCurrentReview(index);

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
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-2"
                >
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/10 text-primary mb-4">
                      {reviewIcons[index % reviewIcons.length]}
                    </div>
                    <h4 className="font-semibold text-lg mb-1 text-foreground">
                      {review.author}
                    </h4>
                    <div className="text-yellow-400 text-lg mb-4 flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-200 italic leading-relaxed text-center">
                      "{review.text}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevReview}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextReview}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4"
            aria-label="Next review"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Carousel dots */}
          <div className="flex justify-center mt-8 gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentReview
                    ? 'bg-primary scale-125'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;