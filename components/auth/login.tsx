"use client"

import z from "zod";
import * as React from 'react';
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Check, Eye, EyeOff, Loader2, X } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { Button } from "../ui/button";
import { signIn } from "@/lib/auth-client";

export interface ILoginCompProps {
}

const loginSchema = z.object({
    email: z.email({ message: 'Email or username is required' }),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Must contain at least one number')
        .regex(/[@$!#^%*?&]/, 'Must contain at least one special character (@$!%*?&)'),
    rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;


export function LoginComp(props: ILoginCompProps) {
    const router = useRouter()
    const [passwordStrength, setPasswordStrength] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string>()
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pw = e.target.value;
        let strength = 'Weak';
        if (pw.length === 0) {
            strength = ""
        }
        // Calculate strength
        if (pw.length >= 8 && /[A-Z]/.test(pw) && /[0-9]/.test(pw) && /[@$!%(){}#^*?&]/.test(pw)) strength = 'Strong';
        else if (pw.length >= 8 && /[A-Z]/.test(pw)) strength = 'Medium';
        setPasswordStrength(strength);
    };
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const { register, handleSubmit, formState: { errors, isValid, touchedFields } } = form;

    const onSubmit = async (values: LoginFormValues) => {
        try {
            const { error, data } = await signIn.email({
                email: values.email,
                password: values.password,
                rememberMe: values.rememberMe,
                callbackURL: "/dashboard/student"
            }, {
                onRequest(context) {
                    setLoading(true)
                },
                onSuccess(context) {
                    setLoading(false)
                    toast.success("Login successful!", {
                        description: "Welcome back",
                        duration: 5000,
                    });
                }, onError(context) {
                    console.log(context.error.message);
                    setLoading(false)
                    if (context.error.status === 403) {
                        setError("Please verify your email address")
                        toast.error("login failed", {
                            duration: 5000,
                            description: "Please verify your email address",
                        });
                    } else {
                        setError(context.error.message)
                        toast.error("login failed", {
                            duration: 5000,
                            description: context.error.message || "Something went wrong. Please try again.",
                        });
                    }
                },
            })
        } catch (error: any) {
            console.log(error);
            throw error.message
        }

    };

    return (
        <div>
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-card rounded-2xl shadow-2xl p-6 space-y-6">
                    <div className="text-center space-y-2">
                        {/* Larger Logo */}
                        <Image src="/images/OMSlogo.png" alt="School Logo" width={64} height={64} className="mx-auto" />
                        <h1 className="text-xl font-bold">Welcome Back!</h1>
                        <p className="text-muted-foreground text-sm">Log in to continue your learning journey</p>
                    </div>
                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email or Username */}
                        <div>
                            <Label htmlFor="email" className='mb-3 text-muted-foreground text-xs'>EMAIL</Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="Enter your email"
                                    className={`pr-8 ${errors.email ? 'border-destructive' : ''} ${touchedFields.email && !errors.email ? 'border-success' : ''}`}
                                    {...register('email')}
                                />
                                {touchedFields.email && !errors.email && (
                                    <Check className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-green-600" />
                                )}
                                {errors.email && (
                                    <X className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive" />
                                )}
                            </div>
                            {errors.email && (
                                <p className="text-sm text-destructive mt-1">⚠ {errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <Label htmlFor="password" className='mb-3 text-muted-foreground text-xs'>PASSWORD</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    className={`pr-10 ${errors.password ? 'border-destructive' : ''}`}
                                    {...register('password', { onChange: handlePasswordChange })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            <p className={`mt-2 text-xs ${passwordStrength === 'Weak' && "text-rose-700 "} ${passwordStrength === 'Strong' && "text-green-700 "} ${passwordStrength === 'Medium' && "text-amber-700 "}`}>Password strength: {passwordStrength}</p>
                            {/* Checkmarks for requirements */}
                            <div className="text-sm space-y-1">
                                <p className="text-muted-foreground">{/.{8,}/.test(form.watch('password')) ? <span className="text-green-600">✓</span> : <span className="text-rose-600">✗</span>} At least 8 characters</p>
                                <p className="text-muted-foreground">{/[A-Z]/.test(form.watch('password')) ? <span className="text-green-600">✓</span> : <span className="text-rose-600">✗</span>} Contains uppercase letter</p>
                                <p className="text-muted-foreground">{/[0-9]/.test(form.watch('password')) ? <span className="text-green-600">✓</span> : <span className="text-rose-600">✗</span>} Contains number</p>
                                <p className="text-muted-foreground">{/[@$!%*?&]/.test(form.watch('password')) ? <span className="text-green-600">✓</span> : <span className="text-rose-600">✗</span>} Contains special character</p>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-destructive mt-1">⚠ {errors.password.message}</p>
                            )}
                        </div>

                        {/* Remember Me and Forgot Password */}
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                                    id="rememberMe" {...register('rememberMe')} />
                                <Label htmlFor="rememberMe">Remember me</Label>
                            </div>
                            <Link href="/forgot-password" className="text-blue-500 hover:underline">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <Button
                            type="submit"
                            className={`w-full ${isValid ?
                                'cursor-pointer bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-500' :
                                'bg-primary text-white cursor-not-allowed'}`}
                            disabled={loading || !isValid}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    LOGGING IN...
                                </>
                            ) : (
                                'LOGIN'
                            )}
                        </Button>
                    </form>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-destructive/10 border border-destructive p-4 rounded-md text-destructive text-sm relative">
                            <p>⚠ LOGIN FAILED</p>
                            <p>{error}</p>
                            <button
                                className="absolute top-2 right-2 text-destructive"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    )}

                    {/* Sign Up Link */}
                    <p className="text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-blue-500 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
