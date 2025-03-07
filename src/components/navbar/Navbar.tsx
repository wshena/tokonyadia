'use client'
import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Box, Flex } from '@chakra-ui/react'

// import components
import Logo from './Logo'
import SearchForm from '../form/SearchForm'
import CartButton from '../buttons/CartButton'
import MenuButton from '../buttons/MenuButton'
import LoginButton from '../buttons/LoginButton'
import SearchButton from '../buttons/SearchButton'
import ProfileButton from '../buttons/ProfileButton'
import RegisterButton from '../buttons/RegisterButton'

const Navbar = () => {
  const user = useSelector((state:RootState) => state.auth.user)
  console.log(user)
  return (
    <Box width={'100%'} paddingY={'20px'} paddingX={{base:'20px', "2xl":'100px'}}>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Flex alignItems={'center'} width={{base:'100%', md:'fit'}} justifyContent={{base:'space-between', md:'normal'}} gap={{base:'15px', "2xl":'30px'}}>
          <Logo />
          <MenuButton />
          <Link href={'/category/all'} className='hidden md:inline-block '>
            <button className='capitalize text-gray-600'>kategori</button>
          </Link>
          <SearchForm />
        </Flex>
        <Flex alignItems={'center'} gap={{base:'20px', "2xl":'30px'}}>
          <CartButton />
          {(!user || user?.length === 0 || Object.keys(user).length === 0) ? (
            <Flex display={{base:'none', md:'flex'}} alignItems={'center'} gap={{base:'10px', "2xl":'20px'}}>
              <LoginButton />
              <RegisterButton />
            </Flex>
          ) : (
            <ProfileButton username={user?.username} />
          )}
        </Flex>
      </Flex>
      <Box display={{base:'block', lg:'none'}} marginTop={'10px'}>
        <SearchButton />
      </Box>
    </Box>
  )
}

export default Navbar