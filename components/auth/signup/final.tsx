// app/signup/verify/page.tsx
'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, Mail, Loader2, EyeOff, Eye } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { userSignupMinusPasswordType, userSignupType } from '@/lib/schema/authSchema';
import { PasswordForm, passwordSchema } from '@/lib/schema/authSchema';




export default function FinalSignup() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [signupData, setSignupData] = useState<userSignupMinusPasswordType>();


  // Password strength logic (simple example)
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
  const form = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const data = sessionStorage.getItem('signupData');
    const paymentRef = sessionStorage.getItem('paymentRef')
    const selectedOption = sessionStorage.getItem('selectedOption')
    if (!data) {
      router.replace('/signup');
      return;
    }

    const parsed = JSON.parse(data);
    if (parsed.role === 'student') {
      if (!paymentRef || !selectedOption) {
        router.replace('/signup/student/payment')
        return
      }
      setSignupData({ ...parsed, paymentRef: paymentRef, plan: selectedOption });
    } else {
      setSignupData({ ...parsed });
    }
    console.log(setSignupData);

  }, [router]);


  const { register, handleSubmit, formState: { errors } } = form;

  const results = useMutation({
    mutationFn: async (values: PasswordForm) => {
      try {
        if (!signupData) return null
        const datapayload: userSignupType = { ...signupData, password: values.password }

        const { data } = await axios.post('/api/auth/signup', datapayload)
        setEmail(data.data)
        return data;

      } catch (err: any) {
        if (axios.isAxiosError(error) && error.response) {
          console.error(error.response.data)
          console.error(error.response.status)
        }
        console.error(err);
        throw err
      }
    },
    mutationKey: ['finalizeSignup', signupData],
    onSuccess: () => {
      // clear session data
      sessionStorage.removeItem('signupData');
      sessionStorage.removeItem('signupStep');
      sessionStorage.removeItem('signupRole');
      sessionStorage.removeItem('paymentRef');
      //show toast notification
      toast.success("Account created successfully!", {
        description: "Welcome! Check your email to verify your account.",
        duration: 5000,
      });
    },
    onError: (error: any) => {
      toast.error("Signup failed", {
        description: error.message || "Something went wrong. Please try again.",
      });
    }
  })

  const error = results.error as any;

  const onSubmit = async (values: PasswordForm) => {
    if (!signupData) return;
    results.mutate(values)

  };

  if (results.isPending) {
    return (
      <Card className="text-center py-12 shadow-xl">
        <CardContent className="space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600" />
          <p className="text-lg font-medium text-blue">Finalizing your account...</p>
          <p className="text-sm text-muted-foreground">Please wait a moment</p>
        </CardContent>
      </Card>
    );
  }

  if (results.isError) {
    return (
      <Card className='shadow-xl'>
        <CardHeader>
          <CardTitle className="text-destructive">Oops!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Go Back
            </Button>
            <Button onClick={() => router.replace('/signup')}>
              Start Over
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Success state
  if (results.isSuccess) {
    return (
      <Card className="border-none shadow-lg text-center">
        <CardHeader className="pb-2">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl">Registration Successful!</CardTitle>
          <CardDescription className="text-base mt-2">
            Welcome to One Mission School, {email.split('@')[0]}!
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Mail className="h-10 w-10 text-primary" />
            </div>
            <p className="text-lg font-medium">Check your email</p>
            <p className="text-muted-foreground">
              We've sent a confirmation to <strong>{email}</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              {message}
            </p>
          </div>

          <div className="bg-muted/50 p-6 rounded-lg space-y-4">
            <h3 className="font-medium">What's Next?</h3>
            <ul className="text-sm text-left space-y-2 list-disc pl-5">
              <li>Verify your email (check spam folder if needed)</li>
              {signupData?.role === 'student' && (
                <>
                  <li>Your 7-day free trial has started</li>
                  <li>Browse courses and start learning immediately</li>
                </>
              )}
              {signupData?.role === 'parent' && (
                <li>Access parent dashboard to link your child(ren)</li>
              )}
            </ul>
          </div>

          <p className="text-xs text-muted-foreground pt-4">
            Need help? <Link href="/support" className="text-blue-500 hover:underline">Contact Support</Link>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle>Almost There - Set Your Password</CardTitle>
        <CardDescription>
          Choose a strong password to complete your registration
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Summary of what was collected */}
        <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-2">
          <p><strong>Account Type:</strong> {signupData?.role.replace('-', ' ').toUpperCase()}</p>
          <p><strong>Name:</strong> {signupData?.firstName} {signupData?.lastName}</p>
          <p><strong>Email:</strong> {signupData?.email}</p>
          {signupData?.role === 'student' && (
            <p><strong>Plan:</strong> {signupData?.plan || 'Not selected yet'}</p>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className='space-y-2'>
            <Label className='mb-3 text-muted-foreground text-xs'>CREATE PASSWORD</Label>
            <div className="relative">
              <Input type={showPassword ? 'text' : 'password'} {...register('password', { onChange: handlePasswordChange })} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
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
            {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
          </div>
          <div className='space-y-2'>
            <Label className=' mb-3 text-muted-foreground text-xs'>CONFIRM PASSWORD</Label>
            <div className="relative">
              <Input type={showConfirmPassword ? 'text' : 'password'} {...register('confirmPassword')} />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>}
          </div>
          {results.error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error?.message}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className={`w-full ${form.formState.isValid ?
            'cursor-pointer bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-500' :
            'bg-primary text-white cursor-not-allowed'}`}
            disabled={results.isPending || !form.formState.isValid}>
            {results.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              'Create Account & Finish'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}