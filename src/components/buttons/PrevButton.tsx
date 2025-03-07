import { Box } from '@chakra-ui/react'
import React from 'react'
import { LeftAngleIcon } from '../icons/Icons'

const PrevButton = ({handleClick, hover}:{handleClick:any, hover:boolean}) => {
  return (
    <Box position={'absolute'} width={'fit-content'} height={'100%'} top={0} left={hover ? '-20px' : '0px'} display={'flex'} alignItems={'center'} opacity={hover ? 100 : 0} justifyContent={'center'} className='transform transition-all duration-300 ease-in-out'>
      <button onClick={handleClick} className='p-[.4rem] rounded-full bg-white shadow-lg'>
        <LeftAngleIcon size={25} color='black' />
      </button>
    </Box>
  )
}

export default PrevButton