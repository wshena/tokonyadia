import Link from 'next/link'
import React from 'react'

const LoginButton = () => {
  return (
    <Link href={'/auth/login'}>
      <button className='rounded-[10px] px-[.9rem] py-[.4rem] text-mainGreen border border-mainGreen hover:bg-mainGreen hover:text-white font-bold capitalize text-[.8rem]'>masuk</button>
    </Link>
  )
}

export default LoginButton