// ProductRepository.ts
import Product  from '../models/Product'
import { API_PRODUCTS_URL } from '../models/Constants';

class ProductRepository {
    async fetchProducts(): Promise<Product[]> {
      try {
        const response = await fetch(API_PRODUCTS_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`Error fetching products: ${error.message}`);
      }
    }
  }
  
  export default new ProductRepository();
  