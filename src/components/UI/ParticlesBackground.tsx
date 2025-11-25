import React, { useEffect, useRef } from 'react';

const ParticlesBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouse = { x: -1000, y: -1000 };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            baseX: number;
            baseY: number;
            density: number;
            color: string;
            opacity: number;
            speedX: number;
            speedY: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = Math.random() * 1.5 + 0.5; // Subtle: 0.5px to 2px
                this.speedX = Math.random() * 0.3 - 0.15; // Slow, elegant movement
                this.speedY = Math.random() * 0.3 - 0.15;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 15) + 1;
                this.opacity = Math.random() * 0.2 + 0.1; // Very subtle: 0.1 to 0.3

                // Muted, elegant colors
                const colors = ['#e8e8e8', '#d4d4d4', '#c9a961', '#b8a06f'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas!.width) this.speedX = -this.speedX;
                if (this.y < 0 || this.y > canvas!.height) this.speedY = -this.speedY;

                // Subtle mouse interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 120;

                if (distance < maxDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (maxDistance - distance) / maxDistance;
                    const directionX = forceDirectionX * force * this.density;
                    const directionY = forceDirectionY * force * this.density;

                    // Very gentle attraction
                    this.x += directionX * 0.3;
                    this.y += directionY * 0.3;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        const initParticles = () => {
            particles = [];
            const particleCount = Math.min(window.innerWidth * 0.05, 60); // Fewer particles
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const connectParticles = () => {
            if (!ctx) return;
            for (let a = 0; a < particles.length; a++) {
                const dxMouse = mouse.x - particles[a].x;
                const dyMouse = mouse.y - particles[a].y;
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                if (distMouse < 120) {
                    ctx.strokeStyle = particles[a].color;
                    ctx.lineWidth = 0.3; // Thinner lines
                    ctx.globalAlpha = (1 - distMouse / 120) * 0.15; // Very subtle
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
            ctx.globalAlpha = 1;
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            connectParticles();
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
            className="absolute inset-0 w-full h-full bg-[#050505]"
        />
    );
};

export default ParticlesBackground;
