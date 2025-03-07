'use client'
import { Box, Flex, Heading, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { StarIcon } from '../icons/Icons'
import { useAppDispatch } from '@/redux/store'
import { addToProductHistory, setStock } from '@/redux/slice/product'

const ProductDescription = ({product}:{product:any}) => {
  const dispatch = useAppDispatch();

  const [index, setIndex] = useState(0);
  const [productStock, setProductStock] = useState<any | null>(() => {
    // Inisialisasi state dengan cek terlebih dahulu apakah product.stock tersedia
    if (product?.stock && product.stock.length > 0) {
      return {
        type: product.stock[0].type,
        quantity: product.stock[0].quantity
      };
    }
    return null;
  });

  const handleIndex = (idx:number) => setIndex(idx)

  useEffect(() => {
    // Pastikan product dan product.stock tersedia sebelum update state
    if (product?.stock && product.stock.length > 0) {
      setProductStock({
        type: product.stock[index]?.type,
        quantity: product.stock[index]?.quantity
      });
    }
  }, [index, product]);

  useEffect(() => {
    dispatch(setStock(productStock))
  }, [productStock])

  // add product data to history array
  useEffect(() => {
    dispatch(addToProductHistory(product))
  }, [])

  return (
    <VStack gap={'20px'} alignItems={'start'} width={{base:'100%', lg:'30%', xl:'30%'}} order={{base:'2', md:'3', lg:'2'}} marginTop={{base:'0', md:'40px', lg:'0'}}>
      <Box width={'fit-content'}>
        <Heading as={'h1'} fontWeight={'bold'} fontSize={{base:'1.5rem', md:'2rem'}} marginBottom={'10px'}>{product?.title}</Heading>

        <Flex alignItems={'center'} fontSize={{base:'.9rem', md:'1rem'}} wrap={{base:'nowrap', md:'nowrap', lg:'wrap', xl:'nowrap'}} gap={'10px'}>
          <span className=''>Terjual {product?.performance?.sales}+ produk</span>
          <span className='block w-[5px] h-[5px] rounded-full bg-gray-400' />
          <Flex alignItems={'center'} gap={'3px'}>
            <StarIcon size={20} color='black' />
            <span>{Math.ceil(product?.performance?.ratingAverage)}</span>
            <span>({product?.performance?.ratingCount} rating)</span>
          </Flex>
        </Flex>
      </Box>
      
      <Flex alignItems={'center'} gap={'10px'} fontSize={{base:'1rem', md:'1.5rem'}} width={'fit-content'}>
        <Heading as={'h2'} fontWeight={'bold'} textDecoration={'line-through'}>{product?.price?.currency}{product?.price?.withoutDiscount}</Heading>
        <Heading as={'h2'} fontWeight={'bold'}>{product?.price?.currency}{product?.price?.withDiscount}</Heading>
        <span className='text-red-500'>{product?.price?.discountPercentage}%</span>
      </Flex>

      <VStack alignItems={'start'}>
        <Heading as={'h3'} fontWeight={'bold'} fontSize={'1rem'}>Pilih variant:</Heading>
        <Flex alignItems={'center'} wrap={{base:'wrap', md:'nowrap', lg:'wrap', xl:'nowrap'}} gap={'10px'}>
          {product?.stock?.map((item:any, idx:number) => (
            <button onClick={() => {
              handleIndex(idx)
            }} key={idx} className={`py-[.1rem] px-[1rem] rounded-[5px] border border-primaryGreen ${idx === index && 'text-white bg-mainGreen'}`}>{item?.type}</button>
          ))}
        </Flex>
      </VStack>

      <p className='text-[.9rem]'>{product?.description}</p>
    </VStack>
  )
}

export default ProductDescription