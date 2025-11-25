import { useEffect, useState, useRef } from 'react';

interface UseScrollAnimationOptions {
    threshold?: number;
    triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
    const { threshold = 0.2, triggerOnce = true } = options;
    const [isInView, setIsInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsInView(false);
                }
            },
            { threshold }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [threshold, triggerOnce]);

    return { ref, isInView };
};
