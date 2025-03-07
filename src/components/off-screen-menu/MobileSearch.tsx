'use client'
import { Box, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ArrowUpIcon, SearchIcon } from '../icons/Icons';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';
import { setSearchButton } from '@/redux/slice/utility';

const MobileSearch = () => {
  const dispatch = useAppDispatch();
  const searchButton = useAppSelector((state:RootState) => state.utility.searchButton);
  const [searchInput, setSearchInput] = useState('');

  return (
    <Box width={'100vw'} zIndex={50} height={'100vh'} position={'fixed'} top={0} left={0} backgroundColor={'white'} padding={'1rem'} display={{base:'block', lg:'hidden'}} className={`transform transition-all duration-300 ease-in-out ${searchButton ? 'translate-y-0' : '-translate-y-[2000px]'}`}>
      <Flex alignItems={'center'} gap={{base:'10px', md:'20px'}}>
        <button onClick={() => dispatch(setSearchButton(false))}>
          <ArrowUpIcon size={20} color='black' />
        </button>
        <form
          action=""
          method="get"
          className="flex py-[.5rem] px-[.8rem] rounded-[10px] flex items-center gap-[10px] border-2 border-gray-300 w-[80vw]"
        >
          <SearchIcon size={20} color="black"/>
            <input
              type="text"
              name="product-form"
              id="product-form"
              placeholder="Cari di Tokonyadia"
              className="w-full bg-white text-black focus:outline-none"
              autoComplete="false"
              value={searchInput}
              onChange={(e:any) => setSearchInput(e.target.value)}
          />
        </form>
      </Flex>
    </Box>
  )
}

export default MobileSearch