import { EyeIcon, EyeSlashIcon } from '@/components/icons/Icons';
import { createUser } from '@/lib/db';
import { supabase } from '@/lib/supabaseClient';
import { Flex, Heading, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const formStyle = 'border-2 p-2 w-full focus:outline-none rounded-[10px]'

const Step2 = ({ prevStep, updateFormData, formData }: any) => {
  const router = useRouter();

  const [passClick, setPassClick] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({
      email: formData?.email,
      password: formData?.password,
    })
    
    if (data?.user?.id) {
      await createUser(data?.user?.id, {...formData});
    }

    if (error) {
      setError(error.message); 
      console.error('Signin error:', error.message);
    } else {
      router.push('/auth/login')
      console.log(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Heading as={'h3'} color={'red.500'}>{error}</Heading>
      <Stack alignItems={'start'} width={'100%'} gap={'20px'}>
        {/* email */}
        <input
          type="email"
          placeholder="Alamat Email"
          required
          onChange={(e) => updateFormData({ email: e.target.value })}
          className={formStyle}
        />

        {/* password */}
        <Flex width="100%" alignItems="center" justifyContent="space-between" padding=".6rem" borderRadius="10px" className="border-2">
          <input
            type={passClick ? 'text' : 'password'}
            name="password"
            id="password"
            onChange={(e) => updateFormData({ password: e.target.value })}
            className="border-none focus:outline-none w-full"
            required
            placeholder="Masukkan password"
          />
          <button
            type="button"
            onClick={() => setPassClick(!passClick)}
            className="p-1"
          >
            {passClick ? <EyeSlashIcon size={20} color="black" /> : <EyeIcon size={20} color="black" />}
          </button>
        </Flex>
      </Stack>
      
      <div className="flex justify-between mt-[20px]">
        <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">Kembali</button>
        <button type="submit" className="bg-mainGreen text-white px-4 py-2 rounded">Submit</button>
      </div>
    </form>
  )
}

export default Step2