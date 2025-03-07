'use client'

import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react'
import { Box, Flex, For, Grid, Stack } from '@chakra-ui/react';

// import utility
import { useSWRCaching } from '@/utility/swr'
import { createSlug } from '@/utility/functions';

// import components
import ProductCard from '../cards/ProductCard';
import SkeletonLoader from '../loading/SkeletonLoader';

const DisplayAllProduct = ({initialData}:{initialData:any}) => {
  const { data, error } = useSWRCaching(initialData);
  
  const [displayCount, setDisplayCount] = useState(12);
  const [displayData, setDisplayData] = useState<any>([]);

  // Menggunakan useCallback untuk memoize fungsi
  const showMoreProducts = useCallback(() => {
    setDisplayCount((prev) => prev + 12);
  }, []);

  useEffect(() => {
    if (data) {
      setDisplayData(data.slice(0, displayCount));
    }
  }, [data, displayCount]);
  

  return (
    <Box width={'100%'}>
      <Stack alignItems={'center'} gap={'30px'} width={'100%'}>
        <Grid width={'100%'} templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)', lg:'repeat(4, 1fr)', xl:'repeat(5, 1fr)'}} gap={{base:'10px', md:'15px'}} alignItems={'start'}>
          {!data ? (
            <>
              {Array.from({length:12}).map((_,idx:number) => (
                <SkeletonLoader key={idx} width={'188px'} height={'150px'}  />
              ))}
            </>
          ) : (
            <For each={displayData}>
              {(item:any) => {
                const slug = createSlug(item?.title)
                return (
                  <Flex key={item?.product_id} width={'100%'} alignItems={'center'} justifyContent={'center'}>
                    <Link href={`/product/${item?.product_id}/${slug}`} className='w-fit'>
                      <ProductCard data={item} />
                    </Link>
                  </Flex>
                )
              }}
            </For>
          )}
        </Grid>
        
        {data && displayData.length < data.length && (
          <button
            onClick={showMoreProducts}
            className='px-[1rem] py-[.7rem] text-[1rem] rounded-[10px] border border-mainGreen text-mainGreen font-bold capitalize'
          >
            muat lebih banyak
          </button>
        )}
      </Stack>
    </Box>
  )
}

export default DisplayAllProduct