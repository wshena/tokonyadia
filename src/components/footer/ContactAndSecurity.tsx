import { ContactFooter } from '@/const/const'
import { Flex, Heading, HStack, Stack, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { JSX } from 'react'
import { FacebookIcon, InstagramIcon, PinterestIcon, TwitterIcon } from '../icons/Icons'

const iconMap: Record<string, JSX.Element> = {
  facebook: <FacebookIcon size={20} color='black' />,
  instagram: <InstagramIcon size={20} color='black' />,
  pinterest: <PinterestIcon size={20} color='black' />,
  twitter: <TwitterIcon size={20} color='black' />,
};

const SocialMediaIcon = ({ name }: { name: string }) => {
  return iconMap[name] || null;
};

const ContactAndSecurity = () => {
  return (
    <VStack gap={'15px'} alignItems={'start'}>
            <Stack gap={'10px'}>
              <Heading as={'h1'} fontWeight={'bold'} textTransform={'capitalize'} fontSize={'1rem'}>keamanan & privasi</Heading>
              <HStack gap={'10px'}>
                <Image src={'/image/icon_pci_license.webp'} height={48} width={70} alt='pci-license' />
                <Image src={'/image/icon_bsi_license_hd.png'} height={48} width={70} alt='bsi-license' />
                <Image src={'/image/icon_bsi_license_hd.png'} height={48} width={70} alt='bsi-license' />
              </HStack>
            </Stack>
            <Stack gap={'10px'}>
              <Heading as={'h1'} fontWeight={'bold'} textTransform={'capitalize'} fontSize={'1rem'}>ikuti kami</Heading>
              <Flex alignItems={'center'} gap={'10px'}>
                {ContactFooter.map((item:any) => (
                  <Link key={item?.label} href={item?.link}>
                    <SocialMediaIcon name={item?.label} />
                  </Link>
                ))}
              </Flex>
            </Stack>
          </VStack>
  )
}

export default ContactAndSecurity