'use client'
import React, { useEffect, useRef, useState } from 'react'
import Carousel from './Carousel'
import { Box } from '@chakra-ui/react'
import Slider from 'react-slick';
import Image from 'next/image';
import { HomeCarouselContent } from '@/const/const';
import PrevButton from '../buttons/PrevButton';
import NextButton from '../buttons/NextButton';

const settings = {
  dots: true,
  dotsClass: "slick-dots !absolute !bottom-[5px] md:!bottom-[20px] !left-1 md:!left-[30px] !flex !justify-start",
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  customPaging: (i: any) => (
    <span className="block rounded-full w-[8px] h-[8px] bg-gray-500 transition-all duration-300"></span>
  ),
};

const HomeCarousel = () => {
  // carousel ref
  const sliderRef = useRef<Slider>(null);
  // handle next slide
  const handleNext = () => {
    sliderRef.current?.slickNext();
  };
  // handle prev slide
  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  // automatic next slide
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000);
  
    return () => clearInterval(interval);
  }, []);

  // handle hover carousel
  const [hover, setHover] = useState(false);

  return (
    <Box width={'100%'} cursor={'pointer'} position={'relative'} borderRadius={'10px'} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <Carousel ref={sliderRef} settings={settings} style='rounded-[10px]'>
        {HomeCarouselContent.map((item:any, idx:number) => (
          <Box key={item?.id} width={'100%'} height={{base:'130px', md:'200px', lg:'300px'}} position={'relative'} borderRadius={'10px'}>
            <Image src={item?.image} fill alt={`item-${idx}`} className='rounded-[10px]'/>
          </Box>
        ))}
      </Carousel>
      <PrevButton handleClick={handlePrev} hover={hover} />
      <NextButton handleClick={handleNext} hover={hover} />
    </Box>
  )
}

export default HomeCarousel