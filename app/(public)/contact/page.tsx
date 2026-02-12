import * as React from 'react';
import PublicContact from '@/components/public/contact';

export interface IContactPageProps {
}

export default function ContactPage (props: IContactPageProps) {
  return (
    <div>
      <PublicContact/>
    </div>
  );
}
