import { AuthFooter } from '@/components/auth/footer';
import { AuthNav } from '@/components/auth/nav';

export interface IAuthLayoutProps {
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div  className="min-h-screen flex flex-col bg-background">
            <AuthNav/>
            <div>
                {children}
            </div>
            <AuthFooter />
        </div>
    );
}
