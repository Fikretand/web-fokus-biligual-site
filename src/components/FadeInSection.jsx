import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const FadeInSection = ({ children, className = '' }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0 translate-y-10 transition-all duration-700',
        isVisible && 'opacity-100 translate-y-0',
        className
      )}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
