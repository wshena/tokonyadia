import { Center, Flex } from '@chakra-ui/react'
import React from 'react'
import { GoogleIcon } from '../icons/Icons'

const GoogleButton = () => {
  return (
    <button className='w-full h-[50px] rounded-[10px] border-2 bg-white'>
      <Center width={'100%'}>
        <Flex alignItems={'center'} gap={'5px'}>
          <GoogleIcon size={25} color='' />
          <span>Google</span>
        </Flex>
      </Center>
    </button>
  )
}

export default GoogleButton