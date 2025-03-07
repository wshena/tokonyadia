import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { Action } from 'redux';
import { ThunkAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import utilityReducer from './slice/utility'
import authReducer from './slice/auth'
import productReducer from './slice/product'
import cartReducer from './slice/cart'
import orderReducer from './slice/order'
import wishlistReducer from './slice/wishlist';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedProductReducer = persistReducer(persistConfig, productReducer);
const persistedWishlistReducer = persistReducer(persistConfig, wishlistReducer);

export const store = configureStore({
  reducer: {
    utility: utilityReducer,
    auth: authReducer,
    product: persistedProductReducer,
    cart: persistedCartReducer,
    order: orderReducer,
    wishlist: persistedWishlistReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Abaikan pengecekan serializable untuk action-action redux-persist berikut
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
