import React from 'react'
import { MenuIcon } from '../icons/Icons'
import { useAppDispatch } from '@/redux/store'
import { setMobileNavButton } from '@/redux/slice/utility';

const MenuButton = () => {
  const dispatch = useAppDispatch();

  return (
    <button onClick={() => dispatch(setMobileNavButton(true))} className='block md:hidden'>
      <MenuIcon size={20} color='black' />
    </button>
  )
}

export default MenuButton