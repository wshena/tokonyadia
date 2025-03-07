import React from 'react'
import { Breadcrumb, Stack } from "@chakra-ui/react"

// import utility
import { GetAllCategory } from '@/utility/fetcher';

// import component
import MainWrapper from '@/components/wrapper/MainWrapper';
import PageContent from '@/components/wrapper/PageContent';
import ProductsDisplay from '@/components/display/ProductsDisplay';
import CategoryCarousel from '@/components/carousel/CategoryCarousel';

const BreadcrumbContent = ({slug}:{slug:string}) => {
  return (
    <Breadcrumb.Root size={{base:'sm', md:'md'}}>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/category/all">Category</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.CurrentLink>{slug}</Breadcrumb.CurrentLink>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}

const page = async ({params}:{params:{id:string, slug:string}}) => {
  const {id, slug} = params;
  const results = await Promise.allSettled([
    GetAllCategory(),
    GetAllCategory({
      id: id
    })
  ]);
    
  // check the result of all promise
  const allCategory = results[0].status === "fulfilled" ? results[0].value : null;
  const categoryData = results[1].status === "fulfilled" ? results[1].value : null;

  return (
    <MainWrapper>
      <PageContent>
        <Stack alignItems={'start'}>
          <BreadcrumbContent slug={slug} />
          <ProductsDisplay initialData={categoryData} />
        </Stack>
        <CategoryCarousel initialData={allCategory} />
      </PageContent>
    </MainWrapper>
  )
}

export default page
