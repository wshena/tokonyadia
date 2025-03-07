import SideTabs from '@/components/tabs/SideTabs';
import MainWrapper from '@/components/wrapper/MainWrapper'
import PageContent from '@/components/wrapper/PageContent'
import { GetAllCategory } from '@/utility/fetcher';
import { Stack } from '@chakra-ui/react';
import React from 'react'

const CategoryPageLayout = async ({children}:{children:React.ReactNode}) => {
  const allCategory = await GetAllCategory();
  const categoryTitles = allCategory?.map((item:any) => item?.title);
  
  return (
    <MainWrapper>
      <PageContent>
        <Stack direction={{base:'column', lg:'row'}} alignItems={'start'} gap={'20px'} justifyContent={'space-between'}>
          <SideTabs labels={categoryTitles} />
          {children}
        </Stack>
      </PageContent>
    </MainWrapper>
  )
}

export default CategoryPageLayout