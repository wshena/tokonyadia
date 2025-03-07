import { Box, Stack } from '@chakra-ui/react'
import React from 'react'
import Container from '../wrapper/Container'
import FooterLinks from './FooterLinks'
import ContactAndSecurity from './ContactAndSecurity'
import Copyright from './Copyright'

const Footer = () => {
  return (
    <Box width={'100%'} className='p-[20px] lg:p-[2rem]'>
      <Container>
        <Stack direction={{base:'column', lg:'row'}} gap={{base:'30px', lg:'0'}} justifyContent={'space-between'} paddingX={{xl: '4rem'}}>
          {/* footer links */}
          <FooterLinks />
          
          <div className="flex flex-col gap-[20px] md:gap-0 justify-between lg:justify-start md:flex-row">
            {/* keamanan dan contact */}
            <ContactAndSecurity />

            {/* copyright sections */}
            <Copyright />
          </div>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer