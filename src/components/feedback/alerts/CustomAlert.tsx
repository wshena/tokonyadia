'use client'
import React from 'react'
import { Alert, Box, Center } from "@chakra-ui/react"
import { CancelIcon } from '@/components/icons/Icons'
import { useAppDispatch } from '@/redux/store'
import { setAlert } from '@/redux/slice/utility'

const CustomAlert = ({label, type}:{label:string, type: 'success' | 'error' | 'warning' | 'info' }) => {
  const dispatch = useAppDispatch();

  return (
    <Center position={'fixed'} width={'100%'} height={'fit'} top={'50px'} left={'0px'} zIndex={50}>
      <Alert.Root status={type} padding={'1rem'} width={'fit'}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>{label}</Alert.Title>
        </Alert.Content>
        {/* <button onClick={() => {
          dispatch(setAlert({
            label: '',
            type: 'success'
          }))
        }}> <CancelIcon size={20} color='black' /> </button> */}
      </Alert.Root>
    </Center>
  )
}

export default CustomAlert