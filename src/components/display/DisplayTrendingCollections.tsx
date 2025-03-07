'use client'

import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Center, Flex, For, Grid, Heading, Stack } from '@chakra-ui/react'

// import utility
import { useSWRCaching } from '@/utility/swr'
import { createSlug, getRandomElements } from '@/utility/functions';

// import components
import CollectionCard from '../cards/CollectionCard';
import SkeletonLoader from '../loading/SkeletonLoader';

const DisplayTrendingCollections = ({initialData}:{initialData:any}) => {
  const { data } = useSWRCaching(initialData);
  
  const [randomCol, setRandomCol] = useState<any[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setRandomCol(getRandomElements(data, 8))
    }
  }, [data]);

  // onClick handle
  const handleRandomize = () => {
    if (data && data.length > 0) {
      setRandomCol(getRandomElements(data, 8))
    }
  }

  return (
    <Stack alignItems={'start'} width={'100%'} gap={'20px'}>
      <Flex alignItems={'center'} gap={'10px'}>
        <Heading as={'h1'} fontSize={{base:'1.4rem', md:'2rem'}} fontWeight={'bold'}>Lagi trending, nih</Heading>
        <button onClick={handleRandomize} className='text-mainGreen text-[1rem] capitalize'>Muat Lainnya</button>
      </Flex>
      <Flex alignItems={'center'} width={'100%'} justifyContent={'center'}>
        <Grid gap={{base:'10px', md:'15px'}} templateColumns={{base:'repeat(1, 1fr)', md:'repeat(2, 1fr)', lg:'repeat(3,1fr)', xl:'repeat(4, 1fr)'}}>
          {(!data && data.length < 0) ? (
            <Center width={'100%'}>
              <Heading as={'h1'} fontWeight={'bold'} fontSize={'1.4rem'}>Tidak ada item</Heading>
            </Center>
          ) : (
            <For 
              each={randomCol}
              fallback={
                <>
                {Array.from({length:8}).map((_,idx:number) => (
                  <SkeletonLoader key={idx} width={{base:'250px', md:'290px'}} height='100px' />
                ))}
                </>
              }
            >
              {
                (item) => {
                  const slug = createSlug(item?.title);
                  return (
                    <Link href={`/collection/${item?.collection_id}/${slug}`} className='w-fit' key={item?.collection_id}>
                      <CollectionCard data={item} />
                    </Link>
                  )
                }
              }
            </For>
          )}
        </Grid>
      </Flex>
    </Stack>
  )
}

export default DisplayTrendingCollections