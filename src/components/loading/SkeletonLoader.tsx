import { Box } from '@chakra-ui/react'
import React from 'react'

const SkeletonLoader = ({width, height}:{width:any, height:any}) => {
  return (
    <Box width={width} height={height} backgroundColor={'gray.400'} className='animate-pulse' borderRadius={'10px'} />
  )
}

export default SkeletonLoader