import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  enableParallax?: boolean;
}

interface UseStaggeredAnimationOptions extends UseScrollAnimationOptions {
  childSelector?: string;
  staggerDelay?: number;
}

export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(options: UseScrollAnimationOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            setIsVisible(true);
          }, options.delay || 0);

          // If once is false, we don't unobserve
          if (options.once !== false) {
            observer.unobserve(element);
          }

          return () => clearTimeout(timer);
        } else if (options.once === false) {
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -100px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options.threshold, options.rootMargin, options.delay, options.once]);

  // Parallax effect
  useEffect(() => {
    if (!options.enableParallax) return;

    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Calculate parallax offset based on element position
      if (elementTop < windowHeight && elementTop + elementHeight > 0) {
        const progress = (windowHeight - elementTop) / (windowHeight + elementHeight);
        setParallaxOffset(progress * 50 - 25); // Subtle parallax movement
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [options.enableParallax]);

  return { ref, isVisible, parallaxOffset };
};

export const useStaggeredAnimation = <T extends HTMLElement = HTMLElement>(options: UseStaggeredAnimationOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsVisible(true);
      // Show all items immediately
      const children = element.querySelectorAll(options.childSelector || '> *');
      setVisibleItems(Array.from({ length: children.length }, (_, i) => i));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Stagger child animations
          const children = element.querySelectorAll(options.childSelector || '> *');
          children.forEach((child, index) => {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, index]);
            }, (options.delay || 0) + (index * (options.staggerDelay || 150)));
          });

          if (options.once !== false) {
            observer.unobserve(element);
          }
        } else if (options.once === false) {
          setIsVisible(false);
          setVisibleItems([]);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -100px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options.threshold, options.rootMargin, options.delay, options.once, options.childSelector, options.staggerDelay]);

  const isItemVisible = useCallback((index: number) => {
    return visibleItems.includes(index);
  }, [visibleItems]);

  return { ref, isVisible, isItemVisible };
};

// Hook for smooth entrance animations
export const useEntranceAnimation = <T extends HTMLElement = HTMLElement>(delay = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return { ref, isVisible };
};