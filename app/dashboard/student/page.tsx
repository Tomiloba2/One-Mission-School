import StudentDashboard from '@/components/student/studentCom';
import * as React from 'react';

export interface IStudentDashboardPageProps {
}

export default function StudentDashboardPagePage(props: IStudentDashboardPageProps) {
    return (
        <div>
            <StudentDashboard />
        </div>
    );
}
