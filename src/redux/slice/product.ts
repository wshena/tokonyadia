import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  stock: {
    type:string,
    quantity:number
  },
  history: any[]
}

const initialState: ProductState = {
  stock: {
    type: '',
    quantity: 0
  },
  history: []
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setStock: (state, action: PayloadAction<{type:string, quantity:number}>) => {
      state.stock = action.payload;
    },
    addToProductHistory: (state, action: PayloadAction<any>) => {
      const product = action.payload;
      const index = state.history?.findIndex(
        item => item?.product_id === product?.product_id && item.variant === product.variant
      );
      if (index !== -1) {
        // Tidak perlu tambahkan jika product sudah ada
        return
      } else {
        // Jika produk baru, masukkan langsung data product yang dikirim
        state.history.push(product);
      }
    },
    clearAllProductHistory: (state) => {
      state.history = []
    }
  },
});

export const {
  setStock,
  addToProductHistory,
  clearAllProductHistory
} = productSlice.actions;

export default productSlice.reducer;