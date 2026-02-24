'use client';

import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

export default function Step1Comp() {
    const router = useRouter();
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    const handleContinue = async () => {
        if (!role) return toast.error('Please select an account type');

        setLoading(true);
        try {
            // Save role to sessionStorage
            sessionStorage.setItem('signupStep', '1');
            sessionStorage.setItem('signupRole', role);

            const pathMap: Record<string, string> = {
                'student': '/signup/student/',
                "parent": '/signup/parent/',
            };

            router.push(pathMap[role]);
        } catch (err: any) {
            toast.error(err.message || 'Failed to start signup');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className='rounded-2xl shadow-xl'>
            <CardHeader>
                <CardTitle>
                    <div className="text-center space-y-4">
                        <Image
                            src="/images/OMSlogo.png"
                            alt="School Logo"
                            width={64}
                            height={64}
                            className="mx-auto" />
                        <p>Create Your Account</p>
                    </div>
                </CardTitle>
                <CardDescription className='text-center'>Join our learning community today!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold mb-4 text-center">STEP 1 OF 3: SELECT ACCOUNT TYPE</h3>

                    <RadioGroup value={role ?? ''} onValueChange={setRole}>
                        <div className="space-y-4">
                            <div className="border rounded-lg p-4 hover:border-blue-600 cursor-pointer">
                                <div className="flex items-start gap-3">
                                    <RadioGroupItem value="student" id="online"
                                        className="mt-1 data-[state=checked]:bg-blue-600 data-[state=checked]:text-blue-600" />
                                    <div>
                                        <Label htmlFor="online" className="font-medium cursor-pointer">
                                            STUDENT (Online Learning -SSS1-SSS3)
                                        </Label>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            For external students taking our online courses (Ages 14-18)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="border rounded-lg p-4 hover:border-blue-600 cursor-pointer">
                                <div className="flex items-start gap-3">
                                    <RadioGroupItem value="parent" id="parent"
                                        className="mt-1 data-[state=checked]:bg-blue-600 data-[state=checked]:text-blue-600" />
                                    <div>
                                        <Label htmlFor="parent" className="font-medium cursor-pointer">
                                            PARENT/GUARDIAN
                                        </Label>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            To monitor your child's progress and access parent portal features
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RadioGroup>
                </div>

                <Button
                    onClick={handleContinue}
                    disabled={loading || !role}
                    className={`w-full ${role ?
                        'cursor-pointer bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-500' :
                        'bg-primary text-white cursor-not-allowed'}`}
                    size="lg"
                >
                    {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : 'Continue'}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Log In
                    </a>
                </p>
            </CardContent>
        </Card>
    );
}