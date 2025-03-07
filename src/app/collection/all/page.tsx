'use client'
import ProductsDisplay from '@/components/display/ProductsDisplay'
import { RootState, useAppSelector } from '@/redux/store'
import { GetAllCollection } from '@/utility/fetcher'
import { Center, Heading, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const page = () => {
  const sideTabs = useAppSelector((state:RootState) => state.utility.sideTabs);
  const [allCollection, setAllCollection] = useState<any | null>(null);
  const [currentDisplayProducts, setCurrentDisplayProducts] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await GetAllCollection();
        setAllCollection(res);
      } catch (error) {
        console.error('Error fetching collections:', error);
        setAllCollection(null);
      }
    };

    fetchCollections();
  }, []);

  useEffect(() => {
    if (!allCollection || allCollection.length === 0) return;

    if (sideTabs) {
      const products = allCollection.find((item: any) => item?.title === sideTabs);
      setCurrentDisplayProducts(products || null);
    } else {
      setCurrentDisplayProducts(allCollection[0] || null);
    }
  }, [sideTabs, allCollection]);

  return (
    <Stack alignItems={'start'} width={'100%'} gap={'20px'}>
      {sideTabs === '' ? (
        <Center width={'100%'} height={'400px'}>
          <Heading as={'h1'} fontSize={{base:'1rem', md:'1.4rem'}}>Klik koleksi pilihan anda</Heading>
        </Center>
      ) : (
        <>
          <Heading fontSize={{base:'1rem', md:'1.4rem'}} fontWeight={'bold'}>{sideTabs}</Heading>
          <ProductsDisplay initialData={currentDisplayProducts} />
        </>
      )}
    </Stack>
  )
}

export default page