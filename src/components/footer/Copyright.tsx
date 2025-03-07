import { Flex, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Copyright = () => {
  return (
    <div className="flex items-center justify-center">
      <VStack width={{base:'250px', md:'300px', xl:'460px'}} height={'fit-content'} gap={'20px'}>
        <div className="bg-center bg-cover relative w-full h-[223px]">
          <Image src={'/image/footer_img.png'} alt='footer-image' fill />
        </div>
        <Flex alignItems={'center'} gap={'15px'}>
          <Link href={'#'} ><img src='/svg/icon-playstore.svg' alt='playstore-icon' /></Link>
          <Link href={'#'} ><img src='/svg/icon-appstore.svg' alt='playstore-icon' /></Link>
        </Flex>
        <span className='text-[1rem]'>© 2024 - 2025, PT. Tokonyadia.</span>
      </VStack>
    </div>
  )
}

export default Copyright