import * as React from 'react';
import PublicAdmissions from '@/components/public/admission';

export interface IProgramsPageProps {
}

export default function AdmissionsPage (props: IProgramsPageProps) {
  return (
    <div>
      <PublicAdmissions/>
    </div>
  );
}
