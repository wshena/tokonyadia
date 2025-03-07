'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Box, Center, Flex, Heading, Stack } from '@chakra-ui/react'

import { EmptyWishlistContent } from '@/const/const'

import ProductHistory from '../cart/ProductHistory'

const InfoCard = ({item}:{item:any}) => {
  return (
    <Stack alignItems={'center'} textAlign={'center'} gap={'10px'} width={{base:'280px', md:'200px', lg:'280px'}}>
      <Box height={{base:'210px', md:'210px'}} width={'100%'} position={'relative'}>
        <Image src={item?.image} fill alt={item?.title} />
      </Box>
      <Heading as={'h3'} fontWeight={'bold'} fontSize={'1.2rem'}>{item?.title}</Heading>
      <span className='text-[.9rem]'>{item?.paragraph}</span>
    </Stack>
  )
}

const EmptyWishlist = () => {
  const router = useRouter();

  return (
    <Stack alignItems={'start'} width={'100%'} gap={'50px'}>
      <Box width={'100%'} height={{base:'200px', md:'250px', lg:'300px'}} position={'relative'}>
        <Image src={'/image/wishlist-bg.png'} fill alt='wishlist-bg' />
        <Center position={'absolute'} top={0} left={0} justifyContent={'start'} padding={{base:'1rem', md:'40px'}}>
          <Stack alignItems={'start'} gap={'15px'} width={{base:'100%', md:'60%', lg:'80%'}}>
            <Heading as={'h1'} fontWeight={'bold'} fontSize={{base:'1.5rem', md:'2rem'}}>Wishlist</Heading>
            <span>Simpan barang-barang yang kamu suka buat dibeli nanti. Yuk, mulai isi Wishlist kamu!</span>
            <button onClick={() => router.push('/')} className='w-[80%] rounded-[10px] bg-mainGreen text-white p-[1rem] font-bold'>Cari Barang</button>
          </Stack>
        </Center>
      </Box>
      <Center width={'100%'}>
        <Stack alignItems={'center'} gap={'20px'}>
          <Heading as={'h1'} fontWeight={'bold'} fontSize={{base:'1.1rem', md:'1.5rem'}}>Cara pakai Wishlist</Heading>
          <Flex direction={{base:'column', md:'row'}} alignItems={'center'} gap={'15px'}>
            {EmptyWishlistContent?.map((item:any) => (
              <InfoCard key={item?.id} item={item} />
            ))}
          </Flex>
        </Stack>
      </Center>
      <ProductHistory />
      <Box width={'100%'} height={'150px'} position={'relative'}>
        <Image src={'/image/tresme-discount.jpg'} fill alt='tresme-discount' className='rounded-[10px]' />
      </Box>
    </Stack>
  )
}

export default EmptyWishlist