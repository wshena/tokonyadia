'use client'
import { ProductFilterDropdown } from '@/const/filterConst';
import { setSortOrder } from '@/redux/slice/utility';
import { useAppDispatch } from '@/redux/store';
import { Box, Flex, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const SortFilter = () => {
  const dispatch = useAppDispatch();

  // State disimpan sebagai string, default kosong
  const [value, setValue] = useState<string>('');

  // Event handler mengupdate state dengan string value
  const handleValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    // Hanya dispatch jika value tidak kosong
    if (value) {
      try {
        const parsedValue = JSON.parse(value);
        dispatch(setSortOrder(parsedValue));
      } catch (error) {
        console.error('Error parsing sort option:', error);
      }
    }
  }, [value, dispatch]);

  return (
    <Flex alignItems={'center'} gap={'10px'}>
      <Heading
        as={'h1'}
        fontSize={'1rem'}
        fontWeight={'bold'}
        textTransform={'capitalize'}
      >
        urutkan:
      </Heading>
      <select
        name="sort"
        id="sort"
        value={value}
        onChange={handleValue}
        className='p-[.7rem] text-[1rem] capitalize focus:outline-none'
      >
        {ProductFilterDropdown?.map((item: any) => (
          <option
            key={item?.id}
            value={JSON.stringify({ filter: item?.value, order: item?.order })}
            className='capitalize'
          >
            {item?.filter}
          </option>
        ))}
      </select>
    </Flex>
  )
}

export default SortFilter;
