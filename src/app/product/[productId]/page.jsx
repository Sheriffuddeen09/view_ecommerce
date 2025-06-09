'use client'

import Header from "@/app/layout/Header"
import axios from "axios"
import Image from "next/image"
import {  useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProductDetails ({ params }){

    const router = useRouter()
    const [product, setProduct] = useState(null)
    const {productId} = params
    const [message, setMessage] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [view, setView] = useState(false)

    useEffect(() =>{

            axios.get('https://geer-intern-assignment-backend.onrender.com/api/product').then((res) =>{
                const found = res.data.find((p) => String(p.id) === productId)
                setProduct(found)
            })
    
    }, [productId])

    const handleDelete = async (productId) => {

        try{
            
           const response = await axios.delete(`https://geer-intern-assignment-backend.onrender.com/api/product/${productId}`)
           
             if (response.data) {
                router.push('/')
                setMessage(response.data.message);
                setTimeout(() => {
                  setError(false)
              }, 4000);

              setTimeout(() => {
                setMessage(false)
            }, 4000);
        }
        else {
                console.log("Product message:", response.data);
                setError("Registration failed");
                setMessage(false)
            }
        }
        
        catch (err) {
            console.error("Error Response:", err.response);
    
            console.error("Error Response:", err.response);
    
            if(!err?.response){
                setError('No server Response')
            }
            else if(err.response?.status === 401){
                setError('Unauthorised')
            }
            else if(err.response?.status === 400){
                setError('Product is Invalid')
            }
            else{
                setError('Failed to Add Product')
            }
            setTimeout(() => {
                setError(false)
            }, 4000);
            setTimeout(() => {
              setMessage(false)
          }, 4000);
        } 
        finally {
            setLoading(false);
        

    }
    
    }
    
    if (loading) return <p className="loading mx-auto flex justify-center mt-10"></p>
    if (!product) return <p className="loading mx-auto flex justify-center mt-10"></p>;

    const handleView = () =>{
        setView(!view)
    }
    const content = (
       <main >
            <div key={product.id} className=" mt-4 sm:mt-10 py-2 px-4 sm:px-4 rounded-lg flex sm:flex-row flex-wrap sm:gap-10 justify-center ">
                <Image src={`https://geer-intern-assignment-backend.onrender.com${product.imageUrl}`} alt={product.name} width={200} 
                                height={300} className="h-60  w-72 rounded-tr-lg rounded-tl-lg"/>
            <div className="px-4">
                 <p className="text-sm font-bold mt-3 ">{product.name}</p>
                 <p className="text-sm font-bold mt-2 ">${product.price}</p>
                <button onClick={handleView} className="bg-orange-300 text-sm mt-4 transition duration-500 mb-4 rounded-lg w-64 font-bold p-2 
                  hover:bg-black hover:text-white "> Delete Product</button>
            </div>
            </div>
           <div className={` flex justify-center items-center ${error ? 'block' : 'hidden'}`}>
                <p className="bg-red-600 text-white rounded-lg font-semibold text-sm p-2 fixed top-1 mx-auto
                 w-64  mt-0 mb-2 text-center ">{error}</p>
            </div>

            <div className={` flex justify-center items-center ${message ? 'block' : 'hidden'}`}>
                <p className="bg-green-600 text-white rounded-lg font-semibold text-sm p-2 fixed top-1 mx-auto
                 w-64  mt-0 mb-2 text-center ">{message}</p>
            </div>
        </main>
    )

    const deleteItem = (
        <div className={` fixed top-0 flex justify-center items-center w-full h-full bg-product left-0 ${view ? "block" : "hidden"}`}>
            <div  className='relative text-black bg-white rounded-lg shadow-md sm:w-96 w-72 h-96 flex flex-col items-center justify-center mx-auto'>
                <p className="w-72 font-bold text-center">Are you sure you want to delete this product</p>
                <div className="inline-flex gap-4 mt-4">
                    <button  onClick={handleView} className="bg-green-600 py-1 px-4 text-sm text-white rounded-lg">Cancel</button>
                    <button  onClick={() => handleDelete(product.id)} className="bg-red-600 py-1 px-4 text-sm text-white rounded-lg">Delete</button>
                </div>
            </div>    
        </div>
    )

    return (
        <div>
            <Header />
            {content}
            {deleteItem}
        </div>
    )
}