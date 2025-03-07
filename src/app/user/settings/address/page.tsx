'use client'
import { RootState, useAppSelector } from '@/redux/store'
import { Box, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const page = () => {
  const {user} = useAppSelector((state:RootState) => state.auth);

  return (
    <Center width={'100%'}>
      <Stack alignItems={'start'} gap={'20px'} width={{base:'100%', md:'70%'}}>
        <Flex alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
          <Heading as={'h1'} fontWeight={'bold'} fontSize={{base:'1rem', md:'1.5rem'}}>Alamat Anda</Heading>
          <button className='rounded-[10px] bg-mainGreen text-white font-bold text-[.8rem] py-[.7rem] px-[1.3rem]'>+ Tambah Alamat</button>
        </Flex>
        <Box padding={'1rem'} borderRadius={'10px'} className='border'>
          <Text>{user?.address}</Text>
        </Box>
      </Stack>
    </Center>
  )
}

export default page