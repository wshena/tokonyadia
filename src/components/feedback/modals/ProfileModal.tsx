'use client'
import React from 'react'
import { Flex, Heading, VStack } from '@chakra-ui/react'
import { AvatarIcon } from '../../icons/Icons'
import { RootState, useAppSelector } from '@/redux/store'
import { motion, AnimatePresence } from "framer-motion"
import { ProfileButtonLinks } from '@/const/const'
import Link from 'next/link'
import LogoutButton from '../../buttons/LogoutButton'

const ProfileModal = ({ username }: { username: string }) => {
  const profileButtonHover = useAppSelector((state: RootState) => state.utility.profileButtonHover);

  return (
    <AnimatePresence>
      {profileButtonHover && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 270, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute w-[300px] top-[40px] -left-[160px] p-[1rem] bg-white rounded-[10px] shadow-xl overflow-hidden z-50"
        >
          <VStack width={'100%'} height={'100%'} alignItems={'start'} justifyContent={'space-between'}>
            <Flex alignItems={'center'} width={'100%'} gap={'10px'} cursor={'pointer'} padding={'.4rem'} borderRadius={'10px'} className='border shadow-lg'>
              <AvatarIcon size={25} color='black' />
              <Heading as={'h1'} fontSize={'1rem'} fontWeight={'bold'}>{username}</Heading>
            </Flex>
            <VStack width={'100%'} alignItems={'start'} gap={0}>
              {ProfileButtonLinks?.map((item:any) => (
                <Link key={item?.id} href={item?.link} className='p-[.4rem] rounded-[7px] hover:bg-gray-200 w-full'>
                  <Heading as={'h4'} fontSize={'.8rem'} textTransform={'capitalize'}>{item?.label}</Heading>
                </Link>
              ))}
            </VStack>
            <LogoutButton />
          </VStack>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal