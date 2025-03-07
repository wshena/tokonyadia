import { Flex, Heading, Stack, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react'
import { TrashIcon } from '../icons/Icons';
import { removeFromCart } from '@/redux/slice/cart';
import { useAppDispatch } from '@/redux/store';

const CartProductCard = ({product}:{product:any}) => {
  const dispatch = useAppDispatch();

  const image = product?.productData?.images["800x900"]?.[0];
  const price = product?.price
  const product_subtotal = Number((product?.quantity * price).toFixed(2))

  return (
    <VStack width={'100%'} alignItems={'end'} className='border p-[.5rem] rounded-[10px]'>
      <Stack direction={{base:'column', md:'row'}} width={'100%'} gap={'10px'} alignItems={'start'}>
        <div className="w-[100px] h-[80px] lg:w-[50px] lg:h-[50px] relative">
          <Image src={image} alt='product-image' fill />
        </div>
        <VStack width={'100%'} alignItems={'start'} gap={'-10px'}>
          <Heading as={'h2'} fontSize={'1rem'}>{product?.title}</Heading>
          <Flex alignItems={'center'} justifyContent={'space-between'} width={'100%'} fontSize={'.9rem'}>
            <div className="flex items-center gap-[10px]">
              <span>jumlah: {product?.quantity}</span>
              <span>variant: {product?.variant}</span>
            </div>
            <span>{product?.productData?.price?.currency} {product_subtotal}</span>
          </Flex>
        </VStack>
      </Stack>
      <button onClick={() => {
        dispatch(removeFromCart({
          id: product?.productData?.product_id,
          variant: product?.variant
        }))
      }} className='p-[.4rem] hover:bg-red-600'> <TrashIcon size={15} color='black' /> </button>
    </VStack>
  )
}

export default CartProductCard