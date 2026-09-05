'use client';

import Link from 'next/link';
import { Infinity } from 'lucide-react';

export default function AdminBadgeHeader() {
  return (
    <header className="admin-header">
      <Link href="/" className="admin-brand">
        <Infinity size={28} strokeWidth={2.5} color="#9E00FE" />
        <span className="admin-brand-logo">LOOPLAB</span>
      </Link>
      <div className="admin-status-pill">
        <span className="admin-status-dot" />
        SECURE ADMIN GATEWAY
      </div>
    </header>
  );
}
