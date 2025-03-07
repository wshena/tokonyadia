import React from 'react'
import { Breadcrumb, HStack } from "@chakra-ui/react"

// import utility
import { GetAllCollection } from '@/utility/fetcher';

// import component
import MainWrapper from '@/components/wrapper/MainWrapper';
import PageContent from '@/components/wrapper/PageContent';
import ProductsDisplay from '@/components/display/ProductsDisplay';
import DisplayTrendingCollections from '@/components/display/DisplayTrendingCollections';

const BreadcrumbContent = ({slug}:{slug:string}) => {
  return (
    <Breadcrumb.Root size={{base:'sm', md:'md'}}>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/collection/all">Collections</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.CurrentLink>{slug}</Breadcrumb.CurrentLink>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}

const page = async ({params}:{params:any}) => {
  const {id, slug} = params;
  const results = await Promise.allSettled([
      GetAllCollection(),
      GetAllCollection({
        id: id
      })
    ]);
      
    // check the result of all promise
  const allCollections = results[0].status === "fulfilled" ? results[0].value : null;
  const collectionData = results[1].status === "fulfilled" ? results[1].value : null;

  return (
    <MainWrapper>
      <PageContent>
        <BreadcrumbContent slug={slug} />
        <ProductsDisplay initialData={collectionData} />
        <DisplayTrendingCollections initialData={allCollections} />
      </PageContent>
    </MainWrapper>
  )
}

export default page
