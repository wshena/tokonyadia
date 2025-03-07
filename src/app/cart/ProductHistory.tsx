'use client'
import React from 'react'
import { Flex, Heading, Stack } from '@chakra-ui/react';
import ProductCard from '@/components/cards/ProductCard';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';
import { createSlug } from '@/utility/functions';
import Link from 'next/link';
import { TrashIcon } from '@/components/icons/Icons';
import { setModalClick } from '@/redux/slice/utility';


const ProductHistory = () => {
  const dispatch = useAppDispatch();
  const {history} = useAppSelector((state:RootState) => state.product);

  return (
    <Stack width={'100%'} gap={'25px'}>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Heading as={'h1'} fontWeight={'bold'} fontSize={{base:'1rem', md:'1.3rem'}} textTransform={'capitalize'}>Terakhir Dilihat</Heading>
        <button onClick={() => dispatch(setModalClick(true))} className='flex items-center gap-[10px] hover:text-mainGreen'>
          <span className='capitalize'>hapus semua</span>
          <TrashIcon size={20} color='black' />
        </button>
      </Flex>
      {history?.length <= 0 ? (
        <Heading as={'h1'} textAlign={'center'} fontWeight={'bold'} fontSize={{base:'1rem', md:'1.3rem'}} textTransform={'capitalize'}>Anda belum mencari produk</Heading>
      ) : (
        <Flex width={'100%'} alignItems={'start'} gap={'20px'} flexWrap={'wrap'}>
          {history.map((item:any) => {
            const slug = createSlug(item?.title)
            return (
              <Link key={item?.product_id} href={`/product/${item?.product_id}/${slug}`} className='w-fit'>
                <ProductCard data={item} />
              </Link>
            )
          })}
        </Flex>
      )}
    </Stack>
  )
}

export default ProductHistory