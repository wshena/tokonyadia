import React from 'react'
import { Box, Center, Flex, Heading, Stack, VStack } from '@chakra-ui/react'
import { NotificationSettings } from '@/const/const'
import NotifSetting from './NotifSetting'

const page = () => {
  return (
    <Center width={'100%'}>
      <Stack alignItems={'start'} gap={'20px'} width={{base:'100%', md:'70%'}}>
        <Stack gap={'0px'}>
          <Heading as={'h1'} fontWeight={'bold'} fontSize={{base:'1rem', md:'1.5rem'}}>Notifikasi</Heading>
          <span className='text-gray-600'>Atur notifikasi yang ingin kamu terima disini</span>
        </Stack>
        <Flex alignItems={'center'} justifyContent={'space-between'} width={'100%'} padding={'1rem'} borderRadius={'10px'} backgroundColor={'gray.300'}>
          <span className='font-bold'>Transaksi</span>
          <span className='text-[.8rem]'>E-mail</span>
        </Flex>
        <Stack alignItems={'start'} width={'100%'} gap={'30px'}>
          {NotificationSettings?.map((item:any) => (
            <Stack width={'100%'} gap={'20px'} key={item?.id}>
              <Heading as={'h3'} fontWeight={'bold'} fontSize={{base:'1rem', md:'1.4rem'}}>{item?.title}</Heading>
              <VStack alignItems={'start'} gap={'10px'} width={'100%'}>
                {item?.settings?.map((item:string) => (
                  <NotifSetting key={item} item={item} />
                ))}
              </VStack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Center>
  )
}

export default page