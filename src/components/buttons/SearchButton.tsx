'use client'
import React from 'react'
import { SearchIcon } from '../icons/Icons'
import { useAppDispatch } from '@/redux/store';
import { setSearchButton } from '@/redux/slice/utility';

const SearchButton = () => {
  const dispatch = useAppDispatch();

  return (
    <button onClick={() => dispatch(setSearchButton(true))} className="flex lg:hidden items-center gap-[10px] p-[.5rem] rounded-[10px] border-2 border-gray-300 w-full">
      <SearchIcon size={15} color="black" />
      <span className="text-[.8rem]">Cari di Tokonyadia</span>
    </button>
  )
}

export default SearchButton