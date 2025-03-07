'use client'
import React from 'react'
import { Box, Center, Flex, Heading, Stack } from '@chakra-ui/react'
import { RootState, useAppSelector } from '@/redux/store'

const Info = ({label, data}:{label:string, data:any}) => {
  return (
    <Flex alignItems={'center'} justifyContent={'space-between'} width={{base:'100%', md:'70%'}}>
      <Heading as={'h2'}>{label}</Heading>
      <span>{data}</span>
    </Flex>
  )
}

const page = () => {
  const {user} = useAppSelector((state:RootState) => state.auth);

  return (
    <Center width={'100%'}>
      <Stack alignItems={'start'} gap={'20px'} width={{base:'100%', md:'70%'}}>
        <Box width={'100%'}>
          <Heading as={'h1'} fontWeight={'bold'} fontSize={{base:'1rem', md:'1rem'}}>Biodata diri</Heading>
          <Stack alignItems={'start'} width={{base:'100%', md:'80%'}}>
            <Info label='Username' data={user?.username} />
            <Info label='First Name' data={user?.firstName} />
            <Info label='Last Name' data={user?.lastName} />
            <Info label='Tanggal lahir' data={user?.date} />
            <Info label='Jenis Kelamin' data={user?.sex} />
          </Stack>
        </Box>

        <Box width={'100%'}>
          <Heading as={'h1'} fontWeight={'bold'} fontSize={{base:'1rem', md:'1rem'}}>Daftar Kontak</Heading>
          <Stack alignItems={'start'} width={{base:'100%', md:'80%'}}>
            <Info label='Email' data={user?.email} />
            <Info label='Nomor HP' data={user?.phoneNumber} />
          </Stack>
        </Box>
      </Stack>
    </Center>
  )
}

export default page