'use client'
import React from 'react'
import { Box, Center, Flex, For, Grid, Heading, Stack } from '@chakra-ui/react'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import SkeletonLoader from '@/components/loading/SkeletonLoader'
import { createSlug } from '@/utility/functions'
import Link from 'next/link'
import ProductCard from '@/components/cards/ProductCard'
import { clearAllWishlist } from '@/redux/slice/wishlist'
import EmptyWishlist from './EmptyWishlist'

const UserWishlist = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state:RootState) => state.auth);
  const { wishlist } = useAppSelector((state:RootState) => state.wishlist);

  const UserWishlist = wishlist ? wishlist?.find((item:any) => item?.userId === user?.id) : null;
  
  return (
    <Box paddingY={'20px'}>
      <Center width={'100%'}>
        {UserWishlist ? (
          <>
            {UserWishlist?.products.length <= 0 ? (
              <EmptyWishlist />
            ) : (
              <Stack alignItems={'start'} gap={'20px'}>
                <Flex alignItems={'center'} width={'100%'} justifyContent={'space-between'}>
                  <Heading as={'h1'} fontWeight={'bold'} fontSize={{base:'1rem', md:'1.5rem'}}>Wishlist Anda</Heading>
                  <button onClick={() => dispatch(clearAllWishlist(user?.id))} className='p-[1rem] border rounded-[10px]'>
                    <span>Hapus wishlist anda</span>
                  </button>
                </Flex>
                <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)', lg:'repeat(3, 1fr)', xl:'repeat(4, 1fr)'}} gap={{base:'10px', md:'15px'}} alignItems={'start'}>
                  <For each={UserWishlist?.products} fallback={
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
                </Grid>
              </Stack>
            )}
          </>
        ) : (
          <Heading as={'h1'} fontWeight={'bold'} fontSize={{base:'1rem', md:'1.5rem'}}>Tidak ada wishlist</Heading>
        )}
      </Center>
    </Box>
  )
}

export default UserWishlist