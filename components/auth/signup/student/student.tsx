"use client"

import * as React from 'react';
import { generateSchoolId } from '@/lib/helperFunctions/generateSchoolId';
import { studentSchema, studentType } from '@/lib/schema/authSchema';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

export interface IStudentSignUpProps {
}


export function StudentSignUp(props: IStudentSignUpProps) {
    const router = useRouter();

    const form = useForm<studentType>({
        resolver: zodResolver(studentSchema),
        defaultValues: {
            firstName: '',
            middleName: '',
            lastName: '',
            day: '',
            month: '',
            year: '',
            gender: undefined,
            email: '',
            phone: '',
            parentName: '',
            parentEmail: '',
            parentPhone: '',
            terms: false,
        },
    });

    const { register, handleSubmit, watch, setValue, formState: { errors } } = form;

    const onSubmit = async (data: studentType) => {
        const schoolId = generateSchoolId()
        try {
            const { email, day, month, year, phone, parentEmail, parentName, parentPhone, terms, gender,
                firstName, middleName, lastName,
            } = data
            // Save ALL data to sessionStorage
            sessionStorage.setItem('signupStep', '2');
            sessionStorage.setItem('signupData', JSON.stringify({
                role: 'student',
                schoolId,
                email, day, month, year, phone, parentEmail, parentName, parentPhone, terms, gender,
                firstName, middleName, lastName,
            }));
            toast.success('Details saved!');
            router.push('/signup/student/payment');
        } catch (err: any) {
            toast.error(err.message || 'Failed to save information');
        }
    };


    return (
        <div>
            <Card className="border-none shadow-2xl rounded-2xl">
                <CardHeader className="pb-4">
                    <div className="text-center space-y-4">
                        <Image src="/images/OMSlogo.png" alt="School Logo" width={64} height={64} className="mx-auto" />
                    </div>
                    <div className="w-full flex items-center justify-center gap-3">
                        <div className='text-center'>
                            <CardTitle>
                                Student (JSS3/SSS3)
                            </CardTitle>
                            <p className="text-md mt-2 text-muted-foreground">STEP 2 OF 3</p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Full Name */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Label className='mb-2'>First Name</Label>
                                <Input {...register('firstName')} />
                                {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName.message}</p>}
                            </div>
                            <div>
                                <Label className='mb-2'>Middle Name</Label>
                                <Input {...register('middleName')} />
                            </div>
                            <div>
                                <Label className='mb-2'>Last Name *</Label>
                                <Input {...register('lastName')} />
                                {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName.message}</p>}
                            </div>
                        </div>

                        {/* DOB */}
                        <div>
                            <Label className='mb-2'>Date of Birth *</Label>
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <Select onValueChange={(v) => setValue('day', v)} value={watch('day')}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Day" />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-60">
                                            {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                                                <SelectItem key={d} value={d.toString()}>{d}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Select onValueChange={(v) => setValue('month', v)} value={watch('month')}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Month" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                                                <SelectItem key={m} value={m.toString()}>{m.toString().padStart(2, '0')}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Select onValueChange={(v) => setValue('year', v)} value={watch('year')}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Year" />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-60">
                                            {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(y => (
                                                <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            {(errors.day || errors.month || errors.year) && (
                                <p className="text-xs text-destructive mt-1">Please select a valid date of birth</p>
                            )}
                        </div>

                        {/* Gender */}
                        <div>
                            <Label className='mb-2'>Gender</Label>
                            <RadioGroup
                                onValueChange={(v) => setValue('gender', v as 'male' | 'female')}
                                value={watch('gender')}
                                className="flex gap-6 mt-2"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="male" id="male" className='data-[state=checked]:bg-blue-600 data-[state=checked]:text-white' />
                                    <Label htmlFor="male">Male</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="female" id="female" className='data-[state=checked]:bg-blue-600 data-[state=checked]:text-white' />
                                    <Label htmlFor="female">Female</Label>
                                </div>
                            </RadioGroup>
                            {errors.gender && <p className="text-xs text-destructive mt-1">{errors.gender.message}</p>}
                        </div>
                        {/* Contact Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label className='mb-2'>Email Address</Label>
                                <Input type="email" {...register('email')} />
                                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                            </div>
                            <div>
                                <Label className='mb-2'>Phone Number</Label>
                                <Input type="tel" {...register('phone')} placeholder="+234" />
                                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
                            </div>
                        </div>
                        {/* Parent/Guardian Info */}
                        <div className="space-y-4 border-t pt-6">
                            <h3 className="font-medium">Parent/Guardian Information</h3>
                            <div>
                                <Label>Parent/Guardian Name *</Label>
                                <Input {...register('parentName')} />
                                {errors.parentName && <p className="text-xs text-destructive mt-1">{errors.parentName.message}</p>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label className='mb-2'>Parent/Guardian Email</Label>
                                    <Input type="email" {...register('parentEmail')} />
                                    {errors.parentEmail && <p className="text-xs text-destructive mt-1">{errors.parentEmail.message}</p>}
                                </div>
                                <div>
                                    <Label className='mb-2'>Parent/Guardian Phone </Label>
                                    <Input type="tel" {...register('parentPhone')} />
                                    {errors.parentPhone && <p className="text-xs text-destructive mt-1">{errors.parentPhone.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-start space-x-3 pt-4">
                            <Checkbox
                                id="terms"
                                checked={form.watch('terms')}
                                onCheckedChange={(checked) => {
                                    form.setValue('terms', checked === true, { shouldValidate: true });
                                }}
                                className={cn(errors.terms ? "border-destructive":"data-[state=checked]:bg-blue-600 data-[state=checked]:text-white")}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <Label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and{' '}
                                    <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                                </Label>
                                {errors.terms && <p className="text-xs text-destructive">{errors.terms.message}</p>}
                            </div>
                        </div>

                        <div className="flex justify-between pt-6">
                            <Button type="button" variant="outline" className='border-blue-500'
                                onClick={() => router.back()}>
                                Back
                            </Button>
                            <Button type="submit" className='bg-blue-500 text-white hover:bg-blue-700'>
                                Continue to Payment
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
