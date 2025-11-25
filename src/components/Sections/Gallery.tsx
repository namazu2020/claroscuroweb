import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Available portfolio images
const portfolioImages = [
    1, 2, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24
];

const Gallery: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (!selectedImage) return;
        const currentIndex = portfolioImages.findIndex(num =>
            selectedImage.includes(`portfolio-${String(num).padStart(2, '0')}`)
        );
        const nextIndex = (currentIndex + 1) % portfolioImages.length;
        setSelectedImage(`/img/portfolio-${String(portfolioImages[nextIndex]).padStart(2, '0')}.jpg`);
    };

    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (!selectedImage) return;
        const currentIndex = portfolioImages.findIndex(num =>
            selectedImage.includes(`portfolio-${String(num).padStart(2, '0')}`)
        );
        const prevIndex = (currentIndex - 1 + portfolioImages.length) % portfolioImages.length;
        setSelectedImage(`/img/portfolio-${String(portfolioImages[prevIndex]).padStart(2, '0')}.jpg`);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedImage) return;
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') setSelectedImage(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage]);

    return (
        <>
            <section id="portfolio" className="py-16 sm:py-20 md:py-32 bg-[#0a0a0a] relative">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-12 sm:mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-4">Portfolio</h2>
                        <div className="w-12 sm:w-16 h-[1px] bg-white/30" />
                    </motion.div>

                    {/* Masonry Grid */}
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
                        {portfolioImages.map((num, idx) => (
                            <GalleryItem
                                key={num}
                                src={`/img/portfolio-${String(num).padStart(2, '0')}.jpg`}
                                index={idx}
                                onClick={() => setSelectedImage(`/img/portfolio-${String(num).padStart(2, '0')}.jpg`)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
                    >
                        <button
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[101]"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={40} strokeWidth={1} />
                        </button>

                        <button
                            className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-[101]"
                            onClick={handlePrev}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </button>

                        <button
                            className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-[101]"
                            onClick={handleNext}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </button>

                        <motion.img
                            key={selectedImage}
                            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            src={selectedImage}
                            alt="Full screen"
                            className="max-h-[85vh] max-w-[85vw] object-contain shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const GalleryItem: React.FC<{
    src: string;
    index: number;
    onClick: () => void;
}> = ({ src, index, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: (index % 6) * 0.1 }}
            className="break-inside-avoid mb-4 sm:mb-6 cursor-none group"
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-gallery-image
        >
            <div className="relative overflow-hidden bg-[#0a0a0a]">
                <motion.img
                    src={src}
                    alt={`Portfolio ${index + 1}`}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                    style={{
                        filter: isHovered
                            ? 'grayscale(0) brightness(1.05) contrast(1.08)'
                            : 'grayscale(1) brightness(0.85) contrast(0.95)',
                    }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                />

                {/* Subtle overlay */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: isHovered
                            ? 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.2) 100%)'
                            : 'radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)',
                    }}
                    transition={{ duration: 0.5 }}
                />

                {/* Border glow on hover */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        boxShadow: isHovered
                            ? 'inset 0 0 0 1px rgba(255,255,255,0.2)'
                            : 'inset 0 0 0 1px rgba(255,255,255,0)',
                    }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </motion.div>
    );
};

export default Gallery;
