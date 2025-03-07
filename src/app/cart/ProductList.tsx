'use client'
import React from 'react'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { Box, Center, Flex, Heading, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createSlug } from '@/utility/functions';
import { TrashIcon } from '@/components/icons/Icons';
import { removeFromCart } from '@/redux/slice/cart';

const IfEmpty = () => {
  const router = useRouter();
  return (
    <Center width={'100%'} height={{base:'fit', md:'200px'}}>
      <Flex direction={{base:'column', md:'row'}} alignItems={'center'} gap={'20px'}>
        <Image src={'/image/empty-cart.png'} alt='empty-cart' width={150} height={150} />
        <Stack alignItems={'start'} gap={'5px'}>
          <Heading as={'h1'} fontWeight={'bold'} textTransform={'capitalize'} fontSize={'1.5rem'}>Wah, keranjang belanjamu kosong</Heading>
          <Heading as={'h2'}>Yuk, isi dengan barang-barang impianmu!</Heading>
          <button onClick={() => router.push('/')} className='text-white font-bold py-[.5rem] px-[2rem] rounded-[10px] bg-mainGreen capitalize'>mulai belanja</button>
        </Stack>
      </Flex>
    </Center>
  )
}

const ProductList = () => {
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state:RootState) => state.cart.carts);
  const currency = cart?.products[0]?.productData?.price?.currency;

  return (
    <Box width={'100%'} height={'fit-content'} padding={'1rem'} bg={'white'} borderRadius={'10px'} className='shadow-lg border'>
      {cart?.products?.length <= 0 ? (
        <IfEmpty />
      ) : (
        <Stack alignItems={'start'} width={'100%'}>
          {cart?.products?.map((item:any) => {
            const slug = createSlug(item?.productData?.product_id);

            return (
              <Flex direction={{base:'column', md:'row'}} key={`${item?.productData?.product_id} - ${item?.variant}`} width={'100%'} gap={'10px'} className='border-b pb-[10px]'>
                <Image src={item?.productData?.images["800x900"]?.[0]} alt={item?.productData?.title} width={100} height={100} />
                <Stack alignItems={'flex-end'} width={'100%'}>
                  <Flex direction={{base:'column', md:'row'}} width={'100%'} height={'fit-content'} alignItems={'start'} justifyContent={{base:'start', md:'space-between'}} gap={{base:'10px', md:'0px'}}>
                    <Stack gap={{md:'3px'}}>
                      <Link href={`/product/${item?.productData?.product_id}/${slug}`}>
                        <Heading as={'h1'} fontSize={{base:'1rem', md:'1.3rem', lg:'1.5rem'}} fontWeight={'bold'}>{item?.productData?.title}</Heading>
                      </Link>
                      <span className='text-[1rem] text-gray-600'>Variant {item?.variant}, Jumlah{item?.quantity}</span>
                    </Stack>
                    <span className='font-bold md:text-[1.3rem] lg:text-[1.5rem]'>{currency}.{item?.price}</span>
                  </Flex>
                  <button onClick={() => {
                    dispatch(removeFromCart({
                      id: item?.productData?.product_id,
                      variant: item?.variant
                    }))
                  }}> <TrashIcon size={20} color='black' /> </button>
                </Stack>
              </Flex>
            )
          })}
        </Stack>
      )}
    </Box>
  )
}

export default ProductList