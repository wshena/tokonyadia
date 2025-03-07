import { Heading } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={'/'}>
      <Heading as='h1' fontWeight={'bold'} textTransform={'capitalize'} fontSize={'2rem'} className='text-mainGreen'>tokonyadia</Heading>
    </Link>
  )
}

export default Logo