
// Definisi tipe untuk data produk dan order
export interface OrderProduct {
  id: string;
  name: string;
  price: {
    withDiscount: number | null;
    withoutDiscount: number;
    currency: string;
  };
  // Tambahkan properti lain yang diperlukan
}

export interface OrderRequest {
  userId: string;
  products: OrderProduct[];
  quantity: number;
  totalAmount: number;
  currency: string;
  address: string;
  paymentMethod: string;
  notes?: string;
}

export interface OrderResponse {
  id: string;
  status: string;
  createdAt: string;
  // Tambahkan properti lain sesuai response API
}