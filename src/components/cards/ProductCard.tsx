'use client'
import { Box, Flex, Heading, HStack, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { StarIcon } from '../icons/Icons'

const ProductCard = ({data}:{data:any}) => {
  const [imgError, setImgError] = useState(false);
    const imgRef = useRef<HTMLImageElement | null>(null);
    
      // Handle error jika gambar gagal dimuat
    useEffect(() => {
      const imgElement = imgRef.current;
      if (!imgElement) return;
    
      const handleError = () => setImgError(true);
    
      imgElement.addEventListener('error', handleError);
      return () => imgElement.removeEventListener('error', handleError);
    }, []);

  return (
    <VStack gap={'10px]'} width={'180px'} alignItems={'start'} backgroundColor={'white'} className='border'>
      {imgError ? (
        <Box width={'100%'} height={'180px'} backgroundColor={'gray.400'} />
      ) : (
        <div className="w-full h-[180px] relative rounded-t-[5px]">
          <Image
            ref={imgRef as any}
            src={data?.images["800x900"]?.[0]} 
            alt={data?.title} 
            fill 
            loading='lazy' 
            onLoadingComplete={(result) => {
              if (result.naturalWidth === 0) setImgError(true); // Jika gambar kosong
            }}/>
        </div>
      )}
      <Box padding={'1rem'}>
        <Heading as={'h1'} fontSize={'.9rem'} lineHeight={'1rem'}>{data?.title}</Heading>
        <Heading as={'h2'} fontWeight={'bold'} fontSize={'1rem'}>{data?.price?.currency}{data?.price?.withDiscount}</Heading>
        <HStack alignItems={'center'} fontSize={'.7rem'}>
          <span className='line-through text-gray-400'>{data?.price?.currency}{data?.price?.withoutDiscount}</span>
          <span className='text-red-400'>{data?.price?.discountPercentage}%</span>
        </HStack>
        <HStack alignItems={'center'} fontSize={'.7rem'}>
          <Flex gap={'3px'} alignItems={'center'}>
            <StarIcon size={15} color='yellow' />
            <span className='block'>{data?.performance?.ratingAverage !== null ? Math.ceil(data?.performance?.ratingAverage) : 0}</span>
          </Flex>
          <span>{data?.performance?.sales}+ terjual</span>
        </HStack>
      </Box>
    </VStack>
  )
}

export default ProductCard