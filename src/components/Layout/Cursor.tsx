import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '5px',
                    height: '5px',
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    zIndex: 9999,
                    pointerEvents: 'none'
                }}
                animate={{
                    x: mousePosition.x - 2.5,
                    y: mousePosition.y - 2.5,
                }}
                transition={{ type: 'tween', ease: 'backOut', duration: 0 }}
            />
            <motion.div
                className="fixed top-0 left-0 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    border: '1px solid rgba(255,255,255,0.5)',
                    borderRadius: '50%',
                    zIndex: 9998,
                    pointerEvents: 'none'
                }}
                animate={{
                    width: isHovering ? 60 : 30,
                    height: isHovering ? 60 : 30,
                    x: mousePosition.x - (isHovering ? 30 : 15),
                    y: mousePosition.y - (isHovering ? 30 : 15),
                    backgroundColor: isHovering ? 'rgba(255,255,255,0.1)' : 'transparent'
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            />
        </>
    );
};

export default Cursor;
