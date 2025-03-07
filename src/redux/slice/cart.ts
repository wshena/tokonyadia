import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setAlert } from './utility';
import { AppThunk } from '@/redux/store';

export type Product = {
  productData: any;
  variant: string;
  stock: number;
  price: number;
  quantity: number;
  timeAddToCart: any;
};

interface CartState {
  carts: {
    id: string;
    date: any;
    products: Product[];
  };
}

const initialState: CartState = {
  carts: {
    id: '',
    date: '',
    products: [],
  },
};

export const tryAddToCart = (product: Product): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const cartItems = state.cart.carts?.products || [];

  // Cari produk dengan id dan variant yang sama
  const cartItem = cartItems.find(
    (item: Product) =>
      item.productData?.product_id === product.productData?.product_id &&
      item.variant === product.variant
  );

  if (cartItem) {
    const newQuantity = cartItem.quantity + product.quantity;
    if (newQuantity > cartItem.stock) {
      dispatch(
        setAlert({
          label: 'Permintaan anda melebihi stock',
          type: 'error',
        })
      );
      return;
    }
  } else {
    if (product.quantity > product.stock) {
      dispatch(
        setAlert({
          label: 'Stock barang kurang',
          type: 'error',
        })
      );
      return;
    }
  }

  // Update state cart
  dispatch(addToCart(product));
  dispatch(
    setAlert({
      label: 'Product berhasil disimpan di keranjang!',
      type: 'success',
    })
  );
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action:PayloadAction<{id:string, date:any, products:any}>) => {
      state.carts.id = action.payload.id;
      state.carts.date = action.payload.date
      state.carts.products = action.payload.products
    },
    // Reducer addToCart hanya melakukan update state tanpa side effect
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const index = state.carts.products?.findIndex(
        item => item.productData?.product_id === product.productData?.product_id &&
                item.variant === product.variant
      );
      if (index !== -1) {
        // Tambahkan quantity jika produk sudah ada
        state.carts.products[index].quantity += product.quantity;
      } else {
        // Jika produk baru, masukkan langsung sesuai quantity yang dikirim
        state.carts.products.push(product);
      }
    },
    removeFromCart: (state, action: PayloadAction<{id: string, variant:string}>) => {
      // action.payload adalah identifier, misalnya variant
      state.carts.products = state.carts.products.filter(
        item => item.productData?.product_id !== action.payload.id || item.variant !== action.payload.variant
      );      
    },
  },
});

export const { addToCart, removeFromCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
