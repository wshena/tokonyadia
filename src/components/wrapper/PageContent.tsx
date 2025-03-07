import { Stack } from '@chakra-ui/react'
import React from 'react'

const PageContent = ({children}:{children:any}) => {
  return (
    <Stack gapY={{base:'20px', md:'40px'}} paddingX={{base:'15px', md:'20px', lg:'50px', xl:'100px'}}>
      {children}
    </Stack>
  )
}

export default PageContent