'use client'
import useSWR from 'swr'

const fetcher = (url: string, options?: RequestInit) => fetch(url, options).then(res => res.json());

export const useSWRCaching = (initialData?:any) => {
  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API}`, 
    fetcher, 
    {
      fallbackData: initialData,
      // Cache for 1 minute (in ms)
      dedupingInterval: 60000,
      // Revalidate when window regains focus
      revalidateOnFocus: true,
      // Revalidate when reconnected
      revalidateOnReconnect: true
    }
  )

  return { data, isLoading, error };
}