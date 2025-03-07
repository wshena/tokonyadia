import Link from 'next/link'
import React from 'react'

const RegisterButton = () => {
  return (
    <Link href={'/auth/signup'}>
      <button className='rounded-[10px] px-[.9rem] py-[.4rem] bg-mainGreen text-white hover:bg-white hover:text-mainGreen border hover:border-mainGreen font-bold capitalize text-[.8rem]'>daftar</button>
    </Link>
  )
}

export default RegisterButton