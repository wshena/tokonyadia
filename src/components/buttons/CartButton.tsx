'use client'
import { Box } from '@chakra-ui/react'
import React from 'react'
import { CartIcon } from '../icons/Icons'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { setCartButtonHover } from '@/redux/slice/utility'
import CartModal from '../modals/CartModal'

const CartButton = () => {
  const dispatch = useAppDispatch();
  const hover = useAppSelector((state:RootState) => state.utility.cartButtonHover);
  const userProduct = useAppSelector((state:RootState) => state.cart.carts);

  const productQuantity = userProduct?.products?.map((item:any) => item.quantity)  ;
  const total = productQuantity?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  console.log(userProduct)

  return (
      <Box position={'relative'} display={{base:'none', md:'block'}} onMouseEnter={() => dispatch(setCartButtonHover(true))} onMouseLeave={() => dispatch(setCartButtonHover(false))}>
        <button> <CartIcon size={25} color='black' /> </button>

        {/* count notification */}
        {total !== 0 && (
          <Box position={'absolute'} top={'-15px'} right={'-5px'} width={'fit'} paddingY={'0rem'} paddingX={'.5rem'} color={'white'} className='rounded-full bg-red-400'>
            <span className='text-[.8rem]'>{total}</span>
          </Box>
        )}

        {hover && (
          <Box position={'absolute'} top={'30px'} right={'-100px'}>
            <CartModal />
          </Box>
        )}
      </Box>
  )
}

export default CartButton