import Link from 'next/link';
import Image from 'next/image';

export interface IAuthNavProps {
}

export function AuthNav (props: IAuthNavProps) {
  return (
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          {/* Replace with actual logo */}
          <Image src="/images/OMSlogo.png" alt="School Logo" width={64} height={64} />
        </div>
        <Link href="/" className="text-sm text-muted-foreground hover:underline">
          &lt; BACK TO WEBSITE
        </Link>
      </header>
  );
}
