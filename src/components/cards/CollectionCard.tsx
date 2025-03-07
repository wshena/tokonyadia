'use client'
import { Box, Heading, HStack, Stack } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'

const CollectionCard = ({ data }: { data: any }) => {
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
    <HStack alignItems={'center'} width={{base:"250px", md:'250px', lg:'260px', xl:'290px', "2xl":'290px'}} gap={'20px'} borderRadius={'10px'} backgroundColor={'white'} className='border-2 shadow-lg'>
      {imgError ? (
        <Box width={{ base: '80px', md: '100px' }} height={{ base: '80px', md: '100px' }} backgroundColor={'gray.400'} />
      ) : (
        <Box width={'35%'} height={{ base: '80px', md: '100px' }} position={'relative'}>
          <Image
            ref={imgRef as any}
            src={data?.thumbnail}
            alt={data?.title}
            fill
            onLoadingComplete={(result) => {
              if (result.naturalWidth === 0) setImgError(true); // Jika gambar kosong
            }}
          />
        </Box>
      )}
      <Stack alignItems={'start'} gap={'-15px'}>
        <Heading as={'h1'} fontWeight={'bold'} fontSize={'1rem'}>{data?.title}</Heading>
        <Heading as={'h2'} fontSize={'.9rem'} textTransform={'capitalize'} className='text-gray-800'>{data?.products?.length} product</Heading>
      </Stack>
    </HStack>
  );
}

export default CollectionCard;
