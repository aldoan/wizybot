// ProductService.ts

import ProductRepository from '../repositories/ProductRepository'
import Product from '../models/Product'

class ProductService {
  async getProducts(): Promise<Product[]> {
    try {
      const productItems: Product[] = await ProductRepository.fetchProducts();
      return productItems;
    } catch (error) {
      throw new Error(`Error fetching items: ${error.message}`);
    }
  }
}

export default new ProductService();
