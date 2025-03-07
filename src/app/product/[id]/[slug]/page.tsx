import { Breadcrumb, Stack } from '@chakra-ui/react';
import React from 'react'

// import utility
import { GetAllProducts } from '@/utility/fetcher';
import { createSlug } from '@/utility/functions';

// import components
import MainWrapper from '@/components/wrapper/MainWrapper';
import PageContent from '@/components/wrapper/PageContent';
import ProductImage from '@/components/productDetail/ProductImage';
import SameCategory from '@/components/productDetail/SameCategory';
import AddToCartCard from '@/components/productDetail/AddToCartCard';
import ProductDescription from '@/components/productDetail/ProductDescription';


const BreadcrumbContent = ({slug, categoryId, categoryName}:{slug:string, categoryId:string, categoryName:string}) => {
  const categorySlug = createSlug(categoryName)
  
  return (
    <Breadcrumb.Root size={{base:'sm', md:'md'}}>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Ellipsis />
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href={`/category/${categoryId}/${categorySlug}`}>{categorySlug}</Breadcrumb.Link>
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
  const {id, slug} = await params;
  const productDetail = await GetAllProducts({
    id: id
  })
  
  return (
    <MainWrapper>
      <PageContent>
        <BreadcrumbContent slug={slug} categoryId={productDetail?.category_id} categoryName={productDetail?.category} />
        <Stack direction={{base:'column', md:'row'}} wrap={{base:'nowrap', md:'wrap', lg:'nowrap'}} alignItems={'start'} justifyContent={'space-between'} color={'black'} className='relative' gap={{base:'30px', md:'0'}} marginBottom={'50px'}>
          <ProductImage imageArray={productDetail?.images?.["800x900"]} />
          <ProductDescription product={productDetail} />
          <AddToCartCard productData={productDetail} />
        </Stack>
        <SameCategory categoryId={productDetail?.category_id} />
      </PageContent>
    </MainWrapper>
  )
}

export default page