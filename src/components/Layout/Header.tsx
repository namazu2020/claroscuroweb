import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Active section logic
            const sections = ['portfolio', 'about', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 150 && rect.bottom >= 150;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: 'Portafolio', href: '#portfolio', id: 'portfolio' },
        { name: 'Sobre Mí', href: '#about', id: 'about' },
        { name: 'Contacto', href: '#contact', id: 'contact' },
    ];

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-[#0a0a0a]/95 backdrop-blur-md' : 'py-8 bg-gradient-to-b from-[#0a0a0a]/90 to-transparent'
                }`}
        >
            <div className="container flex items-center justify-between">
                <a href="#" className="text-2xl font-serif font-bold tracking-[0.3em] text-white hover:text-gray-300 transition-colors">
                    CLAROSCURO
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:block">
                    <ul className="flex gap-8">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    className={`text-sm uppercase tracking-widest transition-colors relative group ${activeSection === link.id ? 'text-white font-bold' : 'text-[#888] hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                    {activeSection === link.id && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute -bottom-2 left-0 right-0 h-[2px] bg-white"
                                        />
                                    )}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed inset-0 bg-black/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center"
                    >
                        <ul className="flex flex-col gap-8 text-center">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={toggleMenu}
                                        className="text-[1.5rem] sm:text-[1.2rem] uppercase tracking-widest text-white hover:text-[#ccc] transition-colors py-4 block"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
