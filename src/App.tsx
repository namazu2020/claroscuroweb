import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Lenis from '@studio-freight/lenis';
import Header from './components/Layout/Header';
import Hero from './components/Sections/Hero';
import Gallery from './components/Sections/Gallery';
import About from './components/Sections/About';
import Contact from './components/Sections/Contact';
import Footer from './components/Layout/Footer';
import ScrollProgress from './components/Layout/ScrollProgress';
import BackToTop from './components/Layout/BackToTop';
import CustomCursor from './components/UI/CustomCursor';
import NoiseOverlay from './components/UI/NoiseOverlay';

// Fonts
import '@fontsource/cormorant-garamond/300.css';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/700.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';

const App: React.FC = () => {
    const lenisRef = useRef<Lenis | null>(null);

    // CRITICAL: Scroll to top IMMEDIATELY on mount - before anything else
    useEffect(() => {
        // Disable browser's automatic scroll restoration
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        // Force immediate scroll to top using multiple methods
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        // Also force it after a tiny delay to override any other scripts
        const timeout = setTimeout(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;

            // If Lenis is initialized, scroll it to top too
            if (lenisRef.current) {
                lenisRef.current.scrollTo(0, { immediate: true });
            }
        }, 0);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // Immediately scroll Lenis to top on initialization
        lenis.scrollTo(0, { immediate: true });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-[#e0e0e0] font-sans selection:bg-white selection:text-black">
            <Helmet>
                <title>Claroscuro | Fotografía Artística</title>
                <meta name="description" content="Portafolio de fotografía artística de Claroscuro. Explorando la esencia, la naturaleza y el espíritu a través de la lente." />
                <meta name="keywords" content="fotografía, arte, rosario, claroscuro, portafolio, blanco y negro, naturaleza" />
            </Helmet>
            <NoiseOverlay />
            <ScrollProgress />
            <Header />
            <main>
                <Hero />
                <Gallery />
                <About />
                <Contact />
            </main>
            <Footer />
            <BackToTop />
            <CustomCursor />
        </div>
    );
};

export default App;
