import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UtilityState {
  searchButton: boolean;
  mobileNavButton: boolean;
  profileButtonHover: boolean;
  alert: {
    label: string,
    type: 'success' | 'error' | 'warning' | 'info',
  },
  sortOrder: {
    filter:string,
    order:string
  },
  sideTabs: string,
  cartButtonHover: boolean,
  modalClick: boolean,
}

const initialState: UtilityState = {
  searchButton: false,
  mobileNavButton: false,
  profileButtonHover: false,
  alert: {
    label: '',
    type: 'info',
  },
  sortOrder: {
    filter: '',
    order: ''
  },
  sideTabs: '',
  cartButtonHover: false,
  modalClick: false,
}

export const utilitySlice = createSlice({
  name: 'utility',
  initialState,
  reducers: {
    setSearchButton: (state, action: PayloadAction<boolean>) => {
      state.searchButton = action.payload;
    },
    setMobileNavButton: (state, action: PayloadAction<boolean>) => {
      state.mobileNavButton = action.payload;
    },
    setProfileButtonHover: (state, action: PayloadAction<boolean>) => {
      state.profileButtonHover = action.payload;
    },
    setAlert: (state, action: PayloadAction<{label: string, type: 'success' | 'error' | 'warning' | 'info'}>) => {
      state.alert = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<{filter:string, order:string}>) => {
      state.sortOrder = action.payload;
    },
    setSideTabs: (state, action: PayloadAction<string>) => {
      state.sideTabs = action.payload;
    },
    setCartButtonHover: (state, action: PayloadAction<boolean>) => {
      state.cartButtonHover = action.payload;
    },
    setModalClick: (state, action: PayloadAction<boolean>) => {
      state.modalClick = action.payload;
    },
  },
})

export const { 
  setMobileNavButton,
  setSearchButton,
  setProfileButtonHover,
  setAlert,
  setSortOrder,
  setSideTabs,
  setCartButtonHover,
  setModalClick
} = utilitySlice.actions
export default utilitySlice.reducer
