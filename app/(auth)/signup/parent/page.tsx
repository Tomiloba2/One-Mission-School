import ParentStep from '@/components/auth/signup/parent/parent';
import * as React from 'react';

export interface IParentSignupProps {
}

export default function ParentSignup(props: IParentSignupProps) {
    return (
        <div>
            <ParentStep />
        </div>
    );
}
