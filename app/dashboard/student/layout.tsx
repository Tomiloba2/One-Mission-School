import { StudentDashboardNav } from '@/components/student/nav';
import * as React from 'react';

export interface IStudentLayoutProps {
}

export default function StudentLayout({ children }: { children: React.ReactNode }) {
    return (
        <div  className="min-h-screen flex flex-col bg-background">
            <StudentDashboardNav />
            {children}
        </div>
    );
}
