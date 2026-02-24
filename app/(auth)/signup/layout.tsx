// app/signup/layout.tsx
'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Progress } from '@/components/ui/progress'; // Shadcn Progress component
import { cn } from '@/lib/utils'; // Optional: for className merging

export default function SignupLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  // Map routes to step numbers (adjust paths to match your structure)
  const getStepFromPath = () => {
    const path = pathname;

    if (path.endsWith('/signup')) return 1;
    if (path.includes('/step2') || path.includes('/parent')) return 2;
    if (path.endsWith('/payment')) return 3;
    if (path.endsWith('/final')) return 4;

    return 1;
  };

  const currentStep = getStepFromPath();
  const totalSteps = 4;

  const stepTitles = [
    'Choose Account Type',
    'Your Information',
    'Payment',
    "Create account"
  ];

  return (
    <div>
      {/* Progress Bar */}
      <div className="border-b">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-muted-foreground">
                {stepTitles[currentStep - 1] || 'Complete'}
              </span>
            </div>

            <Progress
              value={(currentStep / totalSteps) * 100}
              className="h-2 rounded-full [&>div]:bg-blue-500"
            />

            {/* Optional: small dots under the bar for visual steps */}
            <div className="flex justify-between mt-1">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    i + 1 <= currentStep
                      ? "bg-blue-500"
                      : "bg-muted-foreground/30"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-lg">
          {children}
        </div>
      </main>
    </div>
  );
}