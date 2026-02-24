import Link from 'next/link';

export interface IAuthFooterProps {
}

export function AuthFooter(props: IAuthFooterProps) {
    const year = new Date().getFullYear();
    return (
        <footer className="p-4 text-center text-sm text-muted-foreground">
            <div className="space-x-4">
                <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                <span>|</span>
                <Link href="/terms" className="hover:underline">Terms of Service</Link>
                <span>|</span>
                <Link href="/help" className="hover:underline">Need Help?</Link>
            </div>
            <p>© {year} One Mission School. All rights reserved.</p>
        </footer>
    );
}
