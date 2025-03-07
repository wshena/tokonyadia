import React from 'react'
import { GetAllProducts } from '@/utility/fetcher'
import { Heading, Stack } from '@chakra-ui/react';

import DisplayAllProduct from '@/components/display/DisplayAllProduct';

const RecomendedProduct = async () => {
  const products = await GetAllProducts();

  return (
    <Stack alignItems={'start'} gap={'25px'}>
      <Heading as={'h1'} fontWeight={'bold'} fontSize={{base:'1rem', md:'1.3rem'}} textTransform={'capitalize'}>rekomendasi untuk anda</Heading>
      <DisplayAllProduct initialData={products} />
    </Stack>
  )
}

export default RecomendedProduct