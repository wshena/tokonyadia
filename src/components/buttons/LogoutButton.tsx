'use client'
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { logoutUser } from '@/redux/slice/auth';
import { useAppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';

function useLogout() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    // Hindari multiple klik selama proses logout berjalan
    if (isLoggingOut) return;
    
    console.log('Memulai proses logout...');
    setIsLoggingOut(true);
    setError(null);
    
    try {
      // Beri waktu untuk pastikan request dikirim dengan menambahkan timeout
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout saat logout')), 10000)
      );
      
      // Race antara proses normal dan timeout
      const { error: signOutError } = await Promise.race([
        supabase.auth.signOut(),
        timeoutPromise
      ]) as any;
      
      if (signOutError) {
        console.error('Terjadi error saat signOut:', signOutError.message);
        setError(signOutError.message);
        setIsLoggingOut(false);
        return;
      }
      
      // Dispatch action untuk update state Redux
      dispatch(logoutUser());
      console.log('State logout berhasil didispatch');
      
      // Tambahkan jeda kecil sebelum redirect untuk memastikan state terupdate
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Redirect ke halaman login
      console.log('Mengalihkan ke halaman login');
      router.push('/auth/login');
      
      // Reset state jika diperlukan (meskipun akan unmount)
      setIsLoggingOut(false);
      
    } catch (err: any) {
      console.error('Error selama logout:', err);
      setError(err.message || 'Terjadi kesalahan saat logout');
      setIsLoggingOut(false);
    }
  };

  return { logout, isLoggingOut, error };
}

const LogoutButton = () => {
  const { logout, isLoggingOut, error } = useLogout();
  
  return (
    <div className="flex flex-col items-center">
      <button 
        onClick={logout} 
        disabled={isLoggingOut}
        className={`px-4 py-2 ${isLoggingOut ? 'bg-gray-400' : 'bg-red-600'} text-white font-bold rounded flex items-center justify-center min-w-24`}
      >
        {isLoggingOut ? 'Sedang Keluar...' : 'Keluar'}
      </button>
      
      {error && (
        <p className="text-red-500 text-sm mt-2">
          Error: {error}. Silakan coba lagi.
        </p>
      )}
    </div>
  );
};

export default LogoutButton;