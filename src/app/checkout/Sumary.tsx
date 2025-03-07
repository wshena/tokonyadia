'use client'
import React, { useEffect } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { Flex, For, Heading, HStack, Stack } from '@chakra-ui/react'
import { TrashIcon } from '@/components/icons/Icons'
import { removeFromCart } from '@/redux/slice/cart'
import { calculateTotalPrice, getBiayaPengiriman } from '@/utility/functions'
import { setTotalPembayaran } from '@/redux/slice/order'

const Product = ({product}:{product:any}) => {
  const dispatch = useAppDispatch();
  const handleRemove = () => {
    dispatch(removeFromCart({
      id: product?.productData?.product_id,
      variant: product?.variant
    }))
  }
  return (
    <HStack width={'100%'} alignItems={'center'} justifyContent={'space-between'} fontSize={{base:'1rem', md:'.9rem'}}>
      <Heading as={'h1'}>x{product?.quantity} {product?.productData?.title}</Heading>
      <Flex alignItems={'center'} gap={'8px'}>
        <span className='text-[.9rem]'>{product?.productData?.price?.currency}.{product?.price}</span>
        <button onClick={handleRemove}>
          <TrashIcon size={15} color='black' />
        </button>
      </Flex>
    </HStack>
  )
}

const Sumary = () => {
  const dispatch = useAppDispatch();

  const {carts} = useAppSelector((state:RootState) => state.cart);
  const {pengiriman, totalPembayaran} = useAppSelector((state:RootState) => state.order);

  const subtotal = carts?.products?.length > 0 ? Number((calculateTotalPrice(carts?.products).toFixed(2))) : 0;
  const currency = carts?.products[0]?.productData?.price?.currency || '';

  const biayaPengiriman = getBiayaPengiriman(pengiriman);

  // total biaya dengan pajak, biaya pengiriman, dsb
  useEffect(() => {
    dispatch(setTotalPembayaran(
      subtotal + Number(biayaPengiriman)
    ))
  }, [subtotal, biayaPengiriman])

  return (
    <Stack width={'29%'} alignItems={'start'} gap={'15px'} padding={'1rem'} backgroundColor={'white'} rounded={'10px'} className='shadow-lg border'>
      <Heading as={'h2'} fontWeight={'bold'} fontSize={{base:'1rem', md:'1rem'}}>Ringkasan Order</Heading>
      <For each={carts.products} 
        fallback={
          <Heading as={'h2'}>Anda belum memilih product</Heading>
        }
      >
        {(item) => <Product key={`${item.productData?.product_id} - ${item?.variant}`} product={item} />}
      </For>
      <Flex width={'100%'} alignItems={'center'} justifyContent={'space-between'} fontSize={{base:'1rem', md:'.9rem'}}>
        <span>Pengiriman</span>
        <span>{currency} {biayaPengiriman}</span>
      </Flex>
      <Flex width={'100%'} alignItems={'center'} justifyContent={'space-between'} fontWeight={'bold'} paddingTop={'10px'} className='border-t'>
        <span>Order Total</span>
        <span>{currency} {totalPembayaran}</span>
      </Flex>
    </Stack>
  )
}

export default Sumary