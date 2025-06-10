'use client'

import Header from "@/app/layout/Header"
import axios from "axios"
import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react';
import {  useRouter } from "next/navigation"
import 'swiper/css';
import { useEffect, useState } from "react"
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';


export default function ProductDetails ({ params }){

    const router = useRouter()
    const [product, setProduct] = useState(null)
    const {productId} = params
    const [message, setMessage] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [view, setView] = useState(false)
    const [image, setImage] = useState(1)
     const [search, setSearch] = useState('')

    useEffect(() =>{

            axios.get('http://localhost:5000/api/product').then((res) =>{
                const found = res.data.find((p) => String(p.id) === productId)
                setProduct(found)
            })
    
    }, [productId])

    const handleDelete = async (productId) => {

        try{
            
           const response = await axios.delete(`http://localhost:5000/api/product/${productId}`)
           
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

    const handleImage = (id) =>{
        setImage(id)
    }
    const content = (
       <main >
            <div key={product.id} className=" mt-4 sm:mt-2 py-2 px-4 sm:px-4 rounded-lg flex sm:flex-row flex-wrap sm:gap-10 justify-center ">
                <div className={image === 1 ? "show-content" : "content"}>
                <Image src={`http://localhost:5000${product.imageUrl}`} alt={product.name} width={200} 
                                height={300} className="h-60  w-72 p-1 border-2 border-orange-600 sm:w-96 sm:h-72 rounded-lg"/>
                </div>
                <div className={image === 2 ? "show-content" : "content"}>
                <Image src={`http://localhost:5000${product.imagetwo}`} alt={product.name} width={200} 
                                height={300} className="h-60  w-72 p-1 border-2 border-orange-600 sm:w-96 sm:h-72 rounded-lg"/>
                </div>
                <div className={image === 3 ? "show-content" : "content"}>
                <Image src={`http://localhost:5000${product.imagethree}`} alt={product.name} width={200} 
                                height={300} className="h-60  w-72 p-1 border-2 border-orange-600 sm:w-96 sm:h-72 rounded-lg"/>
                </div>
                <div className={image === 4 ? "show-content" : "content"}>
                <Image src={`http://localhost:5000${product.imagefour}`} alt={product.name} width={200} 
                                height={300} className="h-60  w-72 p-1 border-2 border-orange-600 sm:w-96 sm:h-72 rounded-lg"/>
                </div>
            <div className="px-4">
                <div className="flex justify-between">
                <div>
                 <p className="text-sm font-bold mt-3 ">{product.name}</p>
                 <p className="text-sm font-bold mt-2 ">${product.price}</p>
                 </div>
                 <button onClick={handleView} className="bg-orange-300 text-sm mt-4 transition duration-500 mb-4 rounded-lg font-bold p-2 
                  hover:bg-black hover:text-white "> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    </button>
                 </div>
                <button className="bg-orange-300 text-sm mt-4 transition duration-500 mb-4 rounded-lg w-52 font-bold p-2 
                  hover:bg-black hover:text-white "> Enquiry</button>
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
           <div className="w-full flex justify-center">
            <Swiper
                modules={[Navigation]}
                navigation={{
                    nextEl: ".custom-next",
                    prevEl: ".custom-prev",
                }}
                loop={true} // 🔁 Infinite scroll
                spaceBetween={4}
                centeredSlides={true}
                slidesPerView={2}
                breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                }}
                className="w-full max-w-2xl flex justify-center items-center mx-auto"
            >
                {[product.imageUrl, product.imagetwo, product.imagethree, product.imagefour].map((img, index) => (
                <SwiperSlide key={index} className="!flex justify-center items-center">
                    <Image
                    src={`http://localhost:5000${img}`}
                    alt={product.name}
                    width={144}
                    height={144}
                    onClick={() => handleImage(index + 1)}
                    className={`w-36 h-36 rounded-lg cursor-pointer mx-auto translate-x-72 flex justify-center items-center ${
                        image === index + 1
                        ? 'border-2 border-black'
                        : 'border p-1 border-orange-600'
                    }`}
                    />
                </SwiperSlide>
                ))}
                <div className="custom-prev absolute left-10 top-1/2 -translate-y-1/2 z-10 text-black text-sm bg-white rounded-full p-2 shadow cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
</svg>

  </div>
  <div className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 text-black text-sm bg-white rounded-full p-2 shadow cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>

  </div>
            </Swiper>
            </div>
            <div className="mx-auto flex flex-col justify-cente items-center mt-3 sm:my-10">
                <h1 className="font-bold text-2xl mb-3">Description</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <th>Specification</th>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>{product.type}</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{product.description}</td>
                        </tr>
                        <tr>
                            <td>Stock</td>
                            <td>Available in Stock</td>
                        </tr>
                    </tbody>
                </table>
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
            <Header search={search} setSearch={setSearch}/>
            {content}
            {deleteItem}
        </div>
    )
}