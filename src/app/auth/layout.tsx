'use client'
import React, { useEffect } from 'react'
import { setAlert } from '@/redux/slice/utility'
import CustomAlert from '@/components/feedback/alerts/CustomAlert'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  const dispatch = useAppDispatch();
  const alert = useAppSelector((state:RootState) => state.utility.alert)

  useEffect(() => {
    setTimeout(() => {
      dispatch(setAlert({
        label: '',
        type: 'success'
      }))
    }, 2000)
  }, [])

  return (
    <>
      {children}

      {(alert && alert?.label !== '') && (
        <CustomAlert label={alert.label} type={alert.type} />
      )}
    </>
  )
}

export default AuthLayout