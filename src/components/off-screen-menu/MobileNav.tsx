'use client'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { Box, Flex, Stack, VStack } from '@chakra-ui/react';
import React from 'react'
import Logo from '../navbar/Logo';
import { AvatarIcon, CancelIcon } from '../icons/Icons';
import { setMobileNavButton } from '@/redux/slice/utility';
import LogoutButton from '../buttons/LogoutButton';
import { MobileNavLink } from '@/const/const';
import Link from 'next/link';

const MobileNav = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((state:RootState) => state.auth);
  const MobileNavButton = useAppSelector((state:RootState) => state.utility.mobileNavButton);

  return (
    <Box width={'100vw'} height={'100vh'} zIndex={50} display={{base:'block', md:'none'}} background={'white'} position={'fixed'} top={0} left={0} padding={'1rem'} className={`transform transition-transfrom duration-300 ease-in-out ${MobileNavButton ? 'translate-x-0' : 'translate-x-[1000px]'}`}>
      <VStack width={'100%'} gap={'50%'}>
        <Flex width={'100%'} alignItems={'center'} justifyContent={'space-between'} paddingBottom={'10px'} className='border-b-2'>
          <Logo />
          <button onClick={() => dispatch(setMobileNavButton(false))}>
            <CancelIcon size={30} color='black' />
          </button>
        </Flex>
        <VStack width={'100%'} alignItems={'start'} gap={'10px'} marginTop={'20px'}>
          {user && (
            <Flex alignItems={'center'} gap={'10px'}>
              <AvatarIcon size={20} color='black' />
              <span className='font-bold text-[1.5rem]'>{user?.username}</span>
            </Flex>
          )}
          {MobileNavLink.map((item:any) => (
            <Link onClick={() => dispatch(setMobileNavButton(false))} className='py-[.7rem] border-b w-full' href={item?.link} key={item?.id}>{item?.label}</Link>
          ))}
          {user && (
            <>
              <Link onClick={() => dispatch(setMobileNavButton(false))} className='py-[.7rem] border-b w-full' href={'/user/settings'}>Pengaturan</Link>
              <Link onClick={() => dispatch(setMobileNavButton(false))} className='py-[.7rem] border-b w-full' href={'/wishlist'}>Wishlist</Link>
              <Link onClick={() => dispatch(setMobileNavButton(false))} className='py-[.7rem] border-b w-full' href={'/order-list'}>Order</Link>
            </>
          )}
          {user && (
            <LogoutButton />
          )}
        </VStack>
      </VStack>
    </Box>
  )
}

export default MobileNav