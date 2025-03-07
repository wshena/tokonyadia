'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Box, Flex, Heading, Stack } from '@chakra-ui/react'
import { MetodePembayaran, MetodePengiriman } from '@/const/const'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { setMetodePembarayan, setPengiriman } from '@/redux/slice/order'
import { PenIcon } from '@/components/icons/Icons'
import { buyProduct } from '@/utility/fetcher'
import { setAlert } from '@/redux/slice/utility'
import { useRouter } from 'next/navigation'

const H1 = ({label}:{label:string}) => {
  return (
    <Heading as="h1" fontWeight="bold" fontSize={{ base: '1rem', md: '1.3rem' }}>
      {label}
    </Heading>
  )
}

const Duration = () => {
  const dispatch = useAppDispatch();

  const [delivery, setDelivery] = useState(MetodePengiriman[0].value);
  
  // Pindahkan onChange ke elemen <select>
  const handlePengiriman = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDelivery(e.target.value);
  }

  useEffect(() => {
    dispatch(setPengiriman(delivery))
  }, [delivery])
  
  return (
    <Stack width="100%" alignItems="start" gap="15px">
      <H1 label='Metode Pengiriman' />
      <select
        name="metode-pengiriman"
        id="metode-pengiriman"
        value={delivery}
        onChange={handlePengiriman}
        className='w-full p-[.7rem] focus:outline-none rounded-[10px]'
      >
        {MetodePengiriman.map((item: any) => (
          <option value={item.value} key={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </Stack>
  );
}

const PaymentMethod = () => {
  const dispatch = useAppDispatch();

  const [paymentMethod, setPaymentMethod] = useState(MetodePembayaran[0].value);
  
  // Pindahkan onChange ke elemen <select>
  const handlePengiriman = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  }

  useEffect(() => {
    dispatch(setMetodePembarayan(paymentMethod))
  }, [paymentMethod])

  return (
    <Stack width="100%" alignItems="start" gap="15px">
      <H1 label='Metode Pembayaran' />
      <select
        name="metode-pengiriman"
        id="metode-pengiriman"
        value={paymentMethod}
        onChange={handlePengiriman}
        className='w-full p-[.7rem] focus:outline-none rounded-[10px]'
      >
        {MetodePembayaran.map((item: any) => (
          <option value={item.value} key={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </Stack>
  );
}


const Checkout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user } = useAppSelector((state: RootState) => state.auth);
  const { totalPembayaran, metodePembayaran, pengiriman } = useAppSelector((state: RootState) => state.order);
  const { carts } = useAppSelector((state: RootState) => state.cart);

  const [address, setAddress] = useState<string>(user?.address || '');
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      // Membersihkan timer jika komponen di-unmount
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleBuy = async () => {
    const order = {
      userId: user.id,
      products: carts.products,
      totalAmount: totalPembayaran,
      currency: carts?.products[0]?.productData?.price?.currency,
      address: user?.address,
      paymentMethod: metodePembayaran,
      deliveryMethod: pengiriman,
      notes: notes,
    };

    try {
      const buy = await buyProduct(order);
      dispatch(setAlert({
        label: 'Pembelian berhasil',
        type: 'success'
      }));
      router.push('/order-list')
      return buy;
    } catch (error) {
      console.error('Error saat pembelian:', error);
      dispatch(setAlert({
        label: 'Terjadi kesalahan saat pembelian',
        type: 'error'
      }));
      return null;
    }
  };

  const handleClick = () => {
    setLoading(true); // Tampilkan loading segera setelah tombol diklik
    timerRef.current = setTimeout(async () => {
      await handleBuy();
      setLoading(false); // Reset loading setelah handleBuy selesai
    }, 3000);
  };

  return (
    <Stack alignItems={'start'} width={'70%'} gap={'15px'} padding={'1rem'} backgroundColor={'white'} rounded={'10px'} className='shadow-lg border'>
      <Duration />
      <Stack width={'100%'} alignItems={'start'} gap={'10px'}>
        <label htmlFor="address">
          <H1 label='Alamat Pengiriman' />
        </label>
        <Flex alignItems={'center'} justifyContent={'space-between'} width={'100%'} padding={'1rem'} backgroundColor={'white'} borderRadius={'10px'} className='border'>
          <input
            type="text"
            name="address"
            id="address"
            placeholder='alamat pengiriman'
            className='focus:outline-none w-full'
            autoComplete='off'
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
          />
          <PenIcon size={20} color='gray' />
        </Flex>
      </Stack>
      <Stack width={'100%'} alignItems={'start'} gap={'10px'}>
        <label htmlFor="notes">
          <H1 label='Catatan' />
        </label>
        <textarea
          name="notes"
          id="notes"
          cols={30}
          rows={3}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
          value={notes}
          className='w-full p-[1rem] focus:outline-none border rounded-[10px]'
        ></textarea>
      </Stack>
      <PaymentMethod />
      <Flex justifyContent={'end'} width={'100%'}>
        <button
          onClick={handleClick}
          className='mt-[20px] py-[.8rem] px-[1.3rem] bg-mainGreen text-white rounded-[10px] font-bold'
        >
          {loading ? (
            <span>Sedang diproses</span>
          ) : (
            <span>Lanjutkan Pembayaran {totalPembayaran}</span>
          )}
        </button>
      </Flex>
    </Stack>
  );
};

export default Checkout