import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import * as React from 'react';

export interface IDashboardProps {
}

export default async function Dashboard(props: IDashboardProps) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        redirect('/login')
    }
    if (session.user.role === 'teacher') {
        redirect('/dashboard/teacher')
    } else if (session.user.role === 'student') {
        redirect('/dashboard/student')
    } else if (session.user.role === 'parent') {
        redirect('/dashboard/parent')
    } else if (session.user.role === 'admin') {
        redirect('/dashboard/admin')
    }
    return null
}
