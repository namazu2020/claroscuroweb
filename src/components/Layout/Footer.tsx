import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="py-12 sm:py-16 border-t border-[#222] text-center">
            <div className="container px-6 sm:px-8">
                <div className="text-[#888] mb-8 text-sm">
                    <p>&copy; 2025 Creado por Juan Manuel Puccio</p>
                    <p>Todos los derechos reservados.</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
                    <a
                        href="https://instagram.com/claroscuro.ros"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#888] hover:text-white uppercase text-xs tracking-widest transition-colors"
                    >
                        Instagram
                    </a>
                    <a
                        href="https://wa.me/5493413192179"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#888] hover:text-white uppercase text-xs tracking-widest transition-colors"
                    >
                        WhatsApp
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
