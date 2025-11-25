import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const Contact: React.FC = () => {
    const { ref: headerRef, isInView: headerInView } = useScrollAnimation();

    const contactOptions = [
        {
            platform: 'WhatsApp',
            description: 'Conversemos sobre tu proyecto',
            url: 'https://wa.me/5493413192179',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            ),
            gradient: 'from-[#25D366] to-[#128C7E]',
            hoverGradient: 'from-[#128C7E] to-[#075E54]',
        },
        {
            platform: 'Instagram',
            description: 'Explora mi trabajo y escríbeme',
            url: 'https://instagram.com/claroscuro.ros',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
            gradient: 'from-[#833AB4] via-[#FD1D1D] to-[#F77737]',
            hoverGradient: 'from-[#5B2A86] via-[#C41515] to-[#C45D2A]',
        },
    ];

    return (
        <section id="contact" className="py-16 sm:py-24 md:py-32 lg:py-40 bg-[#0a0a0a] relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}
            />

            <div className="container max-w-5xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16 sm:mb-20 md:mb-24"
                >
                    <h2 className="text-[2.5rem] sm:text-[3rem] md:text-[4rem] font-serif leading-none mb-4 sm:mb-6 text-white">
                        Hablemos
                    </h2>
                    <div className="w-12 sm:w-16 h-[1px] bg-white/30 mx-auto mb-6 sm:mb-8" />
                    <p className="text-[#a0a0a0] font-light text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        ¿Tienes un proyecto en mente? Conectemos y creemos algo extraordinario juntos.
                    </p>
                </motion.div>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
                    {contactOptions.map((option, index) => (
                        <motion.a
                            key={option.platform}
                            href={option.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="group relative overflow-hidden rounded-2xl bg-[#111] p-8 sm:p-10 cursor-pointer"
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Gradient background on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                            {/* Border glow */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

                            <div className="relative z-10">
                                {/* Icon */}
                                <motion.div
                                    className={`w-14 h-14 sm:w-16 sm:h-16 mb-6 text-white/70 group-hover:text-white transition-colors duration-300`}
                                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {option.icon}
                                </motion.div>

                                {/* Platform name */}
                                <h3 className="text-2xl sm:text-3xl font-serif text-white mb-3 group-hover:text-white transition-colors">
                                    {option.platform}
                                </h3>

                                {/* Description */}
                                <p className="text-[#888] group-hover:text-[#a0a0a0] font-light text-sm sm:text-base mb-6 transition-colors">
                                    {option.description}
                                </p>

                                {/* CTA */}
                                <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                                    <span className="text-xs sm:text-sm uppercase tracking-widest font-light">
                                        Conectar
                                    </span>
                                    <motion.svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="group-hover:translate-x-1 transition-transform"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </motion.svg>
                                </div>
                            </div>

                            {/* Subtle corner accent */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-5 blur-3xl transition-opacity duration-500`} />
                        </motion.a>
                    ))}
                </div>

                {/* Footer note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center text-[#666] text-xs sm:text-sm font-light mt-12 sm:mt-16 tracking-wide"
                >
                    Respondo en menos de 24 horas
                </motion.p>
            </div>
        </section>
    );
};

export default Contact;
