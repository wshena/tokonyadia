'use client'
import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaCheck } from "react-icons/fa";

const NotifSetting = ({item}:{item:string}) => {
  const [click, setClick] = useState(true);

  return (
    <Flex alignItems={'center'} width={'100%'} justifyContent={'space-between'} paddingY={'1rem'} className='border-t-2'>
      <span className='capitalize'>{item}</span>
      <button onClick={() => setClick(!click)} className={`border-2 rounded-[3px] p-[.4rem] text-white ${click ? 'bg-mainGreen font-bold' : 'bg-white'}`}>
        <FaCheck size={15} color='white' />
      </button>
    </Flex>
  )
}

export default NotifSetting