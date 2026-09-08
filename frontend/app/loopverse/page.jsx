'use client';

import { Navbar } from "@/features/navbar/Navbar";
import LoopverseDetailsView from "@/features/loopverse-details/LoopverseDetailsView";
import Footer from "@/features/footer/components/Footer";
import { GalleryPage } from "@/features/gallery-page/GalleryPage";
import { WallModal } from "@/features/wall-modal/WallModal";

export default function LoopversePage() {
  return (
    <>
      <Navbar />
      <main>
        <LoopverseDetailsView />
      </main>

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
