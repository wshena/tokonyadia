import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  pengiriman: string,
  totalPembayaran: number,
  metodePembayaran: string,
  metodePengiriman: string,
}

const initialState: OrderState = {
  pengiriman: '',
  totalPembayaran: 0,
  metodePembayaran: '',
  metodePengiriman: '',
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setPengiriman: (state, action:PayloadAction<string>) => {
      state.pengiriman = action.payload;
    },
    setTotalPembayaran: (state, action:PayloadAction<number>) => {
      state.totalPembayaran = action.payload;
    },
    setMetodePembarayan: (state, action:PayloadAction<string>) => {
      state.metodePembayaran = action.payload;
    },
    setMetodePengiriman: (state, action:PayloadAction<string>) => {
      state.metodePengiriman = action.payload;
    },
  },
});

export const {
  setPengiriman,
  setTotalPembayaran,
  setMetodePembarayan,
  setMetodePengiriman
} = orderSlice.actions;
export default orderSlice.reducer;
