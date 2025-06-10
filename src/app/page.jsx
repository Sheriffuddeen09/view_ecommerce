'use client'
import Header from './layout/Header'
import ProductList from './component/ProductList'
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Home() {


  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() =>{

    const fetchProduct = () =>{

       axios.get('https://view-backend-ecommerce.onrender.com/api/product').then(response => setProducts(response.data || []))
    }

    fetchProduct()
  }, [])

  const handleAddProduct = (newProduct) =>{

    setProducts((prev) => [...prev, newProduct])
    
  }

  const SearchFilter = products.filter((product) =>{ 
  if (!product) return false; 
  return Object.values(product).some((value) => 
  String(value).toLowerCase().includes(search.toLowerCase()))})

  return (
    <main>
      <Header search={search} setSearch={setSearch} Addon={handleAddProduct}/>
      <div className="grid mt-4 lg:grid-cols-4  md:grid-cols-3 grid-cols-1 items-center gap-4 text-center justify-items-center">
      {

        SearchFilter.map((product) => (
          <ProductList product={product} onDelete={product.id} key={product.id} />
        ))
        
      }
          </div>

    </main>
  );
  
}
