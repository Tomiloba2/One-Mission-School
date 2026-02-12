import { PublicAbout } from '@/components/public/about';
import * as React from 'react';

export interface IAboutProps {
}

export default function About(props: IAboutProps) {
  return (
    <div>
      <PublicAbout />
    </div>
  );
}
