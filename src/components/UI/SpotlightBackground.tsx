import React, { useEffect, useRef } from 'react';

const SpotlightBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        let targetMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            targetMouse.x = e.clientX;
            targetMouse.y = e.clientY;
        };

        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor;
        };

        const animate = () => {
            // Smooth mouse movement
            mouse.x = lerp(mouse.x, targetMouse.x, 0.1);
            mouse.y = lerp(mouse.y, targetMouse.y, 0.1);

            // Clear canvas
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Create spotlight gradient
            // Inner circle is transparent (revealing nothing/black), outer is dark
            // Actually, for "Claroscuro", we want light in the dark.
            // So we paint a radial gradient of light on top of the dark background.

            const gradient = ctx.createRadialGradient(
                mouse.x,
                mouse.y,
                0,
                mouse.x,
                mouse.y,
                400 // Radius of the spotlight
            );

            // Light center, fading to dark
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.08)'); // Very subtle light
            gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.02)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Simple noise loop removed for performance


            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full bg-[#050505] pointer-events-none"
        />
    );
};

export default SpotlightBackground;
