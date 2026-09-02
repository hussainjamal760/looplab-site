'use client';

import SvgSymbols from '@/components/ui/SvgSymbols';
import Navbar from '@/features/navigation/components/Navbar';
import VimeoHero from '@/features/hero/components/VimeoHero';
import ServiceCards from '@/features/service-cards/components/ServiceCards';
import MotionCards from '@/features/motion-cards/components/MotionCards';
import Showreel from '@/features/showreel/components/Showreel';
import DoubleMarquee from '@/features/marquee/components/DoubleMarquee';
import Footer from '@/features/footer/components/Footer';
import TransitionScribble from '@/features/effects-and-cursor/components/TransitionScribble';
import CursorBubble from '@/features/effects-and-cursor/components/CursorBubble';
import SmoothScroll from '@/features/effects-and-cursor/components/SmoothScroll';
import HorizontalWords from '@/features/horizontal-words/components/HorizontalWords';

export default function Home() {
    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />
            <header className="main-header">
                <Navbar />
                <VimeoHero />
            </header>
            <HorizontalWords />
            <main>
                <div className="content-section motion-cards-wrapper">
                    <MotionCards />
                </div>
                <Showreel />
                <div className="content-section service-cards-wrapper">
                    <ServiceCards />
                </div>
            </main>
            <section className="Double-marquee">
                <DoubleMarquee />
            </section>
            <footer className="main-footer">
                <Footer />
            </footer>
            <TransitionScribble />
        </>
    );
}
