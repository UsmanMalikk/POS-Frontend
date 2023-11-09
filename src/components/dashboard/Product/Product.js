import React, { useState } from 'react'
import { FaCubes, FaFilter, FaHourglassHalf } from 'react-icons/fa'
import { BiChevronDown } from 'react-icons/bi'


import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import ProductsTbl from '../Tables/ProductsTbl';
import StockReportTbl from '../Tables/StockReportTbl';

const Product = () => {
    const dummyData = [
        {
            id: 1,
            Username: "username",
            Name: "User",
            Role: "Admin",
            Email: "username@gmail.com"
        },
        {
            id: 2,
            Username: "username1",
            Name: "User1",
            Role: "Admin",
            Email: "username@gmail.com"
        },
        {
            id: 3,
            Username: "username2",
            Name: "User2",
            Role: "Admin",
            Email: "username2@gmail.com"
        },
        {
            id: 4,
            Username: "username3",
            Name: "User3",
            Role: "Admin",
            Email: "username3@gmail.com"
        },
        {
            id: 5,
            Username: "username4",
            Name: "User4",
            Role: "Admin",
            Email: "username4@gmail.com"
        },
        {
            id: 6,
            Username: "username5",
            Name: "User5",
            Role: "Admin",
            Email: "username5@gmail.com"
        },
        {
            id: 7,
            Username: "username6",
            Name: "User6",
            Role: "Admin",
            Email: "username6@gmail.com"
        }
    ]
    
    const [formData, setFormData] = useState({
        productType: "",
        category:"",
        unit:"",
        tax:"",
        brand:"",
        businesLocation: "",
        status: "",
        notForSelling:false

    })
    const [products, setProducts] = useState(true)
    const [stock, setStock] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [open, setOpen] = useState(false)
    

    const [isFilter, setIsFilter] = useState(false)
    return (
        <div className='flex flex-col items-center min-h-screen justify-self-center w-full p-5 bg-gray-100'>
            <div className='flex justify-start items-start w-full'>
                <h1 className='text-xl font-semibold'>Product</h1>

            </div>
            

            <div className='w-full bg-white mt-5  flex flex-col  '>
                <div className='flex flex-col md:flex-row'>
                    <div onClick={() => { setProducts(true); setStock(false) }} className={`flex   py-1 ${products ? "border-t-[3px]  border-blue-500" : "border-b-[1px] border-gray-500"} h-[50px] `}>

                        <div className='flex  cursor-pointer items-center justify-center'>
                            <FaCubes size={20} />
                            <h1 className='text-lg font-bold'>All Products</h1>
                        </div>

                    </div>
                    


                </div>
                <div className='flex'>
                    {products &&
                        <div className='flex flex-col'>
                            <div className='flex justify-end mt-2 text-sm mx-5'>
                                <Link to={'/home/products/create'} className='flex items-center justify-center mx-5 font-semibold w-20 h-10 rounded-md mt-3 text-white bg-blue-500'>
                                    <AiOutlinePlus size={15} /> Add

                                </Link>

                            </div>

                            <ProductsTbl />

                        </div>
                    }


                </div>

            </div>


        </div>
    )
}

export default Product