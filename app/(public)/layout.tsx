import { PublicFooter } from '@/components/public/footer';
import { Navbar } from '@/components/public/navbar';
import * as React from 'react';

export interface IPublicLayoutProps {
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <section>
        {children}
      </section>
      <PublicFooter />
    </div>
  );
}
