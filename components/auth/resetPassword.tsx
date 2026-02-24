// app/reset-password/page.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetPassword } from '@/lib/auth-client';
import Image from 'next/image';
import { toast } from 'sonner';


const resetSchema = z.object({
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Must contain at least one number')
        .regex(/[@$!#^%*?&]/, 'Must contain at least one special character (@$!%*?&)'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

type ResetValues = z.infer<typeof resetSchema>;

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams.get('token');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');

    const form = useForm<ResetValues>({
        resolver: zodResolver(resetSchema),
        defaultValues: { password: '', confirmPassword: '' },
    });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pw = e.target.value;
        let strength = 'Weak';
        if (pw.length === 0) {
            strength = ""
        }
        if (pw.length >= 8 && /[A-Z]/.test(pw) && /[0-9]/.test(pw) && /[@$^#!%*?&]/.test(pw)) strength = 'Strong';
        else if (pw.length >= 8 && /[A-Z]/.test(pw)) strength = 'Medium';
        setPasswordStrength(strength);
    };

    const onSubmit = async (values: ResetValues) => {
        if (!code) {
            toast.error("Password reset failed", {
                duration: 5000,
                description: "Invalid reset Link.",
            });
            return setError('Invalid reset link')
        };
        setIsLoading(true);
        setError(null);
        try {

            const { data, error } = await resetPassword({
                newPassword: values.password,
                token: code
            })
            if (error) throw error;
            setSuccess(true);
        } catch (err: any) {
            toast.error("Password reset failed", {
                duration: 5000,
                description: err.message || 'An error occurred',
            });
            setError(err.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Card className="max-w-md shadow-xl">
                        <CardHeader className="text-center">
                            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                            <CardTitle>Password Reset Successful!</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p>Your password has been changed successfully.</p>
                            <p>You can now log in with your new password.</p>
                            <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-700" onClick={() => router.push('/login')}>GO TO LOGIN PAGE →</Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="flex-1 flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-md">
                    <Card className='shadow-xl'>
                        <CardHeader className="text-center">
                            <div className="text-center space-y-4">
                                {/* Larger Logo */}
                                <Image src="/images/OMSlogo.png" alt="School Logo" width={64} height={64} className="mx-auto" />
                            </div>
                            <CardTitle>Create New Password</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <Label className='mb-3 text-muted-foreground text-xs'>NEW PASSWORD</Label>
                                    <div className="relative">
                                        <Input type={showPassword ? 'text' : 'password'} {...form.register('password', { onChange: handlePasswordChange })} />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    <p className={`mt-2 text-xs ${passwordStrength === 'Weak' && "text-rose-700 "} ${passwordStrength === 'Strong' && "text-green-700 "} ${passwordStrength === 'Medium' && "text-amber-700 "}`}>Password strength: {passwordStrength}</p>
                                    <div className="text-sm space-y-1">
                                        <p className="text-muted-foreground">{/.{8,}/.test(form.watch('password')) ? <span className="text-green-600">✓</span> : <span className="text-rose-600">✗</span>} At least 8 characters</p>
                                        <p className="text-muted-foreground">{/[A-Z]/.test(form.watch('password')) ? <span className="text-green-600">✓</span> : <span className="text-rose-600">✗</span>} Contains uppercase letter</p>
                                        <p className="text-muted-foreground">{/[0-9]/.test(form.watch('password')) ? <span className="text-green-600">✓</span> : <span className="text-rose-600">✗</span>} Contains number</p>
                                        <p className="text-muted-foreground">{/[@$!%*?&]/.test(form.watch('password')) ? <span className="text-green-600">✓</span> : <span className="text-rose-600">✗</span>} Contains special character</p>
                                    </div>
                                    {form.formState.errors.password && <p className="text-destructive text-sm">{form.formState.errors.password.message}</p>}
                                </div>
                                <div>
                                    <Label className='mb-3 text-muted-foreground text-xs'>CONFIRM NEW PASSWORD </Label>
                                    <div className="relative">
                                        <Input type={showConfirmPassword ? 'text' : 'password'} {...form.register('confirmPassword')} />
                                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    {form.formState.errors.confirmPassword && <p className="text-destructive text-sm">{form.formState.errors.confirmPassword.message}</p>}
                                </div>
                                {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
                                <Button type="submit"
                                    className={`w-full ${form.formState.isValid ?
                                        'cursor-pointer bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-500' :
                                        'bg-primary text-white cursor-not-allowed'}`}
                                    disabled={isLoading || !form.formState.isValid}>
                                    {isLoading ? <Loader2 className="animate-spin" /> : 'RESET PASSWORD'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </div>
    );
}