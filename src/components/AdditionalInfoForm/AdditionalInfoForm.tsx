import { useState, useEffect } from 'react'
import ProductService from '../../services/ProductService'
import Product from '../../models/Product'
import './AdditionalInfoForm.css'

function AdditionalInfoForm() {

const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts: Product[] = await ProductService.getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>

      <h1>Aditional Information</h1>
     <ul>
      {
        products.map((product) => <li>{product.displayTitle}</li>)
      }
     </ul>
      

    </>
  )
}

export default AdditionalInfoForm