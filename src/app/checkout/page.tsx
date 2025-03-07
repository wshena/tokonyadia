import React from 'react'
import { Flex, Heading, Stack } from '@chakra-ui/react'

import Sumary from './Sumary'
import Checkout from './Checkout'
import MainWrapper from '@/components/wrapper/MainWrapper'
import PageContent from '@/components/wrapper/PageContent'

const page = () => {
  return (
    <MainWrapper>
      <PageContent>
        <Stack alignItems={'start'} gap={'20px'} width={'100%'} paddingTop={'10px'}>
          <Heading fontWeight={'bold'} fontSize={{base:'1rem', md:'1.3rem'}}>Checkout</Heading>
          <Flex width={'100%'} alignItems={'start'} justifyContent={'space-between'}>
            <Checkout />
            <Sumary />
          </Flex>
        </Stack>
      </PageContent>
    </MainWrapper>
  )
}

export default page