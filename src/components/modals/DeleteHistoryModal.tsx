'use client'
import React from 'react'
import { Center, Flex, Heading, Stack } from '@chakra-ui/react'
import { useAppDispatch } from '@/redux/store'
import { setModalClick } from '@/redux/slice/utility'
import { clearAllProductHistory } from '@/redux/slice/product'

const DeleteHistoryModal = () => {
  const dispatch = useAppDispatch();

  return (
    <Center position={'absolute'} zIndex={60} top={0} left={0} width={'100vw'} height={'100vh'} className='bg-black/70'>
      <Stack gap={'20px'} padding={'1rem'} borderRadius={'10px'} backgroundColor={'white'} width={'250px'}>
        <Heading as={'h1'} fontWeight={'bold'} fontSize={'1.3rem'} textAlign={'center'}>Hapus Riwayat?</Heading>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <button onClick={() => dispatch(setModalClick(false))} className='px-[1.5rem] py-[.3rem] rounded-[10px] border border-mainGreen text-mainGreen'>Batal</button>
          <button onClick={() => {
            dispatch(clearAllProductHistory());
            setTimeout(() => {
              dispatch(setModalClick(false))
            }, 1000)
          }} className='px-[1.5rem] py-[.3rem] rounded-[10px] bg-mainGreen text-white'>Hapus</button>
        </Flex>
      </Stack>
    </Center>
  )
}

export default DeleteHistoryModal