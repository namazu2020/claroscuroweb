import React from 'react';
import { motion } from 'framer-motion';
import SpotlightBackground from '../UI/SpotlightBackground';

const Hero: React.FC = () => {
    return (
        <section
            id="hero"
            className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-[#050505]"
        >
            <SpotlightBackground />

            <div className="relative z-10 max-w-5xl px-4 sm:px-6 md:px-8 mix-blend-difference">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-[clamp(2.5rem,10vw,8rem)] leading-[0.9] font-serif tracking-tighter text-white font-bold mb-4 sm:mb-6"
                    style={{ textShadow: '0 0 40px rgba(255,255,255,0.3)' }}
                >
                    CLAROSCURO
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="flex flex-col items-center gap-4 sm:gap-6"
                >
                    <p className="text-[0.85rem] sm:text-[1rem] md:text-[1.2rem] text-[#a0a0a0] font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                        La esencia de la luz
                    </p>

                    <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-transparent via-white to-transparent opacity-50" />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
