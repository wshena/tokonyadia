'use client'
import { Box, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import { AvatarIcon } from '../icons/Icons'
import { useAppDispatch } from '@/redux/store'
import { setProfileButtonHover } from '@/redux/slice/utility'
import ProfileModal from '../feedback/modals/ProfileModal'

const ProfileButton = ({ username }: { username: string }) => {
  const dispatch = useAppDispatch();

  return (
    <Box
      position={'relative'}
      width={'fit-content'}
      display={{base:'none', md:'block'}}
      onMouseEnter={() => dispatch(setProfileButtonHover(true))}
      onMouseLeave={() => dispatch(setProfileButtonHover(false))}
    >
      <Flex alignItems={'center'} gap={'10px'} cursor={'pointer'} padding={'.4rem'} className='hover:bg-gray-200'>
        <AvatarIcon size={25} color='black' />
        <Heading as={'h1'} fontSize={'1rem'} fontWeight={'bold'}>{username}</Heading>
      </Flex>

      <ProfileModal username={username} />
    </Box>
  );
};

export default ProfileButton;