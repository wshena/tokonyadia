import React from 'react'
import { Heading, Stack } from '@chakra-ui/react'

import { GetAllProducts } from '@/utility/fetcher'

import UserWishlist from './UserWishlist'
import MainWrapper from '@/components/wrapper/MainWrapper'
import PageContent from '@/components/wrapper/PageContent'
import DisplayAllProduct from '@/components/display/DisplayAllProduct'

const page = async () => {
  const allProduct = await GetAllProducts();

  return (
    <MainWrapper>
      <PageContent>
        <UserWishlist />
        <Stack alignItems={'start'} gap={'20px'}>
          <Heading as={'h1'} fontWeight={'bold'} fontSize={{base:'1.1rem', md:'1.5rem'}}>Rekomendasi untuk anda</Heading>
          <DisplayAllProduct initialData={allProduct} />
        </Stack>
      </PageContent>
    </MainWrapper>
  )
}

export default page