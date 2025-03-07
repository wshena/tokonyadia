'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function LoadingIndicator() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Fungsi untuk mengubah favicon
    const setFavicon = (href: string) => {
      let link = document.querySelector("link[rel='icon']");
      
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'icon');
        document.head.appendChild(link);
      }
      
      link.setAttribute('href', href);
    };

    // Mulai loading
    const handleStart = () => {
      setLoading(true);
      setFavicon('/favicon-spinner.svg');
    };
    
    // Selesai loading
    const handleComplete = () => {
      setLoading(false);
      setFavicon('/icon.png');
    };

    // API Navigation event tidak tersedia langsung di App Router
    // Jadi kita gunakan penggantian URL sebagai indikator navigasi
    handleStart();
    
    // Setelah navigasi selesai (komponen di-mount ulang), hentikan loading
    const timeoutId = setTimeout(handleComplete, 500);
    
    return () => clearTimeout(timeoutId);
  }, [pathname, searchParams]); // Efek dijalankan setiap kali URL berubah
  
  return null;
}