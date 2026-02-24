"use client"

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { toast } from 'sonner';

export interface IPaymentProps {
}


const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!;

const pricingOptions = {
  prerecorded: {
    name: 'Pre-Recorded Courses',
    description: 'Access to on-demand video courses similar to Coursera/Udemy. One-off purchase for all prerecorded course.',
    price: 2000,
    isSubscription: false,
  },
  interactive: {
    name: 'Interactive & Live Sessions',
    description: 'Live classes, quizzes, CBT, and interactive coaching. Monthly billing.',
    price: 5000,
    isSubscription: true,
  },
  bundle: {
    name: 'Both Options',
    description: 'Access to pre-recorded courses + interactive/live sessions. Monthly billing with one-off course unlocks.',
    price: 6000,
    isSubscription: true,
  },
};

type OptionKey = keyof typeof pricingOptions;

export default function PaymentPage(props: IPaymentProps) {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = React.useState<OptionKey>('prerecorded');
  const [agreed, setAgreed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [signupData, setSignupData] = React.useState<any>();

  React.useEffect(() => {
    const data = sessionStorage.getItem('signupData');
    if (!data) {
      router.replace('/signup/step1');
      return;
    }
    const parsed = JSON.parse(data);
    if (parsed.role !== 'student') {
      router.replace('/signup/step1');
      return;
    }
    setSignupData(parsed);
  }, [router]);

  const handlePayment = async () => {
    if (!agreed) return toast.error('You must agree to the terms');

    setLoading(true);
    try {
      if (!navigator.onLine) {
        throw new Error("No Network connection available. Ensure you are connected to the internet");

      }
      const amount = selectedOption === 'prerecorded' ? 200000 : selectedOption === 'interactive' ? 500000 : 600000; // kobo

      // Initialize Paystack payment
      const PaystackPop = (await import('@paystack/inline-js')).default
      const popup = new PaystackPop();
      popup.newTransaction({
        key: PAYSTACK_PUBLIC_KEY,
        email: signupData?.email,
        currency: 'NGN',
        amount,
        reference: `signup_${Date.now()}`,
        metadata: {
          custom_fields: [
            {
              display_name: "role",
              variable_name: "role",
              value: signupData.role
            }, {
              display_name: "selected_option",
              variable_name: "selected_option",
              value: selectedOption
            },
          ]
        },
        onSuccess: async (tx: any) => {
          try {
            sessionStorage.setItem('paymentRef', tx.reference);
            sessionStorage.setItem('signupStep', '3');
            sessionStorage.setItem('selectedOption', selectedOption);
            toast.success('Payment successful!');
            router.push(`/signup/final`);
          } catch (err) {
            toast.error('Payment succeeded but profile update failed.');
          }
        },
        onCancel: () => {
          setLoading(false);
          toast.info('Payment cancelled');
        },
      });
    } catch (error: any) {
      setLoading(false)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="text-center space-y-4">
            {/* Larger Logo */}
            <Image src="/images/OMSlogo.png" alt="School Logo" width={64} height={64} className="mx-auto" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <CardTitle>Choose Your Learning Option</CardTitle>
          </div>
          <CardDescription>Select your preferred access and complete payment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={selectedOption}
            onValueChange={(v) => setSelectedOption(v as OptionKey)}
            className="grid gap-4"
          >
            {Object.entries(pricingOptions).map(([key, option]) => (
              <div
                key={key}
                className={
                  `flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors 
                  ${selectedOption === key ? 'border-blue-500 bg-blue-50' : 'hover:bg-muted/50'
                  }`
                }
              >
                <RadioGroupItem value={key} id={key} className="mt-1 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
                <div className="flex-1">
                  <Label htmlFor={key} className="font-medium cursor-pointer">
                    {option.name}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                  <p className="font-semibold mt-2">
                    {option.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                    {option.isSubscription ? ' / month' : ' one-off per course'}
                  </p>
                </div>
                {selectedOption === key && <Check className="h-5 w-5 text-blue-500 mt-1" />}
              </div>
            ))}
          </RadioGroup>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(!!checked)}
                className='data-[state=checked]:bg-blue-600 data-[state=checked]:text-white'
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
              </Label>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handlePayment}
            disabled={loading || !agreed}
            className="w-full bg-blue-500 text-white hover:bg-blue-700 disabled:bg-muted disabled:text-muted-foreground"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Proceed to Payment'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
