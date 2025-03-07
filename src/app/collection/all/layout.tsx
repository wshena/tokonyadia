import SideTabs from '@/components/tabs/SideTabs'
import MainWrapper from '@/components/wrapper/MainWrapper'
import PageContent from '@/components/wrapper/PageContent'
import { GetAllCollection } from '@/utility/fetcher'
import { HStack, Stack } from '@chakra-ui/react'
import React from 'react';

const CategoryPageLayout = async ({children}:{children:React.ReactNode}) => {
  const allCollection = await GetAllCollection();
  const collectionTitles = allCollection?.map((item:any) => item?.title);

  return (
    <MainWrapper>
      <PageContent>
        <Stack direction={{base:'column', lg:'row'}} alignItems={'start'} gap={'20px'} justifyContent={'space-between'}>
          <SideTabs labels={collectionTitles} />
          {children}
        </Stack>
      </PageContent>
    </MainWrapper>
  )
}

export default CategoryPageLayout