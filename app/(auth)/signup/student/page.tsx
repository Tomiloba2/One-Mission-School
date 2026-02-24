import { StudentSignUp } from '@/components/auth/signup/student/student';
import * as React from 'react';

export interface IStep2Props {
}

export default function Step2 (props: IStep2Props) {
  return (
    <div>
      <StudentSignUp/>
    </div>
  );
}
