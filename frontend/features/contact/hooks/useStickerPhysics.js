import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useStickerPhysics() {
    useEffect(() => {
        const stickers = document.querySelectorAll('.contact-hero__sticker, .card-sticker');
        if (!stickers.length) return;

        let prevX = 0;
        let prevY = 0;
        const PROXIMITY = 160;
        const STRENGTH = 3.5;

        const onMouseMove = (e) => {
            const dx = e.clientX - prevX;
            const dy = e.clientY - prevY;
            prevX = e.clientX;
            prevY = e.clientY;
            const speed = Math.hypot(dx, dy);
            if (speed < 2) return;

            stickers.forEach((sticker) => {
                const rect = sticker.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dist = Math.hypot(e.clientX - cx, e.clientY - cy);

                if (dist < PROXIMITY) {
                    const falloff = 1 - dist / PROXIMITY;
                    const pushX = Math.max(-45, Math.min(45, dx * STRENGTH * falloff));
                    const pushY = Math.max(-45, Math.min(45, dy * STRENGTH * falloff));

                    gsap.killTweensOf(sticker);
                    gsap.to(sticker, { x: pushX, y: pushY, rotation: pushX * 0.2, duration: 0.18, ease: 'power3.out' });
                    gsap.to(sticker, { x: 0, y: 0, rotation: 0, duration: 1.0, ease: 'elastic.out(1, 0.35)', delay: 0.18 });
                }
            });
        };

        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);
}
