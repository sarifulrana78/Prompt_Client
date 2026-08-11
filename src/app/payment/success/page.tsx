'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        toast.error('Payment session missing');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/payments/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        if (data.success) {
          setSuccess(true);
          toast.success('Payment verified! Premium activated.');
        } else {
          toast.error(data.message || 'Payment verification failed');
        }
      } catch (err: unknown) {
        console.error(err);
        toast.error('Unable to verify payment');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full bg-card border border-border rounded-3xl p-12 shadow-xl text-center">
        {loading ? (
          <div className="space-y-6">
            <div className="mx-auto w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            <p className="text-gray-400">Verifying your payment, please wait...</p>
          </div>
        ) : success ? (
          <>
            <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Payment Successful</h1>
            <p className="text-gray-400 mb-8">Your Premium membership is now active. You can access private prompts immediately.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/dashboard" className="px-6 py-3 bg-primary hover:bg-primary-hover text-black rounded-full font-semibold transition-colors">
                Go to Dashboard
              </Link>
              <Link href="/prompts" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-colors">
                Explore Prompts
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">Payment Verification Failed</h1>
            <p className="text-gray-400 mb-8">Please contact support if your payment was successful but not verified.</p>
            <button onClick={() => router.push('/checkout')} className="px-6 py-3 bg-primary hover:bg-primary-hover text-black rounded-full font-semibold transition-colors">
              Return to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-20 text-gray-400">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
        <p>Loading...</p>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
