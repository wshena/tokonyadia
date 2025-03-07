import LoginForm from '@/components/form/LoginForm'
import Logo from '@/components/navbar/Logo'
import { Box, Center, HStack, Stack, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <Box width={'100vw'}>
      <Center width={'100%'} height={'100vh'}>
        <Stack alignItems={'center'} gap={'30px'}>
          <Logo />
          <Stack direction={{base:'column', md:'row'}} alignItems={'center'} gapX={'40px'}>
            <Image src={'/image/register_icon_new.png'} alt='login-image' width={450} height={450} className='hidden lg:block' />
            <LoginForm />
          </Stack>
        </Stack>
      </Center>
    </Box>
  )
}

export default page