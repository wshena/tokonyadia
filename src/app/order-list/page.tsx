import React from 'react'

import { GetAllOrder, GetAllProducts } from '@/utility/fetcher';

import OrderList from './OrderList';
import MainWrapper from '@/components/wrapper/MainWrapper'
import PageContent from '@/components/wrapper/PageContent'

const page = async () => {
  const allOrder = await GetAllOrder();
  const allProduct = await GetAllProducts();

  return (
    <MainWrapper>
      <PageContent>
        <OrderList orderList={allOrder} allProduct={allProduct} />
      </PageContent>
    </MainWrapper>
  )
}

export default page