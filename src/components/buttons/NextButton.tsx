import React from 'react'
import { RightAngleIcon } from '../icons/Icons'
import { Box } from '@chakra-ui/react'

const NextButton = ({handleClick, hover}:{handleClick:any, hover:boolean}) => {
  return (
    <Box position={'absolute'} width={'fit-content'} height={'100%'} top={0} right={hover ? '-20px' : '0px'} display={'flex'} alignItems={'center'} opacity={hover ? 100 : 0} justifyContent={'center'} className='transform transition-all duration-300 ease-in-out'>
      <button onClick={handleClick} className='p-[.4rem] rounded-full bg-white shadow-lg'>
        <RightAngleIcon size={25} color='black' />
      </button>
    </Box>
  )
}

export default NextButton