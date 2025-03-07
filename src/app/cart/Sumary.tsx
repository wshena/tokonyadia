'use client'
import React from 'react'
import { Flex, Heading, Stack } from '@chakra-ui/react'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { calculateTotalPrice } from '@/utility/functions'
import { setAlert } from '@/redux/slice/utility'
import { useRouter } from 'next/navigation'

const Sumary = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const cart = useAppSelector((state:RootState) => state.cart.carts);
  const user = useAppSelector((state:RootState) => state.auth.user);

  const subtotal = cart?.products?.length > 0 ? Number((calculateTotalPrice(cart?.products).toFixed(2))) : 0;
  const currency = cart?.products[0]?.productData?.price?.currency;

  const isCartEmpty = cart?.products?.length <= 0

  const handleBuy = () => {
    if (!user || !user?.id) {
      dispatch(
        setAlert({
          label:'Anda harus login dulu untuk transaksi',
          type:'warning'
        })
      )
    } else {
      router.push('/checkout')
    }
  }

  return (
    <Stack gap={'20px'} position={'sticky'} top={'0'} width={{base:'100%', md:'40%', lg:'100%'}} padding={'1rem'} bg={'white'} borderRadius={'10px'} className='shadow-lg border'>
      <Heading as={'h1'} fontWeight={'bold'} fontSize={{base:'1rem', md:'1.3rem', lg:'1rem', xl:'1.3rem'}}>Ringkasan Belanja</Heading>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Heading as={'h2'}>Total</Heading>
          {subtotal > 0 && (
            <Heading as={'h2'} fontWeight={'bold'}>{currency}.{subtotal}</Heading>
          )}
        </Flex>
      <button disabled={isCartEmpty ? true : false} onClick={handleBuy} className={`py-[.5rem] px-[1rem] w-full rounded-[10px] text-center bg-mainGreen text-white border-mainGreen ${isCartEmpty && 'cursor-not-allowed opacity-40'}`}>Beli</button>
    </Stack>
  )
}

export default Sumary