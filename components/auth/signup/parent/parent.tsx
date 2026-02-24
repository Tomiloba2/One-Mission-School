"use client"


import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { parentSchema, parentType } from '@/lib/schema/authSchema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

export interface IParentStepProps {
}


export default function ParentStep(props: IParentStepProps) {
    const router = useRouter();
    const form = useForm<parentType>({
        resolver: zodResolver(parentSchema),
        defaultValues: {
            firstName: '',
            middleName: '',
            lastName: '',
            relationship: '',
            email: '',
            phone: '',
            numChildren: '1',
            children: [{ schoolId: '' }],
            weeklyReports: false,
            terms: false,
        },
        mode: 'onChange',
        reValidateMode: "onChange"
    });

    const { register, handleSubmit, watch, setValue, control, formState: { errors } } = form;
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'children',
    });

    const numChildren = watch('numChildren');
    const termsAgreed = watch('terms');

    const onSubmit = (data: parentType) => {
        // Save everything to sessionStorage
        sessionStorage.setItem('signupStep', '2');
        sessionStorage.setItem('signupData', JSON.stringify({
            role: "parent",
            ...data,
        }));

        // For parents → go directly to final password step
        router.push('/signup/final');
    };
    return (
        <Card className="border-none rounded-2xl shadow-xl">
            <CardHeader className="pb-4">
                <div className="text-center space-y-4">
                    {/* Larger Logo */}
                    <Image src="/images/OMSlogo.png" alt="School Logo" width={64} height={64} className="mx-auto" />
                </div>
                <div className="w-full flex items-center justify-center gap-3">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft size={20} />
                    </Button>
                    <div>
                        <CardTitle>
                            Parent/Guardian Signup
                        </CardTitle>
                        <p className="text-md mt-2 text-muted-foreground text-center">STEP 2 OF 3</p>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label className='mb-2'>First Name *</Label>
                            <Input {...register('firstName')} />
                            {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName.message}</p>}
                        </div>
                        <div>
                            <Label className='mb-2'>Middle Name</Label>
                            <Input {...register('middleName')} />
                        </div>
                        <div>
                            <Label className='mb-2'>Last Name </Label>
                            <Input {...register('lastName')} />
                            {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName.message}</p>}
                        </div>
                    </div>

                    {/* Relationship */}
                    <div>
                        <Label className='mb-2'>Relationship to Student(s)</Label>
                        <Select onValueChange={(v) => setValue('relationship', v)} value={watch('relationship')}>
                            <SelectTrigger>
                                <SelectValue placeholder="Please select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="father">Father</SelectItem>
                                <SelectItem value="mother">Mother</SelectItem>
                                <SelectItem value="guardian">Guardian</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.relationship && <p className="text-xs text-destructive mt-1">{errors.relationship.message}</p>}
                    </div>

                    {/* Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className='mb-2'>Email Address</Label>
                            <Input type="email" {...register('email')} />
                            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                            <Label className='mb-2'>Phone Number</Label>
                            <Input type="tel" {...register('phone')} />
                            {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
                        </div>
                    </div>
                    {/* Children Section */}
                    <div className="space-y-4">
                        <Label>How many children do you have enrolled at our school?</Label>
                        <Controller
                            name="numChildren"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="flex flex-wrap gap-6 "
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="1" id="1child" className='data-[state=checked]:bg-blue-600 data-[state=checked]:text-blue-600' />
                                        <Label htmlFor="1child">1 child</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="2+" id="2plus" className='data-[state=checked]:bg-blue-600 data-[state=checked]:text-blue-600' />
                                        <Label htmlFor="2plus">2+ children</Label>
                                    </div>
                                </RadioGroup>
                            )}
                        />
                        {errors.numChildren && (
                            <p className="text-xs text-destructive mt-1">{errors.numChildren.message}</p>
                        )}

                        <div className="space-y-4 mt-4">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex items-end gap-3">
                                    <div className="flex-1">
                                        <Label className='mb-2 text-foreground'>Student {index + 1} School ID </Label>
                                        <Input
                                            {...register(`children.${index}.schoolId` as const)}
                                            placeholder="Enter school ID (found in ward's dashboard settings)"
                                        />
                                        <p className='mt-1 text-xs text-foreground'>
                                            You can find your child's ID  under "Parent Link" in their account settings.
                                        </p>
                                        {errors.children?.[index]?.schoolId && (
                                            <p className="text-xs text-destructive mt-1">
                                                {errors.children[index]?.schoolId?.message}
                                            </p>
                                        )}
                                    </div>
                                    {fields.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => remove(index)}
                                            className="mb-2 text-destructive hover:text-destructive/90"
                                        >
                                            <Trash2 size={18} />
                                        </Button>
                                    )}
                                </div>
                            ))}

                            {watch('numChildren') === '2+' && fields.length < 8 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => append({ schoolId: '' })}
                                    className="mt-2"
                                >
                                    <Plus size={16} className="mr-2" />
                                    Add Another Child
                                </Button>
                            )}
                        </div>

                        {errors.children && !Array.isArray(errors.children) && (
                            <p className="text-sm text-destructive">{errors.children.message}</p>
                        )}
                    </div>
                    {/* Notifications */}
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            className='data-[state=checked]:bg-blue-600 data-[state=checked]:text-white'
                            id="weeklyReports"
                            checked={watch('weeklyReports')}
                            onCheckedChange={(checked) => setValue('weeklyReports', !!checked)}
                        />
                        <Label htmlFor="weeklyReports" className="text-sm cursor-pointer">
                            I want to receive weekly progress reports via email
                        </Label>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start space-x-3 pt-2">
                        <Checkbox
                            id="terms"
                            checked={form.watch('terms')}
                            onCheckedChange={(checked) => {
                                form.setValue('terms', checked === true, {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                });
                            }}
                            className={cn(errors.terms? "border-destructive data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground":"data-[state=checked]:bg-blue-600 data-[state=checked]:text-white")}
                        />
                        <div className="grid gap-0.5 leading-none">
                            <Label
                                htmlFor="terms"
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and{' '}
                                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                            </Label>
                            {errors.terms && <p className="text-xs text-destructive">{errors.terms.message}</p>}
                        </div>
                    </div>

                    <div className="flex justify-between pt-6">
                        <Button type="button" variant="outline" className='border-blue-500' onClick={() => router.back()}>
                            Back
                        </Button>
                        <Button type="submit" className='bg-blue-500 text-white hover:bg-blue-700'>
                            Continue
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card >
    );
}
