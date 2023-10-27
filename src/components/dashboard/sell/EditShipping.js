import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from "react-router-dom"
const EditShipping = (props) => {
    const Navigate = useNavigate();
    let id = props.id
    const [formData, setFormData] = useState({
        shippingDetails: "",
        shippingAddress: "",
        shippingStatus: "",
        deliveredTo: ""
    })
   

    const handleClick = (e) => {
        addSaleById()
        console.log("Handle Update")
    }
    const inpuRef1 = useRef()


    const fetchSaleById = async () => {

        try {
            // const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/sales/final/${id}`);
            console.log(response)

            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching sale:', error);
        }
    };
    const addSaleById = async () => {

        try {
            // const token = localStorage.getItem('token');
            // console.log(finalFormData)
            const response = await axios.put(`http://localhost:8000/admin/sales/final/${id}`, formData);
            console.log(response)
            if (response.status === 200) {
                Navigate("/home/sells");

            }
            
        } catch (error) {
            console.error('Error Adding Sale:', error);
        }
    };
    useEffect(() => {
        // Make an API call to fetch SPG's records
        fetchSaleById()
        
    }, [])
    return (
        <div className='w-full p-5 bg-gray-100'>
            <h1 className='text-xl text-start font-bold '>Edit Shipping</h1>

            <div className='flex  w-full   flex-col  p-5 mt-5 bg-white border-t-[3px] rounded-md border-blue-600'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className='flex flex-col '>
                        <h1 className='flex text-sm text-start font-bold'>Shipping Detials:</h1>
                        <textarea rows={4} value={formData.shippingDetails} onChange={(e) => { setFormData({ ...formData, shippingDetails: e.target.value }) }} placeholder='Shipping Details' type='Text' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />

                    </div>
                    <div className='flex flex-col'>
                        <h1 className='flex text-sm text-start font-bold'>Shipping Address:</h1>
                        <textarea rows={4} value={formData.shippingAddress} onChange={(e) => { setFormData({ ...formData, shippingAddress: e.target.value }) }} placeholder='Shipping Details' type='Text' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />

                    </div>

                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
                    <div className='flex flex-col '>
                        <h1 className='flex text-sm text-start font-bold'>Shipping Status:</h1>

                        <select value={formData.shippingStatus} onChange={(e) => { setFormData({ ...formData, shippingStatus: e.target.value }) }} type='Text' placeholder='Enter Product name / SKU / Scan bar code' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none'>
                            <option value={""}>Please Selecet</option>
                            <option value={"Ordered"}>Ordered</option>f
                            <option value={"Packed"}>Packed</option>
                            <option value={"Shipped"}>Shipped</option>
                            <option value={"Delivered"}>Delivered</option>
                            <option value={"Cancelled"}>Cancelled</option>

                        </select>

                    </div>
                    <div className='flex flex-col '>
                        <h1 className='flex text-sm text-start font-bold'>Delivered to:</h1>
                        <input value={formData.deliveredTo} onChange={(e) => { setFormData({ ...formData, deliveredTo: e.target.value }) }} placeholder='Delivered to' type='text' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />

                    </div>

                </div>
                <div className=' flex flex-col mt-5 '>
                    <h2 className='text-start font-bold '> Shipping Documents:</h2>
                    <div className='flex'>
                        {/* value={formData.img_data} onChange={ (e)=>setFormData({...formData,  img_data: e.target.value})} */}
                        <input className=' hidden' type='file' ref={inpuRef1} accept='application/pdf,text/csv,application/zip,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/jpg,image/png' />
                        <div onClick={() => { inpuRef1.current?.click(); }} className='flex cursor-pointersu  cursor-pointer w-full border-[2px] border-gray-600 h-[200px] items-center justify-center'>
                            Drop files here to upload
                        </div>
                    </div>


                </div>



            </div>




            


            <div className='flex items-end justify-end mt-5'>
                <button onClick={handleClick} className='bg-green-500 px-2 py-2 items-center justify-center flex'>{id ? "Update" : "Save"}</button>
            </div>

        </div>
    )
}

export default EditShipping