import { Flex, Heading, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'

const formStyle = 'border-2 p-2 w-full focus:outline-none rounded-[10px]'

const Step1 = ({ nextStep, updateFormData }: any) => {
  const [selectedGender, setSelectedGender] = useState('');

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedGender(value);
    updateFormData({ sex: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack alignItems={'start'} width={'100%'} gap={'20px'}>
        {/* username */}
        <input
          type="text"
          placeholder="Username"
          required
          onChange={(e) => updateFormData({ username: e.target.value })}
          className={formStyle}
          autoComplete='off'
        />

        {/* firstname and lastname */}
        <Flex alignItems={'center'} justifyContent={'space-between'} gap={'10px'} width={'100%'}>
          <input
            type="text"
            placeholder="First Name"
            required
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            className={formStyle}
            autoComplete='off'
          />
          <input
            type="text"
            placeholder="Last Name"
            required
            onChange={(e) => updateFormData({ lastName: e.target.value })}
            className={formStyle}
            autoComplete='off'
          />
        </Flex>

        {/* phone number */}
        <input
          type="text"
          placeholder="Nomor Handphone"
          required
          onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
          className={formStyle}
          autoComplete='off'
        />

        {/* jenis kelamin */}
        <Flex alignItems={'center'} gap={'10px'}>
          <Flex alignItems="center" gap="8px">
            <label htmlFor="male">
              <Heading as="h4" fontSize="1rem">Laki-laki</Heading>
            </label>
            <input
              type="radio"
              name="sex"
              id="male"
              value="laki-laki"
              checked={selectedGender === "laki-laki"}
              onChange={handleGenderChange}
              required
            />
          </Flex>

          <Flex alignItems="center" gap="8px">
            <label htmlFor="female">
              <Heading as="h4" fontSize="1rem">Perempuan</Heading>
            </label>
            <input
              type="radio"
              name="sex"
              id="female"
              value="perempuan"
              checked={selectedGender === "perempuan"}
              onChange={handleGenderChange}
              required
            />
          </Flex>
        </Flex>

        {/* alamat */}
        <textarea
          placeholder="Alamat"
          required
          onChange={(e) => updateFormData({ address: e.target.value })}
          className={formStyle}
          autoComplete='off'
          rows={5}
          cols={50}
        />

        {/* tanggal lahir */}
        <Flex alignItems={'center'} gap={'20px'}>
          <label htmlFor='date'>Tanggal Lahir: </label>
          <input type="date" name="date" id="date" required onChange={(e) => updateFormData({ date: e.target.value })} />
        </Flex>
      </Stack>
      <button type="submit" className="mt-4 bg-mainGreen text-white px-4 py-2 rounded">Selanjutnya</button>
    </form>
  )
}

export default Step1