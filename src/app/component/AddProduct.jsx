'use client'

import axios from 'axios'
import { useState } from 'react'

const types = [{title:""}, {title:"Shirt"}, {title:"Shoe"}, {title:"Pant Wear"}, {title:"Watch"}] 
export default function AddProduct ({handleToggle}) {

    const [formData, setFormData] = useState({
        name:"",
        image:null,
        imagetwo:null,
        imagethree:null,
        imagefour:null,
        price: '',
        description:"",
        type:"",
    })

    const [imageName, setImageName] = useState(null)
    const [imageNameFour, setImageNameFour] = useState(null)
    const [imageNameTwo, setImageNameTwo] = useState(null)
    const [imageNameThree, setImageNameThree] = useState(null)

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

    const handleChangeTwo = (e) =>{

       if (e.target.name === "imagetwo") {
      setFormData({ ...formData, imagetwo: e.target.files[0] });
      setImageNameTwo(e.target.files[0])

    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    }

    const handleChangeThree = (e) =>{

       if (e.target.name === "imagethree") {
      setFormData({ ...formData, imagethree: e.target.files[0] });
      setImageNameThree(e.target.files[0])

    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    }

    const handleChangeFour = (e) =>{

       if (e.target.name === "imagefour") {
      setFormData({ ...formData, imagefour: e.target.files[0] });
      setImageNameFour(e.target.files[0])

    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    }

    

    const handleSubmit = async (e) =>{

        e.preventDefault()

    const formFile = new FormData();
    formFile.append("name", formData.name);
    formFile.append("description", formData.description);
    formFile.append("type", formData.type);
    formFile.append("price", formData.price);
    formFile.append("imageUrl", formData.image);
    formFile.append("imagetwo", formData.imagetwo);
    formFile.append("imagethree", formData.imagethree);
    formFile.append("imagefour", formData.imagefour);

    try {
  const response = await axios.post(
    "http://localhost:5000/api/product",
    formFile,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  if (response.data?.message) {
    setMessage(response.data.message);
    setTimeout(() => setMessage(false), 4000);
  }

  setFormData({
    name: "",
    image: null,
    imagetwo: null,
    imagethree: null,
    imagefour: null,
    price: "",
    description: "",
    type: "",
  });
} catch (err) {
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
}

 finally {
            setLoading(false);
        

    }
    }
    return(

        <div className=''>

            <form onSubmit={handleSubmit} className='relative bg-white height-scrollbar overflow-y-scroll 
             scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 
             rounded-lg shadow-md sm:w-96 w-72 flex flex-col items-center mx-auto' >
            <button className='absolute right-0 rounded bg-black w-5 h-6 text-white top-3' onClick={handleToggle}>X</button>
            <div className='flex flex-col gap-2 text-xs mt-3'>
                <label className='text-black'>Product Name</label>
                <input name='name' className='border-green-500 text-black border text-xs rounded-lg p-2 sm:w-80 w-64' placeholder='Product Name' onChange={handleChange} value={formData.name} />
            </div>
            <div className='flex flex-col gap-2 text-xs mt-3'>
                <label className='text-black'>Product Price</label>
                <input name='price' placeholder='Product Price' className='border-green-500 text-black border text-xs rounded-lg p-2 sm:w-80 w-64' onChange={handleChange} value={formData.price} />
            </div>
            <div className='flex flex-col gap-2 text-xs mt-3'>
                <label className='text-black'>Type</label>
                <select name='type' className='border-green-500 text-black border text-black text-xs rounded-lg p-2 sm:w-80 w-64' onChange={handleChange} value={formData.type} >
                 {
                      types.map(type =>(
                        <option key={type.id}>
                          {type.title}
                       </option>
                      ))
                    }
                </select>
            </div>
            <div className='flex flex-col gap-2 text-xs mt-3'>
                <label className='text-black'>Product Description</label>
                <textarea name='description' placeholder='Product Price' 
                className='border-green-500 text-black border h-10 text-xs rounded-lg p-2 h-20 sm:w-80 w-64'
                 onChange={handleChange} value={formData.description} />
            </div>
            
                <div className='flex flex-col gap-2 text-xs mt-3'>
                <label className='text-black'>Product Image</label>
                     <label
              htmlFor="product"
              className="bg-blue-500 items-center text-white border text-xs 
              rounded-lg p-2 sm:w-80 w-64 whitespace-nowrap"
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
                 name='image'  accept="image/*" placeholder='Product Image'
                  className='bg-blue-500 hidden text-white border text-xs rounded-lg p-2 sm:w-80 w-64' 
                  onChange={handleChange} />
                 {imageName && (
              <div className=" text-blue-700 font-bold text-xs">
                Selected file: <small className="text-black">{imageName.name}</small>
              </div>
            )}
            </div>

            {/* image two */}

            <div className='flex flex-col gap-2 text-xs mt-3'>
                <label className='text-black'>Additional Image 1</label>
               
                     <label
              htmlFor="producttwo"
              className="bg-blue-500 items-center text-white border text-xs 
              rounded-lg p-2 sm:w-80 w-64 whitespace-nowrap"
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
                <span >Upload Image</span>
            </label>
            
                <input type='file' 
              id="producttwo"
                 name='imagetwo'  accept="imagetwo/*" placeholder='Product Image' 
                 className='bg-blue-500 hidden text-white border text-xs rounded-lg p-2 sm:w-80 w-64' 
                 onChange={handleChangeTwo} />
                 {imageNameTwo && (
              <div className=" text-blue-700 font-bold text-xs">
                Selected file: <small className="text-black">{imageNameTwo.name}</small>
              </div>
            )}
            </div>

            {/* image three */}

            <div className='flex flex-col gap-2 text-xs mt-3'>
                <label className='text-black'>Additional Image 2</label>
              
                     <label
              htmlFor="productthree"
              className="bg-blue-500 items-center text-white border text-xs rounded-lg p-2 sm:w-80 w-64 whitespace-nowrap"
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
                <span >Upload Image</span>
            </label>
            
                <input type='file' 
              id="productthree"
                 name='imagethree'  accept="imagethree/*" placeholder='Product Image'
                  className='bg-blue-500 hidden text-white border text-xs rounded-lg p-2 sm:w-80 w-64'
                  onChange={handleChangeThree} />
                 {imageNameThree && (
              <div className=" text-blue-700 font-bold text-xs">
                Selected file: <small className="text-black">{imageNameThree.name}</small>
              </div>
            )}
            </div>

            {/* image four setImageNameOne*/}

            <div className='flex flex-col gap-2 text-xs mt-3'>
                <label className='text-black'>Additional Image 3</label>
                
                     <label
              htmlFor="productfour"
              className="bg-blue-500 items-center text-white border text-xs rounded-lg p-2 sm:w-80 w-64 whitespace-nowrap"
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
              id="productfour"
                 name='imagefour'  accept="imagefour/*" placeholder='Product Image' 
                 className='bg-blue-500 hidden text-white border text-xs rounded-lg p-2 sm:w-80 w-64' 
                 onChange={handleChangeFour} />
                 {imageNameFour && (
              <div className=" text-blue-700 font-bold text-xs">
                Selected file: <small className="text-black">{imageNameFour.name}</small>
              </div>
            )}
            </div>
                <button type='submit' className='bg-green-500 text-white mt-4 mb-5 border text-xs rounded-lg p-2 sm:w-80 w-64' 
                disabled={!formData.name || !formData.price || !formData.image}>
                {loading ? <p className="loading"></p> : "Add Product"}
                </button>

<div className={` flex justify-center items-center ${error ? 'block' : 'hidden'}`}>
                <p className="bg-red-600 text-white rounded-lg font-semibold text-xs p-2 fixed top-2 mx-auto
                 w-64  mt-0  text-center ">{error}</p>
            </div>

            <div className={` flex justify-center items-center ${message ? 'block' : 'hidden'}`}>
                <p className="bg-green-600 text-white rounded-lg font-semibold text-xs p-2 fixed top-2 mx-auto
                 w-64  mt-0  text-center ">{message}</p>
            </div>
            </form>

        </div>
    )
}