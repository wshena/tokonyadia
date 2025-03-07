'use client'
import { Box, Heading, Stack } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const CategoryCard = ({data}:{data:any}) => {
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
    <Stack width={{base:'100px', md:'120px', lg:'128px'}} height={'fit'} alignItems={'center'}>
      {imgError ? (
        <Box width={'100%'} height={'100px'} backgroundColor={'gray.400'} />
      ) : (
        <Box width={'100%'} height={'100px'} position={'relative'}>
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
      <Heading as={'h1'} fontWeight={'bold'} fontSize={{base:'.9rem', md:'1rem'}}>{data?.title}</Heading>
    </Stack>
  )
}

export default CategoryCard