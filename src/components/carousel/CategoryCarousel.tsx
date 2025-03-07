'use client'

import Link from 'next/link'
import Slider from 'react-slick'
import React, { useRef, useState } from 'react'
import { Box, Flex, For, Heading, Stack } from '@chakra-ui/react'

// import utility
import { useSWRCaching } from '@/utility/swr'
import { createSlug } from '@/utility/functions'

// import components
import Carousel from '../carousel/Carousel'
import PrevButton from '../buttons/PrevButton'
import NextButton from '../buttons/NextButton'
import CategoryCard from '../cards/CategoryCard'
import SkeletonLoader from '../loading/SkeletonLoader'

// carousel settings
const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
  ]
};

const CategoryCarousel = ({initialData}:{initialData:any}) => {
  const {data, error} = useSWRCaching(initialData);
  const sliderRef = useRef<Slider>(null);
  
  const handleNext = () => {
    sliderRef.current?.slickNext();
  };
  
  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  // handle hover carousel
  const [hover, setHover] = useState(false);

  return (
    <Stack alignItems={'start'} gap={'20px'}>
      <Heading as={'h1'} fontWeight={'bold'} fontSize={{base:'1rem', md:'1.3rem'}}>Kategori Pilihan</Heading>
      {(!data || data.length < 0) ? (
        <Flex width={'100%'} alignItems={'center'} justifyContent={'space-between'}>
          {Array.from({length: 8}).map((_,idx:number) => (
            <SkeletonLoader key={idx} width={{base:'100px', md:'120px', lg:'128px'}} height={'128px'} />
          ))}
        </Flex>
      ) : (
        <Box width={'100%'} cursor={'pointer'} position={'relative'} borderRadius={'10px'} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <Carousel ref={sliderRef} settings={settings} style='pb-o'>
            {data.map((item:any) => {
              const slug = createSlug(item?.title)
              return (
                <Link key={item?.category_id} href={`/category/${item?.category_id}/${slug}`}>
                  <CategoryCard data={item} />
                </Link>
              )
            })}
          </Carousel>
          <PrevButton handleClick={handlePrev} hover={hover} />
          <NextButton handleClick={handleNext} hover={hover} />
        </Box>
      )}
    </Stack>
  )
}

export default CategoryCarousel