import { FooterLinksContent } from '@/const/const'
import { Box, Flex, Heading, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const FooterLinks = () => {
  return (
    <Flex alignItems={'start'} gap={'15px'}>
          <Box>
            <Heading as={'h1'} fontWeight={'bold'} textTransform={'capitalize'} fontSize={'1rem'}>{FooterLinksContent[0]?.title}</Heading>
            <VStack gap={'10px'} alignItems={'start'}>
              {FooterLinksContent[0]?.links.map((item:any) => (
                <Link key={item?.label} href={item?.link} className='hover:text-primaryGreen text-[.9rem] text-gray-700'>{item?.label}</Link>
              ))}
            </VStack>
          </Box>
          <VStack gap={'15px'} alignItems={'start'}>
            {FooterLinksContent?.slice(1,3)?.map((item:any) => (
              <Box key={item?.title}>
                <Heading as={'h1'} fontWeight={'bold'} textTransform={'capitalize'} fontSize={'1rem'}>{item?.title}</Heading>
                <VStack gap={'10px'} alignItems={'start'}>
                  {item?.links.map((item:any) => (
                    <Link key={item?.label} href={item?.link} className='hover:text-primaryGreen text-[.9rem] text-gray-700'>{item?.label}</Link>
                  ))}
                </VStack>
              </Box>
            ))}
          </VStack>
        </Flex>
  )
}

export default FooterLinks