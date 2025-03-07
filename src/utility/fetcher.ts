import axios from "axios";
import { OrderRequest, OrderResponse } from "./interface";

// Definisi tipe untuk parameter fetcher
type HttpMethod = 'get' | 'post' | 'put' | 'delete';
type FetcherParams = Record<string, any>;

// api url
const apiUrl = process.env.NEXT_PUBLIC_API;

/**
 * Fungsi fetcher umum untuk melakukan permintaan HTTP
 * @param url - URL endpoint
 * @param params - Parameter untuk request
 * @param method - Metode HTTP (get, post, put, delete)
 * @param data - Data untuk body request (untuk post, put)
 * @param headers - Headers tambahan untuk request
 * @returns Promise dengan data respon atau null jika terjadi error
 */
const fetcher = async (
  url: string, 
  params: FetcherParams = {}, 
  method: HttpMethod = 'get',
  data?: any,
  headers?: Record<string, string>
) => {
  try {
    const response = await axios.request({
      method,
      url,
      params,
      data,
      headers: {
        "Content-Type": "application/json",
        ...headers
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      const responseData = error.response?.data;
      
      console.error('Fetcher error:', { 
        status: statusCode,
        data: responseData,
        message: error.message 
      });
      
      // Re-throw error dengan informasi yang lebih baik
      throw new Error(
        responseData?.message || 
        error.message || 
        `Request failed with status ${statusCode}`
      );
    }
    
    console.error('Unexpected fetcher error:', error);
    throw new Error('Terjadi kesalahan yang tidak terduga');
  }
};

// API endpoint functions
export const GetAllCategory = async (params?: FetcherParams) => {
  return fetcher(`${apiUrl}/store/categories`, params, 'get');
};

export const GetAllCollection = async (params?: FetcherParams) => {
  return fetcher(`${apiUrl}/store/collections`, params, 'get');
};

export const GetAllProducts = async (params?: FetcherParams) => {
  return fetcher(`${apiUrl}/store/products`, params, 'get');
};

export const GetAllOrder = async (params?: FetcherParams) => {
  return fetcher(`${apiUrl}/store/orders`, params, 'get');
};

/**
 * Mengirim permintaan pembelian produk ke API
 * @param reqBody - Data order yang akan dikirim
 * @returns Promise dengan data respon order
 */
export const buyProduct = async (reqBody: any): Promise<any> => {
  if (!apiUrl) {
    throw new Error('API URL tidak dikonfigurasi. Periksa variabel lingkungan.');
  }
  
  try {
    // Menggunakan fungsi fetcher untuk konsistensi
    const result = await fetcher(
      `${apiUrl}/store/order`,
      {}, // Tidak ada query params
      'post',
      reqBody, // Data body untuk POST request
      {
        "Accept": "application/json"
      }
    );
    
    return result;
  } catch (error) {
    // Log error untuk debugging
    console.error('Error saat pembelian:', error);
    
    // Re-throw error agar dapat ditangani oleh komponen
    throw error;
  }
};