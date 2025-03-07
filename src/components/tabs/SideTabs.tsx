'use client'
import { setSideTabs } from '@/redux/slice/utility';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';
import { Heading, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'

const SideTabs = ({labels}:{labels:string[]}) => {
  const sideTabs = useAppSelector((state:RootState) => state.utility.sideTabs)
  const dispatch = useAppDispatch();

  return (
    <Stack direction={{base:'row', lg:'column'}} alignItems={'start'} height={{lg:'500px'}} overflow={'auto'} width={{base:'100%', lg:'250px'}} position={'sticky'} top={0}>
      {labels?.map((item:string, idx:number) => (
        <button onClick={() => {
          dispatch(setSideTabs(item))
        }} key={`${item} - ${idx}`} className='py-[.5rem] px-[1rem] w-full text-start hover:bg-gray-400/20'>
          <Heading as={'h1'} fontSize={{base:'.9rem', md:'.9rem'}} className={`${item === sideTabs ? 'text-mainGreen' : 'text-black'} min-w-[115px] md:w-[130px] lg:w-full`}>
            {item}
          </Heading>
        </button>
      ))}
    </Stack>
  )
}

export default SideTabs