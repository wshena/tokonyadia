'use client'
import React, { useState } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import { Box, Heading, Stack } from '@chakra-ui/react'
import Link from 'next/link'

const SigninForm = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    sex: '',
    phoneNumber: '',
    address: '',
    date: '',
    profilePicture: '',
  })

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  const updateFormData = (data: any) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };
  

  return (
    <Box width={{base:'300px', md:'500px'}} paddingX={'1.4rem'} paddingY={'3rem'} backgroundColor={'white'} borderRadius={'10px'} className="border shadow-lg">
      <Stack alignItems={'start'} marginBottom={'30px'}>
        <Heading as={'h1'} fontSize={{base:'1rem', md:'1.5rem'}} fontWeight={'bold'}>Daftar ke Tokonyadia</Heading>
        <Heading as={'h2'} fontSize={'.9rem'}>
          <span>Sudah ada akun? </span>
          <Link href={'/auth/login'} className='text-mainGreen'>Masuk ke Tokonyadia</Link>
        </Heading>
      </Stack>
      
      {step === 1 && <Step1 nextStep={nextStep} updateFormData={updateFormData} />}
      {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />}
    </Box>
  )
}

export default SigninForm