'use client'

import { useRouter } from 'next/navigation'
import { setAlert } from '@/redux/slice/utility'
import { tryAddToCart } from '@/redux/slice/cart'
import React, { useCallback, useState } from 'react'
import { Box, Flex, Heading, HStack, VStack } from '@chakra-ui/react'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'

import { FullHeartIcon, HeartIcon, MinusIcon, PlusIcon } from '../icons/Icons'
import { addToWishlist, removeFromWishlist } from '@/redux/slice/wishlist'

const AddToCartCard = ({ productData }: { productData: any }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector((state: RootState) => state.auth.user);
  const stock = useAppSelector((state: RootState) => state.product.stock);
  const { carts } = useAppSelector((state: RootState) => state.cart);
  const { wishlist } = useAppSelector((state: RootState) => state.wishlist);

  // Ambil wishlist user jika ada
  const userWishlist = wishlist?.find((item: any) => item.userId === user?.id);
  // Cek apakah produk sudah ada di wishlist
  const checkIfOnWishlist = userWishlist?.products?.find(
    (item: any) => item.product_id === productData?.product_id
  );

  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = useCallback(() => {
    setQuantity((prev) => prev + 1);
  }, []);
  const decreaseQuantity = useCallback(() => {
    setQuantity((prev) => prev - 1);
  }, []);

  // Jika ada harga diskon yang valid (> 0), gunakan harga diskon; jika tidak, gunakan harga normal
  const price =
    productData?.price?.withDiscount && productData?.price?.withDiscount > 0
      ? productData.price.withDiscount
      : productData.price.withoutDiscount;

  const handleAddToCart = async () => {
    const product = {
      productData: productData,
      variant: stock.type,
      stock: stock.quantity,
      price: price,
      quantity: quantity,
      timeAddToCart: Date.now(),
    };

    dispatch(tryAddToCart(product));
  };

  const handleBuy = async () => {
    if (!user?.id) {
      dispatch(
        setAlert({
          label: 'Anda harus login terlebih dahulu',
          type: 'warning',
        })
      );
      return;
    }
    const productInCart = carts?.products.find(
      (item: any) =>
        item?.productData?.product_id === productData?.product_id &&
        item?.variant === stock?.type
    );

    if (productInCart) {
      router.push('/checkout');
    } else {
      await handleAddToCart();
      router.push('/checkout');
    }
  };

  // Fungsi toggle wishlist: tambah jika belum ada, hapus jika sudah ada
  const handleToggleWishlist = () => {
    if (user?.id) {
      if (checkIfOnWishlist) {
        dispatch(
          removeFromWishlist({
            userId: user.id,
            productId: productData?.product_id,
          })
        );
        dispatch(
          setAlert({
            label: 'Berhasil menghapus produk dari wishlist anda',
            type: 'success',
          })
        );
      } else {
        dispatch(
          addToWishlist({
            userId: user.id,
            product: productData,
          })
        );
        dispatch(
          setAlert({
            label: 'Berhasil menambahkan produk ke wishlist anda',
            type: 'success',
          })
        );
      }
    } else {
      dispatch(
        setAlert({
          label: 'Login untuk menambahkan produk ke wishlist anda',
          type: 'error',
        })
      );
    }
  };

  return (
    <Box
      width={{ base: '100%', md: '268px' }}
      height={'fit-content'}
      padding={'1rem'}
      borderRadius={'10px'}
      className="border rounded-[10px] shadow-lg"
      order={{ base: '3', md: '2', lg: '3' }}
    >
      <VStack alignItems={'start'} gap={'15px'}>
        <Heading as={'h1'} fontWeight={'bold'} fontSize={'1rem'}>
          Atur jumlah dan catatan
        </Heading>

        <span>Variant: {stock?.type}</span>

        <Flex alignItems={'center'}>
          <HStack
            padding={'.4rem'}
            borderRadius={'10px'}
            className="border"
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <button
              onClick={decreaseQuantity}
              disabled={quantity === 1}
              className="disabled:cursor-not-allowed p-[.3rem]"
            >
              <MinusIcon
                size={15}
                color={`${quantity > 1 ? '#42B549' : 'black'}`}
              />
            </button>
            <span>{quantity}</span>
            <button
              onClick={increaseQuantity}
              disabled={quantity === stock?.quantity}
              className="disabled:cursor-not-allowed p-[.3rem]"
            >
              <PlusIcon
                size={15}
                color={`${quantity > 1 ? '#42B549' : 'black'}`}
              />
            </button>
          </HStack>
          <span>Stock: {stock?.quantity}</span>
        </Flex>

        <Flex width={'100%'} alignItems={'center'} justifyContent={'space-between'}>
          <span>Subtotal</span>
          <Heading as={'h3'} fontWeight={'bold'} fontSize={'1.3rem'}>
            {productData?.price?.currency} {Number((price * quantity).toFixed(2))}
          </Heading>
        </Flex>

        <VStack gap={'10px'} width={'100%'}>
          <button
            onClick={handleAddToCart}
            className="py-[.5rem] px-[1rem] w-full rounded-[10px] text-center bg-white text-mainGreen border border-mainGreen"
          >
            + Keranjang
          </button>
          <button
            onClick={handleBuy}
            className="py-[.5rem] px-[1rem] w-full rounded-[10px] text-center bg-mainGreen text-white border-mainGreen"
          >
            Beli
          </button>
        </VStack>

        <Flex alignItems={'center'} justifyContent={'center'} width={'100%'}>
          <button
            className="flex items-center gap-[5px]"
            onClick={handleToggleWishlist}
          >
            {checkIfOnWishlist ? (
              <FullHeartIcon size={15} color="black" />
            ) : (
              <HeartIcon size={15} color="black" />
            )}
            <span className="font-bold capitalize text-[.9rem]">wishlist</span>
          </button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default AddToCartCard;
