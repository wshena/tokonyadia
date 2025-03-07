'use client'

import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { RootState, useAppSelector } from '@/redux/store';
import { Box, Center, Flex, For, Grid, Stack } from '@chakra-ui/react';

// import utility
import { useSWRCaching } from '@/utility/swr'
import { GetAllProducts } from '@/utility/fetcher';
import { createSlug, sortArray } from '@/utility/functions';

// import component
import ProductCard from '../cards/ProductCard';
import SortFilter from '../dropdowns/SortFilter';
import SkeletonLoader from '../loading/SkeletonLoader';

const ProductsDisplay = ({initialData}:{initialData:any}) => {
  const {data, error} = useSWRCaching(initialData);

  const { sortOrder } = useAppSelector((state:RootState) => state.utility);

  const [sortedData, setSortedData] = useState<any[]>([]);
  const [productsData, setProductsData] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const responses = await Promise.all(
          data?.products?.map((item: any) => GetAllProducts({
            id: item
          }))
        );
  
        setProductsData(responses.flat());
      } catch (error) {
        console.error(error);
      }
    };
  
    if (data) fetch();
  }, [data]);

  useEffect(() => {
    if (productsData && sortOrder.filter && sortOrder.order){
      setSortedData(sortArray(productsData, sortOrder.filter, sortOrder.order));
    } else {
      setSortedData(productsData)
    }

  }, [productsData, sortOrder]);

  return (
      <Stack width={'100%'} gap={'15px'}>
        <Box width={'100%'} display={'flex'} justifyContent={'end'}>
          <SortFilter />
        </Box>
        <Center width={'100%'}>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)', lg:'repeat(3, 1fr)', xl:'repeat(4, 1fr)'}} gap={{base:'10px', md:'15px'}} alignItems={'start'}>
            {!data ? (
              <>
                {Array.from({length:12}).map((_,idx:number) => (
                  <SkeletonLoader key={idx} width={'188px'} height={'150px'}  />
                ))}
              </>
            ) : (
              <For each={sortedData} fallback={
                <>
                {Array.from({length:12}).map((_,idx:number) => (
                  <SkeletonLoader key={idx} width={'188px'} height={'150px'}  />
                ))}
                </>
              }>
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
        </Center>
      </Stack>
  )
}

export default ProductsDisplay