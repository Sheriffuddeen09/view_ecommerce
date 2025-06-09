'use client'
import Image from 'next/image'
import logo from './image/softsell.png'
import Link from 'next/link'
import { useState } from 'react'
import AddProduct from '../component/AddProduct'
export default function Header ({search, Addon, setSearch}) {

    const [toggle, setToggle] = useState(false)

    const handleToggle = () =>{

        setToggle(!toggle)
    }

    return (
        <nav className='bg-color shadow-md pb-1'>
        <header className='flex justify-between sm:px-6 px-2 bg-color sm:py-3 pt-1 text-white items-center flex-row'>

            <div className='inline-flex items-center gap-1'>
            <Image src={logo} alt={logo} className='w-10 h-10' />
            <p className='sm:text-xl text-sm italic font-bold '>Ecommerce</p>
            </div>
            <input className='sm:w-80 rounded-lg sm:block hidden p-2 shadow-md text-black bg-gray-50 border border-gray-300 text-xs px-2' placeholder='search / filter product' value={search} onChange={(e) => setSearch(e.target.value) } />
            <nav className='inline-flex gap-4 text-sm font-bold'>
                <Link className='hover:text-blue-700 transition duration-500 sm:text-sm text-xs' href={'/'}>Home</Link>
                <button className='hover:text-blue-700 transition duration-500 sm:text-sm text-xs' onClick={handleToggle}>Add Product</button>
            </nav>
            <div className={` fixed top-0 flex justify-center items-center w-full h-full bg-product left-0 ${toggle ? "block" : "hidden"}`}>
                <AddProduct handleToggle={handleToggle} Addon={Addon} />
            </div>
        </header>

        <input className='w-72 rounded-lg mx-auto sm:hidden block py-2 mb-2 shadow-md text-black bg-gray-50 border border-gray-300 text-xs px-2' placeholder='search / filter product' value={search} onChange={(e) => setSearch(e.target.value) } />
    </nav>
    )
}