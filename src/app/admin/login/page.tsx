'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AdminLoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (session?.user?.role === 'admin') {
      router.replace('/admin/dashboard');
    } else {
      router.replace('/login');
    }
  }, [session, status, router]);

  return (
    <div className="min-h-screen bg-[#1a1410] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#c9a96e] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-white/60 text-sm">Verifying access…</p>
      </div>
    </div>
  );
}
