import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistItem {
  userId: string;
  products: any[];
}

interface ProductState {
  wishlist: WishlistItem[];
}

const initialState: ProductState = {
  wishlist: []
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    initWishlist: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      const exists = state.wishlist.find(w => w.userId === userId);
      if (!exists) {
        state.wishlist.push({ userId, products: [] });
      }
    },
    addToWishlist: (state, action: PayloadAction<{ userId: string, product: any }>) => {
      const { userId, product } = action.payload;
      let userWishlist = state.wishlist.find(w => w.userId === userId);
      if (!userWishlist) {
        // Jika wishlist belum ada untuk user, buat baru
        userWishlist = { userId, products: [] };
        state.wishlist.push(userWishlist);
      }
      const index = userWishlist.products.findIndex(item => item.product_id === product.product_id);
      if (index !== -1) {
        // Tidak menambahkan produk jika sudah ada di wishlist
        return;
      } else {
        userWishlist.products.push(product);
      }
    },
    clearAllWishlist: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      const userWishlist = state.wishlist.find(w => w.userId === userId);
      if (userWishlist) {
        userWishlist.products = [];
      }
    },
    removeFromWishlist: (state, action: PayloadAction<{ userId: string, productId: string }>) => {
      const { userId, productId } = action.payload;
      const userWishlist = state.wishlist.find(w => w.userId === userId);
      if (userWishlist) {
        userWishlist.products = userWishlist.products.filter(
          item => item.product_id !== productId
        );
      }
    }
  },
});

export const {
  initWishlist,
  addToWishlist,
  clearAllWishlist,
  removeFromWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
