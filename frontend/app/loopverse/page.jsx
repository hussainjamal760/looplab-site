'use client';

import { Navbar } from "@/features/navbar/Navbar";
import { Hero } from "@/features/loopverse-hero/Hero";
import { GalleryCta } from "@/features/gallery-cta/GalleryCta";
import { PastEvents } from "@/features/loopverse-past-events/PastEvents";
import { LanyardGallery } from "@/features/lanyard-gallery/LanyardGallery";
import Footer from "@/features/footer/components/Footer";
import { GalleryPage } from "@/features/gallery-page/GalleryPage";
import { WallModal } from "@/features/wall-modal/WallModal";

export default function LoopversePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <GalleryCta />
      <PastEvents />
      <LanyardGallery />

      {/* Main Homepage Footer */}
      <footer className="main-footer">
        <Footer />
      </footer>

      {/* Overlays */}
      <GalleryPage />
      <WallModal />
    </>
  );
}
