import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isGalleryImage, setIsGalleryImage] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        // Check for reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        let rafId: number;
        let currentX = 0;
        let currentY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            // Use RAF for smoother updates
            if (rafId) cancelAnimationFrame(rafId);

            rafId = requestAnimationFrame(() => {
                currentX = e.clientX;
                currentY = e.clientY;
                setMousePosition({ x: currentX, y: currentY });

                // Check if hovering over interactive elements
                const target = e.target as HTMLElement;
                const isInteractive = target.closest('a, button, input, textarea, [role="button"]');
                const isGalleryImg = target.closest('[data-gallery-image]');

                setIsHovering(!!isInteractive);
                setIsGalleryImage(!!isGalleryImg);
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    // Don't render on touch devices or if user prefers reduced motion
    if ('ontouchstart' in window || prefersReducedMotion) {
        return null;
    }

    return (
        <>
            {/* Main cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
                style={{
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) translate(-50%, -50%)`,
                    borderRadius: '50%',
                }}
                animate={{
                    width: isGalleryImage ? 80 : isHovering ? 50 : 12,
                    height: isGalleryImage ? 80 : isHovering ? 50 : 12,
                    backgroundColor: isGalleryImage ? '#ffffff' : isHovering ? 'transparent' : '#ffffff',
                    border: isHovering ? '1px solid #ffffff' : 'none',
                }}
                transition={{
                    width: { duration: 0.2, ease: 'easeOut' },
                    height: { duration: 0.2, ease: 'easeOut' },
                    backgroundColor: { duration: 0.2 },
                    border: { duration: 0.2 },
                }}
            >
                {/* Text for Gallery Images */}
                <AnimatePresence>
                    {isGalleryImage && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="text-black text-xs font-bold tracking-widest"
                        >
                            VER
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
};

export default CustomCursor;
