import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const About: React.FC = () => {
    const { ref: textRef, isInView: textInView } = useScrollAnimation();
    const { ref: imageRef, isInView: imageInView } = useScrollAnimation({ threshold: 0.3 });

    return (
        <section id="about" className="py-16 sm:py-24 md:py-32 lg:py-40 bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Element */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#111] to-transparent opacity-50 pointer-events-none" />

            <div className="container px-4 sm:px-6 md:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 md:gap-24 items-center relative z-10">
                <motion.div
                    ref={textRef}
                    initial={{ opacity: 0, x: -50 }}
                    animate={textInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="text-[2.5rem] sm:text-[3rem] md:text-[4rem] font-serif leading-none mb-6 sm:mb-8 text-white">Sobre Mí</h2>
                    <div className="w-10 sm:w-12 h-[1px] bg-white/30 mb-6 sm:mb-8" />

                    <div className="space-y-4 sm:space-y-6 text-[#a0a0a0] font-light text-base sm:text-lg leading-relaxed">
                        <p>
                            Soy un fotógrafo apasionado por encontrar la belleza en la simplicidad. Mi enfoque se basa en el juego entre la luz y la sombra, buscando siempre una composición limpia y emotiva.
                        </p>
                        <p>
                            Con más de 10 años de experiencia, he trabajado en proyectos editoriales, retratos y fotografía arquitectónica, siempre manteniendo una estética sobria y elegante.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    ref={imageRef}
                    initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                    animate={imageInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative aspect-[3/4] overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[#0a0a0a]/20 z-10 mix-blend-multiply pointer-events-none" />
                    <img
                        src="/img/new-gallery-1.jpg"
                        alt="Retrato"
                        className="w-full h-full object-cover grayscale opacity-90"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default About;
