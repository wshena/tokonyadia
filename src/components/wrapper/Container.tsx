import { Box } from '@chakra-ui/react'
import React from 'react'

const Container = ({children}:{children:React.ReactNode}) => {
  return (
    <Box maxWidth={'1440px'} marginX={'auto'}>
      {children}
    </Box>
  )
}

export default Container