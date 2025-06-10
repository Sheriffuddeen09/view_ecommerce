
import Image from "next/image";
import Link from "next/link";


export default function ProductList ({onDelete, product}){

    return(

        <main >
            <div key={product.id} className=" border-orange-500 border py-1 px-1 sm:px-1 rounded-lg">
                <Image src={`http://localhost:5000${product.imageUrl}`} alt={product.name} width={200} 
                height={300} className="h-60  w-72 mx-auto rounded-tr-lg rounded-tl-lg"/>
                 <p className="text-sm font-bold mt-3 ">{product.name}</p>
                 <p className="text-sm font-bold mt-2 ">${product.price}</p>
                 <Link href={`/product/${product.id}`}>
                    <button className="bg-orange-300 text-sm mt-4 transition duration-500 mb-4 rounded-lg w-64 font-bold p-2 
                  hover:bg-black hover:text-white "> View Detail</button></Link>
            </div>
           
        </main>

    )
}