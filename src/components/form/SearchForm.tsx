import React, { useState } from 'react'
import { SearchIcon } from '../icons/Icons'

const SearchForm = () => {
  const [searchInput, setSearchInput] = useState('')

  return (
    <form
      action=""
      method="get"
      className="hidden lg:flex py-[.5rem] px-[.8rem] rounded-[10px] flex items-center gap-[10px] border-2 border-gray-300 lg:w-[450px] xl:w-[800px] 2xl:w-[1000px]"
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
  )
}

export default SearchForm