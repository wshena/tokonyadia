import React from 'react'
import MainWrapper from '@/components/wrapper/MainWrapper'
import { Box, Center, Heading, Stack } from '@chakra-ui/react'

import ProductList from './ProductList'
import ProductHistory from './ProductHistory'
import RecomendedProduct from './RecomendedProduct'
import Sumary from './Sumary'

const page = () => {
  return (
    <MainWrapper>
      <Box width={'100%'} gapY={{base:'20px', md:'40px'}} paddingX={{base:'15px', md:'20px', lg:'50px', xl:'100px'}} >
        <Heading as={'h1'} paddingTop={'20px'} fontWeight={'bold'} fontSize={'2rem'}>Keranjang</Heading>
        <Stack direction={{base:'column', lg:'row'}} paddingTop={'20px'} paddingBottom={'50px'} width={'100%'} alignItems={'start'} justifyContent={'space-between'}>
          <Stack width={{base:'100%', lg:'75%'}} gapY={'30px'}>
            <Stack alignItems={'start'} gap={'25px'}>
              <Box width={'100%'}>
                <ProductList />
              </Box>
            </Stack>
            <Center width={'100%'} display={{base:'flex', lg:'none'}}>
              <Sumary />
            </Center>
            <ProductHistory />
            <RecomendedProduct />
          </Stack>
          <Box width={'100%'} display={{base:'none', lg:'block'}}>
            <Sumary />
          </Box>
        </Stack>
      </Box>
    </MainWrapper>
  )
}

export default page