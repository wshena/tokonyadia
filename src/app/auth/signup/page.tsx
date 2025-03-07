import SigninForm from '@/components/form/multipleStepForm/SigninForm'
import Logo from '@/components/navbar/Logo'
import { Box, Center, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <Box width={'100vw'} position={'relative'}>
      <Center width={'100%'} height={'100vh'}>
        <Box width={'800px'} height={'600px'} position={'relative'}>
          <Image src={'/image/login-bg.png'} alt='login-image' fill className='' />
        </Box>
      </Center>

      <Center position={'absolute'} width={'100%'} height={{base:'fit', "2xl":'100vh'}} paddingY={{base:'100px', md:'100px'}} top={0} left={0}>
        <VStack alignItems={'center'} gap={'40px'}>
          <Logo />
          <SigninForm />
        </VStack>
      </Center>
    </Box>
  )
}

export default page