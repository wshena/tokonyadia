'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Box, Center, Flex } from '@chakra-ui/react'

const SmallImage = ({imageArray, index, handleClick}:{imageArray:any, index:number, handleClick:any}) => {
  return (
    <Flex alignItems={'center'} gap={'20px'} flexWrap={'wrap'} width={{base:' 268px',  md:'268px', lg:'240px', xl:'348px'}}>
      {imageArray.map((item:any, idx:number) => (
        <button key={idx} onClick={() => handleClick(idx)}>
          <Box position={'relative'} width={'60px'} height={'60px'} borderRadius={'5px'} className={`${idx === index && 'border border-mainGreen'}`}>
            <Image src={item} alt='product-image' fill className='rounded-[5px]' />
          </Box>
        </button>
      ))}
    </Flex>
  )
}

const ProductImage = ({imageArray}:{imageArray:any}) => {
  const [index, setIndex] = useState(0)
  const [src, setSrc] = useState(imageArray[index])
  const handleImageClick = (index:number) => setIndex(index)

  useEffect(() => {
    setSrc(imageArray[index])
  }, [index])

  return (
    <Center width={{base:'100%', md:'fit'}}>
      <Box width={{base:' 268px',  md:'268px', lg:'240px', xl:'348px'}}>
        <Box position={'relative'} width={'100%'} height={{base:'268px', md:'268px', lg:'240px', xl:'348px'}} borderRadius={'10px'} marginBottom={'20px'}>
          <Image src={src} alt='product-image' fill className='rounded-[10px]' />
        </Box>
        <SmallImage imageArray={imageArray} index={index} handleClick={handleImageClick} />
      </Box>
    </Center>
  )
}

export default ProductImage