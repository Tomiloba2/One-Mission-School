// app/forgot-password/page.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { requestPasswordReset } from '@/lib/auth-client';


const forgotSchema = z.object({
    email: z.email('Invalid email address'),
});

type ForgotValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
    const [sent, setSent] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ForgotValues>({
        resolver: zodResolver(forgotSchema),
        defaultValues: { email: '' },
    });

    const onSubmit = async (values: ForgotValues) => {
        setIsLoading(true);
        setError(null);

        try {
            const { data, error } = await requestPasswordReset({
                email: values.email,
                redirectTo: process.env.NEXT_PUBLIC_RESET_EMAIL
            })
            if (error) throw error;
            setSent(true);
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <main className="flex-1 flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-md">
                    <Card className='shadow-xl'>
                        <CardHeader className="text-center">
                            <div className="text-center space-y-4">
                                {/* Larger Logo */}
                                <Image src="/images/OMSlogo.png" alt="School Logo" width={64} height={64} className="mx-auto" />
                            </div>
                            <CardTitle>Forgot Your Password?</CardTitle>
                            <CardDescription>Enter the email address associated with your account and we'll send you instructions to reset your password.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {sent ? (
                                <div className="text-center text-primary/50 space-y-2">
                                    <p className="text-xl">✉️</p>
                                    <CardTitle>Check Your Email</CardTitle>
                                    <p>We've sent password reset instructions to: {form.watch('email')}</p>
                                    <p>Please check your email and click the reset link. The link will expire in 1 hour.</p>
                                    <p className="mt-4 text-left">Didn't receive the email?</p>
                                    <ul className="text-sm text-left text-muted-foreground list-disc pl-4">
                                        <li>Check your spam/junk folder</li>
                                        <li>Make sure you entered the correct email</li>
                                        <li>[Resend Email] (Available in 00:59)</li>
                                    </ul>
                                    <Link href="/login" className="block mt-4 text-blue-500 hover:underline">&lt; Back to Login</Link>
                                </div>
                            ) : (
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <div>
                                        <Label htmlFor="email" className='mb-3 text-muted-foreground text-xs'>EMAIL ADDRESS</Label>
                                        <Input id="email" placeholder="Enter your email" {...form.register('email')} />
                                        {form.formState.errors.email && <p className="text-destructive text-sm">{form.formState.errors.email.message}</p>}
                                    </div>
                                    {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
                                    <Button type="submit"
                                        className={`w-full ${form.formState.isValid ?
                                            'cursor-pointer bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-500' :
                                            'bg-primary text-white cursor-not-allowed'}`}
                                        disabled={isLoading|| !form.formState.isValid}>
                                        {isLoading ? <Loader2 className="animate-spin" /> : 'SEND RESET INSTRUCTIONS'}
                                    </Button>
                                    <Link href="/login" className="block text-center text-blue-500 hover:underline text-sm">&lt; Back to Login</Link>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </div>
    );
}