'use client'
import DisplayAllProduct from '@/components/display/DisplayAllProduct';
import { RootState, useAppSelector } from '@/redux/store'
import { Box, Flex, For, Heading, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react'

const OrderCard = ({order}:{order:any}) => {
  return (
    <Stack gap={'15px'} width={'100%'} padding={'1rem'} backgroundColor={'white'} borderRadius={'10px'} className='border shadow-md'>
      <Heading as={'h1'} fontWeight={'bold'} fontSize={{base:'1rem', md:'1.3rem'}}>Order ID: {order?.id}</Heading>
      <Flex alignItems={'center'} gap={'15px'} flexWrap={'wrap'}>
        {order?.products?.map((item:any) => {
          const image = item?.productData?.images["800x900"]?.[0];
          return (
            <Flex flexDirection={{base:'column', md:'row'}} key={item?.productData?.product_id} alignItems={'start'} gap={{base:'0px', md:'20px'}} borderRadius={'10px'} className='w-fit border'>
              <Box position={'relative'} width={{base:'100%', md:'150px'}} height={{base:'150px', md:'150px'}}>
                <Image src={image} fill alt='product-image' />
              </Box>
              <Stack alignItems={'start'} padding={'1rem'}>
                <Heading as={'h2'} fontWeight={'bold'} fontSize={{base:'1rem', md:'1.3rem'}}>{item?.productData?.title}</Heading>
                <span>Jumlah: {item?.quantity} | Variant: {item?.variant}</span>
                <span>Total Harga: {order?.currency}.{order?.totalAmount}</span>
              </Stack>
            </Flex>
          )
        })}
      </Flex>
    </Stack>
  )
}

const OrderList = ({orderList, allProduct}:{orderList:any, allProduct:any}) => {
  const {user} = useAppSelector((state:RootState) => state.auth);
  const userOrderList = orderList.filter((item:any) => item?.userId === user?.id);

  return (
    <Box>
      <Heading as={'h1'} paddingY={'20px'} fontSize={{base:'1rem', md:'1.5rem'}} fontWeight={'bold'}>Riwayat Pembelian</Heading>
      <Stack alignItems={'start'} width={'100%'} gap={'20px'}>
        <For each={userOrderList}>
          {(item:any) => (
            <OrderCard order={item} key={item?.id} />
          )}
        </For>
      </Stack>
      <Box paddingY={'20px'}>
      <Heading as={'h1'} paddingY={'20px'} fontSize={{base:'1rem', md:'1.5rem'}} fontWeight={'bold'}>Cari product lain</Heading>
        <DisplayAllProduct initialData={allProduct} />
      </Box>
    </Box>
  )
}

export default OrderList