'use client';

import { Navbar } from '@/features/navbar/Navbar';
import Footer from '@/features/footer/components/Footer';
import LoopverseRegisterView from '@/features/loopverse-registration/LoopverseRegisterView';

export default function LoopverseRegisterPage() {
  return (
    <>
      <Navbar />
      <main>
        <LoopverseRegisterView />
      </main>
      <footer className="main-footer">
        <Footer />
      </footer>
    </>
  );
}
