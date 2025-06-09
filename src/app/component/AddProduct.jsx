'use client'

import axios from 'axios'
import { useState } from 'react'

export default function AddProduct ({handleToggle, Addon}) {

    const [formData, setFormData] = useState({
        name:"",
        image:null,
        price: ''
    })

    const [imageName, setImageName] = useState(null)

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(false)
    const [error, setError] = useState(false)
    
    const handleChange = (e) =>{

       if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
      setImageName(e.target.files[0])

    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    }


    const handleSubmit = async (e) =>{

        e.preventDefault()

    const formFile = new FormData();
    formFile.append("name", formData.name);
    formFile.append("price", formData.price);
    formFile.append("image", formData.image);

    try {
        const response = axios.post('https://geer-intern-assignment-backend.onrender.com/api/product', formFile,{
             headers: { "Content-Type": "multipart/form-data" }})

        if (response.data) {
                setMessage(response.data);
                setTimeout(() => {
                  setError(false)
              }, 4000);

              setTimeout(() => {
                setMessage(false)
            }, 4000);
        }
        else {
                console.log("Product message:", response.data);
                setError("Add Product Successfully");
                setMessage(false)
            }
        setFormData({
            name:'',
            price:"",
            imageUrl: ""
        })
    }
   catch (err) {
  console.error("Error Response:", err.response);

  if (!err?.response) {
    setError("No server Response");
  } else if (err.response?.status === 409) {
    setError("Product with the same name already exists.");
  } else if (err.response?.status === 400) {
    setError("Product is invalid");
  } else if (err.response?.status === 401) {
    setError("Unauthorized");
  } else {
    setError("Failed to add product");
  }

  setTimeout(() => setError(false), 4000);
  setTimeout(() => setMessage(false), 4000);
}
 finally {
            setLoading(false);
        

    }
    }
    return(

        <div className=''>

            <form onSubmit={handleSubmit} className='relative text-black bg-white rounded-lg shadow-md sm:w-96 w-72 h-96 flex flex-col items-center justify-center mx-auto' >
            <button className='absolute right-6 bg-black w-5 h-6 text-white top-3' onClick={handleToggle}>X</button>
            <div className='flex flex-col gap-2 text-sm mt-3'>
                <label >Product Name</label>
                <input name='name' className='border-green-500 border text-xs rounded-lg p-3 sm:w-80 w-64' placeholder='Product Name' onChange={handleChange} value={formData.name} />
            </div>
            <div className='flex flex-col gap-2 text-sm mt-3'>
                <label >Product Price</label>
                <input name='price' placeholder='Product Price' className='border-green-500 border text-xs rounded-lg p-3 sm:w-80 w-64' onChange={handleChange} value={formData.price} />
            </div>
                <div className='flex flex-col gap-2 text-sm mt-3'>
                <label >Product Image</label>
                     <label
              htmlFor="product"
              className="bg-blue-500 items-center text-white border text-xs rounded-lg p-3 sm:w-80 w-64 whitespace-nowrap"
              style={{
                cursor: "pointer",
                display: "inline-flex",
                gap: "10px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="border text-white border-white rounded-full "
                style={{ width: "24px", height: "24px", color:"green" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
                <span >Upload Product Image</span>
            </label>
            
                <input type='file' 
              id="product"
                 name='image'  accept="image/*" placeholder='Product Image' className='bg-blue-500 hidden text-white border text-xs rounded-lg p-3 sm:w-80 w-64' onChange={handleChange} value={formData.imageUrl} />
                 {imageName && (
              <div className="mb-2 text-blue-700 font-bold text-sm">
                Selected file: <small className="text-black">{imageName.name}</small>
              </div>
            )}
            </div>
                <button type='submit' className='bg-green-500 text-white mt-4 border text-xs rounded-lg p-3 sm:w-80 w-64' 
                disabled={!formData.name || !formData.price || !formData.image}>
                {loading ? <p className="loading"></p> : "Add Product"}
                </button>

<div className={` flex justify-center items-center ${error ? 'block' : 'hidden'}`}>
                <p className="bg-red-600 text-white rounded-lg font-semibold text-sm p-2 fixed top-1 mx-auto
                 w-64  mt-0 mb-2 text-center ">{error}</p>
            </div>

            <div className={` flex justify-center items-center ${message ? 'block' : 'hidden'}`}>
                <p className="bg-green-600 text-white rounded-lg font-semibold text-sm p-2 fixed top-1 mx-auto
                 w-64  mt-0 mb-2 text-center ">{message}</p>
            </div>
            </form>

        </div>
    )
}