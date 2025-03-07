'use client'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { calculateTotalPrice } from '@/utility/functions'
import { Box, Flex, Heading, Stack, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import CartProductCard from '../cards/CartProductCard'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const LinkToCart = () => {
  return (
    <Flex width={'100%'} alignItems={'center'} justifyContent={'space-between'} paddingBottom={'10px'} className='border-b'>
      <Heading as={'h1'} fontWeight={'bold'} fontSize={'1rem'}>Keranjang</Heading>
      <Link href={'/cart'} className='font-bold capitalize text-mainGreen'>lihat</Link>
    </Flex>
  )
}

const IfEmpty = () => {
  return (
    <>
    <LinkToCart />
    <Heading as={'h1'} fontWeight={'bold'} fontSize={'1.3rem'}>Wah belanjaanmu kosong nih</Heading>
    <Heading as={'h2'} fontSize={'.9rem'} className='text-gray-600'>Yuk isi dengan barang-barang impianmu!</Heading>
    <Box width={'50%'} height={'130px'} position={'relative'}>
      <Image src={'/image/empty-cart.png'} fill alt='product-empty' />
    </Box>
    <Link href={'/'}>
      <button className='px-[1rem] py-[.5rem] border border-mainGreen text-mainGreen bg-white rounded-[10px]'>Mulai Belanja</button>
    </Link>
    </>
  )
}

const CartModal = () => {
  const router = useRouter();

  const productList = useAppSelector((state:RootState) => state.cart.carts);

  const subtotal = productList?.products?.length > 0 ? Number((calculateTotalPrice(productList?.products).toFixed(2))) : 0;
  const currency = productList?.products[0]?.productData?.price?.currency;

  return (
    <Box padding={'1rem'} display={{base:'none', lg:'block'}} width={'350px'} height={'fit'} borderRadius={'10px'} backgroundColor={'white'} color={'black'} className='shadow-lg'>
      <Stack alignItems={'center'} gap={'20px'}>
        {productList?.products?.length <= 0 ? (
          <IfEmpty />
        ) : (
          <>
          <LinkToCart />
          <Heading as={'h1'} textTransform={'capitalize'} fontWeight={'bold'} fontSize={'1.3rem'}>Keranjang Anda</Heading>

          <VStack alignItems={'start'} gap={'15px'} width={'100%'}>
            {productList?.products?.map((item:any) => (
              <CartProductCard key={`${item?.productData?.product_id} - ${item?.variant}`} product={item} />
            ))}
          </VStack>

          <VStack alignItems={'start'} gap={'10px'} paddingTop={'10px'} width={'100%'} className='border-t'>
            <Flex width={'100%'} alignItems={'center'} justifyContent={'space-between'}>
              <span>Total:</span>
              <span className='font-bold text-[1rem]'>{currency} {subtotal}</span>
            </Flex>
            <button onClick={() => {
              router.push('/cart')
            }} className='py-[.5rem] px-[1rem] w-full rounded-[10px] text-center bg-mainGreen text-white border-mainGreen'>Beli</button>
          </VStack>
          
          </>
        )}
      </Stack>
    </Box>
  )
}

export default CartModal