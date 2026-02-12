import * as React from 'react';
import PublicProgram from '@/components/public/program';

export interface IProgramsPageProps {
}

export default function ProgramsPage(props: IProgramsPageProps) {
  return (
    <div>
      <PublicProgram />
    </div>
  );
}
