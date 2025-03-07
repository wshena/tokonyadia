'use client'
import { UserSettings } from '@/const/const';
import { Flex } from '@chakra-ui/react'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const TabsButton = ({tab}:{tab:any}) => {
  const pathname = usePathname();

  return (
    <Link href={tab.link} className={`p-[.8rem] md:p-[1rem] border-b-2 ${tab?.link === pathname ? 'border-b-mainGreen font-bold text-mainGreen' : 'border-b-white font-bold text-gray-600'}`}>
      <span className='text-[.7rem] md:text-[1rem]'>{tab.label}</span>
    </Link>
  )
}

const SettingTabs = () => {
  return (
    <Flex marginTop={'10px'} alignItems={'center'} gap={{base:'0px', md:'15px'}}>
      {UserSettings?.map((item:any) => (
        <TabsButton tab={item} key={item?.id} />
      ))}
    </Flex>
  )
}

export default SettingTabs