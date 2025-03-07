import { GetAllCategory, GetAllProducts } from '@/utility/fetcher'
import { Center, Flex, For, Grid, Heading, Stack } from '@chakra-ui/react';
import React from 'react'
import SkeletonLoader from '../loading/SkeletonLoader';
import { createSlug } from '@/utility/functions';
import Link from 'next/link';
import ProductCard from '../cards/ProductCard';

const SameCategory = async ({categoryId}:{categoryId:string}) => {
  const productDetail = await GetAllCategory({
    id: categoryId
  })

  const productsData = await Promise.all(
    productDetail?.products?.map((item: any) => GetAllProducts({
      id: item
    }))
  );
  
  return (
    <Stack width={'100%'} gap={'20px'}>
        <Heading as={'h1'} fontWeight={'bold'} fontSize={{base:'2rem', md:'2rem'}} textTransform={'capitalize'}>Kategori yang sama</Heading>
        <Center width={'100%'}>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)', lg:'repeat(4, 1fr)', xl:'repeat(6, 1fr)'}} gap={{base:'10px', md:'15px'}} alignItems={'start'}>
            {!productsData ? (
              <>
                {Array.from({length:12}).map((_,idx:number) => (
                  <SkeletonLoader key={idx} width={'188px'} height={'150px'}  />
                ))}
              </>
            ) : (
              <For each={productsData} fallback={
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

export default SameCategory